# webpack 基础入门

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

## 1、webpack 核心概念

- `entry`: 入口
- `output`: 输出
- `loader`: 模块转换器，用于把模块原内容按照需求转换成新内容
- `plugins`: 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情
- `mode`: 模式，提供三种模式 `development` `production` `none`

### 1.1 entry

入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 `./src/index.js`

```js
// webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

### 1.2 output

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

### 1.3 loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，loader 有两个属性：

- `test` 属性，识别出哪些文件会被转换。
- `use` 属性，定义出在进行转换时，应该使用哪个 loader。

```js
// webpack.config.js
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }], // 在 require()/import 语句中被解析为 '.txt' 的路径，使用 'raw-loader' 转换
  },
};
```

### 1.4 plugins

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建一个插件实例。

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

### 1.5 mode

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

```js
module.exports = {
  mode: 'production',
};
```

## 2、转换代码兼容低版本

将JS代码向低版本转换，我们需要使用 `babel-loader`。

```js
module.exports = {
  module: {
    rules: [{ test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ }],
  }
};
```

在 `.babelrc` 中编写 babel 的配置

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      { "corejs": 3 }
    ]
  ]
}
```

也可以在 webpack 中配置

```js
module.exports = {
  module: {
    rules: [{ 
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              { "corejs": 3 }
            ]
          ]
        }
      },
      exclude: /node_modules/
    }],
  }
};
```

## 3、在浏览器中查看

查看页面，难免就需要 html 文件，大家可能知道，有时我们会指定打包文件中带有 hash，那么每次生成的 js 文件名会有所不同，我们肯定不能每次自己去修改HTML，因此，我们可以使用 `html-webpack-plugin` 插件来帮助我们完成这些事情。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    // 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html', // 模板文件
      filename: 'index.html', // 打包后文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false // 是否折叠空白
      },
      hash: true // 是否加上hash， 默认false
    })
  ]
}
```

## 4、实时展示

到现在为止，我们依然没有实现像 vue-cli 中的那种实时更新展示的效果。那么接下来，我们来实现。

首先，我们先安装依赖：`npm install webpack-dev-server -D`

修改 package.json：

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server",
  "build": "cross-env NODE_ENV=production webpack"
}
```

我们还是可以在 `webpack.config.js` 中进行 `webpack-dev-server` 的其它配置

```js
module.exports = {
  devServer: {
    port: '3000', // 默认是8080
    quiet: false, // 默认不启用，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", // 终端仅打印 error
    overlay: false, // 默认不启用，当编译出错时，会在浏览器窗口全屏输出错误
    clientLogLevel: "silent", // 日志等级
    compress: true // 是否启用 gzip 压缩
  }
}
```

## 5、devtool

devtool 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。

```js
module.exports = {
  devtool: 'cheap-module-eval-source-map' //开发环境下使用
}
```

生产环境可以使用 none 或者是 source-map，使用 source-map 最终会单独打包出一个 .map 文件，我们可以根据报错信息和此 map 文件，进行错误解析，定位到源代码。


## 6、处理样式文件

如果是 `.css`，我们需要的 `loader` 通常有： `style-loader`、`css-loader`，考虑到兼容性问题，还需要 `postcss-loader`，而如果是 `less` 或者是 `sass` 的话，还需要 `less-loader` 和 `sass-loader`

安装依赖：` npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D`

```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')({
                  'overrideBrowserslist':[">0.25%", "not dead"]
                })
              ]
            }
          }
        }, 'less-loader'],
        exclude: /node_modules/
      }
    ],
  }
};
```

loader 说明：

- `style-loader`：动态创建 style 标签，将 css 插入到 head 中。
- `css-loader`：负责处理 @import 等语句。
- `postcss-loader` 和 autoprefixer：自动生成浏览器兼容性前缀。
- `less-loader`：负责处理编译 .less 文件,将其转为 css。

另外，需要注意的是，loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行，上面 loader 的执行顺序为：

`less-loader ---> postcss-loader ---> css-loader ---> style-loader`

## 7、图片/字体文件处理

我们可以使用 url-loader 或者 file-loader 来处理本地的资源文件。

```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, // 10K
            esModule: false,
            name: '[name]_[hash:8].[ext]', // 配置资源哈希值
            outputPath: 'images', // 当本地资源较多时，打包在一个文件夹下
          }
        }],
        exclude: /node_modules/
      }
    ],
  }
};
```

## 8、清空dist目录

```
npm install clean-webpack-plugin -D
```

配置 webpack

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```