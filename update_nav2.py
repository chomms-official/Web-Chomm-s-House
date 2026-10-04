import os
import re
import glob

pages = glob.glob(r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\**\page.tsx', recursive=True)

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Nav wrapper
    content = re.sub(
        r'<nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-stone-200/60 shadow-\[0_8px_30px_-12px_rgba\(0,0,0,0\.08\)\] px-5 md:px-10 py-4 flex items-center justify-between transition-all">',
        r'<nav className="sticky top-0 z-40 bg-[#FCFAF8]/95 backdrop-blur-2xl border-b border-[#3b3228]/10 border-t-[5px] border-t-[#3b3228] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] px-5 md:px-10 py-5 md:py-6 flex items-center justify-between transition-all">',
        content
    )
    
    # 2. Left links container
    content = content.replace(
        'className="hidden md:flex space-x-8 text-sm text-stone-500 font-medium tracking-wide"',
        'className="hidden md:flex space-x-10 text-[15px] text-stone-500 font-medium tracking-wide"'
    )
    
    # 3. Right links container
    content = content.replace(
        'className="flex items-center space-x-6 text-sm text-stone-500 font-medium"',
        'className="flex items-center space-x-8 text-[15px] text-stone-500 font-medium"'
    )
    
    # 4. Logo container
    content = content.replace(
        'className="flex items-center space-x-2 font-serif font-medium text-xl tracking-tight text-stone-900 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer"',
        'className="flex items-center space-x-2 font-serif font-medium text-2xl md:text-3xl tracking-tight text-[#3b3228] md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:scale-105 transition-transform duration-300"'
    )
    
    # 5. Logo SVG
    content = content.replace(
        'className="w-5 h-5 text-stone-900"',
        'className="w-6 h-6 md:w-7 md:h-7 text-[#3b3228]"'
    )
    
    # 6. Active and Hover links
    content = content.replace('className="text-stone-900 transition-colors"', 'className="text-[#3b3228] font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#3b3228]"')
    content = content.replace('className="hover:text-stone-900 transition-colors"', 'className="hover:text-[#3b3228] transition-colors"')
    
    # For contact which might use 'hidden md:block'
    content = content.replace('className="hidden md:block hover:text-stone-900 transition-colors"', 'className="hidden md:block hover:text-[#3b3228] transition-colors"')
    content = content.replace('className="hidden md:block text-stone-900 transition-colors"', 'className="hidden md:block text-[#3b3228] font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#3b3228]"')
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"No changes made to {path}")
