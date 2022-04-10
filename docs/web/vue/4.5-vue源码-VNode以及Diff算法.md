# vue源码 - VNode以及Diff算法

## 1、init

> src/core/instance/init.js

```js
// 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
if (vm.$options.el) {
  // 调用 $mount 方法，进入挂载阶段
  vm.$mount(vm.$options.el)
}
```

## 2、$mount

> src/platforms/web/runtime/index.js

```js
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

## 3、mountComponent

> src/core/instance/lifecyle.js

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // 挂载 el 到实例 vm 上
  vm.$el = el
  if (!vm.$options.render) {
    // 创建一个空的 vnode
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  // 调用 beforeMount 钩子函数
  callHook(vm, 'beforeMount')

  // 定义updateComonent方法，方法里面调用了 vm._render()
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // 实例化一个渲染 Watcher，在它的回调函数中会调用 updateComponent 方法
  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 调用 mounted 钩子函数
    callHook(vm, 'mounted')
  }
  return vm
}
```

## 4、createEmptyVNode

> src/core/vdom/vnode.js

```js
// 创建空 vnode
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
```

## 5、vm._render()

> src/core/instance/render.js

```js
Vue.prototype._render = function (): VNode {
    const vm: Component = this
    // 拿到选项中的 render 函数，以及 _parentVnode 就是当前组件的父 VNode
    const { render, _parentVnode } = vm.$options

    // 存在父组件 VNode 就处理作用域插槽
    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm
      // vm._renderProxy 在调用 initProxy 初始化时设置
      // 调用 vm.$createElement 方法来返回 vnode
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch (e) {
          handleError(e, vm, `renderError`)
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}
```

## 6、createElement

### 6.1 $createElement

> packages/weex-vue-framework/factory.js

```js
function initRender (vm) {
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); }; // createElement 与上面写法一致
}
```

> src/core/vdom/create-elemenet.js

```js
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // 检测data的类型，判断data是不是数组，是不是基本类型，并进行参数移位
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}
```

### 6.2 _createElement

> src/core/vdom/create-elemenet.js

```js
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  // 检测是否定义
  if (isDef(data) && isDef((data: any).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    // 返回空VNode
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      )
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    // 如果没传数据就用一个空对象
    data = data || {}
     // 设置为默认作用域插槽
    data.scopedSlots = { default: children[0] }
    // 清空子节点
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    // 场景是 render 函数不是编译生成的
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    // 场景是 render 函数是编译生成的 主要是针对函数式组件
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn) && data.tag !== 'component') {
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        )
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
```

### 6.3 simpleNormalizeChildren

> src/core/vdom/helpers/normalize-children.js

```js
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
// 将整个数组展平
export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
```

### 6.4 normalizeChildren

> src/core/vdom/helpers/normalize-children.js

