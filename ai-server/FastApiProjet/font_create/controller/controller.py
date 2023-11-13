from fastapi import File, UploadFile, Form
from io import BytesIO
from PIL import Image
from ..service.compress import create_zip_from_folder
from fastapi import APIRouter, Query
from fastapi.responses import FileResponse

from ..service.template_crop import crop_image_uniform
from ..service.font_image_create import font_image_create
import os

router = APIRouter()
########


@router.post("/image_crop")
async def crop_template(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...)):
    kor_image_bytes = await kor_file.read()
    eng_image_bytes = await eng_file.read()
    kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
    message1 = crop_image_uniform(kor_img, './cropped_output_kor')
    eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
    message2 = crop_image_uniform(eng_img, './cropped_output_eng')


@router.post("/sample_font")
async def crop_template(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...)):
    kor_image_bytes = await kor_file.read()
    eng_image_bytes = await eng_file.read()
    kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
    unique_kor_dir = crop_image_uniform(kor_img, './cropped_output_kor')

    eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
    unique_eng_dir = crop_image_uniform(eng_img, './cropped_output_eng')

    response = font_image_create(unique_kor_dir, unique_eng_dir, sample=True)

    return response


@router.post("/create_font")
async def create_font(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...), font_name: str = Form(None)):
    kor_image_bytes = await kor_file.read()
    eng_image_bytes = await eng_file.read()
    kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
    unique_kor_dir = crop_image_uniform(kor_img, './cropped_output_kor')
    eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
    unique_eng_dir = crop_image_uniform(eng_img, './cropped_output_eng')

    response = font_image_create(
        unique_kor_dir, unique_eng_dir, sample=False, font_name=font_name)

    return response
