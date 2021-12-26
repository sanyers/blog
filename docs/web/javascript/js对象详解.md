# js 对象详解

对象是一组属性的无序集合，组没有特定顺序的值。对象的每个属性或方法都由一个名称来标识，这个名称映射到一个值。

属性名通常是字符串，也可以是 Symbol。

## 1、理解对象

有两种方式创建自定义对象：

```js
// 使用 new Object
const person = new Object();
person.name = "xiaoming";
person.age = 29;
person.sayName = function() {
  console.log(this.name);
};

// 使用字面量
const persion = {
  name: "xiaoming",
  age: 29,
  sayName() {
    console.log(this.name);
  },
};
```

### 1.1 属性和属性描述符

```ts
interface PropertyDescriptor {
  configurable?: boolean; // 是否可以通过 delete 删除并重新定义，默认为 true
  enumerable?: boolean; // 是否可以通过 for-in 循环返回，默认为 true
  value?: any; // 包含属性实际的值，默认为 undefined
  writable?: boolean; // 是否可以被修改，默认为 true
  get?(): any; // 获取函数，在读取属性时调用。默认值为 undefined。
  set?(v: any): void; // 设置函数，在写入属性时调用。默认值为 undefined。
}
```

数据属性包含：

- `configurable`
- `enumerable`
- `value`
- `writable`

访问器属性包含：

- `configurable`
- `enumerable`
- `get()`
- `set()`

（1）读写方法：

- `Object.defineProperty()` 修改或定义属性默认特性
- `Object.defineProperties()` 修改或定义多个属性默认特性
- `Object.getOwnPropertyDescriptor()` 获取属性描述符
- `Object.getOwnPropertyDescriptors()` 获取所有属性描述符

```js
let person = {
  name: "xiaoming",
};
Object.defineProperty(person, "name", {
  writable: false,
});
console.log(person.name); // xiaoming
person.name = "zhangsi";
console.log(person.name); // xiaoming

console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {
//   value: 'xiaoming',
//   writable: false,
//   enumerable: true,
//   configurable: true
// }

// 如果是空对象进行 Object.defineProperty 设置值，那么所有描述符默认都是 false
let test = {};
Object.defineProperty(test, "name", {
  value: "xiaoli",
});
console.log(Object.getOwnPropertyDescriptor(test, "name"));
// {
//   value: 'xiaoli',
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

// 再次调用 Object.defineProperty 会报错
Object.defineProperty(test, "name", {
  value: "zhang",
});
// TypeError: Cannot redefine property: name
```

（2）使用 `get() set()` 函数

```js
const book = {
  year: 2017,
  name: "ES2017",
};
Object.defineProperty(book, "year", {
  get() {
    return this._year || void 0; // 定义一个伪私有成员，否则会出现栈溢出（Uncaught RangeError: Maximum call stack size exceeded）
  },
  set(newValue) {
    if (newValue > 2017) {
      this._year = newValue;
      this.name = "ES" + newValue;
    } else {
      this.name = "No year";
    }
  },
});

book.year = 2020;
console.log(book.year, book.name); // 2020 ES2020

book.year = 2015;
console.log(book.year, book.name); // undefined No year
```

（3）定义多个属性

```js
const book = {};
Object.defineProperties(book, {
  _year: {
    value: 2017,
  },
  name: {
    value: "ES2017",
  },
  year: {
    get() {
      return this._year;
    },
    set(newValue) {
      if (newValue > 2017) {
        this._year = newValue;
        this.name = "ES" + newValue;
      } else {
        this.name = "No year";
      }
    },
  },
});

console.log(books.year, books.name); // 2017 ES2017
```

### 1.2 合并对象

把源对象所有的本地属性一起复制到目标对象上，也被称为“混入”（mixin）

ES6 提供 `Object.assign()` 方法合并对象

```js
const a = {
  title: "test",
  desc: "hello",
};

const b = {
  desc: "world",
  person: {
    name: "xiaoming",
    age: 19,
  },
};

Object.assign(a, b);
console.log(a); // desc 属性被最后一次覆盖
// { title: 'test', desc: 'world', person: { name: 'xiaoming', age: 19 } }

a.person.age = 20; // 修改引用属性，源对象也会改变
console.log(b);
// { desc: 'world', person: { name: 'xiaoming', age: 20 } }
```

