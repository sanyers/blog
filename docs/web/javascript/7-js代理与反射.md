# js代理与反射

ES6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。

## 1、代理基础

### 1.1 创建空代理

最简单的代理是空代理，即除了作为一个抽象的目标对象，什么也不做。

代理是使用 Proxy 构造函数创建的。这个构造函数接收两个参数：**目标对象**和**处理程序对象**。缺少其中任何一个参数都会抛出 TypeError。

```js
const target = { 
  id: 'target' 
}; 
const handler = {}; 
const proxy = new Proxy(target, handler);

// id 属性会访问同一个值
console.log(target.id); // target 
console.log(proxy.id); // target 

// Proxy.prototype 是 undefined 
// 因此不能使用 instanceof 操作符
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check 
```

### 1.2 定义捕获器

使用代理的主要目的是可以定义**捕获器**（trap）。捕获器就是在处理程序对象中定义的“基本操作的拦截器”。

```js
const target = { 
  foo: 'bar' 
}; 

const handler = { 
 // 捕获器在处理程序对象中以方法名为键
  get() { 
    return 'handler override'; 
  } 
}; 
const proxy = new Proxy(target, handler); 
console.log(target.foo); // bar 
console.log(proxy.foo); // handler override
```

### 1.3 捕获器参数和反射 API

```js
const handler = { 
  // trapTarget 目标对象，property 要查询的属性，receiver 代理对象
  get(trapTarget, property, receiver) { 
    return Reflect.get(...arguments); // 反射，重建原始行为
  } 
}; 

// 或者
const handler = { 
  get() { 
    return Reflect.get; // 反射，重建原始行为
  } 
};
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo); // bar 

// 空代理
const proxy = new Proxy(target, Reflect);
```

### 1.4 捕获器不变式

每个捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循“捕获器不变式”（trap invariant）。

如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，会抛出 TypeError

```js
const target = {}; 
Object.defineProperty(target, 'foo', { 
  configurable: false, 
  writable: false, 
  value: 'bar' 
}); 
const handler = { 
  get() { 
    return 'qux'; 
  } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); 
// TypeError 
```

### 1.5 可撤销代理

有时候可能需要中断代理对象与目标对象之间的联系。对于使用 new Proxy() 创建的普通代理来说，这种联系会在代理对象的生命周期内一直持续存在。

```js
const target = { 
  foo: 'bar' 
}; 
const handler = { 
  get() { 
    return 'intercepted'; 
  } 
}; 
const { proxy, revoke } = Proxy.revocable(target, handler); 
console.log(proxy.foo); // intercepted 
console.log(target.foo); // bar 
revoke(); 
console.log(proxy.foo); // TypeError
```

### 1.6 实用反射 API

（1）反射 API 与对象 API 

- 反射 API 并不限于捕获处理程序；
- 大多数反射 API 方法在 Object 类型上有对应的方法。

（2）状态标记

很多反射方法返回称作“状态标记”的布尔值，表示意图执行的操作是否成功。

```js
// 初始代码 
const o = {}; 
try { 
  Object.defineProperty(o, 'foo', 'bar'); 
  console.log('success'); 
} catch(e) { 
  console.log('failure'); 
} 

// 重构后的代码
const o = {}; 
if(Reflect.defineProperty(o, 'foo', {value: 'bar'})) { 
  console.log('success'); 
} else { 
  console.log('failure'); 
} 
```

（3）用一等函数替代操作符

- Reflect.get()：可以替代对象属性访问操作符。
- Reflect.set()：可以替代=赋值操作符。
- Reflect.has()：可以替代 in 操作符或 with()。
- Reflect.deleteProperty()：可以替代 delete 操作符。
- Reflect.construct()：可以替代 new 操作符。

（4）安全地应用函数

```js
Reflect.apply(myFunc, thisVal, argumentsList); 
```

### 1.7 代理另一个代理

```js
const target = { 
  foo: 'bar' 
}; 
const firstProxy = new Proxy(target, { 
  get() { 
    console.log('first proxy'); 
    return Reflect.get(...arguments); 
  } 
}); 
const secondProxy = new Proxy(firstProxy, { 
  get() { 
    console.log('second proxy'); 
    return Reflect.get(...arguments); 
  } 
}); 
console.log(secondProxy.foo); 
// second proxy 
// first proxy 
// bar 
```

