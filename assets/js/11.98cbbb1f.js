(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{295:function(s,a,t){"use strict";t.r(a);var n=t(10),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"adb-安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adb-安装"}},[s._v("#")]),s._v(" adb 安装：")]),s._v(" "),a("h2",{attrs:{id:"_1、下载地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、下载地址"}},[s._v("#")]),s._v(" 1、下载地址：")]),s._v(" "),a("p",[s._v("Windows版本："),a("code",[s._v("https://dl.google.com/android/repository/platform-tools-latest-windows.zip")])]),s._v(" "),a("p",[s._v("Mac版本："),a("code",[s._v("https://dl.google.com/android/repository/platform-tools-latest-windows.zip")])]),s._v(" "),a("p",[s._v("Linux版本："),a("code",[s._v("https://dl.google.com/android/repository/platform-tools-latest-linux.zip")])]),s._v(" "),a("h2",{attrs:{id:"_2、添加环境变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、添加环境变量"}},[s._v("#")]),s._v(" 2、添加环境变量")]),s._v(" "),a("p",[a("code",[s._v("windows+r")]),s._v(" => "),a("code",[s._v("sysdm.cpl")]),s._v(" => 高级 => 环境变量 => 系统变量 => path")]),s._v(" "),a("h2",{attrs:{id:"_3、校验"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、校验"}},[s._v("#")]),s._v(" 3、校验")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ adb "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--version")]),s._v("\nAndroid Debug Bridge version "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),s._v(".41\nVersion "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("31.0")]),s._v(".3-7562133\nInstalled as D:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("adb-tools"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("adb.exe\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"_4、查询连接设备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、查询连接设备"}},[s._v("#")]),s._v(" 4、查询连接设备")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("adb devices\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果设备未连接可尝试重启adb服务")]),s._v("\nadb kill-server\nadb start-server\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 尝试重连后，观察手机是否有弹出允许调试的弹框， 点击允许。再使用查询连接设备的指令，大概率可以看到设备已成功连接。")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"_5、安装应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、安装应用"}},[s._v("#")]),s._v(" 5、安装应用")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("adb "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" D:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("test.apk\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 注意，如果文件路径中有空格的情况下，需要给路径加上引号")]),s._v("\nadb "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"D:'),a("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v("est file"),a("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v('est.apk"')]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 覆盖安装")]),s._v("\nadb "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" D:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("test.apk\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 其他选项")]),s._v("\n-r: 替换现有应用\n-t: 允许安装测试包\n-d: 允许版本代码降级（仅限可调试包）\n-p: 部分应用安装（仅限install-multiple）\n-g: 授予所有运行时权限\n–abi ABI: 覆盖平台的默认ABI\n–instant: 使应用作为临时安装应用安装\n–no-streaming: 始终将APK推送到设备并作为单独的步骤调用包管理器\n–streaming: 强制将APK直接流式传输到包管理器\n–fastdeploy: 使用快速部署\n–no-fastdeploy: 防止使用快速部署\n–force-agent: 在使用快速部署时强制更新部署代理\n–date-check-agent: 当本地版本较新且使用快速部署时更新部署代理\n–version-check-agent: 当本地版本具有不同的版本代码且使用快速部署时更新部署代理\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br")])]),a("h2",{attrs:{id:"_6、卸载应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6、卸载应用"}},[s._v("#")]),s._v(" 6、卸载应用")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("adb uninstall app_key "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 卸载指令，app_key为需要删除的目标包名")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("参考：https://blog.csdn.net/weixin_40883833/article/details/132266091")])])}),[],!1,null,null,null);a.default=e.exports}}]);