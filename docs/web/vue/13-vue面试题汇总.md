# vue面试题汇总

有关 vue 面试题，持续更新中...

## 1、vue 的生命周期钩子

重点：beforeCreate => created => beforeMount => mounted => beforeUpdate => updated => beforeDestory => destoryed

- beforeCreate

1. 初始化了部分参数（调用 initInternalComponent），如果有相同的参数，做了参数合并（调用 mergeOptions）
2. 初始化组件实例关系属性，比如 $parent、$children、$root、$refs、$router、$store 等（调用 initLifecycle)
3. 初始化自定义事件(调用 initEvents)
4. 解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数（调用 initRender）
5. 执行 beforeCreate钩子

- created

1. 初始化组件的 inject 配置项(调用 initInjections)
2. 数据响应式的重点，处理 props、methods、data、computed、watch(调用 initState)
3. 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上(调用 initProvide)
4. 执行 created 钩子

- beforeMount

检查是否存在 el 属性，存在的话进行渲染 dom 操作，执行 beforeMount (这个里面基本没什么操作)

- mounted

实例化 Watcher ，渲染 dom，执行 mounted

- beforeUpdate

在渲染 dom 后，执行了 mounted 钩子后，在数据更新的时候，执行 beforeUpdate

- updated

检查当前的 watcher 列表中，是否存在当前要更新数据的 watcher ，如果存在就执行 updated

- beforeDestroy

检查是否已经被卸载，如果已经被卸载，就直接 return 出去，否则执行 beforeDestroy

- destroyed

把所有有关自己痕迹的地方，都给删除掉

- activated 

keep-alive 专属，组件被激活时调用

- deactivated 

keep-alive 专属，组件被销毁时调用

## 2、组件中 data 为什么是一个函数

重点：可复用组件 data 是一个函数，每次使用 data 都将返回一个对象的独立的拷贝，组件之间互不影响

为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

- 因为组件是用来复用的，且 JS 里对象是**引用类型**
- 如果组件中 data 是一个对象，这样作用域就没有隔离，子组件中的 data 属性值会相互影响
- 如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响
- 而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果

## 3、MVC 和 MVVM 的区别

MVC

MVC 全名是 Model View Controller，是模型(Model) - 视图(View) - 控制器(controller) 的缩写，是一种软件设计典范

- Model 模型：用于处理数据逻辑的部分，模型对象通常负责在数据库中存取数据
- View 视图：用于处理数据显示的部分，视图通常是依据模型数据建立的
- Controller 控制器：用户处理用户交互的部分，控制器通常负责从视图读取数据，控制用户输入，并向模型发送数据

MVC 的思想：一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来。

MVVM

MVVM 新增了 VM 类

- ViewModel 层：主要实现了数据的双向绑定，模型 - 视图，视图 - 模型的转换。

MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）

## 4、Vue 组件通讯有哪几种方式

1. props 和 $emit()，父组件使用 props 向子组件传递数据，子组件使用 $emit() 触发事件向父组件(使用v-on监听事件)传递数据。
2. $parent 和 $childen，获取当前组件的父组件和子组件。
3. $attrs 和 $listeners，A -> B -> C -> D，主要解决组件跨级通讯的问题。$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)，可以通过 v-bind="$attrs" 传入内部组件。$listeners 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器，它可以通过 v-on="$listeners" 传入内部组件。子组件设置 inheritAttrs 属性为 false 将使 $attrs 不显性的绑定到元素上。
4. ref 和 $refs 使用 ref 给组件设置名称，使用 $refs 获取组件实例。
5. provide 和 inject，父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)。
6. eventBus，事件总线，所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件。导出一个 new Vue() 实例，使用 $on 注册事件和 $emit 触发事件。
7. vuex 状态管理。
8. localStorage 和 sessionStorage，本地存储。
9. .aync 和 props，使用 `:page.sync="page"`向子组件传递数据，子组件使用 `props:["page"]` 接收数据，可实现数据的双向绑定。
10. v-model 和 props，使用 `v-model="value"` 向子组件传递数据，子组件使用 `props:["value"]` 接收数据，可实现数据的双向绑定。
11. $root，可以拿到 App.vue 里的数据和方法
12. slot，就是把子组件的数据通过插槽的方式传给父组件使用，然后再插回来。

