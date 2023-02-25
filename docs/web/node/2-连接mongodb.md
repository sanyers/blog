# 连接 mongodb

[官网](https://www.mongodb.com/)

## 安装 mongodb

```
npm i mongodb@^3.5.3
```

## 操作 mongodb

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
