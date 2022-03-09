# vue-router 原理

## 1、前端路由

在 Web 前端单页应用 SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关
系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

vue-router 是 Vue.js 官方的路由插件，它和 vue.js 是深度集成的，适合用于构建单页面应用。

那与传统的页面跳转有什么区别呢？

- vue 的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。
- 传统的页面应用，是用一些超链接来实现页面切换和跳转的。

在 vue-router 单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质就是**建立起 url 和页面之间的映射关系**。

## 2、包含的功能

Vue Router 包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

## 3、vue-router 实现原理

在 vue-router 中，可以通过三种方式来实现前端路由的变化，分别为 hash、history 和 abstract。

### 3.1 hash

hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，最重要的是改变 URL 中的 hash 部分不会引起页面刷新。

我们可以通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

- 通过浏览器前进后退改变 URL
- 通过`<a>`标签改变 URL
- 通过`window.location`改变 URL

我们通过下面的例子，来看下 hash 实现路由的原理：

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <ul>
      <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>

        <!-- 渲染路由对应的 UI -->
        <div id="routeView"></div>
      </ul>
    </ul>
  </body>
  <script>
    let routerView = document.getElementById('routeView');
    window.addEventListener('hashchange', () => {
      routerView.innerHTML = location.hash;
    });
    window.addEventListener('DOMContentLoaded', () => {
      if (!location.hash) {
        //如果不存在hash值，那么重定向到#/
        location.hash = '/';
      } else {
        //如果存在hash值，那就渲染对应UI
        routerView.innerHTML = location.hash;
      }
    });
  </script>
</html>
```

上面的代码很简单，只要注意一下几点：

- 我们通过 a 标签的 href 属性来改变 URL 的 hash 值。当然，触发浏览器的前进后退按钮也可以，或者在控制台输入 window.location 赋值来改变 hash 都是可以的。也都会触发 hashchange。
- 我们监听 hashchange 事件。一旦事件触发，就改变 routerView 的内容，若是在 vue 中，这改变的应当是 router-view 这个组件的内容。
- 为何又监听了 load 事件？这时因为页面第一次加载完不会触发 hashchange，因而用 load 事件来监听 hash 值，再将视图渲染成对应的内容。

### 3.2 history

由于 html5 标准的发布，history 的 api 增加了两个 API。pushState 和 replaceState。通过这两个 API 可以改变 url 地址且不会发送请求。同时还有 popstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。

用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

我们主要说几个注意点：

- 通过 pushState/replaceState 或`<a>`标签改变 URL 不会触发页面刷新，也不会触发 popstate 方法。所以我们可以拦截 pushState/replaceState 的调用和`<a>`标签的点击事件来检测 URL 变化，从而触发 router-view 的视图更新。
- 通过浏览器前进后退改变 URL ，或者通过 js 调用 history 的 back，go，forward 方法，都会触发 popstate 事件，所以我们可以监听 popstate 来触发 router-view 的视图更新。

所以，我们其实是需要监听 popstate 以及拦截 pushState/placeState 以及 a 的点击去实现监听 URL 的变化。

我们通过下面的例子，来看下 history 实现路由的原理：

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <ul>
      <ul>
        <li><a href="/home">home</a></li>
        <li><a href="/about">about</a></li>

        <div id="routeView"></div>
      </ul>
    </ul>
  </body>
  <script>
    let routerView = document.getElementById('routeView');
    window.addEventListener('DOMContentLoaded', () => {
      routerView.innerHTML = location.pathname;
      var linkList = document.querySelectorAll('a[href]');
      linkList.forEach(el =>
        el.addEventListener('click', function(e) {
          e.preventDefault();
          history.pushState(null, '', el.getAttribute('href'));
          routerView.innerHTML = location.pathname;
        }),
      );
    });
    window.addEventListener('popstate', () => {
      routerView.innerHTML = location.pathname;
    });
  </script>
</html>
```

注意一下几个重点：

- 我们监听 popState 事件。一旦事件触发（例如触发浏览器的前进后端按钮，或者在控制台输入 history，go，back，forward 赋值），就改变 routerView 的内容。
- 我们通过 a 标签的 href 属性来改变 URL 的 path 值。这里需要注意的就是，当改变 path 值时，默认会触发页面的跳转，所以需要拦截 `<a>` 标签点击事件的默认行为，这样就阻止了 a 标签自动跳转的行为， 点击时使用 pushState 修改 URL 并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。

### 3.3 abstract

abstract 是 vue 路由中的第三种模式，支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 4、使用 vue-router

