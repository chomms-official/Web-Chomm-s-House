import os
import shutil
from PIL import Image

source_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\24.09.2026'
public_images = r'C:\Users\User\Documents\antigravity\web-chomms-house\public\images'
workshop_dir = os.path.join(public_images, 'workshop')
gallery_dir = os.path.join(public_images, 'gallery')

# We don't need to clear directories completely, we can overwrite.

# Replace 94 with 55 (wax making close up) to fix the white borders issue.
workshop_ids = [46, 57, 60, 89, 55, 98, 101, 117]
sachet_ids = [9, 10, 15, 21, 22, 23, 29, 31, 35, 37, 44, 52]
# Added 3 and 4 to make exactly 12 items for accessories (balanced for 3 cols)
accessory_ids = [1, 2, 3, 4, 47, 48, 62, 63, 64, 68, 69, 76]
# Added 84 to make exactly 9 items for gift (balanced for 3 cols)
gift_ids = [17, 18, 39, 79, 80, 82, 83, 84, 85]

gallery_mapping = []
gallery_lists = [('sachet', sachet_ids), ('accessory', accessory_ids), ('gift', gift_ids)]

def process_image(src_id, out_path, force_square=False):
    img_path = os.path.join(source_dir, f'{src_id}.png')
    with Image.open(img_path) as img:
        if img.mode in ('RGBA', 'P'): img = img.convert('RGB')
        if force_square:
            w, h = img.size
            s = min(w, h)
            left = (w - s)/2
            top = (h - s)/2
            right = (w + s)/2
            bottom = (h + s)/2
            img = img.crop((left, top, right, bottom))
        img.thumbnail((800, 800), Image.Resampling.LANCZOS)
        img.save(out_path, 'WEBP', quality=85)
        w, h = img.size
        ratio = 'aspect-square'
        if h > w * 1.1: ratio = 'aspect-[3/4]'
        elif w > h * 1.1: ratio = 'aspect-[4/3]'
        return ratio

# Process Workshop
for i, src_id in enumerate(workshop_ids):
    out_path = os.path.join(workshop_dir, f'w{i+1}.webp')
    # For workshop w5, let's force square to ensure no weird letterboxing just in case
    force = (i == 4) 
    process_image(src_id, out_path, force_square=force)

# Process Gallery
g_idx = 1
for cat, ids in gallery_lists:
    for src_id in ids:
        out_path = os.path.join(gallery_dir, f'g{g_idx}.webp')
        ratio = process_image(src_id, out_path)
        gallery_mapping.append((g_idx, cat, ratio))
        g_idx += 1

# Update gallery/page.tsx
file_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\gallery\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re
new_items = []
for i, cat, ratio in gallery_mapping:
    item_str = f"  {{ id: {i}, src: \${{BASE}}/images/gallery/g{i}.webp\, alt: 'ภาพตัวอย่างสินค้า {i}', category: '{cat}', ratio: '{ratio}' }},"
    new_items.append(item_str)

new_array_str = "const GALLERY_ITEMS: GalleryItem[] = [\n" + "\n".join(new_items) + "\n];"
pattern = re.compile(r'const GALLERY_ITEMS: GalleryItem\[\] = \[\s*.*?\s*\];', re.DOTALL)
new_content = pattern.sub(new_array_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Images and gallery/page.tsx updated successfully.")
