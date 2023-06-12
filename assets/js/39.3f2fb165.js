(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{320:function(s,a,t){"use strict";t.r(a);var n=t(10),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"使用docker安装gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用docker安装gitlab"}},[s._v("#")]),s._v(" 使用docker安装gitlab")]),s._v(" "),a("h2",{attrs:{id:"_1、安装gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、安装gitlab"}},[s._v("#")]),s._v(" 1、安装gitlab")]),s._v(" "),a("h3",{attrs:{id:"_1-1-创建gitlab数据目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-创建gitlab数据目录"}},[s._v("#")]),s._v(" 1.1 创建gitlab数据目录")]),s._v(" "),a("p",[s._v("首先，需要为gitlab的数据创建一个目录，用来存储gitlab在运行过程中产生的数据。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo mkdir -p /data/gitlab  #/data/gitlab可以修改成合适的目录\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_1-2-搜索gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-搜索gitlab"}},[s._v("#")]),s._v(" 1.2 搜索gitlab")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("docker search gitlab\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_1-3-拉取gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-拉取gitlab"}},[s._v("#")]),s._v(" 1.3 拉取gitlab")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("docker pull gitlab/gitlab-ce\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_1-4-启动gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-启动gitlab"}},[s._v("#")]),s._v(" 1.4 启动gitlab")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("docker run -d -p 8099:80 -p 222:22 --name gitlabs --restart always -v /data/gitlab/etc:/etc/gitlab -v /data/gitlab/log:/var/log/gitlab -v /data/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("参数说明：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("-i  以交互模式运行容器，通常与 -t 同时使用命令解释：\n\n-d  后台运行容器，并返回容器ID\n\n-p 8099:80  将容器内80端口映射至宿主机9980端口，这是访问gitlab的端口\n\n-p 222:22  将容器内22端口映射至宿主机222端口，这是访问ssh的端口\n\n-v ./gitlab/etc:/etc/gitlab  将容器/etc/gitlab目录挂载到宿主机./gitlab/etc目录下，若宿主机内此目录不存在将会自动创建，其他两个挂载同这个一样\n\n--restart always  容器自启动\n\n--privileged=true  让容器获取宿主机root权限\n\n--name gitlab-test  设置容器名称为gitlab\n\ngitlab/gitlab-ce  镜像的名称，这里也可以写镜像ID\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])]),a("h2",{attrs:{id:"_2、配置gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、配置gitlab"}},[s._v("#")]),s._v(" 2、配置gitlab")]),s._v(" "),a("h3",{attrs:{id:"_2-1-修改配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-修改配置文件"}},[s._v("#")]),s._v(" 2.1 修改配置文件")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("vim /data/gitlab/etc/gitlab.rb\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("或者进入容器再修改：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo docker exec -it gitlabs /bin/bash\nvim /etc/gitlab/gitlab.rb\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("external_url 'http://服务器ip:端口/'\ngitlab_rails['gitlab_ssh_host'] = '服务器ip'\ngitlab_rails['gitlab_shell_ssh_port'] = 222\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("若不配置则默认 80 端口 和 22 端口(ssh)，本人使用了端口映射所以默认不配置，只需要服务器开放8099和222端口。")]),s._v(" "),a("p",[s._v("改完配置后需要重载配置")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重载配置")]),s._v("\ngitlab-ctl reconfigure\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启容器")]),s._v("\ngitlab-ctl restart\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 停止")]),s._v("\ngitlab-ctl stop\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\ngitlab-ctl start\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 状态")]),s._v("\ngitlab-ctl status\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 退出")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("h3",{attrs:{id:"_2-2-修改密码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-修改密码"}},[s._v("#")]),s._v(" 2.2 修改密码")]),s._v(" "),a("p",[s._v("查看初始密码：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("vim /data/gitlab/etc/initial_root_password\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("或者进入容器查看：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo docker exec -it gitlabs /bin/bash\nvim /etc/gitlab/initial_root_password\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("进入gitlab网站，使用 root 账号和初始密码登录，然后再修改密码")]),s._v(" "),a("p",[s._v("第二种办法：")]),s._v(" "),a("p",[s._v("（本人使用该方法未通过，在执行 "),a("code",[s._v("gitlab-rails console -e production")]),s._v(" 或者 "),a("code",[s._v("gitlab-rails console")]),s._v(" 都直接卡死在页面上）")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("# 进入容器内部\ndocker exec -it gitlab /bin/bash\n \n# 进入控制台\ngitlab-rails console -e production\n \n# 查询id为1的用户，id为1的用户是超级管理员\nuser = User.where(id:1).first\n# 修改密码为root1AQ@\nuser.password='root1AQ@'\n# 保存\nuser.save!\n# 退出\nexit\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("h2",{attrs:{id:"_3、设置邮箱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、设置邮箱"}},[s._v("#")]),s._v(" 3、设置邮箱")]),s._v(" "),a("div",{staticClass:"language-conf line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("gitlab_rails['smtp_enable'] = true\ngitlab_rails['smtp_address'] = \"smtp.qq.com\"\ngitlab_rails['smtp_port'] = 465\ngitlab_rails['smtp_user_name'] = \"948785997@qq.com\"\ngitlab_rails['smtp_password'] = \"hlldwcjoqscfbeeb\"\ngitlab_rails['smtp_authentication'] = \"login\"\ngitlab_rails['smtp_enable_starttls_auto'] = true\ngitlab_rails['smtp_tls'] = true\ngitlab_rails['gitlab_email_from'] = '948785997@qq.com'\ngitlab_rails['smtp_domain'] = \"qq.com\"\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("h2",{attrs:{id:"_4、其他命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、其他命令"}},[s._v("#")]),s._v(" 4、其他命令")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看已运行docket")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看所有已安装docket")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-a")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-q")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" restart gitlab\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" gitlab\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);