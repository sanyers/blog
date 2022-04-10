# css 选择器

选择器所选择的元素，叫做“选择器的对象”。

## 1、组合选择器

如果你有多个使用相同样式的 CSS 选择器，那么这些单独的选择器可以被混编为一个“选择器列表”，这样，规则就可以应用到所有的单个选择器上了。

```css
h1 {
  color: blue;
}

.special {
  color: blue;
}

/* 组合 */
h1,
.special {
  color: blue;
}
```

## 2、选择器的种类

- 类型选择器 `h1 { }`
- 通配选择器 `* { }`
- 类选择器 `.box { }`
- ID 选择器 `#unique { }`
- 标签属性选择器 `a[title] { }`
- 伪类选择器 `p:first-child { }`
- 伪元素选择器 `p::first-line { }`
- 后代选择器 `article p`
- 子代选择器 `article > p`
- 相邻兄弟选择器 `h1 + p`
- 通用兄弟选择器 `h1 ~ p`

### 2.1 类型选择器

类型选择器有时也叫做“标签名选择器”或者是”元素选择器“，因为它在文档中选择了一个 HTML 标签/元素的缘故。在下面的示例中，我们已经用了 span、em 和 strong 选择器，`<span>`、`<em>` 和 `<strong>` 元素的所有实例这样就都被样式化了。

```css
span {
  background-color: yellow;
}

strong {
  color: rebeccapurple;
}

em {
  color: rebeccapurple;
}
```

### 2.2 通配选择器

通配选择器，是由一个星号（\*）代指的，它选中了文档中的所有内容（或者是父元素中的所有内容，比如，它紧随在其他元素以及邻代运算符之后的时候）。

```css
* {
  margin: 0;
}

article *:first-child {
}
```

### 2.3 类选择器

类选择器以一个句点（.）开头，会选择文档中应用了这个类的所有物件。

```css
.highlight {
  background-color: yellow;
}

/* 指向特定元素的类 */
span.highlight {
  background-color: yellow;
}

h1.highlight {
  background-color: pink;
}
```

### 2.4 ID 选择器

ID 选择器开头为#而非句点，不过基本上和类选择器是同种用法。

```css
#one {
  background-color: yellow;
}

h1#heading {
  color: rebeccapurple;
}
```

### 2.5 属性选择器

CSS 属性选择器通过已经存在的属性名或属性值匹配元素。

- `[attr]` 表示带有以 attr 命名的属性的元素。
- `[attr=value]` 表示带有以 attr 命名的属性，且属性值为 value 的元素。
- `[attr~=value]` 表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少有一个值为 value。
- `[attr|=value]` 表示带有以 attr 命名的属性的元素，属性值为“value”或是以“value-”为前缀（"-"为连字符，Unicode 编码为 U+002D）开头。典型的应用场景是用来匹配语言简写代码（如 zh-CN，zh-TW 可以用 zh 作为 value）。
- `[attr^=value]` 表示带有以 attr 命名的属性，且属性值是以 value 开头的元素。
- `[attr$=value]` 表示带有以 attr 命名的属性，且属性值是以 value 结尾的元素。
- `[attr*=value]` 表示带有以 attr 命名的属性，且属性值至少包含一个 value 值的元素。
- `[attr operator value i]` 在属性选择器的右方括号前添加一个用空格隔开的字母 i（或 I），可以在匹配属性值时忽略大小写（支持 ASCII 字符范围之内的字母）。
- `[attr operator value s]` 在属性选择器的右方括号前添加一个用空格隔开的字母 s（或 S），可以在匹配属性值时区分大小写（支持 ASCII 字符范围之内的字母）。

