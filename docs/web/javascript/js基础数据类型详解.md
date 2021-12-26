# js基础数据类型详解

JavaScript 有 7 种基础数据类型（也称为**原始类型**），String、Number、BigInt、Boolean、Null、Undefined 和 Symbol。

## 1、String 字符串

String（字符串）数据类型表示零或多个 16 位 Unicode 字符序列。字符串可以使用双引号（"）、单引号（'）或反引号（`）标示，因此下面的代码都是合法的：

```js
let firstName = "John"; 
let lastName = 'Jacob'; 
let lastName = `Jingleheimerschmidt`;
```

>注意：以某种引号作为字符串开头，必须仍然以该种引号作为字符串结尾。

``` let firstName = 'Nicholas"; // 语法错误：开头和结尾的引号必须是同一种 ```

### 1.1 字符字面量
字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符，如下表所示：

字面量|含义
--|:--:|
\n | 换行
\t | 制表
\b | 退格
\r | 回车
\f | 换页
\\\ | 反斜杠
\\' | 单引号
\\" | 双引号
\\` | 反引号
\xnn | 以十六进制编码 nn 表示的字符（其中 n 是十六进制数字 0~F），例如 \x41 等于 "A"
\unnn | 以十六进制编码 nnnn 表示的 Unicode 字符（其中 n 是十六进制数字 0~F），例如 \u03a3 等于希腊字符 "Σ"

### 1.2 字符串的特点

ECMAScript 中的字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量，如下所示：

```js
let lang = "Java";
lang = lang + "Script";
```

### 1.3 转换为字符串

toString() 方法可见于数值、布尔值、对象和字符串值。该方法只是简单地返回自身的一个副本。） null 和 undefined 值没有 toString() 方法。

默认情况下， toString() 返回数值的十进制字符串表示。而通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基数的字符串表示

如果你不确定一个值是不是 null 或 undefined ，可以使用 String() 转型函数，它始终会返回表示相应类型值的字符串。 String() 函数遵循如下规则。

- 如果值有 toString() 方法，则调用该方法（不传参数）并返回结果。
- 如果值是 null ，返回 "null" 。
- 如果值是 undefined ，返回 "undefined" 。

### 1.4 模板字面量

ES6 新增了使用模板字面量定义字符串的能力。与使用单引号或双引号不同，模板字面量保留换行字符，可以跨行定义字符串：

```js
let myMultiLineTemplateLiteral = `first line
second line`;
```

### 1.5 字符串插值

模板字面量不是字符串，而是一种特殊的 JavaScript 句法表达式，只不过求值后得到的是字符串。字符串插值通过在 ${} 中使用一个 JavaScript 表达式实现：

```js
let interpolatedTemplateLiteral =
`${ value } to the ${ exponent } power is ${ value * value }`;
```

所有插入的值都会使用 toString() 强制转型为字符串，而且任何 JavaScript 表达式都可以用于插值。嵌套的模板字符串无须转义

### 1.6 模板字面量标签函数

模板字面量也支持定义**标签函数**（tag function），而通过标签函数可以自定义插值行为。

```js
let num1 = 6;
let num2 = 7;

function foo (a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d)
}

foo`num1${num1}+num2${num2}=${num1 + num2}`
```

因为表达式参数的数量是可变的，所以通常应该使用剩余操作符（rest operator）将它们收集到一个数组中：

```js
function foo (a, ...b) {
    console.log(a);
    for(const item of b) {
        console.log(item);
    }
}

let a = 6;
let b = 9;
function zipTag(strings, ...expressions) {
return strings[0] +
expressions.map((e, i) => `${e}${strings[i + 1]}`)
.join('');
}
let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;
console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "6 + 9 = 15"
```

### 1.7 原始字符串

使用模板字面量也可以直接获取原始的模板字面量内容（如换行符或 Unicode 字符），而不是被转换后的字符表示。为此，可以使用默认的 String.raw 标签函数：

```js
// Unicode 示例
// \u00A9 是版权符号
console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); // \u00A9
```

## 2、Number 数值

Number 类型使用 IEEE 754 格式表示整数和浮点值（在某些语言中也叫双精度值）。不同的数值类型相应地也有不同的数值字面量格式。

最基本的数值字面量格式是十进制整数，直接写出来即可：

``` let intNum = 55; // 整数 ```

### 2.1 浮点值

