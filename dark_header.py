import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\HeaderActions.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-stone-700', 'text-white/90')
content = content.replace('text-stone-500 hover:text-[#3b3228]', 'text-white/80 hover:text-white')
content = content.replace('bg-[#3b3228] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white', 'bg-white text-[#3b3228] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HeaderActions for Dark Navbar")