### 1.3 对象标识及相等判定

在 ES6 之前，有些特殊情况即使是===操作符也无能为力：

```js
// 这些是===符合预期的情况
console.log(true === 1); // false 
console.log({} === {}); // false 
console.log("2" === 2); // false 

// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true 
console.log(+0 === 0); // true 
console.log(-0 === 0); // true

// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN() 
console.log(NaN === NaN); // false 
console.log(isNaN(NaN)); // true
```

ES6 规范新增了 `Object.is()` 方法

```js
console.log(Object.is(true, 1)); // false 
console.log(Object.is({}, {})); // false 
console.log(Object.is("2", 2)); // false 

// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false 
console.log(Object.is(+0, 0)); // true 
console.log(Object.is(-0, 0)); // false 

// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true

// 要检查超过两个值，递归地利用相等性传递即可
function recursivelyCheckEqual(x, ...rest) { 
 return Object.is(x, rest[0]) && 
 (rest.length < 2 || recursivelyCheckEqual(...rest)); 
} 
```

### 1.4 增强的语法

（1）属性值简写

```js
let name = 'Matt'; 
let person = { 
 name 
}; 
console.log(person); // { name: 'Matt' }
```

（2）可计算属性

```js
// 示例1
const nameKey = 'name'; 
const ageKey = 'age';
const jobKey = 'job'; 

let person = {}; 
person[nameKey] = 'Matt'; 
person[ageKey] = 27; 
person[jobKey] = 'Software engineer'; 
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' } 

// 示例2
let person = { 
 [nameKey]: 'Matt', 
 [ageKey]: 27, 
 [jobKey]: 'Software engineer' 
}; 
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' } 

// 示例3
let uniqueToken = 0; 
function getUniqueKey(key) { 
 return `${key}_${uniqueToken++}`; 
} 

let person = { 
 [getUniqueKey(nameKey)]: 'Matt', 
 [getUniqueKey(ageKey)]: 27, 
 [getUniqueKey(jobKey)]: 'Software engineer' 
}; 
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

（3）简写方法名

```js
let person = { 
 sayName(name) { 
  console.log(`My name is ${name}`); 
 } 
}; 
person.sayName('Matt'); // My name is Matt

// 简写方法名与可计算属性键相互兼容
const methodKey = 'sayName'; 
let person = { 
 [methodKey](name) { 
  console.log(`My name is ${name}`); 
 } 
} 
person.sayName('Matt'); // My name is Matt 
```

### 1.5 对象解构

```js
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name: personName, age: personAge } = person; 
console.log(personName); // Matt 
console.log(personAge); // 27
```

## 2、创建对象

虽然使用 Object 构造函数或对象字面量可以方便地创建对象，但这些方式也有明显不足：创建具有同样接口的多个对象需要重复编写很多代码。

### 2.1 工厂模式

用于抽象创建特定对象的过程

```js
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
  console.log(this.name); 
 }; 
 return o; 
} 
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor");
```

工厂函数没有解决对象标识问题，即新创建的对象是什么类型

### 2.2 构造函数模式

按照惯例，构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头。

```js
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
  console.log(this.name); 
 }; 
}

let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 

console.log(person1.constructor == Person); // true 
console.log(person2.constructor == Person); // true

console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
console.log(person2 instanceof Object); // true 
console.log(person2 instanceof Person); // true
```

和工厂函数的区别：

- 没有显式地创建对象。
- 属性和方法直接赋值给了 this。
- 没有 return。

要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。

- (1) 在内存中创建一个新对象。
- (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
- (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
- (4) 执行构造函数内部的代码（给新对象添加属性）。
- (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

（1）构造函数也是函数

构造函数与普通函数唯一的区别就是调用方式不同，任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

```js
// 作为构造函数 
let person = new Person("Nicholas", 29, "Software Engineer"); 
person.sayName(); // "Nicholas" 

// 作为函数调用
Person("Greg", 27, "Doctor"); // 添加到 window 对象
window.sayName(); // "Greg" 

// 在另一个对象的作用域中调用
let o = new Object(); 
Person.call(o, "Kristen", 25, "Nurse"); 
o.sayName(); // "Kristen"
```

（2）构造函数的问题

构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。

```js
console.log(person1.sayName == person2.sayName); // false 
 
