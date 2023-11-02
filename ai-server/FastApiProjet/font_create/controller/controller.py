from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from ..service.download_image_from_url import download_image_from_url
from ..service.korean_crop import crop_image_uniform
from ..service.english_crop import crop_image_uniform_eng

router = APIRouter()

########
from PIL import Image
from io import BytesIO
from fastapi import File, UploadFile


@router.post("/image_crop")
async def crop_template(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...)):
    kor_image_bytes = await kor_file.read()
    eng_image_bytes = await eng_file.read()
    kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
    message1 = crop_image_uniform(kor_img)
    eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
    message2 = crop_image_uniform_eng(eng_img)

    if (message1 == message2): return message1

@router.post("/sample_font")
async def crop_template(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...)):
    kor_image_bytes = await kor_file.read()
    eng_image_bytes = await eng_file.read()
    kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
    message1 = crop_image_uniform(kor_img)
    eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
    message2 = crop_image_uniform_eng(eng_img)
    

