'use client';

import { useCartStore } from '../store/cartStore';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useEffect, useState } from 'react';

/** ตรวจจับเบราว์เซอร์ในแอป (LINE / Facebook / Instagram / TikTok ฯลฯ) ซึ่ง Google ไม่อนุญาตให้ล็อกอิน */
const detectInAppBrowser = (): 'line' | 'other' | null => {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';
  if (/\bLine\//i.test(ua)) return 'line';
  if (/FBAN|FBAV|FB_IAB|Instagram|Messenger|musical_ly|BytedanceWebview|TikTok|Twitter|Snapchat|KAKAOTALK/i.test(ua)) return 'other';
  return null;
};

/** แปลงข้อผิดพลาดจาก Firebase เป็นข้อความภาษาไทยที่ผู้ใช้เข้าใจได้ */
const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/network-request-failed':
      return 'ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่อีกครั้ง';
    case 'auth/too-many-requests':
      return 'มีการพยายามเข้าสู่ระบบหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่';
    case 'auth/unauthorized-domain':
      return 'โดเมนนี้ยังไม่ได้รับอนุญาตให้เข้าสู่ระบบ กรุณาติดต่อผู้ดูแลเว็บไซต์';
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/web-storage-unsupported':
      return 'เบราว์เซอร์นี้ไม่รองรับการเข้าสู่ระบบ กรุณาเปิดเว็บไซต์ด้วย Chrome หรือ Safari';
    case 'auth/user-disabled':
      return 'บัญชีนี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลเว็บไซต์';
    default:
      return 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง';
  }
};

export default function LoginModal() {
  const isLoginModalOpen = useCartStore((s) => s.isLoginModalOpen);
  const closeLoginModal = useCartStore((s) => s.closeLoginModal);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inApp, setInApp] = useState<'line' | 'other' | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInApp(detectInAppBrowser());
  }, []);

  // ล้างข้อความแจ้งเตือนทุกครั้งที่เปิดหน้าต่างใหม่ + ปิดด้วยปุ่ม Esc
  useEffect(() => {
    if (!isLoginModalOpen) return;
    setError('');
    setCopied(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLoginModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // User state is handled globally (AuthProvider), so just close modal
      closeLoginModal();
    } catch (err: any) {
      const code: string = err?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // ผู้ใช้ปิดหน้าต่างเอง ไม่ใช่ข้อผิดพลาด
      } else if (code === 'auth/popup-blocked') {
        // เบราว์เซอร์บล็อกป๊อปอัป -> ใช้การ redirect แทน
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          console.error(redirectErr);
          setError(getErrorMessage(redirectErr?.code || ''));
        }
      } else {
        console.error(err);
        setError(getErrorMessage(code));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openInExternalBrowser = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('openExternalBrowser', '1');
    window.location.href = url.toString();
  };

  const copyLink = async () => {
    const url = window.location.href.split('?')[0];
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt('คัดลอกลิงก์นี้ไปเปิดใน Chrome หรือ Safari', url);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={closeLoginModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col items-center p-8 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button onClick={closeLoginModal} aria-label="ปิด" className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-100 hover:bg-stone-200 rounded-full">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
           <svg className="w-8 h-8 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>

        <h3 className="text-2xl font-serif italic font-medium text-stone-900 mb-2">Welcome Back</h3>
        <p className="text-sm text-stone-500 mb-8 font-sans tracking-wide">เข้าสู่ระบบเพื่อบันทึกตะกร้าสินค้าของคุณข้ามอุปกรณ์</p>

        {inApp && (
          <div className="w-full text-left bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
            <p className="text-sm font-bold text-amber-800 mb-1">กรุณาเปิดด้วย Chrome หรือ Safari</p>
            <p className="text-xs text-amber-700 leading-relaxed mb-3">
              Google ไม่อนุญาตให้เข้าสู่ระบบผ่านเบราว์เซอร์ในแอป (เช่น LINE, Facebook, Instagram) กรุณาเปิดเว็บไซต์ในเบราว์เซอร์ของเครื่องก่อนเข้าสู่ระบบ
            </p>
            {inApp === 'line' ? (
              <button onClick={openInExternalBrowser} className="w-full bg-[#06C755] hover:bg-[#05b14c] text-white text-sm font-bold py-2.5 rounded-full transition-colors">
                เปิดในเบราว์เซอร์
              </button>
            ) : (
              <button onClick={copyLink} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold py-2.5 rounded-full transition-colors">
                {copied ? 'คัดลอกลิงก์แล้ว ✓' : 'คัดลอกลิงก์เว็บไซต์'}
              </button>
            )}
          </div>
        )}

        {error && <p className="text-xs text-red-500 mb-4 leading-relaxed">{error}</p>}

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
