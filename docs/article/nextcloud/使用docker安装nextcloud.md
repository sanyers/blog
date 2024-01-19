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

[nextcloud docker](https://hub.docker.com/_/nextcloud)

```sh
# 拉取最新版
sudo docker pull nextcloud:latest
# 拉取指定版本
sudo docker pull nextcloud:27.1.5
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

apt-get install sudo

apt-get install vim openssh-server

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
docker exec -it nextcloud /bin/bash
sudo -u www-data php occ config:app:set files max_chunk_size --value 20971520

vim .user.ini
upload_max_filesize=1000G
post_max_size=1000G

vim .htaccess
<IfModule mod_php.c>
  php_value mbstring.func_overload 0
  php_value default_charset 'UTF-8'
  php_value output_buffering 0
#新增部分
  php_value upload_max_filesize 1000G
  php_value post_max_size 1000G
  <IfModule mod_env.c>
    SetEnv htaccessWorking true
  </IfModule>
</IfModule>

vim /var/www/html/3rdparty/aws/aws-crt-php/php.ini
#新增
post_max_size = 1000G
upload_max_filesize = 1000G
```

如果配置了nginx 代理访问，还需要配置 nginx

```conf
server {
  ...
  location / {
    client_max_body_size 10000M;
    client_body_buffer_size 10000M;
  }
}
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

## 5.5 配置自定义应用

修改配置文件 `/html/config/config.php`

```conf
  'apps_paths' => 
  array (
    0 => 
    array (
      'path' => '/var/www/html/apps',
      'url' => '/apps',
      'writable' => false,
    ),
    1 => 
    array (
      'path' => '/var/www/html/custom_apps',
      'url' => '/custom_apps',
      'writable' => true,
    ),
  ),
```

使用 occ 安装应用

```
app
 app:install      install selected app
 app:disable      disable an app
 app:enable       enable an app
 app:getpath      get an absolute path to the app directory
 app:list         list all available apps
 app:update       update an app or all apps
 app:remove       disable and remove an app
```

```sh
# 下载并安装应用程序
sudo -u www-data php occ app:install twofactor_totp

# 安装但不启用
sudo -u www-data php occ app:install --keep-disabled twofactor_totp

# 列出所有已安装的应用，并显示它们是否 启用或禁用
sudo -u www-data php occ app:list

# 启用应用
sudo -u www-data php occ app:enable files_external

# 禁用应用
sudo -u www-data php occ app:disable files_external

# 可以获取应用的完整文件路径
sudo -u www-data php occ app:getpath notifications

# 更新应用程序
sudo -u www-data php occ app:update contacts

# 更新所有应用
sudo -u www-data php occ app:update --all
```

## 5.6 配置https访问

修改配置文件 `/html/config/config.php`

```conf
  'overwrite.cli.url' => 'https://175.176.0.65',
  'overwriteprotocol' => 'https',
```

## 5.7 应用列表打不开或者缺少

修改配置文件 `/html/config/config.php`，改为国内镜像

```conf
  'appstoreenabled' => true,
  'appstoreurl' => 'https://www.orcy.net/ncapps/v2/',
```

## 5.8 配置 redis

```conf
  'memcache.distributed' => '\\OC\\Memcache\\Redis',
  'filelocking.enabled' => 'true',
  'memcache.locking' => '\\OC\\Memcache\\Redis',
  'redis' =>
  array (
    'host' => '127.0.0.1',
    'timeout' => 0,
    'dbindex' => 16, // 数据库序号
    'port' => 6379,
    'password' => '123456',
  ),
```

## 5.9 去除url带 index.php

修改配置 config.php

```conf
'htaccess.RewriteBase' => '/',
```

```sh
# 进入容器内部
sudo docker exec -it nextcloud /bin/bash
# 执行命令
sudo -u www-data php occ maintenance:update:htaccess
```

## 7、nextcloud 镜像迁移

```bash
# 保存镜像
sudo docker save nextcloud>./nextcloud.tar
# 加载镜像
sudo docker load < nextcloud.tar
# 设置镜像名称
docker tag 镜像id nextcloud:27.1.5
# 运行
sudo docker run -d -p 8080:80 --name nextcloud --restart always -v /home/sanyer/nextcloud:/var/www/html nextcloud:27.1.5
```

注意：**nextcloud 从新部署之后，访问首页进入安装界面，需要在同一个网段内，若跨越多个网段将无法访问，无法安装成功**

## 8、您的数据目录无效。 请确定在根目录下有一个名为".ocdata"的文件

该错误可能是由于迁移目录和账号引起的

（1）可以在 data 目录下创建 .ocdata 文件，设置根文件夹 `sudo chown -R www-data:www-data nextcloud`，进入根目录设置 `sudo chown -R www-data:www-data data`

（2）管理设置 => 基本设置 => 后台任务 => 选择 cron 任务，然后再切换回去即可

## 9、多个 nextcloud 部署之后，登录导致上一个 nextcloud 账号失效

由于 nextcloud 依据 cookies 来判断登录，如果一台服务器部署多个 nextcloud，不同端口，则会出现登录问题

修改 config.php 配置文件 `instanceid` 值即可

## 9、参考

https://zhuanlan.zhihu.com/p/435516648

https://zhuanlan.zhihu.com/p/48136942

[应用模板下载](https://apps.nextcloud.com/developer/apps/generate)

[证书](https://letsencrypt.org/zh-cn/docs/client-options/)