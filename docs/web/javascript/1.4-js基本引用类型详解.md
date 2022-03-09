# js基本引用类型详解

引用值（或者对象）是某个特定**引用类型**的实例，在 ECMAScript 中，引用类型是把数据和功能组织到一起的结构。

引用类型有时候也被称为**对象定义**，因为它们描述了自己的对象应有的属性和方法。

对象被认为是某个特定引用类型的实例。新对象通过使用 new 操作符后跟一个构造函数（constructor）来创建。构造函数就是用来创建新对象的函数，比如下面这行代码：

```js
let now = new Date(); 
```

基本引用类型包含：Date(日期)、RegExp(正则表达式)、原始值包装类型(String,Number,Boolean)、单例内置对象(Global,Math)、Function(函数)

## 1、Date 日期

ECMAScript 的 Date 类型参考了 Java 早期版本中的 `java.util.Date`。为此，Date 类型将日期保存为自协调世界时（UTC，Universal Time Coordinated）时间 1970 年 1 月 1 日午夜（零时）至今所经过的毫秒数。使用这种存储格式，Date 类型可以精确表示 1970 年 1 月 1 日之前及之后 285 616 年的日期。

### 1.1 历史

在 1995 年，JavaScript 作者 Brendan Eich 只有 10 天的时间来编写 JavaScript 语言并将其引入 Netscape。日期处理是几乎所有编程语言的基本部分，JavaScript 也必须拥有。也就是说，这是一个复杂的问题域，而且时间很短。Brendan 在“让它像 Java 一样”的命令下从现有的、初期的 `java.Util.Date` 日期实现中复制了日期对象。坦率地说，这种实施非常糟糕。事实上，在 1997 年的 Java 1.1 版本中，基本上所有的方法都被弃用和替换了。然而 20 年后，我们仍然在 JavaScript 编程语言中使用这个 API。

