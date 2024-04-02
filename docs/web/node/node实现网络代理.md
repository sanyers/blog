# node 实现网络代理

## 1、安装

`npm install http-proxy`

## 2、代理服务器

```js
const http = require('http');
const httpProxy = require('http-proxy');

//创建一个代理服务
const proxy = httpProxy.createProxyServer();

//创建http服务器并监听8888端口
let server = http.createServer(function (req, res) {
  //将用户的请求转发到本地9999端口上
  proxy.web(req, res, {
    headers: {
      authorization: 'Basic test', // 自定义auth
    },
    target: 'http://localhost:9999', // 代理到 9999 端口
  });
  //监听代理服务错误
  proxy.on('error', function (err) {
    console.log(err);
  });
});
server.listen(8888, '0.0.0.0');
```

## 被代理服务器

```js
const http = require('http');
http
  .createServer(function (req, res) {
    res.end('port : 9999');
  })
  .listen(9999, '0.0.0.0');
```

当访问 http://localhost:8888 时，返回 9999 站点数据

参考：https://juejin.cn/post/7181726821216419897