import os
import glob
from PIL import Image, ImageDraw, ImageFont

uploads = [
    r'C:/Users/User/.gemini/antigravity/brain/234909c0-744e-4fa1-95db-40d208bcf1d1/.user_uploaded/media_1791122980044.png',
    r'C:/Users/User/.gemini/antigravity/brain/234909c0-744e-4fa1-95db-40d208bcf1d1/.user_uploaded/media_1791123106757.png',
    r'C:/Users/User/.gemini/antigravity/brain/234909c0-744e-4fa1-95db-40d208bcf1d1/.user_uploaded/media_1791123115447.png',
    r'C:/Users/User/.gemini/antigravity/brain/234909c0-744e-4fa1-95db-40d208bcf1d1/.user_uploaded/media_1791123124661.png'
]

collage = Image.new('RGB', (800, 800), (255, 255, 255))
for i, path in enumerate(uploads):
    with Image.open(path) as img:
        img.thumbnail((400, 400))
        x = (i % 2) * 400
        y = (i // 2) * 400
        collage.paste(img, (x, y))
        draw = ImageDraw.Draw(collage)
        draw.text((x+10, y+10), f'Image {i+1}', fill='red')

out_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\temp_uploads.jpg'
collage.save(out_path)
print('Saved collage to', out_path)
