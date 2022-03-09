# vue源码 - 初始化

## 1、new Vue

> /src/core/instance/index.js

```js
import { initMixin } from './init'

// Vue 构造函数
function Vue (options) {
  // 调用 Vue.prototype._init 方法，该方法是在 initMixin 中定义的
  this._init(options)
}

// 定义 Vue.prototype._init 方法
initMixin(Vue)

export default Vue
```

## 2、Vue.prototype._init

> /src/core/instance/init.js

```js
/**
 * 定义 Vue.prototype._init 方法 
 * @param {*} Vue Vue 构造函数
 */
export function initMixin (Vue: Class<Component>) {
  // 负责 Vue 的初始化过程
  Vue.prototype._init = function (options?: Object) {
    // vue 实例
    const vm: Component = this
    // 每个 vue 实例都有一个 _uid，并且是依次递增的
    vm._uid = uid++

    // 避免被观察到的标志
    vm._isVue = true
    // 处理组件配置项
    if (options && options._isComponent) {
      /**
       * 每个子组件初始化时走这里，这里只做了一些性能优化
       * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
       */
      initInternalComponent(vm, options)
    } else {
      /**
       * 初始化根组件时走这里，合并 Vue 的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件会合并到 根实例的 components 选项中
       * 至于每个子组件的选项合并则发生在两个地方：
       *   1、Vue.component 方法注册的全局组件在注册时做了选项合并
       *   2、{ components: { xx } } 方式注册的局部组件在执行编译器生成的 render 函数时做了选项合并，包括根组件中的 components 配置
       */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 设置代理，将 vm 实例上的属性代理到 vm._renderProxy
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等
    initLifecycle(vm)
    /**
     * 初始化自定义事件，这里需要注意一点，所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件，
     * 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
     */
    initEvents(vm)
    // 解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数
    initRender(vm)
    // 调用 beforeCreate 钩子函数
    callHook(vm, 'beforeCreate')
    // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 vm 实例
    initInjections(vm) // resolve injections before data/props
    // 数据响应式的重点，处理 props、methods、data、computed、watch
    initState(vm)
    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
    initProvide(vm) // resolve provide after data/props
    // 调用 created 钩子函数
    callHook(vm, 'created')

    // 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
    if (vm.$options.el) {
      // 调用 $mount 方法，进入挂载阶段
      vm.$mount(vm.$options.el)
    }
  }
}
```

## 3、initInternalComponent

> /src/core/instance/init.js

```js
/**
 * 初始化内部组件参数
 * @param {*} vm 
 * @param {*} options 
 * @returns 
 */
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  // 1.指定 $options 原型
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  // 2.把组件依赖于父组件的 props、listeners 也挂载到 options 上，方便子组件调用。
  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```

## 4、resolveConstructorOptions

> /src/core/instance/init.js

```js
/**
 * 从组件构造函数中解析配置对象 options，并合并基类选项。返回类的构造函数上最新的 options 值
 * @param {*} Ctor 
 * @returns 
 */
export function resolveConstructorOptions (Ctor: Class<Component>) {
  // 配置项目
  let options = Ctor.options
  if (Ctor.super) {
    // 存在基类，递归解析基类构造函数的选项
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // 说明基类构造函数选项已经发生改变，需要重新设置
      Ctor.superOptions = superOptions
      // 检查 Ctor.options 上是否有任何后期修改/附加的选项（＃4976）
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // 如果存在被修改或增加的选项，则合并两个选项
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      // 选项合并，将合并结果赋值为 Ctor.options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}
```

## 5、mergeOptions

> /src/core/util/options.js

