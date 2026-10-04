import os
import glob
import math
from PIL import Image, ImageDraw, ImageFont

source_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\24.09.2026'
images = glob.glob(os.path.join(source_dir, '*.png'))

# Sort by numeric name
images.sort(key=lambda x: int(os.path.splitext(os.path.basename(x))[0]))

thumb_size = 200
cols = 10
rows = math.ceil(len(images) / cols)

collage = Image.new('RGB', (cols * thumb_size, rows * thumb_size), (255, 255, 255))

for i, img_path in enumerate(images):
    try:
        with Image.open(img_path) as img:
            img.thumbnail((thumb_size, thumb_size))
            x = (i % cols) * thumb_size
            y = (i // cols) * thumb_size
            
            # Center the thumbnail in its cell
            offset_x = x + (thumb_size - img.width) // 2
            offset_y = y + (thumb_size - img.height) // 2
            collage.paste(img, (offset_x, offset_y))
            
            # Draw the number
            draw = ImageDraw.Draw(collage)
            # draw black background for text
            draw.rectangle([x, y, x+30, y+20], fill='black')
            draw.text((x+5, y+5), str(i+1), fill='white')
    except Exception as e:
        print(f"Error {img_path}: {e}")

out_path = os.path.join(source_dir, 'collage_reference.jpg')
collage.save(out_path, quality=80)
print(f"Collage saved to {out_path}")
