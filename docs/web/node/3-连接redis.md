# 连接 redis

## 安装 redis

```
npm i redis@^2.8.0
```

## 操作 redis

```js
const redisConf = {
  host: '127.0.0.1',
  port: 6379,
  pwd: 'xxxx',
  prefix: 'XXX_SYSTEM_', // key 前缀
};
```

```js
const redis = require('redis');
const { port, host, pwd, prefix } = redisConf;
let client = null;
let redisCount = 0;
initserver();
function initserver() {
  client = redis.createClient(port, host);
  client.on('connect', () => {
    client.auth(pwd, err => {
      if (!err) {
        console.log('redis连接成功');
      }
    });
  });

  client.on('error', err => {
    console.log(err);
    redisCount++;
    if (redisCount > 10) {
      client.quit();
    }
  });
}

function getvalue(key, callback) {
  client.get(prefix + key, (err, r) => {
    if (err) {
      callback('');
    } else {
      callback(r);
    }
  });
}

function setvalue(key, value, time) {
  client.set(prefix + key, value, (err, r) => {
    if (err) {
      console.log(err);
    } else {
      if (time == null || time == undefined) {
        client.expire(key, 4 * 60 * 60);
      } else {
        client.expire(key, time);
      }
    }
  });
}

function setexpire(key, time) {
  client.expire(prefix + key, time);
}

exports.getvalue = getvalue;
exports.setvalue = setvalue;
exports.setexpire = setexpire;
```
