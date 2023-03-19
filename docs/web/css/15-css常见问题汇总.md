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

## 2、css 多行出现省略

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
