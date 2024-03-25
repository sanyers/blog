# webdav 操作

```ts
import { createClient } from 'webdav';

export const davUrl = location.origin + '/xxx/dav';
export const davClient = async () => {
  await autoLogin();
  const client = createClient(davUrl, {
    headers: { 'X-Requested-With': 'XMLHttpRequest', requesttoken },
  });
  return Promise.resolve(client);
};

// 上传文件
const putFile = async evt => {
  const cuttentFile: File = evt.target.files[0];
  const buff = await cuttentFile.arrayBuffer();
  const client = await davClient();
  const filePath = '/test/aaa.pdf';
  const isPut = await client.putFileContents(filePath, buff);
  if (isPut) {
    window.$message.success('上传成功');
  }
};
```

## webdav 版本问题

当接口调用发生错误 4.11.2 版本可以返回错误信息，5.0.0版本以上不会

[学习WebDav](https://www.cnblogs.com/janbar/p/13804097.html)

[webdav-client](https://github.com/perry-mitchell/webdav-client)

[网络存储文件共享之WebDAV](https://zhuanlan.zhihu.com/p/352216119)