```js
/**
 * 合并两个选项，出现相同配置项时，子选项会覆盖父选项的配置。用于实例化和继承的核心实用程序。
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  // 在非删除环境下检查组件的名字是否符合规范
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  // 规范化 props、inject、directive 选项，方便后续程序的处理
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // 处理原始 child 对象上的 extends 和 mixins，分别执行 mergeOptions，将这些继承而来的选项合并到 parent
  // mergeOptions 处理过的对象会含有 _base 属性
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  // 最后执行合并操作
  const options = {}
  let key
  // 遍历 父选项
  for (key in parent) {
    mergeField(key)
  }

  // 遍历 子选项，如果父选项不存在该配置，则合并，否则跳过，因为父子拥有同一个属性的情况在上面处理父选项时已经处理过了，用的子选项的值
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  // 合并选项，childVal 优先级高于 parentVal
  function mergeField (key) {
    // strats = Object.create(null)
    const strat = strats[key] || defaultStrat
    // 值为如果 childVal 存在则优先使用 childVal，否则使用 parentVal
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

## 6、initProxy

> /src/core/instance/proxy.js

```js
// 判断当前环境中Proxy是否可用
const hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/)

// 当前环境是开发环境，则调用initProxy方法
initProxy = function initProxy (vm) {
  if (hasProxy) {
    // determine which proxy handler to use
    const options = vm.$options
    const handlers = options.render && options.render._withStripped
      ? getHandler
      : hasHandler
    vm._renderProxy = new Proxy(vm, handlers)
  } else {
    vm._renderProxy = vm
  }
}
```

如果Proxy属性存在，则把包装后的vm属性赋值给_renderProxy属性值。否则把vm是实例本身赋值给_renderProxy属性

## 7、initLifecycle

> /src/core/instance/lifecycle.js

```js
/**
 * 方法用来初始化一些生命周期相关的属性，以及为 $parent、$child、$root、$refs 等属性赋值
 * @param {*} vm 
 * @returns 
 */
export function initLifecycle (vm: Component) {
  // 把mergeOptions后的options赋值给options变量。
  const options = vm.$options

  // 定位第一个"非抽象"的父组件
  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  // 指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。
  vm.$parent = parent

  // 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
  vm.$root = parent ? parent.$root : vm

  // 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。
  vm.$children = []

  // 一个对象，持有已注册过 ref 的所有子组件。
  vm.$refs = {}

  // 组件实例相应的 watcher 实例对象。
  vm._watcher = null
  // 表示keep-alive中组件状态，如被激活，该值为false,反之为true。
  vm._inactive = null
  // 也是表示keep-alive中组件状态的属性。
  vm._directInactive = false
  // 当前实例是否完成挂载(对应生命周期图示中的mounted)。
  vm._isMounted = false
  // 当前实例是否已经被销毁(对应生命周期图示中的destroyed)。
  vm._isDestroyed = false
  // 当前实例是否正在被销毁,还没有销毁完成(介于生命周期图示中beforeDestroy和destroyed之间)。
  vm._isBeingDestroyed = false
}
```

## 8、initEvents

> /src/core/instance/events.js

```js
/**
 * 初始化事件处理
 * @param {*} vm 
 * @returns 
 */
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

/**
 * 更新组件事件监听
 * @param {*} vm 
 * @param {*} listeners 
 * @param {*} oldListeners 
 * @returns 
 */
export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

let target: any

// 添加事件
function add (event, fn) {
  target.$on(event, fn)
}

// 移除事件
function remove (event, fn) {
  target.$off(event, fn)
}

