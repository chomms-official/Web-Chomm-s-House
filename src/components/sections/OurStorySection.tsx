import { BASE } from '@/lib/constants';

export default function OurStorySection() {
  return (
    <section id="our-story" className="scroll-mt-[72px] lg:scroll-mt-[88px] w-full bg-white">

      {/* 1. Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-[#ece9e4] flex items-center justify-center overflow-hidden">
        <img src={`${BASE}/images/hero-sachets.png`} className="absolute inset-0 w-full h-full object-cover" alt="Chomm's House ถุงหอมแว็กซ์ทำมือ" />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <p className="text-white font-sans tracking-[0.3em] text-sm md:text-base font-medium">โอมเฮาส์</p>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif italic text-white drop-shadow-md">
            Chomm&apos;s
            <br />
            <span className="flex items-center justify-center space-x-3 md:space-x-4 mt-4 text-4xl md:text-6xl font-serif italic font-medium">
              <span>H</span>
              <img
                src={`${BASE}/images/logo-120.png`}
                alt="Chomm's House Logo"
                className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-white/40"
                width={64}
                height={64}
              />
              <span>USE</span>
            </span>
          </h1>
          
          <p className="mt-8 text-white italic font-serif text-lg md:text-xl font-light tracking-wide pt-4">
            Where the scent, Carry the Story
          </p>
        </div>
      </div>

      {/* 2. Our Story Content */}
      <div className="w-full bg-white py-16 md:py-24 px-5">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-serif italic text-[#3b3228] mb-4">Our Story</h2>
            <p className="text-stone-500 font-sans tracking-wide font-medium">| จุดเริ่มต้นของพวกเรา และชุมชน |</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full mb-16">
            <div className="w-full aspect-[4/3] bg-stone-100 rounded-lg flex items-end relative overflow-hidden shadow-sm">
               <img src={`${BASE}/images/community-canal.png`} className="absolute inset-0 w-full h-full object-cover" alt="บ้านไม้ชายคลอง ชุมชนพูนบำเพ็ญ" />
               <div className="relative z-10 w-full text-right p-4 bg-gradient-to-t from-black/60 to-transparent pt-12">
                 <span className="text-white text-sm font-medium">@บ้านไม้ชายคลอง ชุมชนพูนบำเพ็ญ</span>
               </div>
            </div>
            
            <div className="text-[#3b3228] font-sans font-light leading-relaxed space-y-4 md:text-lg">
              <p>
                ในยุคที่ยุงซึ่งเป็นพาหะนำโรคไข้เลือดออกยังคงเป็นภัยเงียบที่คร่าชีวิตและสร้างความเจ็บป่วยให้คนไทยหลายแสนคน โดยเฉพาะในพื้นที่เมืองที่มีน้ำขังและสภาพแวดล้อมที่เอื้อต่อการเพาะพันธุ์ ผลิตภัณฑ์ไล่ยุงที่มีอยู่ในท้องตลาดยังคงมีข้อจำกัด ทั้งพกพาไม่สะดวก มีกลิ่นฉุนรุนแรง หรือมีส่วนผสมของสารเคมีที่สร้างความกังวลให้กับผู้บริโภคที่ใส่ใจสุขภาพในปัจจุบัน
              </p>
            </div>
          </div>
          
          <div className="text-center max-w-3xl space-y-6">
            <p className="text-stone-600 font-sans text-lg">แต่จะเป็นอย่างไร หากเราสามารถเปลี่ยนผลิตภัณฑ์ไล่ยุงให้กลายเป็น</p>
            <h3 className="text-2xl md:text-4xl font-bold text-[#3b3228] font-sans leading-tight">เครื่องประดับ/ของตกแต่งที่สวยงาม <br className="hidden md:block" />ปลอดภัยด้วยสมุนไพรธรรมชาติ</h3>
            <p className="text-stone-500 font-sans md:text-lg">สามารถไล่ยุงได้อย่างมีประสิทธิภาพ โดยไม่ต้องยุ่งยากกับการพกสเปรย์หรือโลชั่น</p>
          </div>
        </div>
      </div>

      {/* 3. Collaboration */}
      <div className="w-full bg-[#fcfbf9] py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-[#3b3228] mb-4">Collaboration</h2>
            <p className="text-stone-500 font-sans tracking-wide font-medium">ความร่วมมือกับ 3 ชุมชนในเขตภาษีเจริญ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full px-4">
            {/* Col 1 */}
            <div className="flex flex-col items-center group">
              <div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src={`${BASE}/images/collab-1.jpg`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนเลิศสุขสม" />
              </div>
              <div className="bg-white text-[#3b3228] px-8 py-2.5 rounded-full font-bold shadow-md -mt-12 relative z-10 border border-stone-100 text-lg">ชุมชนเลิศสุขสม</div>
              <div className="bg-[#3b3228] text-white px-6 py-1.5 rounded-full text-sm mt-3 shadow-sm font-medium">794 คน | ผู้จัดหาสมุนไพร</div>
            </div>
            
            {/* Col 2 */}
            <div className="flex flex-col items-center group">
              <div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src={`${BASE}/images/collab-2.jpg`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนศิรินทร์ และเพื่อน" />
              </div>
              <div className="bg-white text-[#3b3228] px-8 py-2.5 rounded-full font-bold shadow-md -mt-12 relative z-10 border border-stone-100 text-lg">ชุมชนศิรินทร์ และเพื่อน</div>
              <div className="bg-[#3b3228] text-white px-6 py-1.5 rounded-full text-sm mt-3 shadow-sm font-medium">611 คน | ผู้ช่วยผลิต</div>
            </div>
            
            {/* Col 3 */}
            <div className="flex flex-col items-center group">
              <div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src={`${BASE}/images/collab-3.jpg`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนพูนบำเพ็ญ" />
              </div>
              <div className="bg-white text-[#3b3228] px-8 py-2.5 rounded-full font-bold shadow-md -mt-12 relative z-10 border border-stone-100 text-lg">ชุมชนพูนบำเพ็ญ</div>
              <div className="bg-[#3b3228] text-white px-6 py-1.5 rounded-full text-sm mt-3 shadow-sm font-medium">739 คน | Upcycle &amp; จำหน่าย</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Our Product */}
      <div className="w-full bg-white py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start">
          
          <div className="w-full md:w-1/2 flex flex-col gap-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif italic text-[#3b3228] mb-2">Our Product</h2>
              <p className="text-stone-500 font-sans tracking-wide mb-8 font-medium">รายละเอียดสินค้า</p>
              
              <h3 className="text-xl font-bold text-[#3b3228] mb-4 font-sans">ตัวเลือกสี</h3>
              <div className="grid grid-cols-4 gap-3">
                 <div className="bg-[#f8f7f5] rounded-xl p-4 flex flex-col items-center justify-center aspect-square gap-3 shadow-sm border border-stone-100">
                    <div className="w-16 h-16 flex items-center justify-center"><img src={`${BASE}/images/color-white.png`} loading="lazy" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="สีธรรมชาติ" /></div>
                    <span className="text-xs text-[#3b3228] font-medium">สีธรรมชาติ</span>
                 </div>
                 <div className="bg-[#f8f7f5] rounded-xl p-4 flex flex-col items-center justify-center aspect-square gap-3 shadow-sm border border-stone-100">
                    <div className="w-16 h-16 flex items-center justify-center"><img src={`${BASE}/images/color-lightgreen.png`} loading="lazy" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="สีใบเตย" /></div>
                    <span className="text-xs text-[#3b3228] font-medium">ใบเตย</span>
                 </div>
                 <div className="bg-[#f8f7f5] rounded-xl p-4 flex flex-col items-center justify-center aspect-square gap-3 shadow-sm border border-stone-100">
                    <div className="w-16 h-16 flex items-center justify-center"><img src={`${BASE}/images/color-lime.png`} loading="lazy" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="สีขมิ้น" /></div>
                    <span className="text-xs text-[#3b3228] font-medium">ขมิ้น</span>
                 </div>
                 <div className="bg-[#f8f7f5] rounded-xl p-4 flex flex-col items-center justify-center aspect-square gap-3 shadow-sm border border-stone-100">
                    <div className="w-16 h-16 flex items-center justify-center"><img src={`${BASE}/images/color-charcoal.png`} loading="lazy" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="สีผงถ่าน" /></div>
                    <span className="text-xs text-[#3b3228] font-medium">ผงถ่าน</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#3b3228] mb-6 font-sans">ตัวเลือกกลิ่น</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4">
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-7 h-7 bg-[#eb4d70] text-white rounded-full flex items-center justify-center text-sm font-bold mb-1 shadow-sm">1</div>
                  <h4 className="font-serif italic text-2xl text-[#eb4d70] leading-none font-medium">Premium<br/>Floral</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                     <span className="bg-[#ffe4eb] text-[#eb4d70] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Elegant</span>
                     <span className="bg-[#ffe4eb] text-[#eb4d70] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Warm</span>
                     <span className="bg-[#ffe4eb] text-[#eb4d70] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Sophisticated</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-7 h-7 bg-[#f39c12] text-white rounded-full flex items-center justify-center text-sm font-bold mb-1 shadow-sm">2</div>
                  <h4 className="font-serif italic text-2xl text-[#f39c12] leading-none font-medium">Fresh<br/>Citrus</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                     <span className="bg-[#fdf3e1] text-[#f39c12] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Fresh</span>
                     <span className="bg-[#fdf3e1] text-[#f39c12] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Bright</span>
                     <span className="bg-[#fdf3e1] text-[#f39c12] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Outdoor</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-7 h-7 bg-[#16a085] text-white rounded-full flex items-center justify-center text-sm font-bold mb-1 shadow-sm">3</div>
                  <h4 className="font-serif italic text-2xl text-[#16a085] leading-none font-medium">Ice<br/>Mint</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                     <span className="bg-[#e2f5f1] text-[#16a085] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Fresh</span>
                     <span className="bg-[#e2f5f1] text-[#16a085] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Cool</span>
                     <span className="bg-[#e2f5f1] text-[#16a085] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Invigorating</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-7 h-7 bg-[#7cb342] text-white rounded-full flex items-center justify-center text-sm font-bold mb-1 shadow-sm">4</div>
                  <h4 className="font-serif italic text-2xl text-[#7cb342] leading-none font-medium">Eucalyptus<br/>Bouquet</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                     <span className="bg-[#f1f8e9] text-[#7cb342] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Fresh</span>
                     <span className="bg-[#f1f8e9] text-[#7cb342] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Calm</span>
                     <span className="bg-[#f1f8e9] text-[#7cb342] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Balanced</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-7 h-7 bg-[#6d4c41] text-white rounded-full flex items-center justify-center text-sm font-bold mb-1 shadow-sm">5</div>
                  <h4 className="font-serif italic text-2xl text-[#6d4c41] leading-none font-medium">Coffee &amp;<br/>Cream</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                     <span className="bg-[#efebe9] text-[#6d4c41] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Sweet</span>
                     <span className="bg-[#efebe9] text-[#6d4c41] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Warm</span>
                     <span className="bg-[#efebe9] text-[#6d4c41] text-[10px] px-2.5 py-0.5 rounded-full font-medium">Comfy</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
            <div className="w-[80%] md:w-[70%] flex items-center justify-center relative">
               <img src={`${BASE}/images/big-lime-tag.png`} loading="lazy" className="w-full h-auto object-contain mix-blend-multiply" alt="Aroma Wax Sachet สีขมิ้น" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
