# 获取 ip 地址

## 获取客户端 ip

```js
const ip =
  req.headers['x-forwarded-for'] ||
  req.ip ||
  req.socket.remoteAddress ||
  req.connection.remoteAddress ||
  req.connection.socket.remoteAddress;
```

## 获取本机 ip

```js
const device = {
  mac: '',
  ip: '',
};
const interfaces = require('os').networkInterfaces();
for (let key in interfaces) {
  const values = interfaces[key];
  values.forEach(element => {
    if (element.family == 'IPv4' && element.internal == false) {
      device.mac = element.mac;
      device.ip = element.address;
    }
  });
}
```

使用 ip 模块

```js
const ip = require('ip');
const address = ip.address();
```
