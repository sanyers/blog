# linux压缩和解压

## 1、tar压缩和解压

```sh
# 压缩文件 file1 和目录 dir2 到 test.tar.gz
tar -zcvf test.tar.gz file1 dir2
# 解压 test.tar.gz（将 c 换成 x 即可）
tar -zxvf test.tar.gz
# 列出压缩文件的内容
tar -ztvf test.tar.gz 
```

释义：

- -z : 使用 gzip 来压缩和解压文件
- -v : --verbose 详细的列出处理的文件
- -f : --file=ARCHIVE 使用档案文件或设备，这个选项通常是必选的
- -c : --create 创建一个新的归档（压缩包）
- -x : 从压缩包中解出文件

其它：

tar 命令其实并不是真的解压缩的处理者，而是使用了 gzip 或者 bzip2 等其它命令来达成，但是 gzip 等命令通常只能处理单个文件，并不方便，所以一般我们都是选择使用 tar 命令间接的完成解压缩。

## 2、zip 命令

```sh
# 压缩文件
zip -r test.zip file
# 解压文件
unzip test.zip
```

释义：

- -r : 递归处理

## 3、rar 命令

```sh
# 压缩文件
rar a -r test.rar file
# 解压文件
unrar x test.rar
```

释义：

- a : 添加到压缩文件
- -r : 递归处理
- x : 以绝对路径解压文件