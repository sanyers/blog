(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{393:function(t,a,s){"use strict";s.r(a);var n=s(10),r=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"html-中的-javascript"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#html-中的-javascript"}},[t._v("#")]),t._v(" HTML 中的 JavaScript")]),t._v(" "),a("h2",{attrs:{id:"_1、scrtipt-元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、scrtipt-元素"}},[t._v("#")]),t._v(" 1、scrtipt 元素")]),t._v(" "),a("p",[a("code",[t._v("<script>")]),t._v(" 元素有下列 8 个属性：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("async")]),t._v("：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。")]),t._v(" "),a("li",[a("code",[t._v("charset")]),t._v("：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。")]),t._v(" "),a("li",[a("code",[t._v("crossorigin")]),t._v("：可选。配置相关请求的 CORS（跨源资源共享）设置。默认不使用 CORS。\n"),a("ul",[a("li",[a("code",[t._v('crossorigin="anonymous"')]),t._v(" 配置文件请求不必设置凭据标志。")]),t._v(" "),a("li",[a("code",[t._v('crossorigin="use-credentials"')]),t._v(" 设置凭据标志，意味着出站请求会包含凭据。")])])]),t._v(" "),a("li",[a("code",[t._v("defer")]),t._v("：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。")]),t._v(" "),a("li",[a("code",[t._v("integrity")]),t._v("：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。")]),t._v(" "),a("li",[a("code",[t._v("language")]),t._v('：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略这个属性，不应该再使用它。')]),t._v(" "),a("li",[a("code",[t._v("src")]),t._v("：可选。表示包含要执行的代码的外部文件。")]),t._v(" "),a("li",[a("code",[t._v("type")]),t._v("：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。")])]),t._v(" "),a("h3",{attrs:{id:"_1-1-标签位置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-标签位置"}},[t._v("#")]),t._v(" 1.1 标签位置")]),t._v(" "),a("p",[t._v("现代 Web 应用程序通常将所有 JavaScript 引用放在"),a("code",[t._v("<body>")]),t._v("元素中的页面内容后面")]),t._v(" "),a("h3",{attrs:{id:"_1-2-推迟执行脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-推迟执行脚本"}},[t._v("#")]),t._v(" 1.2 推迟执行脚本")]),t._v(" "),a("p",[t._v("HTML 4.01 为"),a("code",[t._v("<script>")]),t._v("元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在"),a("code",[t._v("<script>")]),t._v("元素上设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。")]),t._v(" "),a("h3",{attrs:{id:"_1-3-异步执行脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-异步执行脚本"}},[t._v("#")]),t._v(" 1.3 异步执行脚本")]),t._v(" "),a("p",[t._v("HTML5 为"),a("code",[t._v("<script>")]),t._v("元素定义了 async 属性。从改变脚本处理方式上看，async 属性与 defer 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行。")]),t._v(" "),a("p",[t._v("异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 之前或之后。Firefox 3.6、Safari 5 和 Chrome 7 支持异步脚本。使用 async 也会告诉页面你不会使用 document.write")]),t._v(" "),a("h2",{attrs:{id:"_2、行内代码与外部文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、行内代码与外部文件"}},[t._v("#")]),t._v(" 2、行内代码与外部文件")]),t._v(" "),a("p",[t._v("虽然可以直接在 HTML 文件中嵌入 JavaScript 代码，但通常认为最佳实践是尽可能将 JavaScript 代码放在外部文件中。")]),t._v(" "),a("p",[t._v("推荐使用外部文件的理由如下：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("可维护性")]),t._v("。JavaScript 代码如果分散到很多 HTML 页面，会导致维护困难。而用一个目录保存所有 JavaScript 文件，则更容易维护，这样开发者就可以独立于使用它们的 HTML 页面来编辑代码。")]),t._v(" "),a("li",[a("strong",[t._v("缓存")]),t._v("。浏览器会根据特定的设置缓存所有外部链接的 JavaScript 文件，这意味着如果两个页面都用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。")]),t._v(" "),a("li",[a("strong",[t._v("适应未来")]),t._v("。通过把 JavaScript 放到外部文件中，就不必考虑用 XHTML 或前面提到的注释黑科技。包含外部 JavaScript 文件的语法在 HTML 和 XHTML 中是一样的。")])]),t._v(" "),a("h2",{attrs:{id:"_3、文档模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、文档模式"}},[t._v("#")]),t._v(" 3、文档模式")]),t._v(" "),a("p",[t._v("使用 doctype 切换文档模式")]),t._v(" "),a("p",[t._v("最初的文档模式有两种：混杂模式（quirks mode）和标准模式（standards mode）。")]),t._v(" "),a("p",[t._v("随着浏览器的普遍实现，又出现了第三种文档模式：准标准模式（almost standards mode）。")]),t._v(" "),a("h2",{attrs:{id:"_4、-noscript-元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、-noscript-元素"}},[t._v("#")]),t._v(" 4、"),a("code",[t._v("<noscript>")]),t._v(" 元素")]),t._v(" "),a("p",[a("code",[t._v("<noscript>")]),t._v("元素可以包含任何可以出现在 "),a("code",[t._v("<body>")]),t._v(" 中的 HTML 元素")]),t._v(" "),a("p",[t._v("浏览器将显示包含在 "),a("code",[t._v("<noscript>")]),t._v(" 中的内容：")]),t._v(" "),a("ul",[a("li",[t._v("浏览器不支持脚本；")]),t._v(" "),a("li",[t._v("浏览器对脚本的支持被关闭。")])]),t._v(" "),a("p",[t._v("任何一个条件被满足，包含在 "),a("code",[t._v("<noscript>")]),t._v(" 中的内容就会被渲染。")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token doctype"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),a("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Example HTML Page"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("defer")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("defer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("example1.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("defer")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("defer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("example2.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("noscript")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("This page requires a JavaScript-enabled browser."),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("noscript")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h2",{attrs:{id:"_5、总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、总结"}},[t._v("#")]),t._v(" 5、总结")]),t._v(" "),a("ul",[a("li",[t._v("要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。")]),t._v(" "),a("li",[t._v("所有"),a("code",[t._v("<script>")]),t._v("元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在"),a("code",[t._v("<script>")]),t._v("元素中的代码必须严格按次序解释。")]),t._v(" "),a("li",[t._v("对不推迟执行的脚本，浏览器必须解释完位于"),a("code",[t._v("<script>")]),t._v("元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把"),a("code",[t._v("<script>")]),t._v("元素放到页面末尾，介于主内容之后及"),a("code",[t._v("</body>")]),t._v("标签之前。")]),t._v(" "),a("li",[t._v("可以使用 "),a("code",[t._v("defer")]),t._v(" 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。")]),t._v(" "),a("li",[t._v("可以使用 "),a("code",[t._v("async")]),t._v(" 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。")]),t._v(" "),a("li",[t._v("通过使用"),a("code",[t._v("<noscript>")]),t._v("元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则"),a("code",[t._v("<noscript>")]),t._v("元素中的任何内容都不会被渲染。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);