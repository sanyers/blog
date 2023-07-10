# 使用docker安装nextcloud

## 1、目录准备

创建nextcloud目录，然后再创建三个子文件夹，如下：

db : nextcloud依赖的持久化数据的数据库

html: nextcloud的资源配置文件夹

data: nextcloud的个人同步文件

例如：`/home/vvt/node/nextcloud`

## 2、安装mariadb数据库

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
sudo docker run -d -p 8888:80 -p 222:22 --name nextcloud --restart always -v /home/vvt/node/nextcloud/html:/var/www/html -v /home/vvt/node/nextcloud/data:/var/www/html/data nextcloud
```

-d: 后台运行容器​，并返回容器ID

-name: 为容器指定一个名称

-p 8888:80: 容器80端口映射到宿主机的8888端口，用于访问nextcloud站点

-p 222:22: 容器22端口映射到宿主机的222端口，用于访问ssh

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

## 4、开放nextcloud容器的ssh访问

```sh
# 1、进入 nextcloud 容器
docker exec -it nextcloud /bin/bash

# 2、安装 vim 和 openssh
apt-get update

apt-get upgrade

apt-get install vim

apt-get install openssh-server

# 3、设置 root 密码，用于ssh连接时输入
passwd

# 4、修改配置文件
vim /etc/ssh/sshd_config
# 修改如下配置：
PubkeyAuthentication yes #启用公钥私钥配对认证方式 
AuthorizedKeysFile .ssh/authorized_keys #公钥文件路径（和上面生成的文件同） 
PermitRootLogin yes #root能使用ssh登录
ClientAliveInterval 60  #参数数值是秒 , 是指超时时间
ClientAliveCountMax 3 #设置允许超时的次数

# 5、重启 ssh 服务
/etc/init.d/ssh restart
```

## 5、常见问题

### 5.1 如果出现如下错误：

```
Error while trying to create admin user: Failed to connect to the database: An exception occurred in the driver: SQLSTATE[HY000] [2002] No such file or directory
```

可能是由于未找到该数据库，在数据库地址那里输入本机ip地址+端口


### 5.2 调整上传文件大小限制

```sh
sudo -u www-data php occ config:app:set files max_chunk_size --value 20971520
```

### 5.3 用二级域名访问，如果出现域名不被信任

修改config/config.php。在trusted_domains中增加信任的域名。

```
$CONFIG = array (
  'instanceid' => '*******7rxp',
  'passwordsalt' => '****************dO+JvP5wP4gX9',
  'secret' => 'MURhZ*************r5C32dF*******4K/4dmH',
  'trusted_domains' => 
  array (
    0 => '192.***.*3.*',
    1 => 'sg*****.top:****',
    2 => 'www.sg*****.top:****',
  ),
```

## 5.4 已创建 nextcloud 容器，如何再开放容器22端口或其他端口

```sh
# 停止容器
sudo stop nextcloud
# 创建镜像
sudo docker commit nextcloud new_nextcloud:001
# 启动容器
sudo docker run -d -p 8888:80 -p 222:22 --name nextcloud2 --restart always new_nextcloud:001
```

## 6、参考

https://zhuanlan.zhihu.com/p/435516648

https://zhuanlan.zhihu.com/p/48136942

[应用模板下载](https://apps.nextcloud.com/developer/apps/generate)

[证书](https://letsencrypt.org/zh-cn/docs/client-options/)