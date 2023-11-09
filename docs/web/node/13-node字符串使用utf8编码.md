# node 字符串使用 utf8 编码

```js
let str = JSON.stringify(json);
const encoder = new TextEncoder();
const uint8 = encoder.encode(str);
const buffer = Buffer.from(uint8);
str = buffer.toString('utf8');
console.log(str)
console.log(uint8.byteLength) // 字符串长度使用 byteLength
```
