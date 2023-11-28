# vue3 项目开发

## 1、项目框架

- vue3 + typescript 框架
- vue-router4 路由管理
- pinia 状态管理
- vite 构建
- naive-ui 组件库
- xicons 图标
- less css 预处理
- axios 请求库
- pnpm 包管理器

## 2、安装

（1）安装框架

`pnpm create vite my-vue-app -- --template vue-ts`

其他命令安装：

```
# npm 6.x
npm init vite@latest my-vue-app --template vue-ts

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue-ts

# yarn
yarn create vite my-vue-app --template vue-ts
```

（2）安装库

```
pnpm install

pnpm install vue-router pinia naive-ui axios @vicons/antd @vicons/ionicons5

pnpm install -D less
```

## 3、运行

`pnpm run dev`

## 4、修改 vite 配置

> vite.config.ts

```ts
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 8001,
  },
});
```

## 5、配置路由

### 5.1 修改 App.vue

> /src/app.vue

使用路由 `router-link` 和 `router-view` 组件

```html
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>
</template>
```

`router-link` 相当于 `<a>` 标签，进行跳转

`router-view` 是视图，用于装载即将跳转的页面

### 5.2 创建 views 目录，编写 vue 页面

在 src 目录下创建 views 目录

在 views 目录下创建 home.vue 和 about.vue

> /src/views/home.vue

```
<template>
  <div>Home</div>
</template>
```

> /src/views/about.vue

```
<template>
  <div>About</div>
</template>
```

### 5.3 配置路由

在 src 目录下创建 router 目录

在 router 目录下创建 index.ts

> /src/router/index.ts

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

在 main.ts 中导入 router 配置

> /src/main.ts

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

## 6、配置路径别名

（1）在 `vite.config.ts` 中增加配置

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: {
    host: true,
    port: 8001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

（2）安装 node 的类型声明文件

在 `vite.config.ts` 中配置@时使用到了 path，此时会报错，告诉你缺少 @types/node，需要再安装一下

`pnpm i --save-dev @types/node`

（3）修改 tsconfig.json，增加如下配置

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

（4）最后重启服务