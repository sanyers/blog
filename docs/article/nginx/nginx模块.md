# nginx编译参数详解

`--prefix=path` nginx 程序目录。默认值：/usr/local/nginx。

`--conf-path=path` nginx 配置文件的名称。默认值：`<prefix>/conf/nginx.conf`。但是，在启动时通过 -c filename 指定的配置文件优先级最高。

`--sbin-path=path` nginx 可执行文件的名称，仅在安装期间使用。默认值：`<prefix>/sbin/nginx`。

## 安装后可在配置文件中更改项

`--pid-path=path`

nginx.pid 文件的名称。默认值：`<prefix>/logs/nginx.pid`。安装后，可以使用 nginx.conf 中的 pid 指令更改。

`--error-log-path=path`

错误日志文件的名称。默认值：`<prefix>/logs/error.log`。安装后，可以使用 nginx.conf 中的 error_log 指令更改。

`--http-log-path=path`

HTTP 服务器的主请求日志文件的名称。默认值：`<prefix>/logs/access.log`。安装后，可以使用 nginx.conf 中的 access_log 指令更改。

`--lock-path=path`

为锁定文件的名称设置前缀。默认值：`<prefix>/logs/nginx.lock`。安装后，可以使用 nginx.conf 中的 lock_file 指令更改。

`--user=name`

nginx 运行用户。默认值：nobody。安装后，可以使用 nginx.conf 中的 user 指令更改。

`--group=name`

nginx 运行组。默认值：--user 指定的值。安装后，可以使用 nginx.conf 中的 user 指令更改。

`--http-client-body-temp-path=path`

定义用于存储包含客户端请求正文的临时文件的目录。默认值：`<prefix>/client_body_temp`。安装后，可以使用 nginx.conf 中的 client_body_temp_path 指令更改。

`--http-proxy-temp-path=path`

定义用于存储包含从代理服务器接收到的数据的临时文件。默认值：`<prefix>/proxy_temp`。安装后，可以使用 nginx.conf 中的 proxy_temp_path 指令更改。

`--http-fastcgi-temp-path=path`

定义用于存储包含从 FastCGI 服务器接收到的数据的临时文件。默认值：`<prefix>/fastcgi_temp`。安装后，可以使用 nginx.conf 中的 fastcgi_temp_path 指令更改。

`--http-uwsgi-temp-path=path`

定义用于存储带有从 uwsgi 服务器接收到的数据的临时文件。默认值：`<prefix>/uwsgi_temp`。安装后，可以使用 nginx.conf 中的 uwsgi_temp_path 指令更改。

`--http-scgi-temp-path=path`

定义用于存储包含从 SCGI 服务器接收到的数据的临时文件。默认值：`<prefix>/scgi_temp`。安装后，可以使用 nginx.conf 中的 scgi_temp_path 指令更改。


## 默认已开启模块：

`--without-http_charset_module`

禁用 ngx_http_charset_module 模块，该模块将指定的字符集添加到 “Content-Type” 响应头字段中，还可以将数据从一种字符集转换为另一种字符集，但有一些限制。

`--without-http_gzip_module`

禁用 ngx_http_gzip_module 模块。

`--without-http_ssi_module`

禁用 ngx_http_ssi_module 模块。该模块用于处理通过它的响应中的 SSI(服务器端包含)命令。

`--without-http_userid_module`

禁用 ngx_http_userid_module 模块，该模块设置适用于客户端标识的 cookie。

`--without-http_access_module`

禁用 ngx_http_access_module 模块，该模块允许限制对某些客户端地址的访问。

`--without-http_auth_basic_module`

禁用 ngx_http_auth_basic_module 模块，该模块允许通过使用 “HTTP Basic Authentication” 协议验证用户名和密码来限制对资源的访问。

`--without-http_mirror_module`

禁用 ngx_http_mirror_module 模块。

`--without-http_autoindex_module`

禁用 ngx_http_autoindex_module 模块。该模块处理以斜杠字符 “/” 结尾的请求，并生成目录列表。

`--without-http_geo_module`

禁用 ngx_http_geo_module 模块，该模块使用取决于客户端 IP 地址的值来创建变量。

`--without-http_map_module`

