# css 常见问题汇总

## 1、iframe 轻微滚动及无法滚动和 100%宽度超出屏幕

（1）使用 iframe 页面会有轻微上下滚动

```css
.iframe-style {
  height: 100%;
  width: 100%;
  border: none;
  margin: 0;
  vertical-align: top; /*解决轻微滚动*/
}
```

（2）iframe 适配安卓移动端，有时无法上下滚动

解决：无法滚动的 html div 增加 overflow 属性 absolute 布局

```css
.detai-item-scroll {
  margin-left: 0.62rem; /*10px*/
  margin-right: 0.62rem;
  position: absolute;
  top: 3.25rem; /*52px*/
  bottom: 2.87rem; /*46px*/
  width: calc(100% - (0.62rem) * 2);
  box-sizing: border-box;
  overflow: scroll;
}

/* 删除滚动条 */
.detai-item-scroll::-webkit-scrollbar {
  display: none;
}
```

（3）宽度设置为 100%，使用 margin/padding 会超出屏幕宽度，可以使用 calc 进行宽度计算，再加上 box 属性用于 padding 向里压缩

```css
.test {
  width: calc(100% - (0.62rem) * 2); /* 0.62rem 是 padding 距离 */
  box-sizing: border-box;
}
```

参考：https://blog.csdn.net/neabea2016/article/details/82732538

## 2、css 文字省略

（1）多行出现省略

```html
<div class="test">
  <span>
    这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
  </span>
</div>
<style>
  .test {
    width: 200px;
    span {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      white-space: pre-wrap;
      height: 72px;
    }
  }
</style>
```

（2）两行文字超出省略

```html
<style>
  .test {
    width: 200px;
  }
  .test span {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    white-space: pre-wrap;
    height: 72px;
  }
</style>
<div class="test">
  <span> 水电费第三方温热无若无水电费水电费沃尔沃二高度高度尔特瑞特 </span>
</div>
```

（3）单行省略

```css
.test {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

## 3、css 隐藏滚动条

```less
.scroolbar-hide {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
}
```

## 4、css 修改滚动条样式

```css
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(238, 238, 238, 1);
  width: 10px;
  height: 10px;
  border: 6px;
}
::-webkit-scrollbar-button {
  width: 10px;
  height: 10px;
  border: 2px;
  background: transparent;
}
::-webkit-scrollbar-corner {
  width: 10px;
  height: 10px;
  border: 2px;
  background: transparent;
}
::-webkit-scrollbar-track-piece:start {
  width: 10px;
  height: 10px;
  border: 2px;
  background: transparent;
}
```

## 5、img 和 div 高度不同的问题

img 在 div 中会在底部产生额外的空隙

（1）将图片设为块级元素

```css
img {
  display: block;
}
```

（2）将 div 字体大小设置为 0

```css
div {
  font-size: 0;
}
/* 缺点:div内部无法显示文字 */
```

（3）将图片的对齐方式设为 bottom（推荐）

```css
img {
  vertical-align: bottom;
}
```

## 6、css 鼠标穿透点击

```css
.test {
  pointer-events: none; /* 元素不再是鼠标事件的目标，鼠标不再监听当前层，而去监听下一层中的元素 */
  pointer-events: auto; /* 默认值 */
}
```

## 7、颜色渐变

```css
/* 边框线性渐变 */
.test {
  /* 边框的颜色为什么不重要，会被下面覆盖的 */
  border: 10px solid black;
	/* 最后面跟的 10 表示内向偏移量，写成和边框设置的宽度一样即可 */
  border-image: linear-gradient(to bottom right,yellow, green) 10;
}

/* 边框径向渐变 */
.test2 {
  border: 1px solid black;
  border-image: radial-gradient(yellow 70%, green 130%) 1;
}

/* 文字渐变 */
.test3 {
　background: linear-gradient(to right, red, blue);
　-webkit-background-clip: text;
　background-clip: text;
　color: transparent;
}
```