# vue 安装 scss

## 1、npm 安装

```
npm install sass-loader@8.x -D
npm install sass@1.x -D
```

## 2、页面使用

```html
<template>
  <div class="home">
    <div class="test">
      hello scss
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
  };
</script>
<style lang="scss" scoped>
  .home {
    .test {
      background: #fff;
    }
  }
</style>
```
