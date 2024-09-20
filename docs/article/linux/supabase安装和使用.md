# supabase 安装和使用

## 1、安装

```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker

cp .env.example .env

sudo docker-compose pull

sudo docker-compose up -d
```

## 2、容器介绍

- Kong 是一个云原生 API 网关。
- GoTrue 是一个基于 JWT 的 API，用于管理用户和发放 JWT 令牌。
- PostgREST 是一个 Web 服务器，可将我们的 PostgreSQL 数据库直接转换为 RESTful API。
- Realtime 是一个 Elixir 服务器，允许我们通过 Websockets 监听 PostgreSQL 的插入、更新和删除操作。实时使用 Postgres 内置的复制功能轮询数据库更改，将更改转换为 JSON，然后通过 Websockets 广播 JSON 给授权的客户端。
- Storage 提供一个 RESTful 接口，用于管理存储在 S3 中的文件，并使用 Postgres 管理权限。
- postgres-meta 是一个用于管理您的 Postgres 的 RESTful API，允许我们获取表、添加角色和运行查询等。
- PostgreSQL 是一个具有超过 30 年积极开发历史的面向对象关系数据库系统，以其可靠性、功能强大和性能而赢得了强大的声誉。

## 3、访问 Supabase

容器启动后，我们可以通过 8000 端口上的 API 网关访问 Supabase Dashboard 页面。http://127.0.0.1:8000/

API 网关提供的服务接口：

- REST：http:///127.0.0.1:8000/rest/v1/
- Auth：http:///127.0.0.1:8000/auth/v1/
- Storage：http:///127.0.0.1:8000/storage/v1/
- Realtime：http:///127.0.0.1:8000/realtime/v1/

访问时系统会提示我们输入用户名和密码，系统默认的用户密码分别如下：

- 用户名：supabase
- 密码：this_password_is_insecure_and_should_be_updated

## 4、修改 Supabase Dashboard 的登录密码

```bash
vim docker/.env

DASHBOARD_USERNAME=sanyer
DASHBOARD_PASSWORD=123456

# 修改并保存后执行如下命令重启服务即可
sudo docker-compose stop
sudo docker-compose up -d
```

## 5、修改 API 密钥

在生产环境中，我们可以修改系统默认的 API 密钥，确保系统更加安全。我们可以访问 Supabase 网关自动生成密钥（[点击访问](https://supabase.com/docs/guides/self-hosting/docker#exposing-your-postgres-database)）,其中 JWT Secret 每次打开页面都不一样，我们可以直接使用，也可以自定义一个。然后点击“Generate JWT”按钮生成 ANON_KEY，记下它： 

参考：https://www.hangge.com/blog/cache/detail_3408.html