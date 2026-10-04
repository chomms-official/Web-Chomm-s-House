/**
 * ============================================================================
 *  CHOMM'S HOUSE — BACKEND (Google Apps Script)  v4.0.0
 * ============================================================================
 *  ไฟล์เดียวจบ รวมทุกระบบหลังบ้าน:
 *   1. Web App (doPost)  รับคำสั่งซื้อจากหน้าเว็บ → บันทึกลงชีท "Orders"
 *   2. บันทึกสลิปลง Google Drive (แยกโฟลเดอร์ตามเดือน)
 *   3. ส่งอีเมลยืนยันถึงลูกค้า + แจ้งเตือนแอดมิน (แนบรูปสลิปมาในอีเมล)
 *   4. เปลี่ยน "สถานะ" ในชีท → ส่งอีเมลแจ้งลูกค้าอัตโนมัติ
 *        🟢 ชำระเงินแล้ว  /  🚚 จัดส่งแล้ว (พร้อมเลขพัสดุ)  /  🔴 ยกเลิก
 *   5. Dashboard: สรุปยอดขาย, สถานะ, ยอดรายเดือน (มีกราฟ), สินค้าขายดี
 *   6. User Profiles: สรุปลูกค้าแต่ละคน + ระดับลูกค้า
 *   7. สรุปยอดประจำวันส่งเข้าอีเมลแอดมินทุกวัน
 *   8. ป้องกันออเดอร์ซ้ำ, ล็อกการเขียนพร้อมกัน, บันทึก Error ลงชีท "System Log"
 *
 *  🔒 ความปลอดภัยของข้อมูลเดิม
 *   • คอลัมน์ A–I ของชีท Orders อยู่ตำแหน่งเดิมทั้งหมด (ข้อมูลเก่าไม่ถูกย้าย/ลบ)
 *   • คอลัมน์ใหม่ (J–P) ถูก "เพิ่มต่อท้าย" เท่านั้น
 *   • ไม่มีฟังก์ชันลบข้อมูลออเดอร์ใดๆ ในสคริปต์นี้
 *
 *  วิธีติดตั้งแบบละเอียด ดูในไฟล์คู่มือที่แนบมาด้วย
 * ============================================================================
 */

// ============================================================================
// 0) CONFIG — ปรับแก้ได้ตรงนี้
// ============================================================================
const VERSION = '4.0.0';

const CONFIG = {
  SHOP_NAME: "Chomm's House",
  SENDER_NAME: "Chomm's House",            // ชื่อผู้ส่งที่ลูกค้าเห็นในอีเมล

  // อีเมลแอดมินที่จะรับแจ้งเตือนออเดอร์ใหม่ (เว้นว่าง = ใช้อีเมลเจ้าของสคริปต์)
  ADMIN_EMAIL: '',
  // อีเมลเพิ่มเติมที่ต้องการให้รับแจ้งเตือนด้วย คั่นด้วยจุลภาค เช่น 'a@gmail.com,b@gmail.com'
  ADMIN_CC: '',

  // เว้นว่างได้ ถ้าสคริปต์นี้ผูกอยู่กับ Google Sheet (Extensions → Apps Script)
  SPREADSHEET_ID: '',

  SLIP_FOLDER_NAME: "Chomm's Slips",
  SLIP_PUBLIC_LINK: true,                  // true = ใครมีลิงก์ก็เปิดดูสลิปได้ (เหมือนระบบเดิม)
  MAX_SLIP_BYTES: 8 * 1024 * 1024,         // ขนาดสลิปสูงสุด 8MB

  TIMEZONE: 'Asia/Bangkok',
  WEBSITE_URL: 'https://chomms-official.github.io/Web-Chomm-s-House/',
  LINE_URL: 'https://lin.ee/VAbHOnM',
  FACEBOOK_URL: 'https://www.facebook.com/ChommsHouseTH/',

  SEND_CUSTOMER_CONFIRMATION: true,        // ส่งอีเมลยืนยันให้ลูกค้าเมื่อสั่งซื้อ
  SEND_ADMIN_NOTIFICATION: true,           // ส่งอีเมลแจ้งแอดมินเมื่อมีออเดอร์ใหม่
  ATTACH_SLIP_TO_ADMIN_EMAIL: true,        // แนบรูปสลิปในอีเมลแจ้งแอดมิน
  SEND_STATUS_EMAILS: true,                // ส่งอีเมลเมื่อเปลี่ยนสถานะในชีท

  DAILY_SUMMARY_ENABLED: true,             // ส่งสรุปยอดประจำวันให้แอดมิน
  DAILY_SUMMARY_HOUR: 20,                  // เวลาส่ง (0–23) ตามเวลาไทย

  VIP_THRESHOLD: 1000,                     // ยอดซื้อสะสม > ค่านี้ = 💛 VIP
  VVIP_THRESHOLD: 3000,                    // ยอดซื้อสะสม > ค่านี้ = 👑 VVIP
};

// ============================================================================
// 1) CONSTANTS — โครงสร้างชีท (ห้ามเปลี่ยนลำดับ A–I เพราะเป็นข้อมูลเดิม)
// ============================================================================
const SHEETS = {
  ORDERS: 'Orders',
  CUSTOMERS: 'User Profiles',
  SUMMARY: 'Summary',
  LOG: 'System Log',
};

const COL = {
  TIMESTAMP: 1,  // A
  EMAIL: 2,      // B
  NAME: 3,       // C
  PHONE: 4,      // D
  ADDRESS: 5,    // E
  ITEMS: 6,      // F
  TOTAL: 7,      // G
  UID: 8,        // H
  SLIP: 9,       // I
  ORDER_ID: 10,  // J  (ใหม่)
  QTY: 11,       // K  (ใหม่)
  STATUS: 12,    // L  (ใหม่)
  TRACKING: 13,  // M  (ใหม่)
  NOTE: 14,      // N  (ใหม่)
  EMAIL_LOG: 15, // O  (ใหม่)
  DATA: 16,      // P  (ใหม่ — ข้อมูลระบบ ซ่อนไว้)
};
const NUM_COLS = 16;

const HEADERS = [
  '📅 วันที่/เวลา (Timestamp)',
  '📧 อีเมลลูกค้า (Email)',
  '👤 ชื่อลูกค้า (Name)',
  '📞 เบอร์โทร (Phone)',
  '📍 ที่อยู่จัดส่ง (Address)',
  '🛍️ รายละเอียดสินค้า (Items)',
  '💰 ยอดรวมสุทธิ (฿)',
  '🔑 รหัสลูกค้า (UID)',
  '🔗 สลิปการโอน (Slip)',
  '🧾 เลขที่คำสั่งซื้อ (Order ID)',
  '📦 จำนวนชิ้น (Qty)',
  '🚦 สถานะ (Status)',
  '🚚 เลขพัสดุ (Tracking)',
  '📝 หมายเหตุ (Note)',
  '📨 อีเมลที่ส่งแล้ว (Email Log)',
  '⚙️ ข้อมูลระบบ (ห้ามแก้ไข)',
];

const STATUS = {
  PENDING: '🟡 รอตรวจสอบสลิป',
  PAID: '🟢 ชำระเงินแล้ว',
  PREPARING: '📦 กำลังเตรียมจัดส่ง',
  SHIPPED: '🚚 จัดส่งแล้ว',
  CANCELLED: '🔴 ยกเลิก',
};
const STATUS_LIST = [STATUS.PENDING, STATUS.PAID, STATUS.PREPARING, STATUS.SHIPPED, STATUS.CANCELLED];
const STATUS_COLORS = {
  PENDING: { bg: '#fff4cc', fg: '#7a5b00' },
  PAID: { bg: '#dcf5e3', fg: '#1e6b35' },
  PREPARING: { bg: '#e3ecfb', fg: '#24467a' },
  SHIPPED: { bg: '#e9e1f7', fg: '#4b2d7f' },
  CANCELLED: { bg: '#fbe0e0', fg: '#8a1f1f' },
};

const COLOR_NAMES = {
  'white': 'Natural', 'White': 'Natural', 'natural': 'Natural',
  'light-green': 'Pandan', 'Light Green': 'Pandan', 'pandan': 'Pandan',
  'lime': 'Turmeric', 'Lime': 'Turmeric', 'turmeric': 'Turmeric',
  'charcoal': 'Charcoal',
};

const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const OUR_TRIGGER_HANDLERS = ['handleOrderEdit', 'syncAll', 'sendDailySummary', 'syncData'];

const BRAND = {
  DARK: '#3b3228',
  LIME: '#dce495',
  CREAM: '#faf8f3',
  BG: '#f4f1ea',
  MUTED: '#8a7f72',
  BORDER: '#eee7da',
};

// ============================================================================
// 2) WEB APP ENTRY POINTS
// ============================================================================

/** เปิดลิงก์ Web App ในเบราว์เซอร์เพื่อเช็กว่าระบบออนไลน์อยู่ */
function doGet() {
  return json_({ status: 'ok', service: CONFIG.SHOP_NAME + ' backend', version: VERSION, time: new Date().toISOString() });
}

/** รับคำสั่งซื้อจากหน้าเว็บ */
function doPost(e) {
  let data;
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('ไม่มีข้อมูลที่ส่งมา');
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    logError_('doPost/parse', err);
    return json_({ status: 'error', message: 'รูปแบบข้อมูลไม่ถูกต้อง' });
  }

  const type = data.type || 'order';
  if (type === 'ping') return json_({ status: 'ok', version: VERSION });
  if (type !== 'order') return json_({ status: 'error', message: 'ไม่รู้จักประเภทคำขอ: ' + type });

  try {
    return json_(handleOrder_(data));
  } catch (err) {
    logError_('doPost/order', err, summarizePayload_(data));
    notifyAdminOfError_(err, data);
    return json_({ status: 'error', message: err.message });
  }
}

// ============================================================================
// 3) ORDER PROCESSING
// ============================================================================

