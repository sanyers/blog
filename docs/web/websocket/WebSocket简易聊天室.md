# WebSocket简易聊天室

参考 [WebSocket示例](WebSocket%E7%A4%BA%E4%BE%8B.md) 和 [vue3项目开发](../vue3/1.vue3%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91.md) 继续编写一个简易的聊天室

后端：

- `NodeJS v16.19.1`
- `express@^4.18.1`
- `ws@^7.2.1`

前端：
- `vue@^3.2.37`
- `vue-router@^4.1.5`
- `naive-ui@^2.33.3`

## 1、搭建 WebSocket 服务器

```js
const express = require('express') //web框架
const app = express()
app.use(express.json({ limit: '50mb' })) // 解析 application/json 参数
app.use(express.urlencoded({ limit: '50mb', extended: true })) // 解析 www-form-urlencoded 参数
app.use('/', express.static('public')) // 开放public文件夹目录
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ code:-1, msg:'服务器错误' })
})
const server = require('http').Server(app)

// 核心代码
const WebSocketServer = require('ws').Server
const wssWeb = new WebSocketServer({ server })
  wssWeb.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
      if (!isBinary) {
        // 是否为二进制数据
        const str = data.toString()
        const json = JSON.parse(str)

        // 心跳数据
        if (json.type === 'heartbeat') {
          ws.send(str) // 回复心跳
        }

        // 新用户连接
        if (json.type === 'connect') {
          const isExist = checkUserName(json.userName)
          if (isExist) {
            const data = {
              type: 'close',
              msg: '用户名已存在',
            }
            ws.send(JSON.stringify(data), () => {
              ws.close()
            })
          } else {
            console.log('新用户：' + json.userName)
            ws.userName = json.userName // 用户名
            ws.roomId = json.roomId || 'all' // 房间id

            const strs1 = JSON.stringify({
              type: 'broadcast',
              fromUser: '系统',
              msg: json.userName + '，已进入群聊',
            })
            sendBroadcast(ws, strs1, isBinary)

            const strs2 = JSON.stringify({
              type: 'broadcast',
              fromUser: '系统',
              msg: '连接成功',
            })
            ws.send(strs2)
          }
        }

        // 广播
        if (json.type === 'broadcast') {
          const strs = JSON.stringify({
            type: 'broadcast',
            fromUser: ws.userName,
            msg: json.msg,
          })
          sendBroadcast(ws, strs, isBinary)
        }

        // 切换房间
        if (json.type === 'room') {
          ws.roomId = json.roomId
        }

        // 指定用户
        if (json.type === 'user') {
          const strs = JSON.stringify({
            type: 'user',
            fromUser: ws.userName,
            msg: json.msg,
          })
          sendUser(json.userName, strs, isBinary)
        }
      }
    })
  })

  // 向房间内广播（除自己）
  function sendBroadcast(ws, data, binary) {
    wssWeb.clients.forEach(client => {
      if (
        client.roomId === ws.roomId &&
        client.userName !== ws.userName &&
        client.readyState === 1
      ) {
        client.send(data, { binary })
      }
    })
  }

  // 发送给指定用户
  function sendUser(userName, data, binary) {
    wssWeb.clients.forEach(client => {
      if (client.userName === userName && client.readyState === 1) {
        client.send(data, { binary })
      }
    })
  }

  function checkUserName(userName) {
    let isExist = false
    wssWeb.clients.forEach(client => {
      if (client.userName === userName) {
        isExist = true
      }
    })
    return isExist
  }

const conf = {
  host: '127.0.0.1',
  port: 3030,
}
//启动应用程序
server.listen(conf.port, () => {
  console.log('http listening on ' + conf.port + ', pid:' + process.pid)
})
```

## 2、编写客户端

假设你已经完成了 Vue3 的项目建设，如未完成请点这里 [vue3项目开发](../vue3/1.vue3%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91.md)

### 2.1 编写 webSocketHeart.ts 工具库

