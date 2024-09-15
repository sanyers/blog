# linux 获取系统架构

## 1、uname 命令

```sh
$ uname -a
Linux VM-ubuntu 5.4.0-148-generic #165-Ubuntu SMP Tue Apr 18 08:53:12 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
```

## 2、file 命令

使用 file 命令，查看本地的可执行程序，比如 `/bin/bash`

```sh
$ file /bin/bash
/bin/bash: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=2a9f157890930ced4c3ad0e74fc1b1b84aad42456, for GNU/Linux 3.2.0, stripped
```

## 3、arch 命令

```sh
$ arch
x86_64
```

## 4、getconf 命令

getconf 命令主要用于显示系统变量配置

```sh
$ getconf LONG_BIT
64
```


## 5、dpkg 命令

```sh
$ dpkg --print-architecture
amd64
```

## 6、cpuinfo 信息

需要自行分析

```bash
cat /proc/cpuinfo

lscpu
```