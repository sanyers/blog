# linux内存管理

## 1、free 查看内存占用

`free -h`

## 2、/proc/meminfo 详解

负责输出/proc/meminfo的源代码是：`fs/proc/meminfo.c : meminfo_proc_show()`

```
MemTotal:        3809036 kB 总内存大小
MemFree:          282012 kB 空闲内存大小
MemAvailable:     865620 kB 可用内存大小
Buffers:               0 kB 文件缓存大小
Cached:           854972 kB 磁盘高速缓冲大小
SwapCached:       130900 kB 交换空间高速缓冲大小
Active:          1308168 kB 活跃使用中高速缓冲大小
Inactive:        1758160 kB 不活跃高速缓冲大小
Active(anon):    1010416 kB 
Inactive(anon):  1370480 kB
Active(file):     297752 kB
Inactive(file):   387680 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:       4063228 kB 交换空间总大小
SwapFree:        3357108 kB 空闲交换空间
Dirty:                 0 kB 等待被写回到磁盘的大小
Writeback:             0 kB 正在被写回的大小
AnonPages:       2104412 kB 未映射的大小
Mapped:            40988 kB 设备和文件映射的大小
Shmem:            169540 kB
Slab:             225420 kB 内核数据结构缓存的大小
SReclaimable:     134220 kB 可回收Slab的大小
SUnreclaim:        91200 kB 不可回收的Slab的大小
KernelStack:        5936 kB
PageTables:        35628 kB 管理内存分页的索引表的大小
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     5967744 kB
Committed_AS:    5626436 kB
VmallocTotal:   34359738367 kB
VmallocUsed:      351900 kB
VmallocChunk:   34359363652 kB
HardwareCorrupted:     0 kB
AnonHugePages:    139264 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:      204484 kB
DirectMap2M:     3915776 kB
```

计算内存占用：

`memUsed = MemTotal - MemAvailable`

计算swap内存占用：

`swapUsed = SwapTotal - SwapFree`