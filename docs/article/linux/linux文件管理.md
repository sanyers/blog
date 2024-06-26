# linux 文件管理

## 1、文件压缩和解压

### 1.1 tar 命令

```sh
# 压缩文件 file1 和目录 dir2 到 test.tar.gz
tar -zcvf test.tar.gz file1 dir2
# 解压 test.tar.gz（将 c 换成 x 即可）
tar -zxvf test.tar.gz
# 解压到指定目录
tar -zxvf test.tar.gz -C /home/sanyer
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

#### 1.1.2 tar: Exiting with failure status due to previous errors

可能由于用户权限导致，使用 `sudo` 或提高当前用户权限可解决

### 1.2 zip 命令

```sh
# 压缩文件
zip -r test.zip file

# 解压文件
unzip test.zip

# 解压到指定目录
unzip test.zip -d ./test
```

zip 参数说明：

- `-r` : 递归处理

unzip 参数说明：

- `-a` 对文本文件进行必要的字符转换。
- `-b` 不要对文本文件进行字符转换。
- `-c` 将解压缩的结果显示到屏幕上，并对字符做适当的转换。
- `-C` 压缩文件中的文件名称区分大小写。
- `-d` 解压到指定目录。
- `-f` 更新现有的文件。
- `-j` 不处理压缩文件中原有的目录路径。
- `-l` 显示压缩文件内所包含的文件。
- `-L` 将压缩文件中的全部文件名改为小写。
- `-M` 将输出结果送到 more 程序处理。
- `-n` 解压缩时不要覆盖原有的文件。
- `-o` 不必先询问用户，unzip 执行后覆盖原有文件。
- `-p` 与 -c 参数类似，会将解压缩的结果显示到屏幕上，但不会执行任何的转换。
- `-P` 密码，使用 zip 的密码选项。
- `-q` 执行时不显示任何信息。
- `-s` 将文件名中的空白字符转换为底线字符。
- `-t` 检查压缩文件是否正确。
- `-u` 与 -f 参数类似，但是除了更新现有的文件外，也会将压缩文件中的其他文件解压缩到目录中。
- `-v` 执行是时显示详细的信息。
- `-V` 保留 VMS 的文件版本信息。
- `-x` 文件，指定不要处理.zip 压缩文件中的哪些文件。
- `-X` 解压缩时同时回存文件原来的 UID/GID。
- `-z` 仅显示压缩文件的备注文字。
- `-Z` unzip -Z 等于执行 zipinfo 指令。

### 1.3 rar 命令

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

## 2、文件下载

### 2.1 wget 命令

```sh
# 安装wget
apt install wget

# 下载文件到当前目录
wget http://www.xxx.com/test.zip

