import shutil

def create_zip_from_folder(folder_path, output_path):
    # 폴더를 ZIP 파일로 압축하고 저장 경로를 반환한다.
    shutil.make_archive(output_path, 'zip', folder_path)
    return f"{output_path}.zip"