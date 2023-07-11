# ubuntu环境变量

## 1、查看环境变量

- `env` env命令是environment的缩写，用于列出所有的环境变量
- `export` 单独使用export命令也可以像env列出所有的环境变量，不过export命令还有其他额外的功能
- `echo $PATH` echo $PATH用于列出变量PATH的值，里面包含了已添加的目录

## 2、设置环境变量

### 2.1 设置到 PATH

可以直接添加到环境变量 `PATH` 中。`$PATH` 表示变量PATH的值，包含已有的目录。

```conf
# 加到PATH末尾
export PATH=$PATH:/path/to/your/dir

# 加到PATH开头
export PATH=/path/to/your/dir:$PATH
```

### 2.2 命名一个新的环境变量

```conf
export VER_NAME=value
```

## 3、参考

https://blog.csdn.net/white_idiot/article/details/78253004  