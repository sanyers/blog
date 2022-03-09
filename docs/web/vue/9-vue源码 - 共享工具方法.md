# vue源码 - 共享工具方法

## 1、方法列表

- `emptyObject` 创建空数组
- `isUndef(v)` 是否未定义
- `isTrue(v)` 是否 true
- `isFalse(v)` 是否 false
- `isPrimitive(value)` 是否原始基本类型
- `isObject(obj)` 是否是 object
- `_toString()` 复制原型 toString 方法，方面简写使用
- `toRawType(value)` 获得真正的类型
- `isPlainObject(obj)` 获得真正类型，是否是 Object 对象
- `isRegExp(v)` 是否是 RegExp 对象
- `isValidArrayIndex(val)` 是否有效的数组索引
- `isPromise(val)` 是否 promise 对象
- `toString(val)` toString() 序列化 `{a:1, b:2}` 形式等
- `toNumber(val)` 转为数字
- `makeMap(str, expectsLowerCase)` 创建个字典，返回函数检测 key 是否存在于 map
- `isBuiltInTag` 检测标签 tag 是否是内置 tag
- `isReservedAttribute` 检查属性是否为 vue 保留属性
- `remove(arr)` 从数组中，删除一项
- `hasOwn(obj, key)` 是否对象本身的属性，而非原型链上的
- `cached(f)` 创建个缓存函数
- `camelize(str)` '-' 横线改为驼峰类型
- `capitalize(str)` 首字母大写
- `hyphenate(str)` 驼峰转横线形式
- `bind` 兼容 bind
- `toArray(list, start)` 将类似数组的对象转换为真实数组
- `extend(to, _from)` 扩展集成
- `toObject(arr)` 把对象数组中的对象提取到一个对象里面
- `noop(a, b, c)` 空函数
- `no(a, b, c)` 总是返回 false
- `identity(_)` 返回相同的值
- `genStaticKeys(modules)` 生成包含来自编译器模块的静态键的字符串
- `looseEqual(a, b)` 判断两个内容是否相同，非引用关系的判断
- `looseIndexOf(arr, val)` 返回数组元素的下标
- `once(fn)` 函数执行一次

## 2、源码

> shared/util.js

```js
// 创建空数组
export const emptyObject = Object.freeze({})

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
// 是否未定义
export function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}

// 是否定义
export function isDef (v: any): boolean %checks {
  return v !== undefined && v !== null
}

// 是否true
export function isTrue (v: any): boolean %checks {
  return v === true
}
// 是否false
export function isFalse (v: any): boolean %checks {
  return v === false
}

/**
 * Check if value is primitive.
 */
// 是否原始基本类型
export function isPrimitive (value: any): boolean %checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
// 是否是object
export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
// 复制原型toString方法，方面简写使用
const _toString = Object.prototype.toString

// 获得真正的类型，例如"[object Array]",结果为：Array， 也就是其数组构造器
export function toRawType (value: any): string {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

// 获得真正类型，是否是Object 对象
export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
// 是否是RegExp 对象
export function isRegExp (v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */

// 是否有效的数组索引
export function isValidArrayIndex (val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

// 是否promise对象
export function isPromise (val: any): boolean {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
// toString() 序列化{a:1, b:2} 形式等
export function toString (val: any): string {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
// 转为数字
export function toNumber (val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */

// 创建个字典，返回函数检测key是否存在于map
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 */

// 检测标签tag是否是内置tag,比如 slot, component, 例如： isBuiltInTag('mytag') // undefined
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 */

// 检查属性是否为vue保留属性，key,ref,slot,slot-scope,is， 例如： isReservedAttribute('ref') // undefined
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
 * Remove an item from an array.
 */

// 从数组中，删除一项
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */

// 是否对象本身的属性，而非原型链上的
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */

// 创建个缓存函数
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 */

// '-' 横线改为驼峰类型
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */

// 首字母大写
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */

// 驼峰转横线形式
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

// 实现bind
/* istanbul ignore next */
function polyfillBind (fn: Function, ctx: Object): Function {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}
// 原生bind
function nativeBind (fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

// 兼容判断
export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind

/**
 * Convert an Array-like object to a real Array.
 */
// 维数组转为真实数组
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 */

// 扩展集成
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */

// 把对象数组中的对象提取到一个对象里面
export function toObject (arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop (a?: any, b?: any, c?: any) {}

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
export const identity = (_: any) => _

/**
 * Generate a string containing static keys from compiler modules.
 */
export function genStaticKeys (modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
// 判断两个内容是否相同，非引用关系的判断
export function looseEqual (a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
// 返回数组元素的下标
export function looseIndexOf (arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */

// 函数执行一次
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

## 3、参考

https://www.jianshu.com/p/ceada0117741