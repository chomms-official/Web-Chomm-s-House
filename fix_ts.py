import sys

try:
    with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
        story_text = f.read()
    
    story_text = story_text.replace("style={{ imageRendering: 'high-quality' }} ", "")
    story_text = story_text.replace(" style={{ imageRendering: 'high-quality' }}", "")

    with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
        f.write(story_text)

    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        page_text = f.read()

    page_text = page_text.replace("style={{ imageRendering: 'high-quality' }}", "")
    page_text = page_text.replace(" style={{ imageRendering: 'high-quality' }}", "")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(page_text)

    print('Fixed TypeScript error.')
except Exception as e:
    print('Error:', e)
