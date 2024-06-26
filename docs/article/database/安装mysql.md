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

修改 root 密码：

```
sudo mysql -uroot -p

MariaDB [(none)]> alter user 'root'@'localhost' identified by 'new pass';
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

关闭安全模式：

```sh
set sql_safe_updates = 0;
# authentication_string 设置为空才不会报 ERROR 1396 (HY000): Operation ALTER USER failed for 'root'@'%' 错误
update user set authentication_string="" where user="root";

# 刷新权限表使其生效
flush privileges;
# 修改密码格式
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'xxx';
# 修改密码
ALTER USER 'root'@'%' IDENTIFIED BY 'xxx';
# 或
ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxx';
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

## 4、docker 安装

```sh
docker search mariadb
docker pull mariadb

sudo docker run -d -p 3306:3306 -e PUID=1000 -e PGID=100 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=testdb -e MYSQL_USER=testdb -e MYSQL_PASSWORD=123456 --name mariadb --restart always -v /home/sanyer/db:/var/lib/mysql mariadb
```

-d: 后台运行容器​，并返回容器ID

-name: 为容器指定一个名称

-p 3306:3306: 容器服务开放的端口,前者是宿主机的端口，后者是容器内服务的端口

-e PUID、-e PGID： 运行容器的用户的权限集id

-e MYSQL_ROOT_PASSWORD： 数据库root用户的密码

-e MYSQL_DATABASE=testdb ：创建一个名称为testdb的数据库

-e MYSQL_USER：创建一个名称为testdb的用户

-e MYSQL_PASSWORD：名称为testdb的用户的密码

-v：数据卷绑定 前者是宿主机的地址,后者是容器机器的位置

## 5、常见问题

### 5.1 mysql正确清理binlog日志的方法

```bash
mysql -uroot -p

# 查看主库和从库正在使用的binlog是哪个文件
show master status
show slave status\G

# 手动删除
purge binary logs to 'binlog.000055'; # 将bin.000055之前的binlog清除
purge binary logs before '2024-05-30 13:09:51'; #将指定时间之前的binlog清除

# 在配置文件my.cnf中修改
expire_logs_day = 30 # 设置过期时间为30天
# 或者
max_binlog_size = 10m # 二进制日志最大大小
```

注意：对于主从复制，要看从库的延迟决定过期时间，避免主库binlog还未传到从库便因过期而删除，导致主从不一致

### 5.2 mysql 重置自增ID

```bash
# 设置自增ID值
ALTER TABLE table_name AUTO_INCREMENT = value;

# 清空表数据
TRUNCATE TABLE tablename;

# 保留数据重置 - 直接删除 ID
# 把 ID 列删除，然后重新新建 ID 列

# 将表导出（结构和数据、仅结构）至 sql 文件
# 修改 sql 文件，删除 AUTO_INCREMENT
```