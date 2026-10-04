import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\Footer.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace pb-8 with pb-28 md:pb-8 to account for sticky bar on mobile
content = content.replace('pt-16 pb-8 flex flex-col', 'pt-16 pb-28 lg:pb-8 flex flex-col')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated footer mobile padding")
