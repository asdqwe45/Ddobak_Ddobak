import os
from PIL import Image
from PIL import ImageEnhance
from cv2 import bilateralFilter
import numpy as np
from datetime import datetime
from pathlib import Path
import os
from .font_image_align import center_letter_in_image_128x128, process_folder
from .handwriting_infer import image_preprocess


def crop_image_uniform(template_image, base_output_dir):
    # //임시 폴더 생성
    unique_dir_name = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_dir = Path(base_output_dir) / unique_dir_name / unique_dir_name

    # 해당 경로에 디렉토리가 존재하지 않는다면 생성
    os.makedirs(output_dir, exist_ok=True)
    rows = 3
    cols = 12
    header_ratio = 16.5 / (16.5 + 42)
    # if not os.path.exists('./cropped_output_kor/test'):
    #     os.makedirs('./cropped_output_kor/test')
    #     print("test")
    #
    #
    base_list = []
    if (base_output_dir == './cropped_output_kor'):
        # base_list = ["가", "깩", "낚", "댻", "떤", "렍", "멶", "볟", "뽈", "솱", "쐚", "욃",
        #              "죬", "쭕", "춾", "퀧", "튐", "퓹", "흢", "긧", "낐", "낭", "댖", "땿",
        #              "럨", "멑", "벺", "뼣"]
        base_list = ["값", "같", "곬", "곶", "깎", "넋", "늪", "닫", "닭", "닻", "됩", "뗌", "략", "몃", "밟", "볘",
                     "뺐", "뽈", "솩", "쐐", "앉", "않", "얘", "얾", "엌", "옳", "읊", "죡", "쮜", "춰", "츄", "퀭",
                     "틔", "핀", "핥", "훟"]
        rows = 3
        cols = 12
        header_ratio = 0.48 / (0.48 + 2.25)
        length = 36
        # length = 28
        img = template_image
        width, height = img.size
        cell_width = width / float(cols)
        cell_height = height / float(rows)
        header_offset = height / float(rows) * header_ratio
        width_margin = cell_width * 0.07
        height_margin = cell_height * 0.07
    elif (base_output_dir == './cropped_output_eng'):
        base_list = ["0041", "0042", "0043", "0044", "0045", "0046", "0047",
                     "0048", "0049", "004A", "004B", "004C", "004D", "004E",
                     "004F", "0050", "0051", "0052", "0053", "0054", "0055",
                     "0056", "0057", "0058", "0059", "005A", "0061", "0062",
                     "0063", "0064", "0065", "0066", "0067", "0068", "0069",
                     "006A", "006B", "006C", "006D", "006E", "006F", "0070",
                     "0071", "0072", "0073", "0074", "0075", "0076", "0077",
                     "0078", "0079", "007A", "0021", "0022", "0023", "0024", 
                     "007B", "007D", "0027", "0028", "0029", "002A", "002B",
                     "002F", "002D", "002E", "002C", "005B", "005D", "0025",
                     "003A", "003B", "003C", "003D", "003E", "003F", "0040",
                     "005E", "0030", "0031", "0032", "0033", "0034", "0035",
                     "0036", "0037", "0038", "0039", "007E", "005C", "005F"
                     ]

        rows = 7
        cols = 13
        header_ratio = .5/2.5
        length = 91
        img = template_image
        width, height = img.size
        cell_width = width / float(cols)
        cell_height = height / float(rows)
        header_offset = height / float(rows) * header_ratio
        width_margin = cell_width * 0.1
        height_margin = cell_height * 0.1

    # img = Image.open(template_image).convert('L')

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
            if j * cols + i == length:
                break
            # code = hex(ord(korean_list[j * cols + i]))[2:]
            code = base_list[j * cols + i]
            name = str(output_dir)+"/" + code + ".png"
            cropped_image = img.crop((left, upper, right, lower))
            cropped_image = cropped_image.resize((128, 128), Image.LANCZOS)
            # Increase constrast
            enhancer = ImageEnhance.Contrast(cropped_image)
            cropped_image = enhancer.enhance(2)
            # opencv_image = np.array(cropped_image)
            # opencv_image = bilateralFilter(opencv_image, 9, 30, 30)
            # cropped_image = Image.fromarray(opencv_image)
            cropped_image = center_letter_in_image_128x128(cropped_image)
            cropped_image.save(name)
    image_preprocess(base_output_dir, unique_dir_name)
    process_folder(f'{base_output_dir}/f{unique_dir_name}/f{unique_dir_name}')
    return unique_dir_name
