# node 服务端主动推送数据

HTTP 协议遵循经典的`客户端-服务器`模型，客户端发送一个请求，然后等待服务器端的响应，服务器端只能在接收到客户端的请求之后进行响应，不能主动的发送数据到客户端。

客户端想要在不刷新页面的情况下实时获取到服务器端最新的数据，可以通过以下途径：

1. 轮询
2. 长轮询
3. HTTP 流
4. SSE
5. Web Sockets

## 1、轮询

轮询是在特定的的时间间隔（如每 1 秒），由浏览器对服务器发出 HTTP request，然后由服务器返回最新的数据给客户端的浏览器。这种传统的 HTTP request 的模式带来很明显的缺点 – 浏览器需要不断的向服务器发出请求，然而 HTTP request 的 header 是非常长的，里面包含的有用数据可能只是一个很小的值，这样会占用很多的带宽。

客户端（浏览器）定时向服务器端发送请求，获取最新的数据。可以通过在一个定时器中触发 ajax 请求来实现：

```js
function showUnreadNews() {
  $(document).ready(function () {
    $.ajax({
      type: 'POST',
      url: 'unread_list.js',
      dataType: 'json',
      success: function (data) {
        alert(data);
      },
    });
  });
}
setInterval('showUnreadNews()', 5000); //轮询执行，5000ms一次
```

**优点：**

实现简单，JS 端进行一些更改即可，无需后端服务任何改动

**缺点：**

轮询的间隔过长，会导致用户不能及时接收到更新的数据；轮询的间隔过短，会导致查询请求过多，增加服务器端的负担

## 2、长轮询

长轮询方法实现原理如下：

1. 客户端发起一个请求到服务器端(http request)
2. 服务器端一直保持连接打开，直到有数据数据可发送给客户端，再返回这个请求(http response)
3. 客户端收到服务器端返回的数据后，处理数据，并立马发起一个新的请求

```js
// 客户端示例js
function showUnreadNews() {
  $.ajax({
    type: 'POST',
    url: 'unread_list.js',
    dataType: 'json',
    success: function (data) {
      //处理返回数据
      alert(data);
      //再次请求
      showUnreadNews();
    },
    complete: function (XMLHttpRequest, textStatus) {
      if (textStatus == 'timeout') {
        //判断是否超时
        showUnreadNews(); //超时，重新请求
      }
    },
  });
}
```

```js
// server端示例(nodejs)
var aTargets = [];
app.get('/notification', function(req, res) {
    aTargets.push(res);
  //res.end();  这里不调用res.end(),让http request连接一直存活着
})//此方法会在有新的数据时调用
onNewNotification : function (data) {
  aTargets.forEach(function(res){
    res.send(data);//当有新的数据时，再调用res.send(data)返回最新的数据,结束一次http请求
  })
}
```

**优点：**

- 可以及时获取到最新的数据
- 相较于轮询策略，减少了请求数量

**缺点：**

服务器端要一直保持连接，不能释放，由于一个服务器能够处理的连接数有限，当达到服务器处理的上限的时候，服务器将无法响应新的请求

## 3、HTTP 流

HTTP 流区别于轮询和长轮询方法，它在客户端网页的生命周期内，只需要使用一个 HTTP 连接，也就是只会向服务器发送一个请求，对于这个请求，服务器会保持 HTTP 连接（不返回 response），然后周期性的向浏览器发送数据。

首先我们创建一个服务器：

```js
const express = require('express');
const app = express();
const port = 3100;

app.listen(port, () => {
  console.log('FastTest Admin API at: ', port);
});
```

然后，我们在需要流式返回响应的接口里设置相应头 `Content-type: application/octet-stream`。接下来，只要我们不断向输出流写入内容就可以了。哦，对了，结束的时候，我们还要关闭输出流。

```js
// server端示例(nodejs)
const gzip = require('zlib').createGzip();
const fs = require('fs');

app.post('/httpstream', async (req, res, next) => {
  res.setHeader('Content-type', 'application/octet-stream');

  // 第一种输出流方式：调用 write 输出
  var x = 0;
  setInterval(() => {
    res.write(x++ + '|');
  }, 2000);
  // 关闭输出流
  // res.end();

  // 第二种输出流方式：从一个流转向另一个流，也就是数据本身就是一个流，然后调用 pipe 返回这个流
  const response = await apiTest(params); // apiTest 是一个 axios 请求方法，返回的也是一个流
  const stream = response.data;
  stream.pipe(res);

  // 第三种输出流方式：从文件转换为流的方式
  const stream = fs.createReadStream('The.Matrix.1080p.mkv');
  stream.pipe(gzip).pipe(res); // 大文件可以先压缩在转换为流传输
});
```

