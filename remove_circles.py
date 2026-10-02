import re

with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# For White
content = re.sub(
    r'<div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">(<img src="/Web-Chomm-s-House/images/color-white\.png" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="White" />)</div>',
    r'<div className="w-16 h-16 flex items-center justify-center">\1</div>',
    content
)

# For Light Green
content = re.sub(
    r'<div className="w-12 h-12 bg-\[#D2DAC5\] rounded-full shadow-md flex items-center justify-center">(<img src="/Web-Chomm-s-House/images/color-lightgreen\.png" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="Light Green" />)</div>',
    r'<div className="w-16 h-16 flex items-center justify-center">\1</div>',
    content
)

# For Lime
content = re.sub(
    r'<div className="w-12 h-12 bg-\[#DCE495\] rounded-full shadow-md flex items-center justify-center">(<img src="/Web-Chomm-s-House/images/color-lime\.png" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="Lime" />)</div>',
    r'<div className="w-16 h-16 flex items-center justify-center">\1</div>',
    content
)

# For Charcoal
content = re.sub(
    r'<div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">(<img src="/Web-Chomm-s-House/images/color-charcoal\.png" className="w-full h-full object-contain p-1 mix-blend-multiply" alt="Charcoal" />)</div>',
    r'<div className="w-16 h-16 flex items-center justify-center">\1</div>',
    content
)

with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Circles removed!')
