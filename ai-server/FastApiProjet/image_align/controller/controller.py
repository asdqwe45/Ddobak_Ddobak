from fastapi import APIRouter, File, UploadFile
from ..service.image_delete_margin import process_image
from ..domain.dto import ProcessedImageResponse

router = APIRouter()

@router.post("/process-image/", response_model=ProcessedImageResponse)
async def process_image_endpoint(file: UploadFile = File(...)):
    processed_image = await process_image(file.file)
    return {"processed_image": processed_image}
