# frp内网穿透

## 1、下载frp

[https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)

下载包里已经包含server和client，以及它们的配置文件

## 2、以服务运行

### 2.1 服务端

`vim /usr/lib/systemd/system/frps.service`

```ini
[Unit]
# 服务名称，可自定义
Description = frps server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /root/frp/frps -c /root/frp/frps.ini

[Install]
WantedBy = multi-user.target
```

- systemctl daemon-reload 重置服务列表
- systemctl start frps.service 启动服务
- systemctl enable frps.service 开启开机自启

### 2.2 客户端

`vim /etc/systemd/system/frpc.service`

```ini
[Unit]
# 服务名称，可自定义
Description = frpc server
After=network.target network-online.target
Requires=network-online.target

[Service]
Type = simple
User=root
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /root/frp/frpc -c /root/frp/frpc.ini
Restart=always
RestartSec=300 # 300s 间隔
StartLimitInterval=0 # 无限制重启次数

[Install]
WantedBy = multi-user.target
```

- systemctl daemon-reload 重置服务列表
- systemctl start frpc.service 启动服务
- systemctl enable frpc.service 开启开机自启

## 3、映射 web 站点

在局域网内的站点发布到公网

1. 服务端

修改 frps.ini 文件，设置监听 HTTP 请求端口为 8080

```conf
[common]
bind_port = 7000
vhost_http_port = 8080
```

https 代理的话需要配置 `vhost_https_port`

2. 客户端

修改 frpc.ini 文件，假设 frps 所在的服务器的 IP 为 x.x.x.x，local_port 为本地机器上 Web 服务监听的端口, 绑定自定义域名为 custom_domains。

```conf
[common]
server_addr = x.x.x.x
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.yourdomain.com

[web2]
type = http
local_port = 8080
custom_domains = www.yourdomain2.com
```

注意：`[web]` `[web2]` 不能重复

3. 分别启动 frps 和 frpc

4. 将 `www.yourdomain.com` 和 `www.yourdomain2.com` 的域名 A 记录解析到 IP `x.x.x.x`，如果服务器已经有对应的域名，也可以将 CNAME 记录解析到服务器原先的域名。或者可以通过修改 HTTP 请求的 Host 字段来实现同样的效果。

5. 通过浏览器访问 `http://www.yourdomain.com:8080` 即可访问到处于内网机器上 80 端口的服务，访问 `http://www.yourdomain2.com:8080` 则访问到内网机器上 8080 端口的服务。

## 4、参考

https://gofrp.org/docs/examples/vhost-http/

https://www.cnblogs.com/JasonCeng/p/14375087.html

https://blog.csdn.net/qq_36981760/article/details/115713179