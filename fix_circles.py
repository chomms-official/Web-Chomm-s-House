import sys

try:
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # White circle
    old_white = '''<div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-white.png" className="w-full h-full object-contain p-1 mix-blend-darken" alt="White" /></div>'''
    new_white = '''<div className="w-12 h-12 bg-white rounded-full shadow-md overflow-hidden flex items-center justify-center"><img src="/Web-Chomm-s-House/images/color-white.png" className="w-full h-full object-cover mix-blend-multiply" alt="White" /></div>'''
    text = text.replace(old_white, new_white)

    # Light Green circle
    old_lg = '''<div className="w-12 h-12 bg-[#D2DAC5] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-lightgreen.png" className="w-full h-full object-contain p-1 mix-blend-darken" alt="Light Green" /></div>'''
    new_lg = '''<div className="w-12 h-12 bg-[#D2DAC5] rounded-full shadow-md overflow-hidden flex items-center justify-center"><img src="/Web-Chomm-s-House/images/color-lightgreen.png" className="w-full h-full object-cover mix-blend-multiply" alt="Light Green" /></div>'''
    text = text.replace(old_lg, new_lg)

    # Lime circle
    old_lime = '''<div className="w-12 h-12 bg-[#DCE495] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-lime.png" className="w-full h-full object-contain p-1 mix-blend-darken" alt="Lime" /></div>'''
    new_lime = '''<div className="w-12 h-12 bg-[#DCE495] rounded-full shadow-md overflow-hidden flex items-center justify-center"><img src="/Web-Chomm-s-House/images/color-lime.png" className="w-full h-full object-cover mix-blend-multiply" alt="Lime" /></div>'''
    text = text.replace(old_lime, new_lime)

    # Charcoal circle
    old_charcoal = '''<div className="w-12 h-12 bg-[#3F3F46] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-charcoal.png" className="w-full h-full object-contain p-1 mix-blend-darken" alt="Charcoal" /></div>'''
    new_charcoal = '''<div className="w-12 h-12 bg-white rounded-full shadow-md overflow-hidden flex items-center justify-center"><img src="/Web-Chomm-s-House/images/color-charcoal.png" className="w-full h-full object-cover mix-blend-multiply" alt="Charcoal" /></div>'''
    text = text.replace(old_charcoal, new_charcoal)

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print('Fixed our-story circles.')
except Exception as e:
    print('Error:', e)
