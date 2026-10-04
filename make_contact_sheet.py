import os
from PIL import Image, ImageDraw, ImageFont
import glob

# Gather all images
gallery_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\public\images\gallery'
workshop_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\public\images\workshop'

files = glob.glob(os.path.join(gallery_dir, '*.webp')) + glob.glob(os.path.join(workshop_dir, '*.webp'))

# Sort files so they are easy to find
files.sort()

# Create a huge grid image. Let's do 8 columns.
columns = 8
rows = (len(files) + columns - 1) // columns

thumb_width = 300
thumb_height = 400
margin = 20

width = columns * (thumb_width + margin) + margin
height = rows * (thumb_height + margin) + margin

canvas = Image.new('RGB', (width, height), 'white')
draw = ImageDraw.Draw(canvas)

for i, f in enumerate(files):
    row = i // columns
    col = i % columns
    
    x = margin + col * (thumb_width + margin)
    y = margin + row * (thumb_height + margin)
    
    try:
        img = Image.open(f)
        # resize and crop to fit thumb
        img_ratio = img.width / img.height
        thumb_ratio = thumb_width / thumb_height
        
        if img_ratio > thumb_ratio:
            # wider
            new_w = int(thumb_height * img_ratio)
            img = img.resize((new_w, thumb_height))
            left = (new_w - thumb_width) // 2
            img = img.crop((left, 0, left + thumb_width, thumb_height))
        else:
            # taller
            new_h = int(thumb_width / img_ratio)
            img = img.resize((thumb_width, new_h))
            top = (new_h - thumb_height) // 2
            img = img.crop((0, top, thumb_width, top + thumb_height))
            
        canvas.paste(img, (x, y))
        
        # Draw filename
        filename = os.path.basename(f)
        
        # draw text background
        draw.rectangle([x, y, x + 150, y + 40], fill='black')
        # draw text (simple default font)
        draw.text((x + 10, y + 10), filename, fill='white')
        
    except Exception as e:
        print(f"Failed {f}: {e}")

out_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\contact_sheet.jpg'
canvas.save(out_path)
print("Saved to", out_path)
