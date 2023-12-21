# 安装redis

```sh
sudo apt install redis-server
sudo systemctl status redis-server

# 设置密码
sudo vim /etc/redis/redis.conf
# 搜索 requirepass foobared，设置密码后，重启服务
sudo systemctl restart redis-server

redis-cli
auth xxx
config get requirepass # 查看是否设置密码
```