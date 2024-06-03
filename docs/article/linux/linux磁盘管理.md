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

## 3、lsblk 查询

lsblk 命令的英文是“list block”，即用于列出所有可用块设备的信息，而且还能显示他们之间的依赖关系，但是它不会列出 RAM 盘的信息。块设备有硬盘，闪存盘，CD-ROM 等等。lsblk 命令包含 util-linux 中。

参数说明：

- `-a, --all` 打印所有设备
- `-b, --bytes` 以字节格式打印大小
- `-d, --nodeps` 不打印从属或持有者
- `-D, --discard` 打印遗弃功能列表
- `-e, --exclude <list>` 按主要编号排除设备
- `-I, --include <list>` 仅显示具有指定主要编号的设备
- `-f, --fs` 输出有关文件系统的信息
- `-i, --ascii` 仅使用 ascii 字符
- `-m, --perms` 输出有关权限的信息
- `-l, --list` 使用列表格式输出
- `-n, --noheadings` 不打印标题
- `-o, --output` 输出信息列
- `-p, --paths` 打印平面设备路径
- `-P, --pairs` 使用 `key="value"` 输出格式
- `-r, --raw` 使用原始输出格式
- `-s, --inverse` 反向依赖
- `-t, --topology` 输出有关拓扑的信息
- `-S, --scsi` 输出有关 scsi 设备的信息
- `-h, --help` 显示帮助信息
- `-V, --version` 显示版本信息

输出信息列：

|   列名称   |        列说明        |
| :--------: | :------------------: |
|    NAME    |       设备名称       |
|   KNAME    |   内部内核设备名称   |
|  MAJ:MIN   |  主要和次要设备数量  |
|   FSTYPE   |     文件系统类型     |
| MOUNTPOINT |      设备挂载点      |
|   LABEL    |     文件系统标签     |
|    UUID    |         UUID         |
| PARTLABEL  |       分区标签       |
|  PARTUUID  |     分区的 UUID      |
|     RA     |       预读设备       |
|     RO     |       只读设备       |
|     RM     |      可移动设备      |
|   MODEL    |      设备标识符      |
|   SERIAL   |      磁盘序列号      |
|    SIZE    |       设备大小       |
|   OWNER    |     所有者用户名     |
|   GROUP    |         组名         |
|    MODE    |     设备节点权限     |
|   MIN-IO   |    最小 I/O 大小     |
|   OPT-IO   |    最佳 I/O 大小     |
|  PHY-SEC   |     物理扇区大小     |
|  LOG-SEC   |     逻辑扇区大小     |
|    ROTA    |       旋转装置       |
|   SCHED    |   I/O 计划程序名称   |
|  RQ-SIZE   |     请求队列大小     |
|    TYPE    |       设备类型       |
|  DISC-ALN  |   废弃的校准偏移盘   |
| DISC-GRAN  |     废弃的颗粒度     |
|  DISC-MAX  |   废弃的最大字节数   |
| DISC-ZERO  |     废弃的零数据     |
|   WSAME    | 写入相同的最大字节数 |
|    WWN     |     唯一存储标识     |
|    RAND    |     添加了随机性     |
|   PKNAME   |  内部父内核设备名称  |
|    HCTL    |      SCSI 编号       |
|    TRAN    |     设备传输类型     |
|    REV     |       设备版本       |
|   VENDOR   |      设备供应商      |

```bash
sudo lsblk -h

# 列出所有设备
sudo lsblk -a

# 查看指定块设备信息
sudo lsblk /dev/sda1

# 查看块设备的文件系统类型及UUID
sudo lsblk -f

# 查看块设备的完整路径
sudo lsblk -p

# 列出所有设备指定列信息
sudo lsblk -J -p -M -b -o "NAME,SIZE,PTTYPE,PARTLABEL,FSTYPE,MOUNTPOINT"
```

## 4、parted 分区

```bash
sudo parted -h

parted [OPTION]... [DEVICE [COMMAND [PARAMETERS]...]...]

OPTIONs:
  -h, --help                      # 显示帮助消息
  -l, --list                      # 列出所有块设备上的分区布局
  -m, --machine                   # 显示机器可解析的输出
  -s, --script                    # 不给用户输出提示信息（非交互式，脚本）
  -v, --version                   # 版本信息
  -a, --align=[none|cyl|min|opt]  # 新分区的对齐

COMMANDs:
  align-check TYPE N                       # check partition N for TYPE(min|opt)
        alignment
  help [COMMAND]                           # print general help, or help on
        COMMAND
  mklabel,mktable LABEL-TYPE               # 创建一个新的磁盘标签（分区表）
  mkpart PART-TYPE [FS-TYPE] START END     # 创建分区
  name NUMBER NAME                         # name partition NUMBER as NAME
  print [devices|free|list,all|NUMBER]     # 显示分区表、可用设备、可用空间、所有找到的分区或特定分区
  quit                                     # exit program
  rescue START END                         # rescue a lost partition near START
        and END
  resizepart NUMBER END                    # 调整分区大小
  rm NUMBER                                # 删除分区
  select DEVICE                            # choose the device to edit
  disk_set FLAG STATE                      # change the FLAG on selected device
  disk_toggle [FLAG]                       # toggle the state of FLAG on selected
        device
  set NUMBER FLAG STATE                    # change the FLAG on partition NUMBER
  toggle [NUMBER [FLAG]]                   # toggle the state of FLAG on partition
        NUMBER
  unit UNIT                                # set the default unit to UNIT
  version                                  # display the version number and
```

