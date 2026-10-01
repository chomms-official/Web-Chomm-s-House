'use client';

import { useCartStore } from '../store/cartStore';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

export default function LoginModal() {
  const { isLoginModalOpen, toggleLoginModal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // User state is handled globally, so just close modal
      toggleLoginModal();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col items-center p-8 text-center relative">
        
        <button onClick={toggleLoginModal} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-100 hover:bg-stone-200 rounded-full">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
           <svg className="w-8 h-8 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>

        <h3 className="text-2xl font-serif italic font-medium text-stone-900 mb-2">Welcome Back</h3>
        <p className="text-sm text-stone-500 mb-8 font-sans tracking-wide">เข้าสู่ระบบเพื่อบันทึกตะกร้าสินค้าของคุณข้ามอุปกรณ์</p>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-3.5 px-4 rounded-full transition-all shadow-sm mb-4 disabled:opacity-50"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-stone-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          )}
          <span>เข้าสู่ระบบด้วย Google</span>
        </button>
      </div>
    </div>
  );
}
