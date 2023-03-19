# css面试题汇总

## 1、介绍一下 CSS 的盒子模型？

有两种， IE 盒子模型、W3C 盒子模型；

盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；

区 别： IE 的 content 部分把 border 和 padding 计算了进去;

## 2、css 选择器优先级？

!important > 行内样式（比重1000）> ID 选择器（比重100） > 类选择器（比重10） > 标签（比重1） > 通配符 > 继承 > 浏览器默认属性

## 3、垂直居中几种方式？

- 单行文本: line-height = height
- 图片: vertical-align: middle;
- absolute 定位: top: 50%;left: 50%;transform: translate(-50%, -50%);
- flex: display:flex;margin:auto
- 视口：width:50vw;height:50vh;margin:25vh auto;

## 4、简明说一下 CSS link 与 @import 的区别和用法？

- link 是 XHTML 标签，除了加载CSS外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。
- link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。
- link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
- link 支持使用 Javascript 控制 DOM 去改变样式；而@import不支持。

## 5、rgba和opacity的透明效果有什么不同？

opacity 会继承父元素的 opacity 属性，而 RGBA 设置的元素的后代元素不会继承不透明属性。

## 6、display:none 和 visibility:hidden 的区别？

- `display:none` 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。
- `visibility:hidden` 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

## 7、position的值， relative和absolute分别是相对于谁进行定位的？

- `relative`:相对定位，相对于自己本身在正常文档流中的位置进行定位。
- `absolute`:生成绝对定位，相对于最近一级定位不为static的父元素进行定位。
- `fixed`: （老版本IE不支持）生成绝对定位，相对于浏览器窗口或者frame进行定位。
- `static`:默认值，没有定位，元素出现在正常的文档流中。
- `sticky`:生成粘性定位的元素，容器的位置根据正常文档流计算得出。

## 8、CSS3 里面都新增了那些新特性？

- 2d，3d变换
- Transition, animation 动画
- 媒体查询
- 新的单位（rem, vw，vh 等）
- 圆角（border-radius），阴影（box-shadow），对文字加特效（text-shadow），线性渐变（gradient），旋转（transform）transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
- rgba

## 9、BFC 是什么？

BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于普通流，即：元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
只要元素满足下面任一条件即可触发 BFC 特性

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## 10、移动端1px

https://www.cnblogs.com/xgqfrms/p/13369752.html

https://www.jianshu.com/p/31f8907637a6

## 参考

https://www.jianshu.com/p/b0df07f2860c