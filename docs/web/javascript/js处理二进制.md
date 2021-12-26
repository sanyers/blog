# js 处理二进制

## 1、文件下载

```js
/**
 * 文件下载
 * @param {*} res Blob 数据或 Blob 数组
 * @param {*} fileName 文件名
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
    let url = window.URL.createObjectURL(
      new Blob(Array.isArray(res) ? res : [res]),
    );
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

## 2、Blob转为img并使用canvas绘制

```js
/**
 * Blob 转图片
 * @param {*} data Blob 数据
 */
export const getBlobToCanvas = (blob) => {
  const reader = new FileReader();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  reader.onload = evt => {
    const url = evt.target.result;
    const imgs = new Image();
    imgs.src = url;
    imgs.onload = () => {
      // canvas.width = imgs.width;
      // canvas.height = imgs.height;
      // ctx.drawImage(imgs, 0, 0, imgs.width, imgs.height);
      canvas.width = 1278;
      canvas.height = 652;
      ctx.drawImage(imgs, 0, 0, 1278, 652); // 指定高宽
    };
  };
  reader.readAsDataURL(blob);
}
```

## 3、Blob转base64

```js
export const getBlobToBase64(blob) {
  var reader = new FileReader();
   reader.readAsDataURL(blob);
   reader.onload = function (e) {
     const base64Str = e.target.result;
     console.log(base64Str);
   }
}
```

## 4、file转base64

```js
export const getFileToBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    const base64Str = e.target.result;
    console.log(base64Str);
  };
}
```

## 5、base64转file

```js
export const getBase64ToFile(base64Str, fileName) {
  let arr = base64Str.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type:mime});
}
```

## 6、base64转blob

```js
export const getBase64ToBlob(base64Str) {
    //console.log(base64Str);//data:image/png;base64,
    let byteString;
    if(base64Str.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Str.split(',')[1]);//base64 解码
    else{
        byteString = unescape(base64Str.split(',')[1]);
    }
    const mimeString = base64Str.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png
    let ia = new Uint8Array(byteString.length);//创建视图
    for(var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ia], {
        type: mimeString
    });
    return blob;
}
```