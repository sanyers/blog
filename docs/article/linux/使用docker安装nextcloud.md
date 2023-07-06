# 使用docker安装nextcloud

## 1、目录准备

创建nextcloud目录，然后再创建三个子文件夹，如下：

db : nextcloud依赖的持久化数据的数据库

html: nextcloud的资源配置文件夹

data: nextcloud的个人同步文件

例如：`/home/vvt/node/nextcloud`

## 安装mariadb数据库

默认情况下，NextCloud使用的是SQLite数据库进行数据存储，它仅适用于没有客户端同步的测试和轻量级单用户设置。当多用户、多设备、大数据量的时候，SQLite就不太合适了，NextCloud支持MySQL，MariaDB，Oracle 11g和PostgreSQL等多种数据库。并且推荐使用MySQL / MariaDB。所以为了一劳永逸，还是用MySQL代替吧，MariaDB是MySQL源代码的一个分支。这里使用MariaDB作为数据库支撑。

```sh
sudo docker run -d -p 3306:3306 -e PUID=1000 -e PGID=100 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=123456 --name db_nextcloud --restart always -v /home/vvt/node/nextcloud/db:/var/lib/mysql mariadb
```

-d: 后台运行容器​，并返回容器ID

-name: 为容器指定一个名称

-p 3306:3306: 容器服务开放的端口,前者是宿主机的端口，后者是容器内服务的端口

-e PUID、-e PGID： 运行容器的用户的权限集id

-e MYSQL_ROOT_PASSWORD： 数据库root用户的密码

-e MYSQL_DATABASE=nextcloud ：创建一个名称为nextcloud的数据库

-e MYSQL_USER：创建一个名称为nextcloud的用户

-e MYSQL_PASSWORD：名称为nextcloud的用户的密码

-v：数据卷绑定 前者是宿主机的地址,后者是容器机器的位置

## 3、安装nextcloud

```sh
sudo docker run -d -p 8888:80 --name nextcloud --restart always -v /home/vvt/node/nextcloud/html:/var/www/html -v /home/vvt/node/nextcloud/data:/var/www/html/data nextcloud
```

-d: 后台运行容器​，并返回容器ID

-name: 为容器指定一个名称

-p 3306:3306: 容器服务开放的端口,前者是宿主机的端口，后者是容器内服务的端口

-e PUID、-e PGID： 运行容器的用户的权限集id

-e MYSQL_ROOT_PASSWORD： 数据库root用户的密码

-e MYSQL_DATABASE=nextcloud ：创建一个名称为nextcloud的数据库

-e MYSQL_USER：创建一个名称为nextcloud的用户

-e MYSQL_PASSWORD：名称为nextcloud的用户的密码

-v：数据卷绑定 前者是宿主机的地址,后者是容器机器的位置

-p 8888:80: 容器服务开放的端口,前者是宿主机的端口，后者是容器内服务的端口

-v：数据卷绑定 前者是宿主机的地址,后者是容器机器的位置

Nextcloud安装以及数据库之外的所有数据（文件上载等）都存储在容器地址/var/www/html中，要想持久化你的数据，不通过nextCloud也可以查看的话，应当映射到宿主机的某个位置上

Nextcloud的卷配置还是挺多的，例如配置(config)、数据(data)、主题(themes)等

nextcloud的一些卷地址：

/var/www/html 更新所需的主文件夹

/var/www/html/custom_apps你自己手动安装的应用位置

/var/www/html/config 本地配置文件位置

/var/www/html/data 你的网盘数据存放的位置

`/var/www/html/themes/<YOU_CUSTOM_THEME>` 主题文件位置

以上卷映射我这里只把data单独抽出来了，其他的配置全部默认放在/var/www/html映射的位置里

查看容器运行 `docker ps`

浏览器输入 `http://你的IP:8088` 即可访问nextcloud了。

如果出现如下错误：

```
Error while trying to create admin user: Failed to connect to the database: An exception occurred in the driver: SQLSTATE[HY000] [2002] No such file or directory
```

可能是由于未找到该数据库，在数据库地址那里输入本机ip地址+端口