```js
// 客户端示例 XMLHttpRequest
var xhr = new XMLHttpRequest();
var received = 0;
var result = '';
xhr.open('post', '/httpstream', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 3) {
    //readystate 3 表示正在解析数据
    result = xhr.responseText.substring(received); //截取最新的数据
    received += result.length;
    console.log(result);
  }
};
const json = JSON.stringify({ name: 'test1' }); // post 请求数据，若为空可不传
xhr.send(json);

// 客户端示例 axios
const fnTest = (data: any, onDownloadProgress: any) => {
  return axios.request({
    method: 'post',
    url: '/httpstream',
    data,
    onDownloadProgress,
  });
};

async function doTest() {
  const params = {};
  let offset = 0;
  await fnTest(params, ({ target: xhr }) => {
    const { responseText } = xhr;
    const chunk = responseText.substring(offset);
    // 记录这一次的结束位置
    offset = responseText.length;
    console.log(chunk);
  });
}
```

随着不断从服务器端接收到数据，客户端的 readyState 会周期性的变成 3，responseText 包含所有的数据源。通过 received 来记录之前已经处理过的数据长度，然后在 responseText 中截取最新的数据。

服务端部署：

```conf
# 仅展示有关配置
location /data {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://localhost:3100;
        # 关闭代理缓冲区，所有响应实时输出
        proxy_buffering off;
}
```

**优点：**

页面的整个生命周期内，只需要建立一个 http 连接

**缺点：**

- 如果接入的客户端过多，服务器端会因为 http 连接有限而无法为新的客户端提供服务
- 客户端接收到的数据流会越来越大，最终可能会引发页面的性能问题

## 4、SSE

SSE(Server-Sent Events)是基于 HTTP 实现的一套服务器向客户端发送数据的 API。他是针对上面说到的三种方法（轮询，长轮询，HTTP 流）的一个标准 API 实现。

使用 SSE API 可以创建到服务器端的但相连接，服务器可以通过这个连接发送任意数据。它有以下特点：

- 断开自动连接
- 服务器响应的 MIME 类型必须是 `text/event-stream`
- 需要浏览器 API 支持([参考浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7))

使用方法如下：

```js
//客户端js
var source = new EventSource(url);
//建立连接时触发
source.onopen = function () {
  //do something here
};
//从服务器端接收到新的事件时触发
source.onmessage = function (event) {
  var data = event.data; //服务器返回的数据存放在event.data中
};
//连接异常时触发
source.onerror = function () {
  //do something here
};
```

客户端创建一个 EventSource 对象，绑定到对应的 url，然后监听该对象的 onmessage 事件就可以获取到最新的数据。

```js
// server端示例(nodejs)
let express = require('express');
let app = express();
app.use(express.static('resources'));
app.get('/httpstream', function (req, res) {
  var x = 0;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  //每个1s往客户端发送一条数据
  setInterval(function () {
    res.write('data: ' + x++ + '\n\n'); //发送的数据格式必须是"data: <内容>/n/n"
  }, 1000);
});
app.listen(3000);
```

## 5、Web Sockets

不同于 SSE，Web Sockets 采用了一套全新的协议（ws/wss）来建立客户端到服务器端的全双工、双向通信连接。

WebSocket 的定义：

WebSocket 是 Web 应用程序的传输协议，它提供了双向的，按序到达的数据流。他是一个 Html5 协议，WebSocket 的连接是持久的，他通过在客户端和服务器之间保持双工连接，服务器的更新可以被及时推送给客户端，而不需要客户端以一定时间间隔去轮询

为什么需要 WebSocket？

- HTTP 协议是一种无状态的、无连接的、单向的应用层协议；
- 它采用了请求/响应模型；
- 通信请求只能由客户端发起，服务端对请求做出应答处理；
- 这种通信模型有一个弊端：HTTP 协议无法实现服务器主动向客户端发起消息；
- 这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦；
- 大多数 Web 应用程序将通过频繁的异步 JavaScript 和 XML（AJAX）请求实现长轮询；
- 轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开），因此 WebSocket 应运而生，需要一种可以保持连接、进行全双工通信的协议；
- WebSocket 连接允许客户端和服务器之间进行全双工通信，以便任一方都可以通过建立的连接将数据推送到另一端；
- WebSocket 只需要建立一次连接，就可以一直保持连接状态，这相比于轮询方式的不停建立连接显然效率要大大提高。

WebSocket 的应用场景：

实时性要求高的场景：社交聊天、弹幕、多玩家游戏、协同编辑、股票基金实时报价、体育实况更新、视频会议/聊天、基于位置的应用、在线教育、智能家居等需要高实时的场景。

使用[详见](https://sanyers.github.io/blog/web/websocket/)

**优点：**

- 双向通信，实时连接
- 相较于 HTTP 请求更加高效(不需要握手，连接始终存在；无需携带头部信息)

**缺点：**

稳定性和成熟度问题

## 6、参考

[backpressuring-in-streams](https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams)

[基于 nodejs 的几种 http 文件传输方案实践](https://juejin.cn/post/7052946931194003463)

[用 express.js 实现流式输出 HTTP 响应](https://blog.meathill.com/js/make-express-js-stream-http-response.html)

[Web 应用从服务端主动推送数据到客户端的方式有哪些](https://www.hepengfei.net/javascript/132.html)