## 5、v-if 和 v-show 的区别

- `v-if` 在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。
- `v-show` 会被编译成指令，条件不满足时控制样式将对应节点隐藏 （display:none）

使用场景

- `v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景
- `v-show` 适用于需要非常频繁切换条件的场景

扩展补充：display:none、visibility:hidden 和 opacity:0 之间的区别？

三者共同点都是隐藏。不同点：

| 属性 | 占据空间 | 元素继承 | 事件绑定 | 过渡动画 |
| :----: | :----: | :----: | :----: | :----: |
| display:none | 不占据位置 | 不会被子元素继承 | 不会触发事件 | transition 动画无效 |
| visibility:hidden | 占据位置 | 会继承，通过设置子元素 visibility:visible 来显示子元素 | 不会触发事件 | transition 动画无效 |
| opacity:0 | 占据位置 | 会继承，但不能设置子元素 opacity:0 来重新显示 | 会触发事件 | transition 动画有效 |

## 6、说说 vue 内置指令

- `v-text` 更新元素的 textContent。
- `v-html` 更新元素的 innerHTML，注意 XSS 攻击。
- `v-show` 根据表达式之真假值，切换元素的 display 值。
- `v-if/v-else-if/v-else` 根据表达式的值的 truthiness 来有条件地渲染元素。当和 v-if 一起使用时，v-for 的优先级比 v-if 更高。
- `v-for` 基于源数据多次渲染元素或模板块，注意增加唯一 key 值。
- `v-on` 缩写`@`，绑定事件监听器，在普通元素上只能监听原生 DOM 事件，在自定义组件上可以监听子组件的自定义事件。
- `v-bind` 缩写`:`，动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。
- `v-model` 在表单控件或者组件上创建双向绑定。
- `v-slot` 缩写`#`，提供具名插槽或需要接收 prop 的插槽。
- `v-pre` 跳过这个元素和它的子元素的编译过程，以此来加快整个项目的编译速度。
- `v-cloak` 这个指令保持在元素上直到关联实例结束编译，解决初始化慢导致闪动的最佳实践。
- `v-once` 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## 7、怎样理解 Vue 的单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。

这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

## 8、computed 和 watch 的区别和运用的场景

computed 和 watch 都是基于 watcher 来实现的

computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容，它可以设置 getter 和 setter。

watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

## 9、v-if 与 v-for 为什么不建议一起使用

v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。

## 10、Class 与 Style 如何动态绑定？

- 对象语法：

```html
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<script>
  data() {
    return {
      isActive: true,
      hasError: false,
      activeColor: 'red',
      fontSize: 30
    }
  }
</script>
```

- 数组语法：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:style="[styleColor, styleSize]"></div>
<script>
  data() {
    return {
       activeClass: 'active',
       errorClass: 'text-danger',
       styleColor: {
        color: 'red'
      },
      styleSize:{
        fontSize:'23px'
      }
    }
  }
