import os
import re

files_to_update = [
    'src/app/page.tsx',
    'src/app/our-story/page.tsx',
    'src/app/workshop/page.tsx',
    'src/app/contact/page.tsx'
]

old_nav_icon = r'<div className="w-5 h-5 bg-stone-900 rounded-sm flex items-center justify-center transform rotate-45"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>'
new_nav_icon = r'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="w-5 h-5 text-stone-900"><path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" /></svg>'

old_hero_span = r'<span className="flex items-center justify-center space-x-3 mt-4 text-3xl md:text-5xl tracking-\[0\.3em\] font-sans not-italic font-medium">.*?<span>USE</span>.*?</span>'
new_hero_span = r'''<span className="flex items-center justify-center space-x-3 md:space-x-4 mt-4 text-4xl md:text-6xl font-serif italic font-medium">
              <span>H</span>
              <svg className="w-10 h-10 md:w-16 md:h-16 text-[#dce495]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                 <path d="M 10 10 Q 10 4 12 2 Q 14 4 14 10 Q 20 10 22 12 Q 20 14 14 14 Q 14 20 12 22 Q 10 20 10 14 Q 4 14 2 12 Q 4 10 10 10 Z" />
              </svg>
              <span>USE</span>
            </span>'''

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace nav text
    content = content.replace('<span className="ml-1">Chomm\'s</span>', '<span className="ml-1">Chomm\'s House</span>')
    
    # Replace footer text
    content = content.replace('<span className="font-serif italic text-4xl text-white tracking-wide">Chomm\'s</span>', '<span className="font-serif italic text-4xl text-white tracking-wide">Chomm\'s House</span>')
    
    # Replace nav icon
    content = content.replace(old_nav_icon, new_nav_icon)
    
    # Replace hero span in our-story
    if 'our-story' in filepath:
        content = re.sub(old_hero_span, new_hero_span, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {filepath}')
