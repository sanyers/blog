# Git 操作

## 1、常用命令

```sh
$ git init   # 初始化一个Git仓库

$ git add .  # 将所有修改添加到暂存区

$ git commit -m "comment"  # 将暂存区的修改提交到本地仓库 并填写注释信息

$ git clone http://123%40qq.com:xxx@git.xxx.com/xxx  # http:#邮箱(或用户名):密码@仓库 下载一个项目和它的整个代码历史

$ git push origin master # 将本地的 master 分支推送到远程的 master 分支中

$ git log  # 查看 git 的 commit 信息，每次提交的信息包括注释在内，从最新提交到最久提交

$ git log --pretty=oneline  # 将commit 信息简化成一行显示

$ git status  # 查看仓库的状态

$ git branch [-r]  # 列出所有本地分支，-r 列出所有远程分支

$ git branch [branch-name]  # 新建一个分支，但依然停留在当前分支

$ git checkout -b [branch]  # 新建一个分支，并切换到该分支

$ git checkout [branch-name]  # 切换到指定分支，并更新工作区

$ git branch -d [branch-name]  # 删除分支

$ git push origin --delete [branch-name]  # 删除远程分支

$ git fetch [remote]  # 下载远程仓库的所有变动

$ git remote add [shortname] [url]  # 增加一个新的远程仓库，并命名

$ git pull [remote] [branch]  # 取回远程仓库的变化，并与本地分支合并

$ git checkout [file]  # 恢复暂存区的指定文件到工作区

$ git reset [file]  # 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
```

## 2、其他命令

### 2.1 配置

Git的设置文件为```.gitconfig```，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

```sh
$ git config --list  # 显示当前的 Git 配置

$ git config -e [--global]  # 编辑 Git 配置文件

$ git config [--global] user.name "[name]"  # 设置提交代码时的用户名

$ git config user.name "xxx"

$ git config [--global] user.email "[email address]"  # 设置提交代码时的用户邮箱

$ git config user.email "xxx"

$ git config --global core.autocrlf false # 取消行尾序列自动转换（CRLF或者LF）
```

### 2.2 增加/删除文件

```sh
$ git add *  # Ant风格添加修改(忽略 .gitignore 把任何文件都加入)

$ git add *Controller  # 将以 Controller 结尾的文件的所有修改添加到暂存区

$ git add Hello*   # 将所有以 Hello 开头的文件的修改添加到暂存区 例如:HelloWorld.txt,Hello.java,HelloGit.txt ...

$ git add Hello?   # 将以 Hello 开头且后面只有一位的文件的修改提交到暂存区 例如:Hello1.txt,HelloA.java 如果是HelloGit.txt或者Hello.java是不会被添加的

$ git diff file  # 在file被修改了还未提交的时候查看修改的部分(和版本库中最新版本的不同 diff == difference 不同)

$ git rm [file1] [file2] ...  # 删除工作区文件，并且将这次删除放入暂存区

$ git rm --cached [file]  # 停止追踪指定文件，但该文件会保留在工作区

$ git mv [file-original] [file-renamed]  # 改名文件，并且将这个改名放入暂存区
```

### 2.3 代码提交

```sh
$ git commit -a  # 提交工作区自上次 commit 之后的变化，直接到仓库区

$ git commit -v  # 提交时显示所有 diff 信息

$ git commit --amend -m [message]  # 使用一次新的 commit，替代上一次提交，如果代码没有任何新变化，则用来改写上一次 commit 的提交信息

$ git commit --amend [file1] [file2] ...  # 重做上一次 commit，并包括指定文件的新变化

$ git commit --amend --author "name <邮箱@163.com>" # 修改提交的作者邮箱
```

### 2.4 分支

```sh
$ git branch -a  # 列出所有本地分支和远程分支

$ git branch [branch] [commit]  # 新建一个分支，指向指定commit

$ git branch --track [branch] [remote-branch]  # 新建一个分支，与指定的远程分支建立追踪关系

$ git checkout -  # 切换到上一个分支

$ git merge [branch]  # 合并指定分支到当前分支

$ git cherry-pick [commit]  # 选择一个commit，合并进当前分支

$ git branch -d [branch] # 删除本地分支
```

### 2.5 标签

```sh
$ git tag  # 列出所有tag

$ git tag [tag]  # 新建一个 tag 在当前 commit

$ git tag [tag] [commit]  # 新建一个 tag 在指定 commit

$ git tag -d [tag]  # 删除本地 tag

$ git push origin :refs/tags/[tagName]  # 删除远程 tag

$ git show [tag]  # 查看 tag 信息

$ git push [remote] [tag]  # 提交指定 tag

$ git push [remote] --tags  # 提交所有 tag

$ git checkout -b [branch] [tag]  # 新建一个分支，指向某个 tag
```

### 2.6 查看信息

