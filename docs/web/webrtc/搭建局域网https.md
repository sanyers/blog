# 搭建局域网 https

## 1、前言

首先是为什么要干这个事情，你可能会说随便搞个自签名证书难道不能用吗？答案是还真的不能用，的确对于开发来说搞个自签名的证书就行了。但是一旦放到生产环境浏览器对证书有效性进行验证的时候便是不可信状态，这时就必须要用户点击一下继续访问，但是对于我们即将实施项目的自动化要求来说没法这样干。你可能又会说了现在这个环境在阿里云、华为云这些平台上随便申请一个免费的证书难道不行吗？答案是真的不行，因为项目的特殊要求最终我们部署的环境是完全没有外网访问的，就只能在局域网环境下运行及意味着不光是 SSL 证书的问题我们连 DNS 服务器都要自己建。这时候你可能又要说了那么直接用 http 访问就可以了，干嘛要用 ssl 证书呀？答案是这个项目需要使用 WebRTC 进行音视频多人会议，而 WebRTC 只能在 https 下运行。

## 2、原理

SSL 证书的信任机制其实是非常简单的，第一需要一个机构证书，第二是需要服务端证书，一般来说机构证书被称为 CA 证书，而服务端证书就称为服务器证书吧。那么为啥 https 非常安全呢？答案其实不复杂，下面就是一段逻辑性描述来说明为啥 https 是安全的。

通常情况下我们在给 Nginx、Tomcat、IIS 上配置的证书便是服务器证书，那么它是怎么保证客户端访问的地址绝对没有被拦截修改的呢？其实也不复杂，当我们的浏览器发起一个请求的时候到服务端上时，对应 web 服务器会通过证书的秘钥将 http 响应值进行一次加密，然后将密文与明文同时返回出来，客户端浏览器接收到响应之后会将密文对称解码然后和明文进行对比，这样一来便可以保证响应值没有被串改。

这个时候逻辑上稍微厉害一点都会发现一个问题，客户端是怎么解码的？这里的答案就是服务端在响应的时候同时会将证书的公钥也返回，这个公钥只能解码对应私钥加密的信息，同时这个公钥无法加密只能解密，这样一来如果如果某人想要拦截 http 请求便必须知道对应的私钥才行，否则浏览器一旦发现解密信息对不上便知道了响应数据已经被拦截修改过了。

如果你反应过来了你会发现一个新的问题，那么假设拦截这自己搞了一对有效的私钥和公钥然后伪装为服务器不就行了，恭喜你盲生发现了华点。这里就需要 CA 证书来处理了。其实服务器证书的公钥是由 CA 证书的秘钥配对加密来的，这样一来当请求返回的服务器公钥和通过 CA 证书进行验证时便会发现这个公钥是不是由机构签发的公钥，一旦对应不上则说明服务器不是原来 CA 证书签发服务器证书，这就证明你的请求被第三方拦截了。同时 CA 证书对于浏览器而言只有公钥，也就是说安装证书时本质上就是将 CA 证书的公钥导入到你的电脑上了，至此除开 CA 机构的证书发放者没有知道 CA 证书的秘钥是什么这样一来便可以保证下面几个非常关键的安全性：

- 你请求的服务绝对是官方的服务器，绝对不是黑客自建的服务器。
- 服务器响应给你的数据绝对是正确的，期间黑客绝对无法对其进行修改。

证书的结构如下：

<div class="img-page">
<a data-fancybox title="ssl" href="/blog/img/web/webrtc/3/ssl.png"><img :src="$withBase('/img/web/webrtc/3/ssl.png')" alt="ssl"></a>
</div>

这里还有一个问题便是这些 CA 证书是哪来的，自己的电脑上又重来没有导入过什么证书。这里便是一个非常无耻躺着赚钱的商业模式了，微软、谷歌、苹果等公司提供了操作系统和浏览器，他们便是第一方的 CA 机构，他们的系统自己肯定信任自己对吧？所以系统安装的时候他们的 CA 公钥已经安装到你们的系统里面了，然后这几家巨头合伙说那么这些 CA 公钥在每种系统都有，然后就是一写第三方公司和这些巨头打成了合作，这些公司的机构证书也被巨头们信任所以理所当然的入库了，这些三方机构便是大名鼎鼎的 Symantec、GeoTrust、Let's Encrypt 几个巨头，这些机构一个单域名的签名证书都敢直接拿出来卖，一年好几千，对他们而言无法就是给下发的证书进行一次签名而已，真正的躺着赚钱。

