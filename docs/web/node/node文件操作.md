# node 文件操作

## 1、重命名、移动

```js
fs.rename(
  './files/04.重命名和移动.txt',
  './files/04.重命名和移动_修改名字.txt',
  err => {},
);
```

## 2、删除文件

```js
// 删除，err 是失败返回数据对象，成功返回 null
fs.unlink('./files/04.重命名和移动_修改名字.txt', err => {
  console.log(err);
});
```

## 3、获取文件元数据信息

`fs.stat(path, options, callbackfunction)`

```js
const fs = require('fs');

fs.stat('./package.json', (err, fileObject) => {
  if (err) {
    console.log(err);
  } else {
    console.log(fileObject);
  }
});
```

输出：

```
Stats {
  dev: 3330445139,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 562949955554406,
  size: 204,
  blocks: 0,
  atimeMs: 1645280252542.7854,
  mtimeMs: 1644120598975.729,
  ctimeMs: 1644120598975.729,
  birthtimeMs: 1642860250548.1833,
  atime: 2022-02-19T14:17:32.543Z,
  mtime: 2022-02-06T04:09:58.976Z,
  ctime: 2022-02-06T04:09:58.976Z,
  birthtime: 2022-01-22T14:04:10.548Z
}
```

提供方法：

```js
const fs = require("fs")

fs.stat("./package.json", (err, fileObject) => {
    if (err) {
        console.log(err)
    } else {
        console.log(fileObject.isFile()) // return true for files
        console.log(fileObject.isDirectory())// true for directory
        console.log(fileObject.isBlockDevice())
        console.log(fileObject.isSymbolicLink()) return true for symbolic link
        console.log(fileObject.isCharacterDevice())
        console.log(fileObject.isFIFO())
        console.log(fileObject.isSocket())
    }
})
```

`fs.statSync(path, options)` statSync 是 stat 函数的同步版本