禁用 ngx_http_map_module 模块，该模块创建的变量的值取决于其他变量的值。

`--without-http_split_clients_module`

禁用 ngx_http_split_clients_module 模块，该模块创建用于 A/B 测试的变量。

`--without-http_referer_module`

禁用 ngx_http_referer_module 模块，该模块可以阻止对 “Referer” 标头字段中具有无效值的请求的站点访问。

`--without-http_rewrite_module`

禁用 URL 转发(rewrite)。

`--without-http_proxy_module`

禁用 HTTP 服务器代理(proxy)模块。

`--without-http_fastcgi_module`

禁用 ngx_http_fastcgi_module 模块。该模块允许将请求传递到 FastCGI 服务器。

`--without-http_uwsgi_module`

禁用 ngx_http_uwsgi_module 模块。该模块允许将请求传递到 uwsgi 服务器。

`--without-http_scgi_module`

禁用 ngx_http_scgi_module 模块。该模块允许将请求传递到 SCGI 服务器。

`--without-http_grpc_module`

禁用 ngx_http_grpc_module 模块。该模块允许将请求传递到 gRPC 服务器。

`--without-http_memcached_module`

禁用 ngx_http_memcached_module 模块，该模块用于从内存缓存服务器(memcached)获取响应。

`--without-http_limit_conn_module`

禁用 ngx_http_limit_conn_module 模块，该模块限制每个键的连接数，特别是来自单个 IP 地址的连接数。

`--without-http_limit_req_module`

禁用 ngx_http_limit_req_module 模块，该模块用于限制每一个定义的密钥的请求的处理速率，特别是从一个单一的 IP 地址的请求的处理速率。

`--without-http_empty_gif_module`

禁用生成发射单像素透明 GIF 的模块。

`--without-http_browser_module`

禁用 ngx_http_browser_module 模块，该模块创建变量，创建变量，其值取决于 “User-Agent” 请求标头字段的值。

`--without-http_upstream_hash_module`

禁用 hash 负载平衡方法的模块。

`--without-http_upstream_ip_hash_module`

禁用 ip_hash 负载平衡方法的模块。

`--without-http_upstream_least_conn_module`

禁用 least_conn 负载平衡方法的模块。

`--without-http_upstream_keepalive_module`

禁用提供到 upstream 内服务器连接缓存的模块。

`--without-http_upstream_zone_module`

禁用可以将 upstream 的运行时状态存储在共享内存区域中的模块。

`--without-http`

禁用 HTTP 服务器。

`--without-http-cache`

禁用 HTTP 缓存。

## 默认未开启模块：

- `--with-http_ssl_module` 启用 HTTPS 协议支持，需要 OpenSSL 库。
- `--with-http_stub_status_module` 启用 ngx_http_stub_status_module 模块，该模块提供对基本状态信息的访问。
- `--with-http_realip_module` 启用 ngx_http_realip_module 模块的功能，该模块将客户端地址更改为在指定的 "header " 字段中发送的地址。
- `--with-http_auth_request_module` 启用 ngx_http_auth_request_module 模块，该模块基于子请求的结果实现客户端授权。
- `--with-http_v2_module` 启用 HTTP/2 协议支持。
- `--with-http_dav_module` 启用 ngx_http_dav_module 模块，该模块通过 WebDAV 协议提供文件管理自动化。
- `--with-http_slice_module` 启用 ngx_http_slice_module 模块，该模块将请求拆分为多个子请求，每个子请求都返回一定范围的响应。可为大响应提供更有效的缓存。
- `--with-threads` 启用线程池的使用。
- `--with-http_addition_module` 启用 ngx_http_addition_module 模块，该模块可在响应之前和之后添加文本。
- `--with-http_gunzip_module` 对于不支持 “gzip” 的客户端，启用 ngx_http_gunzip_module 模块，使用 “Content-Encoding: gzip” 解压缩响应。
- `--with-http_gzip_static_module` 启用 ngx_http_gzip_static_module 模块，该模块支持发送扩展名为 “.gz” 的预压缩文件，而不是常规文件。

## 参考

https://blog.csdn.net/qq_43584691/article/details/115602443

https://www.cnblogs.com/CMX_Shmily/p/11599753.html