## 3、制作证书与使用

## 3.1 使用 mkcert 工具制作

https://github.com/FiloSottile/mkcert/releases/latest

### 3.1.1 windows 制作与使用

（1）下载

直接下载 windows 版本 [mkcert-v1.4.4-windows-amd64.exe](https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-windows-amd64.exe) 可执行程序，然后在自己的软件目录新建 `mkcert` 目录，将下载的 exe 重新命名 mkcert.exe

（2）添加环境变量

`此电脑` 右键属性 -> `高级系统设置` -> `环境变量` -> Path -> 新建 -> `c:\soft\mkcert`

（3）查看是否安装

命令行直接运行：`mkcert`

（4）生成根证书

```sh
mkcert -install
Using the local CA at "C:\Users\sanye\AppData\Local\mkcert" ✨

mkcert -CAROOT # 查看根证书路径
```

会自动生成下面两个文件：

- `rootCA.pem`
- `rootCA-key.pem`

（5）生成自签证书

```
mkcert localhost 127.0.0.1 ::1 192.168.0.101
Using the local CA at "C:\Users\sanye\AppData\Local\mkcert" ✨

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"
 - "192.168.0.101"

The certificate is at "./localhost+2.pem" and the key at "./localhost+2-key.pem" ✅
```

可以将证书重命名自己需要的名字比如 `localhost_key.pem` `localhost_cert.pem`

只要在 web server 上使用这两个文件就可以了。

（6）服务器使用自签名证书

```ts
import express from 'express';

const app = express();
app.use('/', express.static('web')); // 开放web站点文件夹目录

const options = {
  key: fs.readFileSync('./ssl/localhost_key.pem'), // 证书文件的存放目录
  cert: fs.readFileSync('./ssl/localhost_cert.pem'),
};

const protocol = 'https'; // 可配置 http 或 https
const server = require(protocol).Server(options, app);
server.listen(8080, function () {
  console.log('app is running at port 8080');
});
```

（7）局域网内客户端安装根证书

将刚才生成的根证书 `rootCA.pem` 拷贝一个副本，并命名为 `rootCA.crt` (因为 windows 并不识别 pem 扩展名，并且 Ubuntu 也不会将 pem 扩展名作为 CA 证书文件对待)，将 `rootCA.crt` 文件分复制给局域网内的其他用户，手工导入。

windows 导入：

双击这个证书文件，在常规选项卡，点击安装证书证书，在导入向导中将证书导入 `受信任的根证书颁发机构`:

<div class="img-page">
<a data-fancybox title="1" href="/blog/img/web/webrtc/3/1.png"><img :src="$withBase('/img/web/webrtc/3/1.png')" alt="1"></a>
</div>

<div class="img-page">
<a data-fancybox title="2" href="/blog/img/web/webrtc/3/2.png"><img :src="$withBase('/img/web/webrtc/3/2.png')" alt="2"></a>
</div>

<div class="img-page">
<a data-fancybox title="3" href="/blog/img/web/webrtc/3/3.png"><img :src="$withBase('/img/web/webrtc/3/3.png')" alt="3"></a>
</div>

Windows 命令行执行

```bash
certutil -addstore -f "ROOT" selfsigned.crt
```

Mac OS X

```
sudo security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain "selfsigned.crt"
```

如果想将自签名证书在全系统级别受信任，需要将上面的证书目标路径从 ~/Library/Keychains/login.keychain 替换成 /Library/Keychains/login.keychain。

注意：在Mac下，浏览器和 curl 会自动信任新增的自签名证书，但许多编程语言并没有默认集成 keychain，因此不能自动通过自签名证书。

Ubuntu 的做法可以将证书文件(必须是 crt 后缀)放入 `/usr/local/share/ca-certificates/`，然后执行 `sudo update-ca-certificates`

```bash
$ sudo apt install ca-certificates -y
$ cp selfsigned.crt /usr/local/share/ca-certificates/
$ sudo update-ca-certificates --verbose
```

CentOS

```bash
$ sudo yum install -y ca-certificates
$ sudo cp selfsigned.crt /usr/share/pki/ca-trust-source/anchors/
$ sudo update-ca-trust force-enable
$ sudo update-ca-trust extract
```

