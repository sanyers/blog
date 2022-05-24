# nginx 中文乱码

## 1、网页代码设置

设置网页代码设置 utf-8 编码格式

```html
<!DOCTYPE HTML>
<html>
<head>
    <Meta http-equiv="Content-Type" content="text/HTML; charset=utf-8" />
     <Title>中文标题</Title>
</head>
<body>
    <div>你好世界</div>
</body>
</html>
```

## 2、Nginx 配置

nginx.conf 配置项设置 utf-8 编码格式：注意 server 层 和 访问路径 location 都要配置一下

```
serve {
  charset utf-8;
  location / {
    charset utf-8;
  }
}
```