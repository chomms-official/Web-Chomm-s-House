import sys

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Revert the light-green top image back to the placeholder
    text = text.replace("'/Web-Chomm-s-House/images/light-green-top.jpg'", "getPlaceholder('Light Green - Top')")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print('Reverted light-green top image to placeholder in page.tsx.')
except Exception as e:
    print('Error:', e)
