from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from image_align.controller.controller import router as image_align_router
app = FastAPI()
import uvicorn
app.include_router(image_align_router, prefix="/api/v1/image_align")
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
    uvicorn.run("main:app",host='0.0.0.0', port=7000, reload=True)