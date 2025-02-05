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

上传大文件受 PHP、Apache、Nextcloud、Nginx 等限制，需要一一配置

```bash
docker exec -it nextcloud /bin/bash
sudo -u www-data php occ config:app:set files max_chunk_size --value 0 # 或修改为20971520

# 创建上传临时目录，若该文件夹的存储空间小于上传的大文件则会上传失败
mkdir /data/tmp
chown -R www-data: /data/tmp/

vim .user.ini
always_populate_raw_post_dat a= -1
mbstring.func_overload = 0
default_charset = 'UTF-8'
output_buffering = 0
upload_max_filesize = 1000G
post_max_size = 1000G
open_basedir = '/var/www/html:/data/' # nextcloud 主目录，data数据目录，多个目录使用分隔符分割，windows 使用分号(;)分割，其他系统使用冒号(:)分割。
upload_tmp_dir = '/data/tmp/' # 设置上传临时文件夹
max_execution_time = 6000 # php 执行超时时间

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
output_buffering = 0
upload_tmp_dir = /'data/tmp/'

vim /etc/apache2/sites-available/000-default.conf
#新增
LimitRequestBody 1048576 # 1M
#或
LimitRequestBody 104857600 # 100M
#或
LimitRequestBody 1073741824 # 1G
#或
LimitRequestBody 107374182400 # 100G

vim /usr/local/etc/php/conf.d/nextcloud.ini
memory_limit = 1G
upload_tmp_dir = '/data/tmp/'
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

server {
  listen 80;
  server_name  0.0.0.0;
  client_max_body_size 100G; # 填写在 server_name 下
  client_body_timeout 5m;
  proxy_connect_timeout 5m;
  proxy_read_timeout 5m;
  proxy_send_timeout 5m;
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

### 5.4 已创建 nextcloud 容器，如何再开放容器22端口或其他端口

```sh
# 停止容器
sudo stop nextcloud
# 创建镜像
sudo docker commit nextcloud new_nextcloud:001
# 启动容器
sudo docker run -d -p 8888:80 -p 222:22 --name nextcloud2 --restart always new_nextcloud:001
```

### 5.5 配置自定义应用

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

### 5.6 配置https访问

修改配置文件 `/html/config/config.php`

```conf
  'overwrite.cli.url' => 'https://175.176.0.65',
  'overwriteprotocol' => 'https',
```

### 5.7 应用列表打不开或者缺少

修改配置文件 `/html/config/config.php`，改为国内镜像

```conf
  'appstoreenabled' => true,
  'appstoreurl' => 'https://www.orcy.net/ncapps/v2/',
```

### 5.8 配置 redis

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

### 5.9 去除url带 index.php

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

### 5.10 您的数据目录无效。 请确定在根目录下有一个名为".ocdata"的文件

该错误可能是由于迁移目录和账号引起的

（1）可以在 data 目录下创建 .ocdata 文件，设置根文件夹 `sudo chown -R www-data:www-data nextcloud`，进入根目录设置 `sudo chown -R www-data:www-data data`

（2）管理设置 => 基本设置 => 后台任务 => 选择 cron 任务，然后再切换回去即可

### 5.11 多个 nextcloud 部署之后，登录导致上一个 nextcloud 账号失效

由于 nextcloud 依据 cookies 来判断登录，如果一台服务器部署多个 nextcloud，不同端口，则会出现登录问题

修改 config.php 配置文件 `instanceid` 值即可

### 5.12 生成图片和视频缩略图

修改 `config.php` 配置文件

```conf
  'enable_previews' => true,
  'enabledPreviewProviders' =>
  array (
    0 => 'OC\\Preview\\PNG',
    1 => 'OC\\Preview\\JPEG',
    2 => 'OC\\Preview\\GIF',
    3 => 'OC\\Preview\\HEIC',
    4 => 'OC\\Preview\\BMP',
    5 => 'OC\\Preview\\XBitmap',
    6 => 'OC\\Preview\\MP3',
    7 => 'OC\\Preview\\TXT',
    8 => 'OC\\Preview\\MarkDown',
    9 => 'OC\\Preview\\Movie',
    10 => 'OC\\Preview\\MP4',
    11 => 'OC\\Preview\\AVI',
    12 => 'OC\\Preview\\MKV',
    13 => 'OC\\Preview\\Font',
    14 => 'OC\\Preview\\Illustrator',
    15 => 'OC\\Preview\\MSOffice2003',
    16 => 'OC\\Preview\\MSOffice2007',
    17 => 'OC\\Preview\\MSOfficeDoc',
    18 => 'OC\\Preview\\PDF',
    19 => 'OC\\Preview\\Photoshop',
    20 => 'OC\\Preview\\Postscript',
    21 => 'OC\\Preview\\StarOffice',
  ),
```

视频缩略图还需要在容器里安装 ffmpeg

```bash
sudo docker exec -it --user root nextcloud apt update
sudo docker exec -it --user root nextcloud apt install ffmpeg

# 检测是否安装成功
sudo docker exec -it nextcloud ffmpeg

# 重启容器即可生效
sudo docker restart nextcloud
```

### 5.13 自动扫描，允许软连接

```conf
'filesystem_check_changes' => true,
'localstorage.allowsymlinks' => true,
```

添加外链的文件夹映射：

```bash
sudo chown -R www-data:www-data /var/vsftpd/pub
或者
chmod 777 /var/vsftpd/pub -R
 
docker ps -a
docker stop nextcloud
docker rm nextcloud
docker run --name nextcloud -p 10000:80 --restart=always -v /root/nextcloud/:/var/www/html/ -v /var/vsftpd/pub:/var/vsftpd/pub -d nextcloud 

# 手动扫描
docker exec -u www-data nextcloud php occ files:scan --all
```

### 5.14 如何将一个文件共享给所有人

1、下载 [group_everyon](https://apps.nextcloud.com/apps/group_everyone) 插件

2、将下载的压缩包文件解压至 nextcloud 目录中的 `/var/www/html/apps` 目录下

3、以管理员用户登录到 nextcloud 中，在应用管理中，启用 `Everyone Group`，再回到用户管理下查看，会发现多了一个用户组名为 Everyone，里面包含了所有用户

### 5.15 挂载到 windows

`此电脑` 空白处右键 -> `添加一个网络位置` -> `选择自定义网络位置` -> 输入WebDav地址 `https://192.168.0.101:8888/remote.php/dav/files/sanyer/` -> 输入 `网络位置名称`

### 5.16 redis 连接错误

```
sudo docker logs nextcloud

输出：

Fatal error, can't open config file '/etc/redis/redis.conf': Permission denied

查看 nextcloud 日志：

RedisException: Redis server went away
```

可能引起的原因：由于 nextcloud 是 docker 部署，迁移了 docker 镜像的存储地址，重启后导致引起的错误

解决方法：删除 nextcloud 镜像，重新导入或安装 nextcloud 镜像，然后再启动 nextcloud docker

```bash
sudo docker stop nextcloud
sudo docker rm nextcloud
sudo docker rmi [镜像id]
sudo docker load -i nextcloud.tar # 重新导入镜像
# 启动容器
sudo docker run -d -p 8080:80 --name nextcloud --restart always -v /home/sanyer/nextcloud:/var/www/html nextcloud:27.1.5
```

## 6、nextcloud 镜像迁移

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

## 7、参考

https://zhuanlan.zhihu.com/p/435516648

https://zhuanlan.zhihu.com/p/48136942

[应用模板下载](https://apps.nextcloud.com/developer/apps/generate)

[证书](https://letsencrypt.org/zh-cn/docs/client-options/)