要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字。虽然小数点前面不是必须有整数，但推荐加上。下面是几个例子：

```js
let floatNum1 = 1.1; 
let floatNum2 = 0.1; 
let floatNum3 = .1; // 有效，但不推荐
```

因为存储浮点值使用的内存空间是存储整数值的两倍，所以 ECMAScript 总是想方设法把值转换为整数。在小数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小数点后面跟着 0（如 1.0），那它也会被转换为整数，如下例所示：

```js
let floatNum1 = 1.; // 小数点后面没有数字，当成整数 1 处理
let floatNum2 = 10.0; // 小数点后面是零，当成整数 10 处理
```

对于非常大或非常小的数值，浮点值可以用科学记数法来表示。科学记数法用于表示一个应该乘以10 的给定次幂的数值。ECMAScript 中科学记数法的格式要求是一个数值（整数或浮点数）后跟一个大写或小写的字母 e，再加上一个要乘的 10 的多少次幂。比如：

```js
let floatNum1 = 3.125e7; // 等于 31250000 
let floatNum2 = 3e-17; // 等于 0.000 000 000 000 000 03
let floatNum3 = 3e-7; // 等于 0.000 000 3
```

浮点值的精确度最高可达 17 位小数，但在算术计算中远不如整数精确。例如，0.1 加 0.2 得到的不是 0.3，而是 0.300 000 000 000 000 04。由于这种微小的舍入错误，导致很难测试特定的浮点值。

比如下面的例子：

```js
if (a + b == 0.3) { // 别这么干！ 
 console.log("You got 0.3."); 
}
```

这里检测两个数值之和是否等于 0.3。如果两个数值分别是 0.05 和 0.25，或者 0.15 和 0.15，那没问题。但如果是 0.1 和 0.2，如前所述，测试将失败。因此永远不要测试某个特定的浮点值。

> 之所以存在这种舍入错误，是因为使用了 IEEE 754 数值，这种错误并非 ECMAScript 所独有。其他使用相同格式的语言也有这个问题。

解决办法：

（1）换成别的数字

```js
(0.1*10+0.2*10)/10 === 0.3
```

（2）保留小数位数

```js
parseFloat((0.1+0.2).toFixed(10)) === 0.3
```

### 2.2 值的范围

由于内存的限制，ECMAScript 并不支持表示这个世界上的所有数值。ECMAScript 可以表示的最小数值保存在 Number.MIN_VALUE 中，这个值在多数浏览器中是 5e324；可以表示的最大数值保存在Number.MAX_VALUE 中，这个值在多数浏览器中是 1.797 693 134 862 315 7e+308。

如果某个计算得到的数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正无穷大）表示。

如果计算返回正 Infinity 或负 Infinity，则该值将不能再进一步用于任何计算。这是因为Infinity 没有可用于计算的数值表示形式。要确定一个值是不是有限大（即介于 JavaScript 能表示的最小值和最大值之间），可以使用 isFinite()函数。

```js
let result = Number.MAX_VALUE + Number.MAX_VALUE; 
console.log(isFinite(result)); // false
```

### 2.3 NaN

有一个特殊的数值叫 NaN，意思是“不是数值”（Not a Number），用于表示本来要返回数值的操作失败了（而不是抛出错误）。比如，用 0 除任意数值在其他语言中通常都会导致错误，从而中止代码执行。但在 ECMAScript 中，0、+0 或0 相除会返回 NaN：

```js
console.log(0/0); // NaN 
console.log(-0/+0); // NaN 
```

如果分子是非 0 值，分母是有符号 0 或无符号 0，则会返回 Infinity 或-Infinity：

```js
console.log(5/0); // Infinity 
console.log(5/-0); // -Infinity 
```

NaN 不等于包括 NaN 在内的任何值。

```js
console.log(NaN == NaN); // false
```

为此，ECMAScript 提供了 isNaN() 函数。该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。

```js
console.log(isNaN(NaN)); // true 
console.log(isNaN(10)); // false，10 是数值
console.log(isNaN("10")); // false，可以转换为数值 10 
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值 1 
```

### 2.4 数值转换

有 3 个函数可以将非数值转换为数值：Number()、parseInt() 和 parseFloat()。Number() 是转型函数，可用于任何数据类型。后两个函数主要用于将字符串转换为数值。

