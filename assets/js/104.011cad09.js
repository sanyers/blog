(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{387:function(s,t,a){"use strict";a.r(t);var n=a(10),r=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"处理json"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#处理json"}},[s._v("#")]),s._v(" 处理JSON")]),s._v(" "),t("p",[s._v("理解 JSON 最关键的一点是要把它当成一种数据格式，而不是编程语言。JSON 不属于 JavaScript，它们只是拥有相同的语法而已。JSON 也不是只能在 JavaScript 中使用，它是一种通用数据格式。很多语言都有解析和序列化 JSON 的内置能力。")]),s._v(" "),t("h2",{attrs:{id:"_1、语法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、语法"}},[s._v("#")]),s._v(" 1、语法")]),s._v(" "),t("p",[s._v("JSON 语法支持表示 3 种类型的值。")]),s._v(" "),t("ul",[t("li",[s._v("简单值：字符串、数值、布尔值和 null 可以在 JSON 中出现，就像在 JavaScript 中一样。特殊值 undefined 不可以。")]),s._v(" "),t("li",[s._v("对象：第一种复杂数据类型，对象表示有序键/值对。每个值可以是简单值，也可以是复杂类型。")]),s._v(" "),t("li",[s._v("数组：第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表。数组的值可以是任意类型，包括简单值、对象，甚至其他数组。")])]),s._v(" "),t("p",[s._v("JSON 没有变量、函数或对象实例的概念。JSON 的所有记号都只为表示结构化数据，虽然它借用了 JavaScript 的语法，但是千万不要把它跟 JavaScript 语言混淆。")]),s._v(" "),t("h3",{attrs:{id:"_1-1-简单值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-简单值"}},[s._v("#")]),s._v(" 1.1 简单值")]),s._v(" "),t("p",[s._v("最简单的 JSON 可以是一个数值。例如，下面这个数值是有效的 JSON：")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 或者字符串")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello world!"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("JavaScript 字符串与 JSON 字符串的主要区别是，JSON 字符串必须使用双引号（单引号会导致语法错误）")]),s._v(" "),t("p",[s._v("布尔值和 null 本身也是有效的 JSON 值。不过，实践中更多使用 JSON 表示比较复杂的数据结构，其中会包含简单值。")]),s._v(" "),t("h3",{attrs:{id:"_1-2-对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-对象"}},[s._v("#")]),s._v(" 1.2 对象")]),s._v(" "),t("p",[s._v("JSON 中的对象必须使用双引号把属性名包围起来")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Nicholas"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"age"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("29")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_1-3-数组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-数组"}},[s._v("#")]),s._v(" 1.3 数组")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hi"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"_2、解析与序列化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、解析与序列化"}},[s._v("#")]),s._v(" 2、解析与序列化")]),s._v(" "),t("p",[s._v("JSON 的迅速流行并不仅仅因为其语法与 JavaScript 类似，很大程度上还因为 JSON 可以直接被解析成可用的 JavaScript 对象。")]),s._v(" "),t("h3",{attrs:{id:"_2-1-json-对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-json-对象"}},[s._v("#")]),s._v(" 2.1 JSON 对象")]),s._v(" "),t("p",[s._v("JSON 对象有两个方法：stringify() 和 parse()。在简单的情况下，这两个方法分别可以将 JavaScript 序列化为 JSON 字符串，以及将 JSON 解析为原生 JavaScript 值。")]),s._v(" "),t("p",[s._v("默认情况下，JSON.stringify() 会输出不包含空格或缩进的 JSON 字符串。")]),s._v(" "),t("p",[s._v("在序列化 JavaScript 对象时，所有函数和原型成员都会有意地在结果中省略。此外，值为 undefined 的任何属性也会被跳过。")]),s._v(" "),t("h3",{attrs:{id:"_2-2-序列化选项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-序列化选项"}},[s._v("#")]),s._v(" 2.2 序列化选项")]),s._v(" "),t("p",[s._v("实际上，JSON.stringify() 方法除了要序列化的对象，还可以接收两个参数。这两个参数可以用于指定其他序列化 JavaScript 对象的方式。第一个参数是过滤器，可以是数组或函数；第二个参数是用于缩进结果 JSON 字符串的选项。")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" book "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("title")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Professional JavaScript"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("authors")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Nicholas C. Zakas"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Matt Frisbie"')]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("edition")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("year")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2017")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" jsonText "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stringify")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("book"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"title"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"edition"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// {"title":"Professional JavaScript","edition":4} ')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 使用函数")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" jsonText "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stringify")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("book"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("switch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"authors"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" \n      "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('","')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"year"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" \n      "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"edition"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" \n      "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("undefined")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" \n      "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// {"title":"Professional JavaScript","authors":"Nicholas C. Zakas,Matt Frisbie","year":5000} ')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 控制缩进")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" jsonText "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stringify")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("book"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// { ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "title": "Professional JavaScript", ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "authors": [ ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "Nicholas C. Zakas", ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "Matt Frisbie" ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//     ], ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "edition": 4, ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//     "year": 2017 ')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// } ")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br"),t("span",{staticClass:"line-number"},[s._v("38")]),t("br")])]),t("h3",{attrs:{id:"_2-3-解析选项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-解析选项"}},[s._v("#")]),s._v(" 2.3 解析选项")]),s._v(" "),t("p",[s._v("JSON.parse() 方法也可以接收一个额外的参数，这个函数会针对每个键/值对都调用一次。为区别于传给 JSON.stringify() 的起过滤作用的"),t("strong",[s._v("替代函数")]),s._v("（replacer），这个函数被称为"),t("strong",[s._v("还原函数")]),s._v("（reviver）。")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" book "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("title")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Professional JavaScript"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("authors")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Nicholas C. Zakas"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Matt Frisbie"')]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("edition")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("year")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2017")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("releaseDate")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Date")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2017")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" jsonText "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stringify")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("book"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" bookCopy "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("parse")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("jsonText"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" key "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"releaseDate"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Date")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("bookCopy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("releaseDate"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getFullYear")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);