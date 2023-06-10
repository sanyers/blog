# nginx搭建基于http-flv直播流媒体服务器

- 通过nginx开启一个流媒体服务，通过HTTP-FLV拉流
- 下载VLC软件, VLC播放器实现HTTP-FLV拉流进行播放；或者通过flv.js在web端播放

## 1、安装前置组件

```
sudo apt-get update
sudo apt-get install gcc
sudo get-get install openssl
sudo apt-get install libpcre3
apt install zlib zlib1g zlib1g-dev
```

## 2、编译nginx

下载 [nginx](http://nginx.org/download/)

`wget http://nginx.org/download/nginx-1.19.9.tar.gz`

下载 [nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module)

`wget https://github.com/winshining/nginx-http-flv-module/archive/refs/tags/v1.2.11.tar.gz`

解压：`tar -zxvf nginx-1.19.9.tar.gz` `tar -zxvf v1.2.11.tar.gz`

配置：`./configure --add-module=/root/nginx-http-flv-module-1.2.11 --with-http_ssl_module`

```sh
make
sudo make install # 安装完会在 /usr/local/nginx
# 查看是否安装好
whereis nginx
```

## 3、配置 nginx.conf

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
    }
}

rtmp_auto_push on;
rtmp_auto_push_reconnect 1s;

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
    }
}
```

在服务器环境还需开放 `80` 和 `1935` 端口

## 4、启动 nginx

`cd /usr/local/nginx/sbin/nginx`

`./nginx`

配置 nginx 为全局变量

`ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/`

`sudo nginx -c /usr/local/nginx/conf/nginx.conf`

## 5、ubuntu 设置nginx 开机自启

新建 nginx.service

`vim /usr/lib/systemd/system/nginx.service`

```conf
Description=nginx - high performance web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
[Install]
WantedBy=multi-user.target
```

说明：

- Description:描述服务
- After:依赖，当依赖的服务启动之后再启动自定义的服务
- [Service]服务运行参数的设置
- Type=forking是后台运行的形式
- ExecStart为服务的具体运行命令(需要根据路径适配)
- ExecReload为重启命令(需要根据路径适配)
- ExecStop为停止命令(需要根据路径适配)
- PrivateTmp=True表示给服务分配独立的临时空间

注意：启动、重启、停止命令全部要求使用绝对路径

- [Install]服务安装的相关设置，可设置为多用户

命令：

- systemctl daemon-reload 重置服务列表
- systemctl start nginx.service 启动服务
- systemctl disable nginx.service 关闭开机自启
- systemctl enable nginx.service 开启开机自启
- systemctl status nginx.service 查看状态
- systemctl restart nginx.service 重启服务
- systemctl list-units --type=service 查看所有服务

## 6、使用 ffmpeg 推流本地摄像头和麦克风

安装ffmpeg（如果已安装则不需要）`sudo apt install ffmpeg`

`ffmpeg -f dshow -i video="BisonCam,NB Pro":audio="Microphone (High Definition Audio Device)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://127.0.0.1/live/test`

## 7、拉流（播放视频流）

### 7.1 VLC 播放

媒体 -> 打开网络串流 -> 网络 -> 输入地址 `rtmp://127.0.0.1/live/test` 或者 `http://127.0.0.1/live?port=1935&app=live&stream=test`

### 7.2 Web 端播放

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

## 8、参考

https://blog.csdn.net/qq_39296114/article/details/116647929

https://blog.csdn.net/flyawayl/article/details/108218807

https://blog.csdn.net/Prinz_Corn/article/details/120746676

https://www.cnblogs.com/daner1257/p/10549232.html

https://blog.csdn.net/Prinz_Corn/article/details/120746676