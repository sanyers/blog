(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{340:function(s,a,t){"use strict";t.r(a);var n=t(10),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"v2ray搭建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#v2ray搭建"}},[s._v("#")]),s._v(" V2Ray搭建")]),s._v(" "),a("h2",{attrs:{id:"_1、服务端搭建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、服务端搭建"}},[s._v("#")]),s._v(" 1、服务端搭建")]),s._v(" "),a("p",[s._v("系统支持：Ubuntu，Debian，CentOS，推荐使用 Ubuntu 22，谨慎使用 CentOS，脚本可能无法正常运行！")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# v2ray")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -qO- -o- https://git.io/v2ray.sh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# xray")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -qO- -o- https://github.com/233boy/Xray/raw/main/install.sh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("输入命令 "),a("code",[s._v("v2ray")]),s._v(" 管理面板")]),s._v(" "),a("p",[s._v("本地安装：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#（1）安装依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" jq qrencode\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#（2）下载 v2ray")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-64.zip\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#（3）设置服务器ip")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ip")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("你的服务器ip\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#（4）下载 v2ray 脚本并解压配置可执行")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://codeload.github.com/233boy/v2ray/tar.gz/refs/tags/v4.17\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-zxvf")]),s._v(" v2ray-4.17.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" v2ray-4.17.tar\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x install.sh\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看脚本帮助")]),s._v("\n./install.sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-h")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装")]),s._v("\n./install.sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-l")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" ./v2ray-linux-64.zip\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("h2",{attrs:{id:"_2、客户端使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、客户端使用"}},[s._v("#")]),s._v(" 2、客户端使用")]),s._v(" "),a("h3",{attrs:{id:"_2-1-windows-上使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-windows-上使用"}},[s._v("#")]),s._v(" 2.1 windows 上使用")]),s._v(" "),a("p",[s._v("下载地址：")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/2dust/v2rayN/releases/latest",target:"_blank",rel:"noopener noreferrer"}},[s._v("v2rayN"),a("OutboundLink")],1),s._v("，然后选择 v2rayN-Core.zip 下载")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/v2rayA/v2rayA/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("v2rayA"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("启动客户端后，然后配置win10系统代理，就可以全局使用")]),s._v(" "),a("p",[s._v("在客户端内开启局域网使用，然后手机端 -> 设置 -> wifi -> http 代理 -> 填写客户端电脑ip地址+端口（该方法仅可在局域网内使用，andorid和ios都可以连接无需安装app）")]),s._v(" "),a("h3",{attrs:{id:"_2-2-linux-上使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-linux-上使用"}},[s._v("#")]),s._v(" 2.2 linux 上使用")]),s._v(" "),a("p",[s._v("（1）安装 V2Ray 内核")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-Ls")]),s._v(" https://mirrors.v2raya.org/go.sh "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装后可以关掉服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl disable v2ray\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("（2）安装 v2rayA")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加公钥")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-qO")]),s._v(" - https://apt.v2raya.mzz.pub/key/public-key.asc "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" apt-key "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" -\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加 V2RayA 软件源")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"deb https://apt.v2raya.mzz.pub/ v2raya main"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tee")]),s._v(" /etc/apt/sources.list.d/v2raya.list\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 更新软件源")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" update\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装 V2RayA")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" v2raya\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("p",[s._v("（3）启动、自动启动 v2rayA")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl start v2raya.service\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置自动启动")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" v2raya.service\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("（4）设置 v2raya")]),s._v(" "),a("p",[s._v("通过 2017 端口 如 "),a("code",[s._v("http://localhost:2017")]),s._v(" 访问 UI 界面。")]),s._v(" "),a("p",[s._v("在第一次进入页面时，你需要创建一个管理员账号，请妥善保管你的用户名密码，如果遗忘，使用 "),a("code",[s._v("sudo v2raya --reset-password")]),s._v(" 命令重置。")]),s._v(" "),a("p",[s._v("（5）连接 v2ray 服务器")]),s._v(" "),a("p",[s._v("打开 "),a("code",[s._v("http://localhost:2017")]),s._v(" 网站，点击 "),a("code",[s._v("导入")]),s._v("，输入 vmess 地址后，列表出现该服务器选项，选择该服务器，然后点击左上角启动，当提示 "),a("code",[s._v("正在运行")]),s._v(" 则表示代理服务器已启动，使用 "),a("code",[s._v("lsof -i:1080")]),s._v(" 查看端口是否已启动。")]),s._v(" "),a("p",[s._v("（6）docker 安装")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("docker run -d -p 2017:2017 -p 20170-20172:20170-20172 --restart always --name v2raya -e V2RAYA_LOG_FILE=/tmp/v2raya.log -v /etc/v2raya:/etc/v2raya  mzz2017/v2raya\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("（7）使用代理打不开页面")]),s._v(" "),a("p",[s._v("可能是页面资源是国内的，不需要代理，可以使用匹配规则去代理（只代理已配置的url）,也可以配置过滤规则去代理（过滤已配置的url）,或者使用 socks5 协议")]),s._v(" "),a("h3",{attrs:{id:"_2-3-android-上使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-android-上使用"}},[s._v("#")]),s._v(" 2.3 Android 上使用")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/2dust/v2rayNG/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("v2rayNG"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.v2ray.ang",target:"_blank",rel:"noopener noreferrer"}},[s._v("Google Play"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/2dust/v2flyNG/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("v2flyNG"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.v2ray.v2fly",target:"_blank",rel:"noopener noreferrer"}},[s._v("Google Play v2flyNG"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"_2-4-ios-上使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-ios-上使用"}},[s._v("#")]),s._v(" 2.4 iOS 上使用")]),s._v(" "),a("p",[s._v("虽然 V2Ray 官方没有 iOS 客户端，但是有第三方客户端，例如 kitsunebi，shadowrocket，Pepi (ShadowRay)")]),s._v(" "),a("p",[s._v("https://233v2.com/post/11/")]),s._v(" "),a("h2",{attrs:{id:"_3、参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、参考"}},[s._v("#")]),s._v(" 3、参考")]),s._v(" "),a("p",[s._v("https://zhuanlan.zhihu.com/p/414998586")]),s._v(" "),a("p",[s._v("https://v2raya.org/")]),s._v(" "),a("p",[s._v("https://github.com/v2rayA/v2rayA")]),s._v(" "),a("p",[s._v("https://github.com/233boy/v2ray/wiki")])])}),[],!1,null,null,null);a.default=e.exports}}]);