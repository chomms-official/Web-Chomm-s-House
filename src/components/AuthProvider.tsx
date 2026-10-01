'use client';

import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useCartStore } from '../store/cartStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, loadCartFromFirebase } = useCartStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        setUser(userData);
        // Load their cart from Firestore
        loadCartFromFirebase(user.uid);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, loadCartFromFirebase]);

  return <>{children}</>;
}
