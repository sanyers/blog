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