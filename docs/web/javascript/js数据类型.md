# JavaScript 数据类型

JavaScript 数据类型分为两种：
1. **简单数据类型**（也称为原始类型）：一共有 7 种简单类型，**String**(字符串)，**Number**(数字)，**BigInt**(任意大整数)，**Boolean**(布尔值)，**Null**(空值)，**Undefined**(未定义)，**Symbol**(符号)。
2. **复杂数据类型**（引用类型）：**Object**(对象)。

Symbol（符号）是 ES6 新增的。

Object 是一种无序名值对的集合。因为在 ECMAScript 中不能定义自己的数据类型，所有值都可以用上述 7 种数据类型之一来表示。只有 7 种数据类型似乎不足以表示全部数据。但 JavaScript 的数据类型很灵活，一种数据类型可以当作多种数据类型来使用

<a data-fancybox title="JavaScript 的类型层次结构" href="/img/web/js/page_4.png"><img :src="$withBase('/img/web/js/page_4.png')" alt="JavaScript 的类型层次结构"></a>

## 1、两种数据类型的区别

### 1.1 在内存中的存储方式
- 原始类型把数据名和值直接存储在栈当中
- 引用类型在栈中存储数据名和一个堆的地址，在堆中存储属性及值。访问时先从栈获取地址，再到堆中拿出相应的值。

原始类型存储的是值，引用类型存储的是地址（指针）。

当你创建了一个引用类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

```js
let a = 'abcd';
let b = 1234;
let c = new Object();
c.name = 'xiaoming';
c.age = 18;
```

<div class="img-page">
<a data-fancybox title="变量存储方式" href="/img/web/js/page_1.png"><img :src="$withBase('/img/web/js/page_1.png')" alt="变量存储方式"></a>
</div>

### 1.2 复制值

- 通过变量把原始类型的值赋值给另外一个变量时，原始类型的值会被复制到新变量的位置。
- 通过变量把引用类型的值赋值给另外一个变量时，复制的是原本变量的地址（指针），当我们进行数据修改的时候，就会修改存放在地址（指针） 上的值。

原始类型：
```js
let a = 'abcd';
let b = a;
```

这两个变量可以独立使用，互不干扰。如图所示：

<div class="img-page">
<a data-fancybox title="原始类型复制" href="/img/web/js/page_2.png"><img :src="$withBase('/img/web/js/page_2.png')" alt="原始类型复制"></a>
</div>

引用类型：
```js
let a = {};
let b = a;
a.name = 'xiaoming';
console.log(b.name); // "xiaoming"
```

引用类型其实复制的是指针地址，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象，因此一个对象上面的变化会在另一个对象上反映出来。

如下图展示了变量与堆内存中对象之间的关系：

<div class="img-page">
<a data-fancybox title="引用类型复制" href="/img/web/js/page_3.png"><img :src="$withBase('/img/web/js/page_3.png')" alt="引用类型复制"></a>
</div>

### 1.3 传递参数

JavaScript 中所有函数的参数都是**按值传递**的。这意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样。

- 在按值传递参数时，值会被复制到一个局部变量
- 在按引用传递参数时，值在内存中的位置会被保存在一个局部变量，这意味着对本地变量的修改会反映到函数外部。

原始类型按值传递：
```js
// 按值传递
function addTen(num) {
  num += 10;
  return num;
}

let count = 20;
let result = addTen(count); 
console.log(count); // 20，没有变化
console.log(result); // 30

```

引用类型按引用传递：
```js
function setName(obj) { 
 obj.name = "Nicholas"; 
}

let person = new Object(); 
setName(person);
console.log(person.name); // "Nicholas"

```

修改过后引用类型按值传递：
```js
function setName(obj) { 
 obj.name = "Nicholas"; 
 obj = new Object(); 
 obj.name = "Greg"; 
} 
let person = new Object(); 
setName(person); 
console.log(person.name); // "Nicholas" 
```

上面例子表明函数中参数的值改变之后，原始的引用仍然没变。当 obj 在函数内部被重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。

>JavaScript 中函数的参数就是**局部变量**。

## 2、判断数据类型

类型检查有三种方式，分别为 ```typeof```、```instanceof``` 和 ```Object.prototype.toString()```。

