# 本地部署NanoOWL

## 1、安装依赖

（1）安装 torch

```sh
wget https://developer.download.nvidia.cn/compute/redist/jp/v512/pytorch/torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
pip3 install torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl

# 或
pip3 install torch
```

（2）安装 tensorrt

```sh
pip3 install tensorrt
```

（3）安装 typing-extensions

```sh
# pip3 uninstall typing_extensions # 要安装4.4版本以上，
# 如果提示卸载失败，输入 pip3 show typing-extensions 找到库目录直接删除
# sudo rm -rf /usr/lib/python3/dist-packages/typing_extensions-3.7.4.1.egg-info
pip3 install typing_extensions==4.7.1 -i https://mirror.sjtu.edu.cn/pypi/web/simple
```

（4）安装 torch2trt

```sh
git clone https://github.com/NVIDIA-AI-IOT/torch2trt
cd torch2trt
python3 setup.py install
```

```sh
pip3 install transformers timm accelerate onnx aiohttp -i https://mirror.sjtu.edu.cn/pypi/web/simple
```

（5）安装 nanoowl

```sh
git clone https://github.com/NVIDIA-AI-IOT/nanoowl
cd nanoowl
python3 setup.py develop
ls /dev/video* # 查看视频设备
```

（6）安装 clip

```sh
pip3 install ftfy regex tqdm -i https://mirror.sjtu.edu.cn/pypi/web/simple
pip3 install git+https://github.com/openai/CLIP.git
```

## 2、为 OWL-ViT 视觉编码器构建 TensorRT 引擎

```sh
python3 -m nanoowl.build_image_encoder_engine data/owl_image_encoder_patch32.engine
```

注意：我在源码中未找到 `data/owl_image_encoder_patch32.engine` 文件，之后通过安装 [docker nanoowl](https://www.jetson-ai-lab.com/tutorial_nanoowl.html)，才找到这个文件并将复制 data 目录

## 3、模型下载和配置

```sh
mkdir owlvit-base-patch32
git clone https://huggingface.co/google/owlvit-base-patch32
```

修改模型地址：`nanoowl/owl_predictor.py` 第 157 行

```py
self.model = OwlViTForObjectDetection.from_pretrained(model_name).to(self.device).eval()
self.processor = OwlViTProcessor.from_pretrained(model_name)

# 修改为
self.model = OwlViTForObjectDetection.from_pretrained('./owlvit-base-patch32/').to(self.device).eval()
self.processor = OwlViTProcessor.from_pretrained('./owlvit-base-patch32/')
```

## 4、运行示例

```sh
cd examples/tree_demo
python3 tree_demo.py ../../data/owl_image_encoder_patch32.engine

# 重启相机服务
sudo systemctl restart nvargus-daemon
```

## 4、打开实时相机

### 4.1 CSI 相机

```py
def gstreamer_pipeline(
    sensor_id=0,
    width=1280,
    height=720,
    framerate=30,
    flip_method=0,
    ):
    return (
        "nvarguscamerasrc sensor-id=%d !"
        "video/x-raw(memory:NVMM), width=(int)%d, height=(int)%d, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id,
            width,
            height,
            framerate,
            flip_method,
            width,
            height,
            )
        )
camera = cv2.VideoCapture(gstreamer_pipeline(sensor_id=0),cv2.CAP_GSTREAMER)
```

### 4.2 USB 相机

```py
camera = cv2.VideoCapture(0) # 0-9
```

## 5、参考

[教程 - NanoOWL](https://www.jetson-ai-lab.com/tutorial_nanoowl.html)

[jetson-containers](https://github.com/dusty-nv/jetson-containers)

[nanoowl](https://github.com/NVIDIA-AI-IOT/nanoowl)

[nanosam](https://github.com/NVIDIA-AI-IOT/nanosam)

[trt_pose](https://github.com/NVIDIA-AI-IOT/trt_pose)

[torch2trt](https://github.com/NVIDIA-AI-IOT/torch2trt)

[transformers](https://huggingface.co/docs/transformers/v4.35.0/en/main_classes/model#transformers.PreTrainedModel.from_pretrained)

[owlvit-base-patch32](https://huggingface.co/google/owlvit-base-patch32)

[jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)