# mysql

## 1、安装

```
sudo apt update
sudo apt install mariadb-server
sudo systemctl status mariadb

sudo mysql_secure_installation # 初始化数据库
```

创建数据库

```
sudo mysql -uroot -p

MariaDB [(none)]> CREATE DATABASE test;

MariaDB [(none)]> GRANT ALL PRIVILEGES ON test.* TO 'test'@'localhost' IDENTIFIED BY '123456';

MariaDB [(none)]> GRANT ALL ON test2.* TO 'test'@'%'; # 授权其他数据库权限，如无则省略

MariaDB [(none)]> FLUSH PRIVILEGES;

MariaDB [(none)]> \q
```

进入安全模式：

```
sudo systemctl stop mysql
# 或者
sudo /etc/init.d/mysql stop

sudo mysqld_safe --skip-grant-tables &
mysql -uroot

update user set plugin="mysql_native_password" where user="root";
flush privileges;
\q

sudo systemctl start mysql
```

## 2、设置外网访问

修改配置文件 `sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf`

```cnf
# bind-address = 127.0.0.1
bind-address = 0.0.0.0
```

为需要远程登录的用户赋予权限

```
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges;
```

查看用户列表信息：

```
use mysql;
select user,host from user;
```

## 3、卸载

卸载所有 mariadb/mysql 相关的软件

```
sudo apt-get remove mysql-\*
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

提示窗口：`Remove all MariaDB databases?`，选择“是”

再执行一次 `dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P`，即可。