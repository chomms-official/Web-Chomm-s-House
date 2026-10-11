import Navbar from '@/components/Navbar';
import OurStorySection from '@/components/sections/OurStorySection';
import GallerySection from '@/components/sections/GallerySection';
import ShopSection from '@/components/sections/ShopSection';
import WorkshopSection from '@/components/sections/WorkshopSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-stone-200">
      {/* แถบเมนูด้านบน (fixed อยู่กับที่ ไม่หายไปเมื่อเลื่อนจอลง พร้อมปุ่ม Login และ Cart) */}
      <Navbar />

      {/* ลำดับส่วนตามที่ผู้ใช้กำหนด: Our Story → Gallery → Shop → Workshop → Contact */}
      <main className="flex-1 flex flex-col w-full">
        <OurStorySection />
        <GallerySection />
        <ShopSection />
        <WorkshopSection />
      </main>

      {/* ส่วน Contact และ Footer ด้านล่างสุด */}
      <Footer />
    </div>
  );
}
