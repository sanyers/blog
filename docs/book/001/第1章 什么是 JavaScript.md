# 第1章 什么是 JavaScript

1995 年，JavaScript 问世。当时，它的主要用途是代替 Perl 等服务器端语言处理输入验证。在此之
前，要验证某个必填字段是否已填写，或者某个输入的值是否有效，需要与服务器的一次往返通信。网
景公司希望通过在其 Navigator 浏览器中加入 JavaScript 来改变这个局面。在那个普遍通过电话拨号上网
的年代，由客户端处理某些基本的验证是让人兴奋的新功能。缓慢的网速让页面每次刷新都考验着人们
的耐心。

从那时起，JavaScript 逐渐成为市面上所有主流浏览器的标配。如今，JavaScript 的应用也不再局限
于数据验证，而是渗透到浏览器窗口及其内容的方方面面。JavaScript 已被公认为主流的编程语言，能
够实现复杂的计算与交互，包括闭包、匿名（lambda）函数，甚至元编程等特性。不仅是桌面浏览器，
手机浏览器和屏幕阅读器也支持 JavaScript，其重要性可见一斑。就连拥有自家客户端脚本语言 VBScript
的微软公司，也在其 Internet Explorer（以下简称 IE）浏览器最初的版本中包含了自己的 JavaScript 实现。

## 1.1 简短的历史回顾
1995 年，网景公司一位名叫 Brendan Eich 的工程师，开始为即将发布的 Netscape Navigator 2 开发一
个叫 Mocha（后来改名为 LiveScript）的脚本语言。当时的计划是在客户端和服务器端都使用它，它在
服务器端叫 LiveWire。

为了赶上发布时间，网景与 Sun 公司结为开发联盟，共同完成 LiveScript 的开发。就在 Netscape
Navigator 2正式发布前，网景把 LiveScript改名为 JavaScript，以便搭上媒体当时热烈炒作 Java的顺风车。

由于 JavaScript 1.0 很成功，网景又在 Netscape Navigator 3 中发布了 1.1 版本。尚未成熟的 Web 的受
欢迎程度达到了历史新高，而网景则稳居市场领导者的位置。这时候，微软决定向 IE 投入更多资源。
就在 Netscape Navigator 3发布后不久，微软发布了 IE3，其中包含自己名为 JScript（叫这个名字是为了
避免与网景发生许可纠纷）的 JavaScript 实现。1996 年 8 月，微软重磅进入 Web 浏览器领域，这是网景
永远的痛，但它代表 JavaScript 作为一门语言向前迈进了一大步。

1997 年，JavaScript 1.1 作为提案被提交给欧洲计算机制造商协会（Ecma）。第 39 技术委员会（TC39）
承担了“标准化一门通用、跨平台、厂商中立的脚本语言的语法和语义”的任务（参见 TC39-ECMAScript）。
TC39 委员会由来自网景、Sun、微软、Borland、Nombas和其他对这门脚本语言有兴趣的公司的工程师
组成。他们花了数月时间打造出 ECMA-262，也就是 ECMAScript（发音为“ek-ma-script”）这个新的脚
本语言标准。

1998 年，国际标准化组织（ISO）和国际电工委员会（IEC）也将 ECMAScript 采纳为标准（ISO/
IEC-16262）。自此以后，各家浏览器均以 ECMAScript 作为自己 JavaScript 实现的依据，虽然具体实现
各有不同。

## 1.2 JavaScript 实现
虽然JavaScript和ECMAScript基本上是同义词，但JavaScript远远不限于ECMA-262所定义的那样。
没错，完整的 JavaScript 实现包含以下几个部分（见图 1-1）：
- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

<a data-fancybox title="xx" href="/img/book/001/1-1.jpg"><img :src="$withBase('/img/book/001/1-1.jpg')" alt="1-1"></a>

### 1.2.1 ECMAScript
**ECMAScript**，即 ECMA-262 定义的语言，并不局限于 Web 浏览器。事实上，这门语言没有输入和
输出之类的方法。ECMA-262 将这门语言作为一个基准来定义，以便在它之上再构建更稳健的脚本语言。
Web 浏览器只是 ECMAScript 实现可能存在的一种**宿主环境**（host environment）。宿主环境提供
ECMAScript 的基准实现和与环境自身交互必需的扩展。扩展（比如 DOM）使用 ECMAScript 核心类型
和语法，提供特定于环境的额外功能。其他宿主环境还有服务器端 JavaScript 平台 Node.js和即将被淘汰
的 Adobe Flash。

在基本的层面，它描述这门语言的如下部分：
- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

#### 1. ECMAScript 版本
ECMAScript 不同的版本以“edition”表示（也就是描述特定实现的 ECMA-262 的版本）。ECMA-262 的第 1 版本质上跟网景的 JavaScript 1.1 相同，只不过删除了所有浏览器特定的代码，外加少量细微的修改。

**ECMA-262 第 2 版**只是做了一些编校工作，主要是为了更新之后严格符合 ISO/IEC-16262 的要求，
并没有增减或改变任何特性。