```css
a {
  color: blue;
}

/* 以 "#" 开头的页面本地链接 */
a[href^='#'] {
  background-color: gold;
}

/* 包含 "example" 的链接 */
a[href*='example'] {
  background-color: silver;
}

/* 包含 "insensitive" 的链接,不区分大小写 */
a[href*='insensitive' i] {
  color: cyan;
}

/* 包含 "cAsE" 的链接，区分大小写 */
a[href*='cAsE' s] {
  color: pink;
}

/* 以 ".org" 结尾的链接 */
a[href$='.org'] {
  color: red;
}
```

多语言：

```css
/* 将所有包含 `lang` 属性的 <div> 元素的字重设为 bold */
div[lang] {
  font-weight: bold;
}

/* 将所有语言为美国英语的 <div> 元素的文本颜色设为蓝色 */
div[lang~='en-us'] {
  color: blue;
}

/* 将所有语言为葡萄牙语的 <div> 元素的文本颜色设为绿色 */
div[lang='pt'] {
  color: green;
}

/* 将所有语言为中文的 <div> 元素的文本颜色设为红色
   无论是简体中文（zh-CN）还是繁体中文（zh-TW） */
div[lang|='zh'] {
  color: red;
}

/* 将所有 `data-lang` 属性的值为 "zh-TW" 的 <div> 元素的文本颜色设为紫色 */
/* 备注: 和 JS 不同，CSS 可以在不使用双引号的情况下直接使用带连字符的属性名 */
div[data-lang='zh-TW'] {
  color: purple;
}
```

HTML 有序列表：

```css
/* 列表类型不需要大小写敏感标志，这是由于 HTML 处理 type 属性的一个怪癖。 */
ol[type='a'] {
  list-style-type: lower-alpha;
  background: red;
}

ol[type='a' s] {
  list-style-type: lower-alpha;
  background: lime;
}

ol[type='A' s] {
  list-style-type: upper-alpha;
  background: lime;
}
```

### 2.6 伪类

CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，`:hover` 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

```css
/* 所有用户指针悬停的按钮 */
button:hover {
  color: blue;
}
```

| 选择器 | 描述 |
| :----: | :----: |
| `:active` | 在用户激活（例如点击）元素的时候匹配。 |
| `:any-link` | 匹配一个链接的:link和:visited状态。 |
| `:blank` | 匹配空输入值的`<input>`元素。 |
| `:checked` | 匹配处于选中状态的单选或者复选框。 |
| `:current` | 匹配正在展示的元素，或者其上级元素。 |
| `:default` | 匹配一组相似的元素中默认的一个或者更多的UI元素。 |
| `:dir` | 基于其方向性（HTMLdir属性或者CSSdirection属性的值）匹配一个元素。 |
| `:disabled` | 匹配处于关闭状态的用户界面元素。 |
| `:empty` | 匹配除了可能存在的空格外，没有子元素的元素。 |
| `:enabled` | 匹配处于开启状态的用户界面元素。 |
| `:first` | 匹配分页媒体的第一页。 |
| `:first-child` | 匹配兄弟元素中的第一个元素。 |
| `:first-of-type` | 匹配兄弟元素中第一个某种类型的元素。 |
| `:focus` | 当一个元素有焦点的时候匹配。 |
| `:focus-visible` | 当元素有焦点，且焦点对用户可见的时候匹配。 |
| `:focus-within` | 匹配有焦点的元素，以及子代元素有焦点的元素。 |
| `:future` | 匹配当前元素之后的元素。 |
| `:hover` | 当用户悬浮到一个元素之上的时候匹配。 |
| `:indeterminate` | 匹配未定态值的UI元素，通常为复选框。 |
| `:in-range` | 用一个区间匹配元素，当值处于区间之内时匹配。 |
| `:invalid` | 匹配诸如`<input>`的位于不可用状态的元素。 |
| `:lang` | 基于语言（HTMLlang属性的值）匹配元素。 |
| `:last-child` | 匹配兄弟元素中最末的那个元素。 |
| `:last-of-type` | 匹配兄弟元素中最后一个某种类型的元素。 |
| `:left` | 在分页媒体中，匹配左手边的页。 |
| `:link` | 匹配未曾访问的链接。 |
| `:local-link` | 匹配指向和当前文档同一网站页面的链接。 |
| `:is()` | 匹配传入的选择器列表中的任何选择器。 |
| `:not` | 匹配作为值传入自身的选择器未匹配的物件。 |
| `:nth-child` | 匹配一列兄弟元素中的元素——兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配元素1、3、5、7等。即所有的奇数个）。 |
| `:nth-of-type` | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配元素1、3、5、7等。即所有的奇数个）。 |
| `:nth-last-child` | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| `:nth-last-of-type` | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| `:only-child ` | 匹配没有兄弟元素的元素。 |
| `:only-of-type` | 匹配兄弟元素中某类型仅有的元素。 |
| `:optional` | 匹配不是必填的form元素。 |
| `:out-of-range` | 按区间匹配元素，当值不在区间内的的时候匹配。 |
| `:past` | 匹配当前元素之前的元素。 |
| `:placeholder-shown` | 匹配显示占位文字的input元素。 |
| `:playing` | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。 |
| `:paused` | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。 |
| `:read-only` | 匹配用户不可更改的元素。 |
| `:read-write` | 匹配用户可更改的元素。 |
| `:required` | 匹配必填的form元素。 |
| `:right` | 在分页媒体中，匹配右手边的页。 |
| `:root` | 匹配文档的根元素。 |
| `:scope` | 匹配任何为参考点元素的的元素。 |
| `:valid` | 匹配诸如`<input>`元素的处于可用状态的元素。 |
| `:target` | 匹配当前URL目标的元素（例如如果它有一个匹配当前URL分段的元素）。 |
| `:visited` | 匹配已访问链接。 |