#### 2.4.1 Number() 
Number() 函数基于如下规则执行转换。
- 布尔值，true 转换为 1，false 转换为 0。
- 数值，直接返回。
- null，返回 0。
- undefined，返回 NaN。
- 字符串，应用以下规则。
  - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面的零）。
  - 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
  - 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
  - 如果是空字符串（不包含字符），则返回 0。
  - 如果字符串包含除上述情况之外的其他字符，则返回 NaN。
- 对象，调用 valueOf() 方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString() 方法，再按照转换字符串的规则转换。

示例：

```js
let num1 = Number("Hello world!"); // NaN 
let num2 = Number(""); // 0 
let num3 = Number("000011"); // 11 
let num4 = Number(true); // 1
```

#### 2.4.2 parseInt()
parseInt() 函数更专注于字符串是否包含数值模式。字符串最前面的空格会被忽略，从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，parseInt() 立即返回 NaN。这意味着空字符串也会返回 NaN（这一点跟 Number() 不一样，它返回 0）。如果第一个字符是数值字符、加号或减号，则继续依次检测每个字符，直到字符串末尾，或碰到非数值字符。比如，"1234blue"会被转换为 1234，因为"blue"会被完全忽略。类似地，"22.5"会被转换为 22，因为小数点不是有效的整数字符。

下面几个转换示例有助于理解上述规则：

```js
let num1 = parseInt("1234blue"); // 1234 
let num2 = parseInt(""); // NaN 
let num3 = parseInt("0xA"); // 10，解释为十六进制整数
let num4 = parseInt(22.5); // 22 
let num5 = parseInt("70"); // 70，解释为十进制值
let num6 = parseInt("0xf"); // 15，解释为十六进制整数
```

通过第二个参数，可以极大扩展转换后获得的结果类型。比如：

```js
let num1 = parseInt("10", 2); // 2，按二进制解析
let num2 = parseInt("10", 8); // 8，按八进制解析
let num3 = parseInt("10", 10); // 10，按十进制解析
let num4 = parseInt("10", 16); // 16，按十六进制解析
```

#### 2.4.3 parseFloat()

parseFloat() 函数的工作方式跟 parseInt() 函数类似，都是从位置 0 开始检测每个字符。同样，它也是解析到字符串末尾或者解析到一个无效的浮点数值字符为止。这意味着第一次出现的小数点是有效的，但第二次出现的小数点就无效了，此时字符串的剩余字符都会被忽略。因此，"22.34.5"将转换成 22.34。

parseFloat() 函数的另一个不同之处在于，它始终忽略字符串开头的零。这个函数能识别前面讨论的所有浮点格式，以及十进制格式（开头的零始终被忽略）。十六进制数值始终会返回 0。因为 parseFloat() 只解析十进制值，因此不能指定底数。最后，如果字符串表示整数（没有小数点或者小数点后面只有一个零），则 parseFloat() 返回整数。

下面是几个示例：

```js
let num1 = parseFloat("1234blue"); // 1234，按整数解析
let num2 = parseFloat("0xA"); // 0 
let num3 = parseFloat("22.5"); // 22.5 
let num4 = parseFloat("22.34.5"); // 22.34 
let num5 = parseFloat("0908.5"); // 908.5 
let num6 = parseFloat("3.125e7"); // 31250000
```

## 3、BigInt 任意大整数

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

可以通过typeof操作符来判断变量是否为BigInt类型：

```js
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true 
```

还可以通过Object.prototype.toString方法来判断变量是否为BigInt类型：

```js
Object.prototype.toString.call(10n) === '[object BigInt]'; // true
```

## 4、Boolean 布尔值

Boolean 类型有两个字面值：true 和 false。

赋值例子：

```js
let found = true; 
let lost = false; 
```

>注意，布尔值字面量 true 和 false 是区分大小写的，因此 True 和 False（及其他大小混写形式）是有效的标识符，但不是布尔值

调用特定的 Boolean()转型函数，可以转换为布尔值，下表总结了不同类型与布尔值之间的转换规则。

数据类型|转换为 true 的值|转换为 false 的值
--|:--:|:--:|
Boolean|true|false
String|非空字符串|""（空字符串）
Number|非零数值（包括无穷值）|0、NaN（参见后面的相关内容）
Object|任意对象|null
Undefined|N/A（不存在）|undefined

示例：

```js
let test = Boolean('test');
console.log(test); // true
```

