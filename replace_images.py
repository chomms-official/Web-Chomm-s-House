import sys

try:
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()
    
    # 1. Hero Banner Image
    hero_placeholder = '''<div className="absolute inset-0 bg-stone-300 flex items-center justify-center">
          <span className="text-stone-500 font-medium tracking-widest text-sm">BACKGROUND IMAGE PLACEHOLDER</span>
        </div>'''
    hero_replacement = '''<img src="/Web-Chomm-s-House/images/hero-sachets.png" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />'''
    text = text.replace(hero_placeholder, hero_replacement)

    # 2. Community Image
    community_placeholder = '''<div className="absolute inset-0 flex items-center justify-center bg-stone-200">
                  <span className="text-stone-400 text-sm font-medium">Community Image Placeholder</span>
               </div>'''
    community_replacement = '''<img src="/Web-Chomm-s-House/images/community-canal.png" className="absolute inset-0 w-full h-full object-cover" alt="Community" />'''
    text = text.replace(community_placeholder, community_replacement)

    # 3. Collab 1
    collab1_placeholder = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <span className="text-stone-400 text-sm font-medium">Image 1</span>
              </div>'''
    collab1_replacement = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src="/Web-Chomm-s-House/images/collab-1.jpg" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนเลิศสุขสม" />
              </div>'''
    text = text.replace(collab1_placeholder, collab1_replacement)

    # 4. Collab 2
    collab2_placeholder = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <span className="text-stone-400 text-sm font-medium">Image 2</span>
              </div>'''
    collab2_replacement = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src="/Web-Chomm-s-House/images/collab-2.jpg" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนศิรินทร์ และเพื่อน" />
              </div>'''
    text = text.replace(collab2_placeholder, collab2_replacement)

    # 5. Collab 3
    collab3_placeholder = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <span className="text-stone-400 text-sm font-medium">Image 3</span>
              </div>'''
    collab3_replacement = '''<div className="w-full aspect-[3/4] bg-stone-200 rounded-t-full rounded-b-[40px] relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                 <img src="/Web-Chomm-s-House/images/collab-3.jpg" className="absolute inset-0 w-full h-full object-cover" alt="ชุมชนพูนบำเพ็ญ" />
              </div>'''
    text = text.replace(collab3_placeholder, collab3_replacement)

    # 6. Big Lime Tag
    lime_placeholder = '''<div className="w-[80%] md:w-[70%] aspect-[4/7] bg-[#DCE495] rounded-[50px] transform rotate-6 shadow-2xl flex items-center justify-center relative overflow-hidden border-8 border-[#f8f7f5]">
               <span className="text-[#6d4c41]/50 font-medium">Big Lime Tag Placeholder</span>
            </div>'''
    lime_replacement = '''<div className="w-[80%] md:w-[70%] aspect-[4/7] bg-[#DCE495] rounded-[50px] transform rotate-6 shadow-2xl flex items-center justify-center relative overflow-hidden border-8 border-[#f8f7f5]">
               <img src="/Web-Chomm-s-House/images/hero-sachets.png" className="absolute inset-0 w-full h-full object-cover transform -rotate-6 scale-110" alt="Our Product" />
            </div>'''
    text = text.replace(lime_placeholder, lime_replacement)

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Replacements complete.')
except Exception as e:
    print('Error:', e)
