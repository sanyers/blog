# python连接mongodb

## 1、安装pymongo

`pip install pymongo`

## 2、连接数据库

```py
import pymongo
import urllib.parse

username = urllib.parse.quote_plus('username')
password = urllib.parse.quote_plus('password')
mongo_client = pymongo.MongoClient("mongodb://%s:%s@localhost:27017/" % (username, password))
mongo_db = mongo_client["dbname"] // 数据库名
mongo_col = mongo_db["tablename"] // 表名
```

## 3、操作数据库

### 3.1 判断数据库是否已存在

```py 
dblist = mongo_client.list_database_names()
if "testdb" in dblist:
    print("数据库已存在！")
```

### 3.2 判断集合是否已存在

```py
testdb = mongo_db['testdb']
 
collist = testdb.list_collection_names()
if "sites" in collist:   # 判断 sites 集合是否存在
  print("集合已存在！")
```

### 3.3 查询

```py
# 查询一条数据
x = mongo_col.find_one() # 参数为空返回第一条数据
print(x)

y = mongo_col.find_one({ "name": "xiaoming" }) # 根据条件查询
print(y)

# 查询多条
for z in mongo_col.find():
    print(z)

# 返回指定条数记录
myresult = mongo_col.find().limit(3)
```

### 3.4 添加

```py
# 添加一条
mydict = { "name": "xiaoming", "age": 18, "url": "https://sanyer.top" }
x = mongo_col.insert_one(mydict)
print(x.inserted_id) # 返回id

# 插入多个文档
mylist = [
  { "name": "Taobao", "alexa": "100", "url": "https://www.taobao.com" },
  { "name": "QQ", "alexa": "101", "url": "https://www.qq.com" },
  { "name": "Facebook", "alexa": "10", "url": "https://www.facebook.com" },
  { "name": "知乎", "alexa": "103", "url": "https://www.zhihu.com" },
  { "name": "Github", "alexa": "109", "url": "https://www.github.com" }
]
 
x = mongo_col.insert_many(mylist)
 
# 输出插入的所有文档对应的 _id 值
print(x.inserted_ids)

# 插入指定id的数据
mylist = [
  { "_id": 1, "name": "RUNOOB", "cn_name": "菜鸟教程"},
  { "_id": 2, "name": "Google", "address": "Google 搜索"},
  { "_id": 3, "name": "Facebook", "address": "脸书"},
  { "_id": 4, "name": "Taobao", "address": "淘宝"},
  { "_id": 5, "name": "Zhihu", "address": "知乎"}
]
```

### 3.5 修改

```py
# 修改一条数据
myquery = { "alexa": "10000" }
newvalues = { "$set": { "alexa": "12345" } }
 
mongo_col.update_one(myquery, newvalues)
 
# 输出修改后的  "sites"  集合
for x in mongo_col.find():
  print(x)

# 修改多条
x = mongo_col.update_many(myquery, newvalues)
```

### 3.6 排序

```py
# 对字段 alexa 按升序排序：
mydoc = mongo_col.find().sort("alexa")
for x in mydoc:
  print(x)

# 对字段 alexa 按降序排序：
mydoc = mongo_col.find().sort("alexa", -1)
 
for x in mydoc:
  print(x)
```

### 3.7 删除

```py
# 删除一条
myquery = { "name": "Taobao" }
mongo_col.delete_one(myquery)

# 删除多条
mongo_col.delete_many(myquery)

# 删除集合中的所有文档，如果传入的是一个空的查询对象，则会删除集合中的所有文档
mongo_col.delete_many({})

# 删除集合
mongo_col.drop() # 删除成功返回true
```

## 4、参考

https://www.runoob.com/python3/python-mongodb.html