# vue源码 - 全局API

深入理解以下全局 API 的实现原理。

- Vue.use 负责为 Vue 安装插件
- Vue.mixin 负责全局混入选项
- Vue.component 负责注册全局组件
- Vue.filter 负责在全局注册过滤器
- Vue.directive 负责在全局注册自定义指令
- Vue.extend 基于 Vue 去扩展子类
- Vue.set 为新 property 设置响应式
- Vue.delete 删除对象的 property
- Vue.nextTick 延迟回调函数的执行

全局 API 在 initGlobalAPI 方法中初始化，在 `/src/core/index.js` 中调用，而 index.js 在引入 vue.js 时导入。也就是说引入了 vue.js 时就初始化了全局 API

> /src/core/index.js

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

## 1、initGlobalAPI

> /src/core/global-api/index.js

```js
/**
 * 初始化 Vue 的众多全局 API，比如：
 *   默认配置：Vue.config
 *   工具方法：Vue.util.xxx
 *   Vue.set、Vue.delete、Vue.nextTick、Vue.observable
 *   Vue.options.components、Vue.options.directives、Vue.options.filters、Vue.options._base
 *   Vue.use、Vue.extend、Vue.mixin、Vue.component、Vue.directive、Vue.filter
 *   
 */
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  // Vue 的众多默认配置项
  configDef.get = () => config

  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }

  // Vue.config
  Object.defineProperty(Vue, 'config', configDef)

  /**
   * 暴露一些工具方法，轻易不要使用这些工具方法，处理你很清楚这些工具方法，以及知道使用的风险
   */
  Vue.util = {
    // 警告日志
    warn,
    // 扩展集成
    extend,
    // 合并选项
    mergeOptions,
    // 设置响应式
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 响应式方法
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  // Vue.options.compoents/directives/filter
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 将 Vue 构造函数挂载到 Vue.options._base 上
  Vue.options._base = Vue

  // 在 Vue.options.components 中添加内置组件，比如 keep-alive
  extend(Vue.options.components, builtInComponents)

  // Vue.use
  initUse(Vue)
  // Vue.mixin
  initMixin(Vue)
  // Vue.extend
  initExtend(Vue)
  // Vue.component/directive/filter
  initAssetRegisters(Vue)
}
```

## 2、Vue.set

```js
// /src/core/global-api/index.js
Vue.set = set
```

> /src/core/observer/index.js

```js
/**
 * 通过 Vue.set 或者 this.$set 方法给 target 的指定 key 设置值 val
 * 如果 target 是对象，并且 key 原本不存在，则为新 key 设置响应式，然后执行依赖通知
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 更新数组指定下标的元素，Vue.set(array, idx, val)，通过 splice 方法实现响应式更新
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 更新对象已有属性，Vue.set(obj, key, val)，执行更新即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // 不能向 Vue 实例或者 $data 添加动态添加响应式属性，vmCount 的用处之一，
  // this.$data 的 ob.vmCount = 1，表示根组件，其它子组件的 vm.vmCount 都是 0
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // target 不是响应式对象，新属性会被设置，但是不会做响应式处理
  if (!ob) {
    target[key] = val
    return val
  }
  // 给对象定义新属性，通过 defineReactive 方法设置响应式，并触发依赖更新
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

## 3、Vue.delete

```js
// /src/core/global-api/index.js
Vue.delete = del
```

> /src/core/observer/index.js

```js
/**
 * 通过 Vue.delete 或者 vm.$delete 删除 target 对象的指定 key
 * 数组通过 splice 方法实现，对象则通过 delete 运算符删除指定 key，并执行依赖通知
 */