首先，我们当然是通过 vue-cli 去创建一个脚手架，这一步比较简单，就直接省略了。然后，我们修改

App.vue：

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
```

router/index.js

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
Vue.use(VueRouter);
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
```

至于 home 组件和 about 组件，就是非常简单的一句话，就不放出来了。

到这里最基本的使用 vue-router 就完成了。

再将 VueRouter 引入改成我们的 myVueRouter.js

```js
import VueRouter from './myVueRouter'; //修改代码
```

## 5、剖析 VueRouter 本质

我们在仔细看看 vue 是如何引入 vue-router 的。

1. 首先，我们通过 `import VueRouter from 'vue-router'` 引入 vue-router。
2. 然后，通过 `Vue.use(VueRouter)` 去触发了 vue-router 中的 install 方法。
3. 最后，`const router = new VueRouter({...})`, 再把 router 作为参数的一个属性值，`new Vue({router})`。

我们看看这三步，特别是最后一步我们是 new 出来的一个 vue-router 的实例，所以，我们可以预见，VueRouter 应该是一个类。所以我们这样写：

```js
class VueRouter {}
```

然后通过 Vue.use() 我们知道，VueRouter 应该有个 install 方法，并且第一个参数应该是 Vue 实例。有关 Vue.use()详情，请参阅 [Vue.use()](7-vue源码%20-%20全局API.md#_5、vue-use)

```js
let Vue = null;
class VueRouter {}
VueRouter.install = v => {
  Vue = v;
};
// 然后导出
export default VueRouter;
```

### 5.1 加载组件

vue-router 还自带了两个组件，分别是 router-link 和 router-view

（1）router-link

组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签

使用 router-link 理由如下：

- 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
- 在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。
- 当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径) 了。

（2）router-view

组件是一个 functional 组件，渲染路径匹配到的视图组件。还可以内嵌自己，根据嵌套路径，渲染嵌套组件。

（3）加载 router-link 和 router-view：

```js
let Vue = null;
class VueRouter {}
VueRouter.install = v => {
  Vue = v;
  // 新增代码
  Vue.component('router-link', {
    render(h) {
      return h('a', {}, 'home');
    },
  });
  Vue.component('router-view', {
    render(h) {
      return h('div', {}, 'home视图');
    },
  });
};
export default VueRouter;
```

这个时候，我们的脚手架应该可以跑起来了，并且显示 home 视图。

### 5.2 加载 $router

Vue.install 中除了加载 router-link 和 router-view 这两个组件以外，还有很重要的一个功能。那就是加载 $router 和 $route。

$route 和 $router 有什么区别？

$router 是 VueRouter 的实例对象，$route 是当前路由对象，也就是说 $route 是 $router 的一个属性。

其实 $router 中有一个 history 属性，它代表了 hashHistory 还是 HTML5history 实例对象，然后这个对象里面有个 current 属性，这个属性对象就是 $route。

通过 main.js 中的 `new Vue({router})`，我们可以把 router 实例（也就是刚刚 new 出来的）挂载到根组件的 $options 中。可是我们发现，我们在每个实例组件，都可以通过 this.$router 访问到 router 实例。而这个，就是在 install 中实现的。

```js
// myVueRouter.js
let Vue = null;
class VueRouter {}

VueRouter.install = function(v) {
  Vue = v;
  // 新增代码
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 如果是根组件
        this._root = this; //把当前实例挂载到_root上
        this._router = this.$options.router;
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }
      // 定义 $router
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router;
        },
      });
    },
  });

  Vue.component('router-link', {
    render(h) {
      return h('a', {}, '首页');
    },
  });
  Vue.component('router-view', {
    render(h) {
      return h('h1', {}, '首页视图');
    },
  });
};
```

解释一下上面的代码：

1. 首先，mixin 的作用是将 mixin 的内容混合到 Vue 的初始参数 options 中。
2. 为什么是 beforeCreate 而不是 created 呢？因为如果是在 created 操作的话，\$options 已经初始化好了。
3. 在 beforeCreate 中，我们判断如果是根组件，我们将传入的实例和 router 分别绑定到 \_root 和 \_router 上。
4. 如果是子组件，我们就去递归读取到根组件，绑定到 \_root 上。
5. 我们为 vue 的原型对象，定义 \$router，然后返回值是 \_root（根组件）的 \_router。

那么，我们还有一个问题，为什么判断当前组件是子组件，就可以直接从父组件拿到 \_root 根组件呢？

这就需要我们了解父子组件的渲染顺寻了，其实很简单，直接列出来了：

