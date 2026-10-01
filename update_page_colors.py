import sys

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Update lime front
    text = text.replace("getPlaceholder('Lime - Front')", "'/Web-Chomm-s-House/images/color-lime.png'")
    # Update charcoal front
    text = text.replace("getPlaceholder('Charcoal - Front')", "'/Web-Chomm-s-House/images/color-charcoal.png'")
    # Update light-green front (assuming the user wants the real photo now)
    text = text.replace("'/Web-Chomm-s-House/images/light-green-front.jpg'", "'/Web-Chomm-s-House/images/color-lightgreen.png'")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Replacements complete for page.tsx.')
except Exception as e:
    print('Error:', e)
