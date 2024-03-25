# nginx

## 常用命令

```
start nginx.exe

nginx -s stop                  //停止nginx
nginx -s reload                //重新加载nginx
nginx -s quit                  //退出nginx
```

## Nginx 服务器的文件大小的限制及 413request Entity too Large

```conf
http {
#配置客户端请求体最大值
client_max_body_size 20M;
#配置请求体缓存区大小
client_body_buffer_size 10m;
}
```