此外，TC39正在开发一种新的日期API对JavaScript： [temporal](https://github.com/maggiepint/proposal-temporal)。

### 1.2 时间标准

**（1）UTC vs. Z vs. GMT**

UTC、Z 和 GMT 是指定时间的方法，它们相似但略有不同：

- UTC（协调世界时）是所有时区所基于的时间标准。它们是相对于它指定的。也就是说，没有任何国家或地区将 UTC 作为其本地时区。

- Z（Zulu Time Zone）是一个军事时区，常用于航空和军事领域，作为 UTC+0 的别称。

- GMT（格林威治标准时间）是一些欧洲和非洲国家使用的时区。它是 UTC 加零小时，因此与 UTC 时间相同。

**（2）日期不支持时区**

日期支持以下时间标准：

- 本地时区（取决于当前位置）
- 世界标准时间
- 时间偏移（相对于 UTC）

```js
new Date(2077, 0, 27).toISOString()
// '2077-01-26T16:00:00.000Z'
```

日期将 0 解释为一月。当地时区的月中日为 27，但 UTC 为 26。

无法指定时区有两个缺点：

- 这使得无法支持多个时区
- 它可能会导致特定于位置的错误。例如，前面的示例会根据执行的位置产生不同的结果。为了安全起见：
  - 尽可能使用基于 UTC 的操作
  - 使用 Z 解析字符串或使用时间偏移量

### 1.3 日期对象

**（1）创建日期**

要创建日期对象，就使用 new 操作符来调用 Date 构造函数：

```js
let now = new Date();
```

在不给 Date 构造函数传参数的情况下，创建的对象将保存当前日期和时间。要基于其他日期和时间创建日期对象，必须传入其毫秒表示（UNIX 纪元 1970 年 1 月 1 日午夜之后的毫秒数）。

**（2）通过数字创建日期**

```js
new Date(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) （当地时区）
```

其中两个参数存在缺陷：

- 对于month，0 是一月，1 是二月，等等。
- 如果 0 ≤ year≤ 99，则加上 1900：
  - `new Date(12, 1, 22, 19, 11).getFullYear()`
    - 1912

示例：

```js
new Date(2077, 0, 27, 21, 49).toISOString() // CET (UTC+1)

'2077-01-27T13:49:00.000Z'
```

注意，输入小时数 (21) 与输出小时数 (13) 不同。前者是指当地时区，后者是指UTC。

**（3）从字符串中解析日期**

```js
new Date(dateTimeStr: string) （本地时区、UTC、时间偏移）
```

如果末尾有 Z，则使用 UTC：

```js
new Date('2077-01-27T00:00Z').toISOString()
'2077-01-27T00:00:00.000Z'
```

如果最后没有 Z 或时间偏移，则使用本地时区：

```js
new Date('2077-01-27T00:00').toISOString() // CET (UTC+1)
// '2077-01-26T23:00:00.000Z'
```

如果字符串仅包含日期，则将其解释为 UTC：

```js
new Date('2077-01-27').toISOString()
// '2077-01-27T00:00:00.000Z'
```

**（4）三个辅助方法：** `Date.parse()`、`Date.UTC()` 和 `Date.now()`

`Date.parse()` 方法接收一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。

支持下列日期格式：

- “月/日/年”，如"5/23/2019"；
- “月名 日, 年”，如"May 23, 2019"；
- “周几 月名 日 年 时:分:秒 时区”，如"Tue May 23 2019 00:00:00 GMT-0700"；
- ISO 8601 扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00

```js
new Date(Date.parse("May 23, 2019"));
```

> 注意，不同的浏览器对 Date 类型的实现有很多问题。很多浏览器会选择用当前日期替代越界的日期，因此有些浏览器会将"January 32, 2019"解释为"February 1, 2019"。

`Date.UTC()` 方法也返回日期的毫秒表示，但使用的是跟 `Date.parse()` 不同的信息来生成这个值。

传给 `Date.UTC()` 的参数是
- 年
- 月（0~11）
- 日（1~31）
- 时（0~23）
- 分
- 秒
- 毫秒

这些参数中，只有前两个（年和月）是必需的。如果不提供日，那么默认为 1 日。其他参数的默认值都是 0。

`Date.now()` 返回表示方法执行时日期和时间的毫秒数，这个方法可以方便地用在代码分析中：

```js
// 起始时间
let start = Date.now(); 
// 调用函数
doSomething(); 
// 结束时间
let stop = Date.now(), 
result = stop - start;
```

### 1.4 格式化日期方法

- `toDateString()`，显示日期中的周几、月、日、年（格式特定于实现）；
- `toTimeString()`，显示日期中的时、分、秒和时区（格式特定于实现和地区）；
- `toLocaleDateString()`，显示日期中的年、月、日（格式特定于实现和地区）；
- `toLocaleTimeString()`，显示日期中的时、分、秒（格式特定于实现和地区）；
- `toLocaleString()`，显示日期中的年、月、日、时、分、秒（格式特定于实现和地区）；
- `toUTCString()`，显示完整的 UTC 日期（格式特定于实现）
- `toGMTString()`，显示完整的 UTC 日期（格式特定于实现）

```js
const date = new Date();

date.toDateString(); // 'Sun Oct 31 2021'
date.toTimeString(); // '20:48:57 GMT+0800 (中国标准时间)'
date.toLocaleDateString(); // '2021/10/31'
date.toLocaleTimeString(); // '下午8:48:57'
date.toLocaleString(); // 2021/10/31 下午8:48:57
date.toUTCString(); // 'Sun, 31 Oct 2021 12:48:57 GMT'
date.toGMTString(); // 'Sun, 31 Oct 2021 12:48:57 GMT'
date.toString(); // 'Sun Oct 31 2021 20:48:57 GMT+0800 (中国标准时间)'
```

### 1.5 日期的获取和设置

**（1）时间戳**

- `getTime()`，返回日期的毫秒表示；与 `valueOf()` 相同
- `setTime(milliseconds)`，设置日期的毫秒表示，从而修改整个日期

**（2）年**

- `getFullYear()`，返回 4 位数年（即 2019 而不是 19）
- `getUTCFullYear()`，返回 UTC 日期的 4 位数年
- `setFullYear(year)`，设置日期的年（year 必须是 4 位数）
- `setUTCFullYear(year)`，设置 UTC 日期的年（year 必须是 4 位数）
- `getYear()`，返回 2 为数年（即 2019 年 返回 119 ，第一位补1）

**（3）月**

- `getMonth()`，返回日期的月（0 表示 1 月，11 表示 12 月）
- `getUTCMonth() `，返回 UTC 日期的月（0 表示 1 月，11 表示 12 月）
- `setMonth(month)`，设置日期的月（month 为大于 0 的数值，大于 11 加年）
- `setUTCMonth(month)`，设置 UTC 日期的月（month 为大于 0 的数值，大于 11 加年）

**（4）日**

- `getDate()`，返回日期中的日（1~31）
- `getUTCDate()`，返回 UTC 日期中的日（1~31）
- `setDate(date)`，设置日期中的日（如果 date 大于该月天数，则加月）
- `setUTCDate(date)`，设置 UTC 日期中的日（如果 date 大于该月天数，则加月）

**（5）周**

- `getDay()`，返回日期中表示周几的数值（0 表示周日，6 表示周六）
- `getUTCDay()`，返回 UTC 日期中表示周几的数值（0 表示周日，6 表示周六）

**（6）时**

- `getHours()`，返回日期中的时（0~23）
- `getUTCHours()`，返回 UTC 日期中的时（0~23）
- `setHours(hours)`，设置日期中的时（如果 hours 大于 23，则加日）
- `setUTCHours(hours)`，设置 UTC 日期中的时（如果 hours 大于 23，则加日）

**（7）分**

- `getMinutes()`，返回日期中的分（0~59）
- `getUTCMinutes()`，返回 UTC 日期中的分（0~59）
- `setMinutes(minutes)`，设置日期中的分（如果 minutes 大于 59，则加时）
- `setUTCMinutes(minutes)`，设置 UTC 日期中的分（如果 minutes 大于 59，则加时）

**（8）秒**

- `getSeconds()`，返回日期中的秒（0~59）
- `getUTCSeconds()`，返回 UTC 日期中的秒（0~59）
- `setSeconds(seconds)`，设置日期中的秒（如果 seconds 大于 59，则加分）
- `setUTCSeconds(seconds)`，设置 UTC 日期中的秒（如果 seconds 大于 59，则加分）

**（9）毫秒**

- `getMilliseconds()`，返回日期中的毫秒
- `getUTCMilliseconds()`，返回 UTC 日期中的毫秒
- `setMilliseconds(milliseconds)`，设置日期中的毫秒
- `setUTCMilliseconds(milliseconds)`，设置 UTC 日期中的毫秒

**（10）偏移量**

- `getTimezoneOffset()`，返回以分钟计的 UTC 与本地时区的偏移量（如美国 EST 即“东部标准时间”返回 300，进入夏令时的地区可能有所差异）

## 2、RegExp

JavaScript 通过 RegExp 类型支持正则表达式。

*let expression = /pattern/flags;*

pattern（模式）可以是任何简单或复杂的正则表达式，包括字符类、限定符、分组、向前查找和反向引用。

flags（标记）每个正则表达式可以带零个或多个 flags，用于控制正则表达式的行为。

- g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
- i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
- m：多行模式，表示查找到一行文本末尾时会继续查找。
- y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
- u：Unicode 模式，启用 Unicode 匹配。
- s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）

```js
// 匹配字符串中的所有"at" 
let pattern1 = /at/g; 

// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i; 

// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi; 
```

### 2.1 RegExp 实例属性

每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。

- global：布尔值，表示是否设置了 g 标记。
- ignoreCase：布尔值，表示是否设置了 i 标记。
- unicode：布尔值，表示是否设置了 u 标记。
- sticky：布尔值，表示是否设置了 y 标记。
- lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从 0 开始。
- multiline：布尔值，表示是否设置了 m 标记。
- dotAll：布尔值，表示是否设置了 s 标记。
- source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的斜杠。
- flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没有前后斜杠）。

```js
let pattern1 = /\[bc\]at/i; 
console.log(pattern1.global); // false 
console.log(pattern1.ignoreCase); // true 
console.log(pattern1.multiline); // false 
console.log(pattern1.lastIndex); // 0 
console.log(pattern1.source); // "\[bc\]at" 
console.log(pattern1.flags); // "i" 

let pattern2 = new RegExp("\\[bc\\]at", "i"); 
console.log(pattern2.global); // false 
console.log(pattern2.ignoreCase); // true 
console.log(pattern2.multiline); // false 
console.log(pattern2.lastIndex); // 0 
console.log(pattern2.source); // "\[bc\]at" 
console.log(pattern2.flags); // "i"
```

### 2.2 RegExp 实例方法

RegExp 实例的主要方法是 exec()，主要用于配合捕获组使用。这个方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回 null。

```js
let text = "mom and dad and baby"; 
let pattern = /mom( and dad( and baby)?)?/gi;

let matches = pattern.exec(text); 
console.log(matches.index); // 0 
console.log(matches.input); // "mom and dad and baby" 
console.log(matches[0]); // "mom and dad and baby" 
console.log(matches[1]); // " and dad and baby"
```

## 3、原始值包装类型

为了方便操作原始值，JavaScript 提供了 3 种特殊的引用类型：**Boolean**、**Number** 和 **String**。

每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。

```js
let s1 = "some text"; 
let s2 = s1.substring(2);
```

在以读模式访问字符串值的任何时候，后台都会执行以下 3 步：

- (1) 创建一个 String 类型的实例；
- (2) 调用实例上的特定方法；
- (3) 销毁实例。

这种行为可以让原始值拥有对象的行为。对布尔值和数值而言，以上 3 步也会在后台发生，只不过使用的是 Boolean 和 Number 包装类型而已。

引用类型与原始值包装类型的主要区别在于对象的生命周期。在通过 new 实例化引用类型后，得到的实例会在离开作用域时被销毁，而自动创建的原始值包装对象则只存在于访问它的那行代码执行期间。这意味着不能在运行时给原始值添加属性和方法。

```js
let s1 = "some text"; 
s1.color = "red"; 
console.log(s1.color); // undefined
```

可以显式地使用 Boolean、Number 和 String 构造函数创建原始值包装对象。不过应该在确实必要时再这么做，否则容易让开发者疑惑，分不清它们到底是原始值还是引用值。

```js
const a = new String('hello world'); // 使用构造函数创建
typeof a; // 'object'

const b = String('hello world'); // 使用转型函数创建
typeof b; // 'string'

let obj = new Object("some text"); 
console.log(obj instanceof String); // true
```

如果传给 Object 的是字符串，则会创建一个 String 的实例。如果是数值，则会创建 Number 的实例。布尔值则会得到 Boolean 的实例。

### 3.1 Boolean

Boolean 是对应布尔值的引用类型。要创建一个 Boolean 对象，就使用 Boolean 构造函数并传入
true 或 false，如下例所示：

```js
let booleanObject = new Boolean(true);
```

Boolean 的实例会重写 `valueOf()` 方法，返回一个原始值 true 或 false。`toString()` 方法被调用时也会被覆盖，返回字符串"true"或"false"。

```js
let falseObject = new Boolean(false);
let result = falseObject && true; // falseObject 是一个 Boolean 对象的引用值，所以值为真
console.log(result); // true 

let falseValue = false; 
result = falseValue && true; // falseValue 的值是 false
console.log(result); // false 

console.log(typeof falseObject); // object 
console.log(typeof falseValue); // boolean 
console.log(falseObject instanceof Boolean); // true 
console.log(falseValue instanceof Boolean); // false
```

>理解原始布尔值和 Boolean 对象之间的区别非常重要，强烈建议永远不要使用后者。

### 3.2 Number

Number 是对应数值的引用类型。要创建一个 Number 对象，就使用 Number 构造函数并传入一个数值，如下例所示：

```js
let numberObject = new Number(10);
```

**（1）重写方法**

与 Boolean 类型一样，Number 类型重写了 `valueOf()`、`toLocaleString()` 和 `toString()` 方法。

```js
let num = 10;
num.valueOf(); // 10
num.toLocaleString(); // '10'
num.toString(); // '10'
num.toString(2); // '1010' 返回二进制字符串
num.toString(8); // '12' 返回八进制字符串
num.toString(10); // '10' 返回十进制字符串
num.toString(16); // 'a' 返回十六进制字符串
```

**（2）将数值格式化为字符串**

- `toFixed()` 方法返回包含指定小数点位数的数值字符串
- `toExponential()` 返回以科学记数法（也称为指数记数法）表示的数值字符串
- `toPrecision()` 方法会根据情况返回最合理的输出结果，可能是固定长度，也可能是科学记数法形式。这个方法接收一个参数，表示结果中数字的总位数（不包含指数）。

```js
let num = 10; 
console.log(num.toFixed(2)); // "10.00" 

console.log(num.toExponential(1)); // "1.0e+1"

let num2 = 99; 
console.log(num2.toPrecision(1)); // "1e+2" 
console.log(num2.toPrecision(2)); // "99" 
console.log(num2.toPrecision(3)); // "99.0"
```

本质上，`toPrecision()` 方法会根据数值和精度来决定调用 `toFixed()` 还是 `toExponential()`。为了以正确的小数位精确表示数值，这 3 个方法都会向上或向下舍入。

> 注意 toPrecision() 方法可以表示带 1~21 个小数位的数值。某些浏览器可能支持更大的范围，但这是通常被支持的范围。

**（3）安全整数**

ES6 新增了 `Number.isInteger()` 方法，用于辨别一个数值是否保存为整数。有时候，小数位的 0 可能会让人误以为数值是一个浮点值：

```js
console.log(Number.isInteger(1)); // true 
console.log(Number.isInteger(1.00)); // true 
console.log(Number.isInteger(1.01)); // false
```

另外 `Number.isSafeInteger()` 方法可以辨别整数是否在IEEE 754 数值格式范围内，即 IEEE 754 数值格式有一个特殊的数值范围，在这个范围内二进制值可以表示一个整数值。这个数值 Number.MIN_SAFE_INTEGER（-2^53 + 1）到 Number.MAX_SAFE_INTEGER（2^53 - 1）。

```js
console.log(Number.isSafeInteger(-1 * (2 ** 53))); // false 
console.log(Number.isSafeInteger(-1 * (2 ** 53) + 1)); // true 
console.log(Number.isSafeInteger(2 ** 53)); // false 
console.log(Number.isSafeInteger((2 ** 53) - 1)); // true
```

### 3.3 String

String 是对应字符串的引用类型。要创建一个 String 对象，使用 String 构造函数并传入一个数值，如下例所示：

```js
let stringObject = new String("hello world");
```

String 对象的方法可以在所有字符串原始值上调用。3个继承的方法 `valueOf()`、`toLocaleString()` 和 `toString()` 都返回对象的原始字符串值。

每个 String 对象都有一个 `length` 属性，表示字符串中字符的数量。

```js
let stringValue = "hello world"; 
console.log(stringValue.length); // "11"
```

> 注意，即使字符串中包含双字节字符（而不是单字节的 ASCII 字符），也仍然会按单字符来计数

**（1）字符**

JavaScript 字符串由 16 位码元（code unit）组成。

JavaScript 字符串使用了两种 Unicode 编码混合的策略：UCS-2 和 UTF-16。

- `length` 属性表示字符串包含多少 16 位码元
- `charAt()` 方法返回给定索引位置的字符
- `charCodeAt()` 方法可以查看指定码元的字符编码
- `fromCharCode()` 方法用于根据给定的 UTF-16 码元创建字符串中的字符
- `codePointAt()` 接收 16 位码元的索引并返回该索引置上的码点
- `fromCodePoint()` 方法接收任意数量的码点，返回对应字符拼接起来的字符串

```js
let message = "abcde";
console.log(message.length); // 5
console.log(message.charAt(2)); // "c"
console.log(message.charCodeAt(2)); // 99

// 十进制 99 等于十六进制 63 
console.log(99 === 0x63); // true

console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)); // "abcde"

// 0x0061 === 97 
// 0x0062 === 98 
// 0x0063 === 99 
// 0x0064 === 100 
// 0x0065 === 101 

console.log(String.fromCharCode(97, 98, 99, 100, 101)); // "abcde"

let message = "ab☺de";
console.log(message.length); // 6 
console.log(message.charAt(1)); // b
console.log(message.charAt(2)); // <?> 
console.log(message.charAt(3)); // <?> 
console.log(message.charAt(4)); // d 

console.log(message.charCodeAt(1)); // 98 
console.log(message.charCodeAt(2)); // 55357 
console.log(message.charCodeAt(3)); // 56842 
console.log(message.charCodeAt(4)); // 100 

console.log(message.codePointAt(3)); // 56842

console.log(String.fromCodePoint(0x1F60A)); // ☺
console.log(String.fromCharCode(97, 98, 55357, 56842, 100, 101)); // ab☺de
console.log(String.fromCodePoint(97, 98, 128522, 100, 101)); // ab☺de
```

**（2）normalize() 方法**

某些 Unicode 字符可以有多种编码方式：

```js
let a1 = String.fromCharCode(0x00C5), 
 a2 = String.fromCharCode(0x212B), 
 a3 = String.fromCharCode(0x0041, 0x030A); 

console.log(a1, a2, a3); // Å, Å, Å 
console.log(a1 === a2); // false 
console.log(a1 === a3); // false 
console.log(a2 === a3); // false
```

为此，Unicode 提供了 4 种规范化形式，可以将字符规范化为一致的格式，无论底层字符的代码是什么。

这 4 种规范化形式是：
- `NFD`（Normalization Form D）
- `NFC`（Normalization Form C）
- `NFKD`（Normalization Form KD）
- `NFKC`（Normalization Form KC）

使用时需要传入表示哪种形式的字符串："NFD"、"NFC"、"NFKD"或"NFKC"。

```js
let a1 = String.fromCharCode(0x00C5), 
 a2 = String.fromCharCode(0x212B), 
 a3 = String.fromCharCode(0x0041, 0x030A); 

console.log(a1.normalize("NFD") === a2.normalize("NFD")); // true 
console.log(a2.normalize("NFKC") === a3.normalize("NFKC")); // true 
console.log(a1.normalize("NFC") === a3.normalize("NFC")); // true
```

**（3）字符串操作方法**

- `concat()` 用于将一个或多个字符串拼接成一个新字符串
- `slice()` 从字符串中提取子字符串
- `substr()` 从字符串中提取子字符串
- `substring()` 从字符串中提取子字符串

```js
let stringValue = "hello world"; 
let result = stringValue.concat(" world", "!"); 

console.log(result); // "hello world world!" 
console.log(stringValue); // "hello world"

console.log(stringValue.slice(3)); // "lo world" 
console.log(stringValue.substring(3)); // "lo world" 
console.log(stringValue.substr(3)); // "lo world"
```

**`slice()`、`substr()` 和 `substring()`的区别**

`slice(start,[end])` 使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分。

start 参数字符串中第一个字符位置为 0, 第二个字符位置为 1, 以此类推，如果是负数表示从尾部截取多少个字符串，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

end 参数如果为负数，-1 指字符串的最后一个字符的位置，-2 指倒数第二个字符，以此类推。如果省略则将字符提取到字符串的末尾。

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"
console.log(stringValue.slice(3, 7)); // "lo w"
console.log(stringValue.slice(-3)); // "rld"
console.log(stringValue.slice(3, -4)); // "lo w"
```

`substr(start,[length])` 使用 start（起始位置） 和 length（长度） 参数来指定字符串提取的部分。

start 要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。

length 子串中的字符数。必须是数值。如果为 0 或为负数，则返回一个空字符串。如果省略则将字符提取到字符串的末尾。

`substring(indexStart, [indexEnd])` 提取字符串中介于两个指定下标之间的字符。

- 从字符串提取的字符 indexStart 包括但不包括 indexEnd
- 如果 indexStart 等于 indexEnd，则返回一个空字符串
- 如果 indexEnd 省略，则将字符提取到字符串的末尾
- 如果任一参数小于 0 或是 NaN，则被视为为 0。
- 如果任何一个参数都大于 String.length，则被视为是 String.length。
- 如果 indexStart 大于 indexEnd，那么效果就好像这两个论点被交换了一样； 例如，str.substring(1, 0) == str.substring(0, 1)

```js
let stringValue = "hello world"; 
console.log(stringValue.slice(-3)); // "rld" 
console.log(stringValue.substring(-3)); // "hello world" 
console.log(stringValue.substr(-3)); // "rld" 
console.log(stringValue.slice(3, -4)); // "lo w" 
console.log(stringValue.substring(3, -4)); // "hel" 
console.log(stringValue.substr(3, -4)); // "" (empty string) 
```

**（4）字符串位置方法**

从字符串中搜索传入的字符串，并返回位置（如果没找到，则返回-1）。

- `indexOf(str,[indexStart])` 从字符串**开头**开始查找子字符串
- `lastIndexOf(str,[indexStart])` 从字符串**末尾**开始查找子字符串

```js
let stringValue = "hello world"; 
console.log(stringValue.indexOf("o")); // 4 
console.log(stringValue.lastIndexOf("o")); // 7 

console.log(stringValue.indexOf("o", 6)); // 7 
console.log(stringValue.lastIndexOf("o", 6)); // 4
```

**（5）字符串包含方法**

ECMAScript 6 增加了 3 个用于判断字符串中是否包含另一个字符串的方法

- `startsWith(str,[start])` 检查开始于**索引 0**的匹配项，第二个参数表示开始搜索的位置
- `endsWith(str,[length])` 检查开始于**末尾**的匹配项，第二个参数表示应该当作字符串末尾的位置，省略则默认就是字符串长度
- `includes(str,[start])` 检查**整个字符串**，第二个参数表示开始搜索的位置

```js
let message = "foobarbaz"; 
console.log(message.startsWith("foo")); // true 
console.log(message.startsWith("bar")); // false 

console.log(message.endsWith("baz")); // true 
console.log(message.endsWith("bar")); // false 

console.log(message.includes("bar")); // true 
console.log(message.includes("qux")); // false

// 第二个参数
console.log(message.startsWith("foo")); // true 
console.log(message.startsWith("foo", 1)); // false 

console.log(message.endsWith("bar")); // false 
console.log(message.endsWith("bar", 6)); // true 

console.log(message.includes("bar")); // true 
console.log(message.includes("bar", 4)); // false 
```

**（6）删除空格、复制和填充方法**

- `trim()` 删除前、后所有空格符，不改变原来字符
- `trimLeft()` 从字符串**开始**清理空格符
- `trimRight()` 从字符串**末尾**清理空格符
- `repeat()` 表示要将字符串复制多少次，然后返回拼接所有副本后的结果
- `padStart()` 从**开始位置**复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件
- `padEnd()` 从**末尾位置**复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件
- `toLowerCase()` 转为换小写
- `toLocaleLowerCase()` 转为换小写，基于特定地区实现
- `toUpperCase()` 转为换大写
- `toLocaleUpperCase()` 转为换大写，基于特定地区实现
  
```js
let str = " hello world "; 
let trimStr = stringValue.trim(); 
console.log(str); // " hello world " 
console.log(trimStr); // "hello world"

let strings = "na "; 
console.log(strings.repeat(4) + "batman");
// na na na na batman

let stringValue = "foo"; 
console.log(stringValue.padStart(6)); // " foo" 
console.log(stringValue.padStart(9, ".")); // "......foo" 

console.log(stringValue.padEnd(6)); // "foo " 
console.log(stringValue.padEnd(9, ".")); // "foo......"

let stringValue = "foo"; 
console.log(stringValue.padStart(8, "bar")); // "barbafoo" 
console.log(stringValue.padStart(2)); // "foo" 

console.log(stringValue.padEnd(8, "bar")); // "foobarba" 
console.log(stringValue.padEnd(2)); // "foo" 

let stringValue = "hello world"; 
console.log(stringValue.toLocaleUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toLocaleLowerCase()); // "hello world" 
console.log(stringValue.toLowerCase()); // "hello world"
```

**（7）字符串迭代和解构**

```js
let message = "abc"; 
let stringIterator = message[Symbol.iterator](); 
console.log(stringIterator.next()); // {value: "a", done: false} 
console.log(stringIterator.next()); // {value: "b", done: false} 
console.log(stringIterator.next()); // {value: "c", done: false} 
console.log(stringIterator.next()); // {value: undefined, done: true} 

console.log([...message]); // ["a", "b", "c"] 
```

**（8）字符串模式匹配方法**

- `match()` 参数可以是一个正则表达式字符串或一个 RegExp 对象，接收一个参数，可以是一个正则表达式字符串，也可以是一个 RegExp 对象
- `search()` 参数可以是正则表达式字符串或 RegExp 对象，返回模式第一个匹配的位置索引，如果没找到则返回 -1，始终从字符串开头向后匹配模式
- `replace()` 字符串替换操作，第一个参数以是一个字符串、正则表达式字符串、RegExp 对象；第二个参数可以是一个字符串或一个函数
- `split()` 方法会根据传入的分隔符将字符串拆分成数组

```js
let text = "cat, bat, sat, fat"; 
let pattern = /.at/;
console.log(matches[0]); // "cat"

let pos = text.search(/at/); 
console.log(pos); // 1

let result = text.replace(/at/g, "ond"); 
console.log(result); // "cond, bond, sond, fond"

// 特殊序列替换
let text = "cat, bat, sat, fat"; 
result = text.replace(/(.at)/g, "word ($1)"); 
console.log(result); // word (cat), word (bat), word (sat), word (fat)

let colorText = "red,blue,green,yellow"; 
let colors1 = colorText.split(","); // ["red", "blue", "green", "yellow"] 
let colors2 = colorText.split(",", 2); // ["red", "blue"] 
```

**（9）localeCompare() 方法**

这个方法比较两个字符串

```js
let stringValue = "yellow"; 
console.log(stringValue.localeCompare("brick")); // 1 
console.log(stringValue.localeCompare("yellow")); // 0 
console.log(stringValue.localeCompare("zoo")); // -1
```

**（10）HTML 方法**

- anchor(name) `<a name="name">string</a>`
- big() `<big>string</big>`
- bold() `<b>string</b>`
- fixed() `<tt>string</tt>`
- fontcolor(color) `<font color="color">string</font>`
- fontsize(size) `<font size="size">string</font>`
- italics() `<i>string</i>`
- link(url) `<a href="url">string</a>`
- small() `<small>string</small>`
- strike() `<strike>string</strike>`
- sub() `<sub>string</sub>`
- sup() `<sup>string</sup>`

## 4、Function

JavaScript 中的函数使用 function 关键字声明，后跟一组参数，然后是函数体。

```js
function sayHi(name, message) { 
 console.log("Hello " + name + ", " + message); 
}
```

### 4.1 箭头函数

JavaScript 6 新增了使用胖箭头（=>）语法定义函数表达式的能力。

```js
let arrowSum1 = (a, b) => { 
 return a + b; 
};

let arrowSum2 = (a, b) => a + b;
```

箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。

### 4.2 函数名

因为函数名就是指向函数的指针，所以它们跟其他包含对象指针的变量具有相同的行为。这意味着一个函数可以有多个名称

```js
function sum(num1, num2) { 
 return num1 + num2; 
} 

console.log(sum(10, 10)); // 20 

let anotherSum = sum; 
console.log(anotherSum(10, 10)); // 20 

sum = null; 
console.log(anotherSum(10, 10)); // 20
```

ES6 的所有函数对象都会暴露一个只读的 name 属性，其中包含关于函数的信息。

```js
function foo() {} 
let bar = function() {}; 
let baz = () => {}; 

console.log(foo.name); // foo 
console.log(bar.name); // bar 
console.log(baz.name); // baz 

console.log((() => {}).name); //（空字符串）
console.log((new Function()).name); // anonymous
```

使用 bind() 实例化

```js
function fn(a, b, c) {
  return a + b + c;
}

var _fn = fn.bind(null, 10);
var ans = _fn(20, 30); // 60
```

## 5、Global

Global 对象是 ECMAScript 中最特别的对象，因为代码不会显式地访问它。

但 ES2020 最终定义了 `globalThis` 作为在任何上下文中引用全局对象的标准方式。

```js
console.log(globalThis);
```

当 JavaScript 解释器启动时(或者每当 web 浏览器加载一个新页面时)，它会创建一个新的全局对象，并为其提供一组初始属性，这些属性定义:

- 全局常量，如 `undefined`、`Infinity` 和 `NaN`
- 全局函数，如 `isNaN()`， `parseInt()` 和 `eval()`
- 构造函数，如 `Date()`， `RegExp()`， `String()`， `Object()` 和 `Array()`
- 全局对象，如 `Math` 和 `JSON`

### 5.1 URL 编码方法

将编码统一资源标识符（URI），有效的 URI 不能包含某些字符，比如空格

- `encodeURI()` 不会编码属于 URL 组件的特殊字符，比如冒号、斜杠、问号、井号
- `encodeURIComponent()` 会编码它发现的所有非标准字符
- `decodeURI()` 字符解码
- `decodeURIComponent()` 字符解码
- `escape()` 对特殊字符进行编码，但以下字符除外： * @ - _ + . / *（已废弃使用）*
- `unescape()` *（已废弃使用）*

```js
let uri = "http://www.wrox.com/illegal value.js#start";

console.log(encodeURI(uri));
// http://www.wrox.com/illegal%20value.js#start

console.log(encodeURIComponent(uri));
// http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start
```

### 5.2 eval() 方法

这个方法就是一个完整的 JavaScript 解释器，它接收一个参数，即一个要执行的 JavaScript 字符串

```js
eval('alert(1)');
// 等价于：
alert(1);
```

通过 eval() 定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在 eval() 执行的时候才会被创建。

```js
let msg = "hello world"; 
eval("console.log(msg)"); // "hello world"

eval("function sayHi() { console.log('hi'); }"); 
sayHi(); // hi

eval("let msg = 'hello world';"); 
console.log(msg); // Reference Error: msg is not defined 
```

### 5.3 Global 对象属性

| 属性 | 描述 |
| :----: | :----: |
| undefined | 特殊值 undefined |
| NaN | 特殊值 NaN |
| Infinity | 特殊值 Infinity |
| Object | Object 的构造函数 |
| Array | Array 的构造函数 |
| Function | Function 的构造函数 |
| Boolean | Boolean 的构造函数 |
| String | String 的构造函数 |

### 5.4 window 对象

浏览器将 window 对象实现为 Global 对象的代理。因此，所有全局作用域中声明的变量和函数都变成了 window 的属性。

```js
var color = "red"; 
function sayColor() { 
 console.log(window.color); 
} 
window.sayColor(); // "red"
```

## 6、Math

JavaScript 提供了 Math 对象作为保存数学公式、信息和计算的地方。

Math 对象提供了一些辅助计算的属性和方法。

### 6.1  Math 对象属性

Math 对象有一些属性，主要用于保存数学中的一些特殊值。

- `Math.E` 自然对数的基数 e 的值
- `Math.LN10` 10 为底的自然对数
- `Math.LN2` 2 为底的自然对数
- `Math.LOG2E` 以 2 为底 e 的对数
- `Math.LOG10E` 以 10 为底 e 的对数
- `Math.PI` π 的值
- `Math.SQRT1_2` 1/2 的平方根
- `Math.SQRT2` 2 的平方根

### 6.2  min() 和 max() 方法

确定一组数值中的最小值和最大值

```js
let max = Math.max(3, 54, 32, 16); 
console.log(max); // 54 

let min = Math.min(3, 54, 32, 16); 
console.log(min); // 3 
```

### 6.3 舍入方法

是用于把小数值舍入为整数的 4 个方法

- `Math.ceil()` 方法始终向上舍入为最接近的整数
- `Math.floor()` 方法始终向下舍入为最接近的整数
- `Math.round()` 方法执行四舍五入
- `Math.fround()` 方法返回数值最接近的单精度（32 位）浮点值表示

```js
console.log(Math.ceil(25.9)); // 26 
console.log(Math.ceil(25.5)); // 26 
console.log(Math.ceil(25.1)); // 26 

console.log(Math.round(25.9)); // 26 
console.log(Math.round(25.5)); // 26 
console.log(Math.round(25.1)); // 25 

console.log(Math.fround(0.4)); // 0.4000000059604645 
console.log(Math.fround(0.5)); // 0.5 
console.log(Math.fround(25.9)); // 25.899999618530273 

console.log(Math.floor(25.9)); // 25 
console.log(Math.floor(25.5)); // 25 
console.log(Math.floor(25.1)); // 25
```

### 6.4 random() 方法

`Math.random()` 方法返回一个 0~1 范围内的随机数，其中包含 0 但不包含 1。

```js
let num = Math.floor(Math.random() * 10 + 1); // 1~10
```

> 如果是为了加密而需要生成随机数（传给生成器的输入需要较高的不确定性），那么建议使用 `window.crypto.getRandomValues()`

### 6.5 其他方法

- `Math.abs(x)` 返回 x 的绝对值
- `Math.exp(x)` 返回 Math.E 的 x 次幂
- `Math.expm1(x)` 等于 Math.exp(x) - 1
- `Math.log(x)` 返回 x 的自然对数
- `Math.log1p(x)` 等于 1 + Math.log(x)
- `Math.pow(x, power)` 返回 x 的 power 次幂
- `Math.hypot(...nums)` 返回 nums 中每个数平方和的平方根
- `Math.clz32(x)` 返回 32 位整数 x 的前置零的数量
- `Math.sign(x)` 返回表示 x 符号的 1、0、-0 或-1
- `Math.trunc(x)` 返回 x 的整数部分，删除所有小数
- `Math.sqrt(x)` 返回 x 的平方根
- `Math.cbrt(x)` 返回 x 的立方根
- `Math.acos(x)` 返回 x 的反余弦
- `Math.acosh(x)` 返回 x 的反双曲余弦
- `Math.asin(x)` 返回 x 的反正弦
- `Math.asinh(x)` 返回 x 的反双曲正弦
- `Math.atan(x)` 返回 x 的反正切
- `Math.atanh(x)` 返回 x 的反双曲正切
- `Math.atan2(y, x)` 返回 y/x 的反正切
- `Math.cos(x)` 返回 x 的余弦
- `Math.sin(x)` 返回 x 的正弦
- `Math.tan(x)` 返回 x 的正切