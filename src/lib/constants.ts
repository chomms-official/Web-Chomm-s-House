/** basePath ของเว็บบน GitHub Pages (ต้องตรงกับ next.config.ts) */
export const BASE = '/Web-Chomm-s-House';

/** ลำดับส่วนต่าง ๆ ในหน้าเดียว (เรียงตามที่แสดงจริงบนหน้าเว็บ) */
export const SECTIONS = [
  { id: 'our-story', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'shop', label: 'Shop' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
