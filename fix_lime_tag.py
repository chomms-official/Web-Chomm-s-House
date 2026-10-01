import sys

try:
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # The current Big Lime Tag block:
    old_tag = '''<div className="w-[80%] md:w-[70%] aspect-[4/7] bg-[#DCE495] rounded-[50px] transform rotate-6 shadow-2xl flex items-center justify-center relative overflow-hidden border-8 border-[#f8f7f5]">
               <img src="/Web-Chomm-s-House/images/big-lime-tag.png" className="absolute inset-0 w-full h-full object-cover transform -rotate-6 scale-110" alt="Our Product" />
            </div>'''

    new_tag = '''<div className="w-[80%] md:w-[70%] flex items-center justify-center relative">
               <img src="/Web-Chomm-s-House/images/big-lime-tag.png" className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl" alt="Our Product" />
            </div>'''

    if old_tag in text:
        text = text.replace(old_tag, new_tag)
        print('Replacement successful.')
    else:
        print('Could not find old tag block.')

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
except Exception as e:
    print('Error:', e)
