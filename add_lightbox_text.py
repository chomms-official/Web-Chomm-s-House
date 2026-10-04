import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The Lightbox img ends with:
#                 }}
#               />
#             </div>
#           </div>
#         )}
# I'll inject the text inside the Lightbox image container.
# Wait, the Lightbox container is:
#             <div 
#               className="relative w-full h-full p-4 md:p-12 flex items-center justify-center overflow-auto hide-scrollbar"
# ...
# I will append the text right after the <img ... />

pattern = r'(alt="Product Fullscreen"[\s\S]*?/>)'
replacement = r'\1\n              <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-10 pointer-events-none">\n                <span className="text-[10px] md:text-sm text-stone-300 font-medium tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-stone-800">\n                  ' + b'\u0e20\u0e32\u0e1e\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e20\u0e32\u0e1e\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19'.decode('unicode_escape') + r'\n                </span>\n              </div>'

new_content = re.sub(pattern, replacement, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Added text to Lightbox")
