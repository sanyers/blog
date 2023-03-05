# WebSocket 示例

## 1、服务器(nodejs)

```js
var WebSocketServer = require('ws').Server;

var wssWeb = new WebSocketServer({ port: 3000 });
wssWeb.on('connection', function connection(ws) {
  
  // 获取客户端ip
  // console.log(req.headers['x-forwarded-for'])
  // console.log(ws._socket.remoteAddress)
  // console.log(req.socket.remoteAddress)

  ws.on('message', function message(data, isBinary) {
    if (!isBinary) {
      // 是否为二进制数据
      const str = data.toString();
      const json = JSON.parse(str);

      if (json.type === 'heartbeat') {
        ws.send(str); // 回复心跳
      }

      if (json.type === 'conn') {
        // 新连接
        ws.userName = json.userName; // 用户名
        ws.roomId = json.roomId; // 房间id
      }

      if (json.type === 'text') {
        sendBroadcast(ws, str, isBinary);
      }

      if (json.type === 'user') {
        sendUser(json.userName, str);
      }
    } else {
      // 发送二进制数据
      sendBroadcast(ws, data, isBinary);
    }
  });
});

// 向房间内广播（除自己）
function sendBroadcast(ws, data, binary) {
  wssWeb.clients.forEach(client => {
    if (
      client.roomId === ws.roomId &&
      client.userName !== ws.userName &&
      client.readState === 1
    ) {
      client.send(data, { binary });
    }
  });
}

// 发送给指定用户
function sendUser(userName, data) {
  wssWeb.clients.forEach(client => {
    if (client.userName === userName && client.readState === 1) {
      client.send(data);
    }
  });
}
```

## 2、客户端(浏览器页面)

```js
const protocols = location.protocol === 'http:' ? 'ws://' : 'wss://';
const url = protocols + location.host;
const ws = new WebSocketHeart({ url });
ws.onopen = () => {
  ws.send(
    JSON.stringify({ type: 'conn', userName: 'xiaoming', roomId: '10001' }),
  ); // 发送连接信息
};
ws.onmessage = evt => {
  if (typeof evt.data == 'string') {
    const json = JSON.parse(evt.data);

    // 处理心跳
    if (json.type === 'heartbeat') {
      console.log(json);
    }

    // 接收 text 广播信息
    if (json.type === 'text') {
      console.log(json);
    }

    // 接收来自 json.userName 的私信
    if (json.type === 'user') {
      console.log(json);
    }
  } else {
    // 解析二进制数据
  }
};

// 广播信息
function sendText(msg) {
  const str = JSON.stringify({ type: 'text', data: msg });
  ws.send(str);
}

// 给指定的人发送信息
function sendUser(userName, msg) {
  const str = JSON.stringify({ type: 'user', data: msg, userName });
  ws.send(str);
}
```

### 2.1 封装 WebSocket 库

WebSocketHeart.js

```js
export default class WebSocketHeart {
  constructor({ url, pingTimeout, pongTimeout, reconnectTimeout, pingMsg }) {
    this.url = url; // websocket服务端接口地址
    this.pingTimeout = pingTimeout || 30000; // 每隔 30 秒发送一次心跳，如果收到任何后端消息定时器将会重置
    this.pongTimeout = pongTimeout || 10000; // ping 消息发送之后，10 秒内没收到后端消息便会认为连接断开
    this.reconnectTimeout = reconnectTimeout || 30000; // 尝试重连的间隔时间
    this.pingMsg = pingMsg || '{"type":"heartbeat"}'; // 发送心跳消息
    this.ws = null; // websocket 实例

    // 回调钩子
    this.onclose = () => {};
    this.onerror = () => {};
    this.onopen = () => {};
    this.onmessage = () => {};
    this.onreconnect = () => {};

    this.createWebSocket();
  }

  // 创建 WebSocket 实例
  createWebSocket() {
    try {
      this.ws = new WebSocket(this.url);
      this.initEventHandle();
    } catch (e) {
      this.reconnect();
      throw e;
    }
  }

  // 初始化事件钩子
  initEventHandle() {
    this.ws.onclose = () => {
      this.onclose();
      this.reconnect();
    };
    this.ws.onerror = () => {
      this.onerror();
      this.reconnect();
    };
    this.ws.onopen = () => {
      this.onopen();
      //心跳检测重置
      this.heartCheck();
    };
    this.ws.onmessage = event => {
      this.onmessage(event);
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      this.heartCheck();
    };
  }

  // 重连
  reconnect() {
    if (this.lockReconnect || this.forbidReconnect) return;
    this.lockReconnect = true;
    this.onreconnect();
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
    }, this.reconnectTimeout);
  }

  // 发送消息
  send(msg) {
    this.ws.send(msg);
  }

  // 心态检测
  heartCheck() {
    this.heartReset();
    this.heartStart();
  }

  // 心态重置
  heartReset() {
    clearTimeout(this.pingTimeoutId);
    clearTimeout(this.pongTimeoutId);
  }

  // 发送心跳
  heartStart() {
    if (this.forbidReconnect) return; //不再重连就不再执行心跳
    this.pingTimeoutId = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage 拿到返回的心跳就说明连接正常
      this.ws.send(this.pingMsg);
      //如果超过一定时间还没重置，说明后端主动断开了
      this.pongTimeoutId = setTimeout(() => {
        //如果 onclose 会执行 reconnect，我们执行 ws.close() 就行了.如果直接执行 reconnect 会触发 onclose 导致重连两次
        this.ws.close();
      }, this.pongTimeout);
    }, this.pingTimeout);
  }

  // 手动关闭
  close() {
    //如果手动关闭连接，不再重连
    this.forbidReconnect = true;
    this.heartReset();
    this.ws.close();
  }
}
```
