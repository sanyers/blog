# windows 挂载 WebDAV

## 1、挂载

1. 开始 -> 运行 -> services.msc
2. 启动 WebClient 服务
3. 打开资源管理器 -> 选择计算机选项卡 -> 打开映射网络驱动器
4. 在文件夹输入框输入 WebDAV 地址 -> 点击完成 ** -> 输入账号**、密码即可

## 2、解决添加 http 地址时提示Windows无法访问（文件夹无效，找不到网络名等）的错误

Windows 的 WebDAV 挂载默认只支持 https 地址，需要修改注册表打开 http 支持

- 修改路径：`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`
- 修改键：`BasicAuthLevel`，修改值为 `2`

## 3、解决：文件操作时报错：0x800700DF：文件大小超出允许的限制，无法保存

修改注册表的文件大小限制

- 修改路径：`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`
- 修改键：`FileSizeLimitInBytes`，修改值为：`0xffffffff`（十六进制）

## 4、使用批处理修改以上注册表项

保存为 .bat 或 .cmd 后缀，以管理员身份运行

```bash
@echo off
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters /v BasicAuthLevel /t REG_DWORD /d 2 /f
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters /v FileSizeLimitInBytes /t REG_DWORD /d 0xffffffff /f
net stop webClient
net start webClient
```