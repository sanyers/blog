# node调用c++库

## 1、安装环境

创建空白目录 `test_node_c`

创建 `package.json`

```json
{
  "name": "test-node-c",
  "version": "0.1.0",
  "private": true,
  "gypfile": true
}
```

安装 node-addon-api 库 `npm install node-addon-api --save`

创建 `binding.gyp` 文件

```gyp
{
  "targets": [
    {
      "target_name": "test",
      "sources": [
        "test.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
      }
    }
  ]
}
```

- sources指明c++的源文件，如果有多个文件，需要用逗号隔开，放到同一个数组中。
- include_dirs是编译时使用的头文件引入路径，这里使用node -p执行node-addon-api模块中的预置变量。
- dependencies是必须的，不要改变。
- 但如果是在macOS上编译使用，则还要需要最后一项xcode-settings设置

## 2、编写 c++ 库

> test.h

```h
#pragma once
#ifndef TEST_H
#define TEST_H

#include <string>
#include <stdio.h>

using namespace std;

const string fun_a(const string name) {
    string str = " hello!";
    string strs = name + str;
}

#endif
```

> test.cc

```c++
#include <napi.h>
#include "test.h"

using namespace Napi;
using namespace std;

String fun_as(const CallbackInfo& info) {
  string name = info[0].As<String>().Utf8Value();
  string str = fun_a(name);
  return String::New(info.Env(), str);
}

Napi::Object  Init(Env env, Object exports) {
  exports.Set("fun_as", Function::New(env, fun_as));
  return exports;
}
NODE_API_MODULE(addon, Init)
```

## 3、编译并运行

准备上述文件 `package.json`、`binding.gyp`、`test.h`、`test.cc` 之后，使用 `npm install` 进行编译

编写 index.js

```js
const test = require('./build/Release/test.node')

const str = test.fun_as('xiaoming')
console.log(str)
// xiaoming hello!
```

## 4、可选安装

编译源码需要安装  python 和 vs2015+，如果已安装则省略

- binding.gyp 编译使用 python
- c++ 编译使用 vs2015+