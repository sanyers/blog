# js迭代器与生成器

“迭代”的意思是按照顺序反复多次执行一段程序，通常会有明确的终止条件。

ES6 规范新增了两个高级特性：**迭代器**和**生成器**。使用这两个特性，能够更清晰、高效、方便地实现迭代。

## 1、理解迭代

计数循环就是一种最简单的迭代：

```js
for (let i = 1; i <= 10; ++i) { 
  console.log(i); 
}
```

- 迭代之前需要事先知道如何使用数据结构
- 遍历顺序并不是数据结构固有的

## 2、迭代器模式

**迭代器模式**（特别是在 ES 这个语境下）描述了一个方案，即可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费。

可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。它们包含的元素都是有限的，而且都具有无歧义的遍历顺序

```js
// 数组的元素是有限的
// 递增索引可以按序访问每个元素
let arr = [3, 1, 4]; 

// 集合的元素是有限的
// 可以按插入顺序访问每个元素
let set = new Set().add(3).add(1).add(4); 
```

不过，可迭代对象不一定是集合对象，也可以是仅仅具有类似数组行为的其他数据结构。

> 不过，可迭代对象不一定是集合对象，也可以是仅仅具有类似数组行为的其他数据结构

任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构“消费”（consume）。迭代器（iterator）是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是 Iterable 和 Iterator 的强大之处。

### 2.1 可迭代协议

实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现 Iterator 接口的对象的能力。

这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

很多内置类型都实现了 Iterable 接口：

- 字符串
- 数组
- 映射
- 集合
- arguments 对象
- NodeList 等 DOM 集合类型

```js
let num = 1; 
let obj = {}; 
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined 
console.log(obj[Symbol.iterator]); // undefined 

let str = 'abc'; 
let arr = ['a', 'b', 'c'];
// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] } 
console.log(arr[Symbol.iterator]); // f values() { [native code] } 

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {} 
console.log(arr[Symbol.iterator]()); // ArrayIterator {} 
```

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：

- for-of 循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all() 接收由期约组成的可迭代对象
- Promise.race() 接收由期约组成的可迭代对象
- yield* 操作符，在生成器中使用

### 2.2 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next() 方法在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。

next() 方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布尔值，表示是否还可以再次调用 next() 取得下一个值；value 包含可迭代对象的下一个值（done 为
false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。

```js
// 可迭代对象
let arr = ['foo', 'bar']; 

// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] } 

// 迭代器
let iter = arr[Symbol.iterator](); 
console.log(iter); // ArrayIterator {} 

// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: true, value: undefined } 

// 可以一直迭代
let arr = ['foo']; 
let iter = arr[Symbol.iterator](); 
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined }

// 可迭代对象在迭代期间被修改了
let arr = ['foo', 'baz']; 
let iter = arr[Symbol.iterator](); 
console.log(iter.next()); // { done: false, value: 'foo' } 

// 在数组中间插入值
arr.splice(1, 0, 'bar'); 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: false, value: 'baz' } 
console.log(iter.next()); // { done: true, value: undefined } 
```

> 迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象。

```js
class Foo {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: false, value: "foo" };
      },
    };
  }
}

let f = new Foo();
console.log(f[Symbol.iterator]()); // { next: [Function: next] }

let a = new Array();
console.log(a[Symbol.iterator]()); // Object [Array Iterator] {}
```

### 2.3 自定义迭代器

任何实现 Iterator 接口的对象都可以作为迭代器使用

```js
class MyIteration {
  constructor(count) {
    this.count = count;
  }
  [Symbol.iterator]() {
    let index = 1;
    let count = this.count;
    return {
      next() {
        if (index <= count) {
          return { done: false, value: index++ };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}

const myInter = new MyIteration(3);
for (const i of myInter) {
  console.log(i);
}
// 1
// 2
// 3
```

### 2.4 提前终止迭代器

可选的 return() 方法用于指定在迭代器提前关闭时执行的逻辑。

不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。可能的情况包括：

- for-of 循环通过 break、continue、return 或 throw 提前退出；
- 解构操作并未消费所有值。

```js
class MyIteration {
  constructor(count) {
    this.count = count;
  }
  [Symbol.iterator]() {
    let index = 1;
    let count = this.count;
    return {
      next() {
        if (index <= count) {
          return { done: false, value: index++ };
        } else {
          return { done: true, value: undefined };
        }
      },
      return() {
        console.log("early end");
        return { done: true };
      },
    };
  }
}
const myInter = new MyIteration(5);
for (const i of myInter) {
  if (i > 3) {
    break;
  }
  console.log(i);
}
// 1
// 2
// 3
// early end
```

## 3、生成器

拥有在一个函数块内暂停和恢复代码执行的能力

### 3.1 生成器基础

```js
// 生成器函数声明
function* generatorFn() {} 

// 生成器函数表达式
let generatorFn = function* () {} 

// 作为对象字面量方法的生成器函数
let foo = { 
  * generatorFn() {} 
} 

// 作为类实例方法的生成器函数
class Foo { 
  * generatorFn() {} 
} 

// 作为类静态方法的生成器函数
class Bar { 
  static * generatorFn() {} 
} 
```

> 箭头函数不能用来定义生成器函数。

调用生成器函数会产生一个**生成器对象**。

生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next() 方法。调用这个方法会让生成器开始或恢复执行。

