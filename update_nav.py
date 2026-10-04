import os
import re
import glob

pages = glob.glob(r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\**\page.tsx', recursive=True)

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace the <nav className="..."> completely
    # Pattern: <nav className="sticky top-0 z-40 [^"]+"
    pattern = r'<nav className="sticky top-0 z-40 [^"]+"'
    replacement = '<nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-stone-200/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] px-5 md:px-10 py-4 flex items-center justify-between transition-all"'
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {path}")
