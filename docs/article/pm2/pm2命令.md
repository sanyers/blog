# pm2 命令

```sh
npm install pm2 -g -s          #全局安装

pm2 start xxx                  #启动服务器

pm2 start xxx --watch          #启动服务器(每当代码改变时即会自动重启)

pm2 start app.js -i 4          #启动服务器(同时运行四个进程),正确的进程数目依赖于Cpu的核心数目

pm2 start app.js -i max        #根据有效CPU数目启动最大进程数目,集群模式(负载均衡)

pm2 start npm --name "smartoffice" -- run start #nuxt部署（适用于linux）

pm2 start ./dist/app.js --name xxx-name  # 启动并设置应用名字

pm2 scale <app name> <n>       #增加或减少工作线程的数量，对集群进行扩展

pm2 start app.js --name my-api #命名进程

pm2 list                       #查看运行状态

pm2 logs [app-name]            #查看日志

pm2 restart <id|app_name|all>  #重启应用

pm2 stop <id|app_name|all>     #停止应用

pm2 delete <id|app_name|all>   #杀死进程

pm2 reload all                 # 0 秒停机重载进程 (用于 NETWORKED 进程)

pm2 show [app-name]            #显示应用程序的所有信息

pm2 monit                      #监视每个node进程的CPU和内存的使用情况

pm2 startup                    #产生 init 脚本 保持进程活着

pm2 web                        #运行健壮的 webapi(http://localhost:9615)

pm2 start script.sh            #启动 bash 脚本

pm2 save                       #保存 pm2 list 列表

pm2 resurrect                  #恢复 pm2 lsit 列表
```

设置开机自动启动

```sh
# 启动项目
pm2 start ./dist/app.js --name custom_server_name

# 保存启动项目列表（该命令会把当前项目列表保存在root目录，非root用户将导致开机自启动失败）
pm2 save

# 生成开机自启动服务
pm2 startup

# 设置开机自动启动
systemctl enable pm2-root
```