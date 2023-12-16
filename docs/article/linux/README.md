# Linux 指令

ubuntu下载地址 `https://www.releases.ubuntu.com/focal/`

## 1、常用命令

```sh
$ sudo   # 输入当前管理员用户密码，可以获得超级用户的权限，默认5分钟失效

$ sudo -i  # 将输入当前管理员用户密码可以进入root用户

$ sudo su # 输入当前用户密码，获取 root 权限

$ sudo passwd root # 启用并设置 root 用户密码

$ sudo passwd -l root # 禁用 root 用户

$ su # 输入 root 密码，进入 root 权限，输入 exit 返回用户权限

$ ps aux | less # 查看所有运行中的进程

$ ps aux|grep xxx # 搜索相关进程

$ sudo kill -s 9 xxx # 关闭进程

$ ps -U root -u root -N # 查看非root运行的进程

$ ps -x # 查看属于自己的进程

$ lsof -i:8080 # 查看端口占用

$ bash test.sh # 运行一个shell脚本

$ ./test.sh # 直接运行shell脚本

$ sudo ufw status # 查看防火墙状态

$ sudo ufw disable # 关闭防火墙

$ sudo ufw allow 80 # 开启防火墙指定端口

$ sudo chmod 777 文件路径 # 设置文件权限

$ sudo chmod +x xxx # 设置文件为可执行文件

$ sudo chown -R sanyer: /home/xxx # 设置目录的访问权限

$ ln 源文件 目标文件 # 创建软连接

$ ls # 查看目录文件列表

$ ls -a # 查看目录隐藏文件

$ ls -al # 查看目录文件列表以及软连接对应的地址

$ ls -al /proc/进程号/cwd # 查看进程号执行文件的路径

$ top # 查看cpu占用

$ top -Hp 4807 # 查看pid进程的cpu占用

$ free -h # 查看内存占用

$ watch -n 10 nvidia-smi # 10秒刷新一次，查看 nvidia 显卡显存占用

$ sudo reboot # 重启

$ cat /proc/version # 查看cpu型号

$ whereis xxx # 查看软件安装目录

$ ./xxxx & # 在可执行程序后面加入 & 符号，可以让程序在后台运行

$ vim ~/.bashrc # 编辑当前用户配置文件

$ source ~/.bashrc # 保存环境配置

$ sudo chown -R vvt: test(目录或目录路径) # 修改目录用户权限
```

## 2、服务命令

```sh
# 启动服务
systemctl start xxx.service

# 关闭服务
systemctl stop xxx.service

# 重启服务
systemctl restart xxx.service

# 显示服务状态
systemctl status xxx.service

# 开机启动服务
systemctl enable xxx.service

# 禁用开机启动服务
systemctl disable xxx.service

# 查看服务是否开机启动
systemctl is-enable xxx.service

# 重置服务列表
systemctl daemon-reload

# 查看已启动服务列表
systemctl list-unit-files|grep enabled

# 查看启动失败的服务列表
systemctl --failed

# 服务的路径
/etc/systemd/system/xxx.service
/usr/lib/systemd/system/xxx.service

# 软件源列表
/etc/apt/sources.list.d
```

## 3、官方默认镜像

默认官方源 source.list

```
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://archive.ubuntu.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://archive.ubuntu.com/ubuntu/ focal-proposed main restricted universe multiverse
```

github上面的答案

```
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

deb http://archive.canonical.com/ubuntu focal partner
deb-src http://archive.canonical.com/ubuntu focal partner
```

腾讯云内网source.list

```
deb http://mirrors.tencentyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://mirrors.tencentyun.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.tencentyun.com/ubuntu/ focal-proposed main restricted universe multiverse
```

阿里云内网source.list

```
deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-proposed main restricted universe multiverse
```

中科大源source.list

```
deb https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

清华源source.list

```
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

腾讯云source.list

```
deb https://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
```

参考：https://www.louishe.com/2021/12/08/doc-11364.html

## 4、常见问题

### 4.1 Linux:ln: 无法创建符号链接‘/usr/local/bin/node‘: 文件已存在

```
cd /usr/local/bin/
rm -rf node
# 重新建立连接
```

https://www.cnblogs.com/edisonfish/p/17304057.html