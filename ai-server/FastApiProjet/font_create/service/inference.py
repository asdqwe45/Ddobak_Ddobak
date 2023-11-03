"""
FFG-benchmarks
Copyright (c) 2021-present NAVER Corp.
MIT license
"""
import json
import argparse
from pathlib import Path
from itertools import chain
from sconf import Config
from PIL import Image
import random

import torch
from torchvision import transforms

from .base.dataset import sample
from .base.utils import save_tensor_to_image, load_reference, load_primals, load_decomposition


TRANSFORM = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])


def setup_eval_config(args, left_argv={}):
    default_config_path = Path(args.config_paths[0]).parent / "default.yaml"
    cfg = Config(*args.config_paths,
                 default=default_config_path)
    cfg.argv_update(left_argv)

    if cfg.dset.test.ref_chars is not None:
        ref_chars = json.load(open(cfg.dset.test.ref_chars))
        if args.n_ref is not None:
            ref_chars = sample(ref_chars, args.n_ref)
        cfg.dset.test.ref_chars = ref_chars

    if cfg.dset.test.gen_chars is not None:
        cfg.dset.test.gen_chars = json.load(open(cfg.dset.test.gen_chars))

    args.result_dir = Path(args.result_dir)
    args.model = args.model.lower()

    if "dm" in args.model:
        from DM.models import Generator
        infer_func = infer_DM

        cfg.gen.n_comps = cfg.n_primals
        decomposition = load_decomposition(cfg.decomposition)

        infer_args = {
            "decomposition": decomposition
        }

    return args, cfg, Generator, infer_func, infer_args


def infer_DM(gen, save_dir, gen_chars, key_ref_dict, load_img, decomposition, batch_size=32, return_img=False):
    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)

    key_gen_dict = {k: gen_chars for k in key_ref_dict}

    outs = {}

    for key, gchars in key_gen_dict.items():
        (save_dir / key).mkdir(parents=True, exist_ok=True)
        gen.reset_dynamic_memory()

        ref_chars = key_ref_dict[key]
        ref_imgs = torch.stack([TRANSFORM(load_img(key, c))
                               for c in ref_chars]).cuda()
        ref_batches = torch.split(ref_imgs, batch_size)
        ref_chars = [ref_chars[i:i+batch_size]
                     for i in range(0, len(ref_chars), batch_size)]

        for batch, rchars in zip(ref_batches, ref_chars):
            decs = torch.LongTensor([decomposition[c] for c in rchars]).cuda()
            # This is okay because now we are playing with only one font.
            fids = [0] * len(decs)
            gen.encode_write(fids, decs, batch, reset_memory=False)
        for char in gchars:

            dec = torch.LongTensor([decomposition[char]]).cuda()
            fid = [0]
            out = gen.read_decode(fid, dec, reset_memory=False)[
                0].detach().cpu()
            if return_img:
                outs.setdefault(key, []).append(out)

            path = save_dir / key / f"{char}.png"
            save_tensor_to_image(out, path)

    return outs




def load_model(args, cfg, gen_model):
    g_kwargs = cfg.get('gen', {})
    gen = gen_model(**g_kwargs).cuda()
    weight = torch.load(args.weight)
    if "generator_ema" in weight:
        weight = weight["generator_ema"]
    gen.load_state_dict(weight)
    gen.eval()

    return gen


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("config_paths", nargs="+", help="path to config.yaml")
    parser.add_argument("--model", help="one of (DM, LF, MX, FUNIT)")
    parser.add_argument("--weight", help="path to weight to evaluate.pth")
    parser.add_argument("--result_dir", help="path to save the result file")
    parser.add_argument("--n_ref", type=int, default=None,
                        help="number of reference characters to use")
    parser.add_argument("--seed", type=int, default=1304,
                        help="path to save the result file")
    args, left_argv = parser.parse_known_args()
    args, cfg, gen_model, infer_func, infer_args = setup_eval_config(
        args, left_argv)
    gen = load_model(args, cfg, gen_model)

    random.seed(args.seed)

    data_dir = cfg.dset.test.data_dir
    extension = cfg.dset.test.extension
    ref_chars = cfg.dset.test.ref_chars
    key_ref_dict, load_img = load_reference(data_dir, extension, ref_chars)

    infer_func(gen=gen,
               save_dir=args.result_dir,
               gen_chars=cfg.dset.test.gen_chars,
               key_ref_dict=key_ref_dict,
               load_img=load_img,
               **infer_args)


if __name__ == "__main__":
    main()