</script>
```

## 11、Vue 响应式数据的原理

vue2.0：

整体思路是数据劫持+观察者模式

数组和对象类型的值变化的时候，通过 defineReactive 内部方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性，getter，setter）。当页面使用对应属性时，每个属性在 getter 时调用 dep.depend 收集依赖，setter 调用 dep.nottify 通知更新，Dep.nottify 调用 watcher.update 方法去更新，然后就进入了异步更新阶段

数组考虑性能原因没有用 defineProperty 对数组的每一项进行拦截，而是选择对 7 种数组（push,shift,pop,splice,unshift,sort,reverse）方法进行重写(AOP 切片思想)

所以在 Vue 中修改数组的索引和长度是无法监控到的。需要通过以上 7 种变异方法修改数组才会触发数组对应的 watcher 进行更新

vue3.0：

Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化

## 12、Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程：
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程 :

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程 :

父 beforeUpdate -> 父 updated

- 销毁过程 :

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 13、说说你对 SPA 单页面的理解，它的优缺点分别是什么？

SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

- 优点：
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  - 基于上面一点，SPA 相对对服务器压力小；
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
- 缺点：
  - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

## 14、Vue 的全局 API 有哪些？

1. Vue.set

由于 Vue 无法探测普通对象的新增 property 属性，所以通过 Vue.set 为向响应式对象中添加一个 property 属性，可以确保这个新 property 同样是响应式的，且触发视图更新。如果数组则使用 splice 方法更新

2. Vue.delete

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。当然同样不能删除根级别的响应式属性。如果数组则使用 splice 方法更新

3. Vue.nextTick

延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的 DOM 数据。

其内部调用 timerFunc 方法，优先使用微任务，然后宏任务，Promise => MutationObserver => setImmediate => setTimeout，其意愿总是尽快执行

4. Vue.use

负责为 Vue 安装插件，做了以下两件事：

- 判断插件是否已经被安装，如果已安装则直接结束
- 安装插件，执行插件的 install 方法

5. Vue.mixin

负责全局混入选项，影响之后所有创建的 Vue 实例，其作用是抽离公共的业务逻辑，当组件初始化的时候，会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。如果混入的数据和本身组件的数据有冲突，采用本身的数据为准。

缺点：命名冲突、数据来源不清晰

6. Vue.extend

基于 Vue 去扩展子类，该子类同样支持进一步的扩展

扩展时可以传递一些默认配置，就像 Vue 也会有一些默认配置，所以通过 Vue.extend 扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用

默认配置如果和基类有冲突则会进行选项合并（mergeOptions)

7. Vue.component

负责注册全局组件。其实就是将组件配置注册到全局配置的 components 选项上（options.components），然后各个子组件在生成 vnode 时会将全局的 components 选项合并到局部的 components 配置项上。

8. Vue.filter

负责在全局注册过滤器。然后每个子组件在生成 vnode 时会将全局的 filters 选项合并到局部的 filters 选项中。

9. Vue.directive

在全局注册自定义指令。然后每个子组件在生成 vnode 时会将全局的 directives 选项合并到局部的 directives 选项中。

## 15、写过自定义指令吗 原理是什么

指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

自定义指令有五个生命周期（也叫钩子函数），分别是 bind、inserted、update、componentUpdated、unbind

1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
3. update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
5. unbind：只调用一次，指令与元素解绑时调用。

原理：

1. 在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
2. 通过 genDirectives 生成指令代码
3. 在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子
4. 当执行指令对应钩子函数时，调用对应指令定义的方法

## 16、Vue 修饰符有哪些

事件修饰符

- .stop 阻止事件继续传播
- .prevent 阻止标签默认行为
- .capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
- .self 只当在 event.target 是当前元素自身时触发处理函数
- .once 事件将只会触发一次
- .passive 告诉浏览器你不想阻止事件的默认行为

v-model 的修饰符

- .lazy 通过这个修饰符，转变为在 change 事件再同步
- .number 自动将用户的输入值转化为数值类型
- .trim 自动过滤用户输入的首尾空格


键盘事件的修饰符

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

系统修饰键

- .ctrl
- .alt
- .shift
- .meta

鼠标按钮修饰符

- .left
- .right
- .middle

## 17、v-model 原理

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

## 18、Vue 事件绑定原理

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on 实现的。如果要在组件上使用原生事件，需要加.native 修饰符，这样就相当于在父组件中把子组件当做普通 html 标签，然后加上原生事件。

$on、$emit 是基于发布订阅模式的，维护一个事件中心，on 的时候将事件按名称存在事件中心里，称之为订阅者，然后 emit 将对应的事件进行发布，去执行事件中心里的对应的监听器

## 19、谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## 20、谈谈Vue的性能优化有哪些？

（1）代码层面的优化

- 数据层级不要过深，合理的设置响应式数据
- 使用数据时，缓存值的结果，不频繁取值
- v-for合理设置key
- v-show(频繁切换性能高)和v-if的合理使用
- 控制组件的粒度 -> Vue采用组件级别更新
- 采用函数式组件 -> 函数式组价开销低
- 采用异步组件 -> 借助webpack的分包策略
- 事件的销毁
- 图片和路由的懒加载
- 第三方插件的按需引入
- 使用keep-alive来缓存组件
- 虚拟滚动、时间分片等策略
- 服务端渲染 ssr 或者预渲染

（2）Webpack 打包的优化

- 图片压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 编译优化

（3）Web 技术的优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用

## vuex

### vuex的理解

### actions和mutations的区别

### 如何设计

### 页面刷新存储数据

### vuex的执行流程

### vuex的state和getters是如何映射到各个组件实例中响应更新状态的

### vuex中state数据变化时，视图更新原理

### modules的数据结构和设计结构

### getters的执行过程

### mutations的执行流程

### actions的执行流程

### actions中dispatch执行异步操作流程

## 原理

### 11.3 vue模板编译原理

### 11.4 生命周期钩子如何实现的

### 11.5 vue mixin使用场景和原理

### 11.6 vue nextTick使用场景和原理

### 11.7 为什么需要使用虚拟Dom

### 11.8 vue中diff算法的原理

### 11.9 vue set的方法实现原理，为什么$set能够进行数据实时更新

### 11.10 directive 的实现

### 11.11 vue中slot时如何实现的

### 11.12 keep-alive的原理

### 11.13 $refs是如何实现的

### 11.14 $attrs是为了解决什么问题出现的，应用场景有哪些？provide/inject不能解决这些问题么？

### 11.15 vue中的data为什么是个函数

### 11.16 v-show和v-if的区别

### 11.17 vue.use是干什么的，原理是什么

### 11.18 函数式组件的优势和原理

### 11.19 v-if和v-for的优先级

### 11.20 组件中的name属性有哪些作用

### 11.21 vue的修饰符

### 11.22 vue使用了哪些设计模式

### 11.23 vue中computed特点

### 11.24 vue的事件绑定原理

### 11.25 watch中deep的实现

### 11.26 v-html会导致什么问题

### 11.27 v-html会导致什么问题

### 11.28 v-model原理以及如何实现自定义v-model

### 11.29 组件渲染及更新过程

## 函数式组件

函数式组件是指用一个 Function 来渲染一个 vue 组件，这个组件只接受一些 prop，我们可以将这类组件标记为 functional，这意味着它无状态 (没有响应式数据)，也没有实例 (没有this上下文)。

一个函数式组件大概向下面这样：

```js
export default () => {
  functional: true,
  props: {
  // Props 是可选的
  },
  // 为了弥补缺少的实例, 提供第二个参数作为上下文
  render: function (createElement, context) {
    return vNode
  }
 }
