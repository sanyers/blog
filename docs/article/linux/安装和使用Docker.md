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

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a
docker ps -a -q

# 启动、重启、停止docker服务
sudo systemctl docker start|restart|stop

# 启动、重启、停止容器
docker start|restart|stop [name]

# 重命名容器
docker rename 原容器名称 新容器名称

# 删除镜像
docker rm -f [name]
# 强制删除
docker rmi -f [name]:[tag]
# 删除容器
docker rm [name]

# 查看docker运行状态
docker stats

# 进入容器内部
docker exec -it xxx /bin/bash

# 进入未启动的容器或镜像
sudo docker run -it --entrypoint /bin/bash imagename:1.0

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
sudo docker save 镜像id>./xxx.tar

# 从本地文件加载镜像
sudo docker load < xxx.tar
# 或
sudo docker load -i xxx.tar

# 查看已安装镜像
sudo docker images

# 镜像重命名
docker tag 镜像id xxx:1.0
```

## 6、docker 的运行模式与 --rm 选项的作用

## 6.1 docker 容器进程的两种运行模式

1、前台模式（默认）

```sh
docker run ...
# 或
docker run -d=false ...
```

注意，只有在前台模式下，才有必要设置 `-it` 命令选项

2、后台模式（也称detached模式）

```sh
docker run -d ...
# 或
docker run -d=true ...
# 注意，只要有-d命令选项，就没有 `-it` 命令选项
```

## 6.2 --rm 选项的作用

在 docker 容器退出时，默认容器内部的文件系统仍然被保留，以方便调试并保留用户数据。

在容器启动时设置 `--rm` 选项，退出容器时会自动清理容器内部的文件系统。

```sh
docker run --rm xxx
# 或
docker run --rm=true xxx
# --rm 选项不能与 -d 同时使用
```

docker 的 --rm 与 docker rm 的区别

- 使用 docker rm 删除容器  ——  删除容器，挂载点的文件还存在
- 使用 --rm 参数   ——  删除容器，并还会删掉挂载点的数据

## 7、常见问题

### 7.1 关于启动Docker容器时”无法执行二进制文件”的问题

`docker run -it [容器名称] /bin/bash`
然后，在极少数情况下

/bin/bash：/bin/bash：无法执行二进制文件

删除 /bin/bash 即可

``docker run -it [容器名称]`

### 7.2 docker修改容器内部文件的方法

1、进入容器内部修改

```sh
docker exec -it 容器ID /bin/bash

# 如果里面没有 vim 需要自行安装，容器删除后配置会失效
apt-get update
apt-get install vim
vim /etc/my.cnf
```

2、通过 docker cp 拷贝进行修改

```sh
# 将容器中的文件拷贝出来
sudo docker cp 容器ID:/etc/my.cnf /home/sanyer/
# 将容器中的文件拷贝回去
sudo docker cp /home/sanyer/my.cnf  容器ID:/etc/

# 容器删除后配置会失效，修改后需要重启容器才能生效
```

3、使用 -v 挂载文件夹(推荐)

使用 -v 将容器内部的文件夹挂载（映射）到本地的某个路径下，以后以后可以直接在本地修改，不需要进入容器内部

```sh
# 冒号前是本地路径（需要绝对路径），冒号后是容器中的路径，可以挂载文件和文件夹
$ docker run -d --name test -p 8080:80 -v /home/sanyer/my.cnf:/etc/my.cnf sanyer/test
```

## 8、参考

https://zhuanlan.zhihu.com/p/143156163