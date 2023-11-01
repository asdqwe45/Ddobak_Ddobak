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


@router.post("/eng")
async def crop_template_kor(file: UploadFile = File(...)):
  image_bytes = await file.read()

  img = Image.open(BytesIO(image_bytes)).convert('L')
  message = crop_image_uniform(img)
  return message

@router.post("/eng")
async def crop_template_eng(file: UploadFile = File(...)):
  image_bytes = await file.read()

  img = Image.open(BytesIO(image_bytes)).convert('L')
  message = crop_image_uniform_eng(img)
  return message

# async def crop_template_kor(image_url: str = Query(..., alias="image-url")):
#   image = download_image_from_url(image_url)
#   message = crop_image_uniform(image)
#
#   return message
