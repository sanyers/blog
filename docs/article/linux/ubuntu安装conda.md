# Ubuntu 安装 conda

## 1、下载 Anaconda

可以查看[镜像版本](https://repo.anaconda.com/archive/)

`wget https://mirrors.bfsu.edu.cn/anaconda/archive/Anaconda3-2023.09-0-Linux-x86_64.sh --no-check-certificate`

## 2、安装 Anaconda

`bash Anaconda3-2023.09-0-Linux-x86_64.sh`

（1）按照提示，回车后查看许可证，按 q 退出许可证，然后输入 yes 表示同意

（2）确认安装的路径，一般直接回车安装在默认的 `/home/你的名字/anaconda3`

（3）输入 yes 来确认使用 conda init 来启动

## 3、启动环境变量

`source ~/.bashrc`

需要启动已经修改环境变量，这时候会发现命令行出现了 (base)

## 4、升级 conda

如果当前安装后，不是最新版本，可以通过以下命令升级

`conda update -n base -c defaults conda`

## 5、创建虚拟环境

```sh
# 根据 yml 文件创建
conda env create -f environment.yml

# 直接创建(创建名为 testconda 的虚拟环境，python 版本为 3.9)
conda create -n testconda python=3.9
```

environment.yml 文件格式：

```yml
name: minigptv
channels:
  - pytorch
  - defaults
  - anaconda
  - conda-forge
dependencies:
  - python=3.9.10
  - cudatoolkit
  - pip=22.1.2
  - pip:
    - torch==2.0.0
    - torchaudio
    - torchvision
    - huggingface-hub==0.18.0
    - matplotlib==3.7.0
    - psutil==5.9.4
    - iopath
    - pyyaml==6.0
    - regex==2022.10.31
    - tokenizers==0.13.2
    - tqdm==4.64.1
    - transformers==4.30.0
    - timm==0.6.13
    - webdataset==0.2.48
    - omegaconf==2.3.0
    - opencv-python==4.7.0.72
    - decord==0.6.0
    - peft==0.2.0
    - sentence-transformers
    - gradio==3.47.1
    - accelerate==0.20.3
    - bitsandbytes==0.37.0
    - wandb
```

输入 y 并回车后，开始下载并创建

## 6、常用命令

```sh
# 切换到 base
source ~/anaconda3/bin/activate

# 激活并进入虚拟环境
conda activate xxx

# 添加 python 模块(首先一定要装的是 ipython)
conda install ipython

conda install pandas
conda install xgboost

# 退出虚拟环境
conda deactivate xxx

# 删除虚拟环境
conda remove -n xxx --all

# 查看安装了哪些包
conda list

# 安装包
conda install package_name(包名)
conda install scrapy==1.3 # 安装指定版本的包
conda install -n 环境名 包名 # 在conda指定的某个环境中安装包

# 查看当前存在哪些虚拟环境
conda env list 
# 或 
conda info -e
# 或
conda info --envs

# 检查更新当前 conda
conda update conda
 
#更新 anaconda
conda update anaconda
 
# 更新所有库
conda update --all
 
# 更新python
conda update python

# 查看版本
conda -V
```

## 7、卸载

```sh
# 删除整个 anaconda 目录
rm -rf ~/anaconda

# 删除 .bashrc 中的 Anaconda 路径
vim ~/.bashrc
source ~/.bashrc
```

## 8、参考

https://zhuanlan.zhihu.com/p/459607806