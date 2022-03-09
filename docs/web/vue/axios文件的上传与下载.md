# axios 文件的上传与下载

## 1、图片显示

（1）第一种方式 blob

```js
// 接口
export const getCode = params => {
  return axios.request({
    method: 'get',
    url: '/api/xxx/getCode',
    params,
    responseType: 'blob', // 使用 blob 返回
  });
};

// 页面调用
const timekey = new Date().getTime();
const { data } = await getCode({ timekey }); // data 是 response.data
this.src = window.URL.createObjectURL(data); // img 标签的 src 地址
```

（2）第一种方式 arraybuffer base64

```js
// 接口
export const getCode = params => {
  return axios.request({
    method: 'get',
    url: '/api/xxx/getCode',
    params,
    responseType: 'arraybuffer', // 使用 arraybuffer
  });
};

// 页面调用
const timekey = new Date().getTime();
const { data } = await getCode({ timekey });
this.src =
  'data:image/png;base64,' +
  btoa(
    new Uint8Array(data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  ); // img 标签的 src 地址
```

## 2、文件下载

```js
// 接口
export const fileDownload = params => {
  return axios.request({
    method: 'get',
    url: '/api/xxx/file/download',
    params,
    responseType: 'blob', // 直接返回
  });
};

// 页面调用
import { downFile } from '@/utils/file.js'; // 公共下载方法
async onDown(row) {
  const res = await fileDownload({ fileId: row.id });
  const dispositionName = res.headers['content-disposition'] || '';
  const fileName = decodeURIComponent(
    dispositionName ? dispositionName.split('=')[1] : '',
  ); // 文件名
  downFile(res.data, fileName);
},


/**
 * 文件下载方法
 * @param {*} res Blob 数据
 * @param {*} fileName 文件名
 * @returns
 */
export const downFile = (res, fileName) => {
  if (!res) {
    return;
  }
  if (window.navigator.msSaveBlob) {
    // IE以及IE内核的浏览器
    try {
      window.navigator.msSaveBlob(res, fileName);
    } catch (e) {
      throw new Error(e);
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([res]));
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName); // 文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 下载完成移除元素
    window.URL.revokeObjectURL(url); // 释放掉 blob 对象
  }
};
```

## 3、文件上传

（1）blob 上传

```js
const params = new FormData();
params.append('fileId', '111');
params.append('file', blob, `draw-${new Date().getTime()}.png`);
let { msg } = await upload(params);
if (msg) {
  this.$message({
    message: '保存成功！',
    type: 'success',
  });
}
```

（2）file 上传

```js
const params = new FormData();
params.append('fileId', '111');
const file = document.getElementById('file');
params.append('file', file.files[0]);
let { msg } = await upload(params);
if (msg) {
  this.$message({
    message: '保存成功！',
    type: 'success',
  });
}
```

（3）img 上传

```js
function imageToCanvas(src, cb) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    cb(canvas);
  };
}

var fd = new FormData();
var img1 = document.getElementById('img');
imageToCanvas(img1.src, function(canvas) {
  canvas.toBlob(function(blob) {
    fd.append('img', bolb, '1.png');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/test', true);
    xhr.send(fd);
  }, 'image/png');
});
```
