'use client';
import { useState } from 'react';

export default function ProductPage() {
  const [qty, setQty] = useState(1);

  const colors = [
    { id: 'white', hex: '#FDFBF7' },
    { id: 'light-green', hex: '#B5C49A' },
    { id: 'lime', hex: '#C6D93C' },
    { id: 'blue', hex: '#E2E8F0', tooltip: 'สีผงถ่าน' }
  ];

  const decorations = ['ดอกไม้แห้ง', 'โป๊ยกั๊ก', 'Bio-Bead', 'หินภูเขาไฟ', 'ดอกโสน'];
  const sizes = ['10-15 กรัม', '20-25 กรัม', '30-35 กรัม'];
  const scents = ['Premium Floral', 'Fresh Citrus', 'Ice Mint', 'Eucalyptus Bouquet', 'Coffee & Cream'];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-16">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex space-x-6 text-sm text-gray-600 font-medium">
          <a href="#" className="hover:text-black">HOME</a>
          <a href="#" className="hover:text-black">OUR STORY</a>
        </div>
        
        {/* Logo Center */}
        <div className="flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 font-bold text-lg cursor-pointer">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span>Chomm'sHouse</span>
          </div>
          <div className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-sm">PRODUCT</div>
          <a href="#" className="text-sm text-gray-600 font-medium hover:text-black">WORKSHOP</a>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600 font-medium">
          <a href="#" className="hover:text-black">CONTACT US</a>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Login | Sign Up</span>
          </div>
          <div className="relative cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center mt-12 mb-10">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-2 tracking-tight">OurProduct</h1>
        <p className="text-gray-400 text-sm">รายละเอียดสินค้า</p>
      </div>

      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="max-w-md mx-auto w-full">
          <h2 className="font-bold mb-4 text-gray-800">ตัวเลือกสินค้า</h2>
          <div className="border border-gray-200 rounded-lg p-2 mb-6 bg-gray-50 flex items-center justify-center aspect-square shadow-sm">
            {/* Image Placeholder (Mimicking the real flower shape) */}
            <div className="w-full h-full bg-white rounded flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
               <div className="w-40 h-40 bg-blue-100 rounded-full flex items-center justify-center shadow-lg relative">
                 <div className="absolute w-8 h-8 bg-blue-600 rounded-full shadow-md z-10"></div>
                 <div className="absolute inset-0 flex items-center justify-center rotate-45"><div className="w-48 h-12 bg-blue-100 rounded-full opacity-80"></div></div>
                 <div className="absolute inset-0 flex items-center justify-center -rotate-45"><div className="w-48 h-12 bg-blue-100 rounded-full opacity-80"></div></div>
               </div>
               <span className="absolute bottom-4 text-gray-400 text-xs">Product Image Preview</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-4 font-medium">ราคา 190 ต่อชุด</div>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-bold text-gray-800">จำนวน*</span>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden h-9 w-32 shadow-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border-r border-gray-200 h-full flex items-center justify-center font-bold">−</button>
              <input type="text" readOnly value={qty} className="w-12 text-center text-sm outline-none" />
              <button onClick={() => setQty(qty + 1)} className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border-l border-gray-200 h-full flex items-center justify-center font-bold">+</button>
            </div>
            <span className="text-sm text-gray-400">ชุด</span>
          </div>

          <div className="bg-[#f8f9fa] border border-gray-100 rounded-lg p-4 flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-600">ราคาสุทธิ</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-blue-500 mr-2">{190 * qty}</span>
              <span className="text-sm text-gray-500 font-medium">บาท</span>
            </div>
          </div>

          <button className="w-full bg-[#2a68df] hover:bg-blue-700 text-white font-medium py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span>สั่งสินค้า/สอบถาม</span>
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-8 max-w-md">
          {/* Colors */}
          <div>
            <div className="text-sm font-bold text-gray-800 mb-3 flex items-center">ตัวเลือกสี*</div>
            <div className="flex space-x-3 relative">
              {colors.map((c, i) => (
                <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${i === 3 ? 'ring-2 ring-blue-500 ring-offset-2' : 'border border-gray-200 shadow-sm'}`} style={{ backgroundColor: c.hex }}>
                  {i === 3 && (
                    <div className="absolute -top-6 bg-black text-white text-[10px] px-2 py-1 rounded">
                      สีผงถ่าน
                    </div>
                  )}
                  {i === 3 && (
                    <div className="absolute mt-8 ml-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Decorations */}
          <div>
            <div className="text-sm font-bold text-gray-800 mb-3">ประดับ*</div>
            <div className="flex flex-wrap gap-2.5">
              {decorations.map((d, i) => (
                <button key={i} className={`px-5 py-2 rounded-full text-sm transition-colors ${i === 0 ? 'bg-blue-50 border border-blue-300 text-blue-600' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="text-sm font-bold text-gray-800 mb-3">ขนาด*</div>
            <div className="flex flex-wrap gap-2.5">
              {sizes.map((s, i) => (
                <button key={i} className={`px-5 py-2 rounded-full text-sm transition-colors ${i === 2 ? 'border border-blue-500 text-blue-600' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Scent */}
          <div>
            <div className="text-sm font-bold text-gray-800 mb-3">กลิ่น*</div>
            <div className="flex flex-wrap gap-2.5">
              {scents.map((s, i) => (
                <button key={i} className={`px-5 py-2 rounded-full text-sm transition-colors ${i === 2 ? 'bg-[#2a68df] text-white shadow-md' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Packaging */}
          <div>
            <div className="text-sm font-bold text-gray-800 mb-3">บรรจุภัณฑ์*</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-gray-100 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded mb-2 flex items-center justify-center text-[9px] text-gray-400 font-medium">LOGO</div>
                <div className="text-xs text-gray-600 font-medium">ซองใส<br/><span className="text-[9px] text-gray-400">12x12 cm.</span></div>
              </div>
              <div className="border border-gray-100 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                   <div className="w-6 h-6 bg-gray-800 rounded-sm transform rotate-45 relative">
                     <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                   </div>
                </div>
                <div className="text-xs text-gray-600 font-medium">ซองแก้ว<br/><span className="text-[9px] text-gray-400">10x15 cm.</span></div>
              </div>
              <div className="border-2 border-blue-500 rounded-xl p-1 relative cursor-pointer shadow-sm">
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <div className="bg-amber-900 bg-opacity-90 h-16 rounded-lg overflow-hidden flex items-center justify-center border-4 border-amber-800 mb-1 relative">
                   <div className="absolute inset-x-2 bottom-2 h-4 bg-teal-600 rounded opacity-80"></div>
                </div>
                <div className="text-center text-xs text-gray-800 font-medium pb-1 mt-2">กล่องลิ้นชัก<br/><span className="text-[9px] text-gray-400">16x10.2x5.5cm.</span></div>
              </div>
            </div>
            
            <label className="flex items-center space-x-2 mt-5 cursor-pointer">
              <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center border border-blue-500">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </div>
              <span className="text-sm text-gray-600">ต้องการเพิ่มสติกเกอร์โลโก้</span>
            </label>
          </div>

          {/* Add-ons */}
          <div className="bg-[#fcfcfc] rounded-xl p-5 border border-gray-100 shadow-sm mt-8">
            <div className="text-sm font-bold text-gray-800 mb-4">ตัวเลือกเพิ่มเติม</div>
            
            <div className="flex space-x-2 mb-5">
               <button className="px-5 py-2 rounded-full text-sm border bg-blue-50 border-blue-300 text-blue-600">ดอกไม้หอม</button>
               <button className="px-5 py-2 rounded-full text-sm border border-gray-200 text-gray-500 bg-white">WAX หอม</button>
            </div>

            <div className="flex items-center space-x-3 mb-5">
              <span className="text-sm text-gray-600">เพิ่มจำนวน</span>
              <div className="flex items-center border border-gray-200 rounded bg-white w-20">
                <input type="text" readOnly value="1" className="w-full h-8 text-center text-sm outline-none bg-transparent" />
              </div>
              <span className="text-sm text-gray-600">ชิ้น/ชุด</span>
            </div>

            <div className="mb-2">
              <span className="text-sm text-gray-600 block mb-3">ขนาด</span>
              <div className="flex space-x-2">
                <button className="px-4 py-1.5 rounded-full text-xs border border-gray-200 bg-white text-gray-500">10-15 กรัม</button>
                <button className="px-4 py-1.5 rounded-full text-xs border border-blue-500 text-blue-600 bg-white font-medium">20-25 กรัม</button>
                <button className="px-4 py-1.5 rounded-full text-xs border border-gray-200 bg-white text-gray-500">30-35 กรัม</button>
              </div>
            </div>
            
            <div className="text-[11px] text-gray-400 mt-4 font-medium">*ใช้กลิ่นเดียวกับชิ้นแรกเพื่อกันกลิ่นตีกัน</div>
          </div>

        </div>
      </div>
      
      <footer className="text-center mt-20 text-xs text-gray-400 font-medium pb-8">
        © 2024 Chomm's-House. Handcrafted with care.
      </footer>
    </div>
  );
}
