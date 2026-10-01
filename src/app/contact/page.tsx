'use client';
import HeaderActions from '@/components/HeaderActions';
import { useState } from 'react';

export default function ContactPage() {
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
          <a href="/Web-Chomm-s-House/workshop" className="hover:text-stone-900 transition-colors">Workshop</a>
        </div>
        
        <a href="/Web-Chomm-s-House/" className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer">
          <div className="w-5 h-5 bg-stone-900 rounded-sm flex items-center justify-center transform rotate-45"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
          <span className="ml-1">Chomm's</span>
        </a>

        <div className="flex items-center space-x-6 text-sm text-stone-500 font-medium">
          <a href="/Web-Chomm-s-House/contact" className="hidden md:block text-stone-900 transition-colors">Contact</a>
          <HeaderActions />
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 px-5 py-4 space-y-4 shadow-sm animate-in slide-in-from-top-4">
          <a href="/Web-Chomm-s-House/" className="block text-stone-500">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="block text-stone-500">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="block text-stone-500">Workshop</a>
          <a href="/Web-Chomm-s-House/contact" className="block text-stone-900 font-medium">Contact</a>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-20">
         
         <h1 className="text-3xl md:text-4xl font-sans font-bold text-stone-800 mb-12">ช่องทางการติดต่อ</h1>

         {/* Primary Contacts */}
         <div className="flex flex-col md:flex-row gap-4 mb-16 w-full max-w-3xl justify-center">
            
            <a href="mailto:chommshouse.official@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-rose-400 bg-white rounded-full px-8 py-3.5 hover:bg-rose-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 active:scale-95 group">
               <svg className="w-5 h-5 text-stone-700 group-hover:text-rose-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               <div className="flex flex-col">
                  <span className="text-stone-800 font-bold leading-tight group-hover:text-rose-600 transition-colors duration-300">GMAIL</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-rose-500 transition-colors duration-300">chommshouse.official@gmail.com</span>
               </div>
            </a>

            <a href="https://lin.ee/VAbHOnM" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-green-400 bg-white shadow-sm rounded-full px-8 py-3.5 hover:bg-green-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 active:scale-95 group">
               <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300"><div className="w-2.5 h-2.5 bg-green-500 group-hover:bg-white rounded-sm transition-colors duration-300"></div></div>
               <div className="flex flex-col">
                  <span className="text-green-500 font-bold leading-tight group-hover:text-green-600 transition-colors duration-300">LINE OA</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-green-600 transition-colors duration-300">@chommshouse</span>
               </div>
            </a>

            <a href="https://www.facebook.com/ChommsHouseTH/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-blue-400 bg-white shadow-sm rounded-full px-8 py-3.5 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 active:scale-95 group">
               <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
               <div className="flex flex-col">
                  <span className="text-blue-500 font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300">FACEBOOK PAGE</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-blue-500 transition-colors duration-300">Chomm's House</span>
               </div>
            </a>
            
         </div>

         <div className="flex flex-col items-center w-full">
             <h3 className="text-sm font-bold text-green-600/80 tracking-wide mb-6">ติดตามข่าวสาร</h3>
             
             <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center flex-wrap">
                 
                 <a href="https://www.instagram.com/chomms.house_officialth/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-rose-300 bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:bg-rose-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 active:scale-95 group">
                    <svg className="w-5 h-5 text-rose-500 group-hover:text-rose-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                    <div className="flex flex-col">
                        <span className="text-rose-500 font-bold leading-tight group-hover:text-rose-600 transition-colors duration-300">INSTAGRAM</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-rose-400 transition-colors duration-300">chomms.house_officialth</span>
                    </div>
                 </a>

                 <a href="https://www.tiktok.com/@chomms.house_th" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-stone-400 bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:bg-stone-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200 transition-all duration-300 active:scale-95 group">
                    <svg className="w-5 h-5 text-stone-900 group-hover:text-stone-700 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.63-1.07 5.14-2.85 7.02-1.67 1.75-4.04 2.82-6.49 2.95-2.6.14-5.26-.41-7.39-1.99-2.07-1.53-3.32-3.95-3.56-6.49-.24-2.58.46-5.25 2.15-7.23 1.6-1.87 3.93-3.05 6.36-3.31v4.11c-1.3.16-2.52.88-3.32 1.88-.87 1.09-1.2 2.59-1.01 3.97.23 1.6 1.41 3.01 2.92 3.51 1.52.5 3.25.13 4.47-.85 1.18-.95 1.85-2.45 1.85-3.97.02-6.52.01-13.04.01-19.57z"></path></svg>
                    <div className="flex flex-col">
                        <span className="text-stone-900 font-bold leading-tight group-hover:text-stone-700 transition-colors duration-300">TIKTOK</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-stone-600 transition-colors duration-300">@chomms.house_th</span>
                    </div>
                 </a>

                 <a href="https://s.lemon8-app.com/al/GgMyefmyse" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-yellow-400 bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:bg-yellow-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-100 transition-all duration-300 active:scale-95 group">
                    <div className="w-5 h-5 bg-yellow-400 group-hover:bg-yellow-500 rounded-sm text-[8px] font-bold text-stone-900 flex items-center justify-center transition-colors duration-300">L8</div>
                    <div className="flex flex-col">
                        <span className="text-yellow-500 font-bold leading-tight group-hover:text-yellow-600 transition-colors duration-300">LEMON8</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-yellow-500 transition-colors duration-300">Lemon8</span>
                    </div>
                 </a>

                 <a href="https://www.youtube.com/@ChommsHouseTH" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-stone-200 hover:border-red-300 bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:bg-red-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100 transition-all duration-300 active:scale-95 group">
                    <svg className="w-5 h-5 text-red-600 group-hover:text-red-700 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                    <div className="flex flex-col">
                        <span className="text-red-600 font-bold leading-tight group-hover:text-red-700 transition-colors duration-300">YOUTUBE</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-red-500 transition-colors duration-300">@ChommsHouseTH</span>
                    </div>
                 </a>

             </div>
         </div>

      </div>

      {/* Footer */}
      <footer className="w-full bg-[#3b3228] pt-16 pb-8 flex flex-col items-center justify-center">
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
