# turn 部署

## 1、环境安装

```
sudo yum install -y make gcc cc gcc-c++ wget

sudo yum install -y openssl-devel libevent libevent-devel
```

## 2、turn 安装

turn github 地址： [https://github.com/coturn/coturn](https://github.com/coturn/coturn)

```
wget http://turnserver.open-sys.org/downloads/v4.5.1.2/turnserver-4.5.1.2.tar.gz

tar -xvzf turnserver-4.5.1.2.tar.gz

cd turnserver-4.5.1.2 && ./configure

make

sudo make install
```

## 3、检查安装

测试是否安装成功，若有路径表示成功

```
which turnserver
```

## 4、配置 turn

### 4.1 配置 turnserver.conf

进入配置文件夹

```
cd /usr/local/etc/
```

复制出 turnserver.conf.default 为 turnserver.conf

```
cp turnserver.conf.default turnserver.conf
```

vim 编辑配置文件，shift+g 跳到最后一行加上以下内容

```
listening-ip=你的内网（ifconfig或去控制台查看）
relay-ip=你的内网
external-ip=你的外网
user=你的账号:你的密码
cli-password=你的密码（这个要加上，不然一会启动服务会报cli-password啥的）
listening-port=3478
min-port=49152
max-port=65535
```

### 4.2 开放 tcp 和 udp 端口

在防火墙开启 3478 端口

在腾讯云（阿里云）控制台把 tcp 和 udp 端口 49152-65535 放开（或者全部开放 1-65535 端口，或者只开放 3478 端口，默认 3478）

## 5、启动服务

```
turnserver -v -r 你的公网id:3478 -a -o -c /usr/local/etc/turnserver.conf
```

查看是否在运行

```
ps -ef|grep turnserver
```

## 6、测试访问

[https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

输入 turn:你的域名:3478、账号、密码

addserver 后点下面的按钮

看到 relay 和你的公网 ip 表示 turn 服务连接成功

## 7、参考

https://www.cnblogs.com/NanKe-Studying/p/16010426.html