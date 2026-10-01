import sys

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Revert Lime front image to placeholder
    text = text.replace("'/Web-Chomm-s-House/images/color-lime.png'", "getPlaceholder('Lime - Front')")

    # Revert Charcoal front image to placeholder
    text = text.replace("'/Web-Chomm-s-House/images/color-charcoal.png'", "getPlaceholder('Charcoal - Front')")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print('Removed the two unrelated images from the shop slider.')

except Exception as e:
    print('Error:', e)
