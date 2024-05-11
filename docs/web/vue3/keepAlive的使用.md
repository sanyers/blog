# keepAlive 的使用

## 1、页面缓存 VueRouter

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

## 2、组件缓存

```html
<keep-alive>
  <component :is="Component" />
</keep-alive>
```
