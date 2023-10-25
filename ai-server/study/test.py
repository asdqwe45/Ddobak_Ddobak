import torch
from tensorflow.python.client import device_lib


print(torch.__version__)

print(device_lib.list_local_devices())