# 下载文件到指定目录
wget -P 目录 网址
```

## 3、文件复制与移动

### 3.1 cp 命令

```sh
cp -avx /home/* /mnt/newhome # 完全拷贝目录下所有文件（包括隐藏文件、文件夹、链接）
```

参数详解：

- `-a` 或 `--archive` 此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于 dpR 参数组合。
- `-b` 或 `--backup` 删除、覆盖目的文件先备份，备份的文件或目录亦建立为符号链接，并指向源文件或目录链接的源文件或目录。假如没有加上这个参数，在复制过程中若遇到符号链接，则会直接复制源文件或目录。
- `-d` 或 `--no-dereference` 如果复制的源文件为链接文件，仅复制符号链接本身，且保留符号链接所指向的目标文件或目录。
- `-f` 或 `--force` 强制复制，即使目标文件已存在也会覆盖，而且不给出提示。
- `-i` 或 `--interactive` 在复制前提示确认，如果目标文件已存在，则会询问是否覆盖，回答 y 时目标文件将被覆盖。
- `-l` 或 `--link` 对源文件建立硬连接，而非复制文件。
- `-p` 或 `--preserve` 保留源文件或目录的属性（权限、所有者和时间戳信息）。
- `-P` 或 `--parents` 保留源文件或目录的路径。
- `-r` 或 `-R` 或 `--recursive` 复制目录，将指定目录下的文件与子目录一并处理。
- `-s` 或 `--symbolic-link` 对源文件建立符号链接，而非复制文件
- `-S <备份字尾字符串>` 或 `--suffix=<备份字尾字符串>` 用 `-b` 参数备份目的文件后，备份文件的字尾会被加上一个备份字符串。默认的备份字尾符串是符号 "~"
- `-u` 或 `--update` 使用这项参数之后，只会在源文件的修改时间(Modification Time)较目的文件更新时，或是名称相互对应的目的文件并不存在，才复制文件
- `-v` 或 `--verbose` 显示执行过程
- `-V <备份方式>` 或 `--version-control=<备份方式>` 指定当备份文件时，备份文件名的命名方式，有以下 3 种:
  - 1. numbered 或 t, 将使用备份编号，会在字尾加上~1~字符串，其数字编号依次递增
  - 2. simple 或 never 将使用简单备份，默认的备份字尾字符串是~, 也可通过-S 来指定
  - 3. existin g 或 nil 将使用当前方式，程序会先检查是否存在着备份编号，若有则采用备份编号，若无则采用简单备份
- `-x` 或 `--one-file-system` 复制的文件或目录存放的文件系统，必须与 cp 指令执行时所处的文件系统相同，否则不复制，亦不处理位于其他分区的文件
- `--help` 显示在线帮助
- `--sparse=<使用时机>` 设置保存希疏文件的时机
- `--version` 显示版本

示例：

```sh
# 复制文件，只有源文件较目的文件的修改时间新时，才复制文件
cp -u -v file1 file2

# 将文件 file1 复制成文件 file2
cp file1 file2

# 采用交互方式将文件 file1 复制成文件 file2
cp -i file1 file2

# 将文件 file1 复制成 file2，因为目的文件已经存在，所以指定使用强制复制的模式
cp -f file1 file2

# 将目录 dir1 复制成目录 dir2
cp -R dir1 dir2

# 同时将文件 file1、file2、file3 与目录 dir1 复制到 dir2
cp -R file1 file2 file3 dir1 dir2

# 复制时保留文件属性
cp -p a.txt tmp/

# 复制时保留文件的目录结构
 cp -P /var/tmp/a.txt ./temp/

# 复制时产生备份文件
cp -b a.txt tmp/

# 复制时产生备份文件，尾标 ~1~格式
cp -b -V t a.txt /tmp

# 指定备份文件尾标
cp -b -S _bak a.txt /tmp
```

### 3.2 mv 命令

```sh
mv [options] source dest
mv [options] source... directory
```

参数说明：

- -b: 当目标文件或目录存在时，在执行覆盖前，会为其创建一个备份。
- -i: 如果指定移动的源目录或文件与目标的目录或文件同名，则会先询问是否覆盖旧文件，输入 y 表示直接覆盖，输入 n 表示取消该操作。
- -f: 如果指定移动的源目录或文件与目标的目录或文件同名，不会询问，直接覆盖旧文件。
- -n: 不要覆盖任何已存在的文件或目录。
- -u：当源文件比目标文件新或者目标文件不存在时，才执行移动操作。

```sh
# 目标目录与原目录一致，指定了新文件名，效果就是仅仅重命名。
mv /home/xxx/a.txt /home/xxx/b.txt

# 目标目录与原目录不一致，没有指定新文件名，效果就是仅仅移动。
mv /home/ffxhd/a.txt /home/ffxhd/test/
# 或者
mv /home/ffxhd/a.txt /home/ffxhd/test

# 目标目录与原目录一致, 指定了新文件名，效果就是：移动 + 重命名。
mv /home/ffxhd/a.txt /home/ffxhd/test/c.txt

# 批量移动文件和文件夹
mv /home/ffxhd/testThinkPHP5/tp5/* /home/ffxhd/testThinkPHP5
```

## 4、md5sum 设置文件 MD5 校验

语法：

```bash
md5sum [选项] [参数]
```

选项：

- `-b` 或 `--binary`: 把输入文件作为二进制文件看待。
- `-t` 或 `--text`: 把输入的文件作为文本文件看待（默认）。
- `-c` 或 `--check`: 用来从文件中读取 md5 信息检查文件的一致性。(不细说了参见 info)
- `--status`: 这个选项和 check 一起使用,在 check 的时候，不输出，而是根据返回值表示检查结果。
- `-w` 或 `--warn`: 在 check 的时候，检查输入的 md5 信息又没有非法的行，如果有则输出相应信息。

```bash
# 将文件的 MD5 值保存到文件中
md5sum test.zip > test.md5
```