# 申请Let’s Encrypt证书

ACME v2 (RFC 8555) 服务器地址

[生产环境] `https://acme-v02.api.letsencrypt.org/directory`

[测试环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

 https://letsencrypt.org/zh-cn/getting-started/

## 1、lego

### 1.1 安装

下载 [https://github.com/go-acme/lego/tags](https://github.com/go-acme/lego/tags)

文档 [https://go-acme.github.io/lego/](https://go-acme.github.io/lego/)

解压 `tar -zxvf lego.tar.gz`

### 1.2 获取证书

（1）获取单域名

`./lego --email="xxx@xxx.com" --domains="test.sanyer.top" --http run`

您将在当前工作目录的文件夹中找到您的证书：`.lego`

（2）获取通配符域名

1. 在这之前，需要找到你的域名服务商，并设置 `--dns`，比如我的是阿里云，那就是 `--dns alidns`，查看更多[域名服务商](https://go-acme.github.io/lego/dns/)

2. 其次需要设置两个环境变量：

```sh
export ALICLOUD_ACCESS_KEY=xxx
export ALICLOUD_SECRET_KEY=xxx
```

3. 然后运行命令

`./lego --email="xxx@xxx.com" --dns alidns --domains="*.sanyer.top" --http run`

4. 运行命令之后会输出一个TXT文本，需要添加到域名解析的TXT记录

5. 然后再回车下一步，提示生成成功，在当前工作目录的文件夹中的 `.lego` 目录下找到生成的证书

> 注意：访问 ACME 地址可能超时（GFW）

（3）修改 ACME 服务地址

`./lego --server=https://acme-staging-v02.api.letsencrypt.org/directory`

（4）端口使用情况

默认情况下，lego 使用 80 和 443 来验证服务器

（5）使用正在运行的现有 Web 服务器

如果在端口 80 上运行现有服务器，则该选项还需要该选项。 这只会将 http-01 质询令牌写入文件夹中的给定目录，而不会启动服务器。

`./lego --accept-tos --email you@example.com --http --http.webroot /path/to/webroot --domains example.com run`

### 1.3 续订证书

Let's Encrypt 颁发的证书有效期为90天。 为避免证书错误，需要确保在证书过期之前续订证书。

默认情况下，按照最佳实践，仅当证书的到期日期少于未来 30 天时，才会续订证书。

`./lego --email="you@example.com" --domains="example.com" --http renew`

如果证书需要提前续订，您可以指定剩余天数：

`./lego --email="you@example.com" --domains="example.com" --http renew --days 45`

### 1.4 使用脚本

`./lego --email="you@example.com" --domains="example.com" --http renew --renew-hook="./myscript.sh"`

### 1.5 自动续订

创建一个 cron 作业（或 systemd 计时器）来自动续订所有证书

这样做时，请注意，某些 cron 默认值会在 ACME 提供程序的基础设施上造成可测量的负载。 值得注意的是，工作在午夜运行。

```sh
# avoid:
#@daily      /usr/bin/lego ... renew
#@midnight   /usr/bin/lego ... renew
#0 0 * * *   /usr/bin/lego ... renew

# instead, use a randomly chosen time:
35 3 * * *  /usr/bin/lego ... renew
```

## 2、certbot

https://github.com/certbot/certbot

## 3、速率限制

生产环境：

- 每个注册域名可签发证书数量（每周50张）
- 每周最多 5 张重复证书的限制
- 3小时之内每个IP地址最多可以创建10个账户。 每个 IPv6 /48 地址段每 3 小时最多可以创建 500 个账户
- 3小时之内每个账户最多可以创建300个新订单
- 每份证书最多100个域名

测试环境：

- 每个注册域名允许颁发的证书数量限制为每周 30000 张。
- 重复证书限制为每周 30000 张。
- 每小时允许 60 次验证失败。
- 每个 IP 地址注册账户数量限制为每个 IP 每 3 小时允许注册 50 个账户。
- 对于 ACME v2，新订单限制为每个帐户每 3 小时 1500 个。