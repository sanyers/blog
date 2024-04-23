# adb 安装：

## 1、下载地址：
Windows版本：`https://dl.google.com/android/repository/platform-tools-latest-windows.zip`

Mac版本：`https://dl.google.com/android/repository/platform-tools-latest-windows.zip`

Linux版本：`https://dl.google.com/android/repository/platform-tools-latest-linux.zip`

## 2、添加环境变量

`windows+r` => `sysdm.cpl` => 高级 => 环境变量 => 系统变量 => path

## 3、校验

```sh
$ adb --version
Android Debug Bridge version 1.0.41
Version 31.0.3-7562133
Installed as D:\adb-tools\adb.exe
```

## 4、查询连接设备

```bash
adb devices

# 如果设备未连接可尝试重启adb服务
adb kill-server
adb start-server
# 尝试重连后，观察手机是否有弹出允许调试的弹框， 点击允许。再使用查询连接设备的指令，大概率可以看到设备已成功连接。
```

## 5、安装应用

```bash
adb install D:\test.apk
# 注意，如果文件路径中有空格的情况下，需要给路径加上引号
adb install "D:\test file\test.apk"

# 覆盖安装
adb install -r D:\test.apk

# 其他选项
-r: 替换现有应用
-t: 允许安装测试包
-d: 允许版本代码降级（仅限可调试包）
-p: 部分应用安装（仅限install-multiple）
-g: 授予所有运行时权限
–abi ABI: 覆盖平台的默认ABI
–instant: 使应用作为临时安装应用安装
–no-streaming: 始终将APK推送到设备并作为单独的步骤调用包管理器
–streaming: 强制将APK直接流式传输到包管理器
–fastdeploy: 使用快速部署
–no-fastdeploy: 防止使用快速部署
–force-agent: 在使用快速部署时强制更新部署代理
–date-check-agent: 当本地版本较新且使用快速部署时更新部署代理
–version-check-agent: 当本地版本具有不同的版本代码且使用快速部署时更新部署代理
```

## 6、卸载应用

```bash
adb uninstall app_key # 卸载指令，app_key为需要删除的目标包名
```

参考：https://blog.csdn.net/weixin_40883833/article/details/132266091