```
父 beforeCreate -> 父 created -> 父 beforeMounte ->
子 beforeCreate -> 子 create -> 子 beforeMount ->子 mounted ->
父 mounted
```

可以看到，在执行子组件的 beforeCreate 的时候，父组件已经执行完 beforeCreate 了，那理所当然父组件已经有 \_root 了。

### 5.3 完善构造器

首先，我们看看，我们在 new VueRouter 的时候，传入了什么参数：

```js
const router = new VueRouter({
  mode: 'history',
  routes,
});
```

可以看到，暂时传入了两个，一个是 mode，还有一个是 routes 数组。因此，我们可以这样实现构造器。

```js
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || []; // 你传递的这个路由是一个数组表
  }
}
```

由于直接处理数组比较不方便，所以我们做一次转换，采用 path 为 key，component 为 value 的方式。

```js
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    // 新增代码
    this.routesMap = this.changeMap(this.routes);
  }
  // 新增代码
  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
```

接下来，我们还需要在 vue-router 的实例中保存当前路径（在包含一些例如 params 信息，其实就是 \$route），所以我们为了方便管理，使用一个对象来表示：

```js
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    this.routesMap = this.changeMap(this.routes);
    // 新增代码
    this.history = new HistoryRoute();
  }
  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
```

这个时候，我们的 history 对象中，就保存了关于当前路径的属性 current。

只是，我们这个时候的 current 还是 null，所以，我们需要做初始化操作。

在初始化的时候，我们需要判断当前是什么模式，然后将当前路径保存到 current 中。

```js
//myVueRouter.js
let Vue = null;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    // 新增代码;
    this.init();
  }
  // 新增代码;
  init() {
    if (this.mode === 'hash') {
      // 先判断用户打开时有没有 hash 值，没有的话跳转到 #/
      location.hash ? '' : (location.hash = '/');
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? '' : (location.pathname = '/');
      window.addEventListener('load', () => {
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname;
      });
    }
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
```

### 5.4 完善 $route

现在，我们已经在构造器中根据不同模式，将路径赋值给 history 的 current，那么，我们现在就可以给 $route 赋值了，当然 this.$route 也就是 current。

```js
VueRouter.install = function(v) {
  Vue = v;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 如果是根组件
        this._root = this; //把当前实例挂载到_root上
        this._router = this.$options.router;
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router;
        },
      });
      // 新增代码;
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });
  Vue.component('router-link', {
    render(h) {
      return h('a', {}, '首页');
    },
  });
  Vue.component('router-view', {
    render(h) {
      return h('h1', {}, '首页视图');
    },
  });
};
```

代码极其简单，就是在 vue 的原型链上再次定义了一个 \$route，指向 current 即可。

### 5.5 完善 router-view

我们已经通过 current 保存到了当前的路径，那么我们现在就可以根据当前的路径，拿到对应的 component，然后，将这个 component 渲染出来就好了。

```js
Vue.component('router-view', {
  render(h) {
    // 新增代码
    let current = this._self._root._router.history.current;
    let routeMap = this._self._root._router.routesMap;
    return h(routeMap[current]);
  },
});
```

但是这个时候，我们页面是渲染不出来的，原因在于，current 并不是响应式的，我们拿到的 current 是最初的，也就是 null。所以，我们需要把 current 变成响应式，只要路径变化，我们的 router-view 就必须跟着变化。

我们需要用到 Vue 中的一个工具方法，这个方法很简单，就是把变量变成响应式。那么在什么时候去把 current 变成响应式呢，其实很多地方都可以，例如在第一次定义 history 的时候，或者在根组件渲染出来 \$router 的时候，我们就在第一次定义 history 的时候去改变。

```js
constructor(options) {
 this.mode = options.mode || 'hash';
 this.routes = options.routes || [];
 this.routesMap = this.changeMap(this.routes);
 // this.history = new HistoryRoute();
 // 新增代码
 // 将history变成响应式的数据
 Vue.util.defineReactive(this,"history",new HistoryRoute());
 this.init();
 };
```

### 5.6 完善 router-link

首先，我们应该比较清楚 router-link 的使用。

```js
<router-link to="/home">Home</router-link>
<router-link to="/about">About</router-link>
```

很显然，父组件间 to 这个路径传进去，子组件接收。所以我们实现代码如下：

```js
Vue.component('router-link', {
  props: {
    to: String,
  },
  render(h) {
    // 新增代码
    let mode = this._self._root._router.mode;
    let to = mode === 'hash' ? '#' + this.to : this.to;
    return h('a', { attrs: { href: to } }, this.$slots.default);
  },
});
```

