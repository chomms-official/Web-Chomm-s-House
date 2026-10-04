'use client';
import Footer from "@/components/Footer";
import HeaderActions from '@/components/HeaderActions';
import { useState } from 'react';

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <a href="/Web-Chomm-s-House/workshop" className="hover:text-stone-900 transition-colors">Workshop</a>
          <a href="/Web-Chomm-s-House/gallery" className="hover:text-stone-900 transition-colors">Gallery</a>
        </div>
        
        <a href="/Web-Chomm-s-House/" className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="w-5 h-5 text-stone-900"><path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" /></svg>
          <span className="ml-1">Chomm's House</span>
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
          <a href="/Web-Chomm-s-House/gallery" className="block text-stone-500">Gallery</a>
          <a href="/Web-Chomm-s-House/contact" className="block text-stone-900 font-medium">Contact</a>
        </div>
      )}

      <div className="flex-grow"></div>

      {/* Footer */}
      <Footer />

    </div>
  );
}










