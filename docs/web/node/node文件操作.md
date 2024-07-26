# node文件操作

## 1、重命名、移动

```js
fs.rename('./files/04.重命名和移动.txt', './files/04.重命名和移动_修改名字.txt', err => { })
```

## 2、删除文件

```js
// 删除，err 是失败返回数据对象，成功返回 null
fs.unlink('./files/04.重命名和移动_修改名字.txt', err => {
    console.log(err);
})

```