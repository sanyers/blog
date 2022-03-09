# JavaScript WebRTC 多人视频通话

得益于现代浏览器对于WebRTC规范的支持度，使用JavaScript实现多人音视频通话的方案技术越来越趋于成熟，经过一个月的学习，成功写出完全基于JavaScript实现音视频通话。[贴上代码](https://gitee.com/sanyers/web-rtc-ws)

## 技术要点

- nodejs v10.22.1
- express 4.17.2
- ws 8.4.0

## 安装

`npm i express ws`

## 实现流程

<div class="img-page">
<a data-fancybox title="实现流程" href="/blog/img/web/webrtc/page_1.png"><img :src="$withBase('/img/web/webrtc/page_1.png')" alt="实现流程"></a>
</div>

## 创建信令服务器

`./server/many.js`

```js
// 多对多视频通话
var express = require('express'); // web框架
const fs = require('fs');

var app = express();
app.use("/js", express.static("example/js"));
app.use("/", express.static("example/many"));

let options = {
    key: fs.readFileSync('./ssl/privatekey.pem'), // 证书文件的存放目录
    cert: fs.readFileSync('./ssl/certificate.pem')
}

const server = require('https').Server(options, app);
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
    ws.on('message', function message (data) {
        const str = data.toString();
        const json = JSON.parse(str);
        switch (json.type) {
            case 'conn': // 新用户连接
                ws.userName = json.userName;
                ws.send(JSON.stringify(json));
                break;
            case 'room': // 用户加入房间
                ws.roomName = json.roomName;
                ws.streamId = json.streamId;
                const roomUserList = getRoomUser(ws); // 找到当前房间内的所有用户
                if (roomUserList.length) {
                    const jsonStr = {
                        type: 'room',
                        roomUserList
                    }
                    ws.send(JSON.stringify(jsonStr)); // 返回房间的其他用户信息给当前用户
                }
                break;
            default:
                sendUser(ws, json);
                break;
        }
    });

    ws.on('close', () => {
        const str = JSON.stringify({
            type: 'close',
            sourceName: ws.userName,
            streamId: ws.streamId
        });
        sendMessage(ws, str); // 告诉房间内其他用户有连接关闭
    })
});

// 给所有用户发送数据
function sendMessage (ws, str) {
    wss.clients.forEach(item => {
        if (item.userName != ws.userName && item.roomName === ws.roomName && item.readyState === 1) {
            item.send(str);
        }
    })
}

// 给用户发送数据
function sendUser (ws, json) {
    if (ws.userName !== json.userName) {
        wss.clients.forEach(item => {
            if (item.userName === json.userName && item.roomName === ws.roomName && item.readyState === 1) {
                const temp = { ...json };
                delete temp.userName;
                temp.sourceName = ws.userName;
                temp.streamId = ws.streamId;
                item.send(JSON.stringify(temp));
            }
        })
    }
}

// 返回房间内所有用户信息
function getRoomUser (ws) {
    const roomUserList = [];
    wss.clients.forEach(item => {
        if (item.userName != ws.userName && item.roomName === ws.roomName) {
            roomUserList.push(item.userName);
        }
    });
    return roomUserList;
}

const config = {
    port: 8103
};
server.listen(config.port); // 启动服务器
console.log('https listening on ' + config.port);
```

## 创建客户端

`./example/many/index.html`

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>多人频通话</title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <div class="container">
        <h1>多人频通话</h1>
        <input type="text" id="userName" placeholder="请输入用户名" />
        <button id="startConn">连接</button>
        <input type="text" id="roomName" placeholder="请输入房间号" />
        <button id="joinRoom">加入房间</button>
        <button id="hangUp">挂断</button>
        <hr>
        <div id="videoContainer" class="video-container" align="center"></div>
        <hr>
        <!-- WebRTC兼容文件 -->
        <script src="/js/adapter-latest.js"></script>
        <script src="main.js"></script>
    </div>
</body>

</html>
```

`./example/many/main.css`

```css
.video-container {
    display: flex;
    justify-content: center;
}
.video-item {
    width: 400px;
    margin-right: 10px
}

.video-play {
    width: 100%;
    height: 300px;
}
```

`./example/many/main.js`

```js
const userName = document.getElementById('userName'); // 用户名输入框
const roomName = document.getElementById('roomName'); // 房间号输入框
const startConn = document.getElementById('startConn'); // 连接按钮
const joinRoom = document.getElementById('joinRoom'); // 加入房间按钮
const hangUp = document.getElementById('hangUp'); // 挂断按钮
const videoContainer = document.getElementById('videoContainer'); // 通话列表

roomName.disabled = true;
joinRoom.disabled = true;
hangUp.disabled = true;

var pcList = []; // rtc连接列表
var localStream; // 本地视频流
var ws; // WebSocket 连接

// ice stun服务器地址
var config = {
    'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
    }]
};

// offer 配置
const offerOptions = {
    offerToReceiveVideo: 1,
    offerToReceiveAudio: 1
};