function handleOrder_(data) {
  const order = normalizeOrder_(data);
  const ss = getSs_();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  let row;
  let slip = { url: '', blob: null, error: '' };
  let sheet;
  try {
    sheet = ensureOrdersSheet_(ss);

    // กันออเดอร์ซ้ำ (เช่น ลูกค้ากดยืนยันซ้ำ หรือเน็ตหลุดแล้วส่งใหม่)
    const existingRow = findRowByOrderId_(sheet, order.orderId);
    if (existingRow > 0) {
      const slipFormula = sheet.getRange(existingRow, COL.SLIP).getFormula();
      logInfo_('doPost/duplicate', 'ได้รับออเดอร์ซ้ำ ข้ามการบันทึก', order.orderId);
      return { status: 'success', duplicate: true, orderId: order.orderId, slipUrl: extractUrl_(slipFormula), emailSent: true };
    }

    try {
      slip = saveSlip_(order, data);
    } catch (slipErr) {
      slip.error = slipErr.message;
      logError_('saveSlip', slipErr, order.orderId);
    }

    row = appendOrderRow_(sheet, order, slip);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }

  // ส่งอีเมล (ทำหลังปลดล็อก เพื่อไม่ให้ออเดอร์อื่นต้องรอ)
  let emailSent = false;
  let adminNotified = false;
  let customerEmailError = '';

  if (CONFIG.SEND_CUSTOMER_CONFIRMATION && isEmail_(order.customer.email)) {
    try {
      sendCustomerConfirmation_(order);
      emailSent = true;
      appendEmailLog_(sheet, row, 'CONFIRM', '✅ ยืนยันคำสั่งซื้อถึงลูกค้า');
    } catch (mailErr) {
      customerEmailError = mailErr.message;
      appendEmailLog_(sheet, row, 'CONFIRM-FAIL', '❌ ส่งอีเมลยืนยันไม่สำเร็จ: ' + mailErr.message);
      logError_('mail/customer', mailErr, order.orderId);
    }
  }

  if (CONFIG.SEND_ADMIN_NOTIFICATION) {
    try {
      sendAdminNewOrder_(order, slip, ss, sheet, row, customerEmailError);
      adminNotified = true;
      appendEmailLog_(sheet, row, 'ADMIN', '🔔 แจ้งเตือนแอดมินแล้ว');
    } catch (mailErr) {
      appendEmailLog_(sheet, row, 'ADMIN-FAIL', '❌ แจ้งเตือนแอดมินไม่สำเร็จ: ' + mailErr.message);
      logError_('mail/admin', mailErr, order.orderId);
    }
  }

  return {
    status: 'success',
    orderId: order.orderId,
    slipUrl: slip.url || '',
    emailSent: emailSent,
    adminNotified: adminNotified,
  };
}

function normalizeOrder_(data) {
  const c = data.customerInfo || {};
  const customer = {
    name: str_(c.name || data.name, 200),
    phone: str_(c.phone || data.phone, 50),
    address: str_(c.address || data.address, 2000),
    email: str_(data.userEmail || data.email, 200),
  };
  if (!customer.name) throw new Error('ไม่มีชื่อผู้รับสินค้า');
  if (!customer.phone) throw new Error('ไม่มีเบอร์โทรศัพท์');
  if (!customer.address) throw new Error('ไม่มีที่อยู่จัดส่ง');

  const rawItems = Array.isArray(data.items) ? data.items.slice(0, 100) : [];
  if (!rawItems.length) throw new Error('ไม่มีรายการสินค้า');

  const items = rawItems.map(function (it) {
    const quantity = Math.max(1, Math.min(999, parseInt(it.quantity, 10) || 1));
    const price = Math.max(0, Number(it.price) || 0);
    return {
      color: colorName_(it.color),
      size: str_(it.size, 60),
      scent: str_(it.scent, 80),
      packaging: str_(it.package || it.packaging, 80),
      decoration: str_(it.decoration, 80),
      addon: it.addon === true || it.addon === 'true',
      quantity: quantity,
      price: price,
      subtotal: quantity * price,
    };
  });

  const computedTotal = items.reduce(function (s, it) { return s + it.subtotal; }, 0);
  const declared = Number(data.totalPrice);
  const total = isFinite(declared) && declared > 0 ? declared : computedTotal;

  const orderId = /^CH-\d{6}-[A-Z0-9]{4,8}$/.test(String(data.orderId || '')) ? String(data.orderId) : generateOrderId_(new Date());

  return {
    orderId: orderId,
    createdAt: new Date(), // ใช้เวลาเซิร์ฟเวอร์ (แม่นยำกว่าเวลาในเครื่องลูกค้า)
    customer: customer,
    uid: str_(data.userId, 128),
    items: items,
    quantity: items.reduce(function (s, it) { return s + it.quantity; }, 0),
    total: total,
    computedTotal: computedTotal,
    totalMismatch: Math.abs(total - computedTotal) > 0.01,
    status: STATUS.PENDING,
  };
}

function appendOrderRow_(sheet, order, slip) {
  const row = new Array(NUM_COLS).fill('');
  row[COL.TIMESTAMP - 1] = order.createdAt;
  row[COL.EMAIL - 1] = safeCell_(order.customer.email);
  row[COL.NAME - 1] = safeCell_(order.customer.name);
  row[COL.PHONE - 1] = "'" + order.customer.phone; // ' นำหน้า = เก็บเป็นข้อความ เลข 0 ด้านหน้าไม่หาย
  row[COL.ADDRESS - 1] = safeCell_(order.customer.address);
  row[COL.ITEMS - 1] = safeCell_(itemsToText_(order.items));
  row[COL.TOTAL - 1] = order.total;
  row[COL.UID - 1] = safeCell_(order.uid);
  row[COL.SLIP - 1] = slip.url
    ? '=HYPERLINK("' + slip.url + '", "🔍 ดูสลิป")'
    : (slip.error ? 'เซฟสลิปไม่สำเร็จ: ' + slip.error : 'ไม่มีสลิป');
  row[COL.ORDER_ID - 1] = order.orderId;
  row[COL.QTY - 1] = order.quantity;
  row[COL.STATUS - 1] = STATUS.PENDING;
  row[COL.TRACKING - 1] = '';
  row[COL.NOTE - 1] = order.totalMismatch
    ? '⚠️ ยอดรวมไม่ตรงกับราคาสินค้า (คำนวณได้ ฿' + money_(order.computedTotal) + ')'
    : '';
  row[COL.EMAIL_LOG - 1] = '';
  row[COL.DATA - 1] = JSON.stringify({ v: 1, items: order.items });

  const r = Math.max(sheet.getLastRow(), 1) + 1;
  sheet.getRange(r, 1, 1, NUM_COLS).setValues([row]);
  sheet.getRange(r, COL.TIMESTAMP).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  sheet.getRange(r, COL.TOTAL).setNumberFormat('฿#,##0.00');
  return r;
}

function saveSlip_(order, data) {
  if (!data.slipBase64) return { url: '', blob: null, error: '' };

  let b64 = String(data.slipBase64);
  const marker = b64.indexOf('base64,');
  if (marker > -1) b64 = b64.substring(marker + 7);

  const bytes = Utilities.base64Decode(b64);
  if (!bytes.length) throw new Error('ไฟล์สลิปว่างเปล่า');
  if (bytes.length > CONFIG.MAX_SLIP_BYTES) throw new Error('ไฟล์สลิปใหญ่เกินไป');

  const mime = /^image\/(jpeg|png|webp|gif|heic)$/.test(String(data.slipMimeType || '')) ? data.slipMimeType : 'image/jpeg';
  const ext = mime.split('/')[1].replace('jpeg', 'jpg');
  const safeName = order.customer.name.replace(/[^\w\u0E00-\u0E7F]+/g, '_').slice(0, 40);
  const blob = Utilities.newBlob(bytes, mime, order.orderId + '_' + safeName + '.' + ext);

  const folder = getSlipFolder_(order.createdAt);
  const file = folder.createFile(blob);
  file.setDescription('Order ' + order.orderId + ' • ' + order.customer.name + ' • ฿' + money_(order.total));
  if (CONFIG.SLIP_PUBLIC_LINK) {
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      // บัญชี Google Workspace บางแห่งไม่อนุญาตแชร์สาธารณะ — ไฟล์ยังอยู่ เจ้าของยังเปิดดูได้
      logInfo_('saveSlip/share', 'ตั้งค่าแชร์ลิงก์ไม่ได้: ' + shareErr.message, order.orderId);
    }
  }
  return { url: file.getUrl(), blob: blob, error: '' };
}

function getSlipFolder_(date) {
  const props = PropertiesService.getScriptProperties();
  let root = null;
  const savedId = props.getProperty('SLIP_FOLDER_ID');
  if (savedId) {
    try { root = DriveApp.getFolderById(savedId); } catch (e) { root = null; }
  }
  if (!root) {
    const found = DriveApp.getFoldersByName(CONFIG.SLIP_FOLDER_NAME);
    root = found.hasNext() ? found.next() : DriveApp.createFolder(CONFIG.SLIP_FOLDER_NAME);
    props.setProperty('SLIP_FOLDER_ID', root.getId());
  }
  const monthName = Utilities.formatDate(date || new Date(), CONFIG.TIMEZONE, 'yyyy-MM');
  const sub = root.getFoldersByName(monthName);
  return sub.hasNext() ? sub.next() : root.createFolder(monthName);
}

function findRowByOrderId_(sheet, orderId) {
  const last = sheet.getLastRow();
  if (last < 2 || !orderId) return -1;
  const cell = sheet.getRange(2, COL.ORDER_ID, last - 1, 1).createTextFinder(orderId).matchEntireCell(true).findNext();
  return cell ? cell.getRow() : -1;
}

function appendEmailLog_(sheet, row, tag, label) {
  try {
    const cell = sheet.getRange(row, COL.EMAIL_LOG);
    const prev = String(cell.getValue() || '');
    const line = '[' + tag + '] ' + label + ' • ' + Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'dd/MM/yyyy HH:mm');
    cell.setValue(prev ? prev + '\n' + line : line);
  } catch (e) {
    logError_('appendEmailLog', e);
  }
}

// ============================================================================
// 4) STATUS CHANGE → AUTO EMAIL (installable onEdit trigger)
// ============================================================================

/**
 * ทำงานอัตโนมัติเมื่อแก้ไขชีท (ต้องกดติดตั้งผ่านเมนูก่อน)
 * ⚠️ ห้ามเปลี่ยนชื่อฟังก์ชันนี้เป็น onEdit เพราะ simple trigger ส่งอีเมลไม่ได้
 */
function handleOrderEdit(e) {
  try {
    if (!e || !e.range || !CONFIG.SEND_STATUS_EMAILS) return;
    const sheet = e.range.getSheet();
    if (sheet.getName() !== SHEETS.ORDERS) return;

    const c0 = e.range.getColumn();
    const c1 = e.range.getLastColumn();
    const touchesStatus = c0 <= COL.STATUS && c1 >= COL.STATUS;
    const touchesTracking = c0 <= COL.TRACKING && c1 >= COL.TRACKING;
    if (!touchesStatus && !touchesTracking) return;

    const r0 = Math.max(2, e.range.getRow());
    const r1 = Math.min(e.range.getLastRow(), r0 + 49); // ป้องกันส่งอีเมลจำนวนมากโดยไม่ตั้งใจ (สูงสุด 50 แถวต่อครั้ง)
    for (let r = r0; r <= r1; r++) {
      const result = processStatusEmail_(sheet, r, false);
      if (result.message) toast_(result.message, result.sent ? '📨 ส่งอีเมลแล้ว' : 'ℹ️ แจ้งเตือน', 6);
    }
    if (e.range.getLastRow() > r1) {
      toast_('แก้ไขพร้อมกันเกิน 50 แถว ระบบประมวลผลเฉพาะ 50 แถวแรก', '⚠️ แจ้งเตือน', 8);
    }
  } catch (err) {
    logError_('handleOrderEdit', err);
  }
}

