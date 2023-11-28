# vue2 与 vue3 的区别

## 1、新特性

- 组合式 API
- 单文件组件中的组合式 API 语法糖 (`<script setup>`)
- Teleport 组件，将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去
- Fragments 片段，支持多根节点的组件
- Emits 组件选项，用于声明由组件触发的自定义事件
- 来自 @vue/runtime-core 的 createRenderer API 用来创建自定义渲染函数，可以应用于单元测试
- CSS 中的 v-bind()，`<style>` 标签里面的 v-bind 可以绑定到 `<script>`里面声明的值
- SFC `<style scoped>` 新增全局规则和针对插槽内容的规则
- Suspense，实现顶层 await，会自动让该组件成为一个异步依赖

## 2、新的框架级别推荐

- 新版本的 Router, Devtools & test utils 来支持 Vue 3
- 构建工具链: Vue CLI -> Vite
- 状态管理: Vuex -> Pinia
- IDE 支持: Vetur -> Volar
- 新的 TypeScript 命令行工具: vue-tsc
- 静态网站生成: VuePress -> VitePress
- JSX: @vue/babel-preset-jsx -> @vue/babel-plugin-jsx

## 3、全局 API

- createApp，调用 createApp 返回一个应用实例
- tree-shaking，全局 API 现在通过具名导出进行访问。不能使用 `Vue.xxx`。

## 4、模板指令

- `v-model`，同一个组件上使用多个 v-model 绑定，自定义 v-model 修饰符
- key 使用改变：
    - 对于 `v-if/v-else/v-else-if` 的各分支项 key 将不再是必须的
    - `<template v-for>` 的 key 应该设置在 `<template>` 标签上 (而不是设置在它的子节点上)。
- v-if 比 v-for 的优先级高
- v-bind 合并行为，起决于声明顺序，会被后面声明的相同属性覆盖
- v-on.native 移除

## 5、组件

- 函数式组件，所有的函数式组件都是用普通函数创建的，不需要定义 `{ functional: true }`，它们将接收两个参数：props 和 context。context 参数是一个对象，包含组件的 attrs、slots 和 emit property。
- 异步组件，新的 defineAsyncComponent 助手方法，用于显式地定义异步组件，Loader 函数本身不再接收 resolve 和 reject 参数，且必须返回一个 Promise
- emits 选项，这个选项可以用来定义一个组件可以向其父组件触发的事件。

## 6、渲染函数

- h 现在是全局导入，而不是作为参数传递给渲染函数
- VNode 现在有一个扁平的 prop 结构
- this.$slots 现在将插槽作为函数公开
- 非兼容：移除 this.$scopedSlots
- $listeners 对象在 Vue 3 中已被移除。事件监听器现在是 $attrs 的一部分
- $attrs 现在包含了所有传递给组件的 attribute，包括 class 和 style

## 7、移除的 APIs

- 不再支持使用数字 (即键码) 作为 `v-on` 修饰符
- 不再支持 `config.keyCodes`
- $on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口
- 过滤器已移除，且不再支持，建议用方法调用或计算属性来替代
- inline-template 对内联模板特性的支持已被移除。
- $children 已移除
- propsData 已移除

## 8、其他

- data 选项，只接受返回 object 的 function，并操作现在是浅层次的而非深层次的