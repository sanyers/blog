# 使用 vue 开发 nextcloud 应用

## 1、初始化 nextcloud 应用

进入 [官网](https://apps.nextcloud.com/developer/apps/generate) 下载 demo 示例应用，或者 git 克隆 https://github.com/nextcloud/cookbook.git

[参考](https://docs.nextcloud.com/server/latest/developer_manual/app_development/tutorial.html)

## 2、应用文件目录

下面五个文件夹里面的内容是最基本的应用文件目录，部署时必须包含

- `appinfo` 应用相关配置
- `img` 图片目录，包含应用图标
- `js` 打包后的 js 目录
- `lib` php 库接口相关，里面包含应用域下的接口
  例如：`namespace OCA\xxx\AppInfo;` xxx 需要修改成应用的专属域
- `templates` 模板

## 3、vue2 代码

下载的 demo 示例是 vue2+js

### 3.1 安装依赖和修改代码

首先进行安装 `npm install`

然后可以直接修改 `src/App.vue` 文件

```vue
<template>
  <div>hello world</div>
</template>
```

### 3.2 打包

执行 `npm run build` 打包，就可以在 `js` 目录看到 `xxx-main.js` 打包文件了

### 3.3 部署代码

将目录 `appinfo`、`img`、`js`、`lib`、`templates` 复制到 nextcloud 的 `/html/custom_apps` 目录，然后打开 nextcloud 应用列表，就可以看到你部署的应用，点击启用，在 nextcloud 导航栏就出现了你的应用的图标

## 4、vue3+ts 部署

官方的应用都是基于 vue2 的，如果需要使用 vue3 框架，需要进行一定的修改

### 4.1 创建 vue3+ts 项目

同样复制目录 `appinfo`、`img`、`js`、`lib`、`templates` 到项目根目录下

### 4.2 创建代码目录

创建 `src` 目录和 `main.ts`

```ts
import { createApp } from 'vue';
import './style.less';
import App from './App.vue';

const app = createApp(App);

app.mount('#content'); // 从 templates/main.php 查看 id 名称
```

### 4.3 编写 `package.json` 配置文件

```json
{
  "name": "vue3demo",
  "private": true,
  "version": "0.0.1",
  "scripts": {
    "serve": "vite", // 使用 vite 本地运行
    "build": "webpack --node-env production --progress",
    "dev": "webpack --node-env development --progress",
    "watch": "webpack --node-env development --progress --watch"
  },
  "dependencies": {
    "axios": "^1.3.6",
    "pinia": "^2.0.35",
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@types/node": "^18.15.13",
    "less": "^4.1.3",
    "less-loader": "^11.1.3",
    "typescript": "^5.0.2",
    "@babel/core": "^7.21.4",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "node-polyfill-webpack-plugin": "2.0.1",
    "sass": "^1.62.0",
    "sass-loader": "^13.2.2",
    "style-loader": "^3.3.2",
    "vue-loader": "^17.0.1",
    "vue-template-compiler": "^2.7.14",
    "webpack": "^5.79.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.13.3"
  }
}
```

### 4.4 编写 `rules.js` 文件

```js
module.exports = {
  RULE_CSS: {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  RULE_SCSS: {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  RULE_LESS: {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  },
  RULE_VUE: {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  RULE_JS: {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  RULE_TS: {
    test: /\.tsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  RULE_ASSETS: {
    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
    type: 'asset/inline',
  },
};
```

### 4.5 配置 typescript

编写 `tsconfig.json` 文件和 `tsconfig.node.json`，使用默认配置即可

### 4.6 配置 webpack

编写 `webpack.config.js` 打包配置

```js
const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const appName = process.env.npm_package_name
const appVersion = process.env.npm_package_version
const buildMode = process.env.NODE_ENV
const isDev = buildMode === 'development'
console.info('Building', appName, appVersion, '\n')

const rules = require('./rules')

module.exports = {
	target: 'web',
	mode: buildMode,
	devtool: isDev ? 'cheap-source-map' : 'source-map',

	entry: {
		main: path.resolve(path.join('src', 'main.ts')),
	},
	output: {
		path: path.resolve('./js'),
		publicPath: path.join('/apps/', appName, '/js/'),

		// Output file names
		filename: `${appName}-[name].js?v=[contenthash]`,
		chunkFilename: `${appName}-[name].js?v=[contenthash]`,

		// Clean output before each build
		clean: true,

		// Make sure sourcemaps have a proper path and do not
		// leak local paths https://github.com/webpack/webpack/issues/3603
		devtoolNamespace: appName,
		devtoolModuleFilenameTemplate(info) {
			const rootDir = process.cwd()
			const rel = path.relative(rootDir, info.absoluteResourcePath)
			return `webpack:///${appName}/${rel}`
		},
	},

	cache: !isDev,

	optimization: {
		chunkIds: 'named',
		splitChunks: {
			automaticNameDelimiter: '-',
		},
		minimize: !isDev,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					}
				},
				extractComments: true,
			}),
		],
	},

	module: {
		rules: Object.values(rules),
	},

	plugins: [
		new VueLoaderPlugin(),

		// Make sure we auto-inject node polyfills on demand
		// https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
		new NodePolyfillPlugin({
			// These modules available in the web-browser
			excludeAliases: ['console', 'Buffer'],
		}),

		// Make appName & appVersion available as a constant
		new webpack.DefinePlugin({ appName: JSON.stringify(appName) }),
		new webpack.DefinePlugin({ appVersion: JSON.stringify(appVersion) }),
	],

	resolve: {
		extensions: ['*', '.ts', '.js', '.vue'],
		symlinks: false,
		// Ensure npm does not duplicate vue dependency, and that npm link works for vue 3
		// See https://github.com/vuejs/core/issues/1503
		// See https://github.com/nextcloud/nextcloud-vue/issues/3281
		alias: {
			'vue$': path.resolve('./node_modules/vue'),
			'@': path.resolve(__dirname, './src'),
		},
	},
}
```

### 4.6 配置 vite

vite 用于本地运行时

编写 `vite.config.ts`

```ts
// / <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: {
    host: true,
    port: 18004,
    proxy: {
      '^/dev': {
        // 局域网测试机地址
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
})
```

运行 vite 需要安装：`"vite": "^4.3.0"` `"@vitejs/plugin-vue": "^4.1.0"`

然后在 package.json 中配置 scripts 添加一项 `"serve": "vite"`

## 5、参考

https://github.com/nextcloud/nextcloud-vue/tree/vue3

https://www.npmjs.com/package/@nextcloud/webpack-vue-config