// 开始
startConn.onclick = function () {
    ws = new WebSocket('wss://' + location.host);
    ws.onopen = evt => {
        console.log('connent WebSocket is ok');
        const sendJson = JSON.stringify({
            type: 'conn',
            userName: userName.value,
        });
        ws.send(sendJson); // 注册用户名
    }
    ws.onmessage = msg => {
        const str = msg.data.toString();
        const json = JSON.parse(str);
        switch (json.type) {
            case 'conn':
                console.log('连接成功');
                userName.disabled = true;
                startConn.disabled = true;
                roomName.disabled = false;
                joinRoom.disabled = false;
                hangUp.disabled = false;
                break;
            case 'room':
                // 返回房间内所有用户
                sendRoomUser(json.roomUserList, 0);
                break;
            case 'signalOffer':
                // 收到信令Offer
                signalOffer(json);
                break;
            case 'signalAnswer':
                // 收到信令Answer
                signalAnswer(json);
                break;
            case 'iceOffer':
                // 收到iceOffer
                addIceCandidates(json);
                break;
            case 'close':
                // 收到房间内用户离开
                closeRoomUser(json);
            default:
                break;
        }
    }
}

// 加入或创建房间
joinRoom.onclick = function () {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (mediastream) {
        localStream = mediastream; // 本地视频流
        addUserItem(userName.value, localStream.id, localStream);
        const str = JSON.stringify({
            type: 'room',
            roomName: roomName.value,
            streamId: localStream.id
        });
        ws.send(str);
        roomName.disabled = true;
        joinRoom.disabled = true;
    }).catch(function (e) {
        console.log(JSON.stringify(e));
    });
}

// 创建WebRTC
function createWebRTC (userName, isOffer) {
    const pc = new RTCPeerConnection(config); // 创建 RTC 连接
    pcList.push({ userName, pc });
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream)); // 添加本地视频流 track
    if (isOffer) {
        // 创建 Offer 请求
        pc.createOffer(offerOptions).then(function (offer) {
            pc.setLocalDescription(offer); // 设置本地 Offer 描述，（设置描述之后会触发ice事件）
            const str = JSON.stringify({ type: 'signalOffer', offer, userName });
            ws.send(str); // 发送 Offer 请求信令
        });
        // 监听 ice
        pc.addEventListener('icecandidate', function (event) {
            const iceCandidate = event.candidate;
            if (iceCandidate) {
                // 发送 iceOffer 请求
                const str = JSON.stringify({ type: 'iceOffer', iceCandidate, userName });
                ws.send(str);
            }
        });
    }
    return pc;
}

// 为每个房间用户创建RTCPeerConnection
function sendRoomUser (list, index) {
    createWebRTC(list[index], true);
    index++;
    if (list.length > index) {
        sendRoomUser(list, index);
    }
}

// 接收 Offer 请求信令
function signalOffer (json) {
    const { offer, sourceName, streamId } = json;
    addUserItem(sourceName, streamId);
    const pc = createWebRTC(sourceName);
    pc.setRemoteDescription(new RTCSessionDescription(offer)); // 设置远端描述
    // 创建 Answer 请求
    pc.createAnswer().then(function (answer) {
        pc.setLocalDescription(answer); // 设置本地 Answer 描述
        const str = JSON.stringify({ type: 'signalAnswer', answer, userName: sourceName });
        ws.send(str); // 发送 Answer 请求信令
    });

    // 监听远端视频流
    pc.addEventListener('addstream', function (event) {
        document.getElementById(event.stream.id).srcObject = event.stream; // 播放远端视频流
    });
}

// 接收 Answer 请求信令
function signalAnswer (json) {
    const { answer, sourceName, streamId } = json;
    addUserItem(sourceName, streamId);
    const item = pcList.find(i => i.userName === sourceName);
    if (item) {
        const { pc } = item;
        pc.setRemoteDescription(new RTCSessionDescription(answer)); // 设置远端描述
        // 监听远端视频流
        pc.addEventListener('addstream', function (event) {
            document.getElementById(event.stream.id).srcObject = event.stream;
        });
    }
}

// 接收ice并添加
function addIceCandidates (json) {
    const { iceCandidate, sourceName } = json;
    const item = pcList.find(i => i.userName === sourceName);
    if (item) {
        const { pc } = item;
        pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
    }
}

// 房间内用户离开
function closeRoomUser (json) {
    const { sourceName, streamId } = json;
    const index = pcList.findIndex(i => i.userName === sourceName);
    if (index > -1) {
        pcList.splice(index, 1);
    }
    removeUserItem(streamId);
}

// 挂断
hangUp.onclick = function () {
    userName.disabled = false;
    startConn.disabled = false;
    roomName.disabled = true;
    joinRoom.disabled = true;
    hangUp.disabled = true;
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    pcList.forEach(element => {
        element.pc.close();
        element.pc = null;
    });
    pcList.length = 0;
    if (ws) {
        ws.close();
        ws = null;
    }
    videoContainer.innerHTML = '';
}

// 添加用户
function addUserItem (userName, mediaStreamId, src) {
    const div = document.createElement('div');
    div.id = mediaStreamId + '_item';
    div.className = 'video-item';
    const span = document.createElement('span');
    span.className = 'video-title';
    span.innerHTML = userName;
    div.appendChild(span);
    const video = document.createElement('video');
    video.id = mediaStreamId;
    video.className = 'video-play';
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.webkitPlaysinline = true;
    src && (video.srcObject = src);
    div.appendChild(video);
    videoContainer.appendChild(div);
}

// 移除用户
function removeUserItem (streamId) {
    videoContainer.removeChild(document.getElementById(streamId + '_item'));
}
```

## 运行

`node ./server/many.js`