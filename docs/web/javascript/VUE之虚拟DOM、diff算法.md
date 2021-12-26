# VUE之虚拟DOM、diff算法

## 一、浏览器渲染解析流程
浏览器渲染引擎工作流程都差不多，大致分为5步：

**创建DOM树**——**创建StyleRules**——**创建Render树**——**布局Layout**——**绘制Painting**

- 第一步，用HTML分析器，分析HTML元素，构建一颗DOM树(标记化和树构建)。

- 第二步，用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。

- 第三步，将DOM树和样式表，关联起来，构建一颗Render树(这一过程又称为Attachment)。每个DOM节点都有**attach方法，接受样式信息**，返回一个render对象(又名renderer)。这些render对象最终会被构建成一颗Render树。

- 第四步，有了Render树，浏览器开始布局，为每个Render树上的节点确定一个在显示屏上出现的精确坐标。

- 第五步，Render树和节点显示坐标都有了，就调用每个节点**paint方法**，把它们绘制出来。 

DOM树的构建是文档加载完成开始的？构建DOM数是一个渐进过程，为达到更好用户体验，渲染引擎会尽快将内容显示在屏幕上。它不必等到整个HTML文档解析完毕之后才开始构建render数和布局。

Render树是DOM树和CSSOM树构建完毕才开始构建的吗？这三个过程在实际进行的时候又不是完全独立，而是会有交叉。会造成一边加载，一遍解析，一遍渲染的工作现象。

CSS的解析是从右往左逆向解析的(从DOM树的下－上解析比上－下解析效率高)，**嵌套标签越多，解析越慢**。

<a data-fancybox title="webkit渲染引擎工作流程" href="/img/web/1/1.png"><img :src="$withBase('/img/web/1/1.png')" alt="webkit渲染引擎工作流程"></a>

webkit渲染引擎工作流程

## 二、浏览器的回流与重绘
划重点：回流必将引起重绘，重绘不一定会引起回流。

### 回流 (Reflow)
当Render树中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

会导致回流的操作：

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的DOM元素
- 激活CSS伪类（例如：:hover）
- 查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

### 重绘 (Repaint)
当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

### 性能影响
**回流比重绘的代价要更高。**

有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。

现代浏览器会对频繁的回流或重绘操作进行优化：

浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。

当你访问以下属性或方法时，浏览器会立刻清空队列：

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- width、height
- getComputedStyle()
- getBoundingClientRect()

因为队列中可能会有影响到这些属性或方法返回值的操作，即使你希望获取的信息与队列中操作引发的改变无关，浏览器也会强行清空队列，确保你拿到的值是最精确的。

### 如何避免

1. CSS

- 避免使用table布局。
- 尽可能在DOM树的最末端改变class。
- 避免设置多层内联样式。
- 将动画效果应用到position属性为absolute或fixed的元素上。
- 避免使用CSS表达式（例如：calc()）。

2. JavaScript

- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
- 也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## 三、DOM Diff
1. Dom Diff的本质
比对渲染更新前后产生的两个虚拟dom对象的差异(diff)，并产出差异补丁对象，再将差异补丁对象应用到真实dom节点上

2. 为什么需要Dom Diff？
大家应该都知道操作Dom代价是昂贵的，因为操作Dom其本质是两个线程（JS引擎和GUI渲染引擎）间发送指令（通信）的过程，并且浏览器在创建初始化一个元素时，会为其创建很多属性，因此，在大量操作Dom的场景下，通过一些计算来尽可能少地操作Dom，保证了性能的下限。当然Dom Diff不一定更快！

一句话概述：用JavaScript的树形结构对象来描述真实dom结构

3. 虚拟Dom从初次渲染到更新

<a data-fancybox title="虚拟Dom渲染" href="/img/web/1/2.png"><img :src="$withBase('/img/web/1/2.png')" alt="虚拟Dom渲染"></a>

(1) 用JS对象模拟DOM（虚拟DOM1）

(2) 将此虚拟DOM1转成真实DOM并插入页面中（render）

(3) 如果有事件发生（用户操作更新数据）修改了虚拟DOM产生虚拟DOM2，比较两棵虚拟 DOM树的差异，得到差异对象（diff）

(4) 把差异对象应用到真正的DOM树上（patch）