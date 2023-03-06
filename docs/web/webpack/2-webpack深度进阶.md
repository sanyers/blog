# webpack 深度进阶

## 1、静态资源拷贝

```
npm install copy-webpack-plugin -D
```

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/js/*.js',
          to: path.resolve(__dirname, 'my-project', 'js'),
          flatten: true,
        },
      ],
    }),
  ],
};
```

## 2、注入全局变量

`ProvidePlugin` 的作用就是不需要 import 或 require 就可以在项目中到处使用。也就意味着被注册成了全局变量。

> 不建议过度使用

ProvidePlugin 是 webpack 的内置插件，使用方式如下：

```js
new webpack.ProvidePlugin({
  identifier1: 'module1',
  identifier2: ['module2', 'property2'],
});
```

默认寻找路径是当前文件夹 ./\*\* 和 node_modules，当然啦，你可以指定全路径。

引入 jquery：

```js
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
};
```

直接在页面上使用：

```js
console.log($);
```

## 3、抽离 CSS

通过 style-loader 我们可以将 css 通过 style 的方式添加到 header 中。但是有时候，我们可能会有抽离 CSS 的需求，即将 CSS 文件单独打包，这可能是因为打包成一个 JS 文件太大，影响加载速度，也有可能是为了缓存。

使用 `mini-css-extract-plugin` 插件

```
npm install mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          // style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
```

## 4、压缩 CSS

虽然我们讲 css 抽离出来了，但是默认情况下，这个 css 是不会压缩的。

如果想要压缩，需要配置 `optimization`，首先安装 `optimize-css-assets-webpack-plugin`。

```
npm install optimize-css-assets-webpack-plugin -D
```

```js
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  plugins: [new OptimizeCssPlugin()],
};
```

## 5、热更新

我们通过 devServer 实现了实时更新，但是我们需要更进一步，因为现在我们每修改一次代码都会刷新页面，所以我们需要实现热更新（也就是局部更新）。

我们需要使用 `HotModuleReplacementPlugin` 插件，这个插件是 webpack 自带的。

```js
module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新插件
  ],
  devServer: {
    hot: true, // 是否启用热更新
  },
};
```

然后在入口文件新增代码：

```js
if (module && module.hot) {
  module.hot.accept();
}
```

## 6、多页面应用

有时，我们的应用不一定是一个单页应用，而是一个多页应用，那么如何使用 webpack 进行打包呢，其实无非就是多次使用 htmlWebpackPlugin。

```js
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  output: {
    path: path.resolve(__dirname, 'my-project'),
    filename: '[name].[hash:6].js',
    publicPath: isDev ? '/' : './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 模板文件
      filename: 'index.html', // 打包后文件名
      config: config.template, // 配置config
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      hash: true, // 是否加上hash， 默认false
      chunks: ['index'], // 与 entry 入口对应
    }),
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      hash: false,
      chunks: ['login'], // 与 entry 入口对应
    }),
  ],
  devServer: {
    hot: true, // 是否启用热更新
  },
};
```

> entry 是多入口，output 需要动态生成，如上面配置。

## 7、resolve 配置

resolve 配置 webpack 如何寻找模块所对应的文件。webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你可以根据自己的需要修改默认的规则。

### 7.1 modules

`resolve.modules` 配置 webpack 去哪些目录下寻找第三方模块，默认情况下，只会去 node_modules 下寻找，如果你我们项目中某个文件夹下的模块经常被导入，不希望写很长的路径，那么就可以通过配置 `resolve.modules` 来简化。

首先，我们在 src 目录下新增一个 components 目录，并且增加一个文件 Message.js：

```js
export default {
  content: 'I am message!',
};
```

接着，我们修改 webpack.config.js：

```js
module.exports = {
  resolve: {
    modules: ['./src/components', 'node_modules'], // 从左到右依次查找
  },
};
```

webpack 就配置结束了，我们现在测试一下。在 index.js 中增加如下代码：

```js
import Message from 'Message';
console.log(Message.content);
```

### 7.2 alias

`resolve.alias` 配置项通过别名把原导入路径映射成一个新的导入路径。

```js
module.exports = {
  resolve: {
    modules: ['./src/components', 'node_modules'], // 从左到右依次查找
    alias: {
      '@': path.resolve(__dirname, 'src/api/login'),
    },
  },
};
```

测试代码：

```js
import api from '@/login.js';
console.log(api.content);
```

### 7.3 extensions

配置 extensions，我们就可以缺省文件后缀，在导入语句没带文件后缀时，会自动带上 extensions 中配置的后缀后，去尝试访问文件是否存在，因此要将高频的后缀放在前面，并且数组不要太长，减少尝试次数。如果没有配置 extensions，默认只会找对对应的 js 文件。

```js
module.exports = {
  resolve: {
    extensions: ['web.js', '.js'], //当然，你还可以配置 .json, .css
  },
};
```

### 7.4 enforceExtension

如果配置了 resolve.enforceExtension 为 true，那么导入语句不能缺省文件后缀。

### 7.5 mainFields

有一些第三方模块会提供多份代码，例如 bootstrap，可以查看 bootstrap 的 package.json 文件：

```json
{
  "style": "dist/css/bootstrap.css",
  "sass": "scss/bootstrap.scss",
  "main": "dist/js/bootstrap"
}
```

`import 'bootstrap'` 默认情况下，找的是对应的依赖的 package.json 的 main 字段指定的文件，即 `dist/js/bootstrap`。

假设我们希望，`import 'bootsrap'` 默认去找 css 文件的话，可以配置 `resolve.mainFields` 为：

```js
module.exports = {
  resolve: {
    mainFields: ['style', 'main'],
  },
};
```

## 8、区分不同环境

根据不同环境创建多个配置文件：

- webpack.base.js 定义公共的配置
- webpack.dev.js：定义开发环境的配置
- webpack.prod.js：定义生产环境的配置

### 8.1 merge 合并对象

`webpack-merge` 专为 webpack 设计，提供了一个 merge 函数，用于连接数组，合并对象。

```
npm install webpack-merge -D
```

merge 的用法如下：

```js
const merge = require('webpack-merge');
const a = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{ a: 1 }],
  },
  plugins: [1, 2, 3],
};
const b = {
  devtool: 'none',
  mode: 'production',
  module: {
    rules: [{ a: 2 }, { b: 1 }],
  },
  plugins: [4, 5, 6],
};
const c = merge(a, b);
// c 的结构为：
// {
//   devtool: 'none',
//   mode: 'production',
//   module: {
//     rules: [{ a: 1 }, { a: 2 }, { b: 1 }],
//   },
//   plugins: [1, 2, 3, 4, 5, 6],
// }
```

### 8.2 提取 webpack.base.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./../public/config')[isDev ? 'dev' : 'build'];
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    login: path.resolve(__dirname, '../src/login.js'),
  },
  output: {
    path: path.resolve(__dirname, '../my-project'),
    filename: '[name].[hash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    overrideBrowserslist: ['>0.25%', 'not dead'],
                  }),
                ];
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K
              esModule: false,
              name: '[name]_[hash:8].[ext]',
              outputPath: 'images',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 模板文件
      filename: 'index.html', // 打包后文件名
      config: config.template, // 配置config
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      hash: true, // 是否加上hash， 默认false
      chunks: ['index'], // 与 entry 入口对应
    }),
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      hash: false,
      chunks: ['login'], // 与 entry 入口对应
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/js/*.js',
          to: path.resolve(__dirname, '../my-project', 'js'),
          flatten: true,
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, '../src/components'), 'node_modules'], // 从左到右依次查找
    alias: {
      '@': path.resolve(__dirname, 'src/api/login'),
    },
  },
};
```

### 8.3 提取 webpack.dev.js

```js
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const webpack = require('webpack');
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新插件
  ],
  devServer: {
    hot: true, // 是否热更新
    port: '3000', // 默认是8080
    quiet: false, // 默认不启用
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', // 终端仅打印 error
    overlay: false, // 默认不启用
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
  },
  devtool: 'cheap-module-eval-source-map', //开发环境下使用
});
```

### 8.4 提取 webpack.prod.js

```js
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: './',
  },
  plugins: [
    // 不需要传参数，它可以自动寻找outputPath
    new CleanWebpackPlugin(),
    new OptimizeCssPlugin(),
  ],
  devtool: 'none',
});
```

### 8.5 自定义环境变量

很多时候，我们在开发环境中会使用预发环境或者是本地的域名，生产环境中使用线上域名，我们可以在 webpack 定义环境变量，然后在代码中使用。

我们以一个需求来说，假设我们需要在页面反应打包的当前时间，那么我们就需要用到环境变量。

```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      runnerTime: new Date().getTime(),
    }),
  ],
};
```

之后可以直接在页面上使用：

```js
console.log(runnerTime);
```

这个时候，我们启动服务，发现打印台打印了启动服务的时间，这个时间不会变动，只会在重启服务的时候变动。

## 9、实现跨域

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:4000',
      // 或者
      '/api2': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '/api2': '', // 替换
        },
      },
    },
  },
};
```
