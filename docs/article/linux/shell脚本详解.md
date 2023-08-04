# shell 脚本详解

## 1、脚本前置

```sh
#!/bin/bash

# 命令xxx
```

## 2、接收参数

```sh
#!/bin/bash

echo $0    # 当前脚本的文件名（间接运行时还包括绝对路径）。
echo $n    # 传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是 $1 。
echo $#    # 传递给脚本或函数的参数个数。
echo $*    # 传递给脚本或函数的所有参数。
echo $@    # 传递给脚本或函数的所有参数。被双引号 (" ") 包含时，与 $* 不同，下面将会讲到。
echo $?    # 上个命令的退出状态，或函数的返回值。
echo $$    # 当前 Shell 进程 ID。对于 Shell 脚本，就是这些脚本所在的进程 ID。
echo $_    # 上一个命令的最后一个参数
echo $!    # 后台运行的最后一个进程的 ID 号
```

执行结果如下：

```sh
$ ./test.sh test test1 test2 test3 test4

./test.sh                      # $0
                               # $n
5                              # $#
test test1 test2 test3 test4   # $*
test test1 test2 test3 test4   # $@
0                              # $?
12305                          # $$
12305                          # $_
                               # $!
```

[参考](https://www.cnblogs.com/caoweixiong/p/12334418.html)