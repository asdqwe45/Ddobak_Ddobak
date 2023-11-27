from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from image_align.controller.controller import router as image_align_router
from font_create.controller.controller import router as font_create
from font_create.service.handwriting_infer import VDSR,Conv_ReLU_Block
from font_create.controller.controller import process_create_font_task
app = FastAPI()
import uvicorn
app.include_router(image_align_router, prefix="/api/v1/image_align")
app.include_router(font_create, prefix="/api/v1/font_create")
app.mount("/font_file", StaticFiles(directory="font_file"), name="font_file")

import redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)
import threading
import json

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

def start_worker():
    worker_thread = threading.Thread(target=gpu_worker)
    print("dkssyd")
    worker_thread.start()

def gpu_worker():
    print("hello")
    while True:
        _, task_info = redis_client.brpop("task_queue")
        task = json.loads(task_info)

        if task['type'] == "create_font":
            print("hello2")
            process_create_font_task(**task['data'])



@app.on_event ("startup")
async def startup_event():
    start_worker()

if __name__ == '__main__':
    uvicorn.run("main:app",host='0.0.0.0', port=6000, reload=False, workers=0)


