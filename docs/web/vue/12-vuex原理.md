# vuex 原理

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

实现原理：如果了解过 vue-router 的实现原理，就会发现，两者的实现几乎一样，就是通过 全局混入 一个对象，在该对象的 beforeCreate 声明周期函数中，对组件添加了一个属性 \$store，值就是使用 Vuex 时所创建的 Vuex 实例。

## 1、vuex 使用周期图

官方原图：

<a data-fancybox title="周期图" href="/blog/img/web/js/page_26.png"><img :src="$withBase('/img/web/js/page_26.png')" alt="周期图"></a>

## 2、使用 vuex

接下来将熟悉 vuex 的一些属性和操作方法：

1. `state` 定义状态

- `this.$store.state[属性]` 获取状态值
- `mapState()` 获取所有状态方法

2. `mutations` 定义同步处理状态

- `commit()` 触发 mutations 中的方法
- `mapMutations()` 获取所有 mutations 中的方法

3. `actions` 定义异步并调用 mutations 中的方法

- `dispatch()` 触发 actions 中的方法
- `mapActions()` 获取所有 actions 中的方法

4. `getters` 计算属性可以处理多个状态

- `this.$store.getters[名称]` 获取 getters 值
- `mapGetters()` 获取所有 getters

5. `modules` 挂载模块

- `namespaced` 开启命名空间

```js
import Vue from 'vue';
import Vuex from 'vuex';
// 把 Vuex 注册到 Vue 上
Vue.use(Vuex);

export default new Vuex.Store({
  // 状态
  state: {
    name: '张三',
    age: 21,
  },
  // 用来处理状态
  mutations: {
    SET_NAME(state, value) {
      state.name = value;
    },
    SET_AGE(state, value) {
      state.age = value;
    },
  },
  // 用于异步处理
  actions: {
    setName({ commit }, value) {
      commit('SET_NAME', value);
    },
    setAge({ commit }, value) {
      commit('SET_AGE', value);
    },
  },
  // vuex 的计算属性
  getters: {
    resultName: state => `大家好我的名字叫${state.name}今年${state.age}岁`,
  },
  // 用来挂载模块
  modules: {},
});
```

代码很简单，我们往 vuex 中加入了一个 count 的数据，并且增加了这个数据的修改方法。

### 2.1 State

获取到 state 有两种方式：

1. 直接使用，this.\$store.state[属性]

```html
<template>
  <div id="app">
    {{ this.$store.state.name }} {{ this.$store.state.age }}
  </div>
</template>
```

2. 使用 mapState

通过 mapState 把 store 映射到组件的计算属性，就相当于组件内部有了 state 里的属性

```html
<template>
  <div id="app">
    {{ count }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapState
  import { mapState } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 store 映射到当前组件的计算属性
      ...mapState(['name', 'age']),
    },
  };
</script>
```

当 store 中的值和当前组件有相同的状态，我们可以在 mapState 方法里传递一个对象 而不是一个数组，在对象中给状态起别名

```js
computed: {
    // name2 和 age2 都是别名
    ...mapState({ name2: 'name', age2: 'age'}])
}
```

### 2.2 Mutations

Vuex 官方：更改 Vuex 的 Store 中的状态的唯一方法是提交 mutation。

所以 Store 中的状态不能直接对其进行操作，我们得使用 Mutation 来对 Store 中的状态进行修改，虽然看起来有些繁琐，但是方便集中监控数据的变化

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  mutations: {
    // 在这里定义 方法
    /**
     *
     * @param {*} state 第一个参数是 Store 中的状态(必须传递)
     * @param {*} newName 传入的参数
     */
    SET_NAME(state, newName) {
      // 建议使用常量来定义 mutations
      // 这里简单举个例子修改个名字
      state.name = newName;
    },
  },
  actions: {},
  modules: {},
});
```

同样有两种方法在组件触发 mutations 中的方法：

1. this.\$store.commit() 触发

```html
<template>
  <div id="app">
    <button @click="handleClick">方式1 按钮使用 mutations 中方法</button>
    {{ name }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapState
  import { mapState } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 store 映射到当前组件的计算属性
      ...mapState(['name', 'age']),
    },
    methods: {
      handleClick() {
        // 触发 mutations 中的 SET_NAME
        this.$store.commit('SET_NAME', '小明');
      },
    },
  };
