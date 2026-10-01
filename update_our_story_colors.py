import sys

try:
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Replace white placeholder
    white_placeholder = '''<div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"><span className="text-[9px] text-stone-400">img</span></div>'''
    white_replacement = '''<div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-white.png" className="w-full h-full object-cover scale-150" alt="White" /></div>'''
    text = text.replace(white_placeholder, white_replacement)

    # Replace light-green placeholder
    lg_placeholder = '''<div className="w-12 h-12 bg-[#D2DAC5] rounded-full shadow-md flex items-center justify-center"><span className="text-[9px] text-stone-600">img</span></div>'''
    lg_replacement = '''<div className="w-12 h-12 bg-[#D2DAC5] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-lightgreen.png" className="w-full h-full object-cover scale-150" alt="Light Green" /></div>'''
    text = text.replace(lg_placeholder, lg_replacement)

    # Replace lime placeholder
    lime_placeholder = '''<div className="w-12 h-12 bg-[#DCE495] rounded-full shadow-md flex items-center justify-center"><span className="text-[9px] text-stone-600">img</span></div>'''
    lime_replacement = '''<div className="w-12 h-12 bg-[#DCE495] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-lime.png" className="w-full h-full object-cover scale-150" alt="Lime" /></div>'''
    text = text.replace(lime_placeholder, lime_replacement)

    # Replace charcoal placeholder
    charcoal_placeholder = '''<div className="w-12 h-12 bg-[#3F3F46] rounded-full shadow-md flex items-center justify-center"><span className="text-[9px] text-stone-300">img</span></div>'''
    charcoal_replacement = '''<div className="w-12 h-12 bg-[#3F3F46] rounded-full shadow-md flex items-center justify-center overflow-hidden"><img src="/Web-Chomm-s-House/images/color-charcoal.png" className="w-full h-full object-cover scale-150" alt="Charcoal" /></div>'''
    text = text.replace(charcoal_placeholder, charcoal_replacement)

    # Replace big lime tag
    tag_placeholder = '''<img src="/Web-Chomm-s-House/images/hero-sachets.png" className="absolute inset-0 w-full h-full object-cover transform -rotate-6 scale-110" alt="Our Product" />'''
    tag_replacement = '''<img src="/Web-Chomm-s-House/images/big-lime-tag.png" className="absolute inset-0 w-full h-full object-cover transform -rotate-6 scale-110" alt="Our Product" />'''
    text = text.replace(tag_placeholder, tag_replacement)

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Replacements complete for our-story/page.tsx.')
except Exception as e:
    print('Error:', e)
