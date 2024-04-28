# node 下载文件

```js
 let writer=fs.creatWriterStream(filePath); // 创建一个写入流
 const response = await axios({
    url:imgUrl,
    method: "GET",
    responseType: "stream",
});
response.data.pipe(writer);
```
