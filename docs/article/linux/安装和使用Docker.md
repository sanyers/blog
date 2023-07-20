# 安装和使用 Docker

## 1、在 Ubuntu 20.04 上安装 Docker

更新软件包索引，并且安装必要的依赖软件，来添加一个新的 HTTPS 软件源：

```
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

使用下面的 curl 导入源仓库的 GPG key：

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

将 Docker APT 软件源添加到你的系统：

```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 1.1 安装 Docker 最新版本

```
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

### 1.2 安装指定版本

```
sudo apt update
apt list -a docker-ce

sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
```

一旦安装完成，Docker 服务将会自动启动。你可以输入下面的命令，验证它：

```
sudo systemctl status docker
```

### 1.3 更新 Docker

```
sudo apt update && sudo apt upgrade
# 阻止 Docker 自动更新
sudo apt-mark hold docker-ce
```

## 2、以非 Root 用户身份执行 Docker

默认情况下，只有 root 或者 有 sudo 权限的用户可以执行 Docker 命令。

想要以非 root 用户执行 Docker 命令，你需要将你的用户添加到 Docker 用户组，该用户组在 Docker CE 软件包安装过程中被创建。想要这么做，输入：

```
sudo usermod -aG docker $USER
```

`$USER`是一个环境变量，代表当前用户名。

登出，并且重新登录，以便用户组会员信息刷新。

## 3、验证 Docker

```
docker container run hello-world
```

如果本地没有该镜像，这个命令将会下载测试镜像，在容器中运行它，打印出 “Hello from Docker”，并且退出。

这个容器将会在打印消息后停止运行，因为它没有任何长期运行的进程。

## 4、卸载 Docker

在卸载 Docker 之前，你最好 移除所有的容器，镜像，卷和网络。

运行下面的命令停止所有正在运行的容器，并且移除所有的 docker 对象：

```
docker container stop $(docker container ls -aq)
docker system prune -a --volumes
```

现在你可以使用apt像卸载其他软件包一样来卸载 Docker：

```
sudo apt purge docker-ce
sudo apt autoremove
```

## 5、其他命令

```sh
# 查看版本
docker --version

# 查看实例
docker ps

# 启动、重启、停止docker服务
sudo systemctl docker start|restart|stop

# 启动、重启、停止镜像
docker start|restart|stop [name]

# 删除镜像
docker rm -f [name]
# 强制删除
docker rmi -f [name]:[tag]

# 查看docker运行状态
docker stats

# 进入容器内部
docker exec -it xxx /bin/bash

# 在 docker 内使用 sudo 命令，提示 bash: sudo: command not found，安装 sudo
apt-get update
apt-get install sudo

# 启动容器
sudo docker run -d -p 8888:80 -p 222:22 --name nextcloud2 --restart always new_nextcloud:001

# 基于已有容器创建镜像
sudo docker commit [选项] 容器id/名称 仓库名称:[标签]
# 例如：
sudo docker commit nextcloud new_nextcloud:001

# 将镜像打包成本地文件(注意本地文件挂载的需要手动复制 -v 或 --volume)
sudo docker save [镜像id]>./xxx.tar
```

## 6、参考

https://zhuanlan.zhihu.com/p/143156163