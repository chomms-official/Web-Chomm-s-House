import sys

try:
    with open('src/app/contact/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove the blur classes
    text = text.replace(' blur-[2px] group-hover:blur-none', '')

    with open('src/app/contact/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print('Removed blur classes from contact page.')
except Exception as e:
    print('Error:', e)
