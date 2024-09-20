# php 扩展

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