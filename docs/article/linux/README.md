# Linux 指令

## 常用命令

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

$ ln 源文件 目标文件 # 创建软连接

$ ls # 查看目录文件列表

$ ls -a # 查看目录隐藏文件

$ ls -al # 查看目录文件列表以及软连接对应的地址

$ ls -al /proc/进程号/cwd # 查看进程号执行文件的路径

$ top # 查看cpu占用

$ top -Hp 4807 # 查看pid进程的cpu占用

$ sudo reboot # 重启

$ cat /proc/version # 查看cpu型号

$ whereis xxx # 查看软件安装目录

$ ./xxxx & # 在可执行程序后面加入 & 符号，可以让程序在后台运行
```

## 服务命令

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

## Linux:ln: 无法创建符号链接‘/usr/local/bin/node‘: 文件已存在

```
cd /usr/local/bin/
rm -rf node
# 重新建立连接
```

https://www.cnblogs.com/edisonfish/p/17304057.html