### 2.7 伪元素

伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。

```css
/* 每一个 <p> 元素的第一行。 */
p::first-line {
  color: blue;
  text-transform: uppercase;
} 
```

> 一个选择器中只能使用一个伪元素。伪元素必须紧跟在语句中的简单选择器/基础选择器之后。注意：按照规范，应该使用双冒号（::）而不是单个冒号（:），以便区分伪类和伪元素。但是，由于旧版本的 W3C 规范并未对此进行特别区分，因此目前绝大多数的浏览器都同时支持使用这两种方式来表示伪元素。

| 选择器 | 描述 |
| :----: | :----: |
| `::after` | 匹配出现在原有元素的实际内容之后的一个可样式化元素。 |
| `::before` | 匹配出现在原有元素的实际内容之前的一个可样式化元素。 |
| `::first-letter` | 匹配元素的第一个字母。 |
| `::first-line` | 匹配包含此伪元素的元素的第一行。 |
| `::grammar-error` | 匹配文档中包含了浏览器标记的语法错误的那部分。 |
| `::selection` | 匹配文档中被选择的那部分。 |
| `::spelling-error` | 匹配文档中包含了浏览器标记的拼写错误的那部分。 |

### 2.8 后代选择器

后代选择器——典型用单个空格（` `）字符——组合两个选择器，比如，第二个选择器匹配的元素被选择，如果他们有一个祖先（父亲，父亲的父亲，父亲的父亲的父亲，等等）元素匹配第一个选择器。选择器利用后代组合符被称作后代选择器。

```css
body article p
```

### 2.9 子代选择器

子代关系选择器是个大于号（`>`），只会在选择器选中直接子元素的时候匹配。继承关系上更远的后代则不会匹配。

```css
article > p
```

### 2.10 相邻兄弟选择器

相邻兄弟选择器（`+`）用来选中恰好处于另一个在继承关系上同级的元素旁边的物件。

```css
p + img
```

### 2.11 通用兄弟选择器

如果你想选中一个元素的兄弟元素，即使它们不直接相邻，你还是可以使用通用兄弟关系选择器（~）。要选中所有的<p>元素后任何地方的<img>元素，我们会这样做：

```css
p ~ img
```

## 3、参考

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors