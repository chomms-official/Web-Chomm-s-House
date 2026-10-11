'use client';

import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { useCartStore } from '../store/cartStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useCartStore((s) => s.setUser);
  const setAuthReady = useCartStore((s) => s.setAuthReady);
  const loadCartFromFirebase = useCartStore((s) => s.loadCartFromFirebase);

  useEffect(() => {
    // รองรับกรณีล็อกอินแบบ redirect (ใช้เป็นทางสำรองเมื่อเบราว์เซอร์บล็อกป๊อปอัป)
    getRedirectResult(auth).catch((err) => {
      console.error('Redirect sign-in error:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        const prevUid = useCartStore.getState().user?.uid;
        setUser(userData);
        // ปิดหน้าต่างล็อกอินอัตโนมัติเมื่อเข้าสู่ระบบสำเร็จ
        useCartStore.getState().closeLoginModal();
        // Load their cart from Firestore (เฉพาะเมื่อเปลี่ยนผู้ใช้ เพื่อไม่ให้โหลดซ้ำตอน token refresh)
        if (prevUid !== user.uid) {
          loadCartFromFirebase(user.uid);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [setUser, setAuthReady, loadCartFromFirebase]);

  return <>{children}</>;
}