在 iOS 上，您可以使用 AirDrop、通过电子邮件将 CA 发送给自己，或者从 HTTP 服务器提供它。打开它后，您需要在“配置文件[下载>设置”中安装配置文件](https://github.com/FiloSottile/mkcert/issues/233#issuecomment-690110809)，然后[在其中启用完全信任](https://support.apple.com/en-nz/HT204477)。

对于 Android，您必须安装 CA，然后在应用程序的开发版本中启用用户根目录。请参阅此 [StackOverflow 答案](https://stackoverflow.com/a/22040887/749014)。

### 3.1.2 ubuntu 制作

（1）下载

arm64 `https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-arm64`

amd64 `https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64`

将下载的二进制文件复制到 ubuntu 系统中，然后重命名 `mkcert`，并复制到目录：

```sh
sudo cp mkcert /usr/local/bin/mkcert

# 进入目录
cd /usr/local/bin

# 设置权限
sudo chmod +x mkcert

# 查看是否安装成功
mkcert

# 如果出现如下错误提示

# The local CA is already installed in the system trust store! 👍
# Warning: "certutil" is not available, so the CA can't be automatically installed in Firefox and/or Chrome/Chromium! ⚠️ 
# Install "certutil" with "apt install libnss3-tools" and re-run "mkcert -install" 👈

# 请安装 libnss3-tools

sudo apt install libnss3-tools
```

（2）生成根证书

```
mkcert -install
```

后续步骤重复上面（4）步骤开始

## 3.2 使用 nodejs 工具制作

（1）安装库

```
npm i mkcert express
```

（2）编写代码，生成证书

```js
const mkcert = require('mkcert');
const fs = require('fs');

init();
async function init() {
  // 生成根证书
  const ca = await mkcert.createCA({
    organization: 'sanyer', // 组织
    countryCode: 'CN', // 国家代码
    state: 'GUANGDONG', // 省名称
    locality: 'SHENGZHENG', // 城市名称
    validityDays: 3650, // 过期时间
  });

  fs.writeFileSync('./ssl/ca.crt', ca.cert); // 根证书，这个文件发送给局域网内用户安装
  fs.writeFileSync('./ssl/ca.key', ca.key);

  // 生成服务器证书，用于Nginx、IIS等站点
  const cert = await mkcert.createCert({
    domains: ['127.0.0.1', 'localhost', '::1', '192.168.0.101'], // 配置域名或本地ip
    validityDays: 3650,
    caKey: ca.key,
    caCert: ca.cert,
  });

  fs.writeFileSync('./ssl/node_cert.pem', cert.cert);
  fs.writeFileSync('./ssl/node_key.pem', cert.key);
  // console.log(cert.key, cert.cert);
  // console.log(`${cert.cert}\n${ca.cert}`);
}
```

运行：

`node index.js`

可在 `./ssl` 目录查看生成的四个文件：

- ca.crt
- ca.key
- node_cert.pem
- node_key.pem

## 3.3 nodejs 部署 https

创建 `server.js` 文件

```js
const express = require('express')
const https = require('https')
const fs = require('fs')

const app = express()
app.use('/', express.static('web'))

const options = {
//   strictSSL: false,
//   rejectUnauthorized: false,
  key: fs.readFileSync('./ssl/node_key.pem'), // 证书文件的存放目录
  cert: fs.readFileSync('./ssl/node_cert.pem'),
}
const server = https.Server(options, app)

const server_port = 19001
server.listen(server_port)
console.log('https listening on ' + server_port)
```

通过输入 `https://192.168.0.101:19001` 地址后，浏览器可直接进入，不会提示拦截证书不安全

<div class="img-page">
<a data-fancybox title="4" href="/blog/img/web/webrtc/3/4.png"><img :src="$withBase('/img/web/webrtc/3/4.png')" alt="4"></a>
</div>

> 使用nodejs创建的mkcert证书在iOS系统上的safari浏览器还是会跳转到不安全的拦截页，可能go版本的mkcert兼容性要好一些

## 4、参考

https://github.com/FiloSottile/mkcert/

[局域网内搭建浏览器可信任的SSL证书](https://www.tangyuecan.com/2021/12/17/%e5%b1%80%e5%9f%9f%e7%bd%91%e5%86%85%e6%90%ad%e5%bb%ba%e6%b5%8f%e8%a7%88%e5%99%a8%e5%8f%af%e4%bf%a1%e4%bb%bb%e7%9a%84ssl%e8%af%81%e4%b9%a6/)

https://www.jianshu.com/p/7cb5c2cffaaa

https://blog.csdn.net/qq_45392321/article/details/119676301

https://zhuanlan.zhihu.com/p/395677319