function processStatusEmail_(sheet, row, force) {
  const values = sheet.getRange(row, 1, 1, NUM_COLS).getValues()[0];
  const slipFormula = sheet.getRange(row, COL.SLIP).getFormula();
  const order = rowToOrder_(values, row, slipFormula);
  const key = order.statusKey;

  if (key !== 'PAID' && key !== 'SHIPPED' && key !== 'CANCELLED') return { sent: false, message: '' };
  if (!force && order.emailLog.indexOf('[' + key + ']') > -1) return { sent: false, message: '' };

  const label = order.orderId || ('แถว ' + row);
  if (!isEmail_(order.customer.email)) {
    return { sent: false, message: 'ออเดอร์ ' + label + ' ไม่มีอีเมลลูกค้าที่ถูกต้อง จึงไม่ได้ส่งอีเมล' };
  }
  if (key === 'SHIPPED' && !order.tracking) {
    return { sent: false, message: 'กรอก "เลขพัสดุ" ในคอลัมน์ M ของออเดอร์ ' + label + ' แล้วระบบจะส่งอีเมลแจ้งจัดส่งให้อัตโนมัติ' };
  }

  if (!order.orderId) {
    order.orderId = generateOrderId_(order.createdAt || new Date());
    sheet.getRange(row, COL.ORDER_ID).setValue(order.orderId);
  }

  try {
    sendStatusEmail_(order, key);
    const labels = { PAID: '🟢 แจ้งยืนยันการชำระเงิน', SHIPPED: '🚚 แจ้งจัดส่งสินค้า (' + order.tracking + ')', CANCELLED: '🔴 แจ้งยกเลิกคำสั่งซื้อ' };
    appendEmailLog_(sheet, row, key, labels[key]);
    return { sent: true, message: labels[key] + ' ถึง ' + order.customer.email + ' แล้ว' };
  } catch (err) {
    appendEmailLog_(sheet, row, key + '-FAIL', '❌ ส่งอีเมลไม่สำเร็จ: ' + err.message);
    logError_('mail/status', err, label);
    return { sent: false, message: 'ส่งอีเมลไม่สำเร็จ: ' + err.message };
  }
}

// ============================================================================
// 5) EMAILS
// ============================================================================

function sendMail_(opts) {
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error('โควตาส่งอีเมลของวันนี้หมดแล้ว (Gmail จำกัดจำนวนต่อวัน)');
  const message = {
    to: opts.to,
    subject: opts.subject,
    htmlBody: opts.html,
    body: htmlToText_(opts.html),
    name: CONFIG.SENDER_NAME,
  };
  if (opts.replyTo) message.replyTo = opts.replyTo;
  if (opts.cc) message.cc = opts.cc;
  if (opts.attachments && opts.attachments.length) message.attachments = opts.attachments;
  MailApp.sendEmail(message);
}

function sendCustomerConfirmation_(order) {
  const body =
    h1_('ขอบคุณสำหรับคำสั่งซื้อ 🤍') +
    p_('สวัสดีคุณ <b>' + esc_(order.customer.name) + '</b>') +
    p_('เราได้รับคำสั่งซื้อและสลิปการโอนเงินของคุณเรียบร้อยแล้ว ทีมงานกำลังตรวจสอบการชำระเงิน และจะแจ้งความคืบหน้าให้ทราบทางอีเมลนี้') +
    orderMetaBox_(order, 'PENDING') +
    itemsTable_(order.items, order.total) +
    sectionTitle_('ข้อมูลการจัดส่ง') +
    infoTable_([
      ['ชื่อผู้รับ', esc_(order.customer.name)],
      ['เบอร์โทร', esc_(order.customer.phone)],
      ['ที่อยู่', nl2br_(esc_(order.customer.address))],
    ]) +
    progressSteps_(1) +
    '<div style="text-align:center;margin:28px 0 8px;">' + button_('💬 สอบถามทาง LINE', CONFIG.LINE_URL, '#06C755') + '</div>' +
    small_('มีข้อสงสัยเกี่ยวกับคำสั่งซื้อ ตอบกลับอีเมลนี้ได้เลย');

  sendMail_({
    to: order.customer.email,
    subject: 'ยืนยันคำสั่งซื้อ #' + order.orderId + ' — ' + CONFIG.SHOP_NAME,
    html: layout_('เราได้รับคำสั่งซื้อ #' + order.orderId + ' ของคุณแล้ว', body),
    replyTo: getAdminEmail_(),
  });
}

function sendAdminNewOrder_(order, slip, ss, sheet, row, customerEmailError) {
  const admin = getAdminEmail_();
  if (!admin) throw new Error('ไม่พบอีเมลแอดมิน');

  const warnings = [];
  if (order.totalMismatch) warnings.push('ยอดที่ลูกค้าเห็น (฿' + money_(order.total) + ') ไม่ตรงกับราคาสินค้ารวม (฿' + money_(order.computedTotal) + ')');
  if (slip.error) warnings.push('บันทึกสลิปไม่สำเร็จ: ' + slip.error);
  if (!slip.url && !slip.error) warnings.push('ออเดอร์นี้ไม่มีสลิปแนบมา');
  if (!isEmail_(order.customer.email)) warnings.push('ลูกค้าไม่มีอีเมล จึงไม่ได้ส่งอีเมลยืนยัน');
  if (customerEmailError) warnings.push('ส่งอีเมลยืนยันถึงลูกค้าไม่สำเร็จ: ' + customerEmailError);

  const sheetUrl = ss.getUrl() + '#gid=' + sheet.getSheetId() + '&range=A' + row;
  const willAttach = CONFIG.ATTACH_SLIP_TO_ADMIN_EMAIL && slip.blob;

  const body =
    h1_('🛍️ ออเดอร์ใหม่เข้ามาแล้ว!') +
    orderMetaBox_(order, 'PENDING') +
    (warnings.length ? warningBox_(warnings) : '') +
    sectionTitle_('ข้อมูลลูกค้า') +
    infoTable_([
      ['ชื่อ', esc_(order.customer.name)],
      ['อีเมล', order.customer.email ? '<a href="mailto:' + esc_(order.customer.email) + '" style="color:' + BRAND.DARK + ';">' + esc_(order.customer.email) + '</a>' : '-'],
      ['เบอร์โทร', '<a href="tel:' + esc_(order.customer.phone.replace(/[^\d+]/g, '')) + '" style="color:' + BRAND.DARK + ';">' + esc_(order.customer.phone) + '</a>'],
      ['ที่อยู่', nl2br_(esc_(order.customer.address))],
      ['UID', '<span style="color:' + BRAND.MUTED + ';font-size:12px;">' + esc_(order.uid || '-') + '</span>'],
    ]) +
    itemsTable_(order.items, order.total) +
    '<div style="text-align:center;margin:28px 0 8px;">' +
    (slip.url ? button_('🔍 ดูสลิป', slip.url, BRAND.DARK) + '&nbsp;&nbsp;' : '') +
    button_('📊 เปิดออเดอร์ในชีท', sheetUrl, '#1e6b35') +
    '</div>' +
    (willAttach ? small_('📎 แนบรูปสลิปมากับอีเมลนี้แล้ว') : '') +
    small_('ตรวจสลิปแล้ว ให้เปลี่ยนคอลัมน์ "สถานะ" เป็น <b>' + STATUS.PAID + '</b> ระบบจะส่งอีเมลแจ้งลูกค้าให้อัตโนมัติ');

  sendMail_({
    to: admin,
    cc: CONFIG.ADMIN_CC || '',
    subject: '🛍️ ออเดอร์ใหม่ #' + order.orderId + ' • ฿' + money_(order.total) + ' • ' + order.customer.name,
    html: layout_('ออเดอร์ใหม่จาก ' + order.customer.name + ' ยอด ฿' + money_(order.total), body),
    replyTo: isEmail_(order.customer.email) ? order.customer.email : '',
    attachments: willAttach ? [slip.blob] : [],
  });
}

function sendStatusEmail_(order, key) {
  let subject, preheader, body;

  if (key === 'PAID') {
    subject = 'ชำระเงินเรียบร้อย #' + order.orderId + ' — ' + CONFIG.SHOP_NAME;
    preheader = 'เรายืนยันการชำระเงินของคุณแล้ว กำลังเตรียมสินค้าให้';
    body =
      h1_('ยืนยันการชำระเงินแล้ว ✨') +
      p_('สวัสดีคุณ <b>' + esc_(order.customer.name) + '</b>') +
      p_('เราได้ตรวจสอบและยืนยันการชำระเงินของคุณเรียบร้อยแล้ว ตอนนี้ทีมงานกำลังเตรียมสินค้าทำมือของคุณอย่างตั้งใจ เมื่อจัดส่งแล้วจะแจ้งเลขพัสดุให้ทางอีเมลนี้') +
      orderMetaBox_(order, 'PAID') +
      itemsTable_(order.items, order.total) +
      progressSteps_(2);
  } else if (key === 'SHIPPED') {
    const trackUrl = trackingUrl_(order.tracking);
    subject = 'สินค้าของคุณจัดส่งแล้ว 🚚 #' + order.orderId + ' — ' + CONFIG.SHOP_NAME;
    preheader = 'เลขพัสดุของคุณคือ ' + order.tracking;
    body =
      h1_('สินค้าของคุณออกเดินทางแล้ว 🚚') +
      p_('สวัสดีคุณ <b>' + esc_(order.customer.name) + '</b>') +
      p_('คำสั่งซื้อของคุณถูกจัดส่งเรียบร้อยแล้ว สามารถติดตามพัสดุได้ด้วยเลขด้านล่างนี้') +
      '<div style="background:' + BRAND.CREAM + ';border:1px dashed #cfc5b3;border-radius:16px;padding:20px;text-align:center;margin:20px 0;">' +
      '<div style="font-size:12px;color:' + BRAND.MUTED + ';letter-spacing:1px;">เลขพัสดุ (Tracking Number)</div>' +
      '<div style="font-family:Consolas,Menlo,monospace;font-size:24px;font-weight:bold;color:' + BRAND.DARK + ';letter-spacing:2px;margin-top:6px;">' + esc_(order.tracking) + '</div>' +
      (trackUrl ? '<div style="margin-top:16px;">' + button_('📍 ติดตามพัสดุ', trackUrl, BRAND.DARK) + '</div>' : '<div style="font-size:12px;color:' + BRAND.MUTED + ';margin-top:10px;">นำเลขนี้ไปตรวจสอบกับเว็บไซต์ของบริษัทขนส่งได้เลย</div>') +
      '</div>' +
      orderMetaBox_(order, 'SHIPPED') +
      itemsTable_(order.items, order.total) +
      sectionTitle_('จัดส่งถึง') +
      infoTable_([
        ['ชื่อผู้รับ', esc_(order.customer.name)],
        ['ที่อยู่', nl2br_(esc_(order.customer.address))],
      ]) +
      progressSteps_(3) +
      p_('ขอให้มีความสุขกับกลิ่นหอมจาก ' + esc_(CONFIG.SHOP_NAME) + ' นะ 🤍');
  } else if (key === 'CANCELLED') {
    subject = 'คำสั่งซื้อ #' + order.orderId + ' ถูกยกเลิก — ' + CONFIG.SHOP_NAME;
    preheader = 'แจ้งยกเลิกคำสั่งซื้อ #' + order.orderId;
    body =
      h1_('แจ้งยกเลิกคำสั่งซื้อ') +
      p_('สวัสดีคุณ <b>' + esc_(order.customer.name) + '</b>') +
      p_('คำสั่งซื้อด้านล่างนี้ถูกยกเลิกแล้ว หากคุณได้ชำระเงินไปแล้ว ทีมงานจะติดต่อกลับเพื่อดำเนินการคืนเงิน หรือสามารถติดต่อเราได้ทันทีทาง LINE') +
      orderMetaBox_(order, 'CANCELLED') +
      itemsTable_(order.items, order.total) +
      '<div style="text-align:center;margin:28px 0 8px;">' + button_('💬 ติดต่อทาง LINE', CONFIG.LINE_URL, '#06C755') + '</div>';
  } else {
    return;
  }

  body += small_('มีข้อสงสัยเกี่ยวกับคำสั่งซื้อ ตอบกลับอีเมลนี้ได้เลย');
  sendMail_({ to: order.customer.email, subject: subject, html: layout_(preheader, body), replyTo: getAdminEmail_() });
}

