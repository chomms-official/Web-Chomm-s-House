import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The img tag ends with:
#                className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
#                
#              />
# We will inject the text div right after the <img /> tag inside the container.

img_tag = """              <img 
                src={currentImages[activeIndex]} 
                alt="Product Main" 
                className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                
              />"""

text_div = """
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 pointer-events-none">
                <span className="text-[10px] md:text-xs text-stone-500/70 font-medium tracking-wide">
                  ภาพนี้เป็นเพียงภาพประกอบสินค้าเท่านั้น
                </span>
              </div>"""

content = content.replace(img_tag, img_tag + text_div)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added text to main image")
