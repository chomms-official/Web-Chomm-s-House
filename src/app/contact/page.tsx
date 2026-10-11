'use client';
import { useEffect } from 'react';
import { BASE } from '@/lib/constants';

export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace(`${BASE}/#contact`);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf9] text-[#3b3228] p-6 text-center">
      <p className="font-serif italic text-xl mb-2">Chomm&apos;s House</p>
      <p className="text-sm text-stone-500 animate-pulse">กำลังพาไปยังส่วน Contact...</p>
    </div>
  );
}
