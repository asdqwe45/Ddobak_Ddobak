import requests

def download_file_from_s3(urls):
    url1, url2 = urls.split('%')
    file1 = requests.get(url1).content
    file2=requests.get(url2).content
    # 여기서 파일을 다운로드하고 처리하는 로직 구현


    return file1,file2