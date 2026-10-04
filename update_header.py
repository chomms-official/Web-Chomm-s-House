import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\HeaderActions.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('hover:text-stone-900', 'hover:text-[#3b3228]')
content = content.replace('bg-stone-900', 'bg-[#3b3228]')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HeaderActions styles")
