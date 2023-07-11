# nginx常见配置

## 1、转发tcp

```conf
stream {
	proxy_timeout 30m;
    server {
        listen 8080;
        proxy_pass localhost:55328;
    }
}
```

## 2、转发 WebSocket

要先配置 `$connection_upgrade`，在 http 下

```conf
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
}
```

```conf
location ^~ /wsUrl {
    proxy_pass http://localhost:13001;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_set_header  Host $http_host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
}
```

## 3、转发 SSE 长连接

如上，要先配置 `$connection_upgrade`

```conf
location /sse {
    proxy_pass http://localhost:13001;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_set_header  Host $http_host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_cache off;
}
```

## 4、配置子路径

### 4.1 Vite+Vue3 配置

vite 配置，修改 `vite.config.ts`

```ts
export default defineConfig({
  base: '/test/',
});
```

Vue3 配置，修改 `router` 文件

```ts
const router = createRouter({
  history: createWebHistory('/test/'),
  routes,
});
```

### 4.2 nginx

```conf
http {
    server {
        listen 80;
        server_name  localhost;
        location / {
            root /root/home-page;
            try_files $uri $uri/ @router;
            charset 'utf-8';
            index  index.html index.htm;  
        }

        location ^~/test {
            alias  /root/home-page/test;
            index  index.html index.htm;
            try_files $uri $uri/ /test/index.html;
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
   }
}
```

## 5、配置https

```conf
server {
    listen 443 ssl http2;
    server_name  localhost; # 可以配置多个域名，复制多份 server，设置不同的server_name

    ssl_certificate "../ssl/localhost_cert.pem";
    ssl_certificate_key "../ssl/localhost_key.key";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}
```

## 6、http转https

```conf
server {
   listen 80;
   server_name  test.sanyer.top;
   rewrite ^(.*) https://test.sanyer.top;
}
```

## 7、开启gzip

```conf
server {
    gzip on;
    gzip_static on;
    gzip_min_length 1k;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";   
    gzip_buffers 32 4k;
    gzip_http_version 1.1;
}
```

## 8、加载多个配置

当nginx代理多个站点时，如果还是一个 nginx.conf 配置文件将变得巨大，因此可以将站点配置分解成多个配置

在 nginx.conf 配置文件中修改：

```conf
http {
    include /usr/local/nginx/conf/sites/*; # 导入多个配置文件
}
```