# nextcloud常用指令

## 1、设置目录权限

`sudo chown -R www-data: /home/html/nextcloud`

## 2、查看 nextcloud 状态

```sh
sudo chmod +x occ
sudo -u www-data ./occ status
```

## 3、设置上传文件限制

`sudo -u www-data php ./occ config:app:set files max_chunk_size --value 20971520`

## 4、扫描用户文件并更新（数据迁移）

```bash
# 格式
sudo -u www-data php ./occ files:scan [-all] [user_id] [--path]

# 更新所有用户的所有文件
sudo -u www-data php ./occ files:scan --all

# 更新指定用户ID
sudo -u www-data php ./occ files:scan sanyer

# 更新指定用户的指定目录
sudo -u www-data php ./occ files:scan --path="/sanyer/files/Music"
```

## 5、外部存储设置

1、启用插件 `apps` -> `External storage support`

2、设置Nextcloud所有用户都能使用外部存储

此时进入外部存储会提示 “smbclient” 未安装。无法挂载 "SMB/CIFS", "使用 OC 登录的 SMB/CIFS"，虽然不一定用到可以安装一下包解决这个提示

```bash
docker exec -it nextcloud bash
apt-get update
apt install smbclient libsmbclient-dev
pecl install smbclient
docker-php-ext-enable smbclient

apt-get install nfs-kernel-server cifs-utils nfs-common
```

用于管理外部存储的命令：

```bash
files_external
 files_external:applicable  # 管理装载的适用用户和组
 files_external:backends    # 显示可用的身份验证和存储后端
 files_external:config      # 管理装载的后端配置
 files_external:create      # 创建新的装载配置
 files_external:delete      # 删除外部装载
 files_external:export      # 导出装载配置
 files_external:import      # 导入装载配置
 files_external:list        # 列出配置的装载
 files_external:option      # 管理装载的装载选项
 files_external:verify      # 验证装载配置
 files_external:notify      # 侦听已配置外部装载的活动更新通知

# 查看命令的帮助
sudo -u www-data php ./occ files_external:create -h
```