</script>
```

2. 使用 mapMutations

```html
<template>
  <div id="app">
    <button @click="SET_NAME('小明')">方式2 按钮使用 mutations 中方法</button>
    {{ name }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapState
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 store 映射到当前组件的计算属性
      ...mapState(['name', 'age']),
    },
    methods: {
      // 将 mutations 中的 changeName 方法映射到 methods 中，就能直接使用了 changeName 了
      ...mapMutations(['SET_NAME']),
    },
  };
</script>
```

### 2.3 Actions

Action 和 Mutation 区别？

- mutation 必须是同步函数
- Action 提交的是 mutation，而不是直接变更状态
- Action 可以包含任意异步操作

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  mutations: {
    // 在这里定义 方法
    /**
     *
     * @param {*} state 第一个参数是 Store 中的状态(必须传递)
     * @param {*} newName 传入的参数
     */
    SET_NAME(state, newName) {
      // 建议使用常量来定义 mutations
      // 这里简单举个例子修改个名字
      state.name = newName;
    },
  },
  actions: {
    /**
     *
     * @param {*} context 上下文默认传递的参数
     * @param {*} newName 自己传递的参数
     */
    // 定义一个异步的方法 context 是 store
    changeNameAsync(context, newName) {
      // 这里用 setTimeout 模拟异步
      setTimeout(() => {
        // 在这里调用 mutations 中的处理方法
        context.commit('SET_NAME', newName)
      }, 2000)
  },
  modules: {},
});
```

调用 Action 中的异步方法也是有两种方式：

1. this.\$store.dispatch()

```html
<template>
  <div id="app">
    <button @click="changeName2('小明')">方式1 按钮使用 action 中方法</button>
    {{ name }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapState mapMutations
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 store 映射到当前组件的计算属性
      ...mapState(['name', 'age']),
    },
    methods: {
      changeName2(newName) {
        // 使用 dispatch 来调用 actions 中的方法
        this.$store.dispatch('changeNameAsync', newName);
      },
    },
  };
</script>
```

2. 使用 mapActions

```html
<template>
  <div id="app">
    <button @click="changeNameAsync('小浪')">
      方式2 按钮使用 action 中方法
    </button>
    {{ name }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapState mapMutations mapActions
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 store 映射到当前组件的计算属性
      ...mapState(['name', 'age']),
    },
    methods: {
      // 映射 actions 中的指定方法 到 methods中，就可以在该组件直接使用
      ...mapActions(['changeNameAsync']),
    },
  };
</script>
```

### 2.4 Getter

Getter 类似于计算属性，但是我们的数据来源是 Vuex 中的 state, 所以就使用 Vuex 中的 Getter 来完成

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  decorationName(state) {
    return `大家好我的名字叫${state.name}今年${state.age}岁`;
  },
});
```

当然 Getter 也有两种方式导入：

1. this.\$store.getters[名称]

```html
<template>
  <div id="app">
    {{ this.$store.getters.decorationName }}
  </div>
</template>
```

2. 使用 mapGetters

```html
<template>
  <div id="app">
    {{ decorationName }}
  </div>
</template>

<script>
  // 从 Vuex 中导入 mapGetters
  import { mapGetters } from 'vuex';
  export default {
    name: 'App',
    computed: {
      // 将 getter 映射到当前组件的计算属性
      ...mapGetters(['decorationName']),
    },
  };
</script>
```

### 2.5 Module

为了避免在一个复杂的项目 state 中的数据变得臃肿，Vuex 允许将 Store 分成不同的模块，每个模块都有属于自己的 state，getter，action，mutation

我们这里新建一个 animal.js 文件

```js
/* animal.js */

const state = {
  animalName: '狮子',
};
const mutations = {
  setName(state, newName) {
    state.animalName = newName;
  },
};

//导出
export default {
  state,
  mutations,
};
```

在 store/index.js 中的 modules 进行挂载这个模块

```js
/* src/store/index.js */

import Vue from 'vue';
import Vuex from 'vuex';
// 引入模块
import animal from './animal';

// 把 Vuex 注册到Vue 上
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    animal,
  },
});
```

然后我们就可以在组件中使用了

```html
<template>
  <div id="app">
    {{ this.$store.state.animal.animalName }}
    <button @click="$store.commit('setName', '老虎')">改名</button>
  </div>