这个时候，我们把 router-link 渲染成了 a 标签，到这里，你们脚手架应该点击 router-link 就能切换相应的组件了。

```js
Vue.mixin({
  beforeCreate() {
    if (this.$options && this.$options.router) {
      // 如果是根组件
      this._root = this; //把当前实例挂载到_root上
      this._router = this.$options.router;
      // 新增代码
      // 拦截 router-link
      this._router.mode === 'history' &&
        document.addEventListener('click', e => {
          if (e.target.className === 'router-link-to') {
            // 阻止默认跳转事件;
            e.preventDefault();
            // 手动改变url路径
            history.pushState(null, '', e.target.getAttribute('href'));
            // 为current赋值url路径
            this._router.history.current = location.pathname;
          }
        });
    } else {
      //如果是子组件
      this._root = this.$parent && this.$parent._root;
    }
  },
});
```

上面代码拦截比较简单，解释一下：

1. 判断如果是 router-link 的 a 标签，并且是 history 模式，那么就阻止默认跳转事件。
2. 通过 history.pushState 方法去手动的改变 url 的路径，这个方法改变 url 不会刷新页面，这个很重要。
3. 当然这样改变 url 也不会触发 popstate 方法，所以我们手动给 current 赋值。
4. 因为我们的 history 已经是动态响应的了，所以很自然，这个时候 router-view 里面的组件也就更新了。

到此，我们对于 vue-router 的实现基本完成了，附上全部的 vue-router 的代码：

```js
//myVueRouter.js
let Vue = null;

class HistoryRoute {
  constructor() {
    this.current = null;
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    this.routesMap = this.createMap(this.routes);
    // this.history = new HistoryRoute();
    Vue.util.defineReactive(this, "history", new HistoryRoute());
    this.init();
  }
  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
  init() {
    if (this.mode === "hash") {
      // 先判断用户打开时有没有 hash 值，没有的话跳转到 #/
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        this.history.current = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });
    }
  }
}

VueRouter.install = (v) => {
  Vue = v;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this._root = this;
        this._router = this.$options.router;
        this._router.mode === "history" &&
          document.addEventListener("click", (e) => {
            if (e.target.className === "router-link-to") {
              // 阻止默认跳转事件;
              e.preventDefault();
              // 手动改变url路径
              history.pushState(null, "", e.target.getAttribute("href"));
              // 为current赋值url路径
              this._router.history.current = location.pathname;
            }
          });
      } else {
        this._root = this.$parent && this.$parent._root;
      }
      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        },
      });

      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });
  Vue.component("router-link", {
    props: {
      to: String,
    },
    render(h) {
      let mode = this._self._root._router.mode;
      let to = mode === "hash" ? "#" + this.to : this.to;
      return h(
        "a",
        { attrs: { href: to }, class: "router-link-to" },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      return h(routeMap[current]);
    },
  });
};

export default VueRouter;
```

## 6、总结

<a data-fancybox title="流程图" href="/blog/img/web/js/page_25.png"><img :src="$withBase('/img/web/js/page_25.png')" alt="流程图"></a>

1. 在 main.js 中导入，使用 Vue.use() 方法注册组件，然后就会调用 install() 方法，并构造一个 VueRouter 实例导出。

2. 在 install() 方法中：

- 注册了两个子组件：router-link 和 router-view；
- 调用 Vue.mixin() 方法混入 beforeCreate() 方法，然后判断是否为根组件，如果是则挂载 this 到 this._root 上并且挂 _router，否则将根组件挂载到子组件的 _root 上；
- 调用 Object.defineProperty 将 $router 和 $route 绑定到 Vue.prototype 上，`$router = this._root._router`，`$route = this._root._router.history.current`。

3. 在 VueRouter 实例中：

- 进入 constructor(options) 实例化并传入 options 参数，得到 this.mode 和 this.routes，再将 this.routes 数组进行 map 化处理；
- 然后调用 Vue.util.defineReactive 将 this.history 变成响应式，其值为 HistoryRoute 的实例，实例中定义了一个 this.current 变量；
- 再然后调用 init() 方法进行初始化，判断 this.mode 等于 hash 则监听 load 和 hashChange 事件，得到 location.hash 并赋值给 current，否则判断 this.mode 等于 history 则监听 load 和 popstate 事件，得到 loaction.pathname 并赋值给 current。

## 7、参考

https://juejin.cn/post/6854573222231605256

https://juejin.cn/post/6844903665388486664

https://juejin.cn/post/6844903961745440775