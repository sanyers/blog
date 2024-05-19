# 安装 mongodb

## 1、安装

```sh
# 安装最新版本
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add - # 密钥
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org.list # 设置软件源

sudo apt-get update
sudo apt-get install mongodb # sudo apt-get install mongodb-org
sudo systemctl status mongod
sudo systemctl restart mongod
sudo systemctl enable mongod # 开机自动启动
```

## 2、开启外部访问

设置 `bindIp` 外部访问后，再添加管理员账户，然后再设置 `authorization: enabled`

配置 mongodb 文件：

- ubuntu `sudo vim /etc/mongod.conf`
- windows `C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg`

  4.0 配置：

```conf
# bind_ip = 127.0.0.1
bind_ip = 0.0.0.0
port = 27017
auth = true # 设置用户名和密码访问
```

6.0 配置：

```conf
storage:
  dbPath: /var/lib/mongodb

net:
  port: 27017
  bindIp: 0.0.0.0

security:
  authorization: enabled # enabled 启用，disabled 不启用
```

## 3、创建登录账号

创建超级管理员账号：

```
use admin

db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```

创建普通用户：

```
use foo

db.createUser(
  {
    user: "simpleUser",
    pwd: "simplePass",
    roles: [ { role: "readWrite", db: "foo" },
             { role: "read", db: "bar" } ]
  }
)
```

权限：读写数据库 foo， 只读数据库 bar。

## 4、常用数据库命令

```
show users // 查看当前库下的所有用户
db.dropUser('testAdmin') // 删除用户
db.updateUser('admin',{pwd:'12345'}) // 修改密码
db.updateUser('admin',{roles: [ { role: "root", db: "admin" } ]}) // 修改用户权限
db.auth('admin','12345') // 密码认证
```

## 5、内置角色

| 角色名称     | 描述                                       |
| ------------ | ------------------------------------------ |
| read         | 允许用户读取指定数据库                     |
| readWrite    | 允许用户读取和修改指定数据库               |
| dbAdmin      | 允许用户在指定数据库上执行管理操作         |
| userAdmin    | 允许用户在指定数据库上执行用户管理操作     |
| clusterAdmin | 允许用户在整个集群上执行管理操作           |
| backup       | 允许用户执行备份操作                       |
| restore      | 允许用户执行恢复操作                       |
| root         | 超级用户，允许用户在整个系统上执行任意操作 |

## 6、启动错误

### 6.1 mongodb /etc/mongod.conf (code=exited, status=1/FAILURE)

遇到这样的问题调试办法：先停止服务，直接运行 `/usr/local/bin/mongod --config /etc/mongodb.conf` 查看是否报错

```
● mongod.service - MongoDB Database Server
     Loaded: loaded (/etc/systemd/system/mongod.service; enabled; vendor preset: enabled)
     Active: activating (auto-restart) (Result: exit-code) since Thu 2023-05-25 18:00:24 CST; 224ms ago
       Docs: https://docs.mongodb.org/manual
    Process: 2015 ExecStart=/usr/local/bin/mongod --config /etc/mongodb.conf (code=exited, status=1/FAILUR>
   Main PID: 2015 (code=exited, status=1/FAILURE)

May 25 18:00:24 test systemd[1]: mongod.service: Main process exited, code=exited, status=1/FAILURE
May 25 18:00:24 test systemd[1]: mongod.service: Failed with result 'exit-code'.
```

参考[链接](https://superuser.com/questions/1397079/mongo-cant-start-service)这是由于 `MongoDB` 文件夹和 `data` 文件夹的权限问题

解决办法：更改这两个文件夹的所有权，然后重启

```
sudo chown -Rc mongodb. /var/log/mongodb
sudo chown -Rc mongodb. /var/lib/mongodb
sudo systemctl stop mongod
sudo systemctl start mongod
```

mongodb [下载地址](https://www.mongodb.com/try/download/community)

## 7、卸载

```bash
sudo apt-get purge mongodb-org*
sudo apt-get remove --auto-remove mongodb

# 删除数据库和日志文件
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

## 8、docker 安装 mongodb

[mongodb tags](https://hub.docker.com/_/mongo/tags)

```sh
sudo docker pull mongo:6.0.12
sudo docker run -d -p 27017:27017 --name=mongodb --restart=always -v /home/sanyer/mongo/db:/data/db -v /home/sanyer/backup:/data/backup -v /home/sanyer/mongo/conf:/data/configdb mongo:6.0.12 --auth

# 进入 mongodb 命令行
sudo docker exec -it mongodb mongosh
use admin
db.createUser( { user: "root", pwd: "123456", roles: [{ role: "root", db: "admin" }] } );
db.auth('root', '123456')
```

## 9、导出与导入集合

假设数据库名为 `db_test` 集合为 `users`

### 9.1 mongoexport 导出集合

```bash
mongoexport --db db_test --collection users --out /backup/test.json -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin
```

### 9.2 mongodump 备份

关键参数：

- -h,--host ：代表远程连接的数据库地址，默认连接本地Mongo数据库；
- --port：代表远程连接的数据库的端口，默认连接的远程端口27017；
- -u,--username：代表连接远程数据库的账号，如果设置数据库的认证，需要指定用户账号；
- -p,--password：代表连接数据库的账号对应的密码；
- -d,--db：代表连接的数据库；
- -c,--collection：代表连接数据库中的集合；
- -o, --out：代表导出的文件输出目录；
- -q, --query：代表查询条件；
- -j，--numParallelCollections =要并行转储的集合数（默认为4）
- --gzip，使用Gzip压缩存档；
- --oplog，使用oplog进行时间点快照；
- --authenticationDatabase，指定用户鉴定库

```bash
# 备份所有数据库
mongodump --out /backup/test.json -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin
# 备份单个数据库
mongodump --db db_test --out /backup/test.json -h 127.0.0.1:27017 -u admin账号] -p admin密码 --authenticationDatabase admin
# 备份数据库下的集合
mongodump --db db_test --collection users --out /backup/test.json -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin

# 压缩备份单个数据库
mongodump --db db_test --gzip --out /backup/test.json -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin
```

### 9.3 导入集合

```sh
mongoimport --db db_test --collection users --file /backup/test.json -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin
```

### 9.4 mongorestore 恢复

关键参数：

- -h,--host ：代表远程连接的数据库地址，默认连接本地Mongo数据库；
- --port：代表远程连接的数据库的端口，默认连接的远程端口27017；
- -u,--username：代表连接远程数据库的账号，如果设置数据库的认证，需要指定用户账号；
- -p,--password：代表连接数据库的账号对应的密码；
- -d,--db：代表连接的数据库；
- -c,--collection：代表连接数据库中的集合；
- -o, --out：代表导出的文件输出目录；
- --dir = <目录名称>输入目录
- --drop导入前删除数据库中集合；
- --gzip，解压Gzip压缩存档还原；
- --oplog，重放oplog以基于时间点还原；
- --oplogFile = <文件名>指定重播oplog的oplog文件
- --authenticationDatabase，指定用户鉴定库

```bash
# 所有库恢复
mongorestore -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin /backup/test.json

# 单库恢复
mongorestore -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin --db db_test /backup/test.json

# 恢复数据库下的集合
mongorestore -h 127.0.0.1:27017 -u admin账号 -p admin密码 --authenticationDatabase admin --db db_test --collection users /backup/test.json
```