function notifyAdminOfError_(err, data) {
  try {
    const cache = CacheService.getScriptCache();
    const key = 'err_' + Utilities.base64EncodeWebSafe(String(err.message)).slice(0, 200);
    if (cache.get(key)) return; // ไม่ส่งซ้ำภายใน 10 นาที
    cache.put(key, '1', 600);

    const admin = getAdminEmail_();
    if (!admin) return;
    const c = (data && data.customerInfo) || {};
    const body =
      h1_('⚠️ รับออเดอร์ไม่สำเร็จ') +
      p_('ระบบไม่สามารถบันทึกออเดอร์นี้ได้ กรุณาติดต่อลูกค้าเพื่อยืนยันคำสั่งซื้อ') +
      warningBox_([String(err.message)]) +
      infoTable_([
        ['ชื่อ', esc_(c.name || '-')],
        ['อีเมล', esc_((data && data.userEmail) || '-')],
        ['เบอร์โทร', esc_(c.phone || '-')],
        ['ยอดรวม', '฿' + money_(Number(data && data.totalPrice) || 0)],
      ]);
    sendMail_({ to: admin, subject: '⚠️ ' + CONFIG.SHOP_NAME + ': รับออเดอร์ไม่สำเร็จ', html: layout_('รับออเดอร์ไม่สำเร็จ', body) });
  } catch (e) {
    logError_('notifyAdminOfError', e);
  }
}

// ---------- Email building blocks ----------

function layout_(preheader, inner) {
  const year = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy');
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background:' + BRAND.BG + ';">' +
    '<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">' + esc_(preheader) + '</span>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + BRAND.BG + ';padding:24px 12px;"><tr><td align="center">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:' + BRAND.DARK + ';box-shadow:0 4px 24px rgba(59,50,40,0.08);">' +
    '<tr><td style="background:' + BRAND.DARK + ';padding:30px 32px;text-align:center;">' +
    '<div style="font-family:Georgia,\'Times New Roman\',serif;font-style:italic;font-size:32px;color:#ffffff;letter-spacing:.5px;">' + esc_(CONFIG.SHOP_NAME) + '</div>' +
    '<div style="font-family:Georgia,serif;font-style:italic;font-size:13px;color:' + BRAND.LIME + ';margin-top:6px;">Where the scent, Carry the Story</div>' +
    '</td></tr>' +
    '<tr><td style="padding:32px 28px;font-size:15px;line-height:1.7;">' + inner + '</td></tr>' +
    '<tr><td style="background:' + BRAND.CREAM + ';padding:22px 28px;text-align:center;font-size:12px;color:' + BRAND.MUTED + ';border-top:1px solid ' + BRAND.BORDER + ';line-height:1.8;">' +
    '<a href="' + CONFIG.LINE_URL + '" style="color:' + BRAND.DARK + ';text-decoration:none;font-weight:bold;">LINE Official</a> &nbsp;·&nbsp; ' +
    '<a href="' + CONFIG.FACEBOOK_URL + '" style="color:' + BRAND.DARK + ';text-decoration:none;font-weight:bold;">Facebook</a> &nbsp;·&nbsp; ' +
    '<a href="' + CONFIG.WEBSITE_URL + '" style="color:' + BRAND.DARK + ';text-decoration:none;font-weight:bold;">เว็บไซต์</a><br>' +
    '© ' + year + ' ' + esc_(CONFIG.SHOP_NAME) + ' — Handmade Aroma Wax Sachet' +
    '</td></tr></table></td></tr></table></body></html>';
}

function h1_(t) { return '<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:normal;color:' + BRAND.DARK + ';margin:0 0 18px;">' + t + '</h1>'; }
function p_(t) { return '<p style="margin:0 0 12px;color:#4a4036;">' + t + '</p>'; }
function small_(t) { return '<p style="margin:14px 0 0;font-size:12px;color:' + BRAND.MUTED + ';text-align:center;">' + t + '</p>'; }
function sectionTitle_(t) { return '<div style="font-size:13px;font-weight:bold;letter-spacing:1px;color:' + BRAND.MUTED + ';text-transform:uppercase;margin:26px 0 10px;">' + t + '</div>'; }

function button_(label, url, bg) {
  return '<a href="' + esc_(url) + '" target="_blank" style="display:inline-block;background:' + bg + ';color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 26px;border-radius:999px;margin:4px 0;">' + label + '</a>';
}

function badge_(key) {
  const c = STATUS_COLORS[key] || STATUS_COLORS.PENDING;
  return '<span style="display:inline-block;background:' + c.bg + ';color:' + c.fg + ';font-size:12px;font-weight:bold;padding:4px 12px;border-radius:999px;">' + esc_(STATUS[key] || '') + '</span>';
}

function orderMetaBox_(order, key) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + BRAND.CREAM + ';border-radius:14px;margin:20px 0;"><tr>' +
    '<td style="padding:16px 18px;"><div style="font-size:12px;color:' + BRAND.MUTED + ';">เลขที่คำสั่งซื้อ</div><div style="font-size:17px;font-weight:bold;letter-spacing:.5px;">#' + esc_(order.orderId) + '</div></td>' +
    '<td style="padding:16px 18px;"><div style="font-size:12px;color:' + BRAND.MUTED + ';">วันที่สั่งซื้อ</div><div style="font-size:14px;">' + esc_(thaiDate_(order.createdAt)) + '</div></td>' +
    '<td style="padding:16px 18px;text-align:right;">' + badge_(key) + '</td>' +
    '</tr></table>';
}

function itemsTable_(items, total) {
  let rows = '';
  (items || []).forEach(function (it) {
    const details = it.raw ? '' : [it.size, it.scent, it.packaging, it.decoration, it.addon ? 'สติกเกอร์โลโก้' : ''].filter(Boolean).join(' · ');
    rows += '<tr>' +
      '<td style="padding:12px 0;border-bottom:1px solid ' + BRAND.BORDER + ';vertical-align:top;">' +
      '<div style="font-weight:bold;">' + esc_(it.raw || ('ถุงหอม ' + (it.color || ''))) + '</div>' +
      (details ? '<div style="font-size:12px;color:' + BRAND.MUTED + ';margin-top:2px;">' + esc_(details) + '</div>' : '') +
      '</td>' +
      '<td style="padding:12px 8px;border-bottom:1px solid ' + BRAND.BORDER + ';text-align:center;vertical-align:top;white-space:nowrap;">× ' + (it.quantity || 1) + '</td>' +
      '<td style="padding:12px 0;border-bottom:1px solid ' + BRAND.BORDER + ';text-align:right;vertical-align:top;white-space:nowrap;">' + (it.subtotal ? '฿' + money_(it.subtotal) : '') + '</td>' +
      '</tr>';
  });
  return sectionTitle_('รายการสินค้า') +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">' + rows +
    '<tr><td colspan="2" style="padding:14px 0 0;font-weight:bold;">ยอดชำระทั้งหมด</td>' +
    '<td style="padding:14px 0 0;text-align:right;font-weight:bold;font-size:18px;color:' + BRAND.DARK + ';white-space:nowrap;">฿' + money_(total) + '</td></tr>' +
    '</table>';
}

function infoTable_(pairs) {
  let rows = '';
  pairs.forEach(function (p) {
    rows += '<tr><td style="padding:8px 12px 8px 0;color:' + BRAND.MUTED + ';font-size:13px;width:90px;vertical-align:top;white-space:nowrap;">' + p[0] + '</td>' +
      '<td style="padding:8px 0;font-size:14px;vertical-align:top;">' + p[1] + '</td></tr>';
  });
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + rows + '</table>';
}

function warningBox_(lines) {
  return '<div style="background:#fff7e6;border:1px solid #f3d38b;border-radius:12px;padding:14px 16px;margin:16px 0;font-size:13px;color:#7a5200;">' +
    lines.map(function (l) { return '⚠️ ' + esc_(l); }).join('<br>') + '</div>';
}

function progressSteps_(current) {
  const steps = ['ตรวจสอบการชำระเงิน', 'เตรียมสินค้า', 'จัดส่ง & แจ้งเลขพัสดุ'];
  let cells = '';
  steps.forEach(function (label, i) {
    const n = i + 1;
    const done = n < current;
    const active = n === current;
    const circleBg = done ? '#1e6b35' : (active ? BRAND.DARK : '#e7e1d6');
    const circleFg = done || active ? '#ffffff' : BRAND.MUTED;
    cells += '<td style="text-align:center;width:33%;vertical-align:top;padding:0 4px;">' +
      '<div style="display:inline-block;width:30px;height:30px;line-height:30px;border-radius:50%;background:' + circleBg + ';color:' + circleFg + ';font-weight:bold;font-size:13px;">' + (done ? '✓' : n) + '</div>' +
      '<div style="font-size:12px;margin-top:6px;color:' + (active ? BRAND.DARK : BRAND.MUTED) + ';font-weight:' + (active ? 'bold' : 'normal') + ';">' + label + '</div>' +
      '</td>';
  });
  return sectionTitle_('ขั้นตอนต่อไป') + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' + cells + '</tr></table>';
}

function trackingUrl_(tracking) {
  const t = String(tracking || '').trim().toUpperCase().replace(/\s+/g, '');
  if (/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(t)) return 'https://track.thailandpost.co.th/?trackNumber=' + encodeURIComponent(t);
  return '';
}

