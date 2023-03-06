# webpack 性能优化

## 1、量化速度

我们首先需要一个量化的指标来衡量我们到底是否对 webpack 进行了优化，如果完全凭感觉那就没意义了。

`speed-measure-webpack-plugin` 插件可以测量各个插件和 loader 所花费的时间，使用之后，构建时，会得到类似下面这样的信息：

<a data-fancybox title="打包速度" href="/blog/img/web/webpack/1.png"><img :src="$withBase('/img/web/webpack/1.png')" alt="打包速度"></a>

需要注意一点，`speed-measure-webpack-plugin` 和 `HotModuleReplacementPlugin`（热更新插件）不能同时使用，否则会报错，不过我们也不需要同时使用，因为一个用于开发环境，一个用于生产环境。

```
npm install speed-measure-webpack-plugin -D
```

由于我们优化主要是对生产模式，所以我们修改 webpack.prod.js：

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(merge(baseWebpackConfig, {}));
```

## 2、exclude/include

我们可以通过 exclude、include 配置来确保转译尽可能少的文件。顾名思义，exclude 指定要排除的文件，include 指定要包含的文件。

exclude 的优先级高于 include，在 include 和 exclude 中使用绝对路径数组，尽量避免 exclude，更倾向于使用 include。

我们为 babel-loader 内的内容增加 include（修改 webpack.base.js）：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        // exclude: /node_modules/
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },
};
```

我们不加 include 和增加 include 分别打包一次，以下是二者对比的结果：

<a data-fancybox title="打包速度对比" href="/blog/img/web/webpack/2.png"><img :src="$withBase('/img/web/webpack/2.png')" alt="打包速度对比"></a>

## 3、cache-loader

在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中。默认保存在 `node_modueles/.cache/cache-loader` 目录下。

```
npm install cache-loader -D
```

接着，我们为 babel-loader 增加一个 cache-loader，修改 webpack.base.js：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['cache-loader', 'babel-loader'],
        // exclude: /node_modules/
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },
};
```

我们需要注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader，经对比发现，对 babel-loader 和 ts-loader 使用 cache-loader， 效果明显。

## 4、happypack

由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，Webpack 构建慢的问题会显得严重。文件读写和计算操作是无法避免的，那能不能让 Webpack 同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度呢？

HappyPack 就能让 Webpack 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

需要注意的一点是，happypack 和 cache-loader 如果同时作用于一个 loader，会产生意想不到的结果（可能报错）。

另外，在测试 Demo 或者小型项目中，使用 happypack 对项目构建速度的提升不明显，甚至会增加项目的构建速度, 在比较复杂的大中型项目中，使用 happypack 才能看到比较明显的构建速度提升。

修改 webpack.base.js：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: ['cache-loader', 'babel-loader'],
        use: 'Happypack/loader?id=js',
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },
  plugins: [
    new Happypack({
      id: 'js',
      use: ['babel-loader'],
    }),
  ],
};
```

由于我们项目比较小，所以打包时间反而增加了，所以再次强调，除非项目庞大，否则别轻易使用这个插件。

## 5、thread-loader

除了使用 Happypack 外，我们也可以使用 thread-loader ，把 thread-loader 放置在其它 loader 之前，那么放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行。

在 worker 池(worker pool)中运行的 loader 是受到限制的。例如：

- 这些 loader 不能产生新的文件。
- 这些 loader 不能使用定制的 loader API（也就是说，通过插件）。
- 这些 loader 无法获取 webpack 的选项设置。

