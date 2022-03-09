# mixin 的使用

## 1、mixin 的特点

1. 方法和参数在各组件中不共享

如混入对象中有一个 cont:1的变量,在组件A中改变cont值为5，这时候在组件B中获取这个值，拿到的还是1，还是混入对象里的初始值，数据不共享

2. 值为对象的选项

如 methods,components 等，选项会被合并，键冲突的组件会覆盖混入对象的，比如混入对象里有个方法A，组件里也有方法A，这时候在组件里调用的话，执行的是组件里的A方法

3. 值为函数的选项

如 created,mounted 等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用，同一个钩子函数里，会先执行混入对象的东西，再执行本组件的

4. 与 vuex 的区别

- vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
- Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

5. 与公共组件的区别

组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。

6. 与 extend 的区别

- mixin 是对 Vue 类的 options 进行混入。所有 Vue 的实例对象都会具备混入进来的配置行为。
- extend 是产生一个继承自 Vue 类的子类，只会影响这个子类的实例对象，不会对Vue类本身以及 Vue 类的实例对象产生影响。

## 2、mixin 的使用

Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。
混入 (mixins)：是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

定义公共的 mixins 文件：如 myMixin.js

```js
export const mixinTest = {
  props: {
    testName: {
      type: String,
      default: 'xiaoming',
    },
    testAge: {
      type: Number,
      default: 18,
    },
  },
  methods: {
    // 混入公共方法
    getName() {
      return 'mixin：' + this.testName
    },
  },
};
```

在你页面内调用：需要 import 这个 mixins 文件 ，然后通过 `mixins:['文件名']` 来使用就可以了

```html
<template>
    <div>
        <div @click="handleMixin">调用mixin方法</div>
    </div>
</template>

<script>
    import { mixinTest } from './myMixin'

    export default {
        name: 'mixin-test',
        mixins: [mixinTest],
        components: {},
        data () {
            return {}
        },
        methods: {
            handleMixin () {
                console.log('mixin-testName=========', this.testName)
                let mixFun = this.getName()
                console.log('mixin-Fun====>>>', mixFun)
            },
        },
        mounted () {
        },
        computed: {}
    }
</script>
```

## 3、参考

https://juejin.cn/post/6844903908398071816

https://juejin.cn/post/6844903903746588680