```

要解决这个问题，可以把函数定义转移到构造函数外部：

```js
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = sayName; 
} 
function sayName() { 
 console.log(this.name); 
} 
```

这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。这个新问题可以通过原型模式来解决。

### 2.3 原型模式

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。

```js
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 

let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true
```

（1）理解原型

无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构造函数。

每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构造函数的原型对象。脚本中没有访问这个[[Prototype]]特性的标准方式，但 Firefox、Safari 和 Chrome 会在每个对象上暴露`__proto__`属性，通过这个属性可以访问对象的原型。

```js
function Person() {} 

console.log(typeof Person.prototype); // object
console.log(Person.prototype);
// { constructor:f Person() }
// [[Prototype]]: Object

console.log(Person.prototype.constructor === Person); // true

console.log(Person.prototype.__proto__ === Object.prototype); // true 
console.log(Person.prototype.__proto__.constructor === Object); // true 
console.log(Person.prototype.__proto__.__proto__ === null); // true

let person1 = new Person(), 
 person2 = new Person();

// 构造函数、原型对象和实例，是 3 个完全不同的对象
console.log(person1 !== Person); // true 
console.log(person1 !== Person.prototype); // true 
console.log(Person.prototype !== Person); // true 

console.log(person1.__proto__ === Person.prototype); // true 
conosle.log(person1.__proto__.constructor === Person); // true
console.log(person1.__proto__ === person2.__proto__); // true
```

`isPrototypeOf()` 方法确定两个对象之间的关系

```js
console.log(Person.prototype.isPrototypeOf(person1)); // true 
console.log(Person.prototype.isPrototypeOf(person2)); // true 
```

`Object.getPrototypeOf()` 返回参数的内部特性[[Prototype]]的值。
`Object.setPrototypeOf()` 向实例的私有特性[[Prototype]]写入一个新值，以重写一个对象的原型继承关系
`Object.create()` 创建一个新对象，同时为其指定原型

```js
console.log(Object.getPrototypeOf(person1) == Person.prototype); // true 
console.log(Object.getPrototypeOf(person1).name); // "Nicholas" 

let biped = { 
 numLegs: 2 
}; 
let person = { 
 name: 'Matt' 
}; 
Object.setPrototypeOf(person, biped); 
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true

// 为避免使用 Object.setPrototypeOf() 可能造成的性能下降，可以通过 Object.create() 来创建一个新对象
let biped = { 
 numLegs: 2 
}; 
let person = Object.create(biped); 
person.name = 'Matt'; 
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true
```

（2）原型层级

在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。

```js
function Person() {}
Person.prototype.name = "Nicholas";

let person1 = new Person(); 
let person2 = new Person();

// 覆盖属性
person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例
console.log(person2.name); // "Nicholas"，来自原型

// 覆盖属性为 null
person1.name = null; 
console.log(person1.name); // null，来自实例
console.log(person2.name); // "Nicholas"，来自原型

// 删除属性
delete person1.name; 
console.log(person1.name); // "Nicholas"，来自原型
```

`hasOwnProperty()` 方法用于确定某个属性是在实例上还是在原型对象上。

```js
function Person() {}
Person.prototype.name = "Nicholas";

let person1 = new Person(); 
let person2 = new Person(); 
console.log(person1.hasOwnProperty("name")); // false

person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例
console.log(person1.hasOwnProperty("name")); // true

console.log(person2.name); // "Nicholas"，来自原型
console.log(person2.hasOwnProperty("name")); // false
```

（3） 原型和 in 操作符

有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。

在单独使用时，in 操作符会在可以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上。

```js
function Person() {}
Person.prototype.name = "Nicholas";

let person1 = new Person(); 
let person2 = new Person(); 

console.log(person1.hasOwnProperty("name")); // false 
console.log("name" in person1); // true 

person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例
console.log(person1.hasOwnProperty("name")); // true 
console.log("name" in person1); // true 
```

如果要确定某个属性是否存在于原型上，则可以像下面这样同时使用 hasOwnProperty() 和 in 操作符

```js
function hasPrototypeProperty(object, name){ 
 return !object.hasOwnProperty(name) && (name in object); 
} 
```

- `Object.keys()` 获取对象上所有可枚举的实例属性
- `Object.getOwnPropertyNames()` 获取对象上所有实例属性，无论是否可枚举
- `Object.getOwnPropertySymbols()` 获取所有符号枚举

```js
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let keys = Object.keys(Person.prototype); 
console.log(keys); // "name,age,job,sayName"

