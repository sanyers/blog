# node调用chatgpt

[代码地址](https://github.com/sanyers/chatgpt-ts)

## 后台技术架构

- `express` web 服务器
- `axios` 请求接口
- `dotenv` 全局环境变量解析
- `https-proxy-agent` 接口代理

安装命令：

`pnpm i express axios dotenv https-proxy-agent`

`pnpm i @types/express @types/node -D`

## 1、配置 .env 环境变量

在根目录下创建 `.env` 文件，配置如下

```conf
# openai
OPENAI_API_BASEURL=https://api.openai.com
OPENAI_API_KEY=sk-xxx
OPENAI_API_ORG=org-xxx

# proxy
PROXY_OPEN=1 # 1启用 0不启用
PROXY_HOST=127.0.0.1
PROXY_PORT=1081

# server
SERVER_PORT=18001
```

## 2、配置 TypeScript 环境

详见 [nodejs 使用 typescript](https://sanyers.github.io/blog/web/node/1-nodejs%E4%BD%BF%E7%94%A8typescript.html)

## 3、配置运行命令和打包命令

> package.json

```json
{
  "scripts": {
    "start": "node ./dist/app.js", // 运行编译后的 js
    "dev": "ts-node ./src/app.ts", // 直接运行 ts
    "build": "tsc", // 编译
    "startup": "tsc && node ./dist/app.js" // 编译并运行
  }
}
```

## 4、创建 src 目录，导出 env 配置

在 src 目录创建 `env.ts` 文件

> ./src/env.ts

```ts
import dotenv from 'dotenv';
dotenv.config();

export const OPENAI_API_BASEURL = process.env.OPENAI_API_BASEURL; // openai 接口地址
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // openai key
export const OPENAI_API_ORG = process.env.OPENAI_API_ORG; // openai 组织代码
export const PROXY_OPEN = process.env.PROXY_OPEN; // 是否开启代理
export const PROXY_HOST = process.env.PROXY_HOST; // 代理 host
export const PROXY_PORT = process.env.PROXY_PORT; // 代理 端口
export const SERVER_PORT = process.env.SERVER_PORT; // 本地服务启动端口
```

## 5、封装 axios

（1）创建 axios 目录，然后在其目录下创建 `request.ts` 文件

> ./src/axios/request.ts

```ts
import { HttpsProxyAgent, HttpsProxyAgentOptions } from 'https-proxy-agent';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  OPENAI_API_KEY,
  OPENAI_API_ORG,
  PROXY_OPEN,
  PROXY_HOST,
  PROXY_PORT,
} from '../env'; // 导出环境配置

// 代理配置
const proxyOpts: HttpsProxyAgentOptions = {
  host: PROXY_HOST,
  port: PROXY_PORT,
};

// 拦截请求和响应
function instances(instance: AxiosInstance) {
  // 请求拦截
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = 'Bearer ' + OPENAI_API_KEY;
      config.headers['OpenAI-Organization'] = OPENAI_API_ORG;
      PROXY_OPEN === '1' &&
        (config.httpsAgent = new HttpsProxyAgent(proxyOpts));
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

（2）再创建 `index.ts` 导出 axios

> ./src/axios/index.ts

```ts
import { OPENAI_API_BASEURL } from '../env';
import request from './request';
const axios = request({ baseURL: OPENAI_API_BASEURL });
export default axios;
```

## 6、封装 openai 接口

创建 `api.ts`

> ./src/api.ts

```ts
import axios from './axios';

// 所有模型列表
export const models = (params: any) => {
  return axios.request({
    method: 'get',
    url: '/v1/models',
    params,
  });
};

// 聊天
export const chat = (data: any) => {
  return axios.request({
    method: 'post',
    url: '/v1/chat/completions',
    data,
  });
};
```

## 7、创建请求 code

创建 `res-code.ts`

> ./src/res-code.ts

```ts
import { Response } from 'express';
export const success = (res: Response, data: any) => {
  res.json({
    code: 200,
    msg: '请求成功',
    data,
  });
};

export const error = (res: Response, msg: any) => {
  res.json({
    code: -1,
    msg: msg || '请求失败',
  });
};
```

## 8、创建主程序代码

创建 `app.ts`

> ./src/app.ts

```ts
import express, { NextFunction, Request, Response } from "express"; //web框架
import { SERVER_PORT } from "./env";
import { models, chat } from "./api";
import { success, error } from "./res-code";

const app = express();
const multipart = require("connect-multiparty");

//解析form-data参数
const multipartMiddleware = multipart({ uploadDir: "./temp" });
app.use(multipartMiddleware); // 解析form-data参数
app.use(express.json({ limit: "50mb" })); // 解析 application/json 参数
app.use(express.urlencoded({ limit: "50mb", extended: true })); // 解析 www-form-urlencoded 参数
app.use("/", express.static("web")); // 开放web文件夹目录，可运行 vue 打包后的静态站点

app.post("/api/v1/models", multipartMiddleware, async (req, res) => {
  try {
    const response = await models({});
    success(res, response.data);
  } catch (e: any) {
    error(res, e.response.data);
  }
});

app.post("/api/v1/chat/completions", multipartMiddleware, async (req, res) => {
  const {
    messages,
    max_tokens,
    frequency_penalty,
    presence_penalty,
    temperature,
    top_p,
    model,
  } = req.body;
  try {
    const params = {
      model: model ?? "gpt-3.5-turbo", // 模型
      messages, // messages: [{ role: "user", content }],
      temperature: temperature ?? 0.8, // 随机性，值越大回复越随机
      max_tokens: max_tokens ?? 2048, // 单次请求最大 token
      top_p: top_p ?? 1, // 一个可用于代替 temperature 的参数
      frequency_penalty: frequency_penalty ?? 0, // 单词重复控制
      presence_penalty: presence_penalty ?? 0, // 话题新鲜度，值越大，越有可能拓展到新话题
    };
    const response = await chat(params);
    const msg = resolveData(response.data);
    if (msg) {
      success(res, msg);
    } else {
      error(res, "无数据");
    }
  } catch (e: any) {
    error(res, e.response.data);
  }
});

function resolveData(data: any) {
  let msg = null;
  if (data) {
    const { choices } = data;
    if (choices && choices.length) {
      msg = choices;
    }
  }
  return msg;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    code: -1,
    msg: "程序运行错误",
  });
});

//启动应用程序
app.listen(SERVER_PORT, function () {
  console.log("app listening on " + SERVER_PORT);
});

process.on("uncaughtException", function (err) {
  //打印出错误
  console.error("uncaughtException:" + err);
  //打印出错误的调用栈方便调试
  console.error(err.stack);
});

async function testModels() {
  try {
    const response = await models({});
    console.log(response.data);
  } catch (e: any) {
    console.log(e.response.data);
  }
}

async function testChat() {
  try {
    const params = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "你好" }],
    };
    const { data } = await chat(params);
    console.log(data);
  } catch (e: any) {
    console.log(e.response.data);
  }
}

// testChat()
```