'use client';
import { useCartStore } from '@/store/cartStore';
import HeaderActions from '@/components/HeaderActions';
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';

export default function ProductPage() {
  const getPlaceholder = (text: string) => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="100%" height="100%" fill="%23f5f5f4"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="%23a8a29e" font-family="sans-serif" font-size="28" font-weight="300" letter-spacing="1">${encodeURIComponent(text)}</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23d6d3d1" font-family="sans-serif" font-size="18" font-weight="300">coming soon</text></svg>`;

  const imageMap: Record<string, string[]> = {
    'white': [
      '/Web-Chomm-s-House/images/white-front.png',
      '/Web-Chomm-s-House/images/white-left.png',
      '/Web-Chomm-s-House/images/white-right.png',
      '/Web-Chomm-s-House/images/white-top.png',
      '/Web-Chomm-s-House/images/white-back.png',
      '/Web-Chomm-s-House/images/white-bottom.png'
    ],
    'light-green': [
        '/Web-Chomm-s-House/images/light-green-front-v3.png',
        '/Web-Chomm-s-House/images/light-green-left-v3.png',
        '/Web-Chomm-s-House/images/light-green-right-v3.png',
        '/Web-Chomm-s-House/images/light-green-top-v3.png',
        '/Web-Chomm-s-House/images/light-green-back-v3.png',
        '/Web-Chomm-s-House/images/light-green-bottom-v3.png'
      ],
    'lime': [
        '/Web-Chomm-s-House/images/lime-front-v2.png',
        '/Web-Chomm-s-House/images/lime-left-v2.png',
        '/Web-Chomm-s-House/images/lime-right-v2.png',
        '/Web-Chomm-s-House/images/lime-top-v2.png',
        '/Web-Chomm-s-House/images/lime-back-v2.png',
        '/Web-Chomm-s-House/images/lime-bottom-v2.png'
      ],
    'charcoal': [
      '/Web-Chomm-s-House/images/charcoal-front-v2.jpg',
      '/Web-Chomm-s-House/images/charcoal-left-v2.jpg',
      '/Web-Chomm-s-House/images/charcoal-right-v2.jpg',
      '/Web-Chomm-s-House/images/charcoal-top-v2.jpg',
      '/Web-Chomm-s-House/images/charcoal-back-v2.jpg',
      '/Web-Chomm-s-House/images/charcoal-bottom-v2.jpg'
    ]
  };

  const getImagesForColor = (colorId: string) => {
    return imageMap[colorId] || imageMap['white'];
  };

  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const [currentImages, setCurrentImages] = useState(getImagesForColor('white'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedDecoration, setSelectedDecoration] = useState('ไม่ใส่ประดับ');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedScent, setSelectedScent] = useState('Ice Mint');
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [addLogoSticker, setAddLogoSticker] = useState(false);

  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [slideDelay, setSlideDelay] = useState(3000);

  useEffect(() => {
    if (isLightboxOpen) return; 

    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % currentImages.length);
      setSlideDelay(3000);
    }, slideDelay);
    
    return () => clearTimeout(timer);
  }, [currentImages.length, activeIndex, slideDelay, isLightboxOpen]);

  const colors = [
    { id: 'white', hex: '#FDFBF7', label: 'Natural' },
    { id: 'light-green', hex: '#D2DAC5', label: 'Pandan' },
    { id: 'lime', hex: '#DCE495', label: 'Turmeric' },
    { id: 'charcoal', hex: '#3F3F46', label: 'Charcoal' }
  ];

  const decorations = ['ไม่ใส่ประดับ', 'ดอกไม้แห้ง', 'โป๊ยกั๊ก', 'Bio-Bead', 'หินภูเขาไฟ', 'ดอกโสน'];
  const sizes = ['10-15 กรัม', '20-25 กรัม', '30-35 กรัม'];
  const scents = ['Premium Floral', 'Fresh Citrus', 'Ice Mint', 'Eucalyptus Bouquet', 'Coffee & Cream'];

  const decorCosts: Record<string, number> = {
    'ไม่ใส่ประดับ': 0,
    'ดอกไม้แห้ง': 5,
    'โป๊ยกั๊ก': 3,
    'Bio-Bead': 3,
    'หินภูเขาไฟ': 5,
    'ดอกโสน': 5
  };
  const sizeCosts: Record<string, number> = {
    '10-15 กรัม': 20,
    '20-25 กรัม': 30,
    '30-35 กรัม': 45
  };
  const pkgCosts: Record<string, number> = {
    'ซองใส': 1,
    'ซองแก้ว': 3,
    'กล่องลิ้นชัก': 25
  };

  const handleColorClick = (colorId: string) => {
    setSelectedColor(colorId);
    setActiveIndex(0);
    setCurrentImages(getImagesForColor(colorId));
  };

  const currentCost = 
    (decorCosts[selectedDecoration] || 0) + 
    (sizeCosts[selectedSize] || 0) + 
    (pkgCosts[selectedPackaging] || 0) + 
    (addLogoSticker ? 2 : 0);

  const basePrice = (selectedSize && selectedPackaging) ? Math.round((currentCost + (currentCost * 0.7)) * 2) : 0;
  const totalPrice = basePrice * qty;

  const isFormComplete = selectedSize !== '' && selectedPackaging !== '';

  const handleAddToCart = () => {
    if (!isFormComplete) {
      alert('กรุณาเลือกขนาดและบรรจุภัณฑ์ก่อนสั่งซื้อ');
      return;
    }
    addToCart({
      color: selectedColor,
      size: selectedSize,
      scent: selectedScent,
      packaging: selectedPackaging,
      addon: addLogoSticker,
      price: basePrice,
      quantity: qty,
      image: currentImages[0]
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-stone-200">
      
      {isOrderSummaryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 pb-0 flex justify-between items-center">
              <h3 className="text-xl font-medium text-stone-900">สรุปรายการสั่งซื้อ</h3>
              <button onClick={() => setIsOrderSummaryOpen(false)} className="text-stone-400 hover:text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full p-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-5 items-center border-b border-stone-100 pb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 flex-shrink-0">
                  <img 
                    src={currentImages[0]} 
                    className="w-full h-full object-cover mix-blend-multiply transition-all duration-700" 
                    alt="Product" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 text-lg">Aroma Wax Sachet</h4>
                  <p className="text-sm text-stone-500 mt-1">จำนวน: {qty} ชิ้น</p>
                  <p className="text-base font-semibold text-stone-900 mt-2">รวม {totalPrice} บาท</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                <div className="text-stone-500">สี (Color)</div><div className="font-medium text-stone-900 capitalize">{selectedColor === 'charcoal' ? 'สีผงถ่าน (Charcoal)' : selectedColor}</div>
                <div className="text-stone-500">ประดับ (Decor)</div><div className="font-medium text-stone-900">{selectedDecoration}</div>
                <div className="text-stone-500">ขนาด (Size)</div><div className="font-medium text-stone-900">{selectedSize}</div>
                <div className="text-stone-500">กลิ่น (Scent)</div><div className="font-medium text-stone-900">{selectedScent}</div>
                <div className="text-stone-500">แพ็กเกจ (Package)</div><div className="font-medium text-stone-900">{selectedPackaging} {addLogoSticker && <span className="text-xs text-stone-400 block">+ สติกเกอร์โลโก้</span>}</div>
              </div>

              <button onClick={() => {
                alert('ในอนาคตปุ่มนี้จะเปิดหน้าต่างแชท LINE Official พร้อมส่งข้อมูลการสั่งซื้อทั้งหมดไปให้แอดมินทันทีครับ!');
                setIsOrderSummaryOpen(false);
              }} className="w-full bg-[#00B900] hover:bg-[#00A000] text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/20 mt-4">
                สั่งซื้อสินค้าผ่าน LINE
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-stone-200/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] px-5 md:px-10 py-4 flex items-center justify-between transition-all">
        <button className="md:hidden p-2 -ml-2 text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <div className="hidden md:flex space-x-8 text-sm text-stone-500 font-medium tracking-wide">
          <a href="#" className="text-stone-900 transition-colors">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="hover:text-stone-900 transition-colors">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="hover:text-stone-900 transition-colors">Workshop</a>
          <a href="/Web-Chomm-s-House/gallery" className="hover:text-stone-900 transition-colors">Gallery</a>
        </div>
        
        <div className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="w-5 h-5 text-stone-900"><path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" /></svg>
          <span className="ml-1">Chomm's House</span>
        </div>

        <div className="flex items-center space-x-6 text-sm text-stone-500 font-medium">
          <a href="/Web-Chomm-s-House/contact" className="hidden md:block hover:text-stone-900 transition-colors">Contact</a>
          <HeaderActions />
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 px-5 py-4 space-y-4 shadow-sm animate-in slide-in-from-top-4">
          <a href="#" className="block text-stone-900 font-medium">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="block text-stone-500">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="block text-stone-500">Workshop</a>
          <a href="/Web-Chomm-s-House/gallery" className="block text-stone-500">Gallery</a>
          <a href="/Web-Chomm-s-House/contact" className="block text-stone-500">Contact</a>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        <div className="w-full flex flex-col gap-4 lg:sticky lg:top-28">
          
          <div 
            className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-transparent group flex items-center justify-center cursor-zoom-in"
            onClick={() => { setIsLightboxOpen(true); setIsZoomed(false); }}
          >
            <img 
              src={currentImages[activeIndex]} 
              alt="Product Main" 
              className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
              
            />
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 pointer-events-none">
                <span className="text-[10px] md:text-xs text-stone-600 font-medium tracking-wide bg-white/40 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                  ภาพนี้เป็นเพียงภาพประกอบสินค้าเท่านั้น
                </span>
              </div>
          </div>
          
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {currentImages.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => { setActiveIndex(idx); setSlideDelay(10000); }} 
                className={`relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'ring-2 ring-stone-900 ring-offset-2 scale-95' : 'opacity-60 hover:opacity-100 bg-transparent border border-stone-100'}`}
              >
                <img 
                  src={img} 
                  alt={`Thumb ${idx}`} 
                  className="w-full h-full object-cover object-center mix-blend-multiply p-1 transition-all duration-700 ease-in-out"
                  
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col pt-2 lg:pt-4">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight mb-2">Aroma Wax Sachet</h1>
          <p className="text-2xl font-medium text-stone-800 mb-6">฿ {basePrice.toLocaleString()}</p>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            แว็กซ์หอมปรับอากาศทำมือ ผสานดอกไม้แห้งธรรมชาติ สร้างบรรยากาศผ่อนคลายให้ทุกพื้นที่ของคุณอย่างลงตัว
          </p>

          <div className="space-y-8">
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-stone-900 tracking-wide">สีแว็กซ์ (Color)</span>
                <span className="text-xs text-stone-400 font-medium capitalize">{colors.find(c => c.id === selectedColor)?.label}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => handleColorClick(color.id)}
                    className={`relative w-12 h-12 rounded-full transition-transform active:scale-95 ${selectedColor === color.id ? 'ring-1 ring-stone-900 ring-offset-4' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  >
                    {selectedColor === color.id && color.id === 'white' && (
                      <svg className="w-5 h-5 absolute inset-0 m-auto text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    {selectedColor === color.id && color.id !== 'white' && (
                      <svg className="w-5 h-5 absolute inset-0 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">ดอกไม้ประดับ (Decoration)</span>
              <div className="flex flex-wrap gap-2">
                {decorations.map(decor => (
                  <button 
                    key={decor}
                    onClick={() => setSelectedDecoration(decor)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedDecoration === decor ? 'bg-stone-900 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {decor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">ขนาด (Size)</span>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${selectedSize === size ? 'border-2 border-stone-900 text-stone-900 bg-stone-50' : 'border border-stone-200 text-stone-500 hover:border-stone-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">กลิ่นหอม (Scent)</span>
              <div className="flex flex-wrap gap-2">
                {scents.map(scent => (
                  <button 
                    key={scent}
                    onClick={() => setSelectedScent(scent)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedScent === scent ? 'bg-stone-900 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {scent}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">บรรจุภัณฑ์ (Packaging)</span>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {['ซองใส', 'ซองแก้ว', 'กล่องลิ้นชัก'].map(pkg => (
                  <button 
                    key={pkg}
                    onClick={() => setSelectedPackaging(pkg)}
                    className={`p-2 flex flex-col items-center justify-center rounded-2xl transition-all h-full min-h-[140px] ${selectedPackaging === pkg ? 'border-2 border-stone-900 text-stone-900 bg-stone-50 shadow-sm' : 'border border-stone-200 text-stone-400 hover:border-stone-400'}`}
                  >
                    {pkg === 'ซองใส' && <img src="/Web-Chomm-s-House/images/packaging-clear.png" className="w-full h-auto object-contain mix-blend-multiply rounded-xl" alt="ซองใส" />}
                    {pkg === 'ซองแก้ว' && <img src="/Web-Chomm-s-House/images/packaging-organza.png" className="w-full h-auto object-contain mix-blend-multiply rounded-xl" alt="ซองแก้ว" />}
                    {pkg === 'กล่องลิ้นชัก' && <img src="/Web-Chomm-s-House/images/packaging-box.png" className="w-full h-auto object-contain mix-blend-multiply rounded-xl" alt="กล่องลิ้นชัก" />}
                    {/* removed redundant text */}
                  </button>
                ))}
              </div>
              
              <label 
                className="flex items-center space-x-3 mt-4 cursor-pointer group w-max"
                onClick={() => setAddLogoSticker(!addLogoSticker)}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${addLogoSticker ? 'bg-stone-900 border border-stone-900' : 'border border-stone-300 group-hover:border-stone-400'}`}>
                  {addLogoSticker && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
                <span className={`text-sm transition-colors duration-200 ${addLogoSticker ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>ติดสติกเกอร์โลโก้แบรนด์</span>
              </label>
            </div>

            <hr className="border-stone-100 my-2" />

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center bg-white border border-stone-200 rounded-full h-14 w-40 overflow-hidden shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 hover:bg-stone-50 text-stone-600 h-full flex items-center justify-center text-xl transition-colors">−</button>
                <input type="text" readOnly value={qty} className="w-12 text-center text-base bg-transparent outline-none font-medium text-stone-900" />
                <button onClick={() => setQty(qty + 1)} className="flex-1 hover:bg-stone-50 text-stone-600 h-full flex items-center justify-center text-xl transition-colors">+</button>
              </div>

              <button 
                onClick={handleAddToCart} 
                disabled={!isFormComplete}
                className={`flex-1 font-medium py-4 px-8 rounded-full flex items-center justify-center space-x-3 transition-all ${isFormComplete ? 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.98] shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : 'bg-stone-200 text-stone-500 cursor-not-allowed'}`}
              >
                <span className="text-lg">สั่งซื้อสินค้า</span>
                <span className="w-1.5 h-1.5 bg-current opacity-30 rounded-full"></span>
                <span className="text-lg">฿ {totalPrice.toLocaleString()}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-200 p-4 px-5 flex items-center justify-between z-40 pb-safe shadow-[0_-10px_40px_rgb(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-stone-500 mb-0.5">ราคาสุทธิ</span>
          <span className="text-xl font-bold text-stone-900">฿ {totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full h-12 w-28 overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 text-stone-600 h-full flex items-center justify-center text-lg active:bg-stone-200">−</button>
            <span className="w-8 text-center text-sm font-medium text-stone-900">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="flex-1 text-stone-600 h-full flex items-center justify-center text-lg active:bg-stone-200">+</button>
          </div>
          <button 
            onClick={handleAddToCart} 
            disabled={!isFormComplete}
            className={`px-7 py-3.5 rounded-full font-medium shadow-lg transition-all text-sm ${isFormComplete ? 'bg-stone-900 text-white active:scale-95' : 'bg-stone-200 text-stone-500 cursor-not-allowed'}`}
          >
            สั่งซื้อ
          </button>
        </div>
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 z-[210] p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div 
            className="relative w-full h-full p-4 md:p-12 flex items-center justify-center overflow-auto hide-scrollbar"
            style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
          >
            <img 
              src={currentImages[activeIndex]} 
              alt="Product Fullscreen" 
              className={`max-w-full max-h-full object-contain origin-center transition-transform duration-300 ${isZoomed ? 'scale-[2.5] md:scale-[2.0] cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                setIsZoomed(!isZoomed); 
              }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
