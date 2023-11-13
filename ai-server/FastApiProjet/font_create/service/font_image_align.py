from PIL import Image
import os
import glob

def center_letter_in_image_128x128(img,border=10):
    # 원본 이미지 크기
    width, height = img.size

    # 이미지를 흑백으로 변환
    img_gray = img.convert('L')

    # 이미지 크롭
    img_gray = img_gray.crop((border, border, width - border, height - border))

    # 크롭된 이미지의 새로운 크기
    cropped_width, cropped_height = img_gray.size

    # 글자의 경계 찾기
    left, top, right, bottom = cropped_width, cropped_height, 0, 0
    for x in range(cropped_width):
        for y in range(cropped_height):
            pixel = img_gray.getpixel((x, y))
            if pixel < 128:  # 글자가 검은색인 경우
                left, top, right, bottom = min(left, x), min(top, y), max(right, x), max(bottom, y)

    # 글자의 중심 찾기
    center_x, center_y = (left + right) / 2, (top + bottom) / 2

    # 새 이미지의 크기는 여전히 128x128
    new_img = Image.new('L', (128, 128), 'white')

    # 글자를 새 이미지의 중앙에 배치
    target_x = int(64 - (center_x + border))
    target_y = int(64 - (center_y + border))
    new_img.paste(img, (target_x, target_y))

    return new_img

def process_folder(folder_path):
    # 폴더 내의 모든 PNG 파일 찾기
    png_files = glob.glob(os.path.join(folder_path, '*.png'))

    border=20
    # 각 파일에 대해 처리
    for file_path in png_files:
        img = Image.open(file_path)
        centered_img = center_letter_in_image_128x128(img,border)
        centered_img.save(folder_path)