'use client';
import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { BASE } from '@/lib/constants';

const imageMap: Record<string, string[]> = {
  'white': [
    `${BASE}/images/white-front.png`,
    `${BASE}/images/white-left.png`,
    `${BASE}/images/white-right.png`,
    `${BASE}/images/white-top.png`,
    `${BASE}/images/white-back.png`,
    `${BASE}/images/white-bottom.png`
  ],
  'light-green': [
    `${BASE}/images/light-green-front-v3.png`,
    `${BASE}/images/light-green-left-v3.png`,
    `${BASE}/images/light-green-right-v3.png`,
    `${BASE}/images/light-green-top-v3.png`,
    `${BASE}/images/light-green-back-v3.png`,
    `${BASE}/images/light-green-bottom-v3.png`
  ],
  'lime': [
    `${BASE}/images/lime-front-v2.png`,
    `${BASE}/images/lime-left-v2.png`,
    `${BASE}/images/lime-right-v2.png`,
    `${BASE}/images/lime-top-v2.png`,
    `${BASE}/images/lime-back-v2.png`,
    `${BASE}/images/lime-bottom-v2.png`
  ],
  'charcoal': [
    `${BASE}/images/charcoal-front-v2.jpg`,
    `${BASE}/images/charcoal-left-v2.jpg`,
    `${BASE}/images/charcoal-right-v2.jpg`,
    `${BASE}/images/charcoal-top-v2.jpg`,
    `${BASE}/images/charcoal-back-v2.jpg`,
    `${BASE}/images/charcoal-bottom-v2.jpg`
  ]
};

const getImagesForColor = (colorId: string) => imageMap[colorId] || imageMap['white'];

const colors = [
  { id: 'white', hex: '#FDFBF7', label: 'Natural' },
  { id: 'light-green', hex: '#D2DAC5', label: 'Pandan' },
  { id: 'lime', hex: '#DCE495', label: 'Turmeric' },
  { id: 'charcoal', hex: '#3F3F46', label: 'Charcoal' }
];

const decorations = ['ไม่ใส่ประดับ', 'ดอกไม้แห้ง', 'โป๊ยกั๊ก', 'Bio-Bead', 'หินภูเขาไฟ', 'ดอกโสน'];
const sizes = ['ขนาดเล็ก', 'ขนาดกลาง', 'ขนาดใหญ่'];
const scents = ['Premium Floral', 'Fresh Citrus', 'Ice Mint', 'Eucalyptus Bouquet', 'Coffee & Cream'];
const packagings = ['ซองใส', 'ซองแก้ว', 'กล่องลิ้นชัก'];

const decorCosts: Record<string, number> = {
  'ไม่ใส่ประดับ': 0,
  'ดอกไม้แห้ง': 5,
  'โป๊ยกั๊ก': 3,
  'Bio-Bead': 3,
  'หินภูเขาไฟ': 5,
  'ดอกโสน': 5
};
const sizeCosts: Record<string, number> = {
  'ขนาดเล็ก': 20,
  'ขนาดกลาง': 30,
  'ขนาดใหญ่': 45,
  '10-15 กรัม': 20,
  '20-25 กรัม': 30,
  '30-35 กรัม': 45
};
const pkgCosts: Record<string, number> = {
  'ซองใส': 1,
  'ซองแก้ว': 3,
  'กล่องลิ้นชัก': 25
};
const pkgImages: Record<string, string> = {
  'ซองใส': `${BASE}/images/packaging-clear.png`,
  'ซองแก้ว': `${BASE}/images/packaging-organza.png`,
  'กล่องลิ้นชัก': `${BASE}/images/packaging-box.png`,
};

