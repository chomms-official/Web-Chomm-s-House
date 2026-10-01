import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface CartItem {
  id: string; // Unique ID for this specific variation in cart
  color: string;
  size: string;
  scent: string;
  packaging: string;
  addon: boolean;
  price: number;
  quantity: number;
  image: string; // URL to the preview image
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  user: any | null; 
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleLoginModal: () => void;
  toggleCheckoutModal: () => void;
  setUser: (user: any) => void;
  loadCartFromFirebase: (userId: string) => Promise<void>;
  setItems: (items: CartItem[]) => void;
}

const syncToFirebase = async (userId: string | null, items: CartItem[]) => {
  if (!userId) return;
  try {
    await setDoc(doc(db, 'carts', userId), { items });
  } catch (error) {
    console.error("Error syncing cart to Firebase:", error);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isLoginModalOpen: false,
      isCheckoutModalOpen: false,
      user: null,

      setItems: (items) => {
        set({ items });
        syncToFirebase(get().user?.uid, items);
      },

      addToCart: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.color === newItem.color && 
                   i.size === newItem.size && 
                   i.scent === newItem.scent && 
                   i.packaging === newItem.packaging &&
                   i.addon === newItem.addon
          );

          let newItems;
          if (existingItemIndex >= 0) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += newItem.quantity;
          } else {
            const id = Math.random().toString(36).substring(7);
            newItems = [...state.items, { ...newItem, id }];
          }
          
          syncToFirebase(state.user?.uid, newItems);
          return { items: newItems, isCartOpen: true };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          syncToFirebase(state.user?.uid, newItems);
          return { items: newItems };
        });
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const newItems = state.items.map((i) => {
            if (i.id === id) {
              const newQuantity = Math.max(1, i.quantity + delta);
              return { ...i, quantity: newQuantity };
            }
            return i;
          });
          syncToFirebase(state.user?.uid, newItems);
          return { items: newItems };
        });
      },

      clearCart: () => {
        set((state) => {
          syncToFirebase(state.user?.uid, []);
          return { items: [] };
        });
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
      toggleCheckoutModal: () => set((state) => ({ isCheckoutModalOpen: !state.isCheckoutModalOpen, isCartOpen: false })), // Close cart when opening checkout
      
      setUser: (user) => set({ user }),

      loadCartFromFirebase: async (userId) => {
        try {
          const docRef = doc(db, 'carts', userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const serverItems = docSnap.data().items as CartItem[];
            // Optionally merge with local items, but for now we'll just use server items
            // If local items exist, we could merge them here and then sync back up.
            // Let's do a simple merge: 
            const localItems = get().items;
            if (serverItems.length > 0) {
                set({ items: serverItems });
            } else if (localItems.length > 0) {
                // If server is empty but local has items, save local to server
                syncToFirebase(userId, localItems);
            }
          } else {
            // New user, save any local items to server
            syncToFirebase(userId, get().items);
          }
        } catch (error) {
          console.error("Error loading cart from Firebase:", error);
        }
      }
    }),
    {
      name: 'chomms-cart-storage',
      partialize: (state) => ({ items: state.items }), 
    }
  )
);
