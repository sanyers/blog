# ubuntu设置代理

## 1、GUI设置方式

`设置 > 网络 > 网络代理 > 手动（Settings > Network > Network Proxy > Manual）`

测试方式：打开浏览器访问 google.com 即可

## 2、apt包设置代理

```sh
sudo vim /etc/apt/apt.conf.d/80proxy

Acquire::http:proxy "http://192.168.0.101:8080";
Acquire::https:proxy "https://192.168.0.101:8080";
Acquire::ftp:proxy "ftp://192.168.0.101:8080";
```

## 3、wget 及命令行设置代理

```sh
vim ~/.bashrc

use_proxy=on
http_proxy=http://192.168.0.101:8080
https_proxy=http://192.168.0.101:8080
ftp_proxy=http://192.168.0.101:8080

source ~/.bashrc

# 测试
wget www.google.com
```

## 4、临时配置代理

```bash
export http_proxy=http://192.168.0.101:8080
export https_proxy=http://192.168.0.101:8080

export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"

export ALL_PROXY=socks5://127.0.0.1:1080
```