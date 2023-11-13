from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from image_align.controller.controller import router as image_align_router
from font_create.controller.controller import router as font_create
from font_create.service.handwriting_infer import VDSR,Conv_ReLU_Block
app = FastAPI()
import uvicorn
app.include_router(image_align_router, prefix="/api/v1/image_align")
app.include_router(font_create, prefix="/api/v1/font_create")
app.mount("/font_file", StaticFiles(directory="font_file"), name="font_file")


# cors 설정

# CORS 설정 추가
origins = [
    "http://localhost",  # 로컬 환경
    "*",
    # "https://yourdomain.com",  # 실제 배포 시 도메인
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run("main:app",host='0.0.0.0', port=6000, reload=True)