```ts
// ./src/utils/web-socket-heart.ts
export class WebSocketHeart {
  public url: string
  private pingTimeout: number
  private pongTimeout: number
  private reconnectTimeout: number
  private pingMsg: string
  public ws: WebSocket

  public onclose: Function
  public onerror: Function
  public onopen: Function
  public onmessage: Function
  public onreconnect: Function

  private lockReconnect: boolean
  private forbidReconnect: boolean

  private pingTimeoutId: NodeJS.Timeout
  private pongTimeoutId: NodeJS.Timeout

  constructor(options: Options) {
    const { url, pingTimeout, pongTimeout, reconnectTimeout, pingMsg } = options
    this.url = url // websocket服务端接口地址
    this.pingTimeout = pingTimeout || 3 * 60 * 1000 // 每隔 30 秒发送一次心跳，如果收到任何后端消息定时器将会重置
    this.pongTimeout = pongTimeout || 10000 // ping 消息发送之后，10 秒内没收到后端消息便会认为连接断开
    this.reconnectTimeout = reconnectTimeout || 3 * 60 * 1000 // 尝试重连的间隔时间
    this.pingMsg = pingMsg || '{"type":"heartbeat"}' // 发送心跳消息
    this.ws = null // websocket 实例

    // 回调钩子
    this.onclose = () => {}
    this.onerror = () => {}
    this.onopen = () => {}
    this.onmessage = () => {}
    this.onreconnect = () => {}

    this.createWebSocket()
  }

  // 创建 WebSocket 实例
  createWebSocket() {
    try {
      this.ws = new WebSocket(this.url)
      this.initEventHandle()
    } catch (e) {
      this.reconnect()
      throw e
    }
  }

  // 初始化事件钩子
  initEventHandle() {
    this.ws.onclose = () => {
      this.onclose()
      this.reconnect()
    }
    this.ws.onerror = () => {
      this.onerror()
      this.reconnect()
    }
    this.ws.onopen = () => {
      this.onopen()
      //心跳检测重置
      this.heartCheck()
    }
    this.ws.onmessage = event => {
      this.onmessage(event)
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      this.heartCheck()
    }
  }

  // 重连
  reconnect() {
    if (this.lockReconnect || this.forbidReconnect) return
    this.lockReconnect = true
    this.onreconnect()
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket()
      this.lockReconnect = false
    }, this.reconnectTimeout)
  }

  // 发送消息
  send(msg: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.ws.send(msg)
  }

  // 心态检测
  heartCheck() {
    this.heartReset()
    this.heartStart()
  }

  // 心态重置
  heartReset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }

  // 发送心跳
  heartStart() {
    if (this.forbidReconnect) return //不再重连就不再执行心跳
    this.pingTimeoutId = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage 拿到返回的心跳就说明连接正常
      this.ws.send(this.pingMsg)
      //如果超过一定时间还没重置，说明后端主动断开了
      this.pongTimeoutId = setTimeout(() => {
        //如果 onclose 会执行 reconnect，我们执行 ws.close() 就行了.如果直接执行 reconnect 会触发 onclose 导致重连两次
        this.ws.close()
      }, this.pongTimeout)
    }, this.pingTimeout)
  }

  // 手动关闭
  close() {
    //如果手动关闭连接，不再重连
    this.forbidReconnect = true
    this.heartReset()
    this.ws.close()
  }
}

export type Options = {
  url: string
  pingTimeout?: number
  pongTimeout?: number
  reconnectTimeout?: number
  pingMsg?: string
}
```

### 2.2 添加 chat 页面

配置路由：

```ts
// ./src/router/index.ts
{
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
    meta: {
      title: '聊天室',
    },
},
```

