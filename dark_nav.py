import os
import re
import glob

pages = glob.glob(r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\**\page.tsx', recursive=True)

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Nav wrapper
    content = re.sub(
        r'<nav className="sticky top-0 z-40 bg-\[#FCFAF8\]/95 backdrop-blur-2xl border-b border-\[#3b3228\]/10 border-t-\[5px\] border-t-\[#3b3228\] shadow-\[0_15px_40px_-15px_rgba\(0,0,0,0\.1\)\] px-5 md:px-10 py-5 md:py-6 flex items-center justify-between transition-all">',
        r'<nav className="sticky top-0 z-40 bg-[#3b3228] shadow-lg shadow-black/10 px-5 md:px-10 py-5 md:py-6 flex items-center justify-between transition-all">',
        content
    )
    
    # Hamburger icon
    content = content.replace('className="md:hidden p-2 -ml-2 text-stone-600"', 'className="md:hidden p-2 -ml-2 text-white/90 hover:text-white transition-colors"')
    
    # Desktop links wrapper
    content = content.replace('className="hidden md:flex space-x-10 text-[15px] text-stone-500 font-medium tracking-wide"', 'className="hidden md:flex space-x-10 text-[15px] text-white/70 font-medium tracking-wide"')
    content = content.replace('className="flex items-center space-x-8 text-[15px] text-stone-500 font-medium"', 'className="flex items-center space-x-8 text-[15px] text-white/70 font-medium"')
    
    # Desktop links colors
    content = content.replace(
        'className="text-[#3b3228] font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#3b3228]"',
        'className="text-white font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"'
    )
    content = content.replace('className="hover:text-[#3b3228] transition-colors"', 'className="hover:text-white transition-colors"')
    content = content.replace('className="hidden md:block hover:text-[#3b3228] transition-colors"', 'className="hidden md:block hover:text-white transition-colors"')
    content = content.replace(
        'className="hidden md:block text-[#3b3228] font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#3b3228]"',
        'className="hidden md:block text-white font-bold transition-colors relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"'
    )
    
    # Logo
    content = content.replace(
        'className="flex items-center space-x-2 font-serif font-medium text-2xl md:text-3xl tracking-tight text-[#3b3228] md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:scale-105 transition-transform duration-300"',
        'className="flex items-center space-x-2 font-serif font-medium text-2xl md:text-3xl tracking-tight text-white md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:scale-105 transition-transform duration-300"'
    )
    content = content.replace(
        'className="w-6 h-6 md:w-7 md:h-7 text-[#3b3228]"',
        'className="w-6 h-6 md:w-7 md:h-7 text-white"'
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated navbars to Dark Brown")
