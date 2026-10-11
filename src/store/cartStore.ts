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
  /** ดอกไม้ประดับ (optional เพื่อให้รองรับตะกร้าเดิมที่บันทึกไว้ก่อนมีฟิลด์นี้) */
  decoration?: string;
}

/**
 * เจ้าของตะกร้าที่เก็บไว้ในเครื่อง (localStorage)
 * - null      = ตะกร้าของผู้เยี่ยมชม (ยังไม่ล็อกอิน)
 * - 'legacy'  = ตะกร้าที่บันทึกไว้ก่อนอัปเดตระบบ (ใช้ตรรกะเดิมเพื่อความปลอดภัยของข้อมูล)
 * - uid       = ตะกร้านี้เป็นสำเนาของผู้ใช้คนนั้น
 */
type CartOwner = string | null;

interface CartState {
  items: CartItem[];
  cartOwner: CartOwner;
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  user: any | null;
  /** true เมื่อ Firebase ตรวจสอบสถานะล็อกอินครั้งแรกเสร็จแล้ว */
  authReady: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleLoginModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleCheckoutModal: () => void;
  setUser: (user: any) => void;
  setAuthReady: (ready: boolean) => void;
  loadCartFromFirebase: (userId: string) => Promise<void>;
  setItems: (items: CartItem[]) => void;
  /** ล้างข้อมูลในเครื่องตอนออกจากระบบ โดย "ไม่" แตะตะกร้าที่บันทึกไว้บนเซิร์ฟเวอร์ */
  resetLocalSession: () => void;
}

const syncToFirebase = async (userId: string | null | undefined, items: CartItem[]) => {
  if (!userId) return;
  try {
    await setDoc(doc(db, 'carts', userId), { items });
  } catch (error) {
    console.error("Error syncing cart to Firebase:", error);
  }
};

/** คีย์สำหรับระบุว่าเป็นสินค้าตัวเลือกเดียวกันหรือไม่ */
const variantKey = (i: Pick<CartItem, 'color' | 'size' | 'scent' | 'packaging' | 'addon' | 'decoration'>) =>
  [i.color, i.size, i.scent, i.packaging, i.addon ? '1' : '0', i.decoration || ''].join('|');

const newId = () => Math.random().toString(36).substring(2, 9);

/** รวมตะกร้าผู้เยี่ยมชมเข้ากับตะกร้าบนเซิร์ฟเวอร์ (ตัวเลือกเดียวกัน = บวกจำนวน) */
const mergeCarts = (serverItems: CartItem[], guestItems: CartItem[]): CartItem[] => {
  const merged = serverItems.map((i) => ({ ...i }));
  for (const g of guestItems) {
    const idx = merged.findIndex((m) => variantKey(m) === variantKey(g));
    if (idx >= 0) {
      merged[idx] = { ...merged[idx], quantity: merged[idx].quantity + g.quantity };
    } else {
      const idTaken = merged.some((m) => m.id === g.id);
      merged.push({ ...g, id: idTaken ? newId() : g.id });
    }
  }
  return merged;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartOwner: null,
      isCartOpen: false,
      isLoginModalOpen: false,
      isCheckoutModalOpen: false,
      user: null,
      authReady: false,

      setItems: (items) => {
        const uid = get().user?.uid;
        set(uid ? { items, cartOwner: uid } : { items });
        syncToFirebase(uid, items);
      },

      addToCart: (newItem) => {
        set((state) => {
          const key = variantKey(newItem);
          const existingItemIndex = state.items.findIndex((i) => variantKey(i) === key);

          let newItems: CartItem[];
          if (existingItemIndex >= 0) {
            // อัปเดตแบบ immutable (ของเดิมแก้ค่าในอ็อบเจกต์ตรง ๆ)
            newItems = state.items.map((i, idx) =>
              idx === existingItemIndex ? { ...i, quantity: i.quantity + newItem.quantity } : i
            );
          } else {
            newItems = [...state.items, { ...newItem, id: newId() }];
          }

          const uid = state.user?.uid;
          syncToFirebase(uid, newItems);
          return uid
            ? { items: newItems, isCartOpen: true, cartOwner: uid }
            : { items: newItems, isCartOpen: true };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          const uid = state.user?.uid;
          syncToFirebase(uid, newItems);
          return uid ? { items: newItems, cartOwner: uid } : { items: newItems };
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
          const uid = state.user?.uid;
          syncToFirebase(uid, newItems);
          return uid ? { items: newItems, cartOwner: uid } : { items: newItems };
        });
      },

      clearCart: () => {
        set((state) => {
          syncToFirebase(state.user?.uid, []);
          return { items: [] };
        });
      },

      resetLocalSession: () =>
        set({
          user: null,
          items: [],
          cartOwner: null,
          isCartOpen: false,
          isCheckoutModalOpen: false,
        }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
      openLoginModal: () => set({ isLoginModalOpen: true, isCartOpen: false }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),
      toggleCheckoutModal: () => set((state) => ({ isCheckoutModalOpen: !state.isCheckoutModalOpen, isCartOpen: false })), // Close cart when opening checkout

      setUser: (user) => set({ user }),
      setAuthReady: (ready) => set({ authReady: ready }),

      loadCartFromFirebase: async (userId) => {
        try {
          const docRef = doc(db, 'carts', userId);
          const docSnap = await getDoc(docRef);
          const serverItems: CartItem[] = docSnap.exists() ? ((docSnap.data().items as CartItem[]) || []) : [];

          // ผู้ใช้ออกจากระบบ/เปลี่ยนบัญชีไประหว่างโหลด -> ไม่ทำอะไร
          if (get().user?.uid !== userId) return;

          const { items: localItems, cartOwner } = get();

          if (cartOwner === null) {
            // ตะกร้าของผู้เยี่ยมชม -> รวมเข้ากับตะกร้าของบัญชี (ไม่ทิ้งของที่เลือกไว้)
            const merged = mergeCarts(serverItems, localItems);
            set({ items: merged, cartOwner: userId });
            if (localItems.length > 0 || !docSnap.exists()) {
              syncToFirebase(userId, merged);
            }
          } else if (cartOwner === userId || cartOwner === 'legacy') {
            // สำเนาของผู้ใช้คนเดิม -> ใช้ตรรกะเดิม: ใช้ของเซิร์ฟเวอร์ถ้ามี ไม่งั้นอัปโหลดของในเครื่อง
            if (serverItems.length > 0) {
              set({ items: serverItems, cartOwner: userId });
            } else {
              set({ cartOwner: userId });
              if (localItems.length > 0 || !docSnap.exists()) {
                syncToFirebase(userId, localItems);
              }
            }
          } else {
            // ตะกร้าในเครื่องเป็นของบัญชีอื่น (ยังเก็บอยู่บนเซิร์ฟเวอร์ของบัญชีนั้น) -> ใช้ของบัญชีนี้
            set({ items: serverItems, cartOwner: userId });
          }
        } catch (error) {
          console.error("Error loading cart from Firebase:", error);
        }
      }
    }),
    {
      name: 'chomms-cart-storage',
      version: 1,
      partialize: (state) => ({ items: state.items, cartOwner: state.cartOwner }),
      migrate: (persistedState: any, version) => {
        if (version === 0) {
          // ข้อมูลจากระบบเดิม: ไม่รู้ว่าเป็นของใคร -> ใช้ตรรกะเดิมเพื่อไม่ให้จำนวนสินค้าซ้ำซ้อน
          return { ...(persistedState || {}), cartOwner: 'legacy' };
        }
        return persistedState;
      },
    }
  )
);
