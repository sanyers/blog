# linux 计算 cpu 使用率

查看cpu核心：

`cat /proc/cpuinfo| grep "processor"| wc -l`

`cat /proc/stat`

```
cpu  143981718 1653 19835190 651219576 474793 0 1795548 0 0 0
cpu0 4922748 116 634217 35211530 33025 0 1054 0 0 0
cpu1 7264010 6 724979 32772529 27436 0 87110 0 0 0
cpu2 7265280 106 1592936 31897031 33649 0 85197 0 0 0
...
intr 7124054096 26 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 39 0 0 47 0 0 0 89508674 0 0 0 0 0 0 0 0 0 0 0 0 0 101 0 0 0 0 0 0 0 0 365553 45796 0 326675 306514 322983 156258 166277 168551 115525 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 203663 0 0 58842159 179417102 160744835 182006220 189160682 198394762 178230438 182873083 178224428 186110541 247087544 210543678 216684749 183073272 204699369 200669565 216376267 208119645 199156143 194237301 1283 24079457 9 1062 2227 2570 9511496 6479573 9056319 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt 7627984946
btime 1560589914
processes 18553467
procs_running 1
procs_blocked 0
softirq 5913064204 17 744470697 11078247 3780395442 47291 0 11998890 583315978 0 781757642
```

行参数信息：

- `cpu` 是所有 cpu 信息的总和值，我们之后计算 cpu 利用率用的就是这条信息
- `cpu0， cpu1， …` 是各个 cpu 的信息
- `intr` 是中断信息，第一个值是自系统启动以来，所发生的中断次数
- `ctxt` 是系统自启动以来 cpu 发生的上下文交换次数
- `btime` 是系统启动以来到当前位置的时间，单位秒
- `processes` 系统自启动以来创建的进程数。
- `procs_running` 当前运行队列的任务的数目
- `procs_blocked` 当前被阻塞的任务数目

列参数信息（以上每行 cpu 数字代表的含义）：

|     |   user    | nice |  system  | idle      | iowait | irq | softirq | stealstolen | guest | guest_nice |
| :-: | :-------: | :--: | :------: | --------- | ------ | --- | ------- | ----------- | ----- | ---------- |
| cpu | 143981718 | 1653 | 19835190 | 651219576 | 474793 | 0   | 1795548 | 0           | 0     | 0          |

所有值单位为：jiffies，1jiffies=0.01 秒

|    字段     |                                             说明                                             |
| :---------: | :------------------------------------------------------------------------------------------: |
|    user     |           从系统启动开始累计到当前时刻，用户态的 CPU 时间，不包含 nice 值为负进程            |
|    nice     |               从系统启动开始累计到当前时刻，nice 值为负的进程所占用的 CPU 时间               |
|   system    |                            从系统启动开始累计到当前时刻，核心时间                            |
|    idle     |               从系统启动开始累计到当前时刻，除硬盘 IO 等待时间以外其它空闲时间               |
|   iowait    |                        从系统启动开始累计到当前时刻，硬盘 IO 等待时间                        |
|     irq     |                           从系统启动开始累计到当前时刻，硬中断时间                           |
|   softirq   |                           从系统启动开始累计到当前时刻，软中断时间                           |
| stealstolen |            从系统启动开始累积到当前时刻，在虚拟环境运行时花费在其他操作系统的时间            |
|    guest    |        从系统启动开始累积到当前时刻，在 Linux 内核控制下的操作系统虚拟 cpu 花费的时间        |
| guest_nice  | 从系统启动开始累积到当前时刻，在 Linux 内核控制下的操作系统虚拟 cpu 花费在 nice 进程上的时间 |

`cpu_total = user + nice + system + idle + iowait + irq + softirq + stealstolen + guest + guest_nice`

`cpu usage = (1 - idle / cpu_total) * 100%` (除去cpu空闲时间外的其他所有cpu使用率，也可粗略计算为cpu利用率)

或者：

`cpu usage = （user + nice + system）/ cpu_total * 100%`

https://zhuanlan.zhihu.com/p/234986013

[Linux下的proc目录详解](https://www.jianshu.com/p/bfc6f235d44e)