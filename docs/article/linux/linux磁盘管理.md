# linux 磁盘管理

## 1、磁盘命令

### 1.1 df 命令

disk free 列出文件系统的整体磁盘使用量

`df [-ahikHTm] [目录或文件名]`

选项与参数：

- `-a` ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
- `-k` ：以 KBytes 的容量显示各文件系统；
- `-m` ：以 MBytes 的容量显示各文件系统；
- `-h` ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
- `-H` ：以 M=1000K 取代 M=1024K 的进位方式；
- `-T` ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
- `-i` ：不用硬盘容量，而以 inode 的数量来显示

示例：

```sh
$ df

$ df -h

$ df -h -T
```

### 1.2 du 命令

disk used 检查磁盘空间使用量，包括隐藏文件夹

`du [-ahskm] 文件或目录名称`

选项与参数：

- `-a` ：列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而已。
- `-h` ：以人们较易读的容量格式 (G/M) 显示；
- `-s` ：列出总量而已，而不列出每个各别的目录占用容量；
- `-S` ：不包括子目录下的总计，与 -s 有点差别。
- `-k` ：以 KBytes 列出容量显示；
- `-m` ：以 MBytes 列出容量显示；

```sh
# 列出根目录下所有文件夹磁盘占用大小
du -sh /*

# 列出指定目录
du -sh /home/*
du -sh /usr/*
```

### 1.3 fdisk 命令

用于磁盘分区

`fdisk [-l] 装置名称`

选项与参数：

- `-l` ：输出后面接的装置所有的分区内容。若仅有 fdisk -l 时， 则系统将会把整个系统内能够搜寻到的装置的分区均列出来。

### 1.4 其他指令

```
# mount | column -t      # 查看挂接的分区状态
# fdisk -l               # 查看所有分区
# swapon -s              # 查看所有交换分区
# hdparm -i /dev/hda     # 查看磁盘参数(仅适用于IDE设备)
# dmesg | grep IDE       # 查看启动时IDE设备检测状况
```

https://zhuanlan.zhihu.com/p/234986013

## 2、磁盘挂载

```sh
# 临时挂载
mount -t ext4 /dev/sda /raid_backup/

# 开机自动挂载，在最后一行加上挂载的相关信息
sudo vim /etc/fstab

/dev/sdc       /raid_backup  ext4 defaults 0 0
# 挂载设备      挂载位置        文件系统 默认

# 挂载 swap 虚拟内存
/swap/swapfile swap swap defaults 0 0

# 验证挂载，也可以重启后查看挂载情况
mount -a
```