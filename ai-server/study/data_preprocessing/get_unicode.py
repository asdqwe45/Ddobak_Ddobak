# -*- coding: utf-8 -*-
import codecs

def convert_to_unicode(file_path, new_file_path):
    # 기존 파일을 utf-8 인코딩으로 읽기
    with codecs.open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # 문자를 유니코드 포인트로 변환
    unicode_lines = []
    for line in lines:
        stripped_line = line.strip()
        if stripped_line:  # 빈 줄은 건너뛰기
            # 문자를 유니코드로 변환합니다. ord 함수는 문자의 유니코드 포인트를 반환합니다.
            unicode_point = ord(stripped_line)
            # 유니코드 포인트를 16진수 형식의 문자열로 변환합니다.
            unicode_str = f"{unicode_point:04X}"  # 4자리 수, 앞이 빈 공간은 0으로 채웁니다.
            unicode_lines.append(unicode_str)

    # 새로운 파일에 쓰기
    with codecs.open(new_file_path, 'w', encoding='utf-8') as new_file:
        for unicode_line in unicode_lines:
            new_file.write(unicode_line + '\n')

    print(f"변환 완료! 결과 파일: {new_file_path}")

# 파일 경로 설정
original_file = 'handwriting_template2.txt'  # 읽어들일 파일의 경로를 지정해주세요.
new_unicode_file = 'template.txt'  # 결과를 저장할 새 파일의 경로를 지정해주세요.

# 함수 실행
convert_to_unicode(original_file, new_unicode_file)