### 1.8 代理的问题与不足

（1）代理中的 this

```js
const wm = new WeakMap(); 
class User { 
  constructor(userId) { 
    wm.set(this, userId); 
  } 
  set id(userId) { 
    wm.set(this, userId); 
  } 
  get id() { 
    return wm.get(this); 
  } 
}

const user = new User(123); 
console.log(user.id); // 123 
const userInstanceProxy = new Proxy(user, {}); 
console.log(userInstanceProxy.id); // undefined

// 解决方法：把代理 User 实例改为代理 User 类本身
const UserClassProxy = new Proxy(User, {}); 
const proxyUser = new UserClassProxy(456); 
console.log(proxyUser.id);
```

（2）代理与内部槽位

```js
const target = new Date(); 
const proxy = new Proxy(target, {}); 
console.log(proxy instanceof Date); // true 
proxy.getDate(); // TypeError: 'this' is not a Date object

// 解决方法：把代理 Date 实例改为代理 Date 类本身
const dateProxy = new Proxy(Date, {});
const proxy = new dateProxy();
console.log(proxy instanceof Date); // true
console.log(proxy.getDate()); // 6
```

## 2、代理捕获器与反射方法

代理可以捕获 13 种不同的基本操作。

只要在代理上调用，所有捕获器都会拦截它们对应的反射 API 操作。

| 方法 | 说明 | 返回值 |
| :----: | :----: | :----: |
| get() | 获取属性值的操作中被调用 | 返回值无限制 |
| set() | 在设置属性值的操作中被调用 | 返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError |
| has() | 在 in 操作符中被调用 | 必须返回布尔值，表示属性是否存在 |
| defineProperty() | 在 Object.defineProperty() 中被调用 | 必须返回布尔值，表示属性是否成功定义 |
| getOwnPropertyDescriptor() | 同上 | 必须返回对象，或者在属性不存在时返回 undefined |
| deleteProperty() | 在 delete 操作符中被调用 | 必须返回布尔值，表示删除属性是否成功 |
| ownKeys() | 在 Object.keys() 及类似方法中被调用 | 必须返回包含字符串或符号的可枚举对象 |
| getPrototypeOf() | 在 Object.getPrototypeOf() 中被调用 | 必须返回对象或 null |
| setPrototypeOf() | 同上 | 必须返回布尔值，表示原型赋值是否成功 |
| isExtensible() | 同上 | 必须返回布尔值，表示 target 是否可扩展 |
| preventExtensions() | 同上 | 必须返回布尔值，表示 target 是否已经不可扩展 |
| apply() | 在调用函数时中被调用 | 返回值无限制 |
| construct() | 在 new 操作符中被调用 | 必须返回一个对象 |

## 3、代理模式

使用代理可以在代码中实现一些有用的编程模式。

### 3.1 跟踪属性访问

通过捕获 get、set 和 has 等操作，可以知道对象属性什么时候被访问、被查询。把实现相应捕获器的某个对象代理放到应用中，可以监控这个对象何时在何处被访问过。

```js
const user = { 
 name: 'Jake' 
}; 
const proxy = new Proxy(user, { 
  get(target, property, receiver) { 
    console.log(`Getting ${property}`); 
    return Reflect.get(...arguments); 
  }, 
  set(target, property, value, receiver) { 
    console.log(`Setting ${property}=${value}`); 
    return Reflect.set(...arguments); 
  } 
}); 
proxy.name; // Getting name 
proxy.age = 27; // Setting age=27
```

### 3.2 隐藏属性

代理的内部实现对外部代码是不可见的，因此要隐藏目标对象上的属性也轻而易举。

```js
const hiddenProperties = ["foo", "bar"];
const targetObject = {
  foo: 1,
  bar: 2,
  baz: 3,
};
const proxy = new Proxy(targetObject, {
  get(target, property) {
    if (hiddenProperties.includes(property)) {
      return undefined;
    } else {
      return Reflect.get(...arguments);
    }
  },
  has(target, property) {
    if (hiddenProperties.includes(property)) {
      return false;
    } else {
      return Reflect.has(...arguments);
    }
  },
});
// get()
console.log(proxy.foo); // undefined
console.log(proxy.bar); // undefined
console.log(proxy.baz); // 3
// has()
console.log("foo" in proxy); // false
console.log("bar" in proxy); // false
console.log("baz" in proxy); // true
```

