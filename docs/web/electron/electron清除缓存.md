# electron 清除缓存

## 1、手动删除

```bash
# windows
C:\Users\<user>\AppData\Roaming\<yourAppName>\Cache

# Linux
/home/<user>/.config/<yourAppName>/Cache

# OS X
/Users/<user>/Library/Application Support/<yourAppName>/Cache
```

## 2、代码清除

```js
const { BrowserWindow } = require('electron');

const win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('https://github.com');

const session = win.webContents.session;

// 清除session的HTTP缓存
session.defaultSession.clearCache();

// 清除特定域名的缓存
const filter = {
  urls: ['https://www.example.com/*'],
};
session.defaultSession.clearCache(filter);

// 清除数据缓存
session.defaultSession.clearStorageData({
  storages: 'cookies,localstorage', // ookies, filesystem, indexdb, localstorage, shadercache, websql, serviceworkers, cachestorage
});

// session.defaultSession 表示默认会话
```