按照定义，所有引用类型都是 Object 的实例，因此通过 instanceof 操作符检测任何引用类型和 Object 构造函数都会返回 true。类似地，如果用 instanceof 检测原始值，则始终会返回 false，因为原始值不是对象。

通过 typeof 操作符来判断一个值属于哪种原始类型。

```js
typeof 'seymoe' // 'string'
typeof true // 'boolean'
typeof 10 // 'number'
typeof Symbol() // 'symbol'
typeof null // 'object' 无法判定是否为 null
typeof undefined // 'undefined'
typeof {} // 'object'
typeof [] // 'object'
typeof(() => {}) // 'function'
```

通过 instanceof 操作符可以对引用类型进行判定。

```js
[] instanceof Array // true
({}) instanceof Object // true
(()=>{}) instanceof Function // true

[] instanceof Object // true
{} instanceof Object // true
```

通过 Object.prototype.toString() 可以判定 JavaScript 中所有数据类型

```js
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(() => {}) // '[object Function]'
Object.prototype.toString.call('seymoe') // '[object String]'
Object.prototype.toString.call(1) // '[object Number]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call(Symbol()) // '[object Symbol]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call(undefined) // '[object Undefined]'

Object.prototype.toString.call(new Date()) // '[object Date]'
Object.prototype.toString.call(Math) // '[object Math]'
Object.prototype.toString.call(new Set()) // '[object Set]'
Object.prototype.toString.call(new WeakSet()) // '[object WeakSet]'
Object.prototype.toString.call(new Map()) // '[object Map]'
Object.prototype.toString.call(new WeakMap()) // '[object WeakMap]'
```

- 该方法本质就是依托Object.prototype.toString() 方法得到对象内部属性 [[Class]]
- 传入原始类型却能够判定出结果是因为对值进行了包装
- null 和 undefined 能够输出结果是内部实现有做处理

## 3、原始类型

### 3.1 String 类型
String（字符串）数据类型表示零或多个 16 位 Unicode 字符序列。字符串可以使用双引号（"）、单引号（'）或反引号（`）标示。
```js
let a = "xiaoming"; 
let b = 'xiaozhang'; 
let c = `xiaoli` 
```

### 3.2 Number 类型
Number（数值）数据类型使用 IEEE 754 格式表示整数和浮点值（在某些语言中也叫双精度值）。使用 0x 或 0X 开头表示十六进制

```js
console.log(1234); // 整数 1234
console.log(12.34); // 浮点值 12.34
console.log(0xA); // 十六进制 10 
console.log(0XABCDEFA); // 十六进制 180150010 
```

在 ES6+ 版本中，可以使用 0b 或 0B 表示二进制，使用 0o 或 0O 表示八进制

```js
console.log(0b10101); // 二进制 21
console.log(0B10101); // 二进制 21

console.log(0o30); // 八进制 24
console.log(0O30); // 二进制 24
```

可以在数字字面值中使用下划线将长字面值分解成更容易阅读的块

```js
console.log(1_000_000_000); // 1000000000
console.log(0x89_AB_CD_EF); // 2309737967
```

### 3.3 BigInt 类型

BigInt 可以表示任意大的整数。其语法如下：

```js
BigInt(value);
```

其中 value 是创建对象的数值。可以是字符串或者整数。

在 JavaScript 中，Number 基本类型可以精确表示的最大整数是2^53。因此早期会有这样的问题：

```js
let max = Number.MAX_SAFE_INTEGER; // 最大安全整数

let max1 = max + 1
let max2 = max + 2

max1 === max2 // true
```

有了 BigInt 之后，这个问题就不复存在了：

```js
let max = BigInt(Number.MAX_SAFE_INTEGER);

let max1 = max + 1n
let max2 = max + 2n

max1 === max2 // false
```
>按位操作符通常用于 BigInt 操作数。但是，Math 对象的函数都不接受 BigInt 操作数。

### 3.4 Boolean 类型
Boolean（布尔值）类型是 JavaScript 中使用最频繁的类型之一，有两个字面值：true 和 false。

### 3.5 Null 类型
Null 类型只有一个值，即特殊值 null。逻辑上讲，null 值表示一个空对象指针，这也是给 typeof 传一个 null 会返回"object"的原因。

在定义将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。

undefined 值是由 null 值派生而来的，因此 ECMA-262 将它们定义为表面上相等：

