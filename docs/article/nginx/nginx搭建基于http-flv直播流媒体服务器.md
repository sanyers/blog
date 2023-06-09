# nginx搭建基于http-flv直播流媒体服务器

- 通过nginx开启一个流媒体服务，通过HTTP-FLV拉流
- 下载VLC软件, VLC播放器实现HTTP-FLV拉流进行播放；或者通过flv.js在web端播放

## 1、编译

下载 https://github.com/winshining/nginx-http-flv-module 源码进行编译

## 2、配置 nginx.conf

```conf
#user  root;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		
		location /live {
            flv_live on; #打开HTTP播放FLV直播流功能
            chunked_transfer_encoding on; #支持'Transfer-Encoding: chunked'方式回复

            add_header 'Access-Control-Allow-Origin' '*'; #添加额外的HTTP头
            add_header 'Access-Control-Allow-Credentials' 'true'; #添加额外的HTTP头
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}

rtmp_auto_push on;
rtmp_auto_push_reconnect 1s;
rtmp_socket_dir temp;

rtmp {
    out_queue           4096;
    out_cork            8;
    max_streams         128;
    timeout             15s;
    drop_idle_publisher 15s;

    log_interval 5s; #log模块在access.log中记录日志的间隔时间，对调试非常有用
    log_size     1m; #log模块用来记录日志的缓冲区大小

    server {
        listen 1935;
        #server_name www.test.*; #用于虚拟主机名后缀通配

        application live {
            live on;
            gop_cache off; #GOP缓存，减少首屏等待时间，会有延迟
        }

        application hls {
            live on;
            hls on;
            hls_path temp/hls;
        }

        application dash {
            live on;
            dash on;
            dash_path temp/dash;
        }
    }
}
```

## 3、使用 ffmpeg 推流本地摄像头和麦克风

`ffmpeg -f dshow -i video="BisonCam,NB Pro":audio="Microphone (High Definition Audio Device)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://127.0.0.1/live/test`

## 4、拉流（播放视频流）

### 4.1 VLC 播放

媒体 -> 打开网络串流 -> 网络 -> 输入地址 `rtmp://127.0.0.1/live/test` 或者 `http://127.0.0.1/live?port=1935&app=live&stream=test`

### 4.2 Web 端播放

使用 flv.js 直接播放

http://127.0.0.1/live?port=1935&app=live&stream=test

在Vue3中播放

`pnpm i flv.js`

```html
<template>
  <div class="home-page">
    <h4>html5播放flv</h4>
    <button @click="clickCount">播放</button>
    <video class="demo-video" ref="playerRef" muted autoplay></video>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import flvjs from 'flv.js'

const playerRef = ref(null)
let player: any = null
onMounted(() => {
  if (flvjs.isSupported()) {
    const video: any = playerRef.value
    if (video) {
      player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: `/fflv`,
      })
      player.attachMediaElement(video)
      player.load()
    }
  }
})

const clickCount = () => {
  const video: any = playerRef.value
  if (video) {
    video.play()
  }
}
</script>
<style lang="less" scoped>
.home-page {
  font-size: 14px;
  .demo-video {
    max-width: 880px;
    max-height: 660px;
  }
}
</style>
```

配置 vite.config.ts 跨域：

```ts
proxy:{
    '^/fflv': {
        target: 'http://127.0.0.1/live?port=1935&app=live&stream=test',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/fflv/, ''),
      },
}
```

