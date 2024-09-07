# linux 查看与设置时间

## 1、查看当前时间

```sh
$ date
Fri 11 Aug 2023 10:40:44 AM CST
```

## 2、uptime 命令

```sh
$ update # 查看系统运行时间、用户数、负载
14:15:49 up 1 day,  5:14,  6 users,  load average: 0.71, 1.04, 0.79

$ uptime -p # 系统运行时间
up 1 day, 1 hour, 40 minutes

$ cat /proc/uptime # 第一个数字是系统自从启动的总秒数。第二个数字是总时间中系统空闲所花费的时间，以秒为单位。
91990.23 484258.76
```

## 3、who 命令

```sh
$ who # 显示目前登录系统的用户信息
sanyer     pts/0        2023-08-11 09:57 (66.55.44.23)

$ who -b # 系统最后一次的启动时间
system boot  2023-07-12 17:48
```

## 4、last 命令

```sh
$ last # 显示用户最近登录信息
sanyer     pts/0        192.168.0.100   Fri Aug 11 09:57   still logged in
sanyer     pts/0        192.168.0.100    Wed Aug  9 15:09 - 16:53  (01:43)

$ last -x reboot # 重启日期

$ last -x reboot | head -1 # 最后一次重启日期

$ last -x shutdown # 关机日期

$ last -x shutdown | head -1 # 最后一次关机时间
```

## 5、设置系统时间

```bash
# 设置时间
sudo date -s "10:00:00"

# 设置日期
sudo date -s "2018/8/8"

# 设置日期与时间
sudo date -s "2018/8/8 10:00:00"

# 将硬件时间写入到系统时间
sudo hwclock -s

# 将系统时间写入到硬件时间
sudo hwclock -w
```