```js
// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
export function normalizeChildren (children: any): ?Array<VNode> {
  return isPrimitive(children) // 判断子节点是不是基本类型
    ? [createTextVNode(children)] // 是的话就如果创建一个文字vnode返回
    : Array.isArray(children) // 判断是不是数组类型
      ? normalizeArrayChildren(children) // 是的话就返回调用normalizeArrayChildren
      : undefined
}

// 创建一个文字vnode返回
function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

function normalizeArrayChildren (children: any, nestedIndex?: string): Array<VNode> {
  const res = []
  let i, c, lastIndex, last
  // 遍历处理每一个子节点
  for (i = 0; i < children.length; i++) {
    c = children[i]
    // 如果没定义或者是布尔值就跳过
    if (isUndef(c) || typeof c === 'boolean') continue
    lastIndex = res.length - 1
    last = res[lastIndex]

    if (Array.isArray(c)) {
      // 当前子节点为数组 
      if (c.length > 0) {
        // 递归调用 normalizeArrayChildren，遍历处理他的子节点
        c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`)
        // 当前子节点和上一个处理的子节点，都是文本节点，就合并成一个
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]: any).text)
          c.shift()
        }
        res.push.apply(res, c)
      }
    } else if (isPrimitive(c)) {
      // 当前子节点为基础类型 判断上一个处理的节点是否为文本 
      if (isTextNode(last)) {
        // 是就合并成一个
        res[lastIndex] = createTextVNode(last.text + c)
      } else if (c !== '') {
        // 不是而且不为空就把这个基本类型转换为文本节点并且push
        res.push(createTextVNode(c))
      }
    } else {
    // 判断子节点是否为文本节点 上一个处理的是否为文本节点
      if (isTextNode(c) && isTextNode(last)) {
        // 是就合并成一个
        res[lastIndex] = createTextVNode(last.text + c.text)
      } else {
        // default key for nested array children (likely generated by v-for)
        // 判断该节点的属性 并且为他生成默认的key值
        // 判断有没有_isVList标记，表示renderList处理成功
        if (isTrue(children._isVList) &&
          //定义了标签
          isDef(c.tag) &&
          //没有定义key值
          isUndef(c.key) &&
          //传递了nestedIndex
          isDef(nestedIndex)) {
          c.key = `__vlist${nestedIndex}_${i}__`
        }
        //将该节点加入到结果中
        res.push(c)
      }
    }
  }
  return res
}
```

normalizeChildren的调用场景有两种：

1. render 函数是用户手写的。
2. 编译slot、v-for 的时候会产生嵌套数组的情况，就会调用这个方法。

执行到现在，我们已经生成了虚拟DOM，那么接下来，我们便是拿着这个虚拟 DOM 去更新真实 DOM 了，也就是调用 _update 去更新 dom（或者初始化DOM）。

## 7、vm._update

> src/core/instance/lifecycle.js

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const restoreActiveInstance = setActiveInstance(vm)
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    // 第一个参数为真实的node节点，则为初始化
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    // 如果需要 diff 的 prevVnode 存在，那么对 prevVnode 和 vnode 进行 diff
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  restoreActiveInstance()
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
  // updated hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
}
```

这里面最关键的就是vm.__patch__方法，我们可以看到，无论是初始化还是更新操作，都是调用这个方法去完成的(会调用到path)。

## 8、vm.__patch__

> src/platforms/web/runtime/index.js

```js
// install platform patch function
// 指定了 patch 方法
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

上面可以看到会先判断是否浏览器环境，因为在服务端渲染中，没有真实的浏览器 DOM 环境，所以不需要把 VNode 最终转换成 DOM，因此是⼀个空函数，⽽在浏览器端渲染中，它指向了 patch ⽅法。

## 9、patch

> src/platforms/web/runtime/patch.js

```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
```

patch 是调⽤ createPatchFunction ⽅法的返回值，这⾥传⼊了⼀个对象，包含 nodeOps参数和 modules 参数。其中， nodeOps 封装了⼀系列 DOM 操作的⽅法， modules 定义了⼀些模块的钩⼦函数的实现。

### 9.1 nodeOps

> src/platforms/web/runtime/node-ops.js

```js
/**
 * web 平台的 DOM 操作 API
 */

/**
 * 创建标签名为 tagName 的元素节点
 */
