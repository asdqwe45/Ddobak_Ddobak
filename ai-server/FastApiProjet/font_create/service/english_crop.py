import os
from PIL import Image
from PIL import ImageEnhance
from cv2 import bilateralFilter
import numpy as np

rows = 8
cols = 12
header_ratio = 16.5 / (16.5 + 42)
import os


def crop_image_uniform_eng(template_image):
    if not os.path.exists('./cropped_output_eng/'):
        os.makedirs('./cropped_output_eng')
        print("test")

    code_list = [
        "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049",
        "004A", "004B", "004C", "004D", "004E", "004F",
        "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058",
        "0059", "005A", "0061", "0062", "0063", "0064",
        "0065", "0066", "0067", "0068", "0069", "006A", "006B", "006C", "006D",
        "006E", "006F", "0070", "0071", "0072", "0073",
        "0074", "0075", "0076", "0077", "0078", "0079", "007A", "0021", "0022",
        "0023", "0024", "007B", "007D", "0027", "0028",
        "0029", "002A", "002B", "002C", "002D", "002E", "002F", "0030", "0031",
        "0032", "0033", "0034", "0035", "0036", "0037",
        "0038", "0039", "003A", "003B", "003C", "003D", "003E", "003F", "0040",
        "005E", "007E"
    ]

    # img = Image.open(template_image).convert('L')

    img = template_image
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
            right = left + cell_width -1
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
            if j * cols + i == 86:
                break
            # code = hex(ord(korean_list[j * cols + i]))[2:]
            code = code_list[j * cols + i]
            name = "./cropped_output_eng/" + code + ".png"
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
