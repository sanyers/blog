# 解决 ts-node 中 lobal 添加属性报错

## 1、添加类型文件

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

## 2、在 package.json 中设置 --files

```json
"scripts": {
    "start": "node ./dist/app.js",
    "dev": "ts-node --files ./src/app.ts",
    "build": "tsc",
    "startup": "tsc && node ./dist/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
