# web 接入 mqtt

安装：

`npm i mqtt`

客户端代码：

```ts
import * as mqtt from 'mqtt/dist/mqtt.min';

const clientId = 'emqx_vue3_' + Math.random().toString(16).substring(2, 8);
const username = '';
const password = '';
const host = location.host;

const client = mqtt.connect('ws://' + host + '/wsUrl', {
  clientId,
  username,
  password,
});

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
```

vite 配置：

```js
{
  server: {
    proxy: {
        '^/wsUrl': {
        target: 'ws:/127.0.0.1:8000',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/wsUrl/, ''),
      },
    }
  }
}
```