// ============================================================================
// 6) SYNC: CUSTOMERS + SUMMARY DASHBOARD
// ============================================================================

function syncAll() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    toast_('ระบบกำลังทำงานอยู่ ลองใหม่อีกครั้งในอีกสักครู่', '⏳ Sync', 5);
    return;
  }
  try {
    const ss = getSs_();
    const sheet = ensureOrdersSheet_(ss);
    const orders = readOrders_(sheet);
    buildCustomers_(ss, orders);
    buildSummary_(ss, orders);
    toast_('อัปเดต Dashboard และ User Profiles แล้ว (' + orders.length + ' ออเดอร์)', '✅ Sync สำเร็จ', 4);
  } catch (err) {
    logError_('syncAll', err);
    toast_('Sync ไม่สำเร็จ: ' + err.message, '❌ Error', 8);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

/** ชื่อเดิมจากสคริปต์ Analytics เวอร์ชันก่อน — เก็บไว้เพื่อไม่ให้ trigger เก่าพัง */
function syncData() { syncAll(); }

function readOrders_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const range = sheet.getRange(2, 1, last - 1, NUM_COLS);
  const values = range.getValues();
  const slipFormulas = sheet.getRange(2, COL.SLIP, last - 1, 1).getFormulas();
  const out = [];
  values.forEach(function (row, i) {
    if (!row[COL.NAME - 1] && !row[COL.EMAIL - 1] && !row[COL.ITEMS - 1]) return;
    out.push(rowToOrder_(row, i + 2, slipFormulas[i][0]));
  });
  return out;
}

function rowToOrder_(row, rowIndex, slipFormula) {
  let items = [];
  const dataCell = row[COL.DATA - 1];
  if (dataCell) {
    try {
      const parsed = JSON.parse(dataCell);
      if (parsed && Array.isArray(parsed.items)) items = parsed.items;
    } catch (e) { /* ข้อมูลระบบเสียหาย → ใช้ข้อความรายการสินค้าแทน */ }
  }
  if (!items.length) items = parseItemsText_(row[COL.ITEMS - 1]);

  const qtyCell = Number(row[COL.QTY - 1]);
  const status = str_(row[COL.STATUS - 1], 100);
  return {
    row: rowIndex,
    orderId: str_(row[COL.ORDER_ID - 1], 40),
    createdAt: toDate_(row[COL.TIMESTAMP - 1]),
    customer: {
      email: str_(row[COL.EMAIL - 1], 200),
      name: str_(row[COL.NAME - 1], 200),
      phone: normalizePhone_(row[COL.PHONE - 1]),
      address: str_(row[COL.ADDRESS - 1], 2000),
    },
    uid: str_(row[COL.UID - 1], 128),
    items: items,
    total: Number(row[COL.TOTAL - 1]) || 0,
    quantity: qtyCell > 0 ? qtyCell : items.reduce(function (s, it) { return s + (Number(it.quantity) || 0); }, 0),
    status: status,
    statusKey: statusKey_(status),
    tracking: str_(row[COL.TRACKING - 1], 100),
    emailLog: String(row[COL.EMAIL_LOG - 1] || ''),
    slipUrl: extractUrl_(slipFormula),
  };
}

function buildCustomers_(ss, orders) {
  const sheet = getOrCreateSheet_(ss, SHEETS.CUSTOMERS, '#4285f4');
  const map = {};

  orders.forEach(function (o) {
    const key = (o.customer.email || '').toLowerCase() || o.uid || o.customer.phone;
    if (!key) return;
    if (!map[key]) map[key] = { name: '', email: o.customer.email, phone: '', orders: 0, spent: 0, first: null, last: null, colors: {}, scents: {} };
    const c = map[key];
    // ใช้ชื่อ/เบอร์ล่าสุดของลูกค้า
    if (!c.last || (o.createdAt && o.createdAt >= c.last)) {
      c.name = o.customer.name || c.name;
      c.phone = o.customer.phone || c.phone;
    }
    if (o.createdAt) {
      if (!c.first || o.createdAt < c.first) c.first = o.createdAt;
      if (!c.last || o.createdAt > c.last) c.last = o.createdAt;
    }
    if (o.statusKey === 'CANCELLED') return;
    c.orders += 1;
    c.spent += o.total;
    o.items.forEach(function (it) {
      const q = Number(it.quantity) || 1;
      if (it.color) c.colors[it.color] = (c.colors[it.color] || 0) + q;
      if (it.scent) c.scents[it.scent] = (c.scents[it.scent] || 0) + q;
    });
  });

  const headers = ['👤 ชื่อลูกค้า', '📧 อีเมล', '📞 เบอร์โทร', '📦 จำนวนครั้งที่สั่งซื้อ', '💰 ยอดใช้จ่ายรวม (฿)', '⭐ ระดับลูกค้า (Tier)', '🗓️ สั่งซื้อครั้งแรก', '🕒 สั่งซื้อล่าสุด', '🎨 สีที่ชอบ', '🌿 กลิ่นที่ชอบ'];
  const rows = Object.keys(map).map(function (k) {
    const c = map[k];
    let tier = '🤍 Newbie';
    if (c.spent > CONFIG.VIP_THRESHOLD) tier = '💛 VIP';
    if (c.spent > CONFIG.VVIP_THRESHOLD) tier = '👑 VVIP';
    return [c.name, c.email, c.phone ? "'" + c.phone : '', c.orders, c.spent, tier, c.first || '', c.last || '', topKey_(c.colors), topKey_(c.scents)];
  });
  rows.sort(function (a, b) { return b[4] - a[4]; });

  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(BRAND.DARK).setFontColor('#ffffff').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows).setVerticalAlignment('middle');
    sheet.getRange(2, 5, rows.length, 1).setNumberFormat('฿#,##0.00');
    sheet.getRange(2, 7, rows.length, 2).setNumberFormat('dd/MM/yyyy HH:mm');
    sheet.getRange(2, 4, rows.length, 1).setHorizontalAlignment('center');
    sheet.getRange(2, 6, rows.length, 1).setHorizontalAlignment('center');
  }
  [180, 230, 130, 150, 150, 140, 150, 150, 120, 160].forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange(1, 1).setNote('ชีทนี้สร้างอัตโนมัติจากชีท Orders ทุกครั้งที่ Sync — ไม่ต้องแก้ไขข้อมูลในชีทนี้ (ออเดอร์ที่ยกเลิกไม่ถูกนับยอด)');
}

function buildSummary_(ss, orders) {
  const sheet = getOrCreateSheet_(ss, SHEETS.SUMMARY, '#0f9d58');
  sheet.getCharts().forEach(function (ch) { sheet.removeChart(ch); });
  sheet.clear();
  sheet.setHiddenGridlines(true);

  const tz = CONFIG.TIMEZONE;
  const now = new Date();
  const todayKey = Utilities.formatDate(now, tz, 'yyyy-MM-dd');
  const monthKey = Utilities.formatDate(now, tz, 'yyyy-MM');

  const valid = orders.filter(function (o) { return o.statusKey !== 'CANCELLED'; });
  const revenue = sum_(valid, 'total');
  const itemsSold = sum_(valid, 'quantity');
  const customerKeys = {};
  const repeatCounter = {};
  valid.forEach(function (o) {
    const k = (o.customer.email || '').toLowerCase() || o.uid || o.customer.phone;
    if (!k) return;
    customerKeys[k] = true;
    repeatCounter[k] = (repeatCounter[k] || 0) + 1;
  });
  const totalCustomers = Object.keys(customerKeys).length;
  const repeatCustomers = Object.keys(repeatCounter).filter(function (k) { return repeatCounter[k] > 1; }).length;
  const todayOrders = valid.filter(function (o) { return o.createdAt && Utilities.formatDate(o.createdAt, tz, 'yyyy-MM-dd') === todayKey; });
  const monthOrders = valid.filter(function (o) { return o.createdAt && Utilities.formatDate(o.createdAt, tz, 'yyyy-MM') === monthKey; });

  // ----- หัวข้อ -----
  sheet.getRange('B2').setValue('📊 ' + CONFIG.SHOP_NAME + ' — Dashboard')
    .setFontSize(20).setFontWeight('bold').setFontColor(BRAND.DARK).setFontFamily('Georgia');
  sheet.getRange('B3').setValue('อัปเดตล่าสุด: ' + thaiDate_(now) + '   •   ข้อมูลยอดขายไม่นับรวมออเดอร์ที่ยกเลิก')
    .setFontColor(BRAND.MUTED).setFontSize(10);

  // ----- KPI (ซ้าย) -----
  let r = 5;
  r = writeBlock_(sheet, r, 2, '💰 ภาพรวมยอดขาย', ['ตัวชี้วัด', 'ค่า'], [
    ['ยอดขายรวมทั้งหมด', revenue],
    ['ยอดขายเดือนนี้', sum_(monthOrders, 'total')],
    ['ยอดขายวันนี้', sum_(todayOrders, 'total')],
    ['ยอดเฉลี่ยต่อบิล', valid.length ? revenue / valid.length : 0],
    ['จำนวนคำสั่งซื้อ', valid.length],
    ['จำนวนชิ้นที่ขายได้', itemsSold],
    ['ลูกค้าทั้งหมด', totalCustomers],
    ['ลูกค้าที่กลับมาซื้อซ้ำ', repeatCustomers],
  ], function (range) {
    range.offset(0, 1, 4, 1).setNumberFormat('฿#,##0.00');
    range.offset(4, 1, 4, 1).setNumberFormat('#,##0');
  });

  // ----- สถานะ -----
  const statusRows = STATUS_LIST.map(function (s) {
    const key = statusKey_(s);
    const list = orders.filter(function (o) { return o.statusKey === key; });
    return [s, list.length, sum_(list, 'total')];
  });
  const noStatus = orders.filter(function (o) { return !o.statusKey; });
  if (noStatus.length) statusRows.push(['⚪ ยังไม่ระบุสถานะ (ออเดอร์เก่า)', noStatus.length, sum_(noStatus, 'total')]);
  r = writeBlock_(sheet, r + 1, 2, '🚦 สถานะคำสั่งซื้อ', ['สถานะ', 'จำนวน', 'ยอดเงิน'], statusRows, function (range) {
    range.offset(0, 2, statusRows.length, 1).setNumberFormat('฿#,##0.00');
  });

  // ----- รายเดือน -----
  const months = {};
  valid.forEach(function (o) {
    if (!o.createdAt) return;
    const k = Utilities.formatDate(o.createdAt, tz, 'yyyy-MM');
    if (!months[k]) months[k] = { orders: 0, qty: 0, revenue: 0 };
    months[k].orders += 1;
    months[k].qty += o.quantity;
    months[k].revenue += o.total;
  });
  const monthRows = Object.keys(months).sort().slice(-12).map(function (k) {
    const parts = k.split('-');
    return [TH_MONTHS[parseInt(parts[1], 10) - 1] + ' ' + (parseInt(parts[0], 10) + 543), months[k].orders, months[k].qty, months[k].revenue];
  });
  const monthStart = r + 1;
  r = writeBlock_(sheet, monthStart, 2, '📅 ยอดขายรายเดือน (12 เดือนล่าสุด)', ['เดือน', 'ออเดอร์', 'ชิ้น', 'ยอดขาย'],
    monthRows.length ? monthRows : [['ยังไม่มีข้อมูล', '', '', '']], function (range) {
      if (monthRows.length) range.offset(0, 3, monthRows.length, 1).setNumberFormat('฿#,##0.00');
    });

  // ----- สินค้าขายดี (ขวา) -----
  const tally = function (field) {
    const t = {};
    valid.forEach(function (o) {
      o.items.forEach(function (it) {
        let v = field === 'addon' ? (it.addon ? 'เพิ่มสติกเกอร์โลโก้' : 'ไม่เพิ่มสติกเกอร์') : it[field];
        if (!v || it.raw) return;
        t[v] = (t[v] || 0) + (Number(it.quantity) || 1);
      });
    });
    const total = Object.keys(t).reduce(function (s, k) { return s + t[k]; }, 0);
    const rows = Object.keys(t).sort(function (a, b) { return t[b] - t[a]; }).map(function (k) { return [k, t[k], total ? t[k] / total : 0]; });
    return rows.length ? rows : [['ยังไม่มีข้อมูล', '', '']];
  };
  let rr = 5;
  [['🎨 สีขายดี', 'color'], ['🌿 กลิ่นขายดี', 'scent'], ['📏 ขนาดยอดนิยม', 'size'], ['🎁 บรรจุภัณฑ์ยอดนิยม', 'packaging'], ['🌼 การตกแต่งยอดนิยม', 'decoration'], ['🏷️ สติกเกอร์โลโก้', 'addon']]
    .forEach(function (def) {
      const rows = tally(def[1]);
      rr = writeBlock_(sheet, rr, 7, def[0], ['ตัวเลือก', 'ชิ้น', 'สัดส่วน'], rows, function (range) {
        if (rows[0][1] !== '') range.offset(0, 2, rows.length, 1).setNumberFormat('0.0%');
      }) + 1;
    });

  [20, 240, 110, 110, 130, 30, 220, 90, 90].forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  // ----- กราฟยอดขายรายเดือน -----
  if (monthRows.length) {
    const chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange(monthStart + 1, 2, monthRows.length + 1, 1))
      .addRange(sheet.getRange(monthStart + 1, 5, monthRows.length + 1, 1))
      .setNumHeaders(1)
      .setPosition(Math.max(r, rr) + 2, 2, 0, 0)
      .setOption('title', 'ยอดขายรายเดือน (฿)')
      .setOption('legend', { position: 'none' })
      .setOption('colors', [BRAND.DARK])
      .setOption('width', 720)
      .setOption('height', 320)
      .build();
    sheet.insertChart(chart);
  }
}

