'use client';
import HeaderActions from '@/components/HeaderActions';
import { useCallback, useEffect, useMemo, useState } from 'react';

const BASE = '/Web-Chomm-s-House';

type Category = 'all' | 'gift' | 'sachet' | 'accessory';

type GalleryItem = {
  id: number;
  /** ใส่ path รูปเมื่อพร้อม เช่น `${BASE}/images/gallery/gallery-01.jpg` (ถ้าเป็น null จะแสดงกรอบรอรูป) */
  src: string | null;
  alt: string;
  category: Exclude<Category, 'all'>;
  /** สัดส่วนกรอบรอรูป (ใช้เฉพาะตอนยังไม่มีรูป) */
  ratio: string;
};

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'gift', label: 'Gift Set' },
  { id: 'sachet', label: 'Wax Sachet' },
  { id: 'accessory', label: 'Accessories' },
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: ${BASE}/images/gallery/g1.webp, alt: 'ภาพตัวอย่างสินค้า 1', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 2, src: ${BASE}/images/gallery/g2.webp, alt: 'ภาพตัวอย่างสินค้า 2', category: 'accessory', ratio: 'aspect-[3/4]' },
  { id: 3, src: ${BASE}/images/gallery/g3.webp, alt: 'ภาพตัวอย่างสินค้า 3', category: 'accessory', ratio: 'aspect-[4/5]' },
  { id: 4, src: ${BASE}/images/gallery/g4.webp, alt: 'ภาพตัวอย่างสินค้า 4', category: 'gift', ratio: 'aspect-[3/4]' },
  { id: 5, src: ${BASE}/images/gallery/g5.webp, alt: 'ภาพตัวอย่างสินค้า 5', category: 'accessory', ratio: 'aspect-square' },
  { id: 6, src: ${BASE}/images/gallery/g6.webp, alt: 'ภาพตัวอย่างสินค้า 6', category: 'sachet', ratio: 'aspect-[3/4]' },
  { id: 7, src: ${BASE}/images/gallery/g7.webp, alt: 'ภาพตัวอย่างสินค้า 7', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 8, src: ${BASE}/images/gallery/g8.webp, alt: 'ภาพตัวอย่างสินค้า 8', category: 'sachet', ratio: 'aspect-[3/4]' },
  { id: 9, src: ${BASE}/images/gallery/g9.webp, alt: 'ภาพตัวอย่างสินค้า 9', category: 'sachet', ratio: 'aspect-[4/3]' },
  { id: 10, src: ${BASE}/images/gallery/g10.webp, alt: 'ภาพตัวอย่างสินค้า 10', category: 'sachet', ratio: 'aspect-[3/4]' },
  { id: 11, src: ${BASE}/images/gallery/g11.webp, alt: 'ภาพตัวอย่างสินค้า 11', category: 'accessory', ratio: 'aspect-[4/3]' },
  { id: 12, src: ${BASE}/images/gallery/g12.webp, alt: 'ภาพตัวอย่างสินค้า 12', category: 'accessory', ratio: 'aspect-[4/3]' },
  { id: 13, src: ${BASE}/images/gallery/g13.webp, alt: 'ภาพตัวอย่างสินค้า 13', category: 'gift', ratio: 'aspect-square' },
  { id: 14, src: ${BASE}/images/gallery/g14.webp, alt: 'ภาพตัวอย่างสินค้า 14', category: 'accessory', ratio: 'aspect-[4/5]' },
  { id: 15, src: ${BASE}/images/gallery/g15.webp, alt: 'ภาพตัวอย่างสินค้า 15', category: 'sachet', ratio: 'aspect-[4/5]' },
  { id: 16, src: ${BASE}/images/gallery/g16.webp, alt: 'ภาพตัวอย่างสินค้า 16', category: 'accessory', ratio: 'aspect-[3/4]' },
  { id: 17, src: ${BASE}/images/gallery/g17.webp, alt: 'ภาพตัวอย่างสินค้า 17', category: 'accessory', ratio: 'aspect-[4/3]' },
  { id: 18, src: ${BASE}/images/gallery/g18.webp, alt: 'ภาพตัวอย่างสินค้า 18', category: 'gift', ratio: 'aspect-[4/5]' },
  { id: 19, src: ${BASE}/images/gallery/g19.webp, alt: 'ภาพตัวอย่างสินค้า 19', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 20, src: ${BASE}/images/gallery/g20.webp, alt: 'ภาพตัวอย่างสินค้า 20', category: 'gift', ratio: 'aspect-[4/5]' },
  { id: 21, src: ${BASE}/images/gallery/g21.webp, alt: 'ภาพตัวอย่างสินค้า 21', category: 'sachet', ratio: 'aspect-[4/3]' },
  { id: 22, src: ${BASE}/images/gallery/g22.webp, alt: 'ภาพตัวอย่างสินค้า 22', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 23, src: ${BASE}/images/gallery/g23.webp, alt: 'ภาพตัวอย่างสินค้า 23', category: 'gift', ratio: 'aspect-[3/4]' },
  { id: 24, src: ${BASE}/images/gallery/g24.webp, alt: 'ภาพตัวอย่างสินค้า 24', category: 'sachet', ratio: 'aspect-[3/4]' },
  { id: 25, src: ${BASE}/images/gallery/g25.webp, alt: 'ภาพตัวอย่างสินค้า 25', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 26, src: ${BASE}/images/gallery/g26.webp, alt: 'ภาพตัวอย่างสินค้า 26', category: 'sachet', ratio: 'aspect-square' },
  { id: 27, src: ${BASE}/images/gallery/g27.webp, alt: 'ภาพตัวอย่างสินค้า 27', category: 'accessory', ratio: 'aspect-[4/3]' },
  { id: 28, src: ${BASE}/images/gallery/g28.webp, alt: 'ภาพตัวอย่างสินค้า 28', category: 'accessory', ratio: 'aspect-[4/3]' },
  { id: 29, src: ${BASE}/images/gallery/g29.webp, alt: 'ภาพตัวอย่างสินค้า 29', category: 'sachet', ratio: 'aspect-[4/3]' },
  { id: 30, src: ${BASE}/images/gallery/g30.webp, alt: 'ภาพตัวอย่างสินค้า 30', category: 'gift', ratio: 'aspect-square' },
  { id: 31, src: ${BASE}/images/gallery/g31.webp, alt: 'ภาพตัวอย่างสินค้า 31', category: 'sachet', ratio: 'aspect-[3/4]' },
  { id: 32, src: ${BASE}/images/gallery/g32.webp, alt: 'ภาพตัวอย่างสินค้า 32', category: 'sachet', ratio: 'aspect-square' },
  { id: 33, src: ${BASE}/images/gallery/g33.webp, alt: 'ภาพตัวอย่างสินค้า 33', category: 'sachet', ratio: 'aspect-square' },
  { id: 34, src: ${BASE}/images/gallery/g34.webp, alt: 'ภาพตัวอย่างสินค้า 34', category: 'sachet', ratio: 'aspect-[4/3]' },
  { id: 35, src: ${BASE}/images/gallery/g35.webp, alt: 'ภาพตัวอย่างสินค้า 35', category: 'sachet', ratio: 'aspect-square' },
  { id: 36, src: ${BASE}/images/gallery/g36.webp, alt: 'ภาพตัวอย่างสินค้า 36', category: 'accessory', ratio: 'aspect-square' },
  { id: 37, src: ${BASE}/images/gallery/g37.webp, alt: 'ภาพตัวอย่างสินค้า 37', category: 'gift', ratio: 'aspect-[4/3]' },
  { id: 38, src: ${BASE}/images/gallery/g38.webp, alt: 'ภาพตัวอย่างสินค้า 38', category: 'sachet', ratio: 'aspect-[4/5]' },
  { id: 39, src: ${BASE}/images/gallery/g39.webp, alt: 'ภาพตัวอย่างสินค้า 39', category: 'accessory', ratio: 'aspect-[3/4]' },
  { id: 40, src: ${BASE}/images/gallery/g40.webp, alt: 'ภาพตัวอย่างสินค้า 40', category: 'gift', ratio: 'aspect-[3/4]' },
];

const StarMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className={className}>
    <path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" />
  </svg>
);

export default function GalleryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => (activeCategory === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  // เฉพาะรูปที่มีไฟล์จริงเท่านั้นที่เปิดดูแบบเต็มจอได้
  const viewableItems = useMemo(() => visibleItems.filter((item) => item.src), [visibleItems]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + viewableItems.length) % viewableItems.length));
  }, [viewableItems.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % viewableItems.length));
  }, [viewableItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const openItem = (item: GalleryItem) => {
    if (!item.src) return;
    const idx = viewableItems.findIndex((v) => v.id === item.id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const currentItem = lightboxIndex !== null ? viewableItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col selection:bg-stone-200">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-stone-200/50 px-5 md:px-10 py-4 flex items-center justify-between transition-all">
        <button className="md:hidden p-2 -ml-2 text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <div className="hidden md:flex space-x-8 text-sm text-stone-500 font-medium tracking-wide">
          <a href={`${BASE}/`} className="hover:text-stone-900 transition-colors">Shop</a>
          <a href={`${BASE}/our-story`} className="hover:text-stone-900 transition-colors">Our Story</a>
          <a href={`${BASE}/workshop`} className="hover:text-stone-900 transition-colors">Workshop</a>
          <a href={`${BASE}/gallery`} className="text-stone-900 transition-colors">Gallery</a>
        </div>

        <a href={`${BASE}/`} className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="w-5 h-5 text-stone-900"><path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" /></svg>
          <span className="ml-1">Chomm&apos;s House</span>
        </a>

        <div className="flex items-center space-x-6 text-sm text-stone-500 font-medium">
          <a href={`${BASE}/contact`} className="hidden md:block hover:text-stone-900 transition-colors">Contact</a>
          <HeaderActions />
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 px-5 py-4 space-y-4 shadow-sm animate-in slide-in-from-top-4">
          <a href={`${BASE}/`} className="block text-stone-500">Shop</a>
          <a href={`${BASE}/our-story`} className="block text-stone-500">Our Story</a>
          <a href={`${BASE}/workshop`} className="block text-stone-500">Workshop</a>
          <a href={`${BASE}/gallery`} className="block text-stone-900 font-medium">Gallery</a>
          <a href={`${BASE}/contact`} className="block text-stone-500">Contact</a>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 md:px-8 py-16 flex flex-col items-center">

        {/* Hero Title */}
        <section className="w-full flex flex-col items-center text-center mb-12 md:mb-14">
          <div className="flex items-center space-x-3 mb-5 text-[#8a7a5c]">
            <span className="h-px w-8 md:w-12 bg-current opacity-40" />
            <StarMark className="w-4 h-4" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase">Gallery</span>
            <StarMark className="w-4 h-4" />
            <span className="h-px w-8 md:w-12 bg-current opacity-40" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#3b3228] mb-3 font-medium tracking-tight">Our Creations</h1>
          <p className="text-stone-500 font-sans text-lg tracking-wide mb-4">ภาพตัวอย่างสินค้า</p>
          <p className="max-w-xl text-sm md:text-base text-stone-400 leading-relaxed">
            รวมผลงานถุงหอมแว็กซ์ทำมือจาก Chomm&apos;s House ทุกชิ้นตั้งใจทำด้วยมือ
            ด้วยดอกไม้แห้งและกลิ่นหอมที่คัดสรรมาอย่างพิถีพิถัน
          </p>
        </section>

        {/* Category Filter */}
        <div className="w-full flex justify-center mb-10 md:mb-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-1 py-1 max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 active:scale-95 ${
                    isActive
                      ? 'bg-[#3b3228] text-white border-[#3b3228] shadow-md shadow-[#3b3228]/15'
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Grid */}
        <section className="w-full mb-24">
          <div className="columns-2 md:columns-3 gap-3 md:gap-5">
            {visibleItems.map((item, index) => (
              <figure
                key={item.id}
                className="break-inside-avoid mb-3 md:mb-5 group gallery-fade-in"
                style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
              >
                {item.src ? (
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className="relative block w-full overflow-hidden rounded-2xl bg-stone-100 shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-zoom-in"
                    aria-label={`ดูภาพ ${item.alt}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                ) : (
                  <div
                    className={`relative w-full ${item.ratio} overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-br from-[#f5f3ee] via-[#efebe3] to-[#e7e1d6] flex flex-col items-center justify-center text-stone-400 transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-0.5`}
                  >
                    <StarMark className="absolute -right-6 -bottom-6 w-28 h-28 text-white/50" />
                    <svg className="w-8 h-8 md:w-10 md:h-10 mb-2 text-stone-300 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                    </svg>
                    <span className="relative text-xs md:text-sm font-medium tracking-wide">รอรูปภาพ {item.id}</span>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#3b3228] px-6 py-14 md:px-16 md:py-16 text-center">
            <StarMark className="absolute -left-10 -top-10 w-40 h-40 text-white/5" />
            <StarMark className="absolute -right-8 -bottom-12 w-48 h-48 text-white/5" />
            <div className="relative flex flex-col items-center">
              <StarMark className="w-7 h-7 text-[#dce495] mb-5" />
              <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-3">Find your favorite scent</h2>
              <p className="text-white/70 text-sm md:text-base mb-9 max-w-md leading-relaxed">
                ชอบชิ้นไหน เลือกซื้อได้เลย หรือสอบถาม/สั่งทำแบบพิเศษกับเราได้ทาง LINE
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={`${BASE}/`}
                  className="flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#3b3228] font-semibold tracking-wide hover:bg-[#f3efe6] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  เลือกซื้อสินค้า
                </a>
                <a
                  href="https://lin.ee/VAbHOnM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold tracking-wide hover:bg-[#06C755] hover:border-[#06C755] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  สอบถามทาง LINE
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox */}
      {currentItem && currentItem.src && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="ปิด"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {viewableItems.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="ภาพก่อนหน้า"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="ภาพถัดไป"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <img
            src={currentItem.src}
            alt={currentItem.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
            {(lightboxIndex ?? 0) + 1} / {viewableItems.length}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#3b3228] pt-16 pb-8 flex flex-col items-center justify-center mt-auto">
        <div className="flex items-center space-x-3 mb-6 cursor-pointer">
          <span className="font-serif italic text-4xl text-white tracking-wide">Chomm&apos;s House</span>
        </div>

        <p className="font-serif italic text-white/90 text-xl tracking-wide mb-12">Where the scent, Carry the Story</p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-sm text-white/80 font-medium mb-12">
          <a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
          <a href="#" className="hover:text-white transition-colors">เงื่อนไขการบริการ</a>
          <a href="#" className="hover:text-white transition-colors">คำถามที่พบบ่อย (FAQ)</a>
        </div>

        <div className="w-full max-w-4xl border-t border-white/10 pt-8 flex justify-center">
          <p className="text-xs text-white/50 font-sans tracking-wide">© 2026 Chomm&apos;s House, All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gallery-fade-in { animation: galleryFadeIn 0.6s ease-out both; }
      `}</style>
    </div>
  );
}
