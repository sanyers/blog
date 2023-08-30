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

`sudo -u www-data php ./occ files:scan --all`