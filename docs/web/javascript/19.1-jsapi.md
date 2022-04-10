# JavaScript API

## 1、跨上下文消息

跨文档消息，有时候也简称为 XDM（cross-document messaging），是一种在不同执行上下文（如不同工作线程或不同源的页面）间传递信息的能力。

XDM 的核心是 postMessage() 方法。

postMessage() 方法接收 3 个参数：消息、表示目标接收源的字符串和可选的可传输对象的数组（只与工作线程相关）。

```js
let iframeWindow = document.getElementById("myframe").contentWindow; 
iframeWindow.postMessage("A secret", "http://www.wrox.com");

window.addEventListener("message", (event) => { 
 // 确保来自预期发送者
 if (event.origin == "http://www.wrox.com") { 
 // 对数据进行一些处理
 processMessage(event.data); 
 // 可选：向来源窗口发送一条消息
 event.source.postMessage("Received!", "http://p2p.wrox.com"); 
 } 
}); 
```

## 2、File API 与 Blob API

### 2.1 File 类型

File API 仍然以表单中的文件输入字段为基础，但是增加了直接访问文件信息的能力。

每个 File 对象都有一些只读属性。

- name：本地系统中的文件名。
- size：以字节计的文件大小。
- type：包含文件 MIME 类型的字符串。
- lastModifiedDate：表示文件最后修改时间的字符串。这个属性只有 Chome 实现了。

### 2.2 FileReader 类型

FileReader 类型表示一种异步文件读取机制。可以把 FileReader 想象成类似于 XMLHttpRequest，只不过是用于从文件系统读取文件，而不是从服务器读取数据。

- readAsText(file, encoding)：从文件中读取纯文本内容并保存在 result 属性中。第二个参数表示编码，是可选的。
- readAsDataURL(file)：读取文件并将内容的数据 URI 保存在 result 属性中。
- readAsBinaryString(file)：读取文件并将每个字符的二进制数据保存在 result 属性中。
- readAsArrayBuffer(file)：读取文件并将文件内容以 ArrayBuffer 形式保存在 result 属性。

这些读取方法是异步的，所以每个 FileReader 会发布几个事件，其中 3 个最有用的事件是 progress、error 和 load，分别表示还有更多数据、发生了错误和读取完成。

progress 事件每 50 毫秒就会触发一次，其与 XHR 的 progress 事件具有相同的信息：lengthComputable、loaded 和 total。此外，在 progress 事件中可以读取 FileReader 的 result 属性，即使其中尚未包含全部数据。

### 2.3 FileReaderSync 类型

FileReaderSync 类型就是 FileReader 的同步版本。这个类型拥有与 FileReader 相同的方法，只有在整个文件都加载到内存之后才会继续执行。

### 2.4 Blob 与部分读取

File 对象提供了一个名为 slice() 的方法。slice() 方法接收两个参数：起始字节和要读取的字节数。这个方法返回一个 Blob 的实例，而 Blob 实际上是 File 的超类。

blob 表示二进制大对象（binary larget object），是 JavaScript 对不可修改二进制数据的封装类型。包含字符串的数组、ArrayBuffers、ArrayBufferViews，甚至其他 Blob 都可以用来创建 blob。

### 2.5 对象 URL 与 Blob

对象 URL 有时候也称作 Blob URL，是指引用存储在 File 或 Blob 中数据的 URL。

可以使用 window.URL.createObjectURL() 方法并传入 File 或 Blob 对象。这个函数返回的值是一个指向内存中地址的字符串。因为这个字符串是 URL，所以可以在 DOM 中直接使用。

```js
url = window.URL.createObjectURL(files[0]); 
```

如果想表明不再使用某个对象 URL，则可以把它传给 window.URL.revokeObjectURL()。页面卸载时，所有对象 URL 占用的内存都会被释放。不过，最好在不使用时就立即释放内存，以便尽可能保持页面占用最少资源。

### 2.6 读取拖放文件

```js
let droptarget = document.getElementById("droptarget"); 
function handleEvent(event) { 
  let info = "", 
  output = document.getElementById("output"), 
  files, i, len; 
  event.preventDefault(); 
  if (event.type == "drop") { 
    files = event.dataTransfer.files; 
    i = 0; 
    len = files.length; 
    while (i < len) { 
      info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`; 
      i++; 
    } 
    output.innerHTML = info; 
  } 
} 
droptarget.addEventListener("dragenter", handleEvent); 
droptarget.addEventListener("dragover", handleEvent); 
droptarget.addEventListener("drop", handleEvent);
```

## 3、媒体元素

HTML5 新增了两个与媒体相关的元素，即`<audio>`和`<video>`，从而为浏览器提供了嵌入音频和视频的统一解决方案。

```html
<!-- 嵌入视频 --> 
<video src="conference.mpg" id="myVideo">Video player not available.</video> 
<!-- 嵌入音频 --> 
<audio src="song.mp3" id="myAudio">Audio player not available.</audio> 
```