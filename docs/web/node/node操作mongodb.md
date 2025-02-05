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

// 更新数据
function updates(where, update, tabName, callback) {
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

  // 更新数据
  updates(where: any, update: any, tabName: string) {
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

  findLimit(
    where: any,
    tabName: string,
    sort: any,
    start: number,
    end: number,
  ) {
    return this.dbs
      ? this.dbs
          .collection(tabName)
          .find(where)
          .sort(sort)
          .skip(start)
          .limit(end)
          .toArray()
      : Promise.reject(null);
  }

  findCount(where: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).countDocuments(where)
      : Promise.reject(null);
  }

  delete(where: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).deleteOne(where)
      : Promise.reject(null);
  }
  deleteAll(where: any, tabName: string) {
    return this.dbs
      ? this.dbs.collection(tabName).deleteMany(where)
      : Promise.reject(null);
  }
  deleteTable(tabName: string) {
    return this.dbs ? this.dbs.dropCollection(tabName) : Promise.reject(null);
  }
  dropDatabase(dbName?: string) {
    return this.dbs
      ? this.dbs.dropDatabase({ dbName: dbName || mongodb_conf.db })
      : Promise.reject(null);
  }
}
```

## 3、分页排序

```js
const where = { id: 1 }; // 查询条件
const sort = { date: 1 }; // 排序条件，其中 1 为升序排列，-1 是降序排列
const start = 0; // 起始位置（跳过的记录条数）
const end = 20; // 查询条数（需要读取的记录条数）
db.collection(tabName).find(where).sort(sort).skip(start).limit(end).toArray();

// 排序与分页中导致可能会导致重复数据的出现，使用唯一标识排序可解决
const sort = { date: 1, _id: -1 }; // 添加唯一排序键
db.collection(tabName).find(where).sort(sort).skip(start).limit(end).toArray();
```

## 4、更新数组

## 4.1 更新数组的值

```js
// 数据示例
const item = {
  id: 1,
  name: 'test1',
  list: [
    { pid: 1001, value: 34 },
    { pid: 1002, value: 35 },
    { pid: 1003, value: 36 },
  ],
};

// 修改第一个文档中的 {pid: 1002,value: 35} 为 {pid: 1002,value: 40}
db.xx.update({ id: 1, 'list.pid': 1002 }, { $set: { 'list.$.value': 40 } });
```

### 4.2 新增数组对象

```js
const item = { pid: 1004, value: 37 };
db.xx.updates({ id: 1 }, { $push: { list: item } });
```

### 4.3 删除数组对象

```js
db.xx.updates({ id: 1 }, { $pull: { list: { pid: 1004 } } });
```

## 5、查询关键字

## 5.1 等于

```js
// 匹配属性值等于指定值的文档
db.xxx.find({ name: 'zhang' });

// 匹配属性值等于指定值的文档
db.xxx.find({ name: { $eq: 'zhang' } });

// 匹配属性值是否包含某字符串的文档
db.xxx.find({ name: { $regex: 'zhang' } });
```

### 5.2 $in 数组或

类似于 || 或，只要满足 $in [] 里面的元素，就都可以查询出来

```js
db.xxx.find({ type: { $in: ['足球', '篮球'] } }); // 可以查询出 type 等于足球和篮球的数据
```

### 5.3 $or 对象或

类似于 || 或，满足其中一个字段的元素数据

```js
// 查询 name="xiaoming" 或者 name ="zhangsan"，两个条件其中一个条件成立，都返回数据
db.xxx.find({ $or: [{ name: 'xiaoming' }, { name: 'zhangsan' }] });
```

### 5.4 $all 数组且

类似于 && 且，满足所有元素的数据

```js
db.xxx.find({ type: { $all: ['足球'] } });
```

### 5.5 $and 对象且

类似于 && 且，满足所有条件的数据

```js
db.xxx.find({ $and: [{ name: 'xiaoming' }, { age: 25 }] });
```

### 5.6 小于

匹配属性值小于和小于等于指定值的文档

```js
// 小于 20
db.xxx.find({ age: { $lt: 20 } });
// 小于等于 20
db.xxx.find({ age: { $lte: 20 } });
```

### 5.7 大于

匹配属性值大于和大于等于指定值的文档

```js
// 大于 20
db.xxx.find({ age: { $gt: 20 } });
// 大于等于 20
db.xxx.find({ age: { $gte: 20 } });
```

### 5.9 $ne 不等于

匹配属性值不等于指定值的文档

```js
db.xxx.find({ name: { $ne: 'zhang' } });
```
