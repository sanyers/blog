# V2Ray搭建

## 1、服务端搭建

系统支持：Ubuntu，Debian，CentOS，推荐使用 Ubuntu 22，谨慎使用 CentOS，脚本可能无法正常运行！

```
bash <(wget -qO- -o- https://git.io/v2ray.sh)
```

输入命令 `v2ray` 管理面板

## 2、客户端使用

### 2.1 windows 上使用

下载地址：

[v2rayN](https://github.com/2dust/v2rayN/releases/latest)，然后选择 v2rayN-Core.zip 下载

[v2rayA](https://github.com/v2rayA/v2rayA/releases)

启动客户端后，然后配置win10系统代理，就可以全局使用

在客户端内开启局域网使用，然后手机端 -> 设置 -> wifi -> http 代理 -> 填写客户端电脑ip地址+端口（该方法仅可在局域网内使用，andorid和ios都可以连接无需安装app）

### 2.2 linux 上使用

（1）安装 V2Ray 内核

```sh
curl -Ls https://mirrors.v2raya.org/go.sh | sudo bash
# 安装后可以关掉服务
sudo systemctl disable v2ray
```

（2）安装 v2rayA

```sh
# 添加公钥
wget -qO - https://apt.v2raya.mzz.pub/key/public-key.asc | sudo apt-key add -

# 添加 V2RayA 软件源
echo "deb https://apt.v2raya.mzz.pub/ v2raya main" | sudo tee /etc/apt/sources.list.d/v2raya.list

# 更新软件源
sudo apt update

# 安装 V2RayA
sudo apt install v2raya
```

（3）启动、自动启动 v2rayA

```sh
# 启动
sudo systemctl start v2raya.service

# 设置自动启动
sudo systemctl enable v2raya.service
```

（4）设置 v2raya

通过 2017 端口 如 `http://localhost:2017` 访问 UI 界面。

在第一次进入页面时，你需要创建一个管理员账号，请妥善保管你的用户名密码，如果遗忘，使用 `sudo v2raya --reset-password` 命令重置。

（5）连接 v2ray 服务器

打开 `http://localhost:2017` 网站，点击 `导入`，输入 vmess 地址后，列表出现该服务器选项，选择该服务器，然后点击左上角启动，当提示 `正在运行` 则表示代理服务器已启动，使用 `lsof -i:1080` 查看端口是否已启动。

（6）docker 安装

```
docker run -d \
  -p 2017:2017 \
  -p 20170-20172:20170-20172 \
  --restart=always \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2ray
```

### 2.3 Android 上使用

[v2rayNG](https://github.com/2dust/v2rayNG/releases)

[Google Play](https://play.google.com/store/apps/details?id=com.v2ray.ang)

[v2flyNG](https://github.com/2dust/v2flyNG/releases)

[Google Play v2flyNG](https://play.google.com/store/apps/details?id=com.v2ray.v2fly)

### 2.4 iOS 上使用

虽然 V2Ray 官方没有 iOS 客户端，但是有第三方客户端，例如 kitsunebi，shadowrocket，Pepi (ShadowRay)

https://233v2.com/post/11/

## 3、参考

https://zhuanlan.zhihu.com/p/414998586

https://v2raya.org/

https://github.com/v2rayA/v2rayA

https://github.com/233boy/v2ray/wiki