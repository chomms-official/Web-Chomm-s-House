'use client';

import { BASE } from '@/lib/constants';
import { scrollToSection } from '@/components/Navbar';

export default function HeroShopButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!scrollToSection('shop')) {
      window.location.href = `${BASE}/#shop`;
    }
  };

  return (
    <a
      href={`${BASE}/#shop`}
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md px-7 py-3 md:px-9 md:py-3.5 text-sm md:text-base font-sans font-semibold tracking-wide text-[#3b3228] shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#3b3228] hover:text-white hover:ring-[#dce495]/90 hover:shadow-[0_14px_36px_rgba(0,0,0,0.42)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dce495]"
    >
      <svg
        className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#3b3228] transition-colors duration-300 group-hover:text-[#dce495]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span>สั่งซื้อสินค้าตอนนี้</span>
      <svg
        className="w-4 h-4 text-[#3b3228]/70 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-[#dce495]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </a>
  );
}
