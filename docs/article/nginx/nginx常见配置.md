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
        location /api {
            # rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://localhost:6005;
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

## 9、反向代理重写 URL

```conf
server {
    listen              80;
    server_name         default;
    
    location /api/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://example.com;
    }
}
```

请求到 /api/exampleapi 时，会转发到 http://example.com/api/exampleapi

方案一：

在 proxy_pass 后增加 / 则 nginx 会将 /api 之后的内容拼接到 proxy_pass 之后

```conf
server {
  listen              80;
  server_name         default;
    
  location /api/ {
      proxy_set_header Host $host;
      proxy_set_header  X-Real-IP        $remote_addr;
      proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://example.com/;
  }
}
```

方案二：

使用 rewrite，注意到 proxy_pass 结尾没有 /， rewrite 重写了 url

```conf
server {
  listen              80;
  server_name         default;
    
  location /api/ {
      proxy_set_header Host $host; # Host不填写可能会出现 403 跨域检测无效
      proxy_set_header  X-Real-IP        $remote_addr;
      proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;

      rewrite ^/api/(.*)$ /$1 break;
      proxy_pass http://example.com;
  }
}
```

## 10、域名代理

```
server {
       listen 80;
       server_name  xxx.sanyer.top;
       location / {
           proxy_pass  http://127.0.0.1:8080;
           proxy_set_header Host $proxy_host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
}
```

## 11、支持 mjs

若没有配置 mjs 则报如下错误：

```
nginx: [warn] duplicate extension "js", content type: "application/javascript", previous content type: "application/javascript" in /usr/local/nginx/conf/mime.types:33
```

需要修改配置：

```bash
vim /usr/local/nginx/conf/mime.types
# 或
vim /etc/nginx/mime.types

# 添加 mjs 格式
application/javascript                           js mjs;

sudo nginx -s reload
```

## 12、API接口代理

本地端口代理

```conf
server {
    listen 80;
    server_name  0.0.0.0;
    location /my_api {
        proxy_pass http://localhost:13000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

域名接口代理

```conf
server {
    listen 80;
    server_name  0.0.0.0;
    location /my_api/ {
        proxy_pass http://api.sanyer.top/;
        rewrite ^/my_api/(.*)$ /$1 break;
    }
}
```