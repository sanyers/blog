# chatbot-ui 本地部署

## 1、安装 chatbot-ui

```bash
git clone https://github.com/mckaywrigley/chatbot-ui.git
npm install
```

## 2、安装 Supabase 并在本地运行

### 2.1 安装 docker

您需要安装 Docker 才能在本地运行 Supabase。

### 2.2 安装 Supabase CLI

MacOS/Linux 操作系统：

```bash
brew install supabase/tap/supabase
```

Windows：

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

deb 安装：

下载 [deb 地址](https://github.com/supabase/cli/releases)

```bash
wget https://github.com/supabase/cli/releases/download/v1.199.0/supabase_1.199.0_linux_arm64.deb
sudo dpkg -i supabase_1.199.0_linux_arm64.deb
```

### 2.3 启动 Supabase

```bash
sudo supabase start # 启动后开始拉取docker镜像（国内可能会拉取失败，需要配置镜像源或者使用代理服务器拉取）
sudo supabase start --debug --ignore-health-check # 输出 debug 信息，跳过检查
sudo supabase stop # 停止
sudo supabase status # 查看状态
```

## 3、配置 chatbot-ui

### 3.1 环境变量

在终端中，在本地 Chatbot UI 存储库的根目录中，运行：

```bash
cp .env.local.example .env.local
```

```bash
vim .env.local

sudo supabase status

# 打印信息如下
         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: xxx
        anon key: xxxx
service_role key: xxxxxx
   S3 Access Key: xxxxx
   S3 Secret Key: xxxxx
       S3 Region: local

# 修改如下字段
NEXT_PUBLIC_SUPABASE_URL= # API URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # anon key
SUPABASE_SERVICE_ROLE_KEY= # service_role key
#NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434 # 注释 Ollama，如果有配置则省略
```

### 3.2 SQL 设置

- `project_url`（第 53 行）`http://supabase_kong_chatbotui:8000` 其值在 `supabase/config.toml` 文件的 `project_id` 字段，默认即可无需修改
- `service_role_key`（第 54 行）修改为 service_role key

## 4、安装 Ollama（本地型号可选）

请按照[此处](https://github.com/jmorganca/ollama#macos)的说明进行操作。

## 5、本地运行

在终端中，在本地 Chatbot UI 存储库的根目录中，运行：

```bash
sudo npm run chat
```

您的本地 Chatbot UI 实例现在应该以 http://localhost:3000 运行。请务必使用兼容的 node 版本（至少 v18.17.0）。

您可以在 http://localhost:54323/project/default/editor 中查看后端 GUI。

参考：[chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) [supabase docs](https://supabase.com/docs/guides/getting-started)

## 6、设置 nginx 代理访问

```conf
server {
    listen 443;
    server_name  mychatbot.sanyer.top;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /chatbot/ {
        proxy_pass http://127.0.0.1:54321;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        rewrite ^/chatbot/(.*)$ /$1 break;
    }
}
```

```bash
vim .env.local

NEXT_PUBLIC_SUPABASE_URL=https://mychatbot.sanyer.top/chatbot
```
