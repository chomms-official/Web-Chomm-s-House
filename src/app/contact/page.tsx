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
            
            <a href="mailto:chommshouse.official@gmail.com" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-8 py-3.5 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100 transition-all duration-300 active:scale-95 group">
               <div className="absolute inset-0 w-full h-full bg-[#ea4335] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
               <svg className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               <div className="flex flex-col">
                  <span className="text-stone-800 font-bold leading-tight group-hover:text-white transition-colors duration-300">GMAIL</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">chommshouse.official@gmail.com</span>
               </div>
            </a>

            <a href="https://lin.ee/VAbHOnM" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-8 py-3.5 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-100 transition-all duration-300 active:scale-95 group">
               <div className="absolute inset-0 w-full h-full bg-[#06c755] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
               <svg className="w-[22px] h-[22px] text-[#06c755] group-hover:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
               <div className="flex flex-col">
                  <span className="text-green-500 font-bold leading-tight group-hover:text-white transition-colors duration-300">LINE OA</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">@chommshouse</span>
               </div>
            </a>

            <a href="https://www.facebook.com/ChommsHouseTH/" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-8 py-3.5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 active:scale-95 group">
               <div className="absolute inset-0 w-full h-full bg-[#1877f2] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
               <svg className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
               <div className="flex flex-col">
                  <span className="text-blue-500 font-bold leading-tight group-hover:text-white transition-colors duration-300">FACEBOOK PAGE</span>
                  <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">Chomm's House</span>
               </div>
            </a>
            
         </div>

         <div className="flex flex-col items-center w-full">
             <h3 className="text-sm font-bold text-green-600/80 tracking-wide mb-6">ติดตามข่าวสาร</h3>
             
             <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center flex-wrap">
                 
                 <a href="https://www.instagram.com/chomms.house_officialth/" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100 transition-all duration-300 active:scale-95 group">
                    <div className="absolute inset-0 w-full h-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full" style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}></div>
                    <svg className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                    <div className="flex flex-col">
                        <span className="text-rose-500 font-bold leading-tight group-hover:text-white transition-colors duration-300">INSTAGRAM</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">chomms.house_officialth</span>
                    </div>
                 </a>

                 <a href="https://www.tiktok.com/@chomms.house_th" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200 transition-all duration-300 active:scale-95 group">
                      <div className="absolute inset-0 w-full h-full bg-[#010101] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" fill="currentColor" className="text-stone-900 group-hover:text-white transition-colors duration-300" />
                      </svg>
                      <div className="flex flex-col">
                          <span className="text-stone-900 font-bold leading-tight group-hover:text-white transition-colors duration-300">TIKTOK</span>
                          <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">@chomms.house_th</span>
                      </div>
                   </a>

                 <a href="https://s.lemon8-app.com/al/GgMyefmyse" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-100 transition-all duration-300 active:scale-95 group">
                    <div className="absolute inset-0 w-full h-full bg-[#E0B000] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                       <path d="M506 116v280c0 60.71-49.29 110-110 110H116C55.29 506 6 456.71 6 396V116C6 55.29 55.29 6 116 6h280c60.71 0 110 49.29 110 110z" fill="#FFE100" className="group-hover:fill-[#E0B000] transition-colors duration-300"/>
                       <g fillRule="nonzero" fill="#111" className="group-hover:fill-white transition-colors duration-300">
                          <path d="M368.769 197.312c-14.271 3.385-19.48 18.437-26.875 29.27.99-7.968 3.177-16.302 4.947-24.218.47-2.24.886-4.74-2.447-5.417-12.709-2.76-14.688 10.208-16.824 19.48-1.614 4.791-7.656 3.541-11.77 5-7.97-40.522-58.126-22.24-53.126 13.124.469 6.25-2.865 9.532-6.77 12.761-6.668 5-8.022-4.948-7.449-9.688.313-8.75 1.094-17.552 1.042-26.302-.052-9.01-6.198-12.396-14.271-8.438-12.396 6.146-16.72 19.22-20.938 31.25-1.146-9.791 5.781-33.645-12.188-27.24-13.437 5.314-16.302 19.584-21.719 31.772-.26-8.594.938-16.302 1.615-24.74.26-3.177-1.354-4.323-4.427-4.219-6.615.313-11.042 3.855-11.563 10.574-1.198 10.156.26 20.937-1.666 30.833-5.834 10.26-23.126 23.021-33.178 12.604 10.99-6.406 23.646-14.114 22.553-28.802-.678-10.573-8.178-17.865-17.709-16.875-21.198 1.614-30.365 25.417-24.688 43.959-6.406 3.958-12.396 7.864-18.542 11.51-4.479 2.656-6.823 1.354-6.406-3.802 2.188-17.083 5.521-34.063 7.24-51.25 1.562-11.198-11.667-22.865-22.136-15.678-4.844 3.282-6.354 6.927-5 12.553 6.823 22.135 4.844 45.73 6.458 68.594 6.928 26.406 32.813-4.48 42.865-13.542 13.178 19.48 39.949 11.302 52.657-3.958 3.334 9.323 15 9.48 16.823-.73 2.084-11.51 4.896-22.916 8.49-34.01.573-1.719 1.354-3.125 2.083-3.646 1.042-.833 3.125-.885 3.23 1.406.208 6.094.52 11.667.625 18.282.104 7.24.52 21.77 11.198 21.354 3.698-.156 6.875-2.5 7.656-6.302 1.302-12.24 5.365-23.49 9.01-35.157 1.094-3.49 2.657-4.323 3.855-4.375a1.615 1.615 0 011.718 1.615c.052 10.052-.416 20.365 1.042 30.26 4.01 16.407 28.386 8.23 33.334-3.906 14.844 20 42.396 9.375 46.98-12.083 1.145-5.625 6.718-4.167 11.302-5.209.468 6.98-.99 27.136 9.062 26.25 3.906-.051 6.771-1.614 8.073-5.468 3.177-11.094 8.438-21.51 13.073-32.084.938-1.979 2.709-5.781 5.573-5.104a1.414 1.414 0 011.042 1.458c-.677 10.938-2.708 21.824-3.177 32.761-.209 6.146 3.541 8.959 9.687 8.438 11.459-.417 9.167-19.532 8.646-28.282-.677-13.073 11.667-38.802-9.01-34.583zm-241.513 40.104c11.823-17.188 20.781 8.646-1.042 16.354-1.562-5.729-1.458-11.198 1.042-16.354zm172.71.417c-2.188 10.052-15.469 14.01-19.375 2.396-3.021-9.792-2.5-26.146 10.625-27.813-.99 19.063 11.875 17.188 8.75 25.417zM253.247 311.01c-34.167 3.178-67.761 9.792-101.147 17.605-6.406 1.51-12.448-.26-17.657-3.854-1.718-1.198-3.49-4.271-3.072-5.886.52-1.979 3.072-4.27 5.208-4.844 9.219-2.552 18.542-4.687 27.917-6.666 29.48-6.302 59.22-10.938 89.22-13.542 24.062-2.083 48.23-3.438 72.396-4.323 16.302-.573 32.709 0 49.063.573 4.427.156 9.063 1.51 13.073 3.437 2.188 1.042 4.48 4.375 4.48 6.667.051 3.334-3.438 5.104-6.667 5.365-5.365.364-10.782.26-16.198.26-9.48-.052-86.98.834-116.616 5.209z"/>
                          <path d="M398.977 222.26c-25.833-24.532 10.47-49.428 37.188-35.313 17.553 9.062 9.01 29.271-5.364 35.469 33.23 24.531-9.22 50.209-36.459 35.99-18.177-9.584-10.99-28.125 4.635-36.146zm13.021 26.927c18.23 0 14.896-17.396 1.302-19.688a7.564 7.564 0 00-4.427.573c-11.458 5.157-12.5 18.438 3.125 19.115zm6.771-53.282c-21.042 0-9.427 26.407 4.375 16.875 10.313-7.03 8.021-16.875-4.375-16.875z"/>
                       </g>
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-yellow-500 font-bold leading-tight group-hover:text-white transition-colors duration-300">LEMON8</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">Lemon8</span>
                    </div>
                 </a>

                 <a href="https://www.youtube.com/@ChommsHouseTH" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden z-10 flex items-center justify-center space-x-3 border border-stone-200 hover:border-transparent bg-white shadow-sm rounded-full px-6 py-3 min-w-[180px] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-100 transition-all duration-300 active:scale-95 group">
                    <div className="absolute inset-0 w-full h-full bg-[#FF0000] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-full"></div>
                    <svg className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                    <div className="flex flex-col">
                        <span className="text-red-600 font-bold leading-tight group-hover:text-white transition-colors duration-300">YOUTUBE</span>
                        <span className="text-[9px] text-stone-400 font-medium leading-none mt-0.5 group-hover:text-white/90 transition-colors duration-300">@ChommsHouseTH</span>
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










