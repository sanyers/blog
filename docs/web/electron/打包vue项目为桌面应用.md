# 打包 vue 项目为桌面应用

如何将 vue 打包成为一个桌面应用，可以生成 exe 可执行程序，这里使用 [Electron 技术](https://www.electronjs.org/)

## 1、创建 vue 项目

使用 vue cli 创建 vue 项目，不会 vue cli 的点[这里](https://cli.vuejs.org/zh/)

```
vue create my-electron
```

## 2、配置 vue.config.js

配置 vue 项目相关启动项和打包项

```js
module.exports = {
  publicPath: './',
  outputDir: 'electron/dist', // 需要创建 electron 目录
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'my-electron',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      chunksSortMode: 'manual',
    },
  },
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: '8071', // vue 项目端口
    proxy: {}, // 代理
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,
};
```

## 3、安装 electron

```
npm i electron -D // 国内可能被墙，本人使用 cnpm 才安装成功
或者
cnpm i electron -D
```

## 4、配置 electron

在项目根目录下创建 electron 目录，然后分别创建 `app.js`、`package.js`、`preload.js`

> electron/app.js

这个文件是 electron 程序启动入口，即主进程，这里主进程内容主要参考[官方示例](https://www.electronjs.org/zh/docs/latest/tutorial/examples)

```js
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload.js 可配置预加载脚本
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  // console.log(process.env);
  // and load the index.html of the app.
  // mainWindow.loadFile('dist/index.html');
  mainWindow.loadURL('http://localhost:8071'); // 打开vue项目地址，可以是本地file路径也可以是网络路径
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

> electron/package.json

electron 程序启动入口配置

```json
{
  "name": "my-electron",
  "private": true,
  "main": "app.js"
}
```

> electron/preload.js

可用于 vue 项目与 electron 交互，让 vue 页面也拥有桌面端功能，[API 说明](https://www.electronjs.org/zh/docs/latest/api/app)

```js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  // 在前端页面中调用 window.myAPI.doTest()
  doTest: () => {
    console.log(process);
  },
});
```

## 5、配置启动与打包

在根目录的 package.json 中配置

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "electron ./electron --no-sandbox", // 配置 electron 启动目录
    "dev": "npm run serve && npm run start", // 启动 vue 和 electron
    "build:test": "electron-packager ./electron my-electron-test --platform=win32 --arch=x64 --icon=./public/favicon.ico --out=./dist_electron --asar --app-version=1.0.0 --overwrite --ignore=node_modules", // 配置测试包
    "build:prod": "electron-packager ./electron my-electron --platform=win32 --arch=x64 --icon=./public/favicon.ico --out=./dist_electron --asar --app-version=1.0.0 --overwrite --ignore=node_modules" // 配置正式包
  }
}
```

## 6、启动项目

```
npm run dev
```

首次运行可能会出现 `unable to verify the first certificate` 的错误，解决办法：

1、修改npm的config，设置npm  ssl校验为false：

```
npm config set strict-ssl false
```

2、修改 registry 设置，改成 http 协议：

```
npm config set registry http://registry.npm.taobao.org/
```

3、升级 npm 版本

```
npm i -g npm
```

4、设置 ca 为空

```
npm config set ca=""
```

5、设置环境变量

`NODE_TLS_REJECT_UNAUTHORIZED=0`

桌面 -> 右键“此电脑” -> 属性 -> 高级系统设置 -> 环境变量 ->

在【用户变量】中新增值为 0 的变量 NODE_TLS_REJECT_UNAUTHORIZED

本人使用第5种方法可成功