**ECMA-262 第 3 版**第一次真正对这个标准进行更新，更新了字符串处理、错误定义和数值输出。此外还增加了对正则表达式、新的控制语句、 try / catch 异常处理的支持，以及为了更好地让标准国际化
所做的少量修改。

**ECMA-262 第 4 版**是对这门语言的一次彻底修订。作为对 JavaScript 在 Web上日益成功的回应，开
发者开始修订 ECMAScript 以满足全球 Web 开发日益增长的需求。为此，Ecma T39 再次被召集起来，
以决定这门语言的未来。结果，他们制定的规范几乎在第 3 版基础上完全定义了一门新语言。第 4 版包
括强类型变量、新语句和数据结构、真正的类和经典的继承，以及操作数据的新手段。

与此同时，TC39 委员会的一个子委员会也提出了另外一份提案，叫作“ECMAScript 3.1”，只对这
门语言进行了较少的改进。这个子委员会的人认为第 4 版对这门语言来说跳跃太大了。因此，他们提出
了一个改动较小的提案，只要在现有 JavaScript 引擎基础上做一些增改就可以实现。最终，ES3.1 子委员
会赢得了 TC39 委员会的支持，ECMA-262 第 4 版在正式发布之前被放弃。

ECMAScript 3.1 变成了 ECMA-262 的第 5 版，于 2009 年 12 月 3 日正式发布。第 5 版致力于厘清
第 3 版存在的歧义，也增加了新功能。新功能包括原生的解析和序列化 JSON 数据的 JSON 对象、方便
继承和高级属性定义的方法，以及新的增强 ECMAScript 引擎解释和执行代码能力的严格模式。第 5 版
在 2011 年 6 月发布了一个维护性修订版，这个修订版只更正了规范中的错误，并未增加任何新的语言
或库特性。

**ECMA-262 第 6 版**，俗称 ES6、ES2015 或 ES Harmony（和谐版），于 2015年 6月发布。这一版包
含了大概这个规范有史以来最重要的一批增强特性。ES6 正式支持了类、模块、迭代器、生成器、箭头
函数、期约、反射、代理和众多新的数据类型。

**ECMA-262 第 7 版**，也称为 ES7 或 ES2016，于 2016 年 6 月发布。这次修订只包含少量语法层面的
增强，如 Array.prototype.includes 和指数操作符。

**ECMA-262 第 8 版**，也称为 ES8、ES2017，完成于 2017 年 6 月。这一版主要增加了异步函数（async/
await）、 SharedArrayBuffer 及 Atomics API，以及 Object.values() / Object.entries() / Object.
getOwnPropertyDescriptors() 和字符串填充方法，另外明确支持对象字面量最后的逗号。

**ECMA-262 第 9 版**，也称为 ES9、ES2018，发布于 2018 年 6 月。这次修订包括异步迭代、剩余和
扩展属性、一组新的正则表达式特性、 Promise finally() ，以及模板字面量修订。

**ECMA-262第 10版**，也称为 ES10、ES2019，发布于 2019年 6月。这次修订增加了 Array.prototype.
flat() / flatMap() 、 String.prototype.trimStart() / trimEnd() 、 Object.fromEntries() 方
法，以及 Symbol.prototype.description 属性，明确定义了 Function.prototype.toString()
的返回值并固定了 Array.prototype.sort() 的顺序。另外，这次修订解决了与 JSON 字符串兼容的
问题，并定义了 catch 子句的可选绑定。

#### 2. ECMAScript 符合性是什么意思
ECMA-262 阐述了什么是 ECMAScript 符合性。要成为 ECMAScript 实现，必须满足下列条件：
- 支持 ECMA-262 中描述的所有“类型、值、对象、属性、函数，以及程序语法与语义”；
- 支持 Unicode 字符标准。
此外，符合性实现还可以满足下列要求。
- 增加 ECMA-262 中未提及的“额外的类型、值、对象、属性和函数”。ECMA-262 所说的这些额
外内容主要指规范中未给出的新对象或对象的新属性。
- 支持 ECMA-262 中没有定义的“程序和正则表达式语法”（意思是允许修改和扩展内置的正则表
达式特性）。

#### 3. 浏览器对 ECMAScript 的支持
1996 年，Netscape Navigator 3 发布时包含了 JavaScript 1.1。JavaScript 1.1 规范随后被提交给 Ecma，
作为对新的 ECMA-262 标准的建议。

Netscape Navigator 3 发布后不久，微软推出了 IE3。IE 的这个版本包含了 JScript 1.0，本意是提供与
JavaScript 1.1 相同的功能。

JScript 的再次更新出现在 IE4 中的 JScript 3.0（2.0 版是在 Microsoft Internet Information Server 3.0中
发布的，但从未包含在浏览器中）。

网景又在 Netscape Navigator 4.06 中将其 JavaScript 版本升级到 1.3，因此做到了与 ECMA-262第 1
版完全兼容。JavaScript 1.3 增加了对 Unicode 标准的支持，并做到了所有对象都与平台无关，同时保留
了 JavaScript 1.2所有的特性。

