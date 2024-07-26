# nginx高并发配置

`vim /etc/nginx/nginx.conf`

```conf
user root;
worker_processes 6; # 根据CPU核数配置 cat /proc/cpuinfo| grep "processor"| wc -l
worker_rlimit_nofile 65535; # 一个nginx进程打开的最多文件描述符数目

# 工作模式与连接数上限
events {
	worker_connections 65535; # 单个进程最大连接数（最大连接数=连接数*进程
    # 参考事件模型,use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型,如果跑在FreeBSD上面,就用kqueue模型.
	use epoll; # Linux内核为处理大批量文件选择的模式
}

http {
    sendfile on; # 开启高效文件传输模式
	tcp_nopush on; # 需要在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量。
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;

    keepalive_requests 100; // 每个 keep-alive 连接的请求次数
}
```

`vim /etc/sysctl.conf`

```
# 打开文件句柄数量
fs.file-max = 655360
# 最大ip跟踪数
net.nf_conntrack_max = 655360
#表示当keepalive起用的时候，TCP发送keepalive消息的频度。缺省是2小时，改为2分钟。
net.netfilter.nf_conntrack_tcp_timeout_established = 120

# 允许系统打开的端口范围，扩大端口数
net.ipv4.ip_local_port_range = 10000 65535

# 用来限制监听(LISTEN)队列最大数据包的数量，超过这个数量就会导致链接超时或者触发重传机制，
net.core.somaxconn = 65535
# 每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目。
net.core.netdev_max_backlog = 262144

# 开启时就是同一个源IP来连接同一个目的端口的数据包时间戳必须是递增的，否则就丢弃
net.ipv4.tcp_timestamps = 0
# 是否启用timewait 快速回收。如果服务器身处NAT环境，tcp_timestamps为1，安全起见，要禁止
net.ipv4.tcp_tw_recycle = 1
# 开启重用。允许将TIME-WAIT sockets 重新用于新的TCP 连接。
net.ipv4.tcp_tw_reuse = 1
# timeout状态时间
net.ipv4.tcp_fin_timeout = 15

# 在TIME_WAIT数量等于该值时，不会有新的产生，
net.ipv4.tcp_max_tw_buckets = 262144
# 系统中最多有多少个TCP 套接字不被关联到任何一个用户文件句柄上。如果超过这个数字，孤儿连接将即刻被复位并打印出警告信息。
net.ipv4.tcp_max_orphans = 262144
# 是指定所能接受SYN同步包的最大客户端数量。
net.ipv4.tcp_max_syn_backlog = 262144
# 为了打开对端的连接，内核需要发送一个SYN，以确认收到上一个 SYN连接请求包。也就是所谓三次握手中的第二次握手。
# 这个设置决定了内核放弃连接之前发送SYN+ACK 包的数量。
net.ipv4.tcp_synack_retries = 1
# 对于一个新建连接，内核要发送多少个 SYN 连接请求才决定放弃，测试感觉两个更稳定
net.ipv4.tcp_syn_retries = 2
# 开启SYN Cookies，当出现SYN 等待队列溢出时，启用cookies 来处理，目的是为了防止syn flood攻击。合法用户的高负载应该调整tcp_max_syn_backlog、tcp_synack_retries属性，
net.ipv4.tcp_syncookies = 0
```

`/etc/security/limits.conf`

```
* soft nofile 65535
* hard nofile 65535
* soft nproc 65535
* hard nproc 65535
```

通过 `sysctl -p` 使得配置生效，可用通过 `ulimit -a` 查看 file 配置是否生效，临时设置也可用通过 `ulimit -u 65535` 配置。