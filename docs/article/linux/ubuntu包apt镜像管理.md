# ubuntu包apt镜像管理

## 1、默认官方源 source.list

```
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://archive.ubuntu.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://archive.ubuntu.com/ubuntu/ focal-proposed main restricted universe multiverse
```

## 2、github上面的参考

```
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

deb http://archive.canonical.com/ubuntu focal partner
deb-src http://archive.canonical.com/ubuntu focal partner
```

## 3、腾讯云内网 source.list

```
deb http://mirrors.tencentyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.tencentyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.tencentyun.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://mirrors.tencentyun.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.tencentyun.com/ubuntu/ focal-proposed main restricted universe multiverse
```

## 4、阿里云内网 source.list

```
deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.cloud.aliyuncs.com/ubuntu/ focal-proposed main restricted universe multiverse
```

## 5、中科大源 source.list

```
deb https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

## 6、清华源 source.list

```
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

## 7、腾讯云 source.list

```
deb https://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
```

参考：https://www.louishe.com/2021/12/08/doc-11364.html