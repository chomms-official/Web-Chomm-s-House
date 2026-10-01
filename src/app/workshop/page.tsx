'use client';
import HeaderActions from '@/components/HeaderActions';
import { useState } from 'react';

export default function WorkshopPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col selection:bg-stone-200">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-stone-200/50 px-5 md:px-10 py-4 flex items-center justify-between transition-all">
        <button className="md:hidden p-2 -ml-2 text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <div className="hidden md:flex space-x-8 text-sm text-stone-500 font-medium tracking-wide">
          <a href="/Web-Chomm-s-House/" className="hover:text-stone-900 transition-colors">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="hover:text-stone-900 transition-colors">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="text-stone-900 transition-colors">Workshop</a>
        </div>
        
        <a href="/Web-Chomm-s-House/" className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer">
          <div className="w-5 h-5 bg-stone-900 rounded-sm flex items-center justify-center transform rotate-45"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
          <span className="ml-1">Chomm's</span>
        </a>

        <div className="flex items-center space-x-6 text-sm text-stone-500 font-medium">
          <a href="/Web-Chomm-s-House/contact" className="hidden md:block hover:text-stone-900 transition-colors">Contact</a>
          <HeaderActions />
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 px-5 py-4 space-y-4 shadow-sm animate-in slide-in-from-top-4">
          <a href="/Web-Chomm-s-House/" className="block text-stone-500">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="block text-stone-500">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="block text-stone-900 font-medium">Workshop</a>
          <a href="/Web-Chomm-s-House/contact" className="block text-stone-500">Contact</a>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow max-w-6xl w-full mx-auto px-4 md:px-8 py-16 flex flex-col items-center">
         
         {/* Hero Title */}
         <div className="w-full flex flex-col items-center mb-12">
            <h1 className="text-5xl md:text-7xl font-serif italic text-[#3b3228] mb-3 font-medium tracking-tight">Our Workshop</h1>
            <p className="text-stone-500 font-sans text-lg tracking-wide">กิจกรรมของพวกเรา</p>
         </div>

         {/* Collage Grid Layout Placeholder */}
         <div className="w-full mb-24">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                 {/* Row 1 */}
                 <div className="col-span-2 row-span-2 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium">รอรูปภาพ 1 (ขนาดใหญ่)</span>
                 </div>
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 2</span>
                 </div>
                 <div className="col-span-1 row-span-2 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 3 (แนวตั้ง)</span>
                 </div>
                 {/* Row 2 */}
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 4</span>
                 </div>
                 {/* Row 3 */}
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 5</span>
                 </div>
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 6</span>
                 </div>
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 7</span>
                 </div>
                 <div className="col-span-1 row-span-1 bg-stone-200/60 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300">
                     <span className="text-stone-400 font-medium text-xs md:text-sm">รอรูปภาพ 8</span>
                 </div>
             </div>
         </div>

         {/* Contact Button Section */}
         <div className="mb-24 flex justify-center w-full">
            <a href="/Web-Chomm-s-House/contact" className="bg-[#433324] hover:bg-[#2c2117] text-white px-8 md:px-12 py-4 md:py-5 rounded-full flex items-center space-x-4 transition-colors shadow-lg hover:shadow-xl shadow-[#433324]/20 group">
               {/* LINE icon (simulated) */}
               <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#433324] font-bold text-[10px] tracking-tighter">LINE</span>
               </div>
               <span className="font-sans font-bold tracking-wide text-lg md:text-xl">ติดต่อจัด WORKSHOP</span>
            </a>
         </div>

         {/* Organizations Section */}
         <div className="w-full max-w-5xl flex flex-col items-center mb-16">
            <div className="flex flex-col items-center mb-12 text-center">
               <h2 className="text-4xl md:text-6xl font-serif italic text-[#3b3228] mb-3 font-medium">Organization</h2>
               <p className="text-stone-500 font-sans tracking-wide">| องค์กรคู่ค้าของเรา |</p>
            </div>
            
            {/* Logos Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full px-4">
                 <div className="aspect-[3/2] bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                     <span className="text-stone-400 font-medium text-sm">รอโลโก้ 1</span>
                 </div>
                 <div className="aspect-[3/2] bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                     <span className="text-stone-400 font-medium text-sm">รอโลโก้ 2</span>
                 </div>
                 <div className="aspect-[3/2] bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                     <span className="text-stone-400 font-medium text-sm">รอโลโก้ 3</span>
                 </div>
                 <div className="aspect-[3/2] bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                     <span className="text-stone-400 font-medium text-sm">รอโลโก้ 4</span>
                 </div>
            </div>
         </div>

      </div>

      {/* Footer */}
      <footer className="w-full bg-[#3b3228] pt-16 pb-8 flex flex-col items-center justify-center mt-auto">
         <div className="flex items-center space-x-3 mb-6 cursor-pointer">
            <span className="font-serif italic text-4xl text-white tracking-wide">Chomm's</span>
            <div className="flex items-center">
               <span className="text-white font-bold text-sm tracking-[0.2em] mt-2">HOUSE</span>
            </div>
         </div>
         
         <p className="font-serif italic text-white/90 text-xl tracking-wide mb-12">Where the scent, Carry the Story</p>

         <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-sm text-white/80 font-medium mb-12">
            <a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-white transition-colors">เงื่อนไขการบริการ</a>
            <a href="#" className="hover:text-white transition-colors">คำถามที่พบบ่อย (FAQ)</a>
         </div>

         <div className="w-full max-w-4xl border-t border-white/10 pt-8 flex justify-center">
            <p className="text-xs text-white/50 font-sans tracking-wide">© 2026 Chomm's House, All rights reserved.</p>
         </div>
      </footer>

    </div>
  );
}