export function createElement (tagName: string, vnode: VNode): Element {
  // 创建元素节点
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  // 如果是 select 元素，则为它设置 multiple 属性
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

// 创建带命名空间的元素节点
export function createElementNS (namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

// 创建文本节点
export function createTextNode (text: string): Text {
  return document.createTextNode(text)
}

// 创建注释节点
export function createComment (text: string): Comment {
  return document.createComment(text)
}

// 在指定节点前插入节点
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

/**
 * 移除指定子节点
 */
export function removeChild (node: Node, child: Node) {
  node.removeChild(child)
}

/**
 * 添加子节点
 */
export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}

/**
 * 返回指定节点的父节点
 */
export function parentNode (node: Node): ?Node {
  return node.parentNode
}

/**
 * 返回指定节点的下一个兄弟节点
 */
export function nextSibling (node: Node): ?Node {
  return node.nextSibling
}

/**
 * 返回指定节点的标签名 
 */
export function tagName (node: Element): string {
  return node.tagName
}

/**
 * 为指定节点设置文本 
 */
export function setTextContent (node: Node, text: string) {
  node.textContent = text
}

/**
 * 为节点设置指定的 scopeId 属性，属性值为 ''
 */
export function setStyleScope (node: Element, scopeId: string) {
  node.setAttribute(scopeId, '')
}
```

### 9.2 modules

> /src/platforms/web/runtime/modules 和 /src/core/vdom/modules

平台特有的一些操作，比如：attr、class、style、event 等，还有核心的 directive 和 ref，它们会向外暴露一些特有的方法，比如：create、activate、update、remove、destroy，这些方法在 patch 阶段时会被调用，从而做相应的操作，比如 创建 attr、指令等。这部分内容太多了，这里就不一一列举了，在阅读 patch 的过程中如有需要可回头深入阅读，比如操作节点的属性的时候，就去读 attr 相关的代码。

## 10、createPatchFunction

> src/core/vdom/patch.js

```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}

  const { modules, nodeOps } = backend

  /**
     * hooks = ['create', 'activate', 'update', 'remove', 'destroy']
     * 遍历这些钩子，然后从 modules 的各个模块中找到相应的方法，比如：directives 中的 create、update、destroy 方法
     * 让这些方法放到 cb[hook] = [hook 方法] 中，比如: cb.create = [fn1, fn2, ...]
     * 然后在合适的时间调用相应的钩子方法完成对应的操作
     */
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  // 省略一些代码
  ... 

  // 最终返回 path 方法
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    ...
  }
}
```

### 10.1 patch

> src/core/vdom/patch.js

```js
return function patch (oldVnode, vnode, hydrating, removeOnly) {
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
    return
  }

  let isInitialPatch = false
  const insertedVnodeQueue = []

  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    // 当 oldVnode 不存在时，创建新的节点
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    // 对oldVnode和vnode进行diff，并对oldVnode打patch 
    const isRealElement = isDef(oldVnode.nodeType) // 是真实元素
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // patch existing root node
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      if (isRealElement) {
        // mounting to a real element
        // check if this is server-rendered content and if we can perform
        // a successful hydration.
        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          oldVnode.removeAttribute(SSR_ATTR)
          hydrating = true
        }
        if (isTrue(hydrating)) {
          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
            invokeInsertHook(vnode, insertedVnodeQueue, true)
            return oldVnode
          } else if (process.env.NODE_ENV !== 'production') {
            warn(
              'The client-side rendered virtual DOM tree is not matching ' +
              'server-rendered content. This is likely caused by incorrect ' +
              'HTML markup, for example nesting block-level elements inside ' +
              '<p>, or missing <tbody>. Bailing hydration and performing ' +
              'full client-side render.'
            )
          }
        }
        // either not server-rendered, or hydration failed.
        // create an empty node and replace it
        oldVnode = emptyNodeAt(oldVnode) // 把 oldVnode 变成虚拟 dom
      }

      // replacing existing element
      const oldElm = oldVnode.elm // 此 elm 
      const parentElm = nodeOps.parentNode(oldElm)

      // create new node
      createElm(
        vnode,
        insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )

      // update parent placeholder node element, recursively
      if (isDef(vnode.parent)) {
        let ancestor = vnode.parent
        const patchable = isPatchable(vnode)
        while (ancestor) {
          for (let i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](ancestor)
          }
          ancestor.elm = vnode.elm
          if (patchable) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, ancestor)
            }
            // #6513
            // invoke insert hooks that may have been merged by create hooks.
            // e.g. for directives that uses the "inserted" hook.
            const insert = ancestor.data.hook.insert
            if (insert.merged) {
              // start at index 1 to avoid re-invoking component mounted hook
              for (let i = 1; i < insert.fns.length; i++) {
                insert.fns[i]()
              }
            }
          } else {
            registerRef(ancestor)
          }
          ancestor = ancestor.parent
        }
      }

      // destroy old node
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0)
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode)
      }
    }
  }

  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
  return vnode.elm
}
```

### 10.2 invokeDestroyHook

> src/core/vdom/patch.js

```js
/**
 * 销毁节点：
 *   执行组件的 destroy 钩子，即执行 $destroy 方法 
 *   执行组件各个模块(style、class、directive 等）的 destroy 方法
 *   如果 vnode 还存在子节点，则递归调用 invokeDestroyHook
 */
function invokeDestroyHook(vnode) {
  let i, j
  const data = vnode.data
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
    for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
  }
  if (isDef(i = vnode.children)) {
    for (j = 0; j < vnode.children.length; ++j) {
      invokeDestroyHook(vnode.children[j])
    }
  }
}
```

### 10.3 sameVnode

> src/core/vdom/patch.js

```js
/**
 * 判读两个节点是否相同 
 */