操作示例：

```bash
# 设置磁盘格式
sudo parted -s /dev/sda mklabel gpt

# 创建分区
sudo parted -s /dev/sda mkpart primary ${start} ${end} # 需要设置单位，例如 1024B

# 格式化分区
sudo mkfs -t ext4 /dev/sda1

# 创建挂载目录
sudo mdkir /data/sda1

# 挂载分区（临时挂载）
sudo mount /dav/sda1 /data/sda1

# 挂载分区（永久挂载）
sudo echo "UUID=${uuid} /data/sda1 ext4 defaults 0 0" >> /etc/fstab
sudo mount -a

# 取消挂载
sudo sed -i /${uuid}/d /etc/fstab
sudo umount /dav/sda1

# 删除分区（前提需要取消挂载）
sudo parted -s /dav/sda rm 1
```

## 5、mkfs 磁盘格式化

磁盘分区完毕后要进行文件系统的格式化，也就是创建文件系统

```bash
mkts -t [格式化名] [设备名称]
# 或
mkts.[格式化名] [设备名称]
```

格式列表：`ext4、ntfs、fat、vfat、xfs`

相关参数：

- `-b` 后面接的是区块容量，范围是 512B-64K。不过 Linux 最大为 4K
- `-d` 后面接的是 data section(数据区)的相关参数值
- `-f` 如果设备内已经有了文件系统，则需要使用 `-f` 强制格式化
- `-i` 与 inode 有较相关的设置
- `-L` 后面接这个文件系统的标头名称 Label name
- `-r` 指定 realtime section(实时运行区)的相关设置值

## 6、mdadm 软 RAID 管理

mdadm 是 linux 下用于创建和管理软件 RAID 的命令，是一个模式化命令。但由于现在服务器一般都带有 RAID 阵列卡，并且 RAID 阵列卡也很廉价，且由于软件 RAID 的自身缺陷（不能用作启动分区、使用 CPU 实现，降低 CPU 利用率），因此在生产环境下并不适用。

### 6.1 创建模式

选项：-C

专用选项：

- `-l` 级别
- `-n` 设备个数
- `-a` {yes|no} 自动为其创建设备文件
- `-c` 指定数据块大小（chunk）
- `-x` 指定空闲盘（热备磁盘）个数，空闲盘（热备磁盘）能在工作盘损坏后自动顶替

注意：创建阵列时，阵列所需磁盘数为 -n 参数和 -x 参数的个数和

创建 RAID：

```bash
# 创建 RAID 0
mdadm -C /dev/md0 -a yes -l 0 -n 2 /dev/sdb{1,2}

# 创建 RAID 1
mdadm -C /dev/md1 -a yes -l 1 -n 2 /dev/sdb{1,2}

# 创建 RAID 5
mdadm -C /dev/md5 -a yes -l 5 -n 3 /dev/sdb{1,2,3}

# 创建 RAID 10
mdadm -C /dev/md10 -a yes -l 10 -n 2 /dev/sdb{1,2} -x 2 /dev/sdb{3,4}

# 保存 RAID
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf

# 更新存储设备
sudo update-initramfs -u
```

创建 raid 之后，使用磁盘格式化及挂载即可使用

### 6.2 管理模式

选项：-a(--add)，-d(--del),-r(--remove),-f(--fail)

```bash
# 模拟损坏
mdadm /dev/md1 -f /dev/sdb5

# 移除损坏的磁盘
mdadm /dev/md1 -r /dev/sdb5

# 添加新的硬盘到已有阵列
mdadm /dev/md1 -a /dev/sdb7

# 停止阵列
mdadm -S /dev/md1
```

- 新增加的硬盘需要与原硬盘大小一致
- 如果原有阵列缺少工作磁盘（如raid1只有一块在工作，raid5只有2块在工作），这时新增加的磁盘直接变为工作磁盘，如果原有阵列工作正常，则新增加的磁盘为热备磁盘。

### 6.3 监控模式

### 6.4 增长模式，用于增加磁盘，为阵列扩容

选项：-G

```bash
# 将上述raid5的热备磁盘增加到阵列工作磁盘中
mdadm -G /dev/md2  -n 4 # -n 4 表示使用四块工作磁盘

# 查看信息
mdadm -D /dev/md2
```

### 6.5 装配模式

选项：-A

```bash
# 将上述已经停止的阵列重新装配
mdadm -A /dev/md1 /dev/sdb5 /dev/sdb6

# 自动装配
mdadm -Ds >/etc/mdadm.conf
```

https://www.cnblogs.com/lpfuture/p/6385657.html

https://www.cnblogs.com/37yan/p/7489597.html

https://www.cnblogs.com/asker009/p/10278536.html

https://cloud.tencent.com/developer/article/1346533
