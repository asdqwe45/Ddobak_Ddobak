from fastapi import File, UploadFile, Form
from io import BytesIO
from PIL import Image
from ..service.compress import create_zip_from_folder
from fastapi import APIRouter, Query
from fastapi.responses import FileResponse
from ..service.download_image_from_url import download_image_from_url
from ..service.put_request_to_server import put_request_to_server
from ..service.template_crop import crop_image_uniform
from ..service.font_image_create import font_image_create
from ..service.add_task_to_redis_queue import add_task_to_redis_queue
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


# @router.post("/create_font")
# async def create_font(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...), font_name: str = Form(None)):
#     #     kor_file, eng_file = download_image_from_url(url)
# #     # 이미지 처리 로직
#     # async def create_font(fontId: int, url: str, font_name: str = Form(None)):
#     # kor_file, eng_file = download_image_from_url(url)
#     kor_image_bytes = await kor_file.read()
#     eng_image_bytes = await eng_file.read()
#     kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
#     unique_kor_dir = crop_image_uniform(kor_img, './cropped_output_kor')
#     eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
#     unique_eng_dir = crop_image_uniform(eng_img, './cropped_output_eng')

#     response = font_image_create(
#         unique_kor_dir, unique_eng_dir, sample=False, font_name=font_name)

#     return response



@router.post("/create_font")
async def create_font2(fontId: int = Form(...), url: str = Form(...), engFontName: str = Form(None)):
# async def create_font2(fontId: int = Form(...), url: str = Form(...), font_name: str = Form(None)):
    print(fontId)
    print(url)
    print(engFontName)
    add_task_to_redis_queue("create_font", data={
                            "fontId": fontId, "url": url, "font_name": engFontName})

    return {"message": "success"}



# def process_sample_font_task(kor_file: UploadFile = File(...), eng_file: UploadFile = File(...)):
#     kor_image_bytes =  kor_file.read()
#     eng_image_bytes =  eng_file.read()
#     kor_img = Image.open(BytesIO(kor_image_bytes)).convert('L')
#     unique_kor_dir = crop_image_uniform(kor_img, './cropped_output_kor')

#     eng_img = Image.open(BytesIO(eng_image_bytes)).convert('L')
#     unique_eng_dir = crop_image_uniform(eng_img, './cropped_output_eng')

#     response = font_image_create(unique_kor_dir, unique_eng_dir, sample=True)

#     return response

def process_create_font_task(fontId, url, font_name):
    kor_file, eng_file = download_image_from_url(url)
    # 이미지 처리 로직
    unique_kor_dir = crop_image_uniform(kor_file, './cropped_output_kor')
    unique_eng_dir = crop_image_uniform(eng_file, './cropped_output_eng')

    font_url = font_image_create(
        unique_kor_dir, unique_eng_dir, sample=False, font_name=font_name)
    print("hello123")
    print(font_url)
    print(fontId)
    put_request_to_server(fontId=fontId, url=font_url)
