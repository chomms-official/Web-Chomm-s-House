import sys

try:
    # 1. Fix our-story/page.tsx
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        story_text = f.read()

    # Fix Big Lime Tag shadow
    old_lime_tag = '''<img src="/Web-Chomm-s-House/images/big-lime-tag.png" className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl" alt="Our Product" />'''
    new_lime_tag = '''<img src="/Web-Chomm-s-House/images/big-lime-tag.png" className="w-full h-auto object-contain mix-blend-darken" style={{ imageRendering: 'high-quality' }} alt="Our Product" />'''
    story_text = story_text.replace(old_lime_tag, new_lime_tag)

    # Fix blurry thumbnails by removing scale-150
    story_text = story_text.replace('className="w-full h-full object-cover scale-150"', 'className="w-full h-full object-contain p-1 mix-blend-darken" style={{ imageRendering: \'high-quality\' }}')
    story_text = story_text.replace('className="w-full h-full object-cover scale-110"', 'className="w-full h-full object-contain p-1 mix-blend-darken" style={{ imageRendering: \'high-quality\' }}')

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(story_text)

    # 2. Fix page.tsx
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        page_text = f.read()

    # Revert light-green front image
    page_text = page_text.replace("'/Web-Chomm-s-House/images/color-lightgreen.png'", "'/Web-Chomm-s-House/images/light-green-front.jpg'")

    # Add high-quality rendering to main product image
    old_main_img = '''<img 
              src={currentImages[activeIndex]} 
              alt="Product Main" 
              className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-[1.02]" 
            />'''
    new_main_img = '''<img 
              src={currentImages[activeIndex]} 
              alt="Product Main" 
              className="w-full h-full object-cover object-center mix-blend-darken transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
              style={{ imageRendering: 'high-quality' }}
            />'''
    page_text = page_text.replace(old_main_img, new_main_img)

    # Add high-quality rendering to thumbnails
    old_thumb_img = '''<img 
                  src={img} 
                  alt={`Thumb ${idx}`} 
                  className="w-full h-full object-cover object-center mix-blend-multiply p-1 transition-all duration-700 ease-in-out" 
                />'''
    new_thumb_img = '''<img 
                  src={img} 
                  alt={`Thumb ${idx}`} 
                  className="w-full h-full object-cover object-center mix-blend-darken p-1 transition-all duration-700 ease-in-out"
                  style={{ imageRendering: 'high-quality' }}
                />'''
    page_text = page_text.replace(old_thumb_img, new_thumb_img)

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(page_text)

    print('Fixes applied successfully.')
except Exception as e:
    print('Error:', e)
