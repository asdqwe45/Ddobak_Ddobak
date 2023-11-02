from zipfile import ZipFile
import os
def zipdir(path: str, ziph: ZipFile):
    for root, _, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), os.path.join(path, '..')))
