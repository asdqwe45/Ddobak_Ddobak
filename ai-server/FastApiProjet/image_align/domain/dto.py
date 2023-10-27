from pydantic import BaseModel

class ProcessedImageResponse(BaseModel):
    processed_image: str
