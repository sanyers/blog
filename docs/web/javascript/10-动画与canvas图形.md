# 动画与canvas图形

## 1、requestAnimationFrame

requestAnimationFrame() 根据屏幕刷新频率来确定重绘的时序

无论 setInterval() 还是 setTimeout() 都是不能保证时间精度的。作为第二个参数的延时只能保证何时会把代码添加到浏览器的任务队列，不能保证添加到队列就会立即运行。如果队列前面还有其他任务，那么就要等这些任务执行完再执行。简单来讲，这里毫秒延时并不是说何时这些代码会执行，而只是说到时候会把回调加到任务队列。如果添加到队列后，主线程还被其他任务占用，比如正在处理用户操作，那么回调就不会马上执行。

requestAnimationFrame() 方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数。

```js
function updateProgress() {
  // 重绘操作
  requestAnimationFrame(updateProgress); 
} 
requestAnimationFrame(updateProgress);
```

### 1.1 cancelAnimationFrame()

与 setTimeout() 类似，requestAnimationFrame() 也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame() 来取消重绘任务。

```js
let requestID = window.requestAnimationFrame(() => { 
  console.log('Repaint!'); 
}); 
window.cancelAnimationFrame(requestID);
```

### 1.2 通过 requestAnimationFrame 节流

```js
let enqueued = false; 
function expensiveOperation() { 
  console.log('Invoked at', Date.now()); 
  enqueued = false; 
} 
window.addEventListener('scroll', () => { 
  if (!enqueued) { 
    enqueued = true; 
    window.requestAnimationFrame(expensiveOperation); 
  } 
});
```

将回调限制为不超过 50 毫秒执行一次：

```js
let enabled = true; 
function expensiveOperation() { 
 console.log('Invoked at', Date.now()); 
} 
window.addEventListener('scroll', () => { 
 if (enabled) { 
 enabled = false; 
 window.requestAnimationFrame(expensiveOperation); 
 window.setTimeout(() => enabled = true, 50); 
 } 
});
```

## 2、基本的画布功能

创建`<canvas>`元素时至少要设置其 width 和 height 属性，这样才能告诉浏览器在多大面积上绘图。出现在开始和结束标签之间的内容是后备数据，会在浏览器不支持`<canvas>`元素时显示。

```html
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>
```

要在画布上绘制图形，首先要取得绘图上下文。使用 getContext()方法可以获取对绘图上下文的引用。

对于平面图形，需要给这个方法传入参数"2d"，表示要获取 2D 上下文对象：

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
  let context = drawing.getContext("2d"); 
  // 其他代码
}
```

可以使用 toDataURL() 方法导出`<canvas>`元素上的图像

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
  // 取得图像的数据 URI 
  let imgURI = drawing.toDataURL("image/png"); 
  // 显示图片
  let image = document.createElement("img"); 
  image.src = imgURI; 
  document.body.appendChild(image); 
} 
```

## 3、2D 绘图上下文

2D 绘图上下文提供了绘制 2D 图形的方法，包括矩形、弧形和路径。2D 上下文的坐标原点(0, 0)在`<canvas>`元素的左上角。所有坐标值都相对于该点计算，因此 x 坐标向右增长，y 坐标向下增长。默认情况下，width 和 height 表示两个方向上像素的最大值。

### 3.1 填充和描边