到了 2008 年，五大浏览器（IE、Firefox、Safari、Chrome 和 Opera）全部兼容 ECMA-262 第 3 版。
IE8 率先实现 ECMA-262 第 5 版，并在 IE9 中完整支持。Firefox 4 很快也做到了。

### 1.2.2 DOM
**文档对象模型**（DOM，Document Object Model）是一个应用编程接口（API），用于在 HTML 中使
用扩展的 XML。DOM 将整个页面抽象为一组分层节点。HTML 或 XML 页面的每个组成部分都是一种
节点，包含不同的数据。比如下面的 HTML 页面：
```html
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <p> Hello World!</p>
    </body>
</html>
```
这些代码通过 DOM 可以表示为一组分层节点，如图 1-2 所示。
<a data-fancybox title="1-2" href="/img/book/001/1-2.jpg"><img :src="$withBase('/img/book/001/1-2.jpg')" alt="1-2"></a>


#### 1. 为什么 DOM 是必需的
在 IE4 和 Netscape Navigator 4支持不同形式的动态 HTML（DHTML）的情况下，开发者首先可以
做到不刷新页面而修改页面外观和内容。这代表了 Web 技术的一个巨大进步，但也暴露了很大的问题。
由于网景和微软采用不同思路开发 DHTML，开发者写一个 HTML 页面就可以在任何浏览器中运行的好
日子就此终结。

为了保持 Web 跨平台的本性，必须要做点什么。人们担心如果无法控制网景和微软各行其是，那
么 Web 就会发生分裂，导致人们面向浏览器开发网页。就在这时，万维网联盟（W3C，World Wide Web
Consortium）开始了制定 DOM标准的进程。

#### 2. DOM 级别
1998 年 10 月，DOM Level 1 成为 W3C 的推荐标准。这个规范由两个模块组成：DOM Core 和 DOM HTML。前者提供了一种映射 XML 文档，从而方便访问和操作文档任意部分的方式；后者扩展了前者，
并增加了特定于 HTML 的对象和方法。

**DOM Level 1**的目标是映射文档结构，而 DOM Level 2 的目标则宽泛得多。这个对最初 DOM 的扩
展增加了对（DHTML 早就支持的）鼠标和用户界面事件、范围、遍历（迭代 DOM 节点的方法）的支
持，而且通过对象接口支持了层叠样式表（CSS）。

**DOM Level 2**新增了以下模块，以支持新的接口。
- **DOM 视图**：描述追踪文档不同视图（如应用 CSS 样式前后的文档）的接口。
- **DOM 事件**：描述事件及事件处理的接口。
- **DOM 样式**：描述处理元素 CSS 样式的接口。
- **DOM 遍历和范围**：描述遍历和操作 DOM树的接口。

**DOM Level 3**进一步扩展了 DOM，增加了以统一的方式加载和保存文档的方法（包含在一个叫 DOM
Load and Save 的新模块中），还有验证文档的方法（DOM Validation）。在 Level 3 中，DOM Core 经过扩
展支持了所有 XML 1.0 的特性，包括 XML Infoset、XPath 和 XML Base。

目前，W3C 不再按照 Level 来维护 DOM 了，而是作为 DOM Living Standard 来维护，其快照称为
DOM4。DOM4 新增的内容包括替代 Mutation Events的 Mutation Observers。

#### 3. 其他 DOM
除了 DOM Core 和 DOM HTML 接口，有些其他语言也发布了自己的 DOM 标准。下面列出的语言
是基于 XML 的，每一种都增加了该语言独有的 DOM 方法和接口：
- 可伸缩矢量图（SVG，Scalable Vector Graphics）
- 数学标记语言（MathML，Mathematical Markup Language）
- 同步多媒体集成语言（SMIL，Synchronized Multimedia Integration Language）

### 1.2.3 BOM
IE3 和 Netscape Navigator 3 提供了**浏览器对象模型**（BOM） API，用于支持访问和操作浏览器的窗
口。使用 BOM，开发者可以操控浏览器显示页面之外的部分。

总体来说，BOM 主要针对浏览器窗口和子窗口（frame），不过人们通常会把任何特定于浏览器的
扩展都归在 BOM的范畴内。比如，下面就是这样一些扩展：
弹出新浏览器窗口的能力；
- 移动、缩放和关闭浏览器窗口的能力；
- navigator 对象，提供关于浏览器的详尽信息；
- location 对象，提供浏览器加载页面的详尽信息；
- screen 对象，提供关于用户屏幕分辨率的详尽信息；
- performance 对象，提供浏览器内存占用、导航行为和时间统计的详尽信息；
- 对 cookie 的支持；
- 其他自定义对象，如 XMLHttpRequest 和 IE 的 ActiveXObject 。

## 1.3 JavaScript 版本
作为网景的继承者，Mozilla 是唯一仍在延续最初 JavaScript 版本编号的浏览器厂商。当初网景在将
其源代码开源时（项目名为 Mozilla Project），JavaScript 在其浏览器中最后的版本是 1.3。（前面提到过，
1.4 版是专门为服务器实现的。）因为 Mozilla Foundation 在持续开发 JavaScript，为它增加新特性、关键
字和语法，所以 JavaScript 的版本号也在不断递增。