let keys = Object.getOwnPropertyNames(Person.prototype); 
console.log(keys); // "[constructor,name,age,job,sayName]"

let k1 = Symbol('k1'), 
 k2 = Symbol('k2');

 let o = { 
 [k1]: 'k1', 
 [k2]: 'k2' 
}; 
console.log(Object.getOwnPropertySymbols(o)); 
// [Symbol(k1), Symbol(k2)]
```

（4）属性枚举顺序

枚举顺序不确定，取决于 JavaScript 引擎，可能因浏览器而异：

- `for-in`
- `Object.keys()`

枚举顺序是确定性的：

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.assign()`

### 2.4 对象迭代、组装、冻结

ECMAScript 2017 新增了两个静态方法，用于将对象内容转换为序列化的——更重要的是可迭代的——格式。

- `Object.values()` 接收一个对象，返回对象值的数组（浅复制）
- `Object.entries()` 接收一个对象，返回键/值对的数组（浅复制）
- `Object.fromEntries()` 与 `Object.entries()` 相反
- `Object.freeze()` 使对象完全不可变：无法更改属性、添加属性或更改其原型（浅冻结，只有属性被冻结，而不是存储在属性中的对象）

```js
const o = { 
 foo: 'bar', 
 baz: 1, 
 qux: {} 
}; 
console.log(Object.values(o)); // ["bar", 1, {}]

console.log(Object.entries((o))); 
// [["foo", "bar"], ["baz", 1], ["qux", {}]]

const f = Object.fromEntries([['foo',1], ['bar',2]]);
console.log(f); // {foo:1,bar:2}

const frozen = Object.freeze({ x: 2, y: 5, z: { a: 1, b: 4} });
frozen.x = 3;
frozen.z.a = 'aa';
console.log(frozen);
// { x: 2, y: 5, z: { a: 'aa', b: 4 } }
```

可支持属性迭代方法：

|  | enumerable | non-e. | string | symbol |
| :----: | :----: | :----: | :----: | :----: |
| Object.keys() | ✔ |  | ✔ |  |  |
| Object.getOwnPropertyNames() | ✔ | ✔ | ✔ |  |
| Object.getOwnPropertySymbols() | ✔ | ✔ |  | ✔ |
| Reflect.ownKeys() | ✔ | ✔ | ✔ | ✔ |

### 2.5 原型语法

```js
function Person() {} 
Person.prototype = {
 name: "Nicholas", 
 constructor: Person, // 修改了 constructor 指回 Person，变成可枚举
 age: 29, 
 job: "Software Engineer", 
 sayName() { 
  console.log(this.name); 
 } 
}; 

// 恢复 constructor 属性
Object.defineProperty(Person.prototype, "constructor", { 
 enumerable: false, // 不可枚举
 value: Person 
}); 
```

原型的问题：

```js
function Person() {};

Person.prototype = {
  constructor: Person,
  age: 29,
  list: ['xiaoming', 'zhangsan']
}

const person1 = new Person();
const person2 = new Person();

person1.list.push('lisi');

console.log(person1.list); // 'xiaoming, zhangsan, lisi'
console.log(person2.list); // 'xiaoming, zhangsan, lisi'
console.log(person1.list === person2.list); // true 
```

## 3、继承

很多面向对象语言都支持两种继承：接口继承和实现继承。前者只继承方法签名，后者继承实际的方法。

实现继承是 JavaScript 唯一支持的继承方式，而这主要是通过原型链实现的。

### 3.1 原型链

通过原型继承多个引用类型的属性和方法

构造函数、原型和实例的关系：**每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。**

将原型指向另一个类型的实例就是原型链：

```js
function SuperType() { 
 this.property = true; 
} 

SuperType.prototype.getSuperValue = function() { 
 return this.property; 
}; 

function SubType() { 
 this.subproperty = false; 
} 

// 继承 SuperType 
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () { 
  return this.subproperty;
}

let instance = new SubType(); 
console.log(instance.getSuperValue()); // true 
```

（1）默认继承

默认情况下，所有引用类型都继承自 Object。Objcet 原型为 null