export function del (target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }

  // target 为数组，则通过 splice 方法删除指定下标的元素
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__

  // 避免删除 Vue 实例的属性或者 $data 的数据
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  // 如果属性不存在直接结束
  if (!hasOwn(target, key)) {
    return
  }
  // 通过 delete 运算符删除对象的属性
  delete target[key]
  if (!ob) {
    return
  }
  // 执行依赖通知
  ob.dep.notify()
}
```

## 4、Vue.nextTick

```js
// /src/core/global-api/index.js
Vue.nextTick = nextTick
```

> /src/core/util/next-tick.js

关于 nextTick 方法更加详细解析，可以查看 [vue源码 - 异步更新以及nextTick原理](4-vue源码-%20异步更新以及nextTick原理.md)

## 5、Vue.use

> /src/core/global-api/use.js

```js
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  /**
   * 定义 Vue.use，负责为 Vue 安装插件，做了以下两件事：
   *   1、判断插件是否已经被安装，如果已安装则直接结束
   *   2、安装插件，执行插件的 install 方法
   * @param {*} plugin install 方法 或者 包含 install 方法的对象
   * @returns Vue 实例
   */
  Vue.use = function (plugin: Function | Object) {
    // 已经安装过的插件列表
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
     // 判断 plugin 是否已经安装，保证不重复安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 将 Vue 构造函数放到第一个参数位置，然后将这些参数传递给 install 方法
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // plugin.install 是一个 function，则执行其 install 方法安装插件
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { 
      // 执行直接 plugin 方法安装插件
      plugin.apply(null, args)
    }
    // 在 插件列表中 添加新安装的插件
    installedPlugins.push(plugin)
    return this
  }
}
```

## 6、Vue.mixin

> /src/core/global-api/mixin.js

```js
/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  /**
   * 定义 Vue.mixin，负责全局混入选项，影响之后所有创建的 Vue 实例，这些实例会合并全局混入的选项
   * @param {*} mixin Vue 配置对象
   * @returns 返回 Vue 实例
   */
  Vue.mixin = function (mixin: Object) {
    // 在 Vue 的默认配置项上合并 mixin 对象
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

关于 mergeOptions 方法更加详细解析，可以查看 [vue源码 - 初始化](2-vue源码%20-%20初始化.md)

## 7、Vue.extend

> /src/core/global-api/extend.js

```js
export function initExtend (Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  // 每个实例构造函数（包括Vue）都有一个唯一的 cid
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   * 基于 Vue 去扩展子类，该子类同样支持进一步的扩展
   * 扩展时可以传递一些默认配置，就像 Vue 也会有一些默认配置
   * 默认配置如果和基类有冲突则会进行选项合并（mergeOptions)
   */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    // 利用缓存，如果存在则直接返回缓存中的构造函数
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    // 定义 Sub 构造函数，和 Vue 构造函数一样
    const Sub = function VueComponent (options) {
      this._init(options)
    }

    // 通过原型继承的方式继承 Vue
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    // 选项合并，合并 Vue 的配置项到 自己的配置项上来
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    // 记录自己的基类
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      // 初始化 props
      initProps(Sub)
    }
    if (Sub.options.computed) {
      // 初始化 computed
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    // 定义 extend、mixin、use 这三个静态方法，允许在 Sub 基础上再进一步构造子类
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    // 定义 component、filter、directive 三个静态方法
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    // 递归组件的原理，如果组件设置了 name 属性，则将自己注册到自己的 components 选项中
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    // 在扩展时保留对基类选项的引用。
    // 稍后在实例化时，我们可以检查 Super 的选项是否具有更新
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    // 缓存
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

function initProps (Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed (Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
```

## 8、Vue.component、Vue.filter、Vue.directive

这三个 API 实现比较特殊，但是原理又很相似，所以就放在了一起实现。

> /src/core/global-api/assets.js

```js
/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   * 定义 Vue.component、Vue.filter、Vue.directive 这三个方法
   * 这三个方法所做的事情是类似的，就是在 this.options.xx 上存放对应的配置
   * 比如 Vue.component(compName, {xx}) 结果是 this.options.components.compName = 组件构造函数
   * ASSET_TYPES = ['component', 'directive', 'filter']
   */
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // 如果组件配置中存在 name，则使用，否则直接使用 id
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```

## 9、总结

1. Vue.use(plugin) 做了什么？

负责安装 plugin 插件，其实就是执行插件提供的 install 方法。

- 首先判断该插件是否已经安装过
- 如果没有，则执行插件提供的 install 方法安装插件，具体做什么有插件自己决定

2. Vue.mixin(options) 做了什么？

负责在 Vue 的全局配置上合并 options 配置。然后在每个组件生成 vnode 时会将全局配置合并到组件自身的配置上来。

- 标准化 options 对象上的 props、inject、directive 选项的格式
- 处理 options 上的 extends 和 mixins，分别将他们合并到全局配置上
- 然后将 options 配置和全局配置进行合并，选项冲突时 options 配置会覆盖全局配置

3. Vue.component(compName, Comp) 做了什么？

负责注册全局组件。其实就是将组件配置注册到全局配置的 components 选项上（options.components），然后各个子组件在生成 vnode 时会将全局的 components 选项合并到局部的 components 配置项上。

- 如果第二个参数为空，则表示获取 compName 的组件构造函数
- 如果 Comp 是组件配置对象，则使用 Vue.extend 方法得到组件构造函数，否则直接进行下一步
- 在全局配置上设置组件信息，`this.options.components.compName = CompConstructor`

4. Vue.directive('my-directive', {xx}) 做了什么？

在全局注册 my-directive 指令，然后每个子组件在生成 vnode 时会将全局的 directives 选项合并到局部的 directives 选项中。原理同 Vue.component 方法：

- 如果第二个参数为空，则获取指定指令的配置对象
- 如果不为空，如果第二个参数是一个函数的话，则生成配置对象 { bind: 第二个参数, update: 第二个参数 }
- 然后将指令配置对象设置到全局配置上，`this.options.directives['my-directive'] = {xx}`

5. Vue.filter('my-filter', function(val) {xx}) 做了什么？

负责在全局注册过滤器 my-filter，然后每个子组件在生成 vnode 时会将全局的 filters 选项合并到局部的 filters 选项中。原理是：

- 如果没有提供第二个参数，则获取 my-filter 过滤器的回调函数
- 如果提供了第二个参数，则是设置 `this.options.filters['my-filter'] = function(val) {xx}`。

6. Vue.extend(options) 做了什么？

Vue.extend 基于 Vue 创建一个子类，参数 options 会作为该子类的默认全局配置，就像 Vue 的默认全局配置一样。所以通过 Vue.extend 扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用。

- 定义子类构造函数，这里和 Vue 一样，也是调用 _init(options)
- 合并 Vue 的配置和 options，如果选项冲突，则 options 的选项会覆盖 Vue 的配置项
- 给子类定义全局 API，值为 Vue 的全局 API，比如 Sub.extend = Super.extend，这样子类同样可以扩展出其它子类
- 返回子类 Sub

7. Vue.set(target, key, val) 做了什么？

由于 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')，所以通过 Vue.set 为向响应式对象中添加一个 property，可以确保这个新 property 同样是响应式的，且触发视图更新

- 更新数组指定下标的元素：Vue.set(array, idx, val)，内部通过 splice 方法实现响应式更新
- 更新对象已有属性：Vue.set(obj, key ,val)，直接更新即可 => `obj[key] = val`
- 不能向 Vue 实例或者 $data 动态添加根级别的响应式数据
- Vue.set(obj, key, val)，如果 obj 不是响应式对象，会执行 `obj[key] = val`，但是不会做响应式处理
- Vue.set(obj, key, val)，为响应式对象 obj 增加一个新的 key，则通过 defineReactive 方法设置响应式，并触发依赖更新

8. Vue.delete(target, key) 做了什么？

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。当然同样不能删除根级别的响应式属性。

- Vue.delete(array, idx)，删除指定下标的元素，内部是通过 splice 方法实现的
- 删除响应式对象上的某个属性：Vue.delete(obj, key)，内部是执行 `delete obj.key`，然后执行依赖更新即可

9. Vue.nextTick(cb) 做了什么？

Vue.nextTick(cb) 方法的作用是延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的 DOM 数据：

```js
this.key = 'new val'

Vue.nextTick(function() {
  // DOM 更新了
})
```

其内部的执行过程是：

- this.key = 'new val，触发依赖通知更新，将负责更新的 watcher 放入 watcher 队列
- 将刷新 watcher 队列的函数放到 callbacks 数组中
- 在浏览器的异步任务队列中放入一个刷新 callbacks 数组的函数
- Vue.nextTick(cb) 来插队，将 cb 函数放入 callbacks 数组
- 待将来的某个时刻执行刷新 callbacks 数组的函数
- 然后执行 callbacks 数组中的众多函数，触发 watcher.run 的执行，更新 DOM
- 由于 cb 函数是在后面放到 callbacks 数组，所以这就保证了先完成的 DOM 更新，再执行 cb 函数

## 10、参考

https://juejin.cn/post/6952643167715852319