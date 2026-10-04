'use client';
import { useState } from 'react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <footer className="w-full bg-[#3b3228] pt-16 pb-8 flex flex-col items-center justify-center mt-auto z-10 relative">
        <div className="flex items-center space-x-3 mb-6 cursor-pointer">
          <span className="font-serif italic text-4xl text-white tracking-wide">Chomm&apos;s House</span>
        </div>

        <p className="font-serif italic text-white/90 text-xl tracking-wide mb-12">Where the scent, Carry the Story</p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-sm text-white/80 font-medium mb-12 items-center text-center">
          <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</button>
          <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">เงื่อนไขการบริการ</button>
          <button onClick={() => setActiveModal('faq')} className="hover:text-white transition-colors">คำถามที่พบบ่อย (FAQ)</button>
        </div>

        <div className="w-full max-w-4xl border-t border-white/10 pt-8 flex justify-center">
          <p className="text-xs text-white/50 font-sans tracking-wide">&copy; 2026 Chomm&apos;s House, All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
          <div 
            className="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-[#3b3228] hover:bg-stone-100 p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {activeModal === 'privacy' && (
              <div className="text-stone-600 font-sans">
                <h2 className="text-3xl font-bold text-[#3b3228] mb-6 tracking-tight">นโยบายความเป็นส่วนตัว<br/><span className="text-xl text-[#3b3228]/70">(Privacy Policy)</span></h2>
                <div className="space-y-4 text-base leading-relaxed">
                  <p>เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของคุณ ข้อมูลที่ท่านให้ผ่านเว็บไซต์แห่งนี้ จะถูกนำไปใช้เพื่อการประมวลผลคำสั่งซื้อสินค้า การจัดส่งสินค้า และการติดต่อสื่อสารเกี่ยวกับสินค้าและบริการของเราเท่านั้น</p>
                  <p>เราไม่มีนโยบายการขายหรือเปิดเผยข้อมูลของลูกค้าให้แก่บุคคลที่สาม เว้นแต่จะเป็นไปตามข้อกำหนดของกฎหมาย</p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="text-stone-600 font-sans">
                <h2 className="text-3xl font-bold text-[#3b3228] mb-6 tracking-tight">เงื่อนไขการบริการ<br/><span className="text-xl text-[#3b3228]/70">(Terms of Service)</span></h2>
                <div className="space-y-6 text-base leading-relaxed">
                  <p>การเข้าใช้งานเว็บไซต์และการสั่งซื้อสินค้าผ่านเว็บไซต์ และช่องทางการสั่งซื้อสินค้าอื่น ๆ ถือว่าท่านได้ยอมรับข้อตกลงและเงื่อนไขของเรา</p>
                  
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                    <h3 className="font-bold text-[#3b3228] text-lg mb-2">การจัดส่งสินค้า</h3>
                    <p>สินค้าจะถูกจัดส่งภายใน 1-3 วันทำการ หลังจากได้รับการยืนยันการชำระเงิน หากสินค้าเกิดความเสียหายระหว่างการขนส่ง ท่านสามารถขอเปลี่ยนสินค้าได้ภายใน 7 วัน</p>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                    <h3 className="font-bold text-[#3b3228] text-lg mb-2">การรับประกันสินค้า</h3>
                    <p>หากพบว่าสินค้าไม่ได้มาตรฐาน หรือเกิดความเสียหาย ทางเรายินดีเปลี่ยนสินค้าหรือคืนเงินเต็มจำนวนภายใน 7 วันนับจากวันที่ได้รับสินค้า</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'faq' && (
              <div className="text-stone-600 font-sans">
                <h2 className="text-3xl font-bold text-[#3b3228] mb-6 tracking-tight">คำถามที่พบบ่อย<br/><span className="text-xl text-[#3b3228]/70">(FAQ)</span></h2>
                <div className="space-y-6 text-base leading-relaxed">
                  <div className="border-b border-stone-100 pb-5">
                    <h3 className="font-bold text-[#3b3228] text-lg mb-2 flex items-center">
                       <span className="w-2 h-2 rounded-full bg-[#3b3228] mr-3"></span>
                       ถุงหอม Chomm's House ใช้งานได้นานแค่ไหน?
                    </h3>
                    <p className="pl-5 text-stone-500">ความหอมจะอยู่ได้ประมาณ 1-2 เดือน ขึ้นอยู่กับขนาดของห้องและอุณหภูมิ หากกลิ่นเริ่มจางลง สามารถใช้ประดับตกแต่งสถานที่ต่อได้ครับ</p>
                  </div>

                  <div className="border-b border-stone-100 pb-5">
                    <h3 className="font-bold text-[#3b3228] text-lg mb-2 flex items-center">
                       <span className="w-2 h-2 rounded-full bg-[#3b3228] mr-3"></span>
                       สามารถออกแบบกลิ่นหรือสีเองได้หรือไม่?
                    </h3>
                    <p className="pl-5 text-stone-500">ได้แน่นอนครับ! คุณสามารถเข้าร่วม Workshop ของเราเพื่อออกแบบถุงหอมในสไตล์ของคุณเอง หรือหากต้องการสั่งซื้อจำนวนมากสำหรับเป็นของชำร่วย สามารถติดต่อเราเพื่อออกแบบพิเศษได้</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