// 创建一次性事件
function createOnceHandler (event, fn) {
  const _target = target
  return function onceHandler () {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

/**
 * 事件方法 $on、$once、$off、$emit 挂载
 * @param {*} Vue
 * @returns 
 */
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  // 绑定事件
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  // 绑定一次性事件
  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

  // 关闭事件
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  // 触发事件
  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
```

## 9、initRender

> /src/core/instance/render.js

```js
/**
 * 初始化Render
 * @param {*} vm
 * @returns 
 */
export function initRender (vm: Component) {
  // _vnode 组件的真实节点，它的tag就是<template>标签下的第一个节点
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options

  // 获取父节点
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree 
  // 父组件的vm实例
  const renderContext = parentVnode && parentVnode.context
  // slot插槽
  vm.$slots = resolveSlots(options._renderChildren, renderContext)

  // 这里调用 emptyObject Object.freeze({}) 冻结只是当做一个空值，空对象与我们平常的null差不多
  vm.$scopedSlots = emptyObject

  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  // 将createElement函数绑定到该实例上，该vm存在闭包中，不可修改，vm实例则固定。这样我们就可以得到正确的上下文渲染
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  // 常规方法被用于公共版本，被用来作为用户界面的渲染方法
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    // 监听 $attrs 和 $listeners
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
```

## 10、callHook

> /src/core/instance/lifecycle.js

```js
/**
 * 回调钩子
 * @param {*} vm
 * @param {*} hook
 * @returns 
 */
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  // 调用生命周期挂钩时禁用dep收集
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      // 执行回调
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  // 挂钩结束可以dep收集
  popTarget()
}
```

## 11、initInjections

> /src/core/instance/inject.js

```js
/**
 * 初始化 inject 配置项
 *   1、得到 result[key] = val
 *   2、对结果数据进行响应式处理，代理每个 key 到 vm 实例
 */
export function initInjections (vm: Component) {
  // 解析 inject 配置项，然后从祖代组件的配置中找到 配置项中每一个 key 对应的 val，最后得到 result[key] = val 的结果
  const result = resolveInject(vm.$options.inject, vm)
  // 对 result 做 数据响应式处理，也有代理 inject 配置中每个 key 到 vm 实例的作用。
  // 不建议在子组件去更改这些数据，因为一旦祖代组件中 注入的 provide 发生更改，你在组件中做的更改就会被覆盖
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
            `overwritten whenever the provided component re-renders. ` +
            `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}
```

## 12、resolveInject

> /src/core/instance/resolveInject.js

```js
/**
 * 解析 inject 配置项，从祖代组件的 provide 配置中找到 key 对应的值，否则用 默认值，最后得到 result[key] = val
 * inject 对象肯定是以下这个结构，因为在 合并 选项时对组件配置对象做了标准化处理
 * @param {*} inject = {
 *  key: {
 *    from: provideKey,
 *    default: xx
 *  }
 * }
 */
export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = Object.create(null)
    // inject 配置项的所有的 key
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    // 遍历 key
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // 跳过 __ob__ 对象
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue
      // 拿到 provide 中对应的 key
      const provideKey = inject[key].from
      let source = vm
      // 遍历所有的祖代组件，直到 根组件，找到 provide 中对应 key 的值，最后得到 result[key] = provide[provideKey]
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      // 如果上一个循环未找到，则采用 inject[key].default，如果没有设置 default 值，则抛出错误
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}
```

## 13、initState

> /src/core/instance/state.js

```js
/**
 * 初始化状态
 */
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  // 1、初始化props
  if (opts.props) initProps(vm, opts.props)
  // 2、初始化方法
  if (opts.methods) initMethods(vm, opts.methods)
  // 3、初始化data
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // 4、初始化computed
  if (opts.computed) initComputed(vm, opts.computed)
  // 5、初始化watch
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

## 14、initProvide

> /src/core/instance/inject.js

```js
/**
 * 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上 
 */
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```

## 15、总结

<a data-fancybox title="VNode" href="/blog/img/web/js/page_21.png"><img :src="$withBase('/img/web/js/page_21.png')" alt="VNode"></a>

Vue 的初始化过程（new Vue(options)）都做了什么？

- 处理组件配置项
  - 初始化根组件时进行了选项合并操作，将全局配置合并到根组件的局部配置上
  - 初始化每个子组件时做了一些性能优化，将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
- 初始化组件实例的关系属性，比如 $parent、$children、$root、$refs 等
- 初始化自定义事件
- 初始化渲染函数
- 调用 beforeCreate 钩子函数
- 初始化组件的 inject 配置项，得到 ret[key] = val 形式的配置对象，然后对该配置对象进行浅层的响应式处理（只处理了对象第一层数据），并代理每个 key 到 vm 实例上
- 数据响应式，处理 props、methods、data、computed、watch 等选项
- 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
- 调用 created 钩子函数
- 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount 方法，反之，没提供 el 选项则必须调用 $mount

接下来则进入挂载阶段

## 16、参考

https://segmentfault.com/blog/xiongzixiao

https://juejin.cn/post/6949370458793836580