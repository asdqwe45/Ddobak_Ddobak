import os

# 원본 파일들이 있는 디렉토리
directory_path = 'kor'

# 파일들을 저장할 새로운 디렉토리
save_directory_path = 'test'  # 이 경로를 원하는 대로 변경하세요.

# 새로운 디렉토리가 존재하지 않으면 만들어 줍니다.
if not os.path.exists(save_directory_path):
    os.makedirs(save_directory_path)

for filename in os.listdir(directory_path):
    if filename.endswith('.png'):
        # 각 파일명에서 확장자를 제외한 부분을 가져옵니다.
        base_name = os.path.splitext(filename)[0]
        
        # 파일명의 각 글자를 해당 글자의 유니코드로 변환합니다.
        new_name = ''.join(['{:04X}'.format(ord(ch)) for ch in base_name]) + '.png'
        
        # 원본 파일을 새로운 경로와 새로운 파일명으로 복사합니다.
        os.rename(os.path.join(directory_path, filename), os.path.join(save_directory_path, new_name))
