# vue 首屏页面性能优化

## 1、vue 开启文件大小分析

### 1.1 安装

```
npm install webpack-bundle-analyzer --save-dev
```

### 1.2 vue.config.js 配置

```js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },
};
```

### 1.3 运行命令

```
npm run serve
```

访问 http://localhost:8888

## 2、vue-router 使用懒加载

```js
{
    path: '/Login',
    name: 'Login',
    component: () = >import( /* webpackChunkName: "Login" */  '@/view/Login')
}
```

> 同一个 vue 文件 webpackChunkName 保持一致

## 3、对于第三方 js 库分离打包

- 生产环境是内网的话，就把资源放内网，通过静态文件引入，会比 node_modules 和外网 CDN 的打包加载快很多。
- 如果是外网的话，可以通过 CDN 方式引入，因为不用占用访问外网的带宽，不仅可以节省流量，还能通过 CDN 加速，获得更快的访问速度。但是要注意下，如果你引用的 CDN 资源存在于第三方服务器，在安全性上并不完全可控。

目前采用引入依赖包生产环境的 js 文件方式加载，直接通过 window 可以访问暴露出的全局变量，不必通过 import 引入，Vue.use 去注册

### 3.1 配置 externals

在 vue.config.js 中配置 externals

```js
// cdn 服务
const cdn = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    'element-ui': 'ELEMENT',
    echarts: 'echarts',
    'vue-pdf-app': 'vue-pdf-app',
  },
};
module.exports = {
    configureWebpack: {
        externals: externals: process.env.VUE_APP_ENV !== 'development' ? cdn.externals : {}, // 非开发环境
        // 未配置 VUE_APP_ENV 值可能是 process.env.NODE_ENV
    }
}
```

### 3.2 使用 CDN 加载资源

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
    />
    <link
      rel="resource"
      type="application/l10n"
      href="<%= BASE_URL %>viewer.properties"
    />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>

    <% if (process.env.VUE_APP_ENV !== 'development' ) { %>
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-pdf-app@2.1.0/dist/icons/main.css"
    />
    <% } %>
  </head>

  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- 引入组件库 -->
    <% if (process.env.VUE_APP_ENV !== 'development' ) { %>
    <!-- vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
    <!--vue-router -->
    <script src="https://unpkg.com/vue-router@3"></script>
    <!--vuex -->
    <script src="https://unpkg.com/vuex@3"></script>
    <!-- elementUI -->
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <!-- axios -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- echarts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.3.0/dist/echarts.min.js"></script>
    <!-- vue-pdf-app -->
    <script src="https://unpkg.com/vue-pdf-app@2.1.0/dist/vue-pdf-app.umd.min.js"></script>
    <% } %>
  </body>
</html>
```

## 4、移除 console.log

### 4.1 安装依赖

npm install babel-plugin-transform-remove-console --save-dev

### 4.2 配置 babel.config.js

```js
const prodPlugins =
  process.env.VUE_APP_ENV === 'production' ? ['transform-remove-console'] : [];
module.exports = {
  plugins: [...prodPlugins],
  presets: ['@vue/cli-plugin-babel/preset'],
};
```

## 5、开启 gzip

### 5.1 vue 开启 gzip

（1）安装依赖

npm i compression-webpack-plugin@5.0.1 --save-dev

（2）在 vue.config.js 配置

```js
// gzip包
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  configureWebpack: {
    // 开启gzip
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(productionGzipExtensions),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
};
```

### 5.2 nginx 开启 gzip

```
gzip on;
gzip_min_length 1k;
gzip_comp_level 5;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";   
gzip_buffers 32 4k;
gzip_http_version 1.0;
```