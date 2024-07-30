# node 调用动态库

## 1、node-ffi-napi

[node-ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi)

node-ffi-napi 是一个用于加载和调用动态库的 Node.js 插件 使用纯 JavaScript。它可用于创建与本机库的绑定 无需编写任何 C++ 代码。

安装：`npm install ffi-napi`

示例 1：

```js
var ffi = require('ffi-napi');

var libm = ffi.Library('libm', {
  ceil: ['double', ['double']],
});
libm.ceil(1.5); // 2

// You can also access just functions in the current process by passing a null
var current = ffi.Library(null, {
  atoi: ['int', ['string']],
});
current.atoi('1234'); // 1234
```

示例 2：

```js
var ffi = require('ffi-napi');

var current = ffi.Library('./test.so', {
  testFun: ['int', ['string']],
});
const str = 'hello world!';
const a = current.testFun(str);
console.log(a);
```

## 2、koffi

[koffi](https://github.com/Koromix/koffi) [koffi docs](https://koffi.dev/)

Koffi 是一款快速且易于使用的 C FFI 模块，用于 Node.js

### 2.1 简单调用

```js
const koffi = require('koffi');

// 调用公共库
const lib1 = koffi.load('libc.so.6');
const printf = lib1.func('int printf(const char *format, ...)');
printf('Hello World!\n');

// 调用编译好的so库
const lib2 = koffi.load('libmweng.so');
// 声明函数：方式一
const helloFun = lib2.func('int helloFun(char *msg)');
// 声明函数：方式二
const helloFun = libs.func('helloFun', 'int', ['str']);
// 函数调用
setup('Hello World');
```

### 2.2 函数回调

koffi 区分了两种回调模式：

- **瞬态回调**只能在传递给它们的 C 函数运行时调用，并且在返回时失效。如果 C 函数稍后调用回调，则行为是未定义的，尽管 Koffi 尝试检测此类情况。如果确实如此，将会抛出异常，但这并不能保证。然而，它们使用起来很简单，不需要任何特殊处理。
- **注册回调**可以随时调用，但必须手动注册和取消注册。可以同时存在有限数量的注册回调。

（1）瞬态回调

当本机 C 函数仅需要在运行时调用它们时，请使用瞬态回调

```js
// 声明回调方法
const excuteCallback = koffi.proto(
  'int excuteCallback(char *str1, char *str2, unsigned long long aa)',
);
const excute = libs.func('excute', 'int', [
  'str',
  koffi.pointer(excuteCallback),
  'int',
]);

const r = excute(
  'test1',
  (str1, str2, aa) => {
    console.log('js:' + str1);
    console.log('js:' + str2);
    console.log('js:' + aa);
    return 0;
  },
  0,
);
console.log(r);
```

（2）注册回调

当函数需要稍后调用时（例如日志处理程序、事件处理程序等 fopencookie/funopen），请使用已注册的回调。调用 koffi.register(func, type)注册回调函数，有两个参数：JS 函数和回调类型。

完成后，调用 koffi.unregister()（使用返回的值 koffi.register()）来释放插槽。最多可以同时存在 8192 个回调。如果不这样做，槽就会泄漏，一旦所有槽都被使用，后续注册可能会失败（有例外）。

下面的示例展示了如何注册和取消注册延迟回调。

```ts
// 声明日志回调事件
const log_cb = koffi.proto('void log_cb(char *message)');
// 注册日志回调事件
const cb1 = koffi.register((message: string) => {
  // 函数回调
  const str = strEncoder(message);
  console.log('log_cb：' + str);
}, koffi.pointer(log_cb));
// 声明函数
const registLogCb = lib.func('int registLogCb(log_cb *cb1, int level)')
// 调用函数
registLogCb(cb1, 2)
```

https://koffi.dev/

https://nongchatea.gitbook.io/koffi-chinese