（2）原型与继承关系

原型与实例的关系可以通过两种方式来确定：

- 使用 instanceof 操作符
- 使用 isPrototypeOf() 方法

```js
console.log(instance instanceof Object); // true 
console.log(instance instanceof SuperType); // true 
console.log(instance instanceof SubType); // true 

console.log(Object.prototype.isPrototypeOf(instance)); // true 
console.log(SuperType.prototype.isPrototypeOf(instance)); // true 
console.log(SubType.prototype.isPrototypeOf(instance)); // true 
```

（3）原型链的问题

- 原型中包含的引用值会在所有实例间共享
- 子类型在实例化时不能给父类型的构造函数传参

### 3.2 盗用构造函数

在子类构造函数中调用父类构造函数。

```js
function SuperType(name) { 
 this.colors = ["red", "blue", "green"];
 this.name = name;
} 

function SubType(name) { 
 // 继承 SuperType 
 SuperType.call(this,name); 
} 

let instance1 = new SubType('xiaoming'); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
console.log(instance1.name); // 'xiaoming'

let instance2 = new SubType('zhangsan'); 
console.log(instance2.colors); // "red,blue,green" 
console.log(instance2.name); // 'zhangsan'
```

盗用构造函数的问题：

- 必须在构造函数中定义方法，否则函数不能重用
- 子类也不能访问父类原型上定义的方法

### 3.3 组合继承

组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，

是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```js
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
}

SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 

function SubType(name, age){ 
  // 继承属性
  SuperType.call(this, name); 
  this.age = age; 
} 

// 继承方法
SubType.prototype = new SuperType(); 

SubType.prototype.sayAge = function() { 
  console.log(this.age); 
}; 

let instance1 = new SubType("Nicholas", 29); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "Nicholas"; 
instance1.sayAge(); // 29 

let instance2 = new SubType("Greg", 27); 
console.log(instance2.colors); // "red,blue,green" 
instance2.sayName(); // "Greg"; 
instance2.sayAge(); // 27 
```

### 3.4 原型式继承

```js
function object(o) { 
  function F() {} 
  F.prototype = o; 
  return new F(); 
} 

let person = { 
  name: "Nicholas", 
  friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = object(person); 
anotherPerson.name = "Greg"; 
anotherPerson.friends.push("Rob"); 

let yetAnotherPerson = object(person); 
yetAnotherPerson.name = "Linda"; 
yetAnotherPerson.friends.push("Barbie"); 
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

ES5 新增 Object.create() 可创建原型继承

```js
let person = { 
  name: "Nicholas", 
  friends: ["Shelby", "Court", "Van"] 
}; 

let anotherPerson = Object.create(person); 
anotherPerson.name = "Greg"; 
anotherPerson.friends.push("Rob"); 

let yetAnotherPerson = Object.create(person); 
yetAnotherPerson.name = "Linda"; 
yetAnotherPerson.friends.push("Barbie"); 
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie" 
```

Object.create() 的第二个参数与 Object.defineProperties() 的第二个参数一样：

```js
let person = { 
  name: "Nicholas", 
  friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = Object.create(person, { 
 name: { 
  value: "Greg" 
 } 
}); 
console.log(anotherPerson.name); // "Greg" 
```

### 3.5 寄生式继承

创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。就是寄生式继承

```js
function createAnother(original){ 
  let clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function() { // 以某种方式增强这个对象
    console.log("hi"); 
  }; 
  return clone; // 返回这个对象
} 

let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = createAnother(person); 
anotherPerson.sayHi(); // "hi" 
```

> 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似

### 3.6 寄生式组合继承

主要解决组合继承的是父类构造函数始终会被调用两次

```js
function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 

SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 

function SubType(name, age){ 
 SuperType.call(this, name); // 第二次调用 SuperType() 
 this.age = age; 
} 

SubType.prototype = new SuperType(); // 第一次调用 SuperType() 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
}; 
```

寄生式组合继承：

```js
function inheritPrototype(subType, superType) { 
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象 
  subType.prototype = prototype; // 赋值对象
} 

function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 

function SubType(name, age) { 
 SuperType.call(this, name); 
  this.age = age; 
} 

inheritPrototype(SubType, SuperType); 

SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```

## 4、类

### 4.1 类的定义