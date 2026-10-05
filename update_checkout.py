import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\CheckoutModal.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add addressData state
state_pattern = r"const \[formData, setFormData\] = useState\(\{ name: '', phone: '', address: '' \}\);"
state_replacement = b"""const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [addressData, setAddressData] = useState({
    houseNumber: '', mooSoi: '', road: '', subdistrict: '', district: '', province: '', postalCode: ''
  });

  const updateAddress = (field: string, value: string) => {
    const newAddr = { ...addressData, [field]: value };
    setAddressData(newAddr);
    
    const parts = [
      newAddr.houseNumber,
      newAddr.mooSoi && newAddr.mooSoi !== '-' ? '\u0e2b\u0e21\u0e39\u0e48/\u0e0b\u0e2d\u0e22 ' + newAddr.mooSoi : '',
      newAddr.road && newAddr.road !== '-' ? '\u0e16\u0e19\u0e19 ' + newAddr.road : '',
      newAddr.subdistrict && newAddr.subdistrict !== '-' ? '\u0e15./\u0e41\u0e02\u0e27\u0e07 ' + newAddr.subdistrict : '',
      newAddr.district && newAddr.district !== '-' ? '\u0e2d./\u0e40\u0e02\u0e15 ' + newAddr.district : '',
      newAddr.province && newAddr.province !== '-' ? '\u0e08.' + newAddr.province : '',
      newAddr.postalCode
    ].filter(Boolean);
    
    setFormData({ ...formData, address: parts.join(' ') });
  };""".decode('unicode_escape')

content = re.sub(state_pattern, state_replacement, content)

# 2. Replace textarea section
textarea_pattern = r'<div>\s*<label className="block text-sm font-bold text-stone-900 mb-1\.5">.*?</label>\s*<textarea[\s\S]*?</textarea>\s*</div>'

textarea_replacement = b"""<div>
                <label className="block text-sm font-bold text-stone-900 mb-1.5">\u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e08\u0e31\u0e14\u0e2a\u0e48\u0e07 <span className="text-red-500">*</span></label>
                <p className="text-xs text-stone-500 mb-3">(\u0e2b\u0e32\u0e01\u0e44\u0e21\u0e48\u0e21\u0e35\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e43\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e43\u0e14 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e43\u0e2a\u0e48\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e2b\u0e21\u0e32\u0e22 - \u0e41\u0e17\u0e19)</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="text" value={addressData.houseNumber} onChange={e => updateAddress('houseNumber', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e1a\u0e49\u0e32\u0e19\u0e40\u0e25\u0e02\u0e17\u0e35\u0e48 *" />
                    <input required type="text" value={addressData.mooSoi} onChange={e => updateAddress('mooSoi', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e2b\u0e21\u0e39\u0e48/\u0e0b\u0e2d\u0e22 (\u0e44\u0e21\u0e48\u0e21\u0e35\u0e43\u0e2a\u0e48 -)" />
                  </div>
                  <div>
                    <input required type="text" value={addressData.road} onChange={e => updateAddress('road', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e16\u0e19\u0e19 (\u0e44\u0e21\u0e48\u0e21\u0e35\u0e43\u0e2a\u0e48 -)" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="text" value={addressData.subdistrict} onChange={e => updateAddress('subdistrict', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e41\u0e02\u0e27\u0e07/\u0e15\u0e33\u0e1a\u0e25 *" />
                    <input required type="text" value={addressData.district} onChange={e => updateAddress('district', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e40\u0e02\u0e15/\u0e2d\u0e33\u0e40\u0e20\u0e2d *" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="text" value={addressData.province} onChange={e => updateAddress('province', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e08\u0e31\u0e07\u0e2b\u0e27\u0e31\u0e14 *" />
                    <input required type="text" value={addressData.postalCode} onChange={e => updateAddress('postalCode', e.target.value)} className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 transition-all text-stone-900 text-sm placeholder:text-stone-400" placeholder="\u0e23\u0e2b\u0e31\u0e2a\u0e44\u0e1b\u0e23\u0e29\u0e13\u0e35\u0e22\u0e4c *" />
                  </div>
                </div>
              </div>""".decode('unicode_escape')

new_content = re.sub(textarea_pattern, textarea_replacement, content)

if new_content == content:
    print("WARNING: Replacement failed!")
else:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated CheckoutModal!")
