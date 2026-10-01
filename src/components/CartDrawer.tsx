'use client';

import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity" 
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-xl font-serif font-medium text-stone-900">ตะกร้าสินค้า ({items.length})</h2>
          <button onClick={toggleCart} className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
               <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
               <p className="font-medium">ตะกร้าของคุณยังว่างเปล่า</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                   <img src={item.image} alt="Product" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-stone-900">Wax Sachet ({item.color})</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">ขนาด: {item.size} | กลิ่น: {item.scent}</p>
                    <p className="text-xs text-stone-500">แพ็คเกจ: {item.packaging} {item.addon ? '+ โลโก้' : ''}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded-full bg-white px-2 py-0.5">
                       <button onClick={() => updateQuantity(item.id, -1)} className="text-stone-400 hover:text-stone-900 p-1 font-bold disabled:opacity-30" disabled={item.quantity <= 1}>-</button>
                       <span className="text-xs font-bold text-stone-900 px-3 w-8 text-center">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, 1)} className="text-stone-400 hover:text-stone-900 p-1 font-bold">+</button>
                    </div>
                    <span className="font-bold text-stone-900">฿ {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-100">
             <div className="flex justify-between items-center mb-4">
                <span className="text-stone-500 font-medium text-sm">ยอดสุทธิ</span>
                <span className="text-xl font-bold text-stone-900">฿ {totalPrice}</span>
             </div>
             <button onClick={useCartStore.getState().toggleCheckoutModal} className="w-full bg-[#4a3f35] hover:bg-[#3b3228] text-white py-4 rounded-full font-bold text-sm tracking-wide transition-colors">
                ดำเนินการชำระเงิน
             </button>
          </div>
        )}
      </div>
    </>
  );
}
