# 编译c代码

[参考](https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm)

## 1、安装 emcc

前提条件：

- `Git` — Linux 和 macOS 的机器一般已经预装了，在 Windows 下你可以从这里下载 [Git for Windows installer](https://git-scm.com/download/win)。
- CMake — 在 Linux 或者 macOS 上，使用类似 apt-get 或 brew 这样的包管理器来安装它，请确保依赖以及路径是否正确。在 Windows 上，使用 [CMake installer](https://cmake.org/download/)。
- 主系统编译器 — 在 Linux 下，安装 GCC。在 macOS 下，安装 Xcode。在 Windows 下，安装 Visual Studio Community 2015 with Update 3 or newer。
- Python 2.7.x — On Linux and macOS, this is most likely provided out of the box. 从 初学者指南 获取帮助。在 Windows 上，从 Python 主页获取安装包。

编译 Emscripten：

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk

# 在 Linux 或者 Mac macOS 上
./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
# 如果在你的 macos 上获得以下错误
Error: No tool or SDK found by name 'sdk-incoming-64bit'
# 请执行
./emsdk install latest
# 按照提示配置环境变量即可
./emsdk activate latest


# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

# 如果在你的 Windows 上获得以下错误
Error: No tool or SDK found by name 'sdk-incoming-64bit'
# 请执行（可能需要科学上网，实测每次只能安装一个库，失败后重新执行，直到所有库全部安装完成）
emsdk install latest
# 按照提示配置环境变量即可
emsdk activate latest

# 注意：Windows 版本的 Visual Studio 2017 已经被支持，但需要在 emsdk install 需要追加 --vs2017 参数。

# 安装依赖库后执行环境命令

# on Linux or Mac macOS
source ./emsdk_env.sh

# on Windows
emsdk_env.bat

emcc -v # 提示版本，说明安装成功

# 将安装路径配置到全局path(环境变量)，例如：
C:\emsdk\upstream\emscripten
```

## 2、编写并编译 c 代码为 wasm

创建 `hello.c` 文件

```cpp
#include <stdio.h>

int main(int argc, char ** argv) {
  printf("Hello World\n");
}
```

编译代码：

```bash
# 编译 wasm + js
emcc hello.c -O3 -o hello.js

# 编译 wasm + html
emcc hello.c -s WASM=1 -o hello.html

# 编译完成后使用 node 执行

```

## 3、执行 wasm

在 node 中执行

```bash
node hello.js
```

在Web网页中执行，创建 `hello.html`

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Emscripten-Generated Code</title>
  </head>
  <body>
    <!-- 引入生成的 hello.js 文件即可 -->
    <script src="./hello.js"></script>
    <!-- 在控制台查看输出结果 -->
  </body>
</html>
```

> 注意：需要在 http 服务器下运行该网页，复制 `hello.wasm`、`hello.js`、`hello.html` 三个文件到 http 服务目录


## 4、调用一个定义在 C 中的自定义方法

创建 `fib.c` 文件

```cpp
#include <stdio.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
    printf("Hello World\n");
}

#ifdef __cplusplus
extern "C" {
#endif

int EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
  printf("我的函数已被调用\n");
  return 0;
}

#ifdef __cplusplus
}
#endif
```

编译代码：


```bash
emcc fib.c -O3 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -s MODULARIZE=1 -s EXPORT_NAME=Fib -o fib.js
```

参数说明：

- `-O3` 表示优化级别
- `-s "EXPORTED_RUNTIME_METHODS=['ccall']"`
- `EXPORT_NAME=Fib` 导出名

在 node 中执行

```js
const fib = require("./fib");

async function test() {
  const b = await fib();
  console.log(b._myFunction()); // 方法名前 _ 符号
}

test();
```

在Web网页中执行

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Emscripten-Generated Code</title>
  </head>
  <body>
    <button id="button">执行</button>
    <script src="./fib.js"></script>
    <script>
      window.onload = () => {
        document.getElementById("button").onclick = async () => {
          const fibs = await Fib();
          console.log(fibs._myFunction());
        };
      };
    </script>
  </body>
</html>
```

参考说明：

https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_Wasm

https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#interacting-with-code-call-javascript-from-native

https://emscripten.org/docs/tools_reference/emcc.html#emcc-js-library