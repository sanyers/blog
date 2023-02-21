# 异步JavaScript

有些计算机程序（例如科学模拟和机器学习模型）属于计算密集型。换句话说，这些程序会持续不断地运行，不会暂停，直到计算出结果为止。

不过，大多数现实中的计算机程序则明显是异步的。这意味着它们常常必须停止计算，等待数据到达或某个事件发生。

浏览器中的JavaScript程序是典型的事件驱动型程序，即它们会等待用户单击或触发，然后才会真正执行。而基于JavaScript的服务器则通常要等待客户端通过网络发送请求，然后才能执行操作。

## 1、使用回调的异步编程

在最基本的层面上，JavaScript异步编程是使用回调实现的。回调就是函数，可以传给其他函数。而其他函数会在满足某个条件或发生某个（异步）事件时调用（“回调”）这个函数。

```js
// 定时器
setTimeout(testFn, 6000)

// 事件
div.addEventListener('click', clickFn)

// 网络事件
function getRequest(loadFn, errorFn) {
  const request = new XMLHttpRequest()
  request.open('GET', 'http://www.example.com/api/test')
  request.send()
  request.onload = loadFn
  request.onerror = errorFn
}

// Node中的回调
const fs = require('fs')
fs.readFile('test.json', 'utf-8', (err, text) => {
  ...
})
// // Node中的事件
const https = require('https')
function getText(url, callback) {
  const request = https.get(url)
  request.on('resonse', res => {
    const httpStatus = res.statusCode
    res.setEncoding('utf-8')
    let body = ''
    res.on('data', chunk => { body += chunk })
    res.on('end', () => {
      httpStatus === 200 ? callback(null, body) : callback(httpStatus, null)
    })
  })
  request.on('error', err => callback(err, null))
}
```

## 2、期约 Promise

期约是一个对象，表示异步操作的结果。这个结果可能就绪也可能未就绪。

```js
test().then(data => {
  ...
})

// 处理错误
test().then(data => {
  ...
},err => {
  ...
})

// 使用 catch
test().then(data => {
  ...
}).catch(err => {
  ...
})

// 期约链
test().then().then().catch()
```

## 3、async 和 await

可以对任何函数使用async关键字。例如，可以在function关键字作为语句和作为表达式时使用，也可以对箭头函数和类及对象字面量中的简写方法使用

通常可以在浏览器开发者控制台的顶级使用await。目前还有一个待定状态的提案，旨在让将来的某个JavaScript版本支持顶级await。

## 4、异步迭代

```js
async function test() {
  for await (let a of list) {
    console.log(a)
  }
} 
```