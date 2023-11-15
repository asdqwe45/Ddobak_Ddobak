import requests
import json

def put_request_to_server(fontId, url):
    print("hello444")
    api_url = "https://ddobak.com/api/v1/font/make/final"
    print(url)
    data = {
        'fontId': fontId,
        'fontFileUrl': url,
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.put(api_url, data=json.dumps(data), headers=headers)
    print("hello6666")
    if response.status_code == 200:
        print("yessss")
