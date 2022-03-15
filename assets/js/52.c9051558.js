(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{502:function(_,v,t){"use strict";t.r(v);var i=t(24),a=Object(i.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"其他"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[_._v("#")]),_._v(" 其他")]),_._v(" "),t("h2",{attrs:{id:"_1、常见的浏览器内核有哪些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、常见的浏览器内核有哪些"}},[_._v("#")]),_._v(" 1、常见的浏览器内核有哪些？")]),_._v(" "),t("p",[_._v("主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。")]),_._v(" "),t("ul",[t("li",[_._v("渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。")]),_._v(" "),t("li",[_._v("JS引擎则：解析和执行javascript来实现网页的动态效果。")]),_._v(" "),t("li",[_._v("最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。")])]),_._v(" "),t("p",[_._v("常见内核")]),_._v(" "),t("ul",[t("li",[_._v("Trident 内核：IE, MaxThon, TT, The World, 360, 搜狗浏览器等。[又称 MSHTML]")]),_._v(" "),t("li",[_._v("Gecko 内核：Netscape6 及以上版本，FF, MozillaSuite / SeaMonkey 等")]),_._v(" "),t("li",[_._v("Presto 内核：Opera7 及以上。 [Opera内核原为：Presto，现为：Blink;]")]),_._v(" "),t("li",[_._v("Webkit 内核：Safari, Chrome等。 [ Chrome的：Blink（WebKit 的分支）]")])]),_._v(" "),t("h2",{attrs:{id:"_2、网页前端性能优化的方式有哪些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、网页前端性能优化的方式有哪些"}},[_._v("#")]),_._v(" 2、网页前端性能优化的方式有哪些？")]),_._v(" "),t("ol",[t("li",[_._v("压缩 css, js, 图片")]),_._v(" "),t("li",[_._v("减少 http 请求次数， 合并 css、js 、合并图片（雪碧图）")]),_._v(" "),t("li",[_._v("使用 CDN")]),_._v(" "),t("li",[_._v("减少 dom 元素数量")]),_._v(" "),t("li",[_._v("图片懒加载")]),_._v(" "),t("li",[_._v("静态资源另外用无 cookie 的域名")]),_._v(" "),t("li",[_._v("减少 dom 的访问（缓存 dom）")]),_._v(" "),t("li",[_._v("巧用事件委托")]),_._v(" "),t("li",[_._v("样式表置顶、脚本置低")])]),_._v(" "),t("h2",{attrs:{id:"_3、网页从输入网址到渲染完成经历了哪些过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、网页从输入网址到渲染完成经历了哪些过程"}},[_._v("#")]),_._v(" 3、网页从输入网址到渲染完成经历了哪些过程？")]),_._v(" "),t("p",[_._v("大致可以分为如下7步：")]),_._v(" "),t("ul",[t("li",[_._v("输入网址；")]),_._v(" "),t("li",[_._v("发送到DNS服务器，并获取域名对应的web服务器对应的ip地址；")]),_._v(" "),t("li",[_._v("与web服务器建立TCP连接；")]),_._v(" "),t("li",[_._v("浏览器向web服务器发送http请求；")]),_._v(" "),t("li",[_._v("web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）；")]),_._v(" "),t("li",[_._v("浏览器下载web服务器返回的数据及解析html源文件；")]),_._v(" "),t("li",[_._v("生成DOM树，解析css和js，渲染页面，直至显示完成；")])]),_._v(" "),t("h2",{attrs:{id:"_4、线程与进程的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、线程与进程的区别"}},[_._v("#")]),_._v(" 4、线程与进程的区别？")]),_._v(" "),t("ul",[t("li",[_._v("一个程序至少有一个进程,一个进程至少有一个线程.")]),_._v(" "),t("li",[_._v("线程的划分尺度小于进程，使得多线程程序的并发性高。")]),_._v(" "),t("li",[_._v("另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。")]),_._v(" "),t("li",[_._v("线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。")]),_._v(" "),t("li",[_._v("从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。")])]),_._v(" "),t("h2",{attrs:{id:"_5、http常见的状态码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5、http常见的状态码"}},[_._v("#")]),_._v(" 5、HTTP常见的状态码？")]),_._v(" "),t("ul",[t("li",[_._v("100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息")]),_._v(" "),t("li",[_._v("200 OK 正常返回信息")]),_._v(" "),t("li",[_._v("201 Created 请求成功并且服务器创建了新的资源")]),_._v(" "),t("li",[_._v("202 Accepted 服务器已接受请求，但尚未处理")]),_._v(" "),t("li",[_._v("301 Moved Permanently 请求的网页已永久移动到新位置。")]),_._v(" "),t("li",[_._v("302 Found 临时性重定向。")]),_._v(" "),t("li",[_._v("303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。")]),_._v(" "),t("li",[_._v("304 Not Modified 自从上次请求后，请求的网页未修改过。")]),_._v(" "),t("li",[_._v("400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。")]),_._v(" "),t("li",[_._v("401 Unauthorized 请求未授权。")]),_._v(" "),t("li",[_._v("403 Forbidden 禁止访问。")]),_._v(" "),t("li",[_._v("404 Not Found 找不到如何与 URI 相匹配的资源。")]),_._v(" "),t("li",[_._v("500 Internal Server Error 最常见的服务器端错误。")]),_._v(" "),t("li",[_._v("503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。")])]),_._v(" "),t("h2",{attrs:{id:"_6、图片懒加载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6、图片懒加载"}},[_._v("#")]),_._v(" 6、图片懒加载？")]),_._v(" "),t("p",[_._v("当页面滚动的时间被触发 -> 执行加载图片操作 -> 判断图片是否在可视区域内 -> 在，则动态将data-src的值赋予该图片")]),_._v(" "),t("h2",{attrs:{id:"_7、移动端性能优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7、移动端性能优化"}},[_._v("#")]),_._v(" 7、移动端性能优化？")]),_._v(" "),t("ul",[t("li",[_._v("尽量使用css3动画，开启硬件加速")]),_._v(" "),t("li",[_._v("适当使用touch事件代替click事件")]),_._v(" "),t("li",[_._v("避免使用css3渐变阴影效果")]),_._v(" "),t("li",[_._v("可以用transform: translateZ(0) 来开启硬件加速")]),_._v(" "),t("li",[_._v("不滥用float。float在渲染时计算量比较大，尽量减少使用")]),_._v(" "),t("li",[_._v("不滥用web字体。web字体需要下载，解析，重绘当前页面")]),_._v(" "),t("li",[_._v("合理使用requestAnimationFrame动画代替setTimeout")]),_._v(" "),t("li",[_._v("css中的属性（css3 transitions、css3 3D transforms、opacity、webGL、video）会触发GUP渲染，耗电")])]),_._v(" "),t("h2",{attrs:{id:"_8、tcp-传输的三次握手、四次挥手策略"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8、tcp-传输的三次握手、四次挥手策略"}},[_._v("#")]),_._v(" 8、TCP 传输的三次握手、四次挥手策略")]),_._v(" "),t("p",[_._v("三次握手：")]),_._v(" "),t("p",[_._v("为了准确无误地吧数据送达目标处，TCP协议采用了三次握手策略。用TCP协议把数据包送出去后，TCP不会对传送后的情况置之不理，他一定会向对方确认是否送达，握手过程中使用TCP的标志：SYN和ACK")]),_._v(" "),t("ul",[t("li",[_._v("发送端首先发送一个带SYN的标志的数据包给对方")]),_._v(" "),t("li",[_._v("接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息")]),_._v(" "),t("li",[_._v("最后，发送端再回传一个带ACK的标志的数据包，代表“握手”结束")])]),_._v(" "),t("p",[_._v("如在握手过程中某个阶段莫明中断，TCP协议会再次以相同的顺序发送相同的数据包")]),_._v(" "),t("p",[_._v("断开一个TCP连接需要“四次挥手”")]),_._v(" "),t("ul",[t("li",[_._v("第一次挥手：主动关闭方发送一个FIN，用来关注主动方到被动关闭方的数据传送，也即是主动关闭方告诫被动关闭方：我已经不会再给你发数据了（在FIN包之前发送的数据，如果没有收到对应的ACK确认报文，主动关闭方依然会重发这些数据）。但是，此时主动关闭方还可以接受数据")]),_._v(" "),t("li",[_._v("第二次挥手：被动关闭方收到FIN包后，发送一个ACK给对方，确认序号收到序号 +1（与SYN相同，一个 FIN占用一个序号）")]),_._v(" "),t("li",[_._v("第三次挥手：被动关闭方发送一个 FIN。用来关闭被动关闭方到主动关闭方的数据传送，也就是告诉主动关闭方，我的数据也发送完了，不会给你发送数据了")]),_._v(" "),t("li",[_._v("第四次挥手：主动关闭方收到FIN后，发送一个ACK给被动关闭方，确认序号为收到序号+1，至此，完成四次挥手")])]),_._v(" "),t("h2",{attrs:{id:"_9、http-和-https-为什么https安全"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_9、http-和-https-为什么https安全"}},[_._v("#")]),_._v(" 9、HTTP 和 HTTPS，为什么HTTPS安全？")]),_._v(" "),t("p",[_._v("HTTP协议通常承载与 TCP协议之上，在HTTP和TCP之间添加一个安全协议层（SSL或TSL），这个时候，就成了我们常说的HTTPS")]),_._v(" "),t("p",[_._v("默认HTTP的端口号为80，HTTPS的端口号为443")]),_._v(" "),t("p",[_._v("因为网络请求需要中间有很多的服务器路由的转发，中间的节点都可能篡改信息，而如果使用HTTPS，密钥在你和终点站才有，https之所有说比http安全，是因为他利用ssl/tls协议传输。包含证书，流量转发，负载均衡，页面适配，浏览器适配，refer传递等，保障了传输过程的安全性")])])}),[],!1,null,null,null);v.default=a.exports}}]);