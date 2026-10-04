import os
import glob
import random
from PIL import Image

source_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\24.09.2026'
public_images = r'C:\Users\User\Documents\antigravity\web-chomms-house\public\images'

workshop_dir = os.path.join(public_images, 'workshop')
gallery_dir = os.path.join(public_images, 'gallery')

os.makedirs(workshop_dir, exist_ok=True)
os.makedirs(gallery_dir, exist_ok=True)

all_images = glob.glob(os.path.join(source_dir, '*.png'))
# Shuffle to get a nice random selection
random.seed(42)
random.shuffle(all_images)

def process_image(img_path, out_path):
    try:
        with Image.open(img_path) as img:
            # Convert to RGB if needed
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            # Resize if too large, max width 1000px
            max_size = (1000, 1000)
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            # Save as webp with 80% quality
            img.save(out_path, 'WEBP', quality=80)
            print(f'Saved {out_path}')
    except Exception as e:
        print(f'Error processing {img_path}: {e}')

# Process 8 for workshop
workshop_images = all_images[:8]
for i, img_path in enumerate(workshop_images):
    out_path = os.path.join(workshop_dir, f'w{i+1}.webp')
    process_image(img_path, out_path)

# Process 40 for gallery
gallery_images = all_images[8:48]
for i, img_path in enumerate(gallery_images):
    out_path = os.path.join(gallery_dir, f'g{i+1}.webp')
    process_image(img_path, out_path)

print('Image processing complete!')