```

render 函数的第二个参数 context 用来代替上下文 this 他是一个包含如下字段的对象：

- props：提供所有 prop 的对象
- children: VNode 子节点的数组
- slots: 一个函数，返回了包含所有插槽的对象
- scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- parent：对父组件的引用
- listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
- injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

函数式组件渲染开销低，因为函数式组件只是函数。

## vue 中模版编译原理

首先，vue 提供了两个构建版本：

- vue.js： 完整版本，包含了模板编译的能力；
- vue.runtime.js： 运行时版本，不提供模板编译能力，需要通过 vue-loader 进行提前编译。

模板编译主要是在 createCompiler 方法中实现，实现的最终结果是将 template 中的代码，转化为类似 render 函数的输出形式。

其中，主要包含三个步骤：

1. 模板编译，通过调用 parse 方法，将模板代码转化为 AST（抽象语法树），转化后的 AST 是一个树形结构的对象，其中包含 tag(标签名)，type(标签类型)，start(在 html 中的开始位置)，end(在 html 中的结束位置)，children(子节点)，attrsList(标签属性)，attrsMap(标签映射)等属性；

2. 通过调用 optimize 方法，主要是为了优化 AST，确保静态的数据不会进入虚拟 DOM 的更新阶段，以此来优化性能。简单来说，就是把所有静态节点的 static 属性设置为 true。

3. 通过调用 generate 方法，将 AST 转化为 render 方法。

转换成 render 以后，那么编译过程就结束了，接下来就是将 render 转换成虚拟 dom，然后生成 watcher，创建 updateComponent 等等。。。

也就是说，直接通过render的形式返回的，是不需要做模板编译的。