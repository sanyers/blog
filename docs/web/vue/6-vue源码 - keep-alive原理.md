# vue 源码 - keep-alive 原理

keep-alive 是一个抽象组件，它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；使用 keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

## 1、应用场景

用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。keep-alive 就是用来解决这种场景。当然 keep-alive 不仅仅是能够保存页面/组件的状态这么简单，它还可以避免组件反复创建和渲染，有效提升系统性能。

总的来说，keep-alive 用于保存组件的渲染状态。

## 2、用法

- 在动态组件中的应用
  ```html
  <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <component :is="currentComponent"></component>
  </keep-alive>
  ```
- 在 vue-router 中的应用
  ```html
  <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <router-view></router-view>
  </keep-alive>
  ```

## 3、参数

- `include` 定义缓存白名单，keep-alive会缓存命中的组件；
- `exclude` 定义缓存黑名单，被命中的组件将不会被缓存；
- `max` 定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

## 4、源码分析

> /src/core/components/keep-alive.js

```js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真实dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        keys.push(keyToCache)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) { // 超过缓存数限制，将第一个删除
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.cacheVNode()
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },

  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {  // 存在组件参数
      // check pattern
      const name: ?string = getComponentName(componentOptions) // 组件名
      const { include, exclude } = this
      if ( // 条件匹配
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null // 定义组件的缓存key
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) { // 已经缓存过该组件
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key) // 调整key排序
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode // 缓存组件对象
        this.keyToCache = key
      }

      vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
    }
    return vnode || (slot && slot[0])
  }
}
```

## 5、总结

1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名；
2. 根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
3. 根据组件 ID 和 tag 生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该 key 在 this.keys 中的位置（更新key的位置是实现 LRU 置换策略的关键），否则执行第四步；
4. 在 this.cache 对象中存储该组件实例并保存 key 值，之后检查缓存的实例数量是否超过 max 的设置值，超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为0的那个 key）。
5. 最后，将该组件实例的 keepAlive 属性值设置为 true。

## 6、参考

https://www.jianshu.com/p/5ba38f453354

https://blog.csdn.net/weixin_38189842/article/details/103999989