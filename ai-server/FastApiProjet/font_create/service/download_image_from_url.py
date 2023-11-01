import requests
from io import BytesIO
from PIL import Image
def download_image_from_url(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert('L')
    return img