2D 上下文有两个基本绘制操作：填充和描边。填充以指定样式（颜色、渐变或图像）自动填充形状，而描边只为图形边界着色。

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
  let context = drawing.getContext("2d"); 
  context.strokeStyle = "red"; 
  context.fillStyle = "#0000ff"; 
} 
```

### 3.2 绘制矩形

与绘制矩形相关的方法有 3 个：fillRect()、strokeRect() 和 clearRect()。

### 3.3 绘制路径

通过路径可以创建复杂的形状和线条。要绘制路径，必须首先调用 beginPath() 方法以表示要开始绘制新路径。

### 3.4 绘制文本

使用 fillText() 和 strokeText() 方法绘制文本。这两个方法都接收 4 个参数：要绘制的字符串、x 坐标、y 坐标和可选的最大像素宽度。

### 3.5 变换

在创建绘制上下文时，会以默认值初始化变换矩阵，从而让绘制操作如实应用到绘制结果上。对绘制上下文应用变换，可以导致以不同的变换矩阵应用绘制操作，从而产生不同的结果。

以下方法可用于改变绘制上下文的变换矩阵。

- rotate(angle)：围绕原点把图像旋转 angle 弧度。
- scale(scaleX, scaleY)：通过在 x 轴乘以 scaleX、在 y 轴乘以 scaleY 来缩放图像。scaleX 和 scaleY 的默认值都是 1.0。
- translate(x, y)：把原点移动到(x, y)。执行这个操作后，坐标(0, 0)就会变成(x, y)。
- transform(m1_1, m1_2, m2_1, m2_2, dx, dy)
- setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)：把矩阵重置为默认值，再以传入的参数调用 transform()。

### 3.6 绘制图像

drawImage() 9 个参数：要绘制的图像、源图像 x 坐标、源图像 y 坐标、源图像宽度、源图像高度、目标区域 x 坐标、目标区域 y 坐标、目标区域宽度和目标区域高度。这

```js
let image = document.images[0]; 
context.drawImage(image, 10, 10); 
context.drawImage(image, 50, 10, 20, 30); 
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);
```

### 3.7 阴影

2D 上下文可以根据以下属性的值自动为已有形状或路径生成阴影。

- shadowColor：CSS 颜色值，表示要绘制的阴影颜色，默认为黑色。
- shadowOffsetX：阴影相对于形状或路径的 x 坐标的偏移量，默认为 0。
- shadowOffsetY：阴影相对于形状或路径的 y 坐标的偏移量，默认为 0。
- shadowBlur：像素，表示阴影的模糊量。默认值为 0，表示不模糊。

### 3.8 渐变

```js
let gradient = context.createLinearGradient(30, 30, 70, 70); 
gradient.addColorStop(0, "white"); 
gradient.addColorStop(1, "black"); 
```

### 3.9 图案

```js
let image = document.images[0], 
 pattern = context.createPattern(image, "repeat"); 
// 绘制矩形
context.fillStyle = pattern; 
context.fillRect(10, 10, 150, 150); 
```

### 3.10 图像数据

使用 getImageData() 方法获取原始图像数据。

### 3.11 合成

2D上下文中绘制的所有内容都会应用两个属性：globalAlpha 和 globalComposition Operation

## 4、WebGL

WebGL 是画布的 3D 上下文。与其他 Web 技术不同，WebGL 不是 W3C 制定的标准，而是 Khronos Group 的标准。

根据官网描述，“Khronos Group 是非营利性、会员资助的联盟，专注于多平台和设备下并行计算、图形和动态媒体的无专利费开放标准”。Khronos Group 也制定了其他图形 API，包括作为浏览器中 WebGL 基础的 OpenGL ES 2.0。

> 定型数组是在 WebGL 中执行操作的重要数据结构。

### 4.1 WebGL 上下文

在完全支持的浏览器中，WebGL 2.0 上下文的名字叫"webgl2"，WebGL 1.0 上下文的名字叫"webgl1"。如果浏览器不支持 WebGL，则尝试访问 WebGL 上下文会返回 null。

在使用上下文之前，应该先检测返回值是否存在：

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
  let gl = drawing.getContext("webgl"); 
  if (gl){ 
    // 使用 WebGL 
  } 
} 
```

### 4.2 WebGL 基础

取得 WebGL 上下文后，就可以开始 3D 绘图了。如前所述，因为 WebGL 是 OpenGL ES 2.0 的 Web 版，所以本节讨论的概念实际上是 JavaScript 所实现的 OpenGL 概念。

可以在调用 getContext() 取得 WebGL 上下文时指定一些选项。这些选项通过一个参数对象传入，选项就是参数对象的一个或多个属性。

- alpha：布尔值，表示是否为上下文创建透明通道缓冲区，默认为 true。
- depth：布尔值，表示是否使用 16 位深缓冲区，默认为 true。
- stencil：布尔值，表示是否使用 8 位模板缓冲区，默认为 false。
- antialias：布尔值，表示是否使用默认机制执行抗锯齿操作，默认为 true。
- premultipliedAlpha：布尔值，表示绘图缓冲区是否预乘透明度值，默认为 true。
- preserveDrawingBuffer：布尔值，表示绘图完成后是否保留绘图缓冲区，默认为 false。

```js
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
  let gl = drawing.getContext("webgl", { alpha: false }); 
  if (gl) { 
    // 使用 WebGL 
  } 
}
```