function writeBlock_(sheet, row, col, title, header, rows, formatFn) {
  const width = header.length;
  sheet.getRange(row, col, 1, width).merge().setValue(title)
    .setFontWeight('bold').setFontSize(12).setFontColor('#ffffff').setBackground(BRAND.DARK);
  sheet.getRange(row + 1, col, 1, width).setValues([header])
    .setFontWeight('bold').setBackground('#efe9dd').setFontColor(BRAND.DARK);
  const padded = rows.map(function (r) { const x = r.slice(0, width); while (x.length < width) x.push(''); return x; });
  const body = sheet.getRange(row + 2, col, padded.length, width);
  body.setValues(padded).setBackground('#ffffff');
  sheet.getRange(row + 1, col, padded.length + 1, width)
    .setBorder(true, true, true, true, true, true, '#e5ddcf', SpreadsheetApp.BorderStyle.SOLID);
  if (width > 1) sheet.getRange(row + 2, col + 1, padded.length, width - 1).setHorizontalAlignment('right');
  if (formatFn) formatFn(body);
  return row + 2 + padded.length;
}

// ============================================================================
// 7) DAILY SUMMARY EMAIL
// ============================================================================

function sendDailySummary() {
  if (!CONFIG.DAILY_SUMMARY_ENABLED) return;
  try {
    const ss = getSs_();
    const orders = readOrders_(ensureOrdersSheet_(ss));
    const tz = CONFIG.TIMEZONE;
    const todayKey = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');

    const today = orders.filter(function (o) { return o.statusKey !== 'CANCELLED' && o.createdAt && Utilities.formatDate(o.createdAt, tz, 'yyyy-MM-dd') === todayKey; });
    const pending = orders.filter(function (o) { return o.statusKey === 'PENDING'; });
    const toShip = orders.filter(function (o) { return o.statusKey === 'PAID' || o.statusKey === 'PREPARING'; });
    if (!today.length && !pending.length && !toShip.length) return; // ไม่มีอะไรต้องแจ้ง

    const listHtml = function (list) {
      if (!list.length) return p_('<span style="color:' + BRAND.MUTED + ';">— ไม่มี —</span>');
      return infoTable_(list.slice(0, 30).map(function (o) {
        return ['#' + esc_(o.orderId || ('แถว ' + o.row)), esc_(o.customer.name) + ' • ฿' + money_(o.total) + (o.createdAt ? ' <span style="color:' + BRAND.MUTED + ';font-size:12px;">(' + esc_(Utilities.formatDate(o.createdAt, tz, 'dd/MM HH:mm')) + ')</span>' : '')];
      }));
    };

    const sheet = ss.getSheetByName(SHEETS.ORDERS);
    const body =
      h1_('สรุปประจำวัน ' + esc_(thaiDate_(new Date()).split(' เวลา')[0])) +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 6px;"><tr>' +
      kpiCell_('ออเดอร์วันนี้', today.length) +
      kpiCell_('ยอดขายวันนี้', '฿' + money_(sum_(today, 'total'))) +
      kpiCell_('รอตรวจสลิป', pending.length) +
      kpiCell_('รอจัดส่ง', toShip.length) +
      '</tr></table>' +
      sectionTitle_('🟡 รอตรวจสอบสลิป') + listHtml(pending) +
      sectionTitle_('📦 ชำระแล้ว รอจัดส่ง') + listHtml(toShip) +
      '<div style="text-align:center;margin:24px 0 0;">' + button_('📊 เปิด Google Sheet', ss.getUrl() + '#gid=' + sheet.getSheetId(), BRAND.DARK) + '</div>';

    sendMail_({ to: getAdminEmail_(), cc: CONFIG.ADMIN_CC || '', subject: '📊 สรุปประจำวัน ' + CONFIG.SHOP_NAME + ' — ' + today.length + ' ออเดอร์ใหม่', html: layout_('สรุปยอดขายประจำวัน', body) });
  } catch (err) {
    logError_('sendDailySummary', err);
  }
}

function kpiCell_(label, value) {
  return '<td style="width:25%;padding:4px;"><div style="background:' + BRAND.CREAM + ';border-radius:12px;padding:14px 8px;text-align:center;">' +
    '<div style="font-size:20px;font-weight:bold;color:' + BRAND.DARK + ';">' + value + '</div>' +
    '<div style="font-size:11px;color:' + BRAND.MUTED + ';margin-top:2px;">' + label + '</div></div></td>';
}

// ============================================================================
// 8) SETUP / MIGRATION (ปลอดภัยต่อข้อมูลเดิม)
// ============================================================================

/** ติดตั้ง/ซ่อมแซมระบบทั้งหมด — กดซ้ำได้ ไม่ทำให้ข้อมูลหาย */
function setupSystem() {
  const ss = getSs_();
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId());

  const sheet = ensureOrdersSheet_(ss);
  const migrated = migrateOldRows_(sheet);
  formatOrdersSheet_(sheet);
  getOrCreateSheet_(ss, SHEETS.CUSTOMERS, '#4285f4');
  getOrCreateSheet_(ss, SHEETS.SUMMARY, '#0f9d58');
  getSlipFolder_(new Date());
  installTriggers_(ss);
  syncAll();

  // จัดลำดับแท็บ
  [SHEETS.ORDERS, SHEETS.CUSTOMERS, SHEETS.SUMMARY].forEach(function (name, i) {
    const s = ss.getSheetByName(name);
    if (s) { ss.setActiveSheet(s); ss.moveActiveSheet(i + 1); }
  });
  ss.setActiveSheet(sheet);

  alert_('✅ ติดตั้งระบบเรียบร้อยแล้ว',
    'เวอร์ชัน: ' + VERSION +
    '\nอีเมลแอดมิน: ' + getAdminEmail_() +
    '\nออเดอร์เดิมที่เพิ่มเลขที่คำสั่งซื้อให้: ' + migrated + ' รายการ' +
    '\n\nขั้นตอนสุดท้าย: Deploy → Manage deployments → ✏️ → Version: New version → Deploy\n(เพื่อให้หน้าเว็บใช้โค้ดใหม่)');
}

function setupTriggers() {
  installTriggers_(getSs_());
  alert_('✅ เปิดระบบอัตโนมัติแล้ว',
    '• เปลี่ยนสถานะในชีท → ส่งอีเมลแจ้งลูกค้าอัตโนมัติ\n• Sync Dashboard ทุก 1 ชั่วโมง' +
    (CONFIG.DAILY_SUMMARY_ENABLED ? '\n• ส่งสรุปประจำวันเวลา ' + CONFIG.DAILY_SUMMARY_HOUR + ':00 น.' : ''));
}

function installTriggers_(ss) {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (OUR_TRIGGER_HANDLERS.indexOf(t.getHandlerFunction()) > -1) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('handleOrderEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('syncAll').timeBased().everyHours(1).create();
  if (CONFIG.DAILY_SUMMARY_ENABLED) {
    ScriptApp.newTrigger('sendDailySummary').timeBased().atHour(CONFIG.DAILY_SUMMARY_HOUR).everyDays(1).inTimezone(CONFIG.TIMEZONE).create();
  }
}

function ensureOrdersSheet_(ss) {
  let sheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.ORDERS, 0);
    sheet.setTabColor('#34a853');
  }
  if (sheet.getMaxColumns() < NUM_COLS) sheet.insertColumnsAfter(sheet.getMaxColumns(), NUM_COLS - sheet.getMaxColumns());

  const first = String(sheet.getRange(1, 1).getValue() || '');
  if (first === '') {
    sheet.getRange(1, 1, 1, NUM_COLS).setValues([HEADERS]);
  } else if (first.indexOf('วันที่') === -1) {
    // แถวแรกเป็นข้อมูล ไม่ใช่หัวตาราง → แทรกหัวตารางด้านบน (ข้อมูลเดิมไม่หาย)
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, NUM_COLS).setValues([HEADERS]);
  } else if (String(sheet.getRange(1, COL.DATA).getValue() || '') !== HEADERS[COL.DATA - 1]) {
    // หัวตารางเดิมมีแค่ A–I → เติมหัวคอลัมน์ใหม่ J–P
    sheet.getRange(1, COL.ORDER_ID, 1, NUM_COLS - COL.ORDER_ID + 1).setValues([HEADERS.slice(COL.ORDER_ID - 1)]);
  }
  return sheet;
}

