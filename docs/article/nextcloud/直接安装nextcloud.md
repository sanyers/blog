# 直接安装nextcloud

## 1、下载nextcloud

发行版：https://download.nextcloud.com/server/releases/

源码：https://github.com/nextcloud/server/archive/refs/tags/

源码版本需要额外下载 [3rdparty 组件](https://github.com/nextcloud/3rdparty/archive/refs/tags/)

## 2、配置nextcloud

设置访问权限：`sudo chown -R www-data: /home/html/nextcloud`

添加自定义应用到 `custom_apps` 目录

- `dashboards` 仪表盘
- `video-call` 视频通话

修改配置文件 `sudo vim /home/html/nextcloud/config/config.php`

```php
<?php
$CONFIG = array (
  'instanceid' => 'oc3ius7nr58s',
  'passwordsalt' => 'l1iKZ0krFxn6zfQ2l8cskqoydb9lTw',
  'secret' => 'tClqKIEH/s35Kbmc3uUA3fpsfGk4U1QXex8fvgE/b62pWy/t',
  'apps_paths' =>
  array (
    0 =>
    array (
      'path' => '/home/html/nextcloud/apps',
      'url' => '/apps',
      'writable' => false,
    ),
    1 =>
    array (
      'path' => '/home/html/nextcloud/custom_apps',
      'url' => '/custom_apps',
      'writable' => true,
    ),
  ),
  'trusted_domains' =>
  array (
    0 => '192.168.124.59',
    1 => '175.176.0.65',
    2 => '127.0.0.1',
    3 => 'localhost',
    4 => 'myrobot.voicevison.com',
  ),
  'defaultapp' => 'dashboards,files',
  'datadirectory' => '/home/vvt/node/html/nextcloud/data',
  'dbtype' => 'mysql',
  'version' => '27.0.1.2',
  'overwrite.cli.url' => 'https://192.168.124.59',
  'overwriteprotocol' => 'https',
  'dbname' => 'nextcloud',
  'dbhost' => 'localhost:3306',
  'dbport' => '',
  'dbtableprefix' => 'oc_',
  'mysql.utf8mb4' => true,
  'dbuser' => 'nextcloud',
  'dbpassword' => '123456',
  'installed' => true,
  'app_install_overwrite' =>
  array (
    0 => 'videocall',
    1 => 'dashboards',
  ),
);
```

查看 nextcloud 状态：

```sh
sudo chmod +x occ
sudo -u www-data ./occ status
```

## 3、安装数据库

详见安装mysql

## 4、安装php

详见安装php

## 5、配置nginx

`sudo vim /etc/nginx/nginx.conf`

```conf
server {
    listen 8888;
    server_name 0.0.0.0;

    root /home/vvt/node/html/nextcloud/;
    index index.php index.html /index.php$request_uri;

    # add begin
    # set max upload size and increase upload timeout:
    client_max_body_size 512M;
    client_body_timeout 300s;
    fastcgi_buffers 64 4K;
    
    # Enable gzip but do not remove ETag headers
    gzip on;
    gzip_vary on;
    gzip_comp_level 4;
    gzip_min_length 256;
    gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
    gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/wasm application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;

    # Pagespeed is not supported by Nextcloud, so if your server is built
    # with the `ngx_pagespeed` module, uncomment this line to disable it.
    #pagespeed off;

    # HTTP response headers borrowed from Nextcloud `.htaccess`
    add_header Referrer-Policy "no-referrer";
    add_header X-Content-Type-Options "nosniff";
    add_header X-Download-Options "noopen";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Permitted-Cross-Domain-Policies "none";
    add_header X-Robots-Tag "noindex, nofollow";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=15552000";

    # Remove X-Powered-By, which is an information leak
    fastcgi_hide_header X-Powered-By;

    # Make a regex exception for `/.well-known` so that clients can still
    # access it despite the existence of the regex rule
    # `location ~ /(\.|autotest|...)` which would otherwise handle requests
    # for `/.well-known`.
    location ^~ /.well-known {
        # The rules in this block are an adaptation of the rules
        # in `.htaccess` that concern `/.well-known`.

        location = /.well-known/carddav { return 301 /remote.php/dav/; }
        location = /.well-known/caldav  { return 301 /remote.php/dav/; }

        location /.well-known/acme-challenge    { try_files $uri $uri/ =404; }
        location /.well-known/pki-validation    { try_files $uri $uri/ =404; }

        # Let Nextcloud's API for `/.well-known` URIs handle all other
        # requests by passing them to the front-end controller.
        return 301 /index.php$request_uri;
    }

    # add end

    location / {
        try_files $uri $uri/ /index.php$request_uri;
    }

    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
        deny all;
    }

    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console) {
        deny all;
    }

    location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|oc[ms]/v[12]|updater/.+|ocs-provider/.+)\.php(?:$|/) {
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param HTTPS on;
        fastcgi_param modHeadersAvailable true;
        fastcgi_param front_controller_active true;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }

    location ~ ^/(?:updater|ocs-provider)(?:$|/) {
        try_files $uri/ =404;
        index index.php;
    }

    location ~ \.(?:css|js|woff2?|svg|gif|map)$ {
        try_files $uri /index.php$request_uri;
        add_header Cache-Control "public, max-age=15778463";
        # Add headers to serve security related headers
        add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;";
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Robots-Tag none;
        add_header X-Download-Options noopen;
        add_header X-Permitted-Cross-Domain-Policies none;
        add_header Referrer-Policy no-referrer;
        # Optional: Don't log access to assets
        access_log off;
    }

    location ~ \.(?:png|html|ttf|ico|jpg|jpeg)$ {
        try_files $uri /index.php$request_uri;
        # Optional: Don't log access to other assets
        access_log off;
    }
}
```

配置https访问

```conf
server {
       listen   443 ssl http2;
       server_name  0.0.0.0;

       ssl_certificate "/home/ssl/localhost_cert.pem";
       ssl_certificate_key "/home/ssl/localhost_key.pem";
       ssl_session_cache shared:SSL:1m;
       ssl_session_timeout  10m;
       ssl_ciphers HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers on;

       gzip on;
       gzip_static on;
       gzip_min_length 1k;
       gzip_comp_level 5;
       gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
       gzip_vary on;
       gzip_disable "MSIE [1-6]\.";   
       gzip_buffers 32 4k;
       gzip_http_version 1.1;

       charset 'utf-8';
       location / {
            proxy_pass http://127.0.0.1:8888;
       	    proxy_ssl_verify off;  # 关闭对内网Web服务器B的SSL证书验证
        	proxy_ssl_server_name on;  # 开启SNI支持，以便可以通过HTTPS代理请求
            proxy_read_timeout 300s;
            proxy_send_timeout 300s;
            proxy_set_header  Host $http_host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            add_header Permissions-Policy camera=(self),microphone=(self);
        }

        location /test_api {
            proxy_pass http://localhost:8000;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
}
```