(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{324:function(p,t,a){"use strict";a.r(t);var _=a(10),s=Object(_.a)({},(function(){var p=this,t=p._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":p.$parent.slotKey}},[t("h1",{attrs:{id:"pm2-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pm2-命令"}},[p._v("#")]),p._v(" pm2 命令")]),p._v(" "),t("p",[p._v("npm install pm2 -g -s          #全局安装")]),p._v(" "),t("p",[p._v("pm2 start xxx                  #启动服务器")]),p._v(" "),t("p",[p._v("pm2 start xxx --watch          #启动服务器(每当代码改变时即会自动重启)")]),p._v(" "),t("p",[p._v("pm2 start app.js -i 4          #启动服务器(同时运行四个进程),正确的进程数目依赖于Cpu的核心数目")]),p._v(" "),t("p",[p._v("pm2 start app.js -i max        #根据有效CPU数目启动最大进程数目,集群模式(负载均衡)")]),p._v(" "),t("p",[p._v('pm2 start npm --name "smartoffice" -- run start #nuxt部署（适用于linux）')]),p._v(" "),t("p",[p._v("pm2 scale "),t("app",{attrs:{name:""}},[t("n",[p._v("       #增加或减少工作线程的数量，对集群进行扩展")])],1)],1),p._v(" "),t("p",[p._v("pm2 start app.js --name my-api #命名进程")]),p._v(" "),t("p",[p._v("pm2 list                       #查看运行状态")]),p._v(" "),t("p",[p._v("pm2 logs [app-name]            #查看日志")]),p._v(" "),t("p",[p._v("pm2 restart <id|app_name|all>  #重启应用")]),p._v(" "),t("p",[p._v("pm2 stop <id|app_name|all>     #停止应用")]),p._v(" "),t("p",[p._v("pm2 delete <id|app_name|all>   #杀死进程")]),p._v(" "),t("p",[p._v("pm2 reload all                 # 0 秒停机重载进程 (用于 NETWORKED 进程)")]),p._v(" "),t("p",[p._v("pm2 show [app-name]            #显示应用程序的所有信息")]),p._v(" "),t("p",[p._v("pm2 monit                      #监视每个node进程的CPU和内存的使用情况")]),p._v(" "),t("p",[p._v("pm2 startup                    #产生 init 脚本 保持进程活着")]),p._v(" "),t("p",[p._v("pm2 web                        #运行健壮的 webapi(http://localhost:9615)")]),p._v(" "),t("p",[p._v("pm2 start script.sh            #启动 bash 脚本")]),p._v(" "),t("p",[p._v("pm2 save                       #保存 pm2 list 列表")]),p._v(" "),t("p",[p._v("pm2 resurrect                  #恢复 pm2 lsit 列表")])])}),[],!1,null,null,null);t.default=s.exports}}]);