### 4.1 虚值

**falsy** 值 (虚值) 是在 Boolean 上下文中认定为 false 的值。

JavaScript 在需要用到布尔类型值的上下文中使用强制类型转换(Type Conversion )将值转换为布尔值，例如条件语句和循环语句。

在 JavaScript 中只有 **8 个 falsy** 值。

> 这意味着当 JavaScript 期望一个布尔值，并被给与下面值中的一个时，它总是会被当做 false。

| 值 | 说明 |
| :----: | :----: |
| false | false 关键字 |
| 0 | 数值 负 zero |
| -0 | false 关键字 |
| 0n | 当 BigInt 作为布尔值使用时, 遵从其作为数值的规则. 0n 是 falsy 值 |
| "" '' \`\` | 这是一个空字符串 (字符串的长度为零). JavaScript 中的字符串可用双引号 "", 单引号 '', 或 模板字面量 \`\` 定义。 |
| null | null - 缺少值 |
| undefined | undefined - 原始值 |
| NaN | NaN - 非数值 |

JavaScript 中 falsy 值的例子 (在布尔值上下文中被转换为 false，从而绕过了 if 代码块):

```js
if (false)
if (null)
if (undefined)
if (0)
if (0n)
if (NaN)
if ('')
if ("")
if (``)
if (document.all)
```

### 4.2 逻辑与操作符 &&

如果第一个对象是 falsy 值，则返回那个对象：

```js
let pet = false && "dog";
// false
```

> `document.all` 在过去被用于浏览器检测，是 HTML 规范在此定义了故意与 ECMAScript 标准相违背的（`document.all` 虽然是一个对象，但其转换为 boolean 类型是 false），以保持与历史代码的兼容性  `(if (document.all) { // Internet Explorer code here }` 或使用 `document.all` 而不先检查它的存在: `document.all.foo`)。\

falsy 有时会写作 falsey，虽然在英语中，将一个单词转换成形容词时，通常会去掉末尾的字母 e，加上后缀 y。(noise => noisy, ice => icy, shine => shiny)

## 5、Null 空值

Null 类型只有一个值，即特殊值 null。逻辑上讲，null 值表示一个空对象指针，这也是给 typeof 传一个 null 会返回"object"的原因：

```js
console.log(typeof null); // "object" 
```

在定义将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。这样，只要检查这个变量的值是不是 null 就可以知道这个变量是否在后来被重新赋予了一个对象的引用，比如：

```js
if (car != null) { 
 // car 是一个对象的引用
} 
```

undefined 值是由 null 值派生而来的，因此 ECMA-262 将它们定义为表面上相等，如下面的例子所示：

```js
console.log(null == undefined); // true 
```

## 6、Undefined 未定义

Undefined 类型只有一个值，就是特殊值 undefined。当使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值：

```js
let message; 
console.log(message == undefined); // true 
```

> 注意：一般来说，永远不用显式地给某个变量设置 undefined 值。字面值 undefined 主要用于比较，而且在 ECMA-262 第 3 版之前是不存在的。增加这个特殊值的目的就是为了正式明确空对象指针（null）和未初始化变量的区别。

## 7、Symbol 符号

Symbol（符号）是 ECMAScript 6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

详细 [Symbol](Symbol.md)

## 8、原始值的包装类型

原始类型 boolean、number 和 string 有对应的构造函数：Boolean, Number, String. 它们的实例（所谓的包装对象）包含（包装）原始值。构造函数可以通过两种方式使用：

- 作为构造函数，将创建原始值包装对象
- 作为函数，它们将值转换为相应的基本类型（[见前几章](#_1、string-字符串)）

创建执行步骤：

(1) 创建一个 String 类型的实例；

(2) 调用实例上的特定方法；

(3) 销毁实例。

```js
let s1 = new String("some text"); 
let s2 = s1.substring(2); 
s1 = null; 
```

这种行为可以让原始值拥有对象的行为。对布尔值和数值而言，以上 3 步也会在后台发生，只不过使用的是 Boolean 和 Number 包装类型而已。

可以显式地使用 Boolean、Number 和 String 构造函数创建原始值包装对象。不过应该在确实必要时再这么做，否则容易让开发者疑惑，分不清它们到底是原始值还是引用值。在原始值包装类型的实例上调用 typeof 会返回"object"，所有原始值包装对象都会转换为布尔值 true。

### 8.1 String 包装类型

String 是对应字符串的引用类型。要创建一个 String 对象，使用 String 构造函数并传入一个数值，如下例所示：

```js
let stringObject = new String("hello world"); 
```

String 对象的方法可以在所有字符串原始值上调用。3 个继承的方法 valueOf()、toLocaleString() 和 toString()都返回对象的原始字符串值。

每个 String 对象都有一个 length 属性，表示字符串中字符的数量。

> 注意：即使字符串中包含双字节字符（而不是单字节的 ASCII 字符），也仍然会按单字符来计数。

String 类型提供了很多方法来解析和操作字符串。

#### 8.1.1 字符方法

方法名|说明
--|:--:|
length|表示字符串中字符的数量
charAt()|返回给定索引位置的字符，由传给方法的整数参数指定
charCodeAt()|查看指定码元的字符编码
codePointAt()|既包含单码元字符又包含代理对字符的字符串
fromCharCode()|用于根据给定的 UTF-16 码元创建字符串中的字符。这个方法可以接受任意多个数值，并返回将所有数值对应的字符拼接起来的字符串
fromCodePoint()|接收任意数量的码点，返回对应字符拼接起来的字符串

示例：
```js
// length
let message = "abcde"; 
console.log(message.length); // 5 

// charAt
let message = "abcde"; 
console.log(message.charAt(2)); // "c"

// charCodeAt
let message = "abcde";
console.log(message.charCodeAt(2)); // 99

// fromCharCode
console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)); // "abcde"
console.log(String.fromCharCode(97, 98, 99, 100, 101)); // "abcde"

// codePointAt
let message = "ab☺de";
console.log(message.codePointAt(3)); // 56842

// fromCodePoint
console.log(String.fromCodePoint(97, 98, 128522, 100, 101)); // ab☺de 
```

#### 8.1.2 normalize() 方法

通过比较字符串与其调用 normalize() 的返回值，就可以知道该字符串是否已经规范化了：

```js
let a1 = String.fromCharCode(0x00C5), 
 a2 = String.fromCharCode(0x212B), 
 a3 = String.fromCharCode(0x0041, 0x030A); 
console.log(a1.normalize("NFD") === a2.normalize("NFD")); // true 
console.log(a2.normalize("NFKC") === a3.normalize("NFKC")); // true 
console.log(a1.normalize("NFC") === a3.normalize("NFC")); // true
```

#### 8.1.3 操作方法

方法名|说明
--|:--:|
concat()|用于将一个或多个字符串拼接成一个新字符串
slice()|提取子字符串，第一个参数表示子字符串开始的位置，第二个参数是提取结束的位置
substr()|提取子字符串，第一个参数表示子字符串开始的位置，，第二个参数表示返回的子字符串数量
substring()|提取子字符串，第一个参数表示子字符串开始的位置，第二个参数是提取结束的位置

示例：

```js
// concat
let stringValue = "hello "; 
let result = stringValue.concat("world"); 
console.log(result); // "hello world" 
console.log(stringValue); // "hello" 

let stringValue = "hello world"; 
console.log(stringValue.slice(3)); // "lo world" 
console.log(stringValue.substring(3)); // "lo world" 
console.log(stringValue.substr(3)); // "lo world" 
console.log(stringValue.slice(3, 7)); // "lo w" 
console.log(stringValue.substring(3,7)); // "lo w" 
console.log(stringValue.substr(3, 7)); // "lo worl" 

```

#### 8.1.4 位置方法

方法名|说明
--|:--:|
indexOf()|从字符串开头开始查找子字符串，并返回位置（如果没找到，则返回-1）
lastIndexOf()|从字符串末尾开始查找子字符串，并返回位置（如果没找到，则返回-1）

示例：

```js
let stringValue = "hello world"; 
console.log(stringValue.indexOf("o")); // 4 
console.log(stringValue.lastIndexOf("o")); // 7 
```

#### 8.1.5 包含方法

方法名|说明
--|:--:|
startsWith()|检查开始于索引 0 的匹配项，返回一个表示是否包含的布尔值，可选第二个参数，表示开始搜索的位置
endsWith()|检查开始于索引(string.length - substring.length)的匹配项，返回一个表示是否包含的布尔值，可选第二个参数，表示应该当作字符串末尾的位置
includes()|检查整个字符串，返回一个表示是否包含的布尔值，可选第二个参数，表示开始搜索的位置

示例：

```js
let message = "foobarbaz"; 
console.log(message.startsWith("foo")); // true 
console.log(message.startsWith("bar")); // false 

console.log(message.endsWith("baz")); // true 
console.log(message.endsWith("bar")); // false 

console.log(message.includes("bar")); // true 
console.log(message.includes("qux")); // false
```

#### 8.1.6 trim() 方法

这个方法会创建字符串的一个副本，删除前、后所有空格符，再返回结果。

方法名|说明
--|:--:|
trim()|删除前、后所有空格符
trimLeft()|从字符串开始清理空格符
trimRight()|从字符串末尾清理空格符

示例：

```js
let stringValue = " hello world "; 
let trimmedStringValue = stringValue.trim(); 
console.log(stringValue); // " hello world " 
console.log(trimmedStringValue); // "hello world" 
```

#### 8.1.7 repeat() 方法

这个方法接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果。

```js
let stringValue = "na "; 
console.log(stringValue.repeat(4) + "batman"); 
// na na na na batman
```

#### 8.1.8 padStart() 和 padEnd() 方法

padStart() 和 padEnd() 方法会复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格，可选的第二个参数并不限于一个字符

```js
let stringValue = "foo"; 
console.log(stringValue.padStart(6)); // " foo" 
console.log(stringValue.padStart(9, ".")); // "......foo" 
console.log(stringValue.padEnd(6)); // "foo " 
console.log(stringValue.padEnd(9, ".")); // "foo......" 

```

#### 8.1.9 迭代与解构

字符串的原型上暴露了一个 Symbol.iterator 方法，表示可以迭代字符串的每个字符。可以像下面这样手动使用迭代器：

```js
let message = "abc"; 
let stringIterator = message[Symbol.iterator](); 
console.log(stringIterator.next()); // {value: "a", done: false} 
console.log(stringIterator.next()); // {value: "b", done: false} 
console.log(stringIterator.next()); // {value: "c", done: false} 
console.log(stringIterator.next()); // {value: undefined, done: true} 

```

在 for-of 循环中可以通过这个迭代器按序访问每个字符：

```js
for (const c of "abcde") { 
 console.log(c); 
} 
// a 
// b 
// c 
// d 
// e
```

可以通过解构操作符来解构：

```js
let message = "abcde"; 
console.log([...message]); // ["a", "b", "c", "d", "e"]
```

#### 7.1.10 大小写转换

大小写转换有 4 个方法：

方法名|说明
--|:--:|
toLowerCase()|转换为小写
toLocaleLowerCase()|转换为小写
toUpperCase()|转换为大写
toLocaleUpperCase()|转换为大写

toLocaleLowerCase() 和 toLocaleUpperCase() 方法旨在基于特定地区实现。在很多地区，地区特定的方法与通用的方法是一样的。但在少数语言中（如土耳其语），Unicode 大小写转换需应用特殊规则，要使用地区特定的方法才能实现正确转换。

```js
let stringValue = "hello world"; 
console.log(stringValue.toLocaleUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toLocaleLowerCase()); // "hello world" 
console.log(stringValue.toLowerCase()); // "hello world" 
```

#### 8.1.11 模式匹配方法

方法名|说明
--|:--:|
match()|接收一个参数，可以是一个正则表达式字符串，也可以是一个 RegExp 对象
search()|参数同上，返回模式第一个匹配的位置索引，如果没找到则返回-1，始终从字符串开头向后匹配模式
replace()|第一个参数可以是一个 RegExp 对象或一个字符串（这个字符串不会转换为正则表达式），第二个参数可以是一个字符串或一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，第一个参数必须为正则表达式并且带全局标记
split()|根据传入的分隔符将字符串拆分成数组，第二个参数，即数组大小，确保返回的数组不会超过指定大小

示例：

```js
// match
let text = "cat, bat, sat, fat"; 
let pattern = /.at/;
let matches = text.match(pattern); 
console.log(matches.index); // 0 
console.log(matches[0]); // "cat" 
console.log(pattern.lastIndex); // 0 

// search
let text = "cat, bat, sat, fat"; 
let pos = text.search(/at/); 
console.log(pos); // 1

// replace
let text = "cat, bat, sat, fat"; 
let result = text.replace("at", "ond"); 
console.log(result); // "cond, bat, sat, fat" 

result = text.replace(/at/g, "ond"); 
console.log(result); // "cond, bond, sond, fond"

let text = "cat, bat, sat, fat"; 
result = text.replace(/(.at)/g, "word ($1)"); 
console.log(result); // word (cat), word (bat), word (sat), word (fat)

// split
let colorText = "red,blue,green,yellow"; 
let colors1 = colorText.split(","); // ["red", "blue", "green", "yellow"] 
let colors2 = colorText.split(",", 2); // ["red", "blue"] 
let colors3 = colorText.split(/[^,]+/); // ["", ",", ",", ",", ""] 

```

#### 8.1.12 localeCompare() 方法

这个方法比较两个字符串，返回如下 3 个值中的一个。

- 如果按照字母表顺序，字符串应该排在字符串参数前头，则返回负值。（通常是-1，具体还要看
与实际值相关的实现。）

- 如果字符串与字符串参数相等，则返回 0。

- 如果按照字母表顺序，字符串应该排在字符串参数后头，则返回正值。（通常是 1，具体还要看
与实际值相关的实现。

```js
let stringValue = "yellow"; 
console.log(stringValue.localeCompare("brick")); // 1 
console.log(stringValue.localeCompare("yellow")); // 0 
console.log(stringValue.localeCompare("zoo")); // -1 
```

### 8.2 Number 包装类型

Number 是对应数值的引用类型。要创建一个 Number 对象，就使用 Number 构造函数并传入一个数值，如下例所示：

```js
let numberObject = new Number(10); 
```

与 Boolean 类型一样，Number 类型重写了 valueOf()、toLocaleString()和 toString()方法。valueOf()方法返回 Number 对象表示的原始数值，另外两个方法返回数值字符串。toString()方法可选地接收一个表示基数的参数，并返回相应基数形式的数值字符串，如下所示：

```js
let num = 10; 
console.log(num.toString()); // "10" 
console.log(num.toString(2)); // "1010" 
console.log(num.toString(8)); // "12" 
console.log(num.toString(10)); // "10" 
console.log(num.toString(16)); // "a" 
```

除了继承的方法，Number 类型还提供了几个用于将数值格式化为字符串的方法。

#### 8.2.1 toFixed()

toFixed()方法返回包含指定小数点位数的数值字符串，如：

```js
let num = 10; 
console.log(num.toFixed(2)); // "10.00"
```

#### 8.2.2 toExponential()

返回以科学记数法（也称为指数记数法）表示的数值字符串。

与 toFixed() 一样，toExponential() 也接收一个参数，表示结果中小数的位数。来看下面的例子：

```js
let num = 10; 
console.log(num.toExponential(1)); // "1.0e+1" 
```

#### 8.2.3 isInteger()

ES6 新增了 Number.isInteger() 方法，用于辨别一个数值是否保存为整数。

```js
console.log(Number.isInteger(1)); // true 
console.log(Number.isInteger(1.00)); // true 
console.log(Number.isInteger(1.01)); // false 
```

#### 8.2.4 isSafeInteger()

IEEE 754 数值格式有一个特殊的数值范围，在这个范围内二进制值可以表示一个整数值。这个数值范围从 Number.MIN_SAFE_INTEGER（253 + 1）到 Number.MAX_SAFE_INTEGER（253  1）。对超出这个范围的数值，即使尝试保存为整数，IEEE 754 编码格式也意味着二进制值可能会表示一个完全不同的数值。为了鉴别整数是否在这个范围内，可以使用 Number.isSafeInteger()方法：

```js
console.log(Number.isSafeInteger(-1 * (2 ** 53))); // false 
console.log(Number.isSafeInteger(-1 * (2 ** 53) + 1)); // true 
console.log(Number.isSafeInteger(2 ** 53)); // false 
console.log(Number.isSafeInteger((2 ** 53) - 1)); // true 
```

### 8.3 Boolean 包装类型

Boolean 是对应布尔值的引用类型。要创建一个 Boolean 对象，就使用 Boolean 构造函数并传入 true 或 false，如下例所示：

```js
let booleanObject = new Boolean(true);
```

Boolean 的实例会重写 valueOf() 方法，返回一个原始值 true 或 false。toString() 方法被调用时也会被覆盖，返回字符串"true"或"false"。

