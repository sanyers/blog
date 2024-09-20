# node 设置定时任务

## 1、安装

```bash
npm install node-schedule
# 或
yarn add node-schedule
```

## 2、基础用法

```bash
const schedule = require('node-schedule');

// 当前时间的秒值为 10 时执行任务，如：2018-7-8 13:25:10
let job = schedule.scheduleJob('10 * * * * *', () => {
  console.log(new Date());
});
```

时间数值按下表表示：

```
*  *  *  *  *  *
┬  ┬  ┬  ┬  ┬  ┬
│  │  │  │  │  |
│  │  │  │  │  └ 星期几，取值：0 - 7，其中 0 和 7 都表示是周日
│  │  │  │  └─── 月份，取值：1 - 12
│  │  │  └────── 日期，取值：1 - 31
│  │  └───────── 时，取值：0 - 23
│  └──────────── 分，取值：0 - 59
└─────────────── 秒，取值：0 - 59（可选）
```

也可以指定一个具体的时间，如：

```js
const schedule = require('node-schedule');

// 定义一个未来的时间
let date = new Date(2016, 6, 13, 15, 50, 0);

// 定义一个任务
let job = schedule.scheduleJob(date, () => {
  console.log(new Date());
});
```

## 3、进阶用法

### 3.1 隔一段时间执行一次

```js
const schedule = require('node-schedule');

// 定义规则
let rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次

// 启动任务
let job = schedule.scheduleJob(rule, () => {
  console.log(new Date());
});
```

rule 支持设置的值有 `second`、`minute`、`hour`、`date`、`dayOfWeek`、`month`、`year` 等

每秒执行：

```js
rule.second = [0,1,2,3......59];
```

每分钟 0 秒执行：

```js
rule.second = 0;
```

每小时 30 分执行：

```js
rule.minute = 30;
rule.second = 0;
```

每天 0 点执行：

```js
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
```

每月 1 号的 10 点执行：

```js
rule.date = 1;
rule.hour = 10;
rule.minute = 0;
rule.second = 0;
```

每周一、周三、周五的 0 点和 12 点执行：

```js
rule.dayOfWeek = [1, 3, 5];
rule.hour = [0, 12];
rule.minute = 0;
rule.second = 0;
```

## 4、取消任务

可以使用 cancel() 终止一个运行中的任务。

```js
job.cancel();
```
