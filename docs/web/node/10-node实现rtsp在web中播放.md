# node 实现 RTSP 在 web 中播放

## 1、使用 VLC 等工具测试，确保 RTSP 流可连接

[VLC 下载](https://www.videolan.org/vlc/)

[RTSP 测试流](https://www.wowza.com/developer/rtsp-stream-test)

[搭建本地rtsp服务器]

## 2、RTSP 方案的对比

| 方案 |   协议    | 视频格式 |             延迟             | 离线事件汇报 | 最小端口占用 | 依赖                              |
| :--: | :-------: | :------: | :--------------------------: | ------------ | ------------ | --------------------------------- |
|  1   |    HLS    |   ogg    | 网络延迟较高，可达 10 秒以上 | 难           | n            | VLC + video.js                    |
|  2   |   RTMP    |   flv    |    网络延迟较低，5 秒左右    | 难           | n            | ffmpeg + nginx + flash + video.js |
|  3   | WebSocket |  mpegts  |   网络延迟较低，渲染速度慢   | 易           | 1            | ffmpeg + express + jsmpeg         |
|  4   | HTTP-FLV  |   flv    |   网络延迟较低，渲染速度快   | 易           | 1            | ffmpeg + express + flv.js         |

## 3、基于 flv.js 的 RTSP 播放方案

基于 `flvjs`，原理是在后端利用 转流工具 FFmpeg 将 `rtsp流` 转成 `flv流`，然后通过 `websocket` 传输 `flv流`，在利用 f`lvjs` 解析成可以在浏览器播放的视频。

## 4、安装依赖包

`npm install express express-ws fluent-ffmpeg websocket-stream @ffmpeg-installer/ffmpeg`

## 5、安装 ffmpeg

[ffmpeg 下载](https://ffmpeg.org/download.html)

下载后需要将 ffmpeg 的 bin 目录设置为环境变量

## 6、服务器代码

```js
var express = require('express');
var expressWebSocket = require('express-ws');
var ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path); // 此处
var webSocketStream = require('websocket-stream/stream');
function localServer() {
  let app = express();
  app.use(express.static(__dirname));
  expressWebSocket(app, null, {
    perMessageDeflate: true,
  });
  app.ws('/rtsp/:id/', rtspRequestHandle);
  app.listen(8888);
  console.log('express listened');
}
function rtspRequestHandle(ws, req) {
  console.log('rtsp request handle');
  const stream = webSocketStream(
    ws,
    {
      binary: true,
      browserBufferTimeout: 1000000,
    },
    {
      browserBufferTimeout: 1000000,
    },
  );
  let url = req.query.url;
  console.log('rtsp url:', url);
  console.log('rtsp params:', req.params);
  try {
    ffmpeg(url)
      .addInputOption('-rtsp_transport', 'tcp', '-buffer_size', '102400') // 这里可以添加一些 RTSP 优化的参数
      .on('start', function () {
        console.log(url, 'Stream started.');
      })
      .on('codecData', function () {
        console.log(url, 'Stream codecData.');
        // 摄像机在线处理
      })
      .on('error', function (err) {
        console.log(url, 'An error occured: ', err.message);
      })
      .on('end', function () {
        console.log(url, 'Stream end!');
        // 摄像机断线的处理
      })
      .outputFormat('flv')
      .videoCodec('copy')
      .noAudio()
      .pipe(stream);
  } catch (error) {
    console.log(error);
  }
}
localServer();
```

## 7、客户端代码

需要安装 flv.js

`pnpm i flv.js`

```html
<template>
  <div class="home-page">
    <button @click="clickbtn">播放</button>
    <video class="demo-video" ref="playerRef" muted autoplay></video>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import flvjs from 'flv.js';
  const playerRef = ref(null);
  let player = null;
  const id = '1';
  const rtsp =
    'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4';
  onMounted(() => {
    if (flvjs.isSupported()) {
      const video: any = playerRef.value;
      if (video) {
        player = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: `ws://localhost:8888/rtsp/${id}/?url=${rtsp}`,
        });
        player.attachMediaElement(video);
        player.load();
        // try {
        //   player.load()
        //   player.play()
        // } catch (error) {
        //   console.log(error)
        // }
      }
    }
  });

  const clickbtn = () => {
    player.play();
  };
</script>
```

在 vite.config.ts 中设置代理

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: true,
    port: 12001,
    proxy: {
      '^/rtsp': {
        // 局域网测试机地址
        target: 'http://localhost:8888',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/rtsp/, 'rtsp'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
})
```