import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the mojibake div
pattern = r'\n              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 pointer-events-none">\n                <span className="text-\[10px\] md:text-xs text-stone-500/80 font-medium tracking-wide drop-shadow-sm">\n                  \?+\n                </span>\n              </div>'
content = re.sub(pattern, '', content)

# Insert the correct text using unicode escape
pattern2 = r'(alt="Product Main"[\s\S]*?/>)'
replacement = r'\1\n              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 pointer-events-none">\n                <span className="text-[10px] md:text-xs text-stone-500/80 font-medium tracking-wide drop-shadow-sm">\n                  ' + b'\u0e20\u0e32\u0e1e\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e20\u0e32\u0e1e\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19'.decode('unicode_escape') + r'\n                </span>\n              </div>'

new_content = re.sub(pattern2, replacement, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed text")
