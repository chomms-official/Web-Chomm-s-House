import sys

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Update the light-green top placeholder to use the new image
    text = text.replace("getPlaceholder('Light Green - Top')", "'/Web-Chomm-s-House/images/light-green-top.jpg'")

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print('Updated light-green top image in page.tsx.')
except Exception as e:
    print('Error:', e)
