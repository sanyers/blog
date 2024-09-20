# node 常见问题

## 1、Vuepress项目编译时报routines的错误

```log
/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:114
			throw e;
			^
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/webpack/lib/NormalModule.js:471:10)
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/webpack/lib/NormalModule.js:503:5
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/webpack/lib/NormalModule.js:358:12
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at context.callback (/home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/cache-loader/dist/index.js:134:7
    at /home/runner/work/HowToStartOpenSource/HowToStartOpenSource/node_modules/graceful-fs/graceful-fs.js:61:14
    at FSReqCallback.oncomplete (node:fs:197:23) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```

后来检索到一个原因，说是 webpack 的版本原因，具体信息看这个 [issue。  (opens new window)](https://github.com/webpack/webpack/issues/14532)

根据 Node.js 官网的博客所写：

Node.js v17.x、v18.x 和 v19.x 使用 OpenSSL v3，而 v14.x 和 v16.x 不会受到影响。

```
The OpenSSL project announced will release OpenSSL 3.0.7 on the 1th of November 2022 between 1300-1700 UTC. The release will fix security defects on which the highest severity issue is HIGH.
Node.js v17.x, v18.x, and v19.x use OpenSSL v3.
...
Node.js 14.x and v16.x are not affected by this OpenSSL update.
```

解决方案

（1）运行代码前，在终端内添加环境变量 `NODE_OPTIONS=--openssl-legacy-provider`

macOS 和 Linux

```
export NODE_OPTIONS=--openssl-legacy-provider
```

Windows PowerShell

```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

Windows 命令提示符（cmd）

```
set NODE_OPTIONS=--openssl-legacy-provider
```

（2）为 Windows 设置全局环境变量

Win + R 打开 运行，输入 `sysdm.cpl` 后回车，选择 `高级` 选项，点击右下角 `环境变量`，点击 `用户变量` 中的 `新建`，变量名 为 `NODE_OPTIONS`，变量值 为 `--openssl-legacy-provider`。随后一直 `确定` 即可。

（3）终极方案：降版本

对于 nvm 用户来说，切换 Node.js 版本只需要一行命令即可：

```
nvm install 16
```

参考

https://cloud.tencent.com/developer/article/2220344

https://www.jianshu.com/p/edbad6875b7e

## 2、解决 ts-node 中 lobal 添加属性报错

### 2.1 添加类型文件

> src/types/global.d.ts

```ts
declare global {
  var test1: string;
  var test2: any;
}

export {};
```

使用：

```ts
global.test1 = 'test';
global.test2 = 'test2';
```

### 2.2 在 package.json 中设置 --files

```json
"scripts": {
    "start": "node ./dist/app.js",
    "dev": "ts-node --files ./src/app.ts",
    "build": "tsc",
    "startup": "tsc && node ./dist/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
