# php

```bash
# 查看已安装扩展
php -m

# 查看是否安装frp扩展
php -m | grep ftp

# docker 内安装扩展
docker-php-ext-install ftp

# docker 内启用扩展
docker-php-ext-enable ftp

sudo systemctl status php8.1-fpm
sudo systemctl restart php8.1-fpm
sudo vim /etc/php/8.1/fpm/pool.d/www.conf
```

## 1、FastCGI sent in stderr: "Primary script unknown" while reading response header from upstream

该错误可能是由于 nginx 配置的用户和 php-fpm 配置的用户不一致导致的

修改 nginx 配置用户：`sudo vim /etc/nginx/nginx.conf`

```conf
user root; # 修改为 root
worker_processes auto;
worker_rlimit_nofile 65535;
pid /run/nginx.pid;
...
```

修改 php-fpm 配置：`sudo vim /etc/php/8.1/fpm/pool.d/www.conf`

```conf
user = root
group = root
```

修改 php-fpm service 以 root 权限启动，在 ExecStart 上加上 `-R` 即可

`sudo vim /lib/systemd/system/php8.1-fpm.service`

```conf
ExecStart=/usr/sbin/php-fpm8.1 --nodaemonize --fpm-config /etc/php/8.1/fpm/php-fpm.conf -R
```