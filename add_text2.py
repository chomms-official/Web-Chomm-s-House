import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(alt="Product Main"[\s\S]*?/>)'
replacement = r'\1\n              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 pointer-events-none">\n                <span className="text-[10px] md:text-xs text-stone-500/80 font-medium tracking-wide drop-shadow-sm">\n                  ภาพนี้เป็นเพียงภาพประกอบสินค้าเท่านั้น\n                </span>\n              </div>'

new_content = re.sub(pattern, replacement, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Added text via regex")
