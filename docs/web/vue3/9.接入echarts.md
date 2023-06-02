# 接入 echarts

## 安装 echarts

`pnpm i echarts --save`

## 基础使用

```html
<template>
  <div ref="chartRef" class="chart"></div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';

  const chartRef = ref(null);
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption(option);
  });
</script>
```

## 参考地址

https://juejin.cn/post/7078834647005822983

https://juejin.cn/post/7062254510311211044

http://chart.majh.top/

http://192.144.199.210/forum-2-1.html

https://www.makeapie.cn/echarts

https://echarts.apache.org/zh/index.html

http://ppchart.com/#/