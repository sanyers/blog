# 使用docker部署三个bug系统

## 部署 bugzilla

```sh
# 拉取 docker
sudo docker pull dklawren/docker-bugzilla
# 运行 docker
sudo docker run -d -p 8556:80 --name bugzilla dklawren/docker-bugzilla:latest

# 进入docker
sudo docker exec -it bugzilla /bin/bash
# 进入软件根目录
cd /home/bugzilla/devel/htdocs/bugzilla

# 设置中文
cd template
wget https://github.com/yourcaptain/bugzilla-cn-4.4.6/archive/refs/heads/master.zip
unzip master.zip
mv bugzilla-cn-4.4.6-master cn
chown -R bugzilla:bugzilla cn

# 设置邮箱
vim /home/bugzilla/devel/htdocs/bugzilla/data/params
# 修改字段 mailfrom 和 maintainer 保持一致
'mail_delivery_method' => 'SMTP',
'mailfrom' => 'test@qq.com',
'maintainer' => 'test@qq.com',
'smtp_password' => 'your password',
'smtp_username' => 'test@qq.com',
'smtpserver' => 'smtp.qq.com',

# 默认管理员账户，进入页面后可以修改
admin@bugzilla.org 密码 password
```

## 部署 mantisbt

```sh
sudo docker pull vimagick/mantisbt:latest
sudo docker run -d --name mantisbt -p 8557:80 vimagick/mantisbt

# 配置mysql
sudo mysql -uroot -p
CREATE DATABASE bugtracker;
GRANT ALL PRIVILEGES ON bugtracker.* TO 'mantisbts'@'%' IDENTIFIED BY 'mantisbts';
FLUSH privileges;
\q;
```

配置文件地址：`/var/www/html/config/config_inc.php`

复制 docker 里面的文件：

`sudo docker cp [id]:/var/www/html/config/config_inc.php ./config_inc.php`

```php
<?php
$g_hostname               = '192.168.0.101';
$g_db_type                = 'mysqli';
$g_database_name          = 'mantisbt';
$g_db_username            = 'mantisbt';
$g_db_password            = 'mantisbt';

$g_default_timezone       = 'Asia/Shanghai';

$g_crypto_master_salt     = 'xxx';

/**
 * 开启邮箱验证
 */ 
$g_enable_email_notification = ON;
$g_phpMailer_method = PHPMAILER_METHOD_SMTP;

/**
 * smtp 配置
 */ 
$g_smtp_host            = 'smtp.qq.com';
$g_smtp_username        = 'xxx@qq.com';    
$g_smtp_password        = 'xxxxx';         
$g_smtp_port            = 465;
$g_smtp_connection_mode = 'ssl';  /* 普通为 25 ，具体设置参考你使用邮箱 smtp 配置 */

$g_from_name            = 'Mantis Bug Tracker';

$g_administrator_email  = 'xxx@qq.com';
$g_webmaster_email      = 'xxx@qq.com';
$g_return_path_email    = 'xxx@qq.com';
$g_from_email           = 'xxx@qq.com';

/**
 * 创建用户时可以设置密码,默认是通过邮件邀请，公司内部用可以启用
 */
$g_send_reset_password = OFF;

// 日志
$g_log_level = LOG_EMAIL |LOG_EMAIL_RECIPIENT;
$g_log_destination = 'file:/var/www/html/mantisbt.log';
```

调试邮件总是不通，可访问 `/admin/email_queue.php` 地址调试

本人经过测试：配置个人qq邮箱可以成功，企业qq邮箱未成功，有时候qq邮箱也会提示失败，需要配置一个错误的配置然后测试，然后配置一个正确的配置然后测试可以通过（莫名的成功了）

修改后重置 docker

```sh
sudo docker stop [id]
sudo docker rm [id]
sudo docker run -d --name mantisbt -p 8557:80 -v /home/sanyer/config/mantisbt/config_inc.php:/var/www/html/config/config_inc.php vimagick/mantisbt
or
sudo docker run -d --name mantisbt -p 8557:80 -v /home/sanyer/mantisbt:/var/www/html vimagick/mantisbt
```

## 部署 jira

```sh
sudo docker pull cptactionhank/atlassian-jira-software:8.1.0
sudo docker run -d --name jira -p 8558:8080 cptactionhank/atlassian-jira-software:8.1.0

sudo mysql -uroot -p
CREATE DATABASE jira;
GRANT ALL PRIVILEGES ON jira.* TO 'jira'@'%' IDENTIFIED BY 'jira';
FLUSH privileges;
\q;
```