修改 webpack.base.js：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },
};
```

## 6、开启 JS 多进程压缩

虽然很多 webpack 优化的文章上会提及多进程压缩的优化，不管是 `webpack-parallel-uglify-plugin` 或者是 `uglifyjs-webpack-plugin` 配置 parallel。不过这里我要说一句，没必要单独安装这些插件，它们并不会让你的 Webpack 构建速度提升。

当前 Webpack 默认使用的是 `TerserWebpackPlugin`，默认就开启了多进程和缓存，构建时，你的项目中可以看到 terser 的缓存文件 `node_modules/.cache/terser-webpack-plugin`。

## 7、HardSourceWebpackPlugin

`HardSourceWebpackPlugin` 为模块提供中间缓存，缓存默认的存放路径是：`node_modules/.cache/hard-source`。

配置 `hard-source-webpack-plugin`，首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。

```
npm install hard-source-webpack-plugin -D
```

修改 webpack.prod.js：

```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = smp.wrap(
  merge(baseWebpackConfig, {
    plugins: [new HardSourceWebpackPlugin()],
  }),
);
```

需要注意的是，这个插件会和很多插件不兼容，所以用的时候需要慎重，我们这个项目当中就会和 `mini-css-extract-plugin` 等不兼容。

## 8、noParse

如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。

noParse 属性的值是一个正则表达式或者是一个 function。

我们在 webpack.base.js 配置如下：

```js
module.exports = {
  module: {
    noParse: /jquery/,
  },
};
```

由于我们解析已经忽略了 node_modules 中的文件，所以这次没有什么提升，如果在 src 目录下有一些第三方插件，就可以用此方法忽略。

## 9、resolve

resolve 在前面已经讲过，可以配置模块的寻找顺序以及对路径进行别名命名和文件后缀。

需要记住的是，如果你配置了上述的 resolve.moudles ，可能会出现问题，例如，你的依赖中还存在 node_modules 目录，那么就会出现，对应的文件明明在，但是却提示找不到。因此呢，个人不推荐配置这个。

另外，resolve 的 extensions 配置，默认是 ['.js', '.json']，如果你要对它进行配置，记住将频率最高的后缀放在第一位，并且控制列表的长度，以减少尝试次数。

## 10、externals

我们可以将一些 JS 文件存储在 CDN 上(减少 Webpack 打包出来的 js 体积)，在 index.html 中通过 `<script>` 标签引入。

webpack.base.js：

```js
module.exports = {
  externals: {
    jquery: 'jQuery',
  },
};
```

## 11、量化大小

在 vue-cli 中，我们可以通过可视化界面看到每个包的大小，其实这是使用了 webpack 的 `webpack-bundle-analyzer` 插件。

所以，我们需要使用这个插件来分析依赖包

```
npm install webpack-bundle-analyzer -D
```

由于我们只需要在 build 的时候才看可视化界面，所以我们修改 webpack.prod.js：

```js
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(
  merge(baseWebpackConfig, {
    plugins: [new BundleAnalyzerPlugin()],
    devtool: 'none',
  }),
);
```

这个时候，我们通过 npm run build 打包，发现打包完成后，会自动启动http://127.0.0.1:8888，页面如下：

<a data-fancybox title="依赖包分析" href="/blog/img/web/webpack/3.png"><img :src="$withBase('/img/web/webpack/3.png')" alt="依赖包分析"></a>

## 12、抽离公共代码

抽离公共代码是对于多页应用来说的，如果多个页面引入了一些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要下载一次就缓存起来了，避免了重复下载。

抽离公共代码对于单页应用和多页应该在配置上没有什么区别，都是配置在 `optimization.splitChunks` 中。

现在，我们以我们项目为例，将 node_modules 和 juqery 都单独抽取出来，我们修改 webpack.prod.js：

```js
module.exports = smp.wrap(
  merge(baseWebpackConfig, {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            priority: 1, //设置优先级，首先抽离第三方模块
            name: 'vendor',
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0,
            minChunks: 1, //最少引入了1次
          },
          jquery: {
            priority: 2,
            test: /jquery/,
            chunks: 'initial',
          },
          common: {
            //公共模块
            chunks: 'initial',
            name: 'common',
            minSize: 100, //大小超过100个字节
            minChunks: 3, //最少引入了3次
          },
        },
      },
    },
  }),
);
```

## 13、webpack 自身的优化

### 13.1 tree-shaking

如果使用 ES6 的 import 语法，那么在生产环境下，会自动移除没有使用到的代码。

```js
// math.js
const add = (a, b) => {
  console.log('aaaaaa');
  return a + b;
};

const minus = (a, b) => {
  console.log('bbbbbb');
  return a - b;
};
export { add, minus };
```

```js
//index.js
import { add, minus } from './math';
add(2, 3);
```

构建的最终代码里，minus 函数不会被打包进去。

### 13.2 scope hosting 作用域提升

变量提升，可以减少一些变量声明。在生产环境下，默认开启。
