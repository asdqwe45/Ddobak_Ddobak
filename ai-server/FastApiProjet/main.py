from fastapi import FastAPI
from .image_align.controller.controller import router as image_router

app = FastAPI()

app.include_router(image_router, prefix="/api/v1/image")
