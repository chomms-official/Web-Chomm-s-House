'use client';

import { useState, useRef } from 'react';
import { useCartStore } from '../store/cartStore';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type CheckoutStep = 'form' | 'payment' | 'success';

export default function CheckoutModal() {
  const { isCheckoutModalOpen, toggleCheckoutModal, items, user, clearCart, toggleLoginModal } = useCartStore();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [step, setStep] = useState<CheckoutStep>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipBase64, setSlipBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCheckoutModalOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const basePath = process.env.NODE_ENV === 'production' ? '/Web-Chomm-s-House' : '';

  const handleSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSlipFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 1. Client-Side Image Compression
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 60% quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          setSlipPreview(dataUrl);
          
          // Extract pure base64 (remove "data:image/jpeg;base64," prefix)
          const base64Data = dataUrl.split(',')[1];
          setSlipBase64(base64Data);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toggleLoginModal();
      return;
    }
    setStep('payment');
  };

  const handleFinalSubmit = async () => {
    if (!slipFile || !slipBase64) {
      setError('กรุณาอัพโหลดสลิปการโอนเงิน');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwYKDOWDPj9gIlb1fFForobxgklT9yF5_CoNnwQO_RrTBiCnfrfS9Tg_wJabptKa_SALw/exec";

      const itemsForPayload = items.map(item => ({
        color: { "white": "Natural", "light-green": "Pandan", "lime": "Turmeric", "charcoal": "Charcoal" }[item.color] || item.color,
        size: item.size,
        scent: item.scent,
        package: item.packaging,
        quantity: item.quantity,
        price: item.price,
      }));

      const webhookPayload = {
        userId: user.uid,
        userEmail: user.email,
        customerInfo: formData,
        items: itemsForPayload,
        totalPrice: totalPrice,
        status: 'pending_verification',
        hasSlip: true,
        createdAt: new Date().toISOString(),
        slipBase64: slipBase64,
        slipFileName: slipFile.name,
        slipMimeType: slipFile.type || 'image/png',
      };

      // Send to Google Apps Script (includes base64 slip)
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(webhookPayload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      });

      let slipUrl = '';
      try {
        const result = await response.json();
        if (result.slipUrl) {
          slipUrl = result.slipUrl;
        }
      } catch (e) {
        // Response might not be JSON, that's OK
      }

      // Save order to Firebase Firestore
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        customerInfo: formData,
        items: itemsForPayload,
        totalPrice: totalPrice,
        status: 'pending_verification',
        hasSlip: true,
        slipUrl: slipUrl,
        createdAt: serverTimestamp(),
      });

      setStep('success');
      clearCart();
    } catch (err: any) {
      console.error(err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setSlipPreview(null);
    setSlipFile(null);
    setSlipBase64(null);
    setError('');
    toggleCheckoutModal();
  };

  // ── Success Screen ──
  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full animate-in zoom-in-95">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">สั่งซื้อสำเร็จ!</h3>
          <p className="text-stone-500 mb-2 text-sm">เราได้รับคำสั่งซื้อและสลิปโอนเงินของคุณแล้ว</p>
          <p className="text-stone-500 mb-6 text-sm">จะมีอีเมลยืนยันส่งไปที่ <strong className="text-stone-700">{user?.email}</strong></p>
          <button onClick={handleClose} className="w-full bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-800 transition-colors">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {step === 'payment' && (
              <button onClick={() => setStep('form')} className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            )}
            <h2 className="text-lg font-bold text-stone-900">
              {step === 'form' ? 'รายละเอียดการจัดส่ง' : 'ชำระเงิน & อัพโหลดสลิป'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 text-stone-400 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 'form' ? 'bg-stone-900 text-white' : 'bg-green-500 text-white'}`}>
              {step === 'form' ? '1' : '✓'}
            </div>
            <div className={`flex-1 h-0.5 ${step === 'payment' ? 'bg-stone-900' : 'bg-stone-200'}`}></div>
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 'payment' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-400'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-stone-500">ข้อมูลจัดส่ง</span>
            <span className="text-[10px] text-stone-500">ชำระเงิน</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!user ? (
            <div className="text-center py-10">
              <p className="text-stone-500 mb-4">กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ</p>
              <button onClick={() => { toggleCheckoutModal(); toggleLoginModal(); }} className="bg-stone-900 text-white px-6 py-2 rounded-full">เข้าสู่ระบบ</button>
            </div>
          ) : step === 'form' ? (
            // ── Step 1: Shipping Form ──
            <form id="checkout-form" onSubmit={handleGoToPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-1.5">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400"
                  placeholder="ชื่อผู้รับสินค้า"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-1.5">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400"
                  placeholder="08X-XXX-XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-1.5">ที่อยู่จัดส่ง <span className="text-red-500">*</span></label>
                <textarea
                  required
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all h-24 resize-none text-stone-900 text-sm placeholder:text-stone-400"
                  placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          ) : (
            // ── Step 2: QR Payment + Slip Upload ──
            <div className="space-y-5">
              {/* QR Code Section */}
              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                <p className="text-xs text-stone-500 mb-3 font-medium tracking-wide uppercase">สแกน QR Code เพื่อโอนเงิน</p>
                <div className="bg-white rounded-xl p-3 inline-block shadow-sm border border-stone-100">
                  <img
                    src={`${basePath}/images/qr-payment-v3.png`}
                    alt="QR Code สำหรับชำระเงิน"
                    className="w-48 h-auto mx-auto rounded-lg"
                  />
                </div>
                <div className="mt-3 space-y-0.5">
                  <p className="text-xs text-stone-500">ชื่อบัญชี: <strong className="text-stone-700">หสม. วชร ฟอร์มูลา</strong></p>
                  <p className="text-xs text-stone-500">เลขอ้างอิง: <strong className="text-stone-700">004999252147060</strong></p>
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                  <p className="text-amber-800 text-sm font-bold">ยอดที่ต้องโอน: ฿{totalPrice}</p>
                </div>
              </div>

              {/* Slip Upload Section */}
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-2">อัพโหลดสลิปการโอนเงิน <span className="text-red-500">*</span></label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleSlipChange}
                  className="hidden"
                />

                {slipPreview ? (
                  <div className="relative">
                    <img src={slipPreview} alt="สลิปการโอนเงิน" className="w-full max-h-60 object-contain rounded-xl border border-stone-200 bg-stone-50" />
                    <button
                      onClick={() => { setSlipPreview(null); setSlipFile(null); setSlipBase64(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-stone-300 rounded-xl py-8 flex flex-col items-center justify-center hover:border-stone-900 hover:bg-stone-50 transition-all group"
                  >
                    <svg className="w-10 h-10 text-stone-300 group-hover:text-stone-500 transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-stone-400 group-hover:text-stone-600 transition-colors font-medium">กดเพื่อเลือกรูปสลิป</span>
                    <span className="text-xs text-stone-300 mt-1">PNG, JPG, JPEG</span>
                  </button>
                )}
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        {user && (
          <div className="p-6 bg-stone-50 border-t border-stone-100 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-500 text-sm font-medium">ยอดชำระทั้งหมด</span>
              <span className="text-xl font-bold text-stone-900">฿ {totalPrice}</span>
            </div>

            {step === 'form' ? (
              <button
                form="checkout-form"
                type="submit"
                disabled={items.length === 0}
                className="w-full bg-[#4a3f35] hover:bg-[#3b3228] text-white py-4 rounded-full font-bold text-sm tracking-wide transition-colors disabled:opacity-50"
              >
                ถัดไป — ชำระเงิน
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting || !slipFile}
                className="w-full bg-[#4a3f35] hover:bg-[#3b3228] text-white py-4 rounded-full font-bold text-sm tracking-wide transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : 'ยืนยันการสั่งซื้อ'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


