import os
import re
import random

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\gallery\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Generate new GALLERY_ITEMS
ratios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[5/4]']
items = []

for i in range(1, 40):
    if i <= 12:
        cat = 'gift'
    elif i <= 24:
        cat = 'sachet'
    else:
        cat = 'accessory'
    
    ratio = random.choice(ratios)
    items.append(f"  {{ id: {i}, src: `${{BASE}}/images/gallery/g{i}.webp`, alt: 'Gallery Image {i}', category: '{cat}', ratio: '{ratio}' }},")

items_str = "const GALLERY_ITEMS: GalleryItem[] = [\n" + "\n".join(items) + "\n];"

# Replace the old GALLERY_ITEMS array
content = re.sub(r'const GALLERY_ITEMS: GalleryItem\[\] = \[.*?\];', items_str, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated gallery items")
