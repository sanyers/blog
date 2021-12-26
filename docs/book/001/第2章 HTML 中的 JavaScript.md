# 第2章 HTML 中的 JavaScript

将 JavaScript 引入网页，首先要解决它与网页的主导语言 HTML 的关系问题。

## 2.1  &lt;script&gt; 元素
将 JavaScript 插入 HTML 的主要方法是使用 &lt;script&gt; 元素。这个元素是由网景公司创造出来，并
最早在 Netscape Navigator 2中实现的。后来，这个元素被正式加入到 HTML 规范。 &lt;script&gt; 元素有下
列 8 个属性。
- async ：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其
他脚本加载。只对外部脚本文件有效。
- charset ：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不
在乎它的值。
- crossorigin ：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。 crossorigin=
"anonymous" 配置文件请求不必设置凭据标志。 crossorigin="use-credentials" 设置凭据
标志，意味着出站请求会包含凭据。
- defer ：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
- integrity ：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，
Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，
脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提
供恶意内容。
- language ：废弃。最初用于表示代码块中的脚本语言（如 "JavaScript" 、 "JavaScript 1.2"
或 "VBScript" ）。大多数浏览器都会忽略这个属性，不应该再使用它。
- src ：可选。表示包含要执行的代码的外部文件。
- type ：可选。代替 language ，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯
例，这个值始终都是 "text/javascript" ，尽管 "text/javascript" 和 "text/ecmascript"
都已经废弃了。JavaScript 文件的 MIME 类型通常是 "application/x-javascript" ，不过给
type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有
"application/javascript" 和 "application/ecmascript" 。如果这个值是 module ，则代
码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。

在使用行内 JavaScript 代码时，要注意代码中不能出现字符串 &lt;/script&gt; 。

浏览器在解析这个资源时，会向 src 属性指定的路径发送一个 GET 请求，以取得相应资源，假定
是一个 JavaScript 文件。这个初始的请求不受浏览器同源策略限制，但返回并被执行的 JavaScript 则受限
制。当然，这个请求仍然受父页面 HTTP/HTTPS 协议的限制。

### 2.1.1 标签位置
现代 Web 应用程序通常将所有 JavaScript 引用放在 &lt;body&gt; 元素中的页面内容后面

### 2.1.2 推迟执行脚本
在 &lt;script&gt; 元素上
设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。

 defer 属性只对外部脚本文件才有效

 对于 XHTML 文档，指定 defer 属性时应该写成 defer="defer"。

 ### 2.1.3 异步执行脚本
 HTML5 为 &lt;script&gt; 元素定义了 async 属性。从改变脚本处理方式上看， async 属性与 defer 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行

### 2.1.4 动态加载脚本
```javascript
let script = document.createElement('script');
script.src = 'gibberish.js';
document.head.appendChild(script);
```
在把 HTMLElement 元素添加到 DOM且执行到这段代码之前不会发送请求。默认情况下，
以这种方式创建的 &lt;script&gt; 元素是以异步方式加载的，相当于添加了 async 属性。

要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们：

`<link rel="preload" href="gibberish.js">`

## 2.2 行内代码与外部文件
推荐使用外部文件的理由如下。
- 可维护性。JavaScript 代码如果分散到很多 HTML 页面，会导致维护困难。而用一个目录保存
所有 JavaScript 文件，则更容易维护，这样开发者就可以独立于使用它们的 HTML 页面来编辑
代码。
- 缓存。浏览器会根据特定的设置缓存所有外部链接的 JavaScript 文件，这意味着如果两个页面都
用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。
- 适应未来。通过把 JavaScript 放到外部文件中，就不必考虑用 XHTML 或前面提到的注释黑科技。
包含外部 JavaScript 文件的语法在 HTML 和 XHTML 中是一样的。

## 2.3 文档模式
最初的文档模式有两种：**混杂模式（quirks mode）**和**标准模式（standards mode）**。

随着浏览器的普遍实现，又出现了第三种文档模式：**准标准模式（almost standards mode）**。这种模式下的浏览器支持很多标准的特性，但是没有标准规定得那么严格。

```html
<!-- HTML5 -->
<!DOCTYPE html>
```

## 2.4  &lt;noscript&gt; 元素
&lt;noscript&gt; 元素可以包含任何可以出现在 &lt;body&gt; 中的 HTML 元素， &lt;script&gt; 除外。在下列两种情况下，浏览器将显示包含在 &lt;noscript&gt; 中的内容：
- 浏览器不支持脚本；
- 浏览器对脚本的支持被关闭。

任何一个条件被满足，包含在 &lt;noscript&gt; 中的内容就会被渲染。否则，浏览器不会渲染 &lt;noscript&gt; 中的内容。