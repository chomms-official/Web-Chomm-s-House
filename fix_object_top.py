import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\workshop\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace object-cover with object-cover object-top for w8.webp
old_str_w8 = 'src="/Web-Chomm-s-House/images/workshop/w8.webp" alt="Workshop 8" loading="lazy" className="w-full h-full object-cover'
new_str_w8 = 'src="/Web-Chomm-s-House/images/workshop/w8.webp" alt="Workshop 8" loading="lazy" className="w-full h-full object-cover object-top'
content = content.replace(old_str_w8, new_str_w8)

# Also do it for w2 and w6 just in case they have faces near the top
old_str_w2 = 'src="/Web-Chomm-s-House/images/workshop/w2.webp" alt="Workshop 2" loading="lazy" className="w-full h-full object-cover'
new_str_w2 = 'src="/Web-Chomm-s-House/images/workshop/w2.webp" alt="Workshop 2" loading="lazy" className="w-full h-full object-cover object-top'
content = content.replace(old_str_w2, new_str_w2)

old_str_w6 = 'src="/Web-Chomm-s-House/images/workshop/w6.webp" alt="Workshop 6" loading="lazy" className="w-full h-full object-cover'
new_str_w6 = 'src="/Web-Chomm-s-House/images/workshop/w6.webp" alt="Workshop 6" loading="lazy" className="w-full h-full object-cover object-top'
content = content.replace(old_str_w6, new_str_w6)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated object-position")
