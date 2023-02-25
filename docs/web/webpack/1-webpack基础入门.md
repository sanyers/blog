# webpack 基础入门

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

## 1、webpack 核心概念

- `entry`: 入口
- `output`: 输出
- `loader`: 模块转换器，用于把模块原内容按照需求转换成新内容
- `plugins`: 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情
- `mode`: 模式，提供三种模式 `development` `production` `none`

## 1.1 入口 entry

入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 `./src/index.js`

```js
// webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

## 1.2 输出 output

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

## 1.3 loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，loader 有两个属性：

- `test` 属性，识别出哪些文件会被转换。
- `use` 属性，定义出在进行转换时，应该使用哪个 loader。

```js
// webpack.config.js

```