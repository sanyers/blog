# oppo外包二面

## 1、vue angular react 差异

## 2、vue 性能问题

## 3、vue如何编写组件以及通讯方式

## 4、diff算法

## 5、模版编译变量如何匹配

## 6、vue-router 原理

## 7、vue-router 懒加载原理

官方：当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

一句话就是动态 import 代码分割 + jsonp

运行主程序 => 加载主包代码 => 点击懒加载模块 => 拼接对应模块的路径 => 动态插入 script 标签 => 执行 script 脚本，调用 webpackJsonpCallback 方法 => 将懒加载的模块注册到 `__webpack_modules__` => 调用模块

1、import() 方法

路由懒加载也可以叫做路由组件懒加载，最常用的是通过 `import()` 来实现它。

然后通过 Webpack 编译打包后，会把每个路由组件的代码分割成一一个 js 文件，初始化时不会加载这些 js 文件，只当激活路由组件才会去加载对应的 js 文件。

2、webpackChunkName

在 import 函数中配置 webpackChunkName，使编译打包后的 js 文件名字能和路由组件一一对应。

3、资源加载

资源加载先用 link 定义 Home.js、app.js、chunk-vendors.js 这些资源和 web 客户端的关系。

- `ref=preload`：告诉浏览器这个资源要给我提前加载。
- `rel=prefetch`：告诉浏览器这个资源空闲的时候给我加载一下。
- `as=script`：告诉浏览器这个资源是script，提升加载的优先级。

然后在 body 里面加载了 chunk-vendors.js、app.js 这两个 js 资源。可以看出web客户端初始化时候就加载了这个两个 js 资源。

4、打包后的资源

```js
// 组件包
(function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nnew Promise(function (resolve) {...}");

/***/ })

// webpackJsonp
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
/***/ "./src/a.js":(function(module, exports, __webpack_require__) {

"use strict";
eval('...');

/***/ })

}]);

// webpackJsonp
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
jsonpArray.push = webpackJsonpCallback;
```

5、参考

https://v3.router.vuejs.org/zh/guide/advanced/lazy-loading.html

https://juejin.cn/post/6844904013842874376

https://juejin.cn/post/6844904180285456398

https://juejin.cn/post/6924484965073862664

## 8、vuex几个模块以及使用场景

## 9、vue 中 key 的作用

## 10、vue3.0的使用以及和vue2.0的区别

## 11、const、let 的区别

## 12、后端一次性返回数据，列表不用分页，前端如何优化显示，虚拟列表是什么？

## 13、判断数据类型有哪几种方式，如何实现instanceof

## 14、event loop 是什么，事件怎么循环，宏任务和微任务是什么有哪些以及执行顺序？

## 15、有用过哪些ES6的技术？

## 16、什么是原型链，链是怎么形成的？

## 17、箭头函数与普通函数有什么区别？

## 18、函数的防抖和节流是什么，有什么区别，以及应用场景？

## 19、DOM事件对象target和currentTarget有什么区别？

## 20、css布局，页面分三块左边300宽度、中间不固定宽度、右边300宽度，如何布局以及有哪几种实现方式？

## 21、项目中遇到哪些难题以及如何解决？

## 22、如何优化 JS 中过多的使用 IF 语句？

六种替代 if 语句

- 三元运算符 `where ? 1 : 2`
- 短路运算符 `isAge && (age = 18)`
- 函数委托 `where ? fun1() : fun2()`
- 非分支策略 `list[where]()`
- 作为数据的函数
- 多态性

## 23、code review 怎么做？