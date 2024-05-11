# node 使用 axios

## 1、下载文件

### 1.1 流式下载

```js
let writer = fs.createWriteStream(filePath); // 创建一个写入流
const response = await axios({
  url: '',
  method: 'GET',
  responseType: 'stream',
});
response.data.pipe(writer);
```

### 1.2 直接下载

```js
const response = await axios({
  url: '',
  method: 'GET',
  responseType: 'arraybuffer',
  timeout: 60 * 1000, // 超时时间，单位ms
});
fs.writeFileSync(pathStr, response.data);
```

### 1.3 批量下载（多进程下载）

主进程：

```js
// 主进程 main.js
const child_process = require('child_process');
const os = require('os');

const cpuLength = os.cpus().length;
const downList = []; // 需要批量下载的Url

const downAll = () => {
  let exitCount = 0;
  const n = Math.ceil(downList.length / cpuLength);
  const sliceList = sliceAll(downList, n); // 每个进程处理 n 个请求
  for (let i = 0; i < sliceList.length; i++) {
    const worker = child_process.fork('./down_worker.js');
    const log = `工作进程 ${worker.pid} 已启动`;
    console.log(log);
    worker.send(sliceList[i]);
    worker.on('exit', () => {
      const log = `工作进程 ${worker.pid} 完成下载，exit`;
      console.log(log);
      exitCount++;
      if (exitCount === sliceList.length) {
        console.log('下载完成');
      }
    });
  }
};
```

下载进程：

```js
// 下载进程 down_worker.js
const fs = require('fs');
const axios = require('axios');

const downFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 60 * 1000,
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          try {
            fs.writeFileSync('./down/' + fileName, res.data); // 随机 fileName
            resolve(true);
          } catch (e) {
            reject(false);
          }
        } else {
          reject(false);
        }
      })
      .catch(() => {
        console.log(`error: ${url}`);
        reject(false);
      });
  });
};

const downFileList = (list: Array<string>, num: number, cb: Function) => {
  const url = list[num];
  const name = index + num;
  downFile(url)
    .then(() => {
      num++;
      if (num === list.length) {
        cb();
      } else {
        downFileList(list, num, cb);
      }
    })
    .catch(() => {
      setTimeout(() => {
        console.log(`正在重试：${url}`);
        downFileList(list, num, cb);
      }, 10000);
    });
};

process.on('message', list => {
  downFileList(list, 0, () => process.exit());
});
```

## 2、忽略 SSL 证书

```js
const https = require('https');
const axios = require('axios');

// 在 axios 请求时，选择性忽略 SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});
axios.get('https://something.com/foo', { httpsAgent: agent });
```
