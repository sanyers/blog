# node 使用代理访问接口

1、安装 `https-proxy-agent` 代理库，创建 `request.ts`文件

```ts
import { HttpsProxyAgent, HttpsProxyAgentOptions } from 'https-proxy-agent';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const proxyOpts: HttpsProxyAgentOptions = {
  host: '127.0.0.1',
  port: 1080,
};

// 拦截请求和响应
function instances(instance: AxiosInstance) {
  // 请求拦截
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = 'Bearer ' + OPENAI_API_KEY; // 配置权限token
      config.httpsAgent = new HttpsProxyAgent(proxyOpts); // 配置代理
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );
}

// 创建请求
const request = (config: any) => {
  const instance = axios.create(config);
  instances(instance);
  return instance;
};

export default request;
```

2、创建 `axios.ts` 文件

```ts
import request from './request'; // 导入刚才创建的 request.ts
const axios = request({ baseURL: '/' });
export default axios;
```

3、创建 `api.ts`

```ts
import axios from './axios'; // 导入刚才创建的 axios.ts

// 测试接口调用
export const testApi = (data: any) => {
  return axios.request({
    method: 'post',
    url: '/v1/chat/completions',
    data,
  });
};
```

4、使用

```ts
import { testApi } from './api';

async function getTestApi() {
  try {
    const response = await testApi({});
    console.log(response.data);
  } catch (e: any) {
    console.error(e.response.data);
  }
}
```