### 3.3 属性验证

因为所有赋值操作都会触发 set()捕获器，所以可以根据所赋的值决定是允许还是拒绝赋值

```js
const target = { 
 test: 0 
}; 
const proxy = new Proxy(target, { 
  set(target, property, value) { 
    if (typeof value !== 'number') { 
      return false; 
    } else { 
      return Reflect.set(...arguments); 
    } 
  } 
}); 
proxy.test = 1; 
console.log(proxy.test); // 1 
proxy.test = '2'; 
console.log(proxy.test); // 1 
```

### 3.4 函数与构造函数参数验证

```js
function median(...nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
}
const proxy = new Proxy(median, {
  apply(target, thisArg, argumentsList) {
    for (const arg of argumentsList) {
      if (typeof arg !== "number") {
        throw "Non-number argument provided";
      }
    }
    return Reflect.apply(...arguments);
  },
});
console.log(proxy(4, 7, 1)); // 4
console.log(proxy(4, "7", 1));
// Error: Non-number argument provided
```

### 3.5 数据绑定与可观察对象

通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的代码互操作。

比如，可以将被代理的类绑定到一个全局实例集合，让所有创建的实例都被添加到这个集合中：

```js
const userList = []; 
class User { 
  constructor(name) { 
    this.name_ = name; 
  } 
} 
const proxy = new Proxy(User, { 
  construct() { 
    const newUser = Reflect.construct(...arguments); 
    userList.push(newUser); 
    return newUser; 
  } 
}); 
new proxy('John'); 
new proxy('Jacob'); 
new proxy('Jingleheimerschmidt'); 
console.log(userList); // [User {}, User {}, User{}] 
```

```js
const userList = []; 
function emit(newValue) { 
  console.log(newValue); 
} 
const proxy = new Proxy(userList, { 
  set(target, property, value, receiver) { 
    const result = Reflect.set(...arguments); 
    if (result) { 
      emit(Reflect.get(target, property, receiver)); 
    } 
    return result; 
  } 
}); 
proxy.push('John'); 
// John 
proxy.push('Jacob'); 
// Jacob 
```

## 4、总结

1. 最简单的代理是空代理，即除了作为一个抽象的目标对象

2. 代理是使用 Proxy 构造函数创建的，接收两个参数：**目标对象** 和 **处理程序对象**

3. `Proxy.prototype` 是 `undefined`，因此不能使用 `instanceof` 操作符

4. 捕获器：

   - `get(trapTarget, property, receiver)` trapTarget 目标对象，property 要查询的属性，receiver 代理对象
   - `Reflect.get(...arguments); or Reflect.get;` 反射，重建原始行为

5. 捕获器不变式：如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，会抛出 TypeError

6. 可撤销代理：

   - `Proxy.revocable(target, handler)` 创建可撤销代理
   - `revoke()` 方法销毁代理

7. 实用反射 API：代理可以捕获 13 种不同的基本操作

   - `get()` 可以替代对象属性访问操作符
   - `set()` 可以替代=赋值操作符
   - `has()` 可以替代 in 操作符或 with()
   - `defineProerty()` 在 Object.defineProperty() 中被调用
   - `getOwnPropertyDescriptor()` ~
   - `deleteProperty()` 可以替代 delete 操作符
   - `ownKeys()` 在 Object.keys() 及类似方法中被调用
   - `getPrototypeOf()`在 Object.getPrototypeOf() 中被调用
   - `setPrototypeOf()` ~
   - `isExtensible()` ~
   - `preventExtensions()` ~
   - `construct()` 可以替代 new 操作符
   - `apply(myFunc, thisVal, argumentsList)` 在调用函数时中被调用

8. 代理模式

   - 跟踪属性访问：通过捕获 get、set 和 has 等操作，可以知道对象属性什么时候被访问、被查询。
   - 隐藏属性：通过条件判定是否返回属性值
   - 属性验证：通过 set() 捕获器拦截，根据条件判定是否赋值