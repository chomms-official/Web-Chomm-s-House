import random
import re

file_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\gallery\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

categories = ['gift', 'sachet', 'accessory']
ratios = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/3]']

new_items = []
for i in range(1, 41):
    cat = random.choice(categories)
    ratio = random.choice(ratios)
    item_str = f"  {{ id: {i}, src: ${{BASE}}/images/gallery/g{i}.webp, alt: 'ภาพตัวอย่างสินค้า {i}', category: '{cat}', ratio: '{ratio}' }},"
    new_items.append(item_str)

new_array_str = "const GALLERY_ITEMS: GalleryItem[] = [\n" + "\n".join(new_items) + "\n];"

# Find the start and end of GALLERY_ITEMS array and replace it
pattern = re.compile(r'const GALLERY_ITEMS: GalleryItem\[\] = \[\s*.*?\s*\];', re.DOTALL)
new_content = pattern.sub(new_array_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated gallery/page.tsx")
