import requests
from io import BytesIO
from PIL import Image

def download_image_from_url(url):
    # URL을 $ 기준으로 파싱하여 각각의 이미지 URL을 얻음
    kor_url, eng_url = url.split('$')

    # 한국어 이미지 다운로드 및 처리
    kor_response = requests.get(kor_url)
    kor_img = Image.open(BytesIO(kor_response.content)).convert('L')

    # 영어 이미지 다운로드 및 처리
    eng_response = requests.get(eng_url)
    eng_img = Image.open(BytesIO(eng_response.content)).convert('L')

    return kor_img, eng_img
