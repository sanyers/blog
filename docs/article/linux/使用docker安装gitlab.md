# 使用docker安装gitlab

## 1、安装gitlab

### 1.1 创建gitlab数据目录

首先，需要为gitlab的数据创建一个目录，用来存储gitlab在运行过程中产生的数据。

```
sudo mkdir -p /data/gitlab  #/data/gitlab可以修改成合适的目录
```

### 1.2 搜索gitlab

```
docker search gitlab
```

### 1.3 拉取gitlab

```
docker pull gitlab/gitlab-ce
```

### 1.4 启动gitlab

```
docker run -d -p 8099:80 -p 222:22 --name gitlabs --restart always -v /data/gitlab/etc:/etc/gitlab -v /data/gitlab/log:/var/log/gitlab -v /data/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
```

参数说明：

```
-i  以交互模式运行容器，通常与 -t 同时使用命令解释：

-d  后台运行容器，并返回容器ID

-p 8099:80  将容器内80端口映射至宿主机9980端口，这是访问gitlab的端口

-p 222:22  将容器内22端口映射至宿主机222端口，这是访问ssh的端口

-v ./gitlab/etc:/etc/gitlab  将容器/etc/gitlab目录挂载到宿主机./gitlab/etc目录下，若宿主机内此目录不存在将会自动创建，其他两个挂载同这个一样

--restart always  容器自启动

--privileged=true  让容器获取宿主机root权限

--name gitlab-test  设置容器名称为gitlab

gitlab/gitlab-ce  镜像的名称，这里也可以写镜像ID
```

## 2、配置gitlab

### 2.1 修改配置文件

```
vim /data/gitlab/etc/gitlab.rb
```

或者进入容器再修改：

```
sudo docker exec -it gitlabs /bin/bash
vim /etc/gitlab/gitlab.rb
```

```
external_url 'http://服务器ip:端口/'
gitlab_rails['gitlab_ssh_host'] = '服务器ip'
gitlab_rails['gitlab_shell_ssh_port'] = 222
```

若不配置则默认 80 端口 和 22 端口(ssh)，本人使用了端口映射所以默认不配置，只需要服务器开放8099和222端口。

改完配置后需要重载配置

```sh
# 重载配置
gitlab-ctl reconfigure
# 重启容器
gitlab-ctl restart
# 停止
gitlab-ctl stop
# 启动
gitlab-ctl start
# 状态
gitlab-ctl status
# 退出
exit
```

### 2.2 修改密码

查看初始密码：

```
vim /data/gitlab/etc/initial_root_password
```

或者进入容器查看：

```
sudo docker exec -it gitlabs /bin/bash
vim /etc/gitlab/initial_root_password
```

进入gitlab网站，使用 root 账号和初始密码登录，然后再修改密码

第二种办法：

（本人使用该方法未通过，在执行 `gitlab-rails console -e production` 或者 `gitlab-rails console` 都直接卡死在页面上）

```
# 进入容器内部
docker exec -it gitlab /bin/bash
 
# 进入控制台
gitlab-rails console -e production
 
# 查询id为1的用户，id为1的用户是超级管理员
user = User.where(id:1).first
# 修改密码为root1AQ@
user.password='root1AQ@'
# 保存
user.save!
# 退出
exit
```

## 3、设置邮箱

```conf
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "xxx@qq.com"
gitlab_rails['smtp_password'] = "hlldwcjoqsc******"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_from'] = 'xxx@qq.com'
gitlab_rails['smtp_domain'] = "qq.com"
```

## 4、其他命令

```sh
# 查看已运行docker
docker ps

# 查看所有已安装docker
docker ps -a -q
docker ps -a

# 重启
sudo docker restart gitlab

# 删除
docker rm -f gitlab
```

## 5、轻量化运行

```
# 关闭容器仓库功能
gitlab_rails['gitlab_default_projects_features_container_registry'] = false
gitlab_rails['registry_enabled'] = false
registry['enable'] = false
registry_nginx['enable'] = false

# 包仓库、依赖管理
gitlab_rails['packages_enabled'] = false
gitlab_rails['dependency_proxy_enabled'] = false

# GitLab Pages
gitlab_pages['enable'] = false
pages_nginx['enable'] = false

# 关闭监控和性能基准相关功能
prometheus_monitoring['enable'] = false
alertmanager['enable'] = false
node_exporter['enable'] = false
redis_exporter['enable'] = false
postgres_exporter['enable'] = false
pgbouncer_exporter['enable'] = false
gitlab_exporter['enable'] = false
grafana['enable'] = false
sidekiq['metrics_enabled'] = false

# 针对应用的性能分析和上报
gitlab_rails['usage_ping_enabled'] = false
gitlab_rails['sentry_enabled'] = false
grafana['reporting_enabled'] = false

# GitLab KAS
gitlab_kas['enable'] = false
gitlab_rails['gitlab_kas_enabled'] = false
# Terraform
gitlab_rails['terraform_state_enabled'] = false
# Kerberos 文档说EE only，但是默认值为 true
gitlab_rails['kerberos_enabled'] = false
# Sentinel
sentinel['enable'] = false
# Mattermost
mattermost['enable'] = false
mattermost_nginx['enable'] = false

# 禁用 PUMA 集群模式
puma['worker_processes'] = 0
puma['min_threads'] = 1
puma['max_threads'] = 2

# 降低后台守护进程并发数
sidekiq['max_concurrency'] = 5

# 关闭电子邮件相关功能
gitlab_rails['smtp_enable'] = false
gitlab_rails['gitlab_email_enabled'] = false
gitlab_rails['incoming_email_enabled'] = false

# 关闭ci
gitlab_ci['gitlab_ci_all_broken_builds'] = false
gitlab_ci['gitlab_ci_add_pusher'] = false
```

```
gitlab-ctl start #启动全部服务
gitlab-ctl restart#重启全部服务
gitlab-ctl stop #停止全部服务
gitlab-ctl restart nginx #重启单个服务，如重启nginx
gitlab-ctl status #查看服务状态
gitlab-ctl reconfigure #使配置文件生效
gitlab-ctl show-config #验证配置文件
gitlab-ctl uninstall #删除gitlab（保留数据）
gitlab-ctl cleanse #删除所有数据，从新开始
gitlab-ctl tail <service name>查看服务的日志
gitlab-ctl tail nginx  #如查看gitlab下nginx日志
gitlab-rails console  #进入控制台
```

## 6、参考

https://zhuanlan.zhihu.com/p/413217715