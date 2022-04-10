## BFC

BFC 全称：Block Formatting Context， 名为 "块级格式化上下文"。

W3C 官方解释为：BFC 它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context 提供了一个环境，HTML 在这个环境中按照一定的规则进行布局。
简单来说就是，BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用 BFC 呢，BFC 可以看做是一个 CSS 元素属性

## 1、怎样触发 BFC

这里简单列举几个触发 BFC 使用的 CSS 属性

- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

## 2、BFC 的规则

- BFC 就是一个块级元素，块级元素会在垂直方向一个接一个的排列
- BFC 就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由 margin 决定， 属于同一个 BFC 的两个相邻的标签外边距会发生重叠
- 计算 BFC 的高度时，浮动元素也参与计算

## 3、BFC 解决了什么问题

### 3.1 使用 float 脱离文档流，高度塌陷

```css
.box {
  margin: 100px;
  width: 100px;
  height: 100px;
  background: red;
  float: left;
}
.container {
  background: #000;
  /* 设置 display: inline-block 触发 BFC */
  display: inline-block;
}
```

### 3.2 margin 边距重叠

```css
.box {
  margin: 10px;
  width: 100px;
  height: 100px;
  background: #000;
}
```

```html
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
</div>
```

两个盒子的 margin 外边距设置的是 10px，但是两个盒子之间只有 10px 的距离，这就导致了 margin 塌陷问题，这时 margin 边距的结果为最大值，而不是合，为了解决此问题可以使用 BFC 规则（为元素包裹一个盒子形成一个完全独立的空间，做到里面元素不受外面布局影响），或者简单粗暴方法一个设置 margin，一个设置 padding。

```html
<div class="container">
  <div class="box"></div>
  <!-- 使用 p 标签包裹设置为独立空间 -->
  <p><div class="box"></div></p>
</div>
```

### 3.3 两栏布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      div {
        width: 200px;
        height: 100px;
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div style="float: left;">
      两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局
    </div>
    <div style="width: 300px;">
      我是蛙人，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭
    </div>
  </body>
</html>
```

上面元素第二个 div 元素为 300px 宽度，但是被第一个 div 元素设置 Float 脱离文档流给覆盖上去了，解决此方法我们可以把第二个 div 元素设置为一个 BFC。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      div {
        width: 200px;
        height: 100px;
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div style="float: left;">
      两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局
    </div>
    <!-- 设置 display: flex; 触发 BFC -->
    <div style="width: 300px;display: flex;">
      我是蛙人，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭
    </div>
  </body>
</html>
```

## 参考

https://juejin.cn/post/6950082193632788493