export default function ShopSection() {
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

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [slideDelay, setSlideDelay] = useState(3000);
  const [isShopInView, setIsShopInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // สไลด์รูปสินค้าอัตโนมัติ
  useEffect(() => {
    if (isLightboxOpen) return; 

    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % currentImages.length);
      setSlideDelay(3000);
    }, slideDelay);
    
    return () => clearTimeout(timer);
  }, [currentImages.length, activeIndex, slideDelay, isLightboxOpen]);

  // แสดงแถบสั่งซื้อด้านล่าง (มือถือ) เฉพาะตอนที่กำลังดูส่วน Shop
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsShopInView(entry.isIntersecting),
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lightbox: ปิดด้วย Esc + ล็อกการเลื่อนหน้า
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsLightboxOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isLightboxOpen]);

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
      decoration: selectedDecoration,
      price: basePrice,
      quantity: qty,
      image: currentImages[0]
    });
  };

  return (
    <section ref={sectionRef} id="shop" className="scroll-mt-[72px] lg:scroll-mt-[88px] w-full bg-white text-stone-900 py-16 md:py-24">

      {/* Section Title */}
      <div className="text-center mb-10 md:mb-14 px-5">
        <h2 className="text-5xl md:text-6xl font-serif italic text-[#3b3228] mb-3">Our Shop</h2>
        <p className="text-stone-500 font-sans tracking-wide font-medium">| ออกแบบและสั่งซื้อถุงหอมของคุณ |</p>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        <div className="w-full flex flex-col gap-4 lg:sticky lg:top-[112px]">
          
          <div 
            className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-transparent group flex items-center justify-center cursor-zoom-in"
            onClick={() => { setIsLightboxOpen(true); setIsZoomed(false); }}
          >
            <img 
              src={currentImages[activeIndex]} 
              alt="Aroma Wax Sachet" 
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
                aria-label={`ดูภาพที่ ${idx + 1}`}
                className={`relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'ring-2 ring-stone-900 ring-offset-2 scale-95' : 'opacity-60 hover:opacity-100 bg-transparent border border-stone-100'}`}
              >
                <img 
                  src={img} 
                  alt="" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center mix-blend-multiply p-1 transition-all duration-700 ease-in-out"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col pt-2 lg:pt-4">
          <h3 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight mb-2">Aroma Wax Sachet</h3>
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
                    className={`relative w-12 h-12 rounded-full transition-transform active:scale-95 ${selectedColor === color.id ? 'ring-1 ring-stone-900 ring-offset-4' : 'hover:scale-105'} ${color.id === 'white' ? 'border border-stone-200' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                    aria-label={`สี ${color.label}`}
                    aria-pressed={selectedColor === color.id}
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
                    aria-pressed={selectedDecoration === decor}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedDecoration === decor ? 'bg-stone-900 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {decor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">ขนาด (Size)</span>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedSize === size ? 'bg-stone-900 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                <span className="font-semibold text-stone-800">**หมายเหตุ:</span> สามารถสอบถามรายละเอียดขนาด/แม่พิมพ์ได้ที่ LINE OA
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-stone-900 tracking-wide block mb-3">กลิ่นหอม (Scent)</span>
              <div className="flex flex-wrap gap-2">
                {scents.map(scent => (
                  <button 
                    key={scent}
                    onClick={() => setSelectedScent(scent)}
                    aria-pressed={selectedScent === scent}
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
                {packagings.map(pkg => (
                  <button 
                    key={pkg}
                    onClick={() => setSelectedPackaging(pkg)}
                    aria-pressed={selectedPackaging === pkg}
                    aria-label={pkg}
                    className={`p-2 flex flex-col items-center justify-center rounded-2xl transition-all h-full min-h-[140px] ${selectedPackaging === pkg ? 'border-2 border-stone-900 text-stone-900 bg-stone-50 shadow-sm' : 'border border-stone-200 text-stone-400 hover:border-stone-400'}`}
                  >
                    <img src={pkgImages[pkg]} loading="lazy" className="w-full h-auto object-contain mix-blend-multiply rounded-xl" alt={pkg} />
                  </button>
                ))}
              </div>
              
              <button
                type="button"
                className="flex items-center space-x-3 mt-4 cursor-pointer group w-max"
                onClick={() => setAddLogoSticker(!addLogoSticker)}
                aria-pressed={addLogoSticker}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${addLogoSticker ? 'bg-stone-900 border border-stone-900' : 'border border-stone-300 group-hover:border-stone-400'}`}>
                  {addLogoSticker && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
                <span className={`text-sm transition-colors duration-200 ${addLogoSticker ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>ติดสติกเกอร์โลโก้แบรนด์</span>
              </button>
            </div>

            <hr className="border-stone-100 my-2" />

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center bg-white border border-stone-200 rounded-full h-14 w-40 overflow-hidden shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="ลดจำนวน" className="flex-1 hover:bg-stone-50 text-stone-600 h-full flex items-center justify-center text-xl transition-colors">−</button>
                <input type="text" readOnly value={qty} aria-label="จำนวน" className="w-12 text-center text-base bg-transparent outline-none font-medium text-stone-900" />
                <button onClick={() => setQty(qty + 1)} aria-label="เพิ่มจำนวน" className="flex-1 hover:bg-stone-50 text-stone-600 h-full flex items-center justify-center text-xl transition-colors">+</button>
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

            {!isFormComplete && (
              <p className="text-xs text-stone-400">* กรุณาเลือกขนาดและบรรจุภัณฑ์เพื่อดูราคาและสั่งซื้อ</p>
            )}

          </div>
        </div>
      </div>

      {/* แถบสั่งซื้อด้านล่าง (มือถือ/แท็บเล็ต) — แสดงเฉพาะตอนที่อยู่ในส่วน Shop */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-200 p-4 px-5 flex items-center justify-between z-30 pb-safe shadow-[0_-10px_40px_rgb(0,0,0,0.05)] transition-transform duration-300 ${isShopInView && !isLightboxOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
        aria-hidden={!isShopInView}
      >
        <div className="flex flex-col">
          <span className="text-xs text-stone-500 mb-0.5">ราคาสุทธิ</span>
          <span className="text-xl font-bold text-stone-900">฿ {totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full h-12 w-28 overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="ลดจำนวน" className="flex-1 text-stone-600 h-full flex items-center justify-center text-lg active:bg-stone-200">−</button>
            <span className="w-8 text-center text-sm font-medium text-stone-900">{qty}</span>
            <button onClick={() => setQty(qty + 1)} aria-label="เพิ่มจำนวน" className="flex-1 text-stone-600 h-full flex items-center justify-center text-lg active:bg-stone-200">+</button>
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
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="absolute top-6 right-6 z-[210] p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            aria-label="ปิด"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div 
            className="relative w-full h-full p-4 md:p-12 flex items-center justify-center overflow-auto hide-scrollbar"
            style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
          >
            <img 
              src={currentImages[activeIndex]} 
              alt="Aroma Wax Sachet (เต็มจอ)" 
              className={`max-w-full max-h-full object-contain origin-center transition-transform duration-300 ${isZoomed ? 'scale-[2.5] md:scale-[2.0] cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                setIsZoomed(!isZoomed); 
              }}
            />
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-10 pointer-events-none">
              <span className="text-[10px] md:text-sm text-stone-300 font-medium tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-stone-800">
                ภาพนี้เป็นเพียงภาพประกอบสินค้าเท่านั้น
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
