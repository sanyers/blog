# ubuntu安装php

## 1、安装php

```
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php

sudo apt install php8.1

# 或者
sudo apt install php8.1-fpm php8.1-mysql php8.1-gd php8.1-zip php8.1-dom php8.1-mbstring php8.1-curl php8.1-intl php8.1-imagick

systemctl status php8.1-fpm # 查看状态
systemctl restart php8.1-fpm
systemctl restart nginx
```

修改配置 `sudo vim /etc/php/8.1/fpm/pool.d/www.conf`，去掉分号

```
env[HOSTNAME] = $HOSTNAME
env[PATH] = /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
env[TMP] = /tmp
env[TMPDIR] = /tmp
env[TEMP] = /tmp
```

## 2、nginx 配置php

```
server {
    listen       8033;
    server_name  0.0.0.0;
    root /var/www/html;
    index index.php;

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        # fastcgi_pass php-handler
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}

upstream php-handler {
    # server 127.0.0.1:9000;
    # server unix:/var/run/php/php8.1-fpm.sock;
}
```

在 `/var/www/html` 目录下创建 `index.php` 文件：

```php
<?php

phpinfo();
```

## 3、卸载php

```
# 删除php的相关包及配置
sudo apt-get autoremove php7*

# 删除关联
sudo find /etc -name "*php*" |xargs  rm -rf

# 清除dept列表
sudo apt purge `dpkg -l | grep php| awk '{print $2}' |tr "\\\\n" " "`

# 检查是否卸载干净（无返回就是卸载完成）
 dpkg -l | grep php7.0
```