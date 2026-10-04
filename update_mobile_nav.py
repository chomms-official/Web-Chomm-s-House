import os
import glob

pages = glob.glob(r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\**\page.tsx', recursive=True)

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Active mobile link
    content = content.replace(
        'className="block text-stone-900 font-medium"',
        'className="block text-[#3b3228] font-bold bg-[#3b3228]/5 px-3 py-2 rounded-lg"'
    )
    
    # Inactive mobile links
    content = content.replace(
        'className="block text-stone-500"',
        'className="block text-stone-500 hover:text-[#3b3228] hover:bg-stone-50 px-3 py-2 rounded-lg transition-colors"'
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated mobile menu styles")
