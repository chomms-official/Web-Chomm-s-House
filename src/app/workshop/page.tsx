'use client';
import Footer from "@/components/Footer";
import HeaderActions from '@/components/HeaderActions';
import { useEffect, useRef, useState } from 'react';

const ORGANIZATIONS = [
  { name: 'Sustainability Expo (SX)', src: '/Web-Chomm-s-House/images/org-sx.png', size: 'max-w-[85%] max-h-[65%]' },
  { name: 'มูลนิธิรากแก้ว', src: '/Web-Chomm-s-House/images/org-raakkaew.png', size: 'max-w-[60%] max-h-[85%]' },
  { name: 'Enactus', src: '/Web-Chomm-s-House/images/org-enactus.png', size: 'max-w-[85%] max-h-[70%]' },
  { name: 'Siam University', src: '/Web-Chomm-s-House/images/org-siam.png', size: 'max-w-[85%] max-h-[60%]' },
];

export default function WorkshopPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orgVisible, setOrgVisible] = useState(false);
  const orgGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orgGridRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setOrgVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOrgVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col flex-1 w-full selection:bg-stone-200">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-stone-200/50 px-5 md:px-10 py-4 flex items-center justify-between transition-all">
        <button className="md:hidden p-2 -ml-2 text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <div className="hidden md:flex space-x-8 text-sm text-stone-500 font-medium tracking-wide">
          <a href="/Web-Chomm-s-House/" className="hover:text-stone-900 transition-colors">Shop</a>
          <a href="/Web-Chomm-s-House/our-story" className="hover:text-stone-900 transition-colors">Our Story</a>
          <a href="/Web-Chomm-s-House/workshop" className="text-stone-900 transition-colors">Workshop</a>
          <a href="/Web-Chomm-s-House/gallery" className="hover:text-stone-900 transition-colors">Gallery</a>
        </div>
        
        <a href="/Web-Chomm-s-House/" className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="w-5 h-5 text-stone-900"><path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" /></svg>
          <span className="ml-1">Chomm's House</span>
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
          <a href="/Web-Chomm-s-House/gallery" className="block text-stone-500">Gallery</a>
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
                 <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w1.webp" alt="Workshop 1" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w2.webp" alt="Workshop 2" loading="lazy" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w3.webp" alt="Workshop 3" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 </div>
                 {/* Row 2 */}
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w4.webp" alt="Workshop 4" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 </div>
                 {/* Row 3 */}
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w5.webp" alt="Workshop 5" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w6.webp" alt="Workshop 6" loading="lazy" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w7.webp" alt="Workshop 7" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <img src="/Web-Chomm-s-House/images/workshop/w8.webp" alt="Workshop 8" loading="lazy" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                 </div>
             </div>
         </div>

         {/* Contact Button Section */}
         <div className="mb-24 flex justify-center w-full">
            <a href="https://lin.ee/VAbHOnM" target="_blank" rel="noopener noreferrer" className="bg-[#433324] hover:bg-[#2c2117] text-white px-8 md:px-12 py-4 md:py-5 rounded-full flex items-center space-x-4 transition-colors shadow-lg hover:shadow-xl shadow-[#433324]/20 group">
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
            
            {/* Logos Grid */}
            <div ref={orgGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full px-4">
                 {ORGANIZATIONS.map((org, index) => (
                     <div
                         key={org.src}
                         className={`transition-all duration-700 ease-out ${orgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                         style={{ transitionDelay: `${index * 120}ms` }}
                     >
                         <div
                             title={org.name}
                             className="org-card group relative aspect-[3/2] bg-white rounded-2xl flex items-center justify-center border border-stone-200/80 shadow-sm overflow-hidden p-5 md:p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3b3228]/10 hover:border-[#dce495]"
                         >
                             {/* Soft brand-tone glow on hover */}
                             <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f7f9e8] via-transparent to-[#f3efe6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                             {/* Shine sweep */}
                             <div className="org-shine pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] z-20" />
                             <img
                                 src={org.src}
                                 alt={org.name}
                                 loading="lazy"
                                 className={`relative z-10 w-auto h-auto object-contain ${org.size} transition-transform duration-500 ease-out group-hover:scale-110`}
                             />
                         </div>
                     </div>
                 ))}
            </div>
            <style jsx>{`
              .org-card:hover .org-shine { animation: orgShine 0.9s ease-out; }
              @keyframes orgShine {
                from { left: -100%; }
                to { left: 150%; }
              }
            `}</style>
         </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}


