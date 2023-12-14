(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{371:function(s,a,n){"use strict";n.r(a);var t=n(10),e=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"pm2-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pm2-命令"}},[s._v("#")]),s._v(" pm2 命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" pm2 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-g")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-s")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#全局安装")]),s._v("\n\npm2 start xxx                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动服务器")]),s._v("\n\npm2 start xxx "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--watch")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动服务器(每当代码改变时即会自动重启)")]),s._v("\n\npm2 start app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动服务器(同时运行四个进程),正确的进程数目依赖于Cpu的核心数目")]),s._v("\n\npm2 start app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" max        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#根据有效CPU数目启动最大进程数目,集群模式(负载均衡)")]),s._v("\n\npm2 start "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"smartoffice"')]),s._v(" -- run start "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#nuxt部署（适用于linux）")]),s._v("\n\npm2 start ./dist/app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" xxx-name  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动并设置应用名字")]),s._v("\n\npm2 scale "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("app name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#增加或减少工作线程的数量，对集群进行扩展")]),s._v("\n\npm2 start app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" my-api "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#命名进程")]),s._v("\n\npm2 list                       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看运行状态")]),s._v("\n\npm2 logs "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("app-name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看日志")]),s._v("\n\npm2 restart "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("app_name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("all"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#重启应用")]),s._v("\n\npm2 stop "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("app_name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("all"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#停止应用")]),s._v("\n\npm2 delete "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("app_name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("all"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#杀死进程")]),s._v("\n\npm2 reload all                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 0 秒停机重载进程 (用于 NETWORKED 进程)")]),s._v("\n\npm2 show "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("app-name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示应用程序的所有信息")]),s._v("\n\npm2 monit                      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#监视每个node进程的CPU和内存的使用情况")]),s._v("\n\npm2 startup                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#产生 init 脚本 保持进程活着")]),s._v("\n\npm2 web                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#运行健壮的 webapi(http://localhost:9615)")]),s._v("\n\npm2 start script.sh            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动 bash 脚本")]),s._v("\n\npm2 save                       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#保存 pm2 list 列表")]),s._v("\n\npm2 resurrect                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#恢复 pm2 lsit 列表")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br")])]),a("p",[s._v("root用户：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动项目")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" pm2 start ./dist/app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" custom_server_name\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 保存启动项目列表，保存在 /root/.pm2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" pm2 save\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成开机自启动服务，自动生成服务名为 pm2-root.service")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" pm2 startup\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置开机自动启动")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" pm2-root\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除自动启动服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" pm2 unstartup systemd\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("普通用户：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动项目")]),s._v("\npm2 start ./dist/app.js "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" custom_server_name\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 保存启动项目列表，保存在 /home/sanyer/.pm2")]),s._v("\npm2 save\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成开机自启动服务")]),s._v("\npm2 startup\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("env")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),s._v(":/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-u")]),s._v(" sanyer "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--hp")]),s._v(" /home/sanyer\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置开机自动启动")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" pm2-sanyer\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);