/** เติมข้อมูลให้ออเดอร์เก่า: เลขที่คำสั่งซื้อ, จำนวนชิ้น, แปลงวันที่, คืนเลข 0 หน้าเบอร์โทร — ไม่ลบข้อมูลใดๆ */
function migrateOldRows_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const n = last - 1;
  const range = sheet.getRange(2, 1, n, NUM_COLS);
  const values = range.getValues();
  const used = {};
  values.forEach(function (r) { if (r[COL.ORDER_ID - 1]) used[r[COL.ORDER_ID - 1]] = true; });

  const tsCol = [], phoneCol = [], idCol = [], qtyCol = [];
  let count = 0;
  values.forEach(function (r) {
    const hasData = r[COL.NAME - 1] || r[COL.EMAIL - 1] || r[COL.ITEMS - 1];
    let ts = r[COL.TIMESTAMP - 1];
    if (hasData && typeof ts === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(ts)) {
      const d = new Date(ts);
      if (!isNaN(d.getTime())) ts = d;
    }
    tsCol.push([ts]);

    let phone = r[COL.PHONE - 1];
    if (typeof phone === 'number' && String(phone).length === 9) phone = "'0" + phone; // 0812345678 ที่เคยถูกเก็บเป็น 812345678
    phoneCol.push([phone]);

    let id = r[COL.ORDER_ID - 1];
    if (hasData && !id) {
      const base = toDate_(ts) || new Date();
      do { id = generateOrderId_(base); } while (used[id]);
      used[id] = true;
      count++;
    }
    idCol.push([id]);

    let qty = r[COL.QTY - 1];
    if (hasData && !qty) qty = parseItemsText_(r[COL.ITEMS - 1]).reduce(function (s, it) { return s + (it.quantity || 0); }, 0) || '';
    qtyCol.push([qty]);
  });

  sheet.getRange(2, COL.TIMESTAMP, n, 1).setValues(tsCol);
  sheet.getRange(2, COL.PHONE, n, 1).setValues(phoneCol);
  sheet.getRange(2, COL.ORDER_ID, n, 1).setValues(idCol);
  sheet.getRange(2, COL.QTY, n, 1).setValues(qtyCol);
  return count;
}

function formatOrdersSheet_(sheet) {
  const maxRows = sheet.getMaxRows();
  const header = sheet.getRange(1, 1, 1, NUM_COLS);
  header.setValues([HEADERS])
    .setBackground(BRAND.DARK).setFontColor('#ffffff').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
  sheet.setRowHeight(1, 44);
  sheet.setFrozenRows(1);

  const widths = [150, 200, 160, 120, 280, 420, 120, 200, 110, 160, 90, 170, 160, 220, 300, 80];
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  if (maxRows > 1) {
    sheet.getRange(2, COL.TIMESTAMP, maxRows - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.getRange(2, COL.TOTAL, maxRows - 1, 1).setNumberFormat('฿#,##0.00');
    sheet.getRange(2, COL.QTY, maxRows - 1, 1).setNumberFormat('0').setHorizontalAlignment('center');
    sheet.getRange(2, COL.ITEMS, maxRows - 1, 1).setWrap(true);
    sheet.getRange(2, COL.ADDRESS, maxRows - 1, 1).setWrap(true);
    sheet.getRange(2, COL.EMAIL_LOG, maxRows - 1, 1).setWrap(true).setFontSize(9).setFontColor('#6b6157');
    sheet.getRange(2, 1, maxRows - 1, NUM_COLS).setVerticalAlignment('top');

    // Dropdown สถานะ
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUS_LIST, true).setAllowInvalid(false)
      .setHelpText('เลือกสถานะ — ระบบจะส่งอีเมลแจ้งลูกค้าอัตโนมัติเมื่อเป็น ชำระเงินแล้ว / จัดส่งแล้ว / ยกเลิก').build();
    sheet.getRange(2, COL.STATUS, maxRows - 1, 1).setDataValidation(rule).setHorizontalAlignment('center').setFontWeight('bold');

    // สีตามสถานะ (เก็บกฎเดิมที่ไม่ใช่ของคอลัมน์สถานะไว้)
    const statusRange = sheet.getRange(2, COL.STATUS, maxRows - 1, 1);
    const kept = sheet.getConditionalFormatRules().filter(function (rl) {
      return !rl.getRanges().some(function (rg) { return rg.getColumn() === COL.STATUS && rg.getNumColumns() === 1; });
    });
    const statusRules = Object.keys(STATUS).map(function (k) {
      return SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(STATUS[k])
        .setBackground(STATUS_COLORS[k].bg).setFontColor(STATUS_COLORS[k].fg).setRanges([statusRange]).build();
    });
    sheet.setConditionalFormatRules(kept.concat(statusRules));
  }

  // แถบสีสลับแถว
  const fullRange = sheet.getRange(1, 1, maxRows, NUM_COLS);
  const bandings = sheet.getBandings();
  if (bandings.length) {
    try { bandings[0].setRange(fullRange); } catch (e) { /* ข้ามได้ */ }
  } else {
    try { fullRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false); } catch (e) { /* ข้ามได้ */ }
  }

  // ตัวกรอง (ครอบคลุมคอลัมน์ใหม่)
  const filter = sheet.getFilter();
  if (filter && filter.getRange().getNumColumns() < NUM_COLS) filter.remove();
  if (!sheet.getFilter()) sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 2), NUM_COLS).createFilter();

  sheet.getRange(1, COL.STATUS).setNote('เปลี่ยนสถานะ → ระบบส่งอีเมลแจ้งลูกค้าอัตโนมัติ\n🟢 ชำระเงินแล้ว → แจ้งยืนยันการชำระเงิน\n🚚 จัดส่งแล้ว → แจ้งเลขพัสดุ (ต้องกรอกคอลัมน์ M)\n🔴 ยกเลิก → แจ้งยกเลิก');
  sheet.getRange(1, COL.TRACKING).setNote('กรอกเลขพัสดุ แล้วเปลี่ยนสถานะเป็น 🚚 จัดส่งแล้ว (ทำอย่างไหนก่อนก็ได้)');
  sheet.getRange(1, COL.DATA).setNote('ข้อมูลระบบสำหรับ Dashboard — ห้ามแก้ไข');
  sheet.hideColumns(COL.DATA);
}

// ============================================================================
// 9) MENU + ADMIN TOOLS
// ============================================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🏠 Chomm's House")
    .addItem('🔄 Sync ข้อมูล & อัปเดต Dashboard', 'syncAll')
    .addSeparator()
    .addItem('📧 ส่งอีเมลยืนยันคำสั่งซื้ออีกครั้ง (แถวที่เลือก)', 'resendConfirmationForSelectedRow')
    .addItem('📨 ส่งอีเมลตามสถานะปัจจุบันอีกครั้ง (แถวที่เลือก)', 'resendStatusEmailForSelectedRow')
    .addSeparator()
    .addItem('🛠️ ติดตั้ง / ซ่อมแซมระบบ (กดซ้ำได้ ข้อมูลไม่หาย)', 'setupSystem')
    .addItem('⏱️ เปิดระบบอัตโนมัติ (อีเมลสถานะ + Sync)', 'setupTriggers')
    .addItem('🧪 ส่งอีเมลทดสอบมาที่แอดมิน', 'testEmails')
    .addItem('🔍 ตรวจสอบสถานะระบบ', 'healthCheck')
    .addToUi();
}

function getSelectedOrderRow_() {
  const ss = getSs_();
  const sheet = ss.getActiveSheet();
  if (sheet.getName() !== SHEETS.ORDERS) throw new Error('กรุณาไปที่ชีท "Orders" แล้วคลิกเลือกแถวของออเดอร์ก่อน');
  const row = sheet.getActiveRange().getRow();
  if (row < 2) throw new Error('กรุณาคลิกเลือกแถวของออเดอร์ (ไม่ใช่แถวหัวตาราง)');
  return { sheet: sheet, row: row };
}

function resendConfirmationForSelectedRow() {
  try {
    const sel = getSelectedOrderRow_();
    const values = sel.sheet.getRange(sel.row, 1, 1, NUM_COLS).getValues()[0];
    const order = rowToOrder_(values, sel.row, sel.sheet.getRange(sel.row, COL.SLIP).getFormula());
    if (!isEmail_(order.customer.email)) throw new Error('ออเดอร์นี้ไม่มีอีเมลลูกค้าที่ถูกต้อง');
    if (!order.orderId) {
      order.orderId = generateOrderId_(order.createdAt || new Date());
      sel.sheet.getRange(sel.row, COL.ORDER_ID).setValue(order.orderId);
    }
    if (!order.createdAt) order.createdAt = new Date();
    if (!confirm_('ส่งอีเมลยืนยันคำสั่งซื้อ #' + order.orderId + '\nถึง ' + order.customer.email + ' ?')) return;
    sendCustomerConfirmation_(order);
    appendEmailLog_(sel.sheet, sel.row, 'CONFIRM', '✅ ส่งอีเมลยืนยันซ้ำ (โดยแอดมิน)');
    alert_('✅ ส่งแล้ว', 'ส่งอีเมลยืนยันถึง ' + order.customer.email + ' เรียบร้อย');
  } catch (err) {
    alert_('❌ ส่งไม่สำเร็จ', err.message);
  }
}

function resendStatusEmailForSelectedRow() {
  try {
    const sel = getSelectedOrderRow_();
    const status = sel.sheet.getRange(sel.row, COL.STATUS).getValue();
    const key = statusKey_(status);
    if (key !== 'PAID' && key !== 'SHIPPED' && key !== 'CANCELLED') throw new Error('สถานะปัจจุบัน (' + (status || 'ว่าง') + ') ไม่มีอีเมลแจ้งลูกค้า');
    if (!confirm_('ส่งอีเมลแจ้งสถานะ "' + status + '" ให้ลูกค้าอีกครั้ง?')) return;
    const result = processStatusEmail_(sel.sheet, sel.row, true);
    alert_(result.sent ? '✅ ส่งแล้ว' : 'ℹ️ แจ้งเตือน', result.message || 'ไม่มีอีเมลที่ต้องส่ง');
  } catch (err) {
    alert_('❌ ส่งไม่สำเร็จ', err.message);
  }
}

