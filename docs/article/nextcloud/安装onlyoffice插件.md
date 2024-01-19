# 安装onlyoffice插件

## 1、docker 安装

```bash
sudo docker run -d --name onlyoffice -p 8080:80 -p 3443:443 -v /home/sanyer/onlyoffice/logs:/var/log/onlyoffice -v /home/sanyer/onlyoffice/data:/var/www/onlyoffice/Data -v /home/sanyer/onlyoffice/lib:/var/lib/onlyoffice -v /home/sanyer/onlyoffice/db:/var/lib/postgresql --restart=always -e JWT_SECRET=your_secret -e JWT_ENABLE=true -e JWT_IN_BODY=true -e JWT_HEADER=AuthorizationJwt -e USE_UNAUTHORIZED_STORAGE=true onlyoffice/documentserver
```

## 2、参数说明

- `8080:80` 开放 http 访问
- `3443:443` 开放 https 访问

- `/var/log/onlyoffice` ONLYOFFICE文档日志
- `/var/www/onlyoffice/Data` 对于证书
- `/var/lib/onlyoffice` 用于文件缓存
- `/var/lib/postgresql` 用于数据库

- `JWT_SECRET=your_secret`  JWT 密钥，若未填写，将自动生成 `/etc/onlyoffice/documentserver/local.json`
- `JWT_ENABLE=true` JWT 令牌验证
- `JWT_IN_BODY=true` 请求正文中启用令牌验证
- `JWT_HEADER=AuthorizationJwt` 令牌的 HTTP 标头
- `USE_UNAUTHORIZED_STORAGE=true` 如果服务器使用自签名证书，则需要设置该值

## 3、https 访问

如果使用 https 访问，则需要证书：

```
/app/onlyoffice/DocumentServer/data/certs/onlyoffice.key
/app/onlyoffice/DocumentServer/data/certs/onlyoffice.crt
```

如果是自签名证书，需要进入容器安装根证书

```bash
sudo docker cp ./serverCA.crt onlyoffice:/usr/local/share/ca-certificates/
sudo docker exec -it onlyoffice /bin/bash
sudo update-ca-certificates
```

访问 `https://ip:port/healthcheck` 显示为 true 表示成功

## 4、配置 nextcloud 访问

> 修改配置文件 /var/www/html/config/config.php

```php
  'onlyoffice' =>
  array (
          'verify_peer_off' => true,
          "jwt_secret" => "your_secret",
          "jwt_header" => "AuthorizationJwt",
  ),
```

在 `应用` => 找到 `ONLYOFFICE` 下载并启用

如果下载失败，可能需要科学上网，可以离线安装，将下载的 gz 文件复制并解压到 `custom_apps` 文件夹即可

然后 `应用` => 启用 `ONLYOFFICE`

在管理设置中，找到 `ONLYOFFICE` 选项，设置连接地址，点击保存即可

如果使用 https 自签名访问，则需要进入 nextcloud 容器安装根证书

如果无法连接，可以分别进入 onlyoffice 和 nextcloud 容器测试 `wget https://ip:port` 是否正常访问

## 5、参考

[onlyoffice docs](https://api.onlyoffice.com/zh/editors/basic)

[onlyoffice 安装指南](https://helpcenter.onlyoffice.com/installation/docs-community-install-docker.aspx)
