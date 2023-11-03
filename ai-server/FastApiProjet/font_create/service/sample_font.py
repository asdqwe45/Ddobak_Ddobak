import json
import torch
from sconf import Config
from torchvision import transforms
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

from .base.utils import load_reference
from .DM.models import Generator
from .inference import infer_DM

def sample_font():
    weight_path = "./font_create/service/last.pth"  # path to weight to infer
    decomposition = "./font_create/service/data/kor/decomposition_DM.json"
    n_heads = 3
    n_comps = 68

    #  building and loading the model (not recommended to modify)
    cfg = Config("./font_create/service/cfgs/DM/default.yaml")
    decomposition = json.load(open(decomposition))

    gen = Generator(n_heads=n_heads, n_comps=n_comps).cuda().eval()
    weight = torch.load(weight_path)
    gen.load_state_dict(weight["generator_ema"])


    ref_path = "./cropped_output_kor"
    extension = "png"
    ref_chars = None

    ref_dict, load_img = load_reference(ref_path, extension, ref_chars)

    gen_chars = "다람쥐쳇바퀴에타고파"  # characters to generate
    save_dir = "./font_create/service/result/dm/cropped_output_kor"
    batch_size = 16

    infer_DM(gen, save_dir, gen_chars, ref_dict, load_img, decomposition, batch_size)


