import redis
import json

# Redis 클라이언트 설정
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def add_task_to_redis_queue(task_type,data):
    # 작업 정보를 JSON 형식으로 변환
    print("dkssusd")
    task_json = json.dumps({
        "type": task_type,
        "data": data
    })
    # Redis 리스트에 작업 정보 추가
    redis_client.lpush('task_queue', task_json)

# 사용 예시
# add_task_to_redis_queue("sample_font", {"fontId": 123, "url": "http://example.com"})
