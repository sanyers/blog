# ubuntu安装wordpress

## 1、更新系统

```
sudo apt-get update
```

## 2、安装 Nginx

详见安装nginx

## 3、安装数据库 MariaDB

详见安装mysql

## 4、安装 PHP

```
sudo apt-get install php7.4 php7.4-cli php7.4-fpm php7.4-mysql php7.4-json php7.4-opcache php7.4-mbstring php7.4-xml php7.4-gd php7.4-curl -y
php -v
```

## 5、创建 WordPress 数据库

```
sudo mysql -u root -p

CREATE DATABASE wordpress_db;
GRANT ALL ON wordpress_db.* TO 'wpuser'@'localhost' IDENTIFIED BY 'Password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
\q;
```

## 6、下载 WordPress

修改目录权限 `sudo chown -R www-data: /var/www`


```
cd /var/www

wget http://wordpress.org/latest.tar.gz
# 中文版
wget https://cn.wordpress.org/latest-zh_CN.tar.gz

tar -zxvf latest-zh_CN.tar.gz
```

注：

- 不要将 wordpress 软件目录放在 root 目录里面，会产生权限问题而无法访问（File not found）
- 不要直接手动创建 `wp-config.php` 配置文件，需要配置nginx后，通过访问域名或地址进入软件的初始安装界面，然后按照提示生成 `wp-config.php` 文件的内容，复制并保存文件。

## 7、配置 Nginx

```
server {
    listen 443 ssl http2;
    server_name  xxx.sanyer.top;
    root /var/www/wordpress;
    index index.php;

    # 若没有ssl证书可以使用 http
    ssl_certificate "/home/ssl/xxx.sanyer.top.crt";
    ssl_certificate_key "/home/ssl/xxx.sanyer.top.key";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
            try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }

    location = /favicon.ico {
            log_not_found off;
            access_log off;
    }

    location = /robots.txt {
            allow all;
            log_not_found off;
            access_log off;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
            expires max;
            log_not_found off;
    }
}
```

## 8、安装 WordPress

在浏览器中访问你的域名或地址，根据 WordPress 设置指引完成最后的配置。