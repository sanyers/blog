# nginx 部署

## 1、Windows 环境

（1）安装

下载地址：`http://nginx.org/en/download.html`

（2）运行

将下载的.zip 文件解压到 D:/

打开命令行定位目录到 `D:\nginx-1.22.0`

然后执行启动命令 `start nginx.exe`

（3）nginx 常用命令

```
nginx -s stop   //停止nginx
nginx -s reload //重新加载nginx
nginx -s quit   //退出nginx
nginx -t //检查nginx.conf配置文件是否正确
```

## 2、linux 安装

### 2.1 centos6 安装

1、配置 yum 的 nginx 源

vi /etc/yum.repos.d/nginx.repo

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/6/$basearch/
gpgcheck=0
enabled=1
```

2、yum 安装

yum install nginx

3、启动 nginx 服务

service nginx start

4、修改 nginx 默认配置

vi /etc/nginx/conf.d/default.conf

nginx -t // 检查 nginx 配置文件

nginx -s reload

### 2.2 centos7 安装

1、添加源

sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

2、安装 Nginx

sudo yum install -y nginx

3、开启自动启动

```
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```

4、关于 centos7 不能启动 nginx，例如：重启 Nginx 出现 bind() to 0.0.0.0:8090 failed (13: Permission denied)

查看 http 允许访问的端口

`semanage port -l | grep http_port_t`

添加要启动的端口

`semanage port -a -t http_port_t -p tcp 8090`

5、安装 semanage

`yum install -y semanage`

如提示 No package semanage available.

改用 yum provides semanage

出现提示

policycoreutils-python-2.5-33.el7.x86_64 : SELinux policy core python utilities

Repo : base

Matched from:

Filename : /usr/sbin/semanage

执行 yum install -y policycoreutils-python.x86_64

6、关闭 SELinx，如果需要代理 websocket，可能会拦截

```
临时关闭
setenforce 0
永久关闭
vi /etc/selinux/config
将SELINUX=enforcing改为SELINUX=disabled 设置后需要重启才能生效
```

7、出现 nginx: [error] open() "/var/run/nginx.pid" failed (2: No such file or directory)

sudo nginx -c /etc/nginx/nginx.conf

### 2.2 ubuntu20.04 安装

```sh
sudo apt update
sudo apt install nginx

sudo systemctl status nginx
```