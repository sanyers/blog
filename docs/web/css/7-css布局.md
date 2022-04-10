# css 布局

CSS 页面布局技术允许我们拾取网页中的元素，并且控制它们相对正常布局流、周边元素、父容器或者主视口/窗口的位置。

css 布局技术包括：

- 正常布局流
- display 属性
- flexbox 弹性盒子
- grid 网格布局
- float 浮动布局
- position 定位布局
- table 表格布局
- column 多列布局

每种技术都有它们的用途，各有优缺点，相互辅助。

## 1、正常布局流(Normal flow)

正常布局流(normal flow)是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式。

当出现在另一个元素下面的元素被描述为块元素，与出现在另一个元素旁边的内联元素不同，内联元素就像段落中的单个单词一样。

> 块元素内容的布局方向被描述为块方向。块方向在英语等具有水平书写模式(writing mode)的语言中垂直运行。它可以在任何垂直书写模式的语言中水平运行。对应的内联方向是内联内容（如句子）的运行方向。

下列布局技术会覆盖默认的布局行为：

- display 属性
- float 浮动
- position 定位
- table 表格
- column 多列

## 2、display 属性

在 css 中实现页面布局的主要方法是设定 display 属性的值。此属性允许我们更改默认的显示方式。正常流中的所有内容都有一个 display 的值，用作元素的默认行为方式。

可设置值：

- `display: none;` 会从文档流移除该元素及其子元素，仿佛它们是不存在的。它们占据的空间会释放出来。
- `display: inline;` 产生行内元素，没有自己的高度和宽度，由容器决定，前后不会产生换行。
- `display: block;` 产生块级元素，会占据一行，占满容器的宽度。
- `display: list-item;` 将元素渲染为一个列表项，行首产生一个列表标记，可以用 list-style 定制样式。
- `display: inline-block;` 产生行内的块级元素，有自己的高和宽，但是前后不会产生换行。

## 3、弹性盒子(Flexbox)

Flexbox 是 CSS 弹性盒子布局模块（Flexible Box Layout Module）的缩写，它被专门设计出来用于创建横向或是纵向的**一维页面布局**。要使用 flexbox，你只需要在想要进行 flex 布局的父元素上应用 display: flex ，所有直接子元素都将会按照 flex 进行布局。详情见 [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)

```css
.wrapper {
  display: flex;
}
.wrapper > div {
  flex: 1;
  /* flex:1 等于设置如下 */
  /* flex-grow: 1; 改属性是设置 flex 增长系数
  flex-shrink: 1;
  flex-basis: 0%; */
}
```

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
</div>
```

## 4、Grid 布局

Grid 布局是**二维页面布局**，用于同时在两个维度上把元素按行和列排列整齐。

除了使用 display:grid，我们还分别使用 grid-template-rows 和 grid-template-columns 两个属性定义了一些行和列的轨道。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}
```

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
  <div class="box6">Six</div>
</div>
```

## 5、float 浮动

把一个元素“浮动”(float)起来，会改变该元素本身和在正常布局流（normal flow）中跟随它的其他元素的行为。这一元素会浮动到左侧或右侧，并且从正常布局流(normal flow)中移除，这时候其他的周围内容就会在这个被设置浮动(float)的元素周围环绕。

float 属性有四个可能的值：

- `left` — 将元素浮动到左侧。
- `right` — 将元素浮动到右侧。
- `none` — 默认值, 不浮动。
- `inherit` — 继承父元素的浮动属性。

示例：

```html
h1>Simple float example</h1>

<div class="box">Float</div>

<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>
```

```css
.box {
  float: left;
  width: 150px;
  height: 150px;
  margin-right: 30px;
}
/* 清空浮动 */
footer {
  clear: both;
}
```

## 6、position 定位

定位(positioning)能够让我们把一个元素从它原本在正常布局流(normal flow)中应该在的位置移动到另一个位置。定位(positioning)并不是一种用来给你做主要页面布局的方式，它更像是让你去管理和微调页面中的一个特殊项的位置。

有五种主要的定位类型需要我们了解：

- **静态定位(Static positioning)** 是每个元素默认的属性——它表示“将元素放在文档布局流的默认位置——没有什么特殊的地方”。
- **相对定位(Relative positioning)** 允许我们相对于元素在正常的文档流中的位置移动它——包括将两个元素叠放在页面上。这对于微调和精准设计(design pinpointing)非常有用。
- **绝对定位(Absolute positioning)** 将元素完全从页面的正常布局流(normal layout flow)中移出，类似将它单独放在一个图层中。我们可以将元素相对于页面的 `<html>` 元素边缘固定，或者相对于该元素的最近被定位祖先元素(nearest positioned ancestor element)。绝对定位在创建复杂布局效果时非常有用，例如通过标签显示和隐藏的内容面板或者通过按钮控制滑动到屏幕中的信息面板。
- **固定定位(Fixed positioning)** 与绝对定位非常类似，但是它是将一个元素相对浏览器视口固定，而不是相对另外一个元素。 这在创建类似在整个页面滚动过程中总是处于屏幕的某个位置的导航菜单时非常有用。
- **粘性定位(Sticky positioning)** 是一种新的定位方式，它会让元素先保持和 position: static 一样的定位，当它的相对视口位置(offset from the viewport)达到某一个预设值时，他就会像 position: fixed 一样定位。

```css
.positioned {
  position: relative;
  top: 30px;
  left: 30px;
}
```

## 7、table 表格布局

一个`<table>`标签之所以能够像表格那样展示，是由于 css 默认给`<table>`标签设置了一组 table 布局属性。当这些属性被应用于排列非`<table>`元素时，这种用法被称为“使用 CSS 表格”。

```css
form {
  display: table;
  margin: 0 auto;
}
```

## 8、column 多列布局

多列布局模组给了我们 一种把内容按列排序的方式，就像文本在报纸上排列那样。

要把一个块转变成多列容器(multicol container)，我们可以使用 `column-count` 属性来告诉浏览器我们需要多少列，也可以使用 `column-width` 来告诉浏览器以至少某个宽度的尽可能多的列来填充容器。

```css
.container {
  column-width: 200px;
}
```

## 9、参考

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction
