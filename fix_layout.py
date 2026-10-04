import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\layout.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('antialiased h-full"', 'antialiased bg-white"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed layout")
