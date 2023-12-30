# turn 部署

## 1、环境安装

```
sudo yum install -y make gcc cc gcc-c++ wget

sudo yum install -y openssl-devel libevent libevent-devel
```

unbutn 20.04 安装依赖：

```sh
sudo apt-get install libssl-dev libpq-dev pkg-config
```

生成签名

```
openssl req -x509 -newkey rsa:2048 -keyout ./turn_server_pkey.pem -out ./turn_server_cert.pem -days 99999 -nodes
```

## 2、turn 安装

turn github 地址： [https://github.com/coturn/coturn](https://github.com/coturn/coturn)

```
wget https://github.com/coturn/coturn/archive/refs/tags/4.6.2.tar.gz

tar -xvzf 4.6.2.tar.gz

cd coturn-4.6.2 && ./configure

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

复制出 turnserver.conf.default 为 turnserver.conf

```
cd /usr/local/etc/
cp turnserver.conf.default turnserver.conf
ifconfig
```

vim 编辑配置文件，shift+g 跳到最后一行加上以下内容

```conf
#与前 ifconfig 查到的网卡名称一致
relay-device=eth0
#内网IP
listening-ip=192.168.1.191
#内网IP
relay-ip=192.168.1.191
#公网IP
external-ip=xxx.xx.xx.xxx
relay-threads=50
min-port=49152
max-port=65535
#用户名密码，创建IceServer时用
user=用户名:密码
#一般与turnadmin创建用户时指定的realm一致
realm=xxx.com
#端口号
listening-port=3478
#不开启会报CONFIG ERROR: Empty cli-password, and so telnet cli interface is disabled! Please set a non empty cli-password!错误
cli-password=密码
#证书
cert=/etc/turn_server_cert.pem
pkey=/etc/turn_server_pkey.pem
```

必需配置的项：

```conf
external-ip=xxx.xx.xx.xxx
user=用户名:密码
cli-password=密码
#证书
cert=/etc/turn_server_cert.pem
pkey=/etc/turn_server_pkey.pem
```


### 4.2 开放 tcp 和 udp 端口

在防火墙开启 3478 端口

```
firewall-cmd --zone=public --add-port=3478/udp --permanent
firewall-cmd --zone=public --add-port=3478/tcp --permanent
firewall-cmd --reload
# 重启防火墙
systemctl restart firewalld.service
```

查看是否开启

```
firewall-cmd --zone=public --query-port=3478/tcp
firewall-cmd --zone=public --query-port=3478/udp
```

在腾讯云（阿里云）控制台把 tcp 和 udp 端口 49152-65535 放开（或者全部开放 1-65535 端口，或者只开放 3478 端口，默认 3478）

## 5、后台启动程序

```sh
turnserver -o -a -f -r xxx.com -c /usr/local/etc/turnserver.conf
```

查看是否在运行

```
ps -ef|grep turnserver
```

关闭程序

```
killall turnserver
```

参数说明：

- -L 监听的IP地址
- -p 监听端口
- -E 中继IP
- -X 公网/内网 映射配置
- --no-loopback-peers  不使用127.x.x.x，::1回路IP地址
- -m `<numbeer>`　　当前连接上的线程数，默认CPU个数
- --min-port   起始用的最小端口
- --max-port   最大端口号
- -o 以守护进程模式运行（后台运行）
- -f 使用指纹
- -a 长期验证机制
- -z 不进行验证，所有客户端均可访问
- -u 用户名：密码
- -r realm组别
- --check-origin-consistency 连续检测会话的属性值
- -q, --user-quota `<number>`  allocation配额
- -Q, --total-quota `<number>` 总配额值
- -s, --max-bps 带宽
- -B, --bps-capacity 总带宽容量
- -c 配置文件名称
- -b, --db, --userdb `<filename>`  数据库名
- -M, --mysql-userdb `<con-string>` mysql连接字符串
- --server-name　　服务名，默认同realm
- -n 不使用配置，全部使用命令行参数
- --cert PEM格式的证书
- --pkey PEM格式的私钥文件
- --pky-pwd 私钥的密码
- --no-udp 不提供UDP协议的服务
- --no-tcp 不提供TCP协议的服务
- --no-tls 不使用TLS服务
- --no-udp-relay　不使用UDP中继
- --no-tcp-relay　不使用TCP中继
- -l, --log-file,`<filename>` 指定日志文件
- --no-stdout-log 控制台不输出std-out格式的日志
- --syslog 使用系统日志
- --simple-log 使用建议日志记录，所有日志会覆盖之前对应日志文件的内容（日志文件同名）
- -S, --stun-only 只使用STUN服务
- --no-stun  不使用STUN服务
- --mobility 支持Mobility ICE（MICE specs）协议

## 6、启动服务

新建 turnserver.service

`vim /usr/lib/systemd/system/turnserver.service`

```conf
[Unit]
Description=turnserver for p2p
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/turnserver -o -a -f -r sanyer.top -c /usr/local/etc/turnserver.conf
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

命令：

- systemctl daemon-reload 重置服务列表
- systemctl start turnserver.service 启动服务
- systemctl restart turnserver.service 重启服务
- systemctl disable turnserver.service 关闭开机自启
- systemctl enable turnserver.service 开启开机自启
- systemctl status turnserver.service 查看状态

## 7、测试访问

[https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

输入 turn:你的域名:3478、账号、密码

addserver 后点下面的按钮

看到 relay 和你的公网 ip 表示 turn 服务连接成功

## 7、参考

https://www.cnblogs.com/NanKe-Studying/p/16010426.html

https://blog.csdn.net/qq_44938451/article/details/122158975

https://www.cnblogs.com/itshun/p/11605449.html

https://blog.csdn.net/tst116/article/details/62217782

https://juejin.cn/post/6999962039930060837

https://blog.csdn.net/qq_34732729/article/details/107605895