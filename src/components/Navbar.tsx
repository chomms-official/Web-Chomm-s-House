'use client';

import { useCallback, useEffect, useState } from 'react';
import HeaderActions from './HeaderActions';
import { useCartStore } from '../store/cartStore';
import { BASE, SECTIONS, type SectionId } from '../lib/constants';

const Logo = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 4 C58 4 64 14 64 26 C64 34 58 40 50 42 C58 44 64 50 64 58 C64 72 58 82 50 82 C42 82 36 72 36 58 C36 50 42 44 50 42 C42 40 36 34 36 26 C36 14 42 4 50 4Z M4 50 C4 42 14 36 26 36 C34 36 40 42 42 50 C44 42 50 36 58 36 C72 36 82 42 82 50 C82 58 72 64 58 64 C50 64 44 58 42 50 C40 58 34 64 26 64 C14 64 4 58 4 50Z" fillRule="evenodd"/>
    <path d="M50 0 C60 0 68 12 68 26 C68 36 60 43 50 46 C60 49 68 56 68 66 C68 80 60 92 50 92 C40 92 32 80 32 66 C32 56 40 49 50 46 C40 43 32 36 32 26 C32 12 40 0 50 0Z M0 50 C0 40 12 32 26 32 C36 32 43 40 46 50 C49 40 56 32 66 32 C80 32 92 40 92 50 C92 60 80 68 66 68 C56 68 49 60 46 50 C43 60 36 68 26 68 C12 68 0 60 0 50Z" fill="none" stroke="currentColor" strokeWidth="3" fillRule="evenodd"/>
  </svg>
);

/** เลื่อนไปยังส่วนที่เลือกแบบนุ่มนวล (ระยะเผื่อแถบเมนูกำหนดด้วย scroll-margin-top ของแต่ละ section) */
export const scrollToSection = (id: string, smooth = true) => {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `#${id}`);
  }
  return true;
};

export default function Navbar() {
  const [active, setActive] = useState<SectionId>('our-story');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useCartStore((s) => s.user);
  const authReady = useCartStore((s) => s.authReady);
  const openLoginModal = useCartStore((s) => s.openLoginModal);

  // เงาใต้แถบเมนูเมื่อเลื่อนลง
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: ไฮไลต์เมนูตามส่วนที่กำลังดูอยู่
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));

    // เมื่อเลื่อนถึงล่างสุดของหน้า ให้ไฮไลต์ Contact เสมอ
    const onScrollBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive('contact');
      }
    };
    window.addEventListener('scroll', onScrollBottom, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollBottom);
    };
  }, []);

  // เปิดลิงก์ที่มี #section (เช่น ลิงก์เก่า /gallery ที่ถูกพามาที่ /#gallery) ให้เลื่อนไปถูกตำแหน่ง
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    if (!hash || !SECTIONS.some((s) => s.id === hash)) return;
    const jump = () => scrollToSection(hash, false);
    const t1 = window.setTimeout(jump, 50);
    // รูปภาพโหลดเสร็จแล้วตำแหน่งอาจขยับ -> เลื่อนซ้ำอีกครั้ง
    const onLoad = () => window.setTimeout(jump, 50);
    if (document.readyState === 'complete') {
      const t2 = window.setTimeout(jump, 400);
      return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }
    window.addEventListener('load', onLoad, { once: true });
    return () => { window.clearTimeout(t1); window.removeEventListener('load', onLoad); };
  }, []);

  // ปิดเมนูมือถือเมื่อขยายจอเป็นเดสก์ท็อป / กด Esc
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    const onResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const handleNav = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActive(id as SectionId);
    if (!scrollToSection(id)) {
      // ไม่ได้อยู่หน้าหลัก -> กลับไปหน้าหลักที่ส่วนนั้น
      window.location.href = `${BASE}/#${id}`;
    }
  }, []);

  const handleLogo = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (document.getElementById('our-story')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', `${BASE}/`);
    } else {
      window.location.href = `${BASE}/`;
    }
  };

  const desktopLinks = SECTIONS.filter((s) => s.id !== 'contact');

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-40 h-[72px] lg:h-[88px] bg-[#3b3228] transition-shadow duration-300 ${scrolled ? 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]' : 'shadow-md shadow-black/10'}`}
        aria-label="เมนูหลัก"
      >
        <div className="relative h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Hamburger (มือถือ/แท็บเล็ต) */}
          <button
            className="lg:hidden p-2 -ml-2 text-white/90 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

          {/* ลิงก์ซ้าย (เดสก์ท็อป) */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-10 text-[15px] font-medium tracking-wide">
            {desktopLinks.map((s) => (
              <a
                key={s.id}
                href={`${BASE}/#${s.id}`}
                onClick={(e) => handleNav(e, s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`relative py-1 transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-[#dce495] after:transition-all after:duration-300 ${
                  active === s.id ? 'text-white font-bold after:w-full' : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* โลโก้ (กึ่งกลาง) */}
          <a
            href={`${BASE}/`}
            onClick={handleLogo}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-serif font-medium text-lg sm:text-2xl lg:text-3xl tracking-tight text-white whitespace-nowrap hover:scale-105 transition-transform duration-300"
          >
            <Logo className="hidden min-[400px]:block w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            <span>Chomm&apos;s House</span>
          </a>

          {/* ขวา: Contact + Login + Cart */}
          <div className="flex items-center gap-6 xl:gap-8 text-[15px] font-medium">
            <a
              href={`${BASE}/#contact`}
              onClick={(e) => handleNav(e, 'contact')}
              aria-current={active === 'contact' ? 'true' : undefined}
              className={`hidden lg:block relative py-1 transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-[#dce495] after:transition-all after:duration-300 ${
                active === 'contact' ? 'text-white font-bold after:w-full' : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              Contact
            </a>
            <HeaderActions />
          </div>
        </div>

        {/* เมนูมือถือ */}
        {isMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full bg-white border-b border-stone-100 shadow-xl px-4 py-4 space-y-1 animate-in slide-in-from-top-4 fade-in duration-200">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`${BASE}/#${s.id}`}
                onClick={(e) => handleNav(e, s.id)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  active === s.id ? 'text-[#3b3228] font-bold bg-[#3b3228]/5' : 'text-stone-500 hover:text-[#3b3228] hover:bg-stone-50'
                }`}
              >
                {s.label}
              </a>
            ))}
            {authReady && !user && (
              <div className="pt-3 mt-2 border-t border-stone-100">
                <button
                  onClick={() => { setIsMenuOpen(false); openLoginModal(); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#3b3228] hover:bg-[#2c2117] text-white font-bold text-sm py-3.5 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  เข้าสู่ระบบ
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* พื้นที่กันเนื้อหาไม่ให้ถูกแถบเมนู (fixed) บัง */}
      <div aria-hidden="true" className="h-[72px] lg:h-[88px] flex-shrink-0" />
    </>
  );
}
