# 使用fastchat转换模型

```sh
git clone https://github.com/lm-sys/FastChat

cd FastChat/
pip3 install --upgrade pip
pip3 install -e .


```sh
python -m fastchat.model.apply_delta --base /home/xxx/models/llama-7b-hf --target /home/xxx/models/vicuna_weight --delta /home/xxx/models/vicuna-7b-delta-v1.1

# --base 是 llama 下载的初始模型
# --target 是转化后的权重目录
# --delta 是 vicuna 权重目录
```