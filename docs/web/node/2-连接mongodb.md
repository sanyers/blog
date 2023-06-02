# 连接 mongodb

[官网](https://www.mongodb.com/)

## 1、安装 mongodb

```
npm i mongodb@^3.5.3
```

## 2、操作 mongodb

当插入一条数据时，不存在该数据库和表时，会自动创建

```js
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testdb';
var mongodbase = null;
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('已连接mongodb数据库');
  mongodbase = db.db('testdb');
});

// 插入一条数据
function insert(data, tabName, callback) {
  mongodbase.collection(tabName).insertOne(data, callback);
}

// 更新一条数据
function update(where, update, tabName, callback) {
  update = { $set: update };
  mongodbase.collection(tabName).updateOne(where, update, callback);
}

function findAll(where, tabName, callback) {
  mongodbase.collection(tabName).find(where).toArray(callback);
}

function find(where, tabName, callback) {
  mongodbase.collection(tabName).findOne(where, callback);
}

function findColumn(where, column, tabName, callback) {
  mongodbase
    .collection(tabName)
    .find(where, column)
    .project(column)
    .toArray(callback);
}

function findLimit(where, _sort, start, end, tabName, callback) {
  mongodbase
    .collection(tabName)
    .find(where)
    .sort(_sort)
    .skip(start)
    .limit(end)
    .toArray(callback);
}

function remove(data, tabName, callback) {
  mongodbase.collection(tabName).deleteOne(data, callback);
}

exports.insert = insert;
exports.update = update;
exports.updatePush = updatePush;
exports.find = find;
exports.findAll = findAll;
exports.findColumn = findColumn;
exports.findLimit = findLimit;
exports.remove = remove;
```

```ts
// 版本 npm i mongodb@5.5.0
import { MongoClient, Db } from 'mongodb';
import { MONGODB_CONF } from './env';

export class Database {
  private dbs: Db | null = null;
  constructor() {
    this.connect();
  }

  private async connect() {
    const { base, port, dbName, user, pwd } = MONGODB_CONF;
    const pwden = encodeURIComponent(pwd as string);
    const url = `mongodb://${user}:${pwden}@${base}:${port}/`;
    const client: MongoClient = new MongoClient(url);

    await client.connect();
    this.dbs = client.db(dbName);
  }

  // 插入一条数据
  insert(data: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).insertOne(data)
      : Promise.reject('db is null');
  }

  // 更新一条数据
  update(where: any, update: any, tabName: string) {
    update = { $set: update };
    return this.dbs
      ? this.dbs.collection(tabName).updateOne(where, update)
      : Promise.reject('db is null');
  }

  findAll(where: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).find(where).toArray()
      : Promise.reject('db is null');
  }

  find(where: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).findOne(where)
      : Promise.reject('db is null');
  }
}
```

## 3、设置 MongoDB 用户名和密码

### 3.1 创建超级管理员账号

```
use admin

db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

### 3.2 创建普通用户

为每个数据库设置单独账号

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

### 3.3 常用命令

```
show users // 查看当前库下的所有用户
db.dropUser('testAdmin') // 删除用户
db.updateUser('admin',{pwd:'12345'}) // 修改密码
db.auth('admin','12345') // 密码认证
```

### 3.4 内置角色

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

## 4、ubuntu 安装

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

## 5、启动错误

### 5.1 mongodb /etc/mongod.conf (code=exited, status=1/FAILURE)

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
