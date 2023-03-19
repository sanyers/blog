# css 效果示例

## 1、两行文字超出省略

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
