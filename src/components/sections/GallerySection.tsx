'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BASE } from '@/lib/constants';
import { scrollToSection } from '@/components/Navbar';

type Category = 'all' | 'gift' | 'sachet' | 'accessory';

type GalleryItem = {
  id: number;
  /** ใส่ path รูปเมื่อพร้อม เช่น `${BASE}/images/gallery/gallery-01.jpg` (ถ้าเป็น null จะแสดงกรอบรอรูป) */
  src: string | null;
  alt: string;
  category: Exclude<Category, 'all'>;
  /** สัดส่วนกรอบรูป */
  ratio: string;
};

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'gift', label: 'Gift Set' },
  { id: 'sachet', label: 'Wax Sachet' },
  { id: 'accessory', label: 'Accessories' },
];

const CATEGORY_ALT: Record<Exclude<Category, 'all'>, string> = {
  gift: 'Gift Set ถุงหอมแว็กซ์',
  sachet: 'Aroma Wax Sachet',
  accessory: 'Accessories ถุงหอมแว็กซ์',
};

const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 39 }, (_, i) => {
  const id = i + 1;
  const category: Exclude<Category, 'all'> = id <= 12 ? 'gift' : id <= 24 ? 'sachet' : 'accessory';
  return {
    id,
    src: `${BASE}/images/gallery/g${id}.webp`,
    alt: `${CATEGORY_ALT[category]} - ภาพที่ ${id}`,
    category,
    ratio: 'aspect-[4/5]',
  };
});

const StarMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 4 C58 4 64 14 64 26 C64 34 58 40 50 42 C58 44 64 50 64 58 C64 72 58 82 50 82 C42 82 36 72 36 58 C36 50 42 44 50 42 C42 40 36 34 36 26 C36 14 42 4 50 4Z M4 50 C4 42 14 36 26 36 C34 36 40 42 42 50 C44 42 50 36 58 36 C72 36 82 42 82 50 C82 58 72 64 58 64 C50 64 44 58 42 50 C40 58 34 64 26 64 C14 64 4 58 4 50Z" fillRule="evenodd"/>
    <path d="M50 0 C60 0 68 12 68 26 C68 36 60 43 50 46 C60 49 68 56 68 66 C68 80 60 92 50 92 C40 92 32 80 32 66 C32 56 40 49 50 46 C40 43 32 36 32 26 C32 12 40 0 50 0Z M0 50 C0 40 12 32 26 32 C36 32 43 40 46 50 C49 40 56 32 66 32 C80 32 92 40 92 50 C92 60 80 68 66 68 C56 68 49 60 46 50 C43 60 36 68 26 68 C12 68 0 60 0 50Z" fill="none" stroke="currentColor" strokeWidth="3" fillRule="evenodd"/>
  </svg>
);

export default function GallerySection() {
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
    <section id="gallery" className="scroll-mt-[72px] lg:scroll-mt-[88px] w-full bg-[#fafaf9] text-stone-900">
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col items-center">

        {/* Hero Title */}
        <div className="w-full flex flex-col items-center text-center mb-12 md:mb-14">
          <div className="flex items-center space-x-3 mb-5 text-[#8a7a5c]">
            <span className="h-px w-8 md:w-12 bg-current opacity-40" />
            <StarMark className="w-4 h-4" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase">Gallery</span>
            <StarMark className="w-4 h-4" />
            <span className="h-px w-8 md:w-12 bg-current opacity-40" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic text-[#3b3228] mb-3 font-medium tracking-tight">Our Creations</h2>
          <p className="text-stone-500 font-sans text-lg tracking-wide mb-4">ภาพตัวอย่างสินค้า</p>
          <p className="max-w-xl text-sm md:text-base text-stone-400 leading-relaxed">
            รวมผลงานถุงหอมแว็กซ์ทำมือจาก Chomm&apos;s House ทุกชิ้นตั้งใจทำด้วยมือ
            ด้วยดอกไม้แห้งและกลิ่นหอมที่คัดสรรมาอย่างพิถีพิถัน
          </p>
        </div>

        {/* Category Filter */}
        <div className="w-full flex justify-center mb-10 md:mb-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-1 py-1 max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
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

        {/* Grid (กรอบสัดส่วนเท่ากันทุกรูป เพื่อให้แถวเรียบเสมอกัน ไม่มีช่องว่าง) */}
        <div className="w-full mb-20 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {visibleItems.map((item, index) => (
              <figure
                key={`${activeCategory}-${item.id}`}
                className="group gallery-fade-in"
                style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
              >
                {item.src ? (
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className={`relative block w-full ${item.ratio} overflow-hidden rounded-2xl bg-stone-100 shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-zoom-in`}
                    aria-label={`ดูภาพ ${item.alt}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                ) : (
                  <div
                    className={`relative w-full ${item.ratio} overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-br from-[#f5f3ee] via-[#efebe3] to-[#e7e1d6] flex flex-col items-center justify-center text-stone-400 transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-0.5`}
                  >
                    <StarMark className="absolute -right-6 -bottom-6 w-28 h-28 text-white/50" />
                    <span className="relative text-xs md:text-sm font-medium tracking-wide">รอรูปภาพ {item.id}</span>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl bg-[#3b3228] px-6 py-14 md:px-16 md:py-16 text-center">
            <StarMark className="absolute -left-10 -top-10 w-40 h-40 text-white/5" />
            <StarMark className="absolute -right-8 -bottom-12 w-48 h-48 text-white/5" />
            <div className="relative flex flex-col items-center">
              <StarMark className="w-7 h-7 text-[#dce495] mb-5" />
              <h3 className="text-3xl md:text-5xl font-serif italic text-white mb-3">Find your favorite scent</h3>
              <p className="text-white/70 text-sm md:text-base mb-9 max-w-md leading-relaxed">
                ชอบชิ้นไหน เลือกซื้อได้เลย หรือสอบถาม/สั่งทำแบบพิเศษกับเราได้ทาง LINE
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={`${BASE}/#shop`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('shop'); }}
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
        </div>

      </div>

      {/* Lightbox */}
      {currentItem && currentItem.src && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
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
    </section>
  );
}