```js
function* generatorFn() {} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.next); // f next() { [native code] } 
```

### 3.2 通过 yield 中断执行

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield 关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用 next() 方法来恢复执行。

```js
function* generatorFn() { 
 yield; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: undefined } 
console.log(generatorObject.next()); // { done: true, value: undefined } 
```

```js
function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: 'foo' } 
console.log(generatorObject.next()); // { done: false, value: 'bar' } 
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。

（1）生成器对象作为可迭代对象

```js
function* generatorFn() { 
 yield 1; 
 yield 2; 
 yield 3; 
} 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
```

（2）使用 yield 实现输入和输出

yield 关键字还可以作为函数的中间参数使用。第一次调用 next() 传入的值不会被使用，因为这一次调用是为了开始执行生成器函数

```js
function* generatorFn(initial) { 
 console.log(initial); 
 console.log(yield); 
 console.log(yield); 
} 
let generatorObject = generatorFn('foo'); 
generatorObject.next('bar'); // foo 
generatorObject.next('baz'); // baz 
generatorObject.next('qux'); // qux
```

（3）产生可迭代对象

可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值

```js
// 等价的 generatorFn： 
// function* generatorFn() { 
// for (const x of [1, 2, 3]) { 
// yield x; 
// } 
// } 
function* generatorFn() { 
 yield* [1, 2, 3]; 
} 
let generatorObject = generatorFn(); 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
```

（4）使用 yield* 实现递归算法

```js
function* nTimes(n) { 
 if (n > 0) { 
 yield* nTimes(n - 1); 
 yield n - 1; 
 } 
} 
for (const x of nTimes(3)) { 
 console.log(x); 
} 
// 0 
// 1 
// 2 
```

### 3.3 生成器作为默认迭代器

```js
class Foo {
  constructor() {
    this.values = [1, 2, 3];
  }
  *[Symbol.iterator]() {
    yield* this.values;
  }
}

const f = new Foo();
for (const x of f) {
  console.log(x);
}
// 1
// 2
// 3
```

### 3.4 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。

一个实现 Iterator 接口的对象一定有 next() 方法，还有一个可选的 return() 方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三个方法：throw()。

```js
function* generatorFn() {} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.next); // f next() { [native code] } 
console.log(g.return); // f return() { [native code] } 
console.log(g.throw); // f throw() { [native code] } 
```

return() 和 throw() 方法都可以用于强制生成器进入关闭状态。

（1）return()

```js
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.return(4)); // { done: true, value: 4 } 
console.log(g); // generatorFn {<closed>}
```

（2）throw()

throw() 方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭

```js
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
try { 
 g.throw('foo'); 
} catch (e) { 
 console.log(e); // foo 
} 
console.log(g); // generatorFn {<closed>} 
```

不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误处理会跳过对应的 yield。

```js
function* generatorFn() { 
  for (const x of [1, 2, 3]) { 
    try { 
      yield x; 
    } catch(e) {} 
  } 
} 

const g = generatorFn(); 
console.log(g.next()); // { done: false, value: 1} 
g.throw('foo'); 
console.log(g.next()); // { done: false, value: 3}
```

## 4、总结

1. “迭代”的意思是按照顺序反复多次执行一段程序，通常会有明确的终止条件

2. 迭代器模式：可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费

3. 可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。它们包含的元素都是有限的，而且都具有无歧义的遍历顺序

4. 可迭代协议：必须使用特殊的 Symbol.iterator 作为键，引用了一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器

5. 很多内置类型都实现了 Iterable 接口：

   - 字符串
   - 数组
   - 映射
   - 集合
   - arguments 对象
   - NodeList 等 DOM 集合类型

6. 接收可迭代对象的原生语言特性包括：

   - for-of 循环
   - 数组解构
   - 扩展操作符
   - Array.from()
   - 创建集合
   - 创建映射
   - Promise.all() 接收由期约组成的可迭代对象
   - Promise.race() 接收由期约组成的可迭代对象
   - yield* 操作符，在生成器中使用

7. 迭代器协议：

   - `[Symbol.iterator]()` 迭代器入口
   - `next()` 由迭代器入口返回 next() 方法
   - `{ done: false, value: '' }` 由 next 返回一个对象，包含 done 和 value，done 为 true 和 value 为 undefined 时，代表迭代到了末尾
   - `return()` 指定在迭代器提前关闭时执行的逻辑

8. 生成器：拥有在一个函数块内暂停和恢复代码执行的能力

   - 函数声明：`function* g() {}`
   - 函数表达式：`let g = function* () {}`
   - 对象字面量：`let foo = { *g(){} }`
   - 类实例方法：`class Foo { *g(){} }`
   - 类静态方法：`class Foo { static *g(){} }`
   - 箭头函数不能用来定义生成器函数

9. 生成器对象

   - `yield` 关键字只能在生成器函数内部使用
   - `next()` 调用这个方法会让生成器开始或恢复执行
   - `return()` 提前终止迭代器
   - `throw()` 在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭

```js
function *g() {
  yield 1;
  yield 2;
  yield 3;
}
const gs = g();
gs.next(); // { done: false, value: 1 }
gs.next(); // { done: false, value: 2 }
gs.next(); // { done: false, value: 3 }
gs.next(); // { done: true, value: undefined }
```