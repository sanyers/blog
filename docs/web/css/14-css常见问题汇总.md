# css常见问题汇总

## 1、iframe 轻微滚动及无法滚动和100%宽度超出屏幕

（1）使用 iframe 页面会有轻微上下滚动

```css
.iframe-style {
	height: 100%;
	width: 100%;
	border: none;
	margin: 0;
	vertical-align: top;/*解决轻微滚动*/
}
```

（2）iframe 适配安卓移动端，有时无法上下滚动

解决：无法滚动的 html div 增加 overflow 属性 absolute 布局

```css
.detai-item-scroll {
	margin-left: 0.62rem;/*10px*/
	margin-right: 0.62rem;
	position: absolute;
	top: 3.25rem;/*52px*/
	bottom: 2.87rem;/*46px*/
	width:calc(100% - (0.62rem) * 2);
	box-sizing: border-box;
	overflow: scroll;
}

/* 删除滚动条 */
.detai-item-scroll::-webkit-scrollbar {
	display: none;
}
```

（3）宽度设置为100%，使用 margin/padding 会超出屏幕宽度，可以使用 calc 进行宽度计算，再加上 box 属性用于 padding 向里压缩

```css
.test {
  width:calc(100% - (0.62rem) * 2); /* 0.62rem 是 padding 距离 */
  box-sizing: border-box;
}
```

参考：https://blog.csdn.net/neabea2016/article/details/82732538