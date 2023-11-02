from fastapi import APIRouter, Query
from fastapi.responses import FileResponse
from ..service.korean_crop import crop_image_uniform
from ..service.english_crop import crop_image_uniform_eng
from ..service.sample_font import sample_font
import os
router = APIRouter()
from ..service.compress import create_zip_from_folder
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

    sample_font()
    folder_path = './font_create/service/result/dm/cropped_output_kor/test'
    zip_output_path = './font_create/service/result/dm/cropped_output_kor'
    zip_file_path = create_zip_from_folder(folder_path, zip_output_path)
    return FileResponse(path=zip_file_path, filename=os.path.basename(zip_file_path), media_type='application/zip')