</template>
```

`$store.state[在module中挂载的模块名][挂载的模块里的属性]`

是不是觉得这种模式很复杂

可以使用命名空间

```js
/* animal.js */

const state = {
  animalName: '狮子',
}
const mutations = {
  setName(state, newName) {
    state.animalName = newName
  },
}

export default {
  // 开启命名空间 方便之后使用 mapXXX
  namespaced: true,
  state,
  mutations,
}
```

## 3、手写一个简单的 Vuex

上面我们已经介绍了 Vuex 的基本使用，现在我们来自己动手写个简单 Vuex

我们在使用 vuex 的时候，可以注意到如下代码：

```js
// store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  ...
})
```

这段代码至少能够说明一下两点：

1. vuex 中有 install 方法，因为使用了 Vue.use
2. Vuex 里面应该有个 Store 的类，因为我们导出的是 new Vuex.store

所以，我们先初始化 vuex 如下：

```js

let Vue = null;
function install(v) {
  Vue = v;
}
class Store {

}
export default {
  install,
  Store
}
```

这个时候，我们可以将 vuex 换成我们做自己的 vuex.js，如下：

```js
// store/index.js

import Vue from 'vue';
// import Vuex from 'vuex';
// 新增代码
import Vuex from './vue.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    SET_COUNT(state, value) {
      state.count = value;
    }
  },
  actions: {
    setCount({commit},value) {
      commit('SET_COUNT', value);
    }
  },
  getters: {
    resultCount: state => state.count
  }
})
```

OK，到现在，我们就可以自己去实现 vuex 了。

### 3.1 实现 $store

我们知道，在每个组件中，都可以通过 this.$store来引入Store的实例，那么这个是怎么做到的呢？

看过 vue-router 原理的应该清楚，这个和每个组件能够使用 this.$router 是一样的，都是在 install 方法中实现的，原理就是全局混入，在 beforeCreate 方法中挂载进去。

现在，我们实现如下：

```js
let Vue = null;
function install(v) {
  Vue = v;
  // 新增代码
  Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.store) {
        // 如果是根组件
        this._root = this;
        this._store = this.$options.store;
      } else {
        // 如果不是根组件
        this._root = this.$parent && this.$parent._root;
      }
    }
  });
  // 定义 $store
  Object.defineProperty(Vue.prototype, '$store', {
    get() {
      return this._root._store;
    }
  })
}
class Store {

}
export default {
  install,
  Store
}
```

很容易看出来，我们首先判断这个组件是不是根组件，如果是根组件，因为我们在根组件的时候通过 new Vue({store}).$mount('#app')的方式，将 store 的实例注册进去了，所以我们可以通过
this.$options.store 拿到 store 的实例。如果不是根组件，那么我们通过 this._root 去查找根组件。

那么，为什么我们在子组件能够拿到父组件的数据呢，答案很简单，因为父子组件的挂载顺序问题，就不赘述了。

### 3.2 实现 state

我们在使用 vuex 的时候，是以 state 数据为中心的，而显然这个数据是响应式的，因为我们在 Home 组件改变 count 值时，Home 组件的 count 也变化了。

因为 vue 的 data 中的数据是响应式的，所以，我们就很简单的通过将数据放入 vue 的 date 中，便可以实现效果。

```js
class Store {
  // 新增代码
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;
  }
}
```

### 3.3 实现 mutations

我们在使用 vuex 的时候，mutations 是个对象，然后里面的每个方法，第一个参数都是 state，所以，
我们需要去规整一下传入的 options。

```js
class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 新增代码
    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });
  }
}
```

### 3.4 实现 actions

同样的道理，我们去规整 actions

```js
class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });

    // 新增代码
    // 规整 actions
    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(action => {
      this.actions[action] = (params) => {
        actions[action].call(this, this, params);
      }
    });
  }
}
```

### 3.5 实现 getters

我们知道，getters 的数据是通过 state 的数据计算所得。并且，我们每次使用 state，都是调用了相关的函数。另外，getters 的数据也是响应式的。

```js
class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });

    // 规整 actions
    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(action => {
      this.actions[action] = (params) => {
        actions[action].call(this, this, params);
      }
    });

    // 新增代码
    // getters 也是一个函数， 并且 getters 的数据也是响应式的，并且需要用到 state
    this.getters = {};
    let getters = options.getters || {};
    Object.keys(getters).forEach(getter => {
      Object.definProperty(this.getters, getter, {
        get: () => {
          return getters[getter].call(this, this.state);
        }
      })
    })
  }
}
```

现在， 我们需要的四个属性都已经实现了。我们大概来捋一下逻辑：

- 对于 state，因为它是响应式的，所以我们通过实例一个 vue，去通过 vue 中的 data 来实现响应式。
- 对于 mutations，因为 mutations 中的方法，每个的第一个参数都应该是 state，所以我们通过遍历用户传入的 mutations 的方法，每次执行的时候，都将 state 传入作为第一个参数，将本身的参数作为第二个参数。
- 对于 actions，因为 actions 中的方法，每个的第一个参数都是 Store 实例本身，所以我们通过遍历用户传入的 actions 的方法，每次执行的时候，都将 this 传入作为第一个参数，将本身的参数作为第二个参数。
- 对于 getters，因为 getters 的数据也是响应式的，所以我们通过 Object.defineProperty 来遍历用户传入的 getters，然后通过响应式去执行， 并且将 state 作为参数传入。

### 3.6 实现 commit 

我们在使用 vuex 的时候，都是通过例如 this.$store.commit('SET_COUNT'， 1) 这种方式，去实现数
据的修改。所以我们需要去在增加一个 commit 方法。

```js
class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });

    // 规整 actions
    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(action => {
      this.actions[action] = (params) => {
        actions[action].call(this, this, params);
      }
    });

    // getters 也是一个函数， 并且 getters 的数据也是响应式的，并且需要用到 state
    this.getters = {};
    let getters = options.getters || {};
    Object.keys(getters).forEach(getter => {
      Object.definProperty(this.getters, getter, {
        get: () => {
          return getters[getter].call(this, this.state);
        }
      })
    });

    // 新增代码
    // 定义 commit
    // 注意 不可以放在原型链，否则在 actions 的方法中直接调用 commit 会造成隐式丢失
    this.commit = (type, params) => {
      this.mutations[type, params);
    }
  }
}
```

这个方法极其简单，就是去调用我们刚刚规整完毕的 mutations 中的方法。

### 3.7 实现 dispatch

我们在使用 vuex 的时候，都是通过例如 this.$store.dispatch('setCount'， 1) 这种方式，去实现数据的修改。所以我们需要去在增加一个 dispatch 方法。

```js
class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });

    // 规整 actions
    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(action => {
      this.actions[action] = (params) => {
        actions[action].call(this, this, params);
      }
    });

    // getters 也是一个函数， 并且 getters 的数据也是响应式的，并且需要用到 state
    this.getters = {};
    let getters = options.getters || {};
    Object.keys(getters).forEach(getter => {
      Object.definProperty(this.getters, getter, {
        get: () => {
          return getters[getter].call(this, this.state);
        }
      })
    });

    // 定义 commit
    // 注意 不可以放在原型链，否则在 actions 的方法中直接调用 commit 会造成隐式丢失
    this.commit = (type, params) => {
      this.mutations[type, params);
    }
  }
  // 新增代码
  // 定义 dispatch 方法
  dispatch(type, params) {
    this.actions[type](params);
  }
}
```

那么，到现在为止，我们就可以将 vuex 换成我们现在自己实现的这个了，试试看，会发现效果一样。

### 3.8 辅助函数

我们知道，vuex 还提供了类似 mapState，mapMutations，mapActions，mapGetters 等辅助函数，其实实现也很简单，我们就一
次性去实现了，代码如下：

```js
// mapState
// 这个我们是在 computed 中 mapState(['count'])，所以返回应该是个对象，对象里面是 key:fn
export function mapState(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function() {
      return this.$store.state[item]
    }
  });
  return obj;
}

