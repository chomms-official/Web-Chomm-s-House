'use client';

import { useCartStore } from '../store/cartStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function HeaderActions() {
  const { items, toggleCart, toggleLoginModal, user, clearCart } = useCartStore();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearCart(); // Clear cart state on logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Login / User Button */}
      {user ? (
        <div className="hidden sm:flex items-center space-x-3 group relative">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} alt="User avatar" className="w-6 h-6 rounded-full" />
            <span className="text-xs font-bold tracking-wider text-white/90">{user.displayName?.split(' ')[0]}</span>
          </div>
          
          {/* Dropdown for Logout */}
          <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-stone-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-50 rounded-xl transition-colors">
              ออกจากระบบ
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleLoginModal} 
          className="hidden sm:flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span className="text-xs font-bold tracking-wider">LOGIN</span>
        </button>
      )}

      {/* Cart Button */}
      <div onClick={toggleCart} className="relative cursor-pointer text-white/80 hover:text-white transition-colors p-2 -mr-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        {cartItemCount > 0 && (
          <span className="absolute top-1 right-1 bg-white text-[#3b3228] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </div>
    </div>
  );
}
