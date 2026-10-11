'use client';

import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function HeaderActions() {
  const items = useCartStore((s) => s.items);
  const user = useCartStore((s) => s.user);
  const authReady = useCartStore((s) => s.authReady);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const openLoginModal = useCartStore((s) => s.openLoginModal);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // ปิดเมนูผู้ใช้เมื่อคลิกด้านนอก หรือกด Esc (ของเดิมเปิดด้วย hover ทำให้กดบนมือถือไม่ได้)
  useEffect(() => {
    if (!isMenuOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      // ล้างเฉพาะข้อมูลในเครื่อง — ตะกร้าที่บันทึกไว้บนเซิร์ฟเวอร์ยังอยู่ครบ
      // (ของเดิมเรียก clearCart() ซึ่งเขียนตะกร้าว่างทับข้อมูลบนเซิร์ฟเวอร์ของผู้ใช้)
      useCartStore.getState().resetLocalSession();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
      alert('ออกจากระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'บัญชีของฉัน';
  const avatar = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'U')}&background=dce495&color=3b3228`;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Login / User Button */}
      {!authReady ? (
        // กำลังตรวจสอบสถานะล็อกอิน (กันปุ่มกระพริบ)
        <div className="w-9 h-9 sm:w-28 rounded-full bg-white/10 animate-pulse" aria-hidden="true" />
      ) : user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full pl-1 pr-1 sm:pr-3 py-1 bg-white/10 hover:bg-white/20 ring-1 ring-white/20 transition-colors"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
          >
            <img src={avatar} alt="รูปโปรไฟล์" referrerPolicy="no-referrer" className="w-7 h-7 rounded-full object-cover bg-white/20" />
            <span className="hidden sm:inline max-w-[110px] truncate text-xs font-bold tracking-wider text-white">{firstName}</span>
            <svg className={`hidden sm:block w-3.5 h-3.5 text-white/70 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>

          {isMenuOpen && (
            <div role="menu" className="absolute right-0 top-full mt-3 w-60 bg-white border border-stone-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="px-4 py-3 border-b border-stone-100">
                <p className="text-sm font-bold text-stone-900 truncate">{user.displayName || firstName}</p>
                {user.email && <p className="text-xs text-stone-500 truncate">{user.email}</p>}
              </div>
              <button
                onClick={() => { setIsMenuOpen(false); toggleCart(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                ตะกร้าสินค้าของฉัน {cartItemCount > 0 && <span className="text-stone-400">({cartItemCount})</span>}
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 border-t border-stone-100"
              >
                {isLoggingOut ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={openLoginModal}
          className="flex items-center gap-2 rounded-full px-2.5 sm:px-4 py-2 bg-white text-[#3b3228] hover:bg-[#dce495] shadow-sm transition-colors"
          aria-label="เข้าสู่ระบบ"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span className="hidden sm:inline text-xs font-bold tracking-wider">เข้าสู่ระบบ</span>
        </button>
      )}

      {/* Cart Button */}
      <button onClick={toggleCart} aria-label="ตะกร้าสินค้า" className="relative cursor-pointer text-white/85 hover:text-white transition-colors p-2 -mr-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        {cartItemCount > 0 && (
          <span className="absolute top-0.5 right-0.5 bg-[#dce495] text-[#3b3228] text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
}
