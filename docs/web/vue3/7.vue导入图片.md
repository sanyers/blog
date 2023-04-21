# vue 导入图片

## 1、直接导入

```html
<img src="../assets/img/1.png" alt="" /> <img src="@/assets/img/2.png" alt="" />
```

## 2、使用 import

```html
<template>
  <div><img :src="imgSrc" alt="" /></div>
</template>
<script setup lang="ts">
  import imgSrc from '@/assets/img/1.png';
</script>
```

## 3、使用方法

```html
<template>
  <div><img :src="getImgSrc('1.png')" alt="" /></div>
</template>
<script setup lang="ts">
  const imgSrc = require('@/assets/img/1.png');
  const getImgSrc = (name: string) => {
    return new URL('/assets/img/' + name, import.meta.url).href;
  };
</script>
```
