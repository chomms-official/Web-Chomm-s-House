import os
import re

files_to_update = ['src/app/contact/page.tsx', 'src/app/workshop/page.tsx']

old_footer = r'''<span className="font-serif italic text-4xl text-white tracking-wide">Chomm's House</span>
            <div className="flex items-center">
               <span className="text-white font-bold text-sm tracking-\[0\.2em\] mt-2">HOUSE</span>
            </div>'''
            
new_footer = r'''<span className="font-serif italic text-4xl text-white tracking-wide">Chomm's House</span>'''

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(old_footer, new_footer, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed footer in {filepath}')
