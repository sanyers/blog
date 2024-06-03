(window.webpackJsonp=window.webpackJsonp||[]).push([[322],{608:function(s,e,a){"use strict";a.r(e);var t=a(10),n=Object(t.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"turn-部署"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#turn-部署"}},[s._v("#")]),s._v(" turn 部署")]),s._v(" "),e("h2",{attrs:{id:"_1、环境安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、环境安装"}},[s._v("#")]),s._v(" 1、环境安装")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("sudo yum install -y make gcc cc gcc-c++ wget\n\nsudo yum install -y openssl-devel libevent libevent-devel\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("unbutn 20.04 安装依赖：")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" libssl-dev libpq-dev pkg-config\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("生成签名")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("openssl req -x509 -newkey rsa:2048 -keyout ./turn_server_pkey.pem -out ./turn_server_cert.pem -days 99999 -nodes\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"_2、turn-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、turn-安装"}},[s._v("#")]),s._v(" 2、turn 安装")]),s._v(" "),e("p",[s._v("turn github 地址： "),e("a",{attrs:{href:"https://github.com/coturn/coturn",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/coturn/coturn"),e("OutboundLink")],1)]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("wget https://github.com/coturn/coturn/archive/refs/tags/4.6.2.tar.gz\n\ntar -xvzf 4.6.2.tar.gz\n\ncd coturn-4.6.2 && ./configure\n\nmake\n\nsudo make install\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])]),e("h2",{attrs:{id:"_3、检查安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、检查安装"}},[s._v("#")]),s._v(" 3、检查安装")]),s._v(" "),e("p",[s._v("测试是否安装成功，若有路径表示成功")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("which turnserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"_4、配置-turn"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、配置-turn"}},[s._v("#")]),s._v(" 4、配置 turn")]),s._v(" "),e("h3",{attrs:{id:"_4-1-配置-turnserver-conf"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-配置-turnserver-conf"}},[s._v("#")]),s._v(" 4.1 配置 turnserver.conf")]),s._v(" "),e("p",[s._v("复制出 turnserver.conf.default 为 turnserver.conf")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("cd /usr/local/etc/\ncp turnserver.conf.default turnserver.conf\nifconfig\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("vim 编辑配置文件，shift+g 跳到最后一行加上以下内容")]),s._v(" "),e("div",{staticClass:"language-conf line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("#与前 ifconfig 查到的网卡名称一致\nrelay-device=eth0\n#内网IP\nlistening-ip=192.168.1.191\n#内网IP\nrelay-ip=192.168.1.191\n#公网IP\nexternal-ip=xxx.xx.xx.xxx\nrelay-threads=50\nmin-port=49152\nmax-port=65535\n#用户名密码，创建IceServer时用\nuser=用户名:密码\n#一般与turnadmin创建用户时指定的realm一致\nrealm=xxx.com\n#端口号\nlistening-port=3478\n#不开启会报CONFIG ERROR: Empty cli-password, and so telnet cli interface is disabled! Please set a non empty cli-password!错误\ncli-password=密码\n#证书\ncert=/etc/turn_server_cert.pem\npkey=/etc/turn_server_pkey.pem\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br")])]),e("p",[s._v("必需配置的项：")]),s._v(" "),e("div",{staticClass:"language-conf line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("external-ip=xxx.xx.xx.xxx\nuser=用户名:密码\ncli-password=密码\n#证书\ncert=/etc/turn_server_cert.pem\npkey=/etc/turn_server_pkey.pem\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("h3",{attrs:{id:"_4-2-开放-tcp-和-udp-端口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-开放-tcp-和-udp-端口"}},[s._v("#")]),s._v(" 4.2 开放 tcp 和 udp 端口")]),s._v(" "),e("p",[s._v("在防火墙开启 3478 端口")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("firewall-cmd --zone=public --add-port=3478/udp --permanent\nfirewall-cmd --zone=public --add-port=3478/tcp --permanent\nfirewall-cmd --reload\n# 重启防火墙\nsystemctl restart firewalld.service\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("查看是否开启")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("firewall-cmd --zone=public --query-port=3478/tcp\nfirewall-cmd --zone=public --query-port=3478/udp\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("在腾讯云（阿里云）控制台把 tcp 和 udp 端口 49152-65535 放开（或者全部开放 1-65535 端口，或者只开放 3478 端口，默认 3478）")]),s._v(" "),e("h2",{attrs:{id:"_5、后台启动程序"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5、后台启动程序"}},[s._v("#")]),s._v(" 5、后台启动程序")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("turnserver "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-a")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" xxx.com "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-c")]),s._v(" /usr/local/etc/turnserver.conf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("查看是否在运行")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("ps -ef|grep turnserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("关闭程序")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("killall turnserver\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("参数说明：")]),s._v(" "),e("ul",[e("li",[s._v("-L 监听的IP地址")]),s._v(" "),e("li",[s._v("-p 监听端口")]),s._v(" "),e("li",[s._v("-E 中继IP")]),s._v(" "),e("li",[s._v("-X 公网/内网 映射配置")]),s._v(" "),e("li",[s._v("--no-loopback-peers  不使用127.x.x.x，::1回路IP地址")]),s._v(" "),e("li",[s._v("-m "),e("code",[s._v("<numbeer>")]),s._v("　　当前连接上的线程数，默认CPU个数")]),s._v(" "),e("li",[s._v("--min-port   起始用的最小端口")]),s._v(" "),e("li",[s._v("--max-port   最大端口号")]),s._v(" "),e("li",[s._v("-o 以守护进程模式运行（后台运行）")]),s._v(" "),e("li",[s._v("-f 使用指纹")]),s._v(" "),e("li",[s._v("-a 长期验证机制")]),s._v(" "),e("li",[s._v("-z 不进行验证，所有客户端均可访问")]),s._v(" "),e("li",[s._v("-u 用户名：密码")]),s._v(" "),e("li",[s._v("-r realm组别")]),s._v(" "),e("li",[s._v("--check-origin-consistency 连续检测会话的属性值")]),s._v(" "),e("li",[s._v("-q, --user-quota "),e("code",[s._v("<number>")]),s._v("  allocation配额")]),s._v(" "),e("li",[s._v("-Q, --total-quota "),e("code",[s._v("<number>")]),s._v(" 总配额值")]),s._v(" "),e("li",[s._v("-s, --max-bps 带宽")]),s._v(" "),e("li",[s._v("-B, --bps-capacity 总带宽容量")]),s._v(" "),e("li",[s._v("-c 配置文件名称")]),s._v(" "),e("li",[s._v("-b, --db, --userdb "),e("code",[s._v("<filename>")]),s._v("  数据库名")]),s._v(" "),e("li",[s._v("-M, --mysql-userdb "),e("code",[s._v("<con-string>")]),s._v(" mysql连接字符串")]),s._v(" "),e("li",[s._v("--server-name　　服务名，默认同realm")]),s._v(" "),e("li",[s._v("-n 不使用配置，全部使用命令行参数")]),s._v(" "),e("li",[s._v("--cert PEM格式的证书")]),s._v(" "),e("li",[s._v("--pkey PEM格式的私钥文件")]),s._v(" "),e("li",[s._v("--pky-pwd 私钥的密码")]),s._v(" "),e("li",[s._v("--no-udp 不提供UDP协议的服务")]),s._v(" "),e("li",[s._v("--no-tcp 不提供TCP协议的服务")]),s._v(" "),e("li",[s._v("--no-tls 不使用TLS服务")]),s._v(" "),e("li",[s._v("--no-udp-relay　不使用UDP中继")]),s._v(" "),e("li",[s._v("--no-tcp-relay　不使用TCP中继")]),s._v(" "),e("li",[s._v("-l, --log-file,"),e("code",[s._v("<filename>")]),s._v(" 指定日志文件")]),s._v(" "),e("li",[s._v("--no-stdout-log 控制台不输出std-out格式的日志")]),s._v(" "),e("li",[s._v("--syslog 使用系统日志")]),s._v(" "),e("li",[s._v("--simple-log 使用建议日志记录，所有日志会覆盖之前对应日志文件的内容（日志文件同名）")]),s._v(" "),e("li",[s._v("-S, --stun-only 只使用STUN服务")]),s._v(" "),e("li",[s._v("--no-stun  不使用STUN服务")]),s._v(" "),e("li",[s._v("--mobility 支持Mobility ICE（MICE specs）协议")])]),s._v(" "),e("h2",{attrs:{id:"_6、启动服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6、启动服务"}},[s._v("#")]),s._v(" 6、启动服务")]),s._v(" "),e("p",[s._v("新建 turnserver.service")]),s._v(" "),e("p",[e("code",[s._v("vim /usr/lib/systemd/system/turnserver.service")])]),s._v(" "),e("div",{staticClass:"language-conf line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("[Unit]\nDescription=turnserver for p2p\nAfter=network.target\n\n[Service]\nType=forking\nExecStart=/usr/local/bin/turnserver -o -a -f -r sanyer.top -c /usr/local/etc/turnserver.conf\nRestart=always\nRestartSec=5\n\n[Install]\nWantedBy=multi-user.target\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[s._v("命令：")]),s._v(" "),e("ul",[e("li",[s._v("systemctl daemon-reload 重置服务列表")]),s._v(" "),e("li",[s._v("systemctl start turnserver.service 启动服务")]),s._v(" "),e("li",[s._v("systemctl restart turnserver.service 重启服务")]),s._v(" "),e("li",[s._v("systemctl disable turnserver.service 关闭开机自启")]),s._v(" "),e("li",[s._v("systemctl enable turnserver.service 开启开机自启")]),s._v(" "),e("li",[s._v("systemctl status turnserver.service 查看状态")])]),s._v(" "),e("h2",{attrs:{id:"_7、测试访问"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7、测试访问"}},[s._v("#")]),s._v(" 7、测试访问")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v("输入 turn:你的域名:3478、账号、密码")]),s._v(" "),e("p",[s._v("addserver 后点下面的按钮")]),s._v(" "),e("p",[s._v("看到 relay 和你的公网 ip 表示 turn 服务连接成功")]),s._v(" "),e("h2",{attrs:{id:"_7、参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7、参考"}},[s._v("#")]),s._v(" 7、参考")]),s._v(" "),e("p",[s._v("https://www.cnblogs.com/NanKe-Studying/p/16010426.html")]),s._v(" "),e("p",[s._v("https://blog.csdn.net/qq_44938451/article/details/122158975")]),s._v(" "),e("p",[s._v("https://www.cnblogs.com/itshun/p/11605449.html")]),s._v(" "),e("p",[s._v("https://blog.csdn.net/tst116/article/details/62217782")]),s._v(" "),e("p",[s._v("https://juejin.cn/post/6999962039930060837")]),s._v(" "),e("p",[s._v("https://blog.csdn.net/qq_34732729/article/details/107605895")])])}),[],!1,null,null,null);e.default=n.exports}}]);