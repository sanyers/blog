# 安装和使用apache2

## 1、安装apache2
```sh
# 安装
sudo apt-get install apache2
# 查看状态
sudo systemctl status apache2
```

打开浏览器输入地址 `http://127.0.0.1`，若能看到 `Apache2 Default Page` 页面就表示安装成功

## 2、apache2 支持 php 访问

```sh
sudo apt-get install php libapache2-mod-php php-mysql

cd /var/www/html
sudo vim info.php

# 编辑 info.php 内容，保存并退出
<?php
phpinfo();
?>
```

打开浏览器 `http://127.0.0.1/info.php`
