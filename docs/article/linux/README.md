# Linux 指令

## 常用命令

```sh
$ sudo   # 输入当前管理员用户密码，可以获得超级用户的权限，默认5分钟失效

$ sudo -i  # 将输入当前管理员用户密码可以进入root用户

$ sudo su # 输入当前用户密码，获取 root 权限

$ sudo passwd root # 设置 root 用户密码

$ su # 输入 root 密码，进入 root 权限，输入 exit 返回用户权限

```
## Linux:ln: 无法创建符号链接‘/usr/local/bin/node‘: 文件已存在

```
cd /usr/local/bin/
rm -rf node
# 重新建立连接
```