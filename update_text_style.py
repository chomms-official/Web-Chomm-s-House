import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-[10px] md:text-xs text-stone-500/80 font-medium tracking-wide drop-shadow-sm', 'text-[10px] md:text-xs text-stone-600 font-medium tracking-wide bg-white/40 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated text styling")
