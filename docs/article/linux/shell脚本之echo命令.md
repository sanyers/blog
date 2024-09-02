# shell脚本之echo命令

echo 命令用于字符串的输出

```bash
echo "hello world"

hello world

# 显示转义字符
echo "\"hello world\""

"hello world"

# 显示变量
read name
echo "$name It is a test"

# 显示换行
echo -e "OK! \n" # -e 开启转义
echo "It is a test"

# 显示不换行
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"

# 将字符串添加至文件末尾
echo "hello world" >> test.txt

# 原样输出字符串，不进行转义或取变量(用单引号)
echo '$name\"'

$name\"

# 显示命令执行结果
echo `date`
Mon Sep 2 10:36:36 AM UTC 2024
```