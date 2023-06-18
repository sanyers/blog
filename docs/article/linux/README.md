# Linux 指令

## 常用命令

```sh
$ sudo   # 输入当前管理员用户密码，可以获得超级用户的权限，默认5分钟失效

$ sudo -i  # 将输入当前管理员用户密码可以进入root用户

$ sudo su # 输入当前用户密码，获取 root 权限

$ sudo passwd root # 设置 root 用户密码

$ su # 输入 root 密码，进入 root 权限，输入 exit 返回用户权限

$ ps aux | less # 查看所有运行中的进程

$ ps -U root -u root -N # 查看非root运行的进程

$ ps -x # 查看属于自己的进程

$ bash test.sh # 运行一个shell脚本

$ ./test.sh # 直接运行shell脚本

$ sudo ufw status # 查看防火墙状态

$ sudo ufw disable # 关闭防火墙

$ sudo ufw allow 80 # 开启防火墙指定端口
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

# 查看已启动服务列表
systemctl list-unit-files|grep enabled

# 查看启动失败的服务列表
systemctl --failed
```

## Linux:ln: 无法创建符号链接‘/usr/local/bin/node‘: 文件已存在

```
cd /usr/local/bin/
rm -rf node
# 重新建立连接
```