(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{377:function(s,t,a){"use strict";a.r(t);var n=a(10),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"媒体查询"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#媒体查询"}},[s._v("#")]),s._v(" 媒体查询")]),s._v(" "),t("p",[s._v("媒体查询是响应式 Web 设计的关键部分，因为它允许你按照视口的尺寸创建不同的布局，不过它也可以用来探测和你的站点运行的环境相关联的其它条件，比如用户是在使用触摸屏还是鼠标。")]),s._v(" "),t("p",[s._v("最简单的媒体查询语法看起来是像这样的：")]),s._v(" "),t("div",{staticClass:"language-css line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" media-type "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("and")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("media-feature-rule"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* CSS rules go here */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("only")]),s._v(" screen "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("and")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("max-width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 768px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 移动端样式 */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("only")]),s._v(" screen "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("and")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("min-width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 769px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* PC端样式 */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("它由以下部分组成：")]),s._v(" "),t("ul",[t("li",[s._v("一个媒体类型，告诉浏览器这段代码是用在什么类型的媒体上的（例如印刷品或者屏幕）；")]),s._v(" "),t("li",[s._v("一个媒体表达式，是一个被包含的 CSS 生效所需的规则或者测试；")]),s._v(" "),t("li",[s._v("一组 CSS 规则，会在测试通过且媒体类型正确的时候应用。")])]),s._v(" "),t("h2",{attrs:{id:"_1、媒体类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、媒体类型"}},[s._v("#")]),s._v(" 1、媒体类型")]),s._v(" "),t("p",[s._v("媒体类型（Media types）描述设备的一般类别。除非使用 not 或 only 逻辑操作符，媒体类型是可选的，并且会（隐式地）应用 all 类型。")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("all")]),s._v(" 适用于所有设备。")]),s._v(" "),t("li",[t("code",[s._v("print")]),s._v(" 适用于在打印预览模式下在屏幕上查看的分页材料和文档。 （有关特定于这些格式的格式问题的信息，请参阅分页媒体。）")]),s._v(" "),t("li",[t("code",[s._v("screen")]),s._v(" 主要用于屏幕。")]),s._v(" "),t("li",[t("code",[s._v("speech")]),s._v(" 主要用于语音合成器。")])]),s._v(" "),t("div",{staticClass:"language-css line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@media")]),s._v(" screen "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("and")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 600px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v("body")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" red"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"_2、逻辑操作符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、逻辑操作符"}},[s._v("#")]),s._v(" 2、逻辑操作符")]),s._v(" "),t("p",[s._v("逻辑操作符（logical operators） not, and, 和 only 可用于联合构造复杂的媒体查询，您还可以通过用逗号分隔多个媒体查询，将它们组合为一个规则。")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("and")]),s._v(" 操作符用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为真时则该条媒体查询为真，它还用于将媒体功能与媒体类型结合在一起。")]),s._v(" "),t("li",[t("code",[s._v("not")]),s._v(" 运算符用于否定媒体查询，如果不满足这个条件则返回true，否则返回false。 如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询。 如果使用not运算符，则还必须指定媒体类型。")]),s._v(" "),t("li",[t("code",[s._v("only")]),s._v(" 运算符仅在整个查询匹配时才用于应用样式，并且对于防止较早的浏览器应用所选样式很有用。 当不使用only时，旧版本的浏览器会将screen and (max-width: 500px)简单地解释为screen，忽略查询的其余部分，并将其样式应用于所有屏幕。 如果使用only运算符，则还必须指定媒体类型。")]),s._v(" "),t("li",[t("code",[s._v(",")]),s._v(" 逗号用于将多个媒体查询合并为一个规则。 逗号分隔列表中的每个查询都与其他查询分开处理。 因此，如果列表中的任何查询为true，则整个media语句均返回true。 换句话说，列表的行为类似于逻辑或or运算符。")])])])}),[],!1,null,null,null);t.default=e.exports}}]);