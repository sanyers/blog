# vue-repl支持less

参考 vue 官方 [Vue Playground]([https://sfc.vuejs.org/)

<a data-fancybox title="Vue Playground" href="/blog/img/web/4/q1.png"><img :src="$withBase('/img/web/4/q1.png')" alt="Vue Playground"></a>

Vue Playground，它提供一个在线的可交互编辑环境，实现在线上直接调试文档提供的案例代码， 而且十分的轻量。

## 1、什么是REPL(交互式解释器)

REPL(Read Eval Print Loop:交互式解释器) 表示一个我们可以在其中输入命令或者代码，并且可以接收到解释器响应的一个环境。主要有四大特征组成。

- **读取 Read** - 读取用户输入，解析输入的数据结构并存储在内存中。
- **执行 Eval** - 执行输入的数据结构
- **打印 Print** - 输出结果
- **循环 Loop** - 循环操作以上步骤直到用户退出。

也就是说我们现在所用的所有代码编辑器其实都是一个REPL(交互式解释器)

## 2、什么是在线REPL(交互解释器)

我们日常使用的代码编辑器大多是通过软件包下载到本地安装的，因为在本地系统环境下可以得到更好更流畅的交互和编译体验。但是在某些场景下，网页版的交互解释器更具有优势，比如

- 我有一段代码，我想分享给别人看看，通过网页URL的形式明显比传输代码包的形式更方便
- 我写了一个组件，需要有个预览地址或者内嵌一个iframe预览链接放在我的文档里面
- 我想在最简环境下复现一个bug，但是我又觉得重新开一个项目太麻烦，我希望有一个网页，打开就能直接写代码，最好我常用的依赖都内置在上面
- 可以把在线编辑的代码下载下来在本地运行

很巧，上面这些场景Vue的Playground都比较好的解决了

## 3、存在的问题

虽然 Vue 的 Playground 具备了在线交互解释器的所有特征，但是他只预置了Vue的运行环境，假设我想预置更多的模块，比如我想让他天然支持less，支持scss，应该怎么做呢？

## 4、如何实现

首先打开`Vue Playground`的源码可以发现，整个交互解释器的核心在`@vue/repl`这个依赖中，Vue Playground也只是对@vue/repl进行了集成。

@vue/repl [源码](https://github.com/vuejs/repl)

### 4.1 下载源码

直接 `git clone https://github.com/vuejs/repl.git`

### 4.2 安装库

安装库 `pnpm i`

安装less `pnpm i less -D`

安装less type `pnpm i --save-dev @types/less`

### 4.3 修改源码

(1) 导入 less

> ./src/transform.ts

```ts
import { Store, File } from './store'
import {
  SFCDescriptor,
  BindingMetadata,
  shouldTransformRef,
  transformRef,
  CompilerOptions
} from 'vue/compiler-sfc'
import { transform } from 'sucrase'
// 新增 导入 less
import less from 'less'

...
```

（2）在 `compileFile` 方法里面加入`.less`判断

```ts
export async function compileFile(
  store: Store,
  { filename, code, compiled }: File
) {
  if (!code.trim()) {
    store.state.errors = []
    return
  }

  if (filename.endsWith('.css')) {
    compiled.css = code
    store.state.errors = []
    return
  }

  // 加入 less文件判断
  if (filename.endsWith('.less')) {
    const outStyle = await less.render(code) // 使用less.render将 less code 转换成css
    compiled.css = outStyle.css
    store.state.errors = []
    return
  }

  ...
}
```

（3）移除判断 lang

```js

if (
    descriptor.styles.some((s) => s.lang) ||
    (descriptor.template && descriptor.template.lang)
  ) {
    store.state.errors = [
      `lang="x" pre-processors for <template> or <style> are currently not ` +
        `supported.`
    ]
    return
  }

// 改为
if (
    // descriptor.styles.some((s) => s.lang) || // 主要移除这段代码
    (descriptor.template && descriptor.template.lang)
  ) {
    store.state.errors = [
      `lang="x" pre-processors for <template> or <style> are currently not ` +
        `supported.`
    ]
    return
  }
```

（4）添加 lang=less 判断

找到 styles 代码如下：

```js
// styles
  let css = ''
  for (const style of descriptor.styles) {
    if (style.module) {
      store.state.errors = [
        `<style module> is not supported in the playground.`
      ]
      return
    }

    // 添加新代码
    let contentStyle = style.content
    if (style.lang === 'less') {
      const outStyle = await less.render(contentStyle)
      contentStyle = outStyle.css
    }

    const styleResult = await store.compiler.compileStyleAsync({
      ...store.options?.style,
      source: contentStyle,  // 这里将 style.content 修改为 contentStyle
      filename,
      id,
      scoped: style.scoped,
      modules: !!style.module
    })
    if (styleResult.errors.length) {
      // postcss uses pathToFileURL which isn't polyfilled in the browser
      // ignore these errors for now
      if (!styleResult.errors[0].message.includes('pathToFileURL')) {
        store.state.errors = styleResult.errors
      }
      // proceed even if css compile errors
    } else {
      css += styleResult.code + '\n'
    }
  }
```

### 4.4 修改支持 .less 文件的添加

> ./src/editor/FileSelector.vue

找到 `doneAddFile` 方法，修改添加 .less 过滤

```js
function doneAddFile() {
  if (!pending.value) return
  const filename = pendingFilename.value

  if (!/\.(vue|js|ts|css|less)$/.test(filename)) { // 添加 |less
    store.state.errors = [
      `Playground only supports *.vue, *.js, *.ts, *.css files.`
    ]
    return
  }

  if (filename in store.state.files) {
    store.state.errors = [`File "${filename}" already exists.`]
    return
  }

  store.state.errors = []
  cancelAddFile()
  store.addFile(filename)
}
```

### 5、测试编译 less

在示例中加入 less 代码或者 导入 less 代码

```html
<script setup>
import './aa.less' // 导入 less
import {list} from './t.ts'
import { ref } from 'vue'

const msg = ref('Hello world!')
console.log(list)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="test">
    111
    <div class="test-page">
      page1233
    </div>
  </div>
  <input v-model="msg">
</template>
<style lang="less" scoped>
  h1{
    color:red
  }
  .test{
    font-size:18px;
    &-page{
      font-size:30px;
    }
  }
</style>
```

效果如下：

<a data-fancybox title="Vue Playground and Less" href="/blog/img/web/4/q2.png"><img :src="$withBase('/img/web/4/q2.png')" alt="Vue Playground and Less"></a>

aa.less 代码：

<a data-fancybox title="Less code" href="/blog/img/web/4/q3.png"><img :src="$withBase('/img/web/4/q3.png')" alt="Less code"></a>

参考：https://juejin.cn/post/7064864648729722887