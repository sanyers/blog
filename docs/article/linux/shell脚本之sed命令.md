# shell 脚本之 sed 命令

sed 命令是利用脚本来处理、编辑一个或多个文本文件

## 1、新增

```bash
# 指定文件某一行行号插入一行内容（第2行插入）
sed '2i helloworld' test.txt

# 指定文件某一行行号后面加一行内容
sed '2a helloworld' test.txt

# 在文件最后追加一行内容
sed '$a helloworld' test.txt
```

## 2、删除

```bash
# 删除指定行号的内容（删除第二行的内容）
sed '2d' test.txt

# 删除指定行号间的内容（前闭后闭）(删除第二行到第四行的内容)
sed '2,4d' test.txt
```

## 3、修改

```bash
# 修改指定开头的内容（将所有r打头的都改为a打头的）
sed 's/^r/a/' test.txt

# 全局修改某个字符串为XX
sed 's/r/a/g' test.txt

# 修改指定行号的内容
sed '2c helloworld' test.txt

# 删除字符串所在行
sed -i /helloworld/d test.txt
```

## 4、查询

```bash
# 查找某一个字符串出现的行
sed -n '/games/p' test.txt

# 查找指定行号的内容
sed -n '2p' test.txt

# 查找指定行号间的内容
sed -n '2,5p' test.txt
```