# 本地部署minigpt4

## 1、下载代码

代码地址 [MiniGPT-4](https://github.com/Vision-CAIR/MiniGPT-4)

## 2、下载模型

[vicuna-7b](https://huggingface.co/Vision-CAIR/vicuna-7b/tree/main)

配置模型位置，修改配置文件 `minigpt4\configs\models\minigpt4_vicuna0.yaml`，第 18 行修改 `llama_model` 地址

## 3、下载模型检查点

[vicuna-7b检查点](https://drive.google.com/file/d/1RY9jV0dyqLX-o38LrumkKRh6Jtaop58R/view?usp=sharing)

配置检查点位置，修改配置文件 `\eval_configs\minigpt4_eval.yaml`，第 8 行修改 `ckpt` 地址

## 4、配置环境

### 4.1 安装 conda

`wget https://mirrors.bfsu.edu.cn/anaconda/archive/Anaconda3-2023.09-0-Linux-x86_64.sh --no-check-certificate`

### 4.2 创建虚拟环境

```sh
conda create -n minigpt4 python=3.8 # cuda 11.4 使用 python=3.8
conda activate minigpt4 # 进入虚拟环境
```

### 4.3 安装pip依赖库

进入虚拟环境后，开始安装pip依赖库

创建 requirements.txt 文件，输入如下内容：

```
torchaudio
huggingface-hub==0.18.0
matplotlib==3.7.0
psutil==5.9.4
iopath
pyyaml==6.0
regex==2022.10.31
tokenizers==0.13.2
tqdm==4.64.1
transformers==4.30.0
timm==0.6.13
webdataset==0.2.48
omegaconf==2.3.0
opencv-python==4.7.0.72
peft==0.2.0
sentence-transformers
gradio==3.47.1
accelerate==0.20.3
wandb
```

输入命令开始安装：`pip install -r requirements.txt -i https://mirror.sjtu.edu.cn/pypi/web/simple`

单独安装的库：

- torch==2.1.0 (arm平台需要单独下载安装)
- scikit-image
- visual_genome

编译安装的库：

- torchvision (arm平台需要编译并安装)
- decord==0.6.0 (arm平台需要编译并安装)
- bitsandbytes==0.37.0 (arm平台需要安装)

安装 decord：（arm orin）

```sh
sudo apt-get update
sudo apt-get install libjpeg-dev zlib1g-dev libpython3-dev libopenblas-dev libavcodec-dev libavformat-dev libswscale-dev ffmpeg libavfilter-dev libavutil-dev

# 下载 decord 编译
git clone --recursive https://github.com/dmlc/decord
cd decord
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release

make
cd ../python
python3 setup.py install --user
```

安装 bitsandbytes：（orin）

```sh 
# pip install bitsandbytes orin 系统会报错
# git clone https://github.com/timdettmers/bitsandbytes.git #官方链接存在问题无法编译
git clone https://github.com/g588928812/bitsandbytes_jetsonX
cd bitsandbytes
CUDA_VERSION=114 make cuda11x  # 切少文件解决参见https://blog.csdn.net/xwb_12340/article/details/130268747
# pip3 uninstall bitsandbytes #卸载之前安装的错误版本
sudo python3 setup.py install
```

安装 torch：（orin）

```sh
wget https://developer.download.nvidia.cn/compute/redist/jp/v512/pytorch/torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
pip3 install torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
```

安装 torchvision：（orin）

```sh
git clone -b v0.16.0 https://github.com/pytorch/vision torchvision
cmake ..
make
python3 setup.py install --user
```

## 5、添加 swap 虚拟内存

如果内存不足可以添加 swap 虚拟内存

方法一：

```sh
# 创建 swap 分区
mkdir /swap
dd if=/dev/zero of=/swap/swapfile bs=1M count=1024

mkswap /swap/swapfile  # 建立swap的文件系统
chmod 600 /swap/swapfile  # 修改权限

swapon /swap/swapfile  #启用swap文件

# 使系统开机时自启用，在文件/etc/fstab中添加一行
/swap/swapfile swap swap defaults 0 0

# 查看当前交换分区路径
swapon -s

#查看当前内存使用情况
free -mt
```

方法二：

```sh
# 1、以root身份进入控制台（登录系统），停止所有的swap分区
swapoff -a

# 2、对新添加磁盘进行分区 用fdisk命令（例：# fdisk /dev/sdb）对磁盘进行分区，添加swap分区，新建分区，在fdisk中用“t”命令将新添的分区id改为82（Linux swap类型），最后用w将操作实际写入硬盘（没用w之前的操作是无效的）。

# 3、格式化swap分区 这里的sdb2要看您加完后p命令显示的实际分区设备名
mkswap /dev/sdb2

# 4、启动新的swap分区
swapon /dev/sdb2

# 5、为了让系统启动时能自动启用这个交换分区，可以编辑/etc/fstab,加入下面一行
/dev/sdb2 swap swap defaults 0 0
```

## 6、配置 huggingface transformers 使用本地模型

设置环境变量

```sh
export HF_DATASETS_OFFLINE=1
export TRANSFORMERS_OFFLINE=1
```

修改模型的 `config.json` 文件 `_name_or_path` 地址改为模型地址

## 7、配置 bert-base-uncased 模型

`git clone https://huggingface.co/bert-base-uncased/tree/main`

修改文件 `\minigpt4\models\minigpt4.py` 第 89 行：

``` 
encoder_config = BertConfig.from_pretrained("bert-base-uncased") # 改为本地 bert-base-uncased 模型地址
```

## 8、启动配置

修改 `demo.py` 文件：

`demo.launch(server_name='0.0.0.0', share=True, enable_queue=True)`

启动之前可以查看运行状态：`jtop`

启动命令：

```sh
# 对于 MiniGPT-v2，运行
python demo_v2.py --cfg-path eval_configs/minigptv2_eval.yaml  --gpu-id 0

# 对于 MiniGPT-4（Vicuna 版本），运行
python demo.py --cfg-path eval_configs/minigpt4_eval.yaml  --gpu-id 0

# 对于 MiniGPT-4（Llama2 版本），运行
python demo.py --cfg-path eval_configs/minigpt4_llama2_eval.yaml  --gpu-id 0
```

运行后提示 `Running on local URL:  http://0.0.0.0:7860` 表示已成功启动

## 9、常见问题

### 9.1 gradio frpc_linux 问题

提示如下：

```
Could not create share link. Missing file: /home/vvt/anaconda3/envs/minigpt4/lib/python3.8/site-packages/gradio/frpc_linux_aarch64_v0.2. 

Please check your internet connection. This can happen if your antivirus software blocks the download of this file. You can install manually by following these steps: 

1. Download this file: https://cdn-media.huggingface.co/frpc-gradio-0.2/frpc_linux_aarch64
2. Rename the downloaded file to: frpc_linux_aarch64_v0.2
3. Move the file to this location: /home/xxx/anaconda3/envs/minigpt4/lib/python3.8/site-packages/gradio
```

下载文件 `https://github.com/lvyufeng/frpc-gradio` `frpc_linux_arm64` 重命名为 `frpc_linux_aarch64_v0.2`，并复制到目录

### 9.2 bitsandbytes 库报错：libbitsandbytes_cpu.so: undefined symbol: cget_col_row_stats

```
AttributeError: /xxx/.conda/envs/luxuntest/lib/python3.8/site-packages/bitsandbytes/libbitsandbytes_cpu.so: undefined symbol: cget_col_row_stats
```

将 libbitsandbytes_cpu.so 替换成 GPU 的 so

```
cd /home/xxx/.conda/envs/xxx/lib/python3.x/site-packages/bitsandbytes
cp libbitsandbytes_cuda1xx.so libbitsandbytes_cpu.so
```

具体使用哪个版本的 _cudaxxx.so 根据 torch_gpu 对应的 cuda 版本而定

## 10、jeson orin nx 运行 minigpt4

[参考地址](https://www.jetson-ai-lab.com/tutorial_minigpt4.html)

运行命令：

```sh
# 1、下载 jetson-containers 代码
git clone https://github.com/dusty-nv/jetson-containers
cd jetson-containers
sudo apt update; sudo apt install -y python3-pip
pip3 install -r requirements.txt

# 2、设置可执行文件
sudo chmod +x autotag
sudo chmod +x run.sh

# 3、复制大模型文件到 data 目录
./data/models/huggingface/datasets--maknee--ggml-vicuna-v0-quantized/snapshots/1d8789f34eb803bf52daf895c7ecfd2559cf5ccc/ggml-vicuna-7B-v0-q5_k.bin
./data/models/huggingface/datasets--maknee--minigpt4-7b-ggml/snapshots/79340163b5a9a37908610cc71a7e1dd3c7f77889/minigpt4-7B-f16.bin

# 4、运行
# 加载指定模型
./run.sh dustynv/minigpt4:r35.4.1 /bin/bash -c 'cd /opt/minigpt4.cpp/minigpt4 && python3 webui.py $(huggingface-downloader --type=dataset maknee/minigpt4-7b-ggml/minigpt4-7B-f16.bin) $(huggingface-downloader --type=dataset maknee/ggml-vicuna-v0-quantized/ggml-vicuna-7B-v0-q5_k.bin)'
# 或
./run.sh $(./autotag minigpt4) /bin/bash -c 'cd /opt/minigpt4.cpp/minigpt4 && python3 webui.py $(huggingface-downloader --type=dataset maknee/minigpt4-7b-ggml/minigpt4-7B-f16.bin) $(huggingface-downloader --type=dataset maknee/ggml-vicuna-v0-quantized/ggml-vicuna-7B-v0-q5_k.bin)'docker

# 5、提示 huggingface 连接失败，可以使用科学上网，提示 ggml-vicuna-7B-v0-q5_k.bin 等数据集下载失败，可以修原始 docker
```

修改原始 docker

```sh
# 进入原生镜像并创建一个新的容器，修改里面的 /usr/local/bin/_huggingface-downloader.py 文件
sudo docker run -it --entrypoint /bin/bash dustynv/minigptr：35.4.1
# root@cf8d8bb1bb76 @ 后面就是新容器id
# 新容器可能需要安装vim
apt update
apt install vim
vim /usr/local/bin/_huggingface-downloader.py

# 第 56 行 repo_path = hf_hub_download 修改为：
if filename == 'minigpt4-7B-f16.bin':
    repo_path = '/data/models/huggingface/datasets--maknee--minigpt4-7b-ggml/snapshots/79340163b5a9a37908610cc71a7e1dd3c7f77889/minigpt4-7B-f16.bin'
else:
    repo_path = '/data/models/huggingface/datasets--maknee--ggml-vicuna-v0-quantized/snapshots/1d8789f34eb803bf52daf895c7ecfd2559cf5ccc/ggml-vicuna-7B-v0-q5_k.bin'

# 将容器保存为镜像
sudo docker commit cf8d8bb1bb76(容器id) dustynv/minigpt4:r35.4.3(新镜像名称:tag)
sudo docker images
sudo docker ps -a
```

[参考](https://github.com/dusty-nv/jetson-containers/tree/master/packages/llm/minigpt4)