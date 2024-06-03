(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{344:function(s,a,t){"use strict";t.r(a);var e=t(10),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"linux文件管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux文件管理"}},[s._v("#")]),s._v(" linux文件管理")]),s._v(" "),a("h2",{attrs:{id:"_1、文件压缩和解压"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、文件压缩和解压"}},[s._v("#")]),s._v(" 1、文件压缩和解压")]),s._v(" "),a("h3",{attrs:{id:"_1-1-tar-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-tar-命令"}},[s._v("#")]),s._v(" 1.1 tar 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 压缩文件 file1 和目录 dir2 到 test.tar.gz")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-zcvf")]),s._v(" test.tar.gz file1 dir2\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压 test.tar.gz（将 c 换成 x 即可）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-zxvf")]),s._v(" test.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压到指定目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-zxvf")]),s._v(" test.tar.gz "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-C")]),s._v(" /home/sanyer\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出压缩文件的内容")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-ztvf")]),s._v(" test.tar.gz \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("释义：")]),s._v(" "),a("ul",[a("li",[s._v("-z : 使用 gzip 来压缩和解压文件")]),s._v(" "),a("li",[s._v("-v : --verbose 详细的列出处理的文件")]),s._v(" "),a("li",[s._v("-f : --file=ARCHIVE 使用档案文件或设备，这个选项通常是必选的")]),s._v(" "),a("li",[s._v("-c : --create 创建一个新的归档（压缩包）")]),s._v(" "),a("li",[s._v("-x : 从压缩包中解出文件")])]),s._v(" "),a("p",[s._v("其它：")]),s._v(" "),a("p",[s._v("tar 命令其实并不是真的解压缩的处理者，而是使用了 gzip 或者 bzip2 等其它命令来达成，但是 gzip 等命令通常只能处理单个文件，并不方便，所以一般我们都是选择使用 tar 命令间接的完成解压缩。")]),s._v(" "),a("h4",{attrs:{id:"_1-1-2-tar-exiting-with-failure-status-due-to-previous-errors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-2-tar-exiting-with-failure-status-due-to-previous-errors"}},[s._v("#")]),s._v(" 1.1.2 tar: Exiting with failure status due to previous errors")]),s._v(" "),a("p",[s._v("可能由于用户权限导致，使用 "),a("code",[s._v("sudo")]),s._v(" 或提高当前用户权限可解决")]),s._v(" "),a("h3",{attrs:{id:"_1-2-zip-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-zip-命令"}},[s._v("#")]),s._v(" 1.2 zip 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 压缩文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("zip")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" test.zip "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压到指定目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" ./test\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("zip 参数说明：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-r")]),s._v(" : 递归处理")])]),s._v(" "),a("p",[s._v("unzip 参数说明：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-a")]),s._v(" 对文本文件进行必要的字符转换。")]),s._v(" "),a("li",[a("code",[s._v("-b")]),s._v(" 不要对文本文件进行字符转换。")]),s._v(" "),a("li",[a("code",[s._v("-c")]),s._v(" 将解压缩的结果显示到屏幕上，并对字符做适当的转换。")]),s._v(" "),a("li",[a("code",[s._v("-C")]),s._v(" 压缩文件中的文件名称区分大小写。")]),s._v(" "),a("li",[a("code",[s._v("-d")]),s._v(" 解压到指定目录。")]),s._v(" "),a("li",[a("code",[s._v("-f")]),s._v(" 更新现有的文件。")]),s._v(" "),a("li",[a("code",[s._v("-j")]),s._v(" 不处理压缩文件中原有的目录路径。")]),s._v(" "),a("li",[a("code",[s._v("-l")]),s._v(" 显示压缩文件内所包含的文件。")]),s._v(" "),a("li",[a("code",[s._v("-L")]),s._v(" 将压缩文件中的全部文件名改为小写。")]),s._v(" "),a("li",[a("code",[s._v("-M")]),s._v(" 将输出结果送到more程序处理。")]),s._v(" "),a("li",[a("code",[s._v("-n")]),s._v(" 解压缩时不要覆盖原有的文件。")]),s._v(" "),a("li",[a("code",[s._v("-o")]),s._v(" 不必先询问用户，unzip 执行后覆盖原有文件。")]),s._v(" "),a("li",[a("code",[s._v("-p")]),s._v(" 与 -c 参数类似，会将解压缩的结果显示到屏幕上，但不会执行任何的转换。")]),s._v(" "),a("li",[a("code",[s._v("-P")]),s._v(" 密码，使用zip的密码选项。")]),s._v(" "),a("li",[a("code",[s._v("-q")]),s._v(" 执行时不显示任何信息。")]),s._v(" "),a("li",[a("code",[s._v("-s")]),s._v(" 将文件名中的空白字符转换为底线字符。")]),s._v(" "),a("li",[a("code",[s._v("-t")]),s._v(" 检查压缩文件是否正确。")]),s._v(" "),a("li",[a("code",[s._v("-u")]),s._v(" 与 -f 参数类似，但是除了更新现有的文件外，也会将压缩文件中的其他文件解压缩到目录中。")]),s._v(" "),a("li",[a("code",[s._v("-v")]),s._v(" 执行是时显示详细的信息。")]),s._v(" "),a("li",[a("code",[s._v("-V")]),s._v(" 保留VMS的文件版本信息。")]),s._v(" "),a("li",[a("code",[s._v("-x")]),s._v(" 文件，指定不要处理.zip压缩文件中的哪些文件。")]),s._v(" "),a("li",[a("code",[s._v("-X")]),s._v(" 解压缩时同时回存文件原来的UID/GID。")]),s._v(" "),a("li",[a("code",[s._v("-z")]),s._v(" 仅显示压缩文件的备注文字。")]),s._v(" "),a("li",[a("code",[s._v("-Z")]),s._v(" unzip -Z等于执行zipinfo指令。")])]),s._v(" "),a("h3",{attrs:{id:"_1-3-rar-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-rar-命令"}},[s._v("#")]),s._v(" 1.3 rar 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 压缩文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rar")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" test.rar "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unrar")]),s._v(" x test.rar\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("释义：")]),s._v(" "),a("ul",[a("li",[s._v("a : 添加到压缩文件")]),s._v(" "),a("li",[s._v("-r : 递归处理")]),s._v(" "),a("li",[s._v("x : 以绝对路径解压文件")])]),s._v(" "),a("h2",{attrs:{id:"_2、文件下载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、文件下载"}},[s._v("#")]),s._v(" 2、文件下载")]),s._v(" "),a("h3",{attrs:{id:"_2-1-wget-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-wget-命令"}},[s._v("#")]),s._v(" 2.1 wget 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装wget")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下载文件到当前目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://www.xxx.com/test.zip\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下载文件到指定目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-P")]),s._v(" 目录 网址\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h2",{attrs:{id:"_3、文件复制与移动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、文件复制与移动"}},[s._v("#")]),s._v(" 3、文件复制与移动")]),s._v(" "),a("h3",{attrs:{id:"_3-1-cp-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-cp-命令"}},[s._v("#")]),s._v(" 3.1 cp 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-avx")]),s._v(" /home/* /mnt/newhome "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 完全拷贝目录下所有文件（包括隐藏文件、文件夹、链接）")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("参数详解：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-a")]),s._v(" 或 "),a("code",[s._v("--archive")]),s._v(" 此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于 dpR 参数组合。")]),s._v(" "),a("li",[a("code",[s._v("-b")]),s._v(" 或 "),a("code",[s._v("--backup")]),s._v(" 删除、覆盖目的文件先备份，备份的文件或目录亦建立为符号链接，并指向源文件或目录链接的源文件或目录。假如没有加上这个参数，在复制过程中若遇到符号链接，则会直接复制源文件或目录。")]),s._v(" "),a("li",[a("code",[s._v("-d")]),s._v(" 或 "),a("code",[s._v("--no-dereference")]),s._v(" 如果复制的源文件为链接文件，仅复制符号链接本身，且保留符号链接所指向的目标文件或目录。")]),s._v(" "),a("li",[a("code",[s._v("-f")]),s._v(" 或 "),a("code",[s._v("--force")]),s._v(" 强制复制，即使目标文件已存在也会覆盖，而且不给出提示。")]),s._v(" "),a("li",[a("code",[s._v("-i")]),s._v(" 或 "),a("code",[s._v("--interactive")]),s._v(" 在复制前提示确认，如果目标文件已存在，则会询问是否覆盖，回答 y 时目标文件将被覆盖。")]),s._v(" "),a("li",[a("code",[s._v("-l")]),s._v(" 或 "),a("code",[s._v("--link")]),s._v(" 对源文件建立硬连接，而非复制文件。")]),s._v(" "),a("li",[a("code",[s._v("-p")]),s._v(" 或 "),a("code",[s._v("--preserve")]),s._v(" 保留源文件或目录的属性（权限、所有者和时间戳信息）。")]),s._v(" "),a("li",[a("code",[s._v("-P")]),s._v(" 或 "),a("code",[s._v("--parents")]),s._v(" 保留源文件或目录的路径。")]),s._v(" "),a("li",[a("code",[s._v("-r")]),s._v(" 或 "),a("code",[s._v("-R")]),s._v(" 或 "),a("code",[s._v("--recursive")]),s._v(" 复制目录，将指定目录下的文件与子目录一并处理。")]),s._v(" "),a("li",[a("code",[s._v("-s")]),s._v(" 或 "),a("code",[s._v("--symbolic-link")]),s._v(" 对源文件建立符号链接，而非复制文件")]),s._v(" "),a("li",[a("code",[s._v("-S <备份字尾字符串>")]),s._v(" 或 "),a("code",[s._v("--suffix=<备份字尾字符串>")]),s._v(" 用 "),a("code",[s._v("-b")]),s._v(' 参数备份目的文件后，备份文件的字尾会被加上一个备份字符串。默认的备份字尾符串是符号 "~"')]),s._v(" "),a("li",[a("code",[s._v("-u")]),s._v(" 或 "),a("code",[s._v("--update")]),s._v(" 使用这项参数之后，只会在源文件的修改时间(Modification Time)较目的文件更新时，或是名称相互对应的目的文件并不存在，才复制文件")]),s._v(" "),a("li",[a("code",[s._v("-v")]),s._v(" 或 "),a("code",[s._v("--verbose")]),s._v(" 显示执行过程")]),s._v(" "),a("li",[a("code",[s._v("-V <备份方式>")]),s._v(" 或 "),a("code",[s._v("--version-control=<备份方式>")]),s._v(" 指定当备份文件时，备份文件名的命名方式，有以下 3 种:\n"),a("ul",[a("li",[a("ol",[a("li",[s._v("numbered 或 t, 将使用备份编号，会在字尾加上~1~字符串，其数字编号依次递增")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"2"}},[a("li",[s._v("simple 或 never 将使用简单备份，默认的备份字尾字符串是~, 也可通过-S来指定")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"3"}},[a("li",[s._v("existin g或 nil 将使用当前方式，程序会先检查是否存在着备份编号，若有则采用备份编号，若无则采用简单备份")])])])])]),s._v(" "),a("li",[a("code",[s._v("-x")]),s._v(" 或 "),a("code",[s._v("--one-file-system")]),s._v(" 复制的文件或目录存放的文件系统，必须与cp指令执行时所处的文件系统相同，否则不复制，亦不处理位于其他分区的文件")]),s._v(" "),a("li",[a("code",[s._v("--help")]),s._v(" 显示在线帮助")]),s._v(" "),a("li",[a("code",[s._v("--sparse=<使用时机>")]),s._v(" 设置保存希疏文件的时机")]),s._v(" "),a("li",[a("code",[s._v("--version")]),s._v(" 显示版本")])]),s._v(" "),a("p",[s._v("示例：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制文件，只有源文件较目的文件的修改时间新时，才复制文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-u")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" file1 file2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将文件 file1 复制成文件 file2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" file1 file2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 采用交互方式将文件 file1 复制成文件 file2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" file1 file2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将文件 file1 复制成 file2，因为目的文件已经存在，所以指定使用强制复制的模式")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" file1 file2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将目录 dir1 复制成目录 dir2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-R")]),s._v(" dir1 dir2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 同时将文件 file1、file2、file3 与目录 dir1 复制到 dir2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-R")]),s._v(" file1 file2 file3 dir1 dir2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制时保留文件属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" a.txt tmp/\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制时保留文件的目录结构")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-P")]),s._v(" /var/tmp/a.txt ./temp/\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制时产生备份文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-b")]),s._v(" a.txt tmp/\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制时产生备份文件，尾标 ~1~格式")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-b")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-V")]),s._v(" t a.txt /tmp\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定备份文件尾标")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-b")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-S")]),s._v(" _bak a.txt /tmp\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br")])]),a("h3",{attrs:{id:"_3-2-mv-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-mv-命令"}},[s._v("#")]),s._v(" 3.2 mv 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" dest\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" source"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". directory\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("参数说明：")]),s._v(" "),a("ul",[a("li",[s._v("-b: 当目标文件或目录存在时，在执行覆盖前，会为其创建一个备份。")]),s._v(" "),a("li",[s._v("-i: 如果指定移动的源目录或文件与目标的目录或文件同名，则会先询问是否覆盖旧文件，输入 y 表示直接覆盖，输入 n 表示取消该操作。")]),s._v(" "),a("li",[s._v("-f: 如果指定移动的源目录或文件与目标的目录或文件同名，不会询问，直接覆盖旧文件。")]),s._v(" "),a("li",[s._v("-n: 不要覆盖任何已存在的文件或目录。")]),s._v(" "),a("li",[s._v("-u：当源文件比目标文件新或者目标文件不存在时，才执行移动操作。")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 目标目录与原目录一致，指定了新文件名，效果就是仅仅重命名。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /home/xxx/a.txt /home/xxx/b.txt\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 目标目录与原目录不一致，没有指定新文件名，效果就是仅仅移动。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /home/ffxhd/a.txt /home/ffxhd/test/\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或者")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /home/ffxhd/a.txt /home/ffxhd/test\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 目标目录与原目录一致, 指定了新文件名，效果就是：移动 + 重命名。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /home/ffxhd/a.txt /home/ffxhd/test/c.txt\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 批量移动文件和文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /home/ffxhd/testThinkPHP5/tp5/* /home/ffxhd/testThinkPHP5\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);