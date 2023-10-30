from fastapi import APIRouter, File, UploadFile
from ..service.image_align import process_image
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post("/process-image/")
async def process_image_endpoint(file: UploadFile = File(...)):
    file_bytes = await file.read()  # 파일을 바이트로 읽는다.
    processed_image = await process_image(file_bytes)

    return StreamingResponse(processed_image, media_type="image/png")