```sh
$ git log --stat  # 显示 commit 历史，以及每次 commit 发生变更的文件

$ git log -S [keyword]  # 搜索提交历史，根据关键词

$ git log [tag] HEAD --pretty=format:%s  # 显示某个 commit 之后的所有变动，每个 commit 占据一行

$ git log --follow [file]  # 显示某个文件的版本历史，包括文件改名

$ git log -p [file]  # 显示指定文件相关的每一次 diff

$ git log -5 --pretty --oneline  # 显示过去5次提交

$ git shortlog -sn  # 显示所有提交过的用户，按提交次数排序

$ git blame [file]  # 显示指定文件是什么人在什么时间修改过

$ git diff  # 显示暂存区和工作区的差异

$ git diff --cached [file]  # 显示暂存区和上一个 commit 的差异

$ git diff HEAD  # 显示工作区与当前分支最新 commit 之间的差异

$ git diff [first-branch]...[second-branch]  # 显示两次提交之间的差异

$ git diff --shortstat "@{0 day ago}"  # 显示今天你写了多少行代码

$ git show [commit]  # 显示某次提交的元数据和内容变化

$ git show --name-only [commit]  # 显示某次提交发生变化的文件

$ git reflog  # 显示当前分支的最近几次提交
```

### 2.7 远程同步

```sh
$ git remote -v  # 显示所有远程仓库

$ git push [remote] --force  # 强行推送当前分支到远程仓库，即使有冲突

$ git push [remote] --all  # 推送所有分支到远程仓库
```


### 2.8 撤销

```sh
$ git checkout [commit] [file]  # 恢复某个 commit 的指定文件到暂存区和工作区

$ git checkout -- [file] # 放弃修改当前文件

$ git checkout . # 恢复暂存区的所有文件到工作区

$ git reset --hard  # 重置暂存区与工作区，与上一次 commit 保持一致

$ git reset [commit]  # 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变

$ git reset --hard [commit]  # 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

$ git reset --keep [commit]  # 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变

$ git revert [commit]  # 后者的所有变化都将被前者抵消，并且应用到当前分支

$ git stash  # 暂时将未提交的变化移除，稍后再移入

$ git archive  # 生成一个可供发布的压缩包
```

### 2.9 跳过代码检查

使用 ``` --no-verify ``` 命令可以跳过 ```pre-commit``` 钩子检查

```sh
$ git commit -m 'xxx' --no-verify
$ git push origin 'xxx' --no-verify
```

## 3、配置公钥

```sh
ssh-keygen -t ed25519 -C "xxx@xxx.com"

ssh-keygen -t rsa -C "xxx@xxx.com"

# 设置公钥名称
ssh-keygen -t ed25519 -f ./mygit -C "xxx@xxx.com"
```

目录在 `C:\Users\用户\.ssh\id_ed25519.pub`

自定义公钥名称，可能发生 Permission denied (publickey) 错误，可以修改 `C:\Program Files\Git\etc\ssh\ssh_config`

```
Host *
    IdentityFile ~/.ssh/id_rsa
    IdentityFile ~/.ssh/id_ed25519
    IdentityFile ~/.ssh/mygit
```

## 4、ubuntu 安装 git

```sh
sudo apt update
sudo apt install git

git --version
```

## 5、安装 git-lfs

```sh
# 加仓库源 
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh sudo bash
# 安装lfs 
apt-get install git-lfs
# Install Git LFS configuration.
git lfs install
```

## 6、设置代理

### 6.1 设置 git 代理

设置代理 http/https 协议(git clone 命令)

```bash
git config http.proxy http://127.0.0.1:1080
git config https.proxy http://127.0.0.1:1080
```

设置命令后，会在项目 `./.git/config` 下加上对应代理

### 6.2 设置 ssh 代理

配置 `~/.ssh/config` 若没有 config 则创建一个

```
Host github.com
  ProxyCommand connect -H 127.0.0.1:1080 %h %p
  HostName %h
  Port 22
  User git
  IdentityFile  ~/.ssh/id_rsa 
  IdentitiesOnly yes
```

### 6.3 设置 cmd 代理

```bash
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
```

## 7、将代码同时提交到 gitlab 和 github


### 7.1 配置公钥

假设 gitlab 账号邮箱为 a@test.com，github 账号邮箱为 b@test.com

则创建两个公钥：

```bash
ssh-keygen -t ed25519 -f ./gitlab -C "a@test.com"
ssh-keygen -t ed25519 -f ./github -C "b@test.com"
```

将两个公钥生成的key分别添加到 gitlab 和 github ssh key

### 7.2 提交代码

新建一个代码库 mytest（若已有则省略这一步），提交代码到 gitlab，在生成的 git 配置文件中修改（一般在项目根目录下的`.git/config`）

```conf
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = git@gitlab.sanyer.top/mytest.git # gitlab 地址
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[remote "github"] # 新添加 github 提交地址
	url = git@github.com:sanyers/mytest.git
	fetch = +refs/heads/*:refs/remotes/github/*
```

在 github 上创建一个空的代码库 mytest，并提交到 github

```bash
git push github
```

### 7.3 编写提交脚本

> push.bat

```bash
@echo off
git pull
git add .
git commit -m %1
git push
git push github
```

然后每次输入描述，即可同时提交到 gitlab 和 github

```bash
./push.bat testcommit
```