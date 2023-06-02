# 本地部署 ChatGLM-6b

ChatGLM-6B 是一个开源的、支持中英双语的对话语言模型。基于 General Language Model (GLM) 架构，具有 62 亿参数。结合模型量化技术，用户可以在消费级的显卡上进行本地部署（INT4 量化级别下最低只需 6GB 显存）。

从零环境开始配置

## 1、安装 python

https://www.python.org/downloads/windows/

## 2、下载代码

`git clone https://github.com/THUDM/ChatGLM-6B`

安装依赖

`pip install -r requirements.txt -i https://mirror.sjtu.edu.cn/pypi/web/simple`

## 3、安装 Pytorch(GPU版)

检查是否启用GPU

```py
import torch
print(torch.__version__)   #显示Pytorch版本
print(torch.cuda.is_available()) #返回False为版本不匹配，报该错误；返回Ture，解决问题
```

### 3.1 安装 CUDA

查看 NVIDIA 控制面板 => 系统信息 => 驱动程序版本 => 511.81

查看 NVIDIA 对应 CUDA 的版本 [地址](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html)

[下载地址](https://developer.nvidia.com/cuda-toolkit-archive)

新建 cmd 命令查看是否安装成功：`nvcc -V`，如果没有还需要配置环境变量

`C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6\bin`

### 3.2 下载 cuDNN

需要注册 NVIDIA 账号

[下载地址](https://developer.nvidia.com/rdp/cudnn-archive)

下载完成后解压里面的文件夹后复制到对应的 CUDA 中：

复制 /bin 下的文件 到 `\CUDA\v11.6\bin`

复制 /lib/x64 下的文件 到 `\CUDA\v11.6\lib\x64`

复制 /include 下的文件 到 `\CUDA\v11.6\include`

### 3.3 安装 Pytorch

如果已安装还需要卸载 `pip uninstall torch`

pytorch 网站 https://pytorch.org/get-started/locally/#windows-anaconda

然后再运行命令

```py
import torch
print(torch.__version__)   #显示Pytorch版本
print(torch.cuda.is_available()) #返回False为版本不匹配，报该错误；返回Ture，解决问题
```

## 4、安装 TDM-GCC (CPU上运行)

[下载地址](https://jmeubank.github.io/tdm-gcc/)

安装 TDM-GCC 时勾选 openmp

## 5、安装 Git LFS

Git LFS 用于下载大文件

[下载地址](https://docs.github.com/zh/repositories/working-with-files/managing-large-files/installing-git-large-file-storage)

https://git-lfs.com/

## 6、配置模型

下载模型实现 `git clone https://huggingface.co/THUDM/chatglm-6b`

单独下载模型 https://cloud.tsinghua.edu.cn/d/674208019e314311ab5c/

可在更目录下创建 chatglm-6b 或其他模型目录

然后配置模型目录：

```py
tokenizer = AutoTokenizer.from_pretrained("chatglm-6b-int4", trust_remote_code=True) # chatglm-6b-int4 为模型目录
# model = AutoModel.from_pretrained("chatglm-6b", trust_remote_code=True).half().cuda() # 使用GPU
model = AutoModel.from_pretrained("chatglm-6b-int4",trust_remote_code=True).float() # 使用CPU
```

## 7、运行

`python web_demo.py`

<div class="img-page">
<a data-fancybox title="web-demo" href="/blog/img/article/python/1.png"><img :src="$withBase('/img/article/python/1.png')" alt="web-demo"></a>
</div>

## 8、参考

https://github.com/THUDM/ChatGLM-6B

https://www.heywhale.com/mw/project/6436d82948f7da1fee2be59e

https://huggingface.co/THUDM

https://blog.csdn.net/moyong1572/article/details/119438286

https://blog.csdn.net/qq_46941656/article/details/119701547

https://blog.csdn.net/sinat_24948419/article/details/105532537

https://zhuanlan.zhihu.com/p/479848495

https://zhuanlan.zhihu.com/p/535100411