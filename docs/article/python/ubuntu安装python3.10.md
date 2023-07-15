# ubuntu安装python3.10

Ubuntu 20.04 LTS 默认 Python 版本为3.8.10

## 1、卸载旧版本的python

```
sudo apt-get remove python3.8
# 删除依赖
sudo apt-get remove --auto-remove python3.8
```

## 2、安装新版本

```sh
# 下载
wget https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz

# 解压
tar -zxvf Python-3.10.12.tgz
cd Python-3.10.12

# 创建软件安装目录
sudo mkdir -p /usr/local/python3.10

# 配置
./configure --prefix=/usr/local/python3.10 --enable-opimizations

# 安装
sudo make
sudo make install

# 删除之前的软链接
sudo rm -rf /usr/bin/python
sudo rm -rf /usr/bin/python3
sudo rm -rf /usr/bin/python3.8

sudo rm -rf /usr/bin/pip
sudo rm -rf /usr/bin/pip3
sudo rm -rf /usr/bin/pip3.8

# 创建软链接
sudo ln -s /usr/local/python3.10/bin/python3.10 /usr/bin/python
sudo ln -s /usr/local/python3.10/bin/pip3.10 /usr/bin/pip

# 查看版本
python -V
pip -V
```