function testEmails() {
  const admin = getAdminEmail_();
  const sample = {
    orderId: generateOrderId_(new Date()),
    createdAt: new Date(),
    customer: { name: 'ลูกค้าทดสอบ', email: admin, phone: '0812345678', address: '123/45 ถนนตัวอย่าง\nแขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10000' },
    uid: 'TEST-UID',
    items: [
      { color: 'Natural', size: '30-35 กรัม', scent: 'Ice Mint', packaging: 'กล่องลิ้นชัก', decoration: 'ดอกไม้แห้ง', addon: true, quantity: 2, price: 190, subtotal: 380 },
      { color: 'Pandan', size: '20-25 กรัม', scent: 'Premium Floral', packaging: 'ซองใส', decoration: 'โป๊ยกั๊ก', addon: false, quantity: 1, price: 190, subtotal: 190 },
    ],
    quantity: 3, total: 570, computedTotal: 570, totalMismatch: false, tracking: 'EF123456789TH',
  };
  try {
    sendCustomerConfirmation_(sample);
    const ss = getSs_();
    const sheet = ensureOrdersSheet_(ss);
    sendAdminNewOrder_(sample, { url: '', blob: null, error: '' }, ss, sheet, 2, '');
    sendStatusEmail_(sample, 'SHIPPED');
    alert_('✅ ส่งอีเมลทดสอบแล้ว', 'ส่ง 3 ฉบับ (ยืนยันคำสั่งซื้อ / แจ้งแอดมิน / แจ้งจัดส่ง) ไปที่ ' + admin + '\n\nหมายเหตุ: อีเมลทดสอบไม่ถูกบันทึกลงชีท');
  } catch (err) {
    alert_('❌ ส่งอีเมลทดสอบไม่สำเร็จ', err.message);
  }
}

function healthCheck() {
  const ss = getSs_();
  const sheet = ss.getSheetByName(SHEETS.ORDERS);
  const triggers = ScriptApp.getProjectTriggers().map(function (t) { return t.getHandlerFunction(); });
  const has = function (name) { return triggers.indexOf(name) > -1 ? '✅' : '❌'; };
  let webAppUrl = '';
  try { webAppUrl = ScriptApp.getService().getUrl() || ''; } catch (e) { webAppUrl = ''; }
  alert_('🔍 สถานะระบบ ' + CONFIG.SHOP_NAME,
    'เวอร์ชันสคริปต์: ' + VERSION +
    '\nอีเมลแอดมิน: ' + getAdminEmail_() +
    '\nโควตาอีเมลที่เหลือวันนี้: ' + MailApp.getRemainingDailyQuota() + ' ฉบับ' +
    '\nจำนวนออเดอร์ในชีท: ' + (sheet ? Math.max(sheet.getLastRow() - 1, 0) : 0) +
    '\n\nระบบอัตโนมัติ:' +
    '\n' + has('handleOrderEdit') + ' อีเมลแจ้งเมื่อเปลี่ยนสถานะ' +
    '\n' + has('syncAll') + ' Sync Dashboard ทุกชั่วโมง' +
    '\n' + has('sendDailySummary') + ' สรุปประจำวัน' +
    '\n\nWeb App URL:\n' + (webAppUrl || '(ยังไม่ได้ Deploy)') +
    '\n\n(URL นี้ต้องตรงกับที่ตั้งไว้ในหน้าเว็บ)');
}

// ============================================================================
// 10) HELPERS
// ============================================================================

function getSs_() {
  if (CONFIG.SPREADSHEET_ID) return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const saved = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (saved) return SpreadsheetApp.openById(saved);
  throw new Error('ไม่พบ Google Sheet — กรุณาใส่ SPREADSHEET_ID ใน CONFIG');
}

function getOrCreateSheet_(ss, name, color) {
  let s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    if (color) s.setTabColor(color);
  }
  return s;
}

function getAdminEmail_() {
  if (CONFIG.ADMIN_EMAIL) return CONFIG.ADMIN_EMAIL;
  let email = '';
  try { email = Session.getEffectiveUser().getEmail(); } catch (e) { email = ''; }
  if (!email) { try { email = Session.getActiveUser().getEmail(); } catch (e) { email = ''; } }
  return email;
}

function generateOrderId_(date) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return 'CH-' + Utilities.formatDate(date || new Date(), CONFIG.TIMEZONE, 'yyMMdd') + '-' + rand;
}

function statusKey_(s) {
  const v = String(s || '').trim();
  if (!v) return '';
  for (const k in STATUS) if (STATUS[k] === v) return k;
  if (v.indexOf('ยกเลิก') > -1) return 'CANCELLED';
  if (v.indexOf('จัดส่งแล้ว') > -1) return 'SHIPPED';
  if (v.indexOf('เตรียม') > -1) return 'PREPARING';
  if (v.indexOf('ชำระ') > -1) return 'PAID';
  if (v.indexOf('รอ') > -1) return 'PENDING';
  return '';
}

function colorName_(c) {
  const v = String(c == null ? '' : c).trim();
  return COLOR_NAMES[v] || v.slice(0, 60);
}

function itemsToText_(items) {
  return items.map(function (it) {
    const parts = ['Size: ' + it.size, 'Scent: ' + it.scent, 'Package: ' + it.packaging];
    if (it.decoration) parts.push('ตกแต่ง: ' + it.decoration);
    parts.push('สติกเกอร์โลโก้: ' + (it.addon ? '✓' : '✗'));
    return it.quantity + 'x ' + it.color + ' (' + parts.join(', ') + ') | ' + money_(it.subtotal) + ' ฿';
  }).join('\n');
}

/** อ่านข้อความรายการสินค้า (รองรับทั้งรูปแบบใหม่และรูปแบบของสคริปต์เก่า) */
function parseItemsText_(text) {
  return String(text || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean).map(function (line) {
    const m = line.match(/^(\d+)\s*x\s+(.+?)\s*\((.*)\)\s*\|\s*([\d,.]+)/i);
    if (!m) {
      const q = line.match(/^(\d+)\s*x\s+/i);
      return { raw: line, quantity: q ? parseInt(q[1], 10) : 1, price: 0, subtotal: 0 };
    }
    const inner = m[3];
    const pick = function (label) {
      const x = inner.match(new RegExp(label + '\\s*:\\s*([^,]*)', 'i'));
      return x ? x[1].trim() : '';
    };
    let size = pick('Size').replace(/(\s*กรัม)+$/, '').trim();
    if (size) size += ' กรัม';
    const qty = parseInt(m[1], 10) || 1;
    const subtotal = parseFloat(m[4].replace(/,/g, '')) || 0;
    return {
      color: colorName_(m[2].trim()),
      size: size,
      scent: pick('Scent'),
      packaging: pick('Package'),
      decoration: pick('ตกแต่ง'),
      addon: /สติกเกอร์โลโก้\s*:\s*✓/.test(inner),
      quantity: qty,
      price: subtotal / qty,
      subtotal: subtotal,
    };
  });
}

function str_(v, max) { return String(v == null ? '' : v).trim().slice(0, max || 500); }
function sum_(list, field) { return list.reduce(function (s, o) { return s + (Number(o[field]) || 0); }, 0); }
function isEmail_(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '')); }

function safeCell_(v) {
  const s = String(v == null ? '' : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s; // ป้องกันการพิมพ์สูตรอันตรายลงชีท
}

function normalizePhone_(v) {
  if (typeof v === 'number') {
    const s = String(v);
    return s.length === 9 ? '0' + s : s;
  }
  return String(v || '').replace(/^'/, '').trim();
}

function toDate_(v) {
  if (v instanceof Date && !isNaN(v.getTime())) return v;
  if (typeof v === 'string' && v) {
    const d = new Date(v);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

function extractUrl_(formula) {
  const m = String(formula || '').match(/"(https?:\/\/[^"]+)"/);
  return m ? m[1] : '';
}

function topKey_(obj) {
  let best = '', n = 0;
  Object.keys(obj).forEach(function (k) { if (obj[k] > n) { best = k; n = obj[k]; } });
  return best;
}

function money_(n) {
  const v = Number(n) || 0;
  const fixed = Math.abs(v % 1) > 0.001 ? v.toFixed(2) : v.toFixed(0);
  return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function thaiDate_(d) {
  if (!d) return '-';
  const tz = CONFIG.TIMEZONE;
  const day = Utilities.formatDate(d, tz, 'd');
  const month = TH_MONTHS[parseInt(Utilities.formatDate(d, tz, 'M'), 10) - 1];
  const year = parseInt(Utilities.formatDate(d, tz, 'yyyy'), 10) + 543;
  return day + ' ' + month + ' ' + year + ' เวลา ' + Utilities.formatDate(d, tz, 'HH:mm') + ' น.';
}

function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function nl2br_(s) { return String(s).replace(/\r?\n/g, '<br>'); }

function htmlToText_(html) {
  return String(html || '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|h1)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n').trim();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function summarizePayload_(data) {
  if (!data) return '';
  const copy = {};
  Object.keys(data).forEach(function (k) { if (k !== 'slipBase64') copy[k] = data[k]; });
  return JSON.stringify(copy).slice(0, 1500);
}

function toast_(msg, title, seconds) {
  try { getSs_().toast(msg, title || CONFIG.SHOP_NAME, seconds || 5); } catch (e) { /* รันจาก trigger/web app ไม่มีหน้าจอ */ }
}

function alert_(title, msg) {
  try { SpreadsheetApp.getUi().alert(title, msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) { Logger.log(title + '\n' + msg); }
}

function confirm_(msg) {
  try {
    const ui = SpreadsheetApp.getUi();
    return ui.alert('ยืนยัน', msg, ui.ButtonSet.YES_NO) === ui.Button.YES;
  } catch (e) { return true; }
}

function logInfo_(where, message, detail) { writeLog_('INFO', where, message, detail); }
function logError_(where, err, detail) { writeLog_('ERROR', where, (err && err.message) || String(err), detail || (err && err.stack) || ''); }

function writeLog_(level, where, message, detail) {
  try {
    Logger.log('[' + level + '] ' + where + ': ' + message);
    const ss = getSs_();
    let sheet = ss.getSheetByName(SHEETS.LOG);
    if (!sheet) {
      sheet = ss.insertSheet(SHEETS.LOG);
      sheet.setTabColor('#9e9e9e');
      sheet.getRange(1, 1, 1, 5).setValues([['เวลา', 'ระดับ', 'ส่วนของระบบ', 'ข้อความ', 'รายละเอียด']])
        .setBackground('#555555').setFontColor('#ffffff').setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, 5, 180);
      sheet.setColumnWidth(4, 360);
      sheet.setColumnWidth(5, 500);
    }
    sheet.appendRow([new Date(), level, where, String(message).slice(0, 1000), String(detail || '').slice(0, 2000)]);
    // เก็บ log ล่าสุดไม่เกิน ~1,000 แถว (เป็นบันทึกของระบบเท่านั้น ไม่ใช่ข้อมูลออเดอร์)
    if (sheet.getLastRow() > 1200) sheet.deleteRows(2, 200);
  } catch (e) {
    Logger.log('writeLog_ failed: ' + e.message);
  }
}
