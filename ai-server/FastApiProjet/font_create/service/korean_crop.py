import os
from PIL import Image
from PIL import ImageEnhance
from cv2 import bilateralFilter
import numpy as np

rows = 3
cols = 12
header_ratio = 16.5 / (16.5 + 42)
import os
if not os.path.exists('./cropped_output_kor/'):
  os.makedirs('./cropped_output/')
  print("test")

def crop_image_uniform(template_image):
  korean_list = ["가", "깩", "낚", "댻", "떤", "렍", "멶", "볟", "뽈", "솱", "쐚", "욃",
                 "죬", "쭕", "춾", "퀧", "튐", "퓹", "흢", "긧", "낐", "낭", "댖", "땿",
                 "럨", "멑", "벺", "뼣"]

  # img = Image.open(template_image).convert('L')
  img=template_image
  print("hello")
  width, height = img.size
  cell_width = width / float(cols)
  cell_height = height / float(rows)
  header_offset = height / float(rows) * header_ratio
  width_margin = cell_width * 0.05
  height_margin = cell_height * 0.05

  for j in range(0, rows):
    for i in range(0, cols):
      left = i * cell_width
      upper = j * cell_height + header_offset
      right = left + cell_width
      lower = (j + 1) * cell_height

      center_x = (left + right) / 2
      center_y = (upper + lower) / 2

      crop_width = right - left - 2 * width_margin
      crop_height = lower - upper - 2 * height_margin

      size = 0
      if crop_width > crop_height:
        size = crop_height / 2
      else:
        size = crop_width / 2

      left = center_x - size
      right = center_x + size
      upper = center_y - size
      lower = center_y + size
      print(j*cols+i)
      if j * cols + i == 28:
        break
      code = korean_list[j * cols + i]
      name = "./cropped_output_kor/" + code + ".png"
      cropped_image = img.crop((left, upper, right, lower))
      cropped_image = cropped_image.resize((128, 128), Image.LANCZOS)
      # Increase constrast
      enhancer = ImageEnhance.Contrast(cropped_image)
      cropped_image = enhancer.enhance(1.5)
      opencv_image = np.array(cropped_image)
      opencv_image = bilateralFilter(opencv_image, 9, 30, 30)
      cropped_image = Image.fromarray(opencv_image)
      cropped_image.save(name)

  return {"message": "Image processed"}
