# exe注册为windows服务

管理员权限打开 cmd

```bash
# 安装服务
%SystemRoot%\Microsoft.NET\Framework65\v4.0.30319\InstallUtil.exe D:\TestService.exe

# 卸载
%SystemRoot%\Microsoft.NET\Framework65\v4.0.30319\InstallUtil.exe /u D:\TestService.exe
```