// mapMutations
// 这个我们是在 methods 中 mapMutations(['SET_COUNT']),然后 this.SET_COUNT(2) 调用
export function mapMutations(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      this.$store.commit(item, params);
    }
  });
  return obj;
}

// mapActions
// 这个我们是在 methods 中 mapActions(['setCount']), 然后 this.setCount(2) 调用
export function mapActions(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      this.$store.dispatch(item,params);
    }
  });
  return obj;
}

// mapGetters
// 这个我们是在 computed 中 mapGetters(['resultCount'])，所以返回应该是个对象，对象里面是 key:fn
export function mapGetters(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      return this.$store.getters[item];
    }
  });
  retrun obj;
}
```

上面的注释写明了实现的原理，就不赘述了。

那么，vuex 的原理以及自己实现 vuex 就完成了。

### 3.9 全部代码

```js
let Vue = null;
function install(v) {
  Vue = v;
  // 新增代码
  Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.store) {
        // 如果是根组件
        this._root = this;
        this._store = this.$options.store;
      } else {
        // 如果不是根组件
        this._root = this.$parent && this.$parent._root;
      }
    }
  });
  // 定义 $store
  Object.defineProperty(Vue.prototype, '$store', {
    get() {
      return this._root._store;
    }
  })
}

class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    });
    // 使得 state 变成响应式
    this.state = vm.state;

    // 规整 mutations
    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(mutation => {
      this.mutations[mutation] = (params) => {
        mutations[mutation].call(this, this.state, params);
      }
    });

    // 规整 actions
    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(action => {
      this.actions[action] = (params) => {
        actions[action].call(this, this, params);
      }
    });

    // getters 也是一个函数， 并且 getters 的数据也是响应式的，并且需要用到 state
    this.getters = {};
    let getters = options.getters || {};
    Object.keys(getters).forEach(getter => {
      Object.definProperty(this.getters, getter, {
        get: () => {
          return getters[getter].call(this, this.state);
        }
      })
    });

    // 定义 commit
    // 注意 不可以放在原型链，否则在 actions 的方法中直接调用 commit 会造成隐式丢失
    this.commit = (type, params) => {
      this.mutations[type, params);
    }
  }
  // 新增代码
  // 定义 dispatch 方法
  dispatch(type, params) {
    this.actions[type](params);
  }
}

