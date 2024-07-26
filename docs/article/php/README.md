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
```