> ./src/views/chat/index.vue
```html
<template>
  <div class="page-index">
    <div class="page-chat">
      <h2>聊天室</h2>
      <n-button
        class="again-connect"
        @click="connectModal = true"
        >重新连接
      </n-button>
      <div class="chat-list">
        <ul ref="listRef">
          <li
            v-for="item in chatList"
            :class="{ 'chat-me': item.isMe }">
            <span class="chat-message">
              <span>{{ item.fromUser }}：</span>
              <span>{{ item.msg }}</span>
            </span>
          </li>
        </ul>
      </div>
      <n-input
        class="chat-input"
        v-model:value="sendMsg"
        placeholder="请输入内容"
        @keyup.enter="onSend" />
      <n-button
        class="chat-send"
        @click="onSend">
        发送
      </n-button>
    </div>

    <n-modal
      v-model:show="connectModal"
      preset="dialog"
      :mask-closable="false"
      title="连接聊天室"
      positive-text="连接"
      negative-text="取消"
      @positive-click="onConnectClick"
      @negative-click="connectModal = false">
      <n-input
        v-model:value="userName"
        placeholder="请输入用户名" />
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import { WebSocketHeart } from '@/utils/web-socket-heart'

type ChatData = {
  type?: string
  msg?: string
  userName?: string
  fromUser?: string
  roomId?: string
  isMe?: boolean
}

const connectModal = ref(false)
const userName = ref('')
let ws: WebSocketHeart = null

const chatList = ref<Array<ChatData>>([])

// 发送广播信息
const sendText = (msg: string) => {
  const str = JSON.stringify({ type: 'broadcast', msg })
  ws && ws.send(str)
}

// 给指定的人发送信息
const sendUser = (userName: string, msg: string) => {
  const str = JSON.stringify({ type: 'user', msg, userName })
  ws && ws.send(str)
}

const listRef = ref(null)
const setListScroll = () => {
  nextTick(() => {
    const div: HTMLElement = listRef.value
    if (div) {
      if (div.scrollHeight > div.clientHeight) {
        setTimeout(() => {
          div.scrollTop = div.scrollHeight
        }, 0)
      }
    }
  })
}

const connect = () => {
  const protocols = location.protocol === 'http:' ? 'ws://' : 'wss://'
  const url = protocols + location.host + '/connectchat'
  ws = new WebSocketHeart({ url })
  const sendConnect = () => {
    ws.send(
      JSON.stringify({
        type: 'connect',
        userName: userName.value,
      }),
    ) // 发送连接信息
    connectModal.value = false
  }
  ws.onopen = sendConnect
  ws.onreconnect = sendConnect
  ws.onmessage = (evt: MessageEvent<any>) => {
    if (typeof evt.data == 'string') {
      const json: ChatData = JSON.parse(evt.data)

      // 处理心跳
      if (json.type === 'heartbeat') {
        console.log(json)
      }

      // 接收 text 广播信息
      if (json.type === 'broadcast') {
        chatList.value.push(json)
        setListScroll()
      }

      // 接收来自 json.userName 的私信
      if (json.type === 'user') {
        console.log(json)
      }

      // close
      if (json.type === 'close') {
        window.$message.error(json.msg)
      }
    } else {
      // 解析二进制数据
    }
  }
}

const onConnectClick = () => {
  if (userName.value) {
    connect()
  } else {
    window.$message.error('用户名不能为空')
  }
  return false
}

onMounted(() => {
  connectModal.value = true
})

const sendMsg = ref('')
const onSend = () => {
  if (!sendMsg.value) {
    return
  }
  const data: ChatData = {
    msg: sendMsg.value,
    fromUser: '你',
    isMe: true,
  }
  chatList.value.push(data)
  sendText(data.msg)
  sendMsg.value = ''
  setListScroll()
}
</script>
<style lang="less" scoped>
.page-index {
  width: 100%;
  height: calc(100% - 40px);
  padding: 20px 0;
  .page-chat {
    background-color: #fff;
    margin: 0 auto;
    width: 800px;
    height: 100%;
    box-sizing: border-box;
    padding: 13px;
    position: relative;
  }
  .again-connect {
    position: absolute;
    right: 13px;
    top: 30px;
  }
  .chat-list {
    height: calc(100% - 120px);
    background-color: #f1f1f1;
    padding: 13px;
    box-sizing: border-box;
    padding-right: 0;
    ul {
      height: 100%;
      overflow: auto;
      padding-right: 13px;
      li {
        margin-top: 20px;
      }
      .chat-me {
        text-align: right;
        .chat-message {
          background-color: #fff;
          border-top-right-radius: 0;
          background-color: rgba(0, 190, 189, 0.2);
        }
      }
      .chat-message {
        background-color: #fff;
        padding: 8px 12px;
        vertical-align: top;
        word-break: break-all;
        border-radius: 8px;
        color: #333;
        display: inline-block;
        max-width: 420px;
        text-align: left;
      }
    }
  }
  .chat-input {
    margin-top: 14px;
    width: calc(100% - 56px);
  }
}
</style>
```

效果图：

<a data-fancybox title="效果图" href="/blog/img/web/websocket/1.png"><img :src="$withBase('/img/web/websocket/1.png')" alt="效果图"></a>