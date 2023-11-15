from PIL import Image
import numpy as np
import os
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from torchvision import transforms
from math import sqrt

# # model

# # load the model
# model = torch.load("./final_train_model.pth")

# # Check if CUDA is available and move the model to GPU
# if torch.cuda.is_available():
#     model.cuda()
# else:
#     print("CUDA is not available. Using CPU.")




class Conv_ReLU_Block(nn.Module):
    def __init__(self):
        super(Conv_ReLU_Block, self).__init__()
        self.conv = nn.Conv2d(in_channels=64, out_channels=64, kernel_size=3, stride=1, padding=1, bias=False)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.conv(x))

class VDSR(nn.Module):
    def __init__(self):
        super(VDSR, self).__init__()
        self.residual_layer = self.make_layer(Conv_ReLU_Block, 18)
        self.input = nn.Conv2d(in_channels=1, out_channels=64, kernel_size=3, stride=1, padding=1, bias=False)
        self.output = nn.Conv2d(in_channels=64, out_channels=1, kernel_size=3, stride=1, padding=1, bias=False)
        self.relu = nn.ReLU(inplace=True)

        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                n = m.kernel_size[0] * m.kernel_size[1] * m.out_channels
                m.weight.data.normal_(0, sqrt(2. / n))

    def make_layer(self, block, num_of_layer):
        layers = []
        for _ in range(num_of_layer):
            layers.append(block())
        return nn.Sequential(*layers)

    def forward(self, x):
        residual = x
        out = self.relu(self.input(x))
        out = self.residual_layer(out)
        out = self.output(out)
        out = torch.add(out,residual)
        return out


# 데이터 로딩 함수


def load_data(folder_path):
    test_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    test_size = len(test_files)
    test_imgs = np.zeros((test_size, 128, 128))
    for i in range(test_size):
        test_imgs[i] = np.array(Image.open(os.path.join(
            folder_path, test_files[i])).convert('L'))
    test_data = [torch.FloatTensor(i).view(1, 128, 128) for i in test_imgs]
    return test_data, test_files, test_size

# 모델 로딩 및 설정 함수



def load_model(model_path, use_cuda=True):
    model = torch.load(model_path)
    model.eval()
    if use_cuda and torch.cuda.is_available():
        torch.cuda.set_device(1)
        model.cuda()
        
    else:
        print("CUDA is not available. Using CPU.")
    return model

# 추론 및 결과 저장 함수


def infer_and_save(model, test_data, test_files, output_folder, test_size, use_cuda=True):
    for t in range(test_size):
        input_data = test_data[t].view(1, 1, 128, 128)
        if use_cuda and torch.cuda.is_available():
            input_data = input_data.cuda()

        output = model(input_data)
        output = output.cpu().view(128, 128).detach().numpy()
        output = np.clip(np.rint(output), 0, 255).astype(np.uint8)

        img = Image.fromarray(output)
        img.save(os.path.join(output_folder, test_files[t]))
    del model

# 메인 코드


def image_preprocess(base_output_dir, unique_dir_name):

    model = load_model("./final_train_model.pth")
    test_data, test_files, test_size = load_data(
        f'{base_output_dir}/{unique_dir_name}/{unique_dir_name}')
    infer_and_save(model=model, test_data=test_data, test_files=test_files,
                   output_folder=f'{base_output_dir}/{unique_dir_name}/{unique_dir_name}', test_size=test_size)