// mapState
// 这个我们是在 computed 中 mapState(['count'])，所以返回应该是个对象，对象里面是 key:fn
export function mapState(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function() {
      return this.$store.state[item]
    }
  });
  return obj;
}

// mapMutations
// 这个我们是在 methods 中 mapMutations(['SET_COUNT']),然后 this.SET_COUNT(2) 调用
export function mapMutations(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      this.$store.commit(item, params);
    }
  });
  return obj;
}

// mapActions
// 这个我们是在 methods 中 mapActions(['setCount']), 然后 this.setCount(2) 调用
export function mapActions(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      this.$store.dispatch(item,params);
    }
  });
  return obj;
}

// mapGetters
// 这个我们是在 computed 中 mapGetters(['resultCount'])，所以返回应该是个对象，对象里面是 key:fn
export function mapGetters(arr) {
  let obj = {};
  arr.forEach(item => {
    obj[item] = function(params) {
      return this.$store.getters[item];
    }
  });
  retrun obj;
}

export default {
  install,
  Store
}
```

## 4、总结

<a data-fancybox title="流程图" href="/blog/img/web/js/page_27.png"><img :src="$withBase('/img/web/js/page_27.png')" alt="流程图"></a>

1. Vuex 是 Vue 的一个插件，使用 `Vue.use` 进行安装，Vuex 内部实现了 `install` 方法和 `Store` 类。
2. `install` 方法调用 `Vue.mixin()` 方法混入了 `beforeCreate()` 方法，然后获取到 `this.$options.store`，并定义了 `$store` 属性
3. 在 `Store` 类构造函数中实现了 `state`、`mutations`、`actions`、`getters`、`commit` 的定义
4. 在 `Store` 类中定义了 `dispatch` 方法
5. 在 Vuex 文件中定义了 `mapState`、`mapMutations`、`mapActions`、`mapGetters` 等辅助函数
6. `state` 是定义状态，可以使用 `this.$store.state` 和 `mapState` 来获取
7. `mutations` 是定义同步方法，可以使用 `commit` 和 `mapMutations` 来调用，**建议使用常量来定义**
8. `actions` 是定义异步方法，可以使用 `dispatch` 和 `mapActions` 来调用，**建议不要直接修改 state，建议使用 commit 提交 mutations 中的方法来修改 state**
9. `getters` 是计算属性可以处理多个状态，可以使用 `this.$store.getters` 和 `mapGetters` 来获取
10. `modules` 是用来挂载模块

## 5、参考

https://juejin.cn/post/6928468842377117709

https://juejin.cn/post/6994337441314242590