function sameVnode (a, b) {
  return (
    // key 必须相同，需要注意的是 undefined === undefined => true
    a.key === b.key && (
      (
        // 标签相同
        a.tag === b.tag &&
        // 都是注释节点
        a.isComment === b.isComment &&
        // 都有 data 属性
        isDef(a.data) === isDef(b.data) &&
        // input 标签的情况
        sameInputType(a, b)
      ) || (
        // 异步占位符节点
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

### 10.4 emptyNodeAt

> src/core/vdom/patch.js

```js
/**
 * 为元素(elm)创建一个空的 vnode
 */
function emptyNodeAt(elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
}
```

### 10.5 createElm

> src/core/vdom/patch.js

```js
/**
 * 基于 vnode 创建整棵 DOM 树，并插入到父节点上
 */
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // This vnode was used in a previous render!
    // now it's used as a new node, overwriting its elm would cause
    // potential patch errors down the road when it's used as an insertion
    // reference node. Instead, we clone the node on-demand before creating
    // associated DOM element for it.
    vnode = ownerArray[index] = cloneVNode(vnode)
  }

  vnode.isRootInsert = !nested // for transition enter check
  /**
   * 重点
   * 1、如果 vnode 是一个组件，则执行 init 钩子，创建组件实例并挂载，
   *   然后为组件执行各个模块的 create 钩子
   *   如果组件被 keep-alive 包裹，则激活组件
   * 2、如果是一个普通元素，则什么也不错
   */
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  // 获取 data 对象
  const data = vnode.data
  // 所有的孩子节点
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    // 未知标签
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        creatingElmInVPre++
      }
      if (isUnknownElement(vnode, creatingElmInVPre)) {
        warn(
          'Unknown custom element: <' + tag + '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
          vnode.context
        )
      }
    }

    // 创建新节点
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)

    // 递归创建所有子节点（普通元素、组件）
    createChildren(vnode, children, insertedVnodeQueue)
    if (isDef(data)) {
      invokeCreateHooks(vnode, insertedVnodeQueue)
    }
    // 将节点插入父节点
    insert(parentElm, vnode.elm, refElm)

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--
    }
  } else if (isTrue(vnode.isComment)) {
    // 注释节点，创建注释节点并插入父节点
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    // 文本节点，创建文本节点并插入父节点
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
```

### 10.6 createComponent

> src/core/vdom/patch.js

```js
/**
 * 如果 vnode 是一个组件，则执行 init 钩子，创建组件实例，并挂载
 * 然后为组件执行各个模块的 create 方法
 * @param {*} vnode 组件新的 vnode
 * @param {*} insertedVnodeQueue 数组
 * @param {*} parentElm oldVnode 的父节点
 * @param {*} refElm oldVnode 的下一个兄弟节点
 * @returns 如果 vnode 是一个组件并且组件创建成功，则返回 true，否则返回 undefined
 */
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  // 获取 vnode.data 对象
  let i = vnode.data
  if (isDef(i)) {
    // 验证组件实例是否已经存在 && 被 keep-alive 包裹
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    // 执行 vnode.data.init 钩子函数，该函数在讲 render helper 时讲过
    // 如果是被 keep-alive 包裹的组件：则再执行 prepatch 钩子，用 vnode 上的各个属性更新 oldVnode 上的相关属性
    // 如果是组件没有被 keep-alive 包裹或者首次渲染，则初始化组件，并进入挂载阶段
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      // 如果 vnode 是一个子组件，则调用 init 钩子之后会创建一个组件实例，并挂载
      // 这时候就可以给组件执行各个模块的的 create 钩子了
      initComponent(vnode, insertedVnodeQueue)
      // 将组件的 DOM 节点插入到父节点内
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        // 组件被 keep-alive 包裹的情况，激活组件
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```

### 10.7 insert

> src/core/vdom/patch.js

```js
/**
 * 向父节点插入节点 
 */
function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
```

### 10.8 removeVnodes

> src/core/vdom/patch.js

```js
/**
 * 移除指定索引范围（startIdx —— endIdx）内的节点 
 */
function removeVnodes(vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (isDef(ch)) {
      if (isDef(ch.tag)) {
        removeAndInvokeRemoveHook(ch)
        invokeDestroyHook(ch)
      } else { // Text node
        removeNode(ch.elm)
      }
    }
  }
}
```

### 10.9 patchVnode

> src/core/vdom/patch.js

```js
/**
 * 更新节点
 *   全量的属性更新
 *   如果新老节点都有孩子，则递归执行 diff
 *   如果新节点有孩子，老节点没孩子，则新增新节点的这些孩子节点
 *   如果老节点有孩子，新节点没孩子，则删除老节点的这些孩子
 *   更新文本节点
 */
function patchVnode(
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // 老节点和新节点相同，直接返回
  if (oldVnode === vnode) {
    return
  }

  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode)
  }

  const elm = vnode.elm = oldVnode.elm

  // 异步占位符节点
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
    } else {
      vnode.isAsyncPlaceholder = true
    }
    return
  }

  // 跳过静态节点的更新
  // reuse element for static trees.
  // note we only do this if the vnode is cloned -
  // if the new node is not cloned it means the render functions have been
  // reset by the hot-reload-api and we need to do a proper re-render.
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    // 新旧节点都是静态的而且两个节点的 key 一样，并且新节点被 clone 了 或者 新节点有 v-once指令，则重用这部分节点
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  // 执行组件的 prepatch 钩子
  let i
  const data = vnode.data
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode)
  }

  // 老节点的孩子
  const oldCh = oldVnode.children
  // 新节点的孩子
  const ch = vnode.children
  // 全量更新新节点的属性，Vue 3.0 在这里做了很多的优化
  if (isDef(data) && isPatchable(vnode)) {
    // 执行新节点所有的属性更新
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
  }
  if (isUndef(vnode.text)) {
    // 新节点不是文本节点
    if (isDef(oldCh) && isDef(ch)) {
      // 如果新老节点都有孩子，则递归执行 diff 过程
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {
      // 老孩子不存在，新孩子存在，则创建这些新孩子节点
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch)
      }
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {
      // 老孩子存在，新孩子不存在，则移除这些老孩子节点
      removeVnodes(oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      // 老节点是文本节点，则将文本内容置空
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    // 新节点是文本节点，则更新文本节点
    nodeOps.setTextContent(elm, vnode.text)
  }
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
  }
}
```

### 10.10 updateChildren

> src/core/vdom/patch.js

```js
/**
 * diff 过程:
 *   diff 优化：做了四种假设，假设新老节点开头结尾有相同节点的情况，一旦命中假设，就避免了一次循环，以提高执行效率
 *             如果不幸没有命中假设，则执行遍历，从老节点中找到新开始节点
 *             找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置
 *   如果老节点先于新节点遍历结束，则剩余的新节点执行新增节点操作
 *   如果新节点先于老节点遍历结束，则剩余的老节点执行删除操作，移除这些老节点
 */
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  // 老节点的开始索引
  let oldStartIdx = 0
  // 新节点的开始索引
  let newStartIdx = 0
  // 老节点的结束索引
  let oldEndIdx = oldCh.length - 1
  // 第一个老节点
  let oldStartVnode = oldCh[0]
  // 最后一个老节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新节点的结束索引
  let newEndIdx = newCh.length - 1
  // 第一个新节点
  let newStartVnode = newCh[0]
  // 最后一个新节点
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly是一个特殊的标志，仅由 <transition-group> 使用，以确保被移除的元素在离开转换期间保持在正确的相对位置
  const canMove = !removeOnly

  if (process.env.NODE_ENV !== 'production') {
    // 检查新节点的 key 是否重复
    checkDuplicateKeys(newCh)
  }

  // 遍历新老两组节点，只要有一组遍历完（开始索引超过结束索引）则跳出循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      // 如果节点被移动，在当前索引上可能不存在，检测这种情况，如果节点不存在则调整索引
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 老开始节点和新开始节点是同一个节点，执行 patch
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      // patch 结束后老开始和新开始的索引分别加 1
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 老结束和新结束是同一个节点，执行 patch
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      // patch 结束后老结束和新结束的索引分别减 1
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      // 老开始和新结束是同一个节点，执行 patch
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      // 处理被 transtion-group 包裹的组件时使用
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      // patch 结束后老开始索引加 1，新结束索引减 1
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      // 老结束和新开始是同一个节点，执行 patch
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      // patch 结束后，老结束的索引减 1，新开始的索引加 1
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 如果上面的四种假设都不成立，则通过遍历找到新开始节点在老节点中的位置索引

      // 找到老节点中每个节点 key 和 索引之间的关系映射 => oldKeyToIdx = { key1: idx1, ... }
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      // 在映射中找到新开始节点在老节点中的位置索引
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) { // New element
        // 在老节点中没找到新开始节点，则说明是新创建的元素，执行创建
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        // 在老节点中找到新开始节点了
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 如果这两个节点是同一个，则执行 patch
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          // patch 结束后将该老节点置为 undefined
          oldCh[idxInOld] = undefined
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // 最后这种情况是，找到节点了，但是发现两个节点不是同一个节点，则视为新元素，执行创建
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      // 老节点向后移动一个
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 走到这里，说明老节点或者新节点被遍历完了
  if (oldStartIdx > oldEndIdx) {
    // 说明老节点被遍历完了，新节点有剩余，则说明这部分剩余的节点是新增的节点，然后添加这些节点
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    // 说明新节点被遍历完了，老节点有剩余，说明这部分的节点被删掉了，则移除这些节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
```

### 10.11 checkDuplicateKeys

> src/core/vdom/patch.js

```js
/**
 * 检查一组元素的 key 是否重复 
 */
function checkDuplicateKeys(children) {
  const seenKeys = {}
  for (let i = 0; i < children.length; i++) {
    const vnode = children[i]
    const key = vnode.key
    if (isDef(key)) {
      if (seenKeys[key]) {
        warn(
          `Duplicate keys detected: '${key}'. This may cause an update error.`,
          vnode.context
        )
      } else {
        seenKeys[key] = true
      }
    }
  }
}
```

### 10.12 addVnodes

> src/core/vdom/patch.js

```js

/**
 * 在指定索引范围（startIdx —— endIdx）内添加节点
 */
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx)
  }
}
```

### 10.13 createKeyToOldIdx

> src/core/vdom/patch.js

```js
/**
 * 得到指定范围（beginIdx —— endIdx）内节点的 key 和 索引之间的关系映射 => { key1: idx1, ... }
 */
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

### 10.14 findIdxInOld

> src/core/vdom/patch.js

```js
/**
  * 找到新节点（vnode）在老节点（oldCh）中的位置索引 
  */
function findIdxInOld(node, oldCh, start, end) {
  for (let i = start; i < end; i++) {
    const c = oldCh[i]
    if (isDef(c) && sameVnode(node, c)) return i
  }
}
```

### 10.15 invokeCreateHooks

> src/core/vdom/patch.js

```js
/**
 * 调用 各个模块的 create 方法，比如创建属性的、创建样式的、指令的等等 ，然后执行组件的 mounted 生命周期方法
 */
function invokeCreateHooks(vnode, insertedVnodeQueue) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  // 组件钩子
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    // 组件好像没有 create 钩子
    if (isDef(i.create)) i.create(emptyNode, vnode)
    // 调用组件的 insert 钩子，执行组件的 mounted 生命周期方法
    if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
  }
}
```

### 10.16 createChildren

> src/core/vdom/patch.js

```js
/**
 * 创建所有子节点，并将子节点插入父节点，形成一棵 DOM 树
 */
function createChildren(vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    // children 是数组，表示是一组节点
    if (process.env.NODE_ENV !== 'production') {
      // 检测这组节点的 key 是否重复
      checkDuplicateKeys(children)
    }
    // 遍历这组节点，依次创建这些节点然后插入父节点，形成一棵 DOM 树
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    // 说明是文本节点，创建文本节点，并插入父节点
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}
```

## 11、VNode 构造器

> src/core/vdom/vnode.js

```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

可以看到VNode有非常多的属性，但是我们只需要知道几个比较重要的：

- tag： vnode的标签属性
- data： 包含了最后渲染成真实dom节点后，节点上的class，attribute，style以及绑定的事件
- children： vnode的子节点
- text： 文本
- elm： 对应的真实DOM
- key： vnode的标记，提供diff的效率

## 12、总结

<a data-fancybox title="挂载阶段" href="/blog/img/web/js/page_22.png"><img :src="$withBase('/img/web/js/page_22.png')" alt="挂载阶段"></a>

<a data-fancybox title="VNode" href="/blog/img/web/js/page_23.png"><img :src="$withBase('/img/web/js/page_23.png')" alt="VNode"></a>

<a data-fancybox title="Diff" href="/blog/img/web/js/page_24.png"><img :src="$withBase('/img/web/js/page_24.png')" alt="Diff"></a>

### 12.1 如何实现vnode？

1. 初始化vue实例，调用Vue.prototype._init方法，里面最后会调用vm.$mount方法进入挂载阶段
2. 接着调用了mountComponent方法，这个方法会调用_render方法去生成虚拟dom，_update方法去更新真实DOM
3. _render方法会调用createElement方法，这个方法会去new VNode去生成虚拟dom
4. 生成虚拟DOM后，调用_update方法，这个方法会接着调用__patch__方法去更新或者初始化真实DOM。

### 12.2 Dom Diff的本质

比对渲染更新前后产生的两个虚拟dom对象的差异(diff)，并产出差异补丁对象，再将差异补丁对象应用到真实dom节点上

### 12.3 为什么需要Dom Diff

大家应该都知道操作Dom代价是昂贵的，因为操作Dom其本质是两个线程（JS引擎和GUI渲染引擎）间发送指令（通信）的过程，并且浏览器在创建初始化一个元素时，会为其创建很多属性，因此，在大量操作Dom的场景下，通过一些计算来尽可能少地操作Dom，保证了性能的下限。当然Dom Diff不一定更快！

一句话概述：用JavaScript的树形结构对象来描述真实dom结构

### 12.4 虚拟Dom从初次渲染到更新

<a data-fancybox title="虚拟Dom渲染" href="/blog/img/web/1/2.png"><img :src="$withBase('/img/web/1/2.png')" alt="虚拟Dom渲染"></a>

1. 用JS对象模拟DOM（虚拟DOM1）

2. 将此虚拟DOM1转成真实DOM并插入页面中（render）

3. 如果有事件发生（用户操作更新数据）修改了虚拟DOM产生虚拟DOM2，比较两棵虚拟 DOM树的差异，得到差异对象（diff）

4. 把差异对象应用到真正的DOM树上（patch）

### 12.5 你能说一说 Vue 的 patch 算法吗？

Vue 的 patch 算法有三个作用：**负责首次渲染**和**后续更新**或者**销毁组件**

- 如果老的 VNode 是真实元素，则表示首次渲染，创建整棵 DOM 树，并插入 body，然后移除老的模版节点
- 如果老的 VNode 不是真实元素，并且新的 VNode 也存在，则表示更新阶段，执行 patchVnode
  - 首先是全量更新所有的属性
  - 如果新老 VNode 都有孩子，则递归执行 updateChildren，进行 diff 过程
    > 针对前端操作 DOM 节点的特点进行如下优化：
      - 同层比较（降低时间复杂度）深度优先（递归）
      - 而且前端很少有完全打乱节点顺序的情况，所以做了四种假设，假设新老 VNode 的开头结尾存在相同节点，一旦命中假设，就避免了一次循环，降低了 diff 的时间复杂度，提高执行效率。如果不幸没有命中假设，则执行遍历，从老的 VNode 中找到新的 VNode 的开始节点
      - 找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置
      - 如果老的 VNode 先于新的 VNode 遍历结束，则剩余的新的 VNode 执行新增节点操作
      - 如果新的 VNode 先于老的 VNode 遍历结束，则剩余的老的 VNode 执行删除操纵，移除这些老节点
  - 如果新的 VNode 有孩子，老的 VNode 没孩子，则新增这些新孩子节点
  - 如果老的 VNode 有孩子，新的 VNode 没孩子，则删除这些老孩子节点
  - 剩下一种就是更新文本节点
- 如果新的 VNode 不存在，老的 VNode 存在，则调用 destroy，销毁老节点

## 13、参考

https://juejin.cn/post/6964141635856760868

https://juejin.cn/post/6994959998283907102

https://juejin.cn/post/6883736222481514504

https://juejin.cn/post/6932726705521950733