```console.log(null == undefined); // true```

### 3.6 Undefined 类型
Undefined 类型只有一个值，就是特殊值 undefined。当使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值：

```js
let a; 
console.log(a == undefined); // true

let b = undefined; 
console.log(b == undefined); // true
```

### 3.7 Symbol 类型

Symbol（符号）是 ES6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。

符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

尽管听起来跟私有属性有点类似，但符号并不是为了提供私有属性的行为才增加的（尤其是因为Object API 提供了方法，可以更方便地发现符号属性）。相反，符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。

1. 简单使用

```js
let sym = Symbol(); 
console.log(typeof sym); // symbol
```

2. 常用内置符号

ES6 引入了一批**常用内置符号**（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。

这些内置符号最重要的用途之一是重新定义它们，从而改变原生结构的行为。

 - Symbol.asyncIterator 
 - Symbol.hasInstance
 - Symbol.isConcatSpreadable
 - Symbol.iterator
 - Symbol.match
 - Symbol.replace
 - Symbol.search
 - Symbol.species
 - Symbol.split
 - Symbol.toPrimitive
 - Symbol.toStringTag
 - Symbol.unscopables

[详情介绍](Symbol.md)

## 4、引用类型
引用值（或者对象）是某个特定引用类型的实例。在 JavaScript 中，引用类型是把数据和功能组织到一起的结构，经常被人错误地称作“类”。

引用类型有时候也被称为**对象定义**，因为它们描述了自己的对象应有的属性和方法

新对象通过使用 new 操作符后跟一个**构造函数**（constructor）来创建。构造函数就是用来创建新对象的函数。

```let obj = new Object(); ```

> 函数也是一种引用类型

### 4.1 基本引用类型

#### 4.1.1 Date
JavaScript 的 Date 类型参考了 Java 早期版本中的 java.util.Date。为此，Date 类型将日期保存为自协调世界时（UTC，Universal Time Coordinated）时间 1970 年 1 月 1 日午夜（零时）至今所经过的毫秒数。使用这种存储格式，Date 类型可以精确表示 1970 年 1 月 1 日之前及之后 285 616 年的日期

要创建日期对象，就使用 new 操作符来调用 Date 构造函数：

``` let now = new Date();  ```

#### 4.1.2 RegExp
JavaScript 通过 RegExp 类型支持正则表达式。正则表达式使用类似 Perl 的简洁语法来创建：

``` let expression = /pattern/flags;  ```

#### 4.1.3 原始值包装类型
为了方便操作原始值，ECMAScript 提供了 3 种特殊的引用类型：Boolean、Number 和 String。

使用原始值包装类型可以让原始值拥有对象的行为：

```js
let s1 = new String("some text");
let s2 = s1;
s1.name = 'xiaoming';
console.log(s2); // [String: 'some text'] { name: 'xiaoming' }

let n1 = new Number("1234");
let n2 = n1;
n1.name = 'xiaoli';
console.log(n2); // [Number: 1234] { name: 'xiaoli' }

let b1 = new Boolean(true);
let b2 = b1;
b1.name = 'xiaozhang';
console.log(b2); // [Boolean: true] { name: 'xiaozhang' }
```

转换类型和构造函数：

```js
let a = "1234"; 
let num = Number(a); // 转型函数
console.log(typeof num); // "number" 
let obj = new Number(a); // 构造函数
console.log(typeof obj); // "object"
```

#### 4.1.4 单例内置对象
在程序开始执行时就存在的对象，这就意味着，开发者不用显式地实例化内置对象，因为它们已经实例化好了。前面我们已经接触了大部分内置对象，包括 Object、Array 和 String。

另外两个单例内置对象：Global 和 Math。

1. Global

Global 对象是 JavaScript 中最特别的对象，因为代码不会显式地访问它。。ECMA-262 规定 Global对象为一种兜底对象，它所针对的是不属于任何对象的属性和方法。

在全局作用域中定义的变量和函数都会变成 Global 对象的属性。

```js
var color = "red"; 
function sayColor() { 
 console.log(window.color); 
} 
window.sayColor(); // "red"
```

2. Math

JavaScript 提供了 Math 对象作为保存数学公式、信息和计算的地方。Math 对象提供了一些辅助计算的属性和方法。

> Math 对象上提供的计算要比直接在 JavaScript 实现的快得多，因为 Math 对象上的计算使用了 JavaScript 引擎中更高效的实现和处理器指令。但使用 Math 计算的问题是精度会因浏览器、操作系统、指令集和硬件而异。

```js
let max = Math.max(3, 54, 32, 16); 
console.log(max); // 54
```

### 4.2 集合引用类型

#### 4.2.1 Object
大多数引用值的示例使用的是 Object 类型。Object 是 ECMAScript 中最常用的类型之一。

显式地创建 Object 的实例有两种方式。

第一种是使用 new 操作符和 Object 构造函数：
```js
let person = new Object(); 
person.name = "xiaoming"; 
person.age = 18; 
```

第二种是使用**对象字面量**（object literal）表示法。对象字面量是对象定义的简写形式，目的是为了简化包含大量属性的对象的创建。如下表示：
```js
let person = { 
 name: "xiaoming", 
 age: 18 
}; 
```

#### 4.2.2 Array
JavaScript 数组是一组有序的数据，数组中每个槽位可以存储任意类型的数据。这意味着可以创建一个数组，它的第一个元素是字符串，第二个元素是数值，第三个是对象。ECMAScript 数组也是动态大小的，会随着数据添加而自动增长。

有几种基本的方式可以创建数组。

- 一种是使用 Array 构造函数：

``` let colors = new Array(); ```

- 另一种创建数组的方式是使用数组字面量（array literal）表示法：

``` let colors = ["red", "blue", "green"]; ```

#### 4.2.3 定型数组
定型数组（typed array）是 JavaScript 新增的结构，目的是提升向原生库传输数据的效率。

1. ArrayBuffer

允许 JavaScript 运行时访问一块名为 ArrayBuffer 的预分配内存。ArrayBuffer 是所有定型数组及视图引用的基本单位。

ArrayBuffer 一经创建就不能再调整大小。

2. DataView

这个视图专为文件 I/O 和网络 I/O 设计，其API 支持对缓冲数据的高度控制，但相比于其他类型的视图性能也差一些。DataView 对缓冲内容没有任何预设，也不能迭代。

#### 4.2.4 Map
Map 是 ES6 新增特性，Map 是一种新的集合类型。Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异。

使用 new 关键字和 Map 构造函数可以创建一个空映射：

``` const m = new Map(); ```

#### 4.2.5 对比 Object 和 Map
1. 内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量
都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。
不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

2. 插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快
一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操
作，那么显然 Map 的性能更佳。

3. 查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，
则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏
览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，
查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选
择 Object 更好一些。

4. 删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，
出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一
种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。
如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。 

#### 4.2.6 WeakMap

ES6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。

``` const wm = new WeakMap(); ```

#### 4.2.7 Set

ES6 新增的 Set 是一种新集合类型，为这门语言带来集合数据结构。Set 在很多方面都像是加强的 Map，这是因为它们的大多数 API 和行为都是共有的。

使用 new 关键字和 Set 构造函数可以创建一个空集合：

``` const m = new Set();  ```

#### 4.2.8 WeakSet

ES6 新增的“弱集合”（WeakSet）是一种新的集合类型，为这门语言带来了集合数据结构。WeakSet 是 Set 的“兄弟”类型，其 API 也是 Set 的子集。WeakSet 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱集合”中值的方式

可以使用 new 关键字实例化一个空的 WeakSet：

``` const ws = new WeakSet();  ```

WeakSet 中“weak”表示弱集合的值是“弱弱地拿着”的。意思就是，这些值不属于正式的引用，不会阻止垃圾回收。

## 5、总结

1. 数据类型分两种：原始类型和引用类型

2. 原始类型有 6 种：String(字符串)，Number(数值)，Boolean(布尔值)，Null(空值)，Undefined(未定义)，Symbol(符号)。

3. 引用类型有：Object(对象)。

4. 原始类型存储的是值，引用类型存储的是地址（指针）。

5. 引用类型复制时，复制的是原本变量的地址（指针）。

6. JavaScript 中所有函数的参数都是按值传递的。函数的参数就是局部变量。

7. 判断类型有 2 种：typeof 和 instanceof。

8. 引用类型有：基本引用类型和集合引用类型。

## 6、参考
《JavaScript高级程序设计(第4版)》