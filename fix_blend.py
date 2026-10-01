import sys

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        page_text = f.read()

    # Revert mix-blend-darken back to mix-blend-multiply to improve performance
    page_text = page_text.replace('mix-blend-darken', 'mix-blend-multiply')

    # Revert any instance of light-green flower back to light-green round
    page_text = page_text.replace("'/Web-Chomm-s-House/images/color-lightgreen.png'", "'/Web-Chomm-s-House/images/light-green-front.jpg'")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(page_text)
    
    print('Fixed page.tsx.')

    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        story = f.read()
    
    # Revert the mix-blend-darken back to mix-blend-multiply in our-story too, if it affects performance.
    # Actually, for the big tag, mix-blend-multiply is fine.
    story = story.replace('mix-blend-darken', 'mix-blend-multiply')
    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(story)
        
except Exception as e:
    print('Error:', e)
