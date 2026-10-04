import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\gallery\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change masonry columns to css grid
content = content.replace('className="columns-2 md:columns-3 gap-3 md:gap-5"', 'className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"')
content = content.replace('className="break-inside-avoid mb-3 md:mb-5 group gallery-fade-in"', 'className="group gallery-fade-in"')

# 2. Change all items to aspect-[4/5] to unify heights
content = re.sub(r"ratio:\s*'aspect-[^']+'", "ratio: 'aspect-[4/5]'", content)
content = re.sub(r"ratio:\s*'aspect-square'", "ratio: 'aspect-[4/5]'", content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated gallery to CSS grid")
