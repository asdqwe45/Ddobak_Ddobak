from rembg import remove
from PIL import Image
import os

def remove_background(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.png'): # PNG 파일만 선택
            file_path = os.path.join(folder_path, filename)
            input_image = Image.open(file_path) # 이미지 열기
            output_image = remove(input_image) # 배경 제거
            output_image.save(file_path) # 같은 이름으로 저장
