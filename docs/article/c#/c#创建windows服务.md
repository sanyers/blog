# c#创建 windows 服务

工具：vs2022

## 1、创建 Windows Service 项目

在项目模版里搜索“服务”，选择“Windows 服务(.NET Framework)”

<a data-fancybox title="1" href="/blog/img/article/c#/1.jpg"><img :src="$withBase('/img/article/c#/1.jpg')" alt="1"></a>

<a data-fancybox title="2" href="/blog/img/article/c#/2.jpg"><img :src="$withBase('/img/article/c#/2.jpg')" alt="2"></a>

<a data-fancybox title="3" href="/blog/img/article/c#/3.jpg"><img :src="$withBase('/img/article/c#/3.jpg')" alt="3"></a>

## 2、输入项目代码

```c#
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace MonitorService
{
    public partial class ServiceMain : ServiceBase
    {
        public ServiceMain()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            WriteLog("启动");
            Timer timer = new Timer();
            timer.Interval = 60000; // 60 seconds
            timer.Elapsed += new ElapsedEventHandler(this.OnTimer);
            timer.Start();
        }

        protected override void OnStop()
        {
            WriteLog("结束");
        }

        public void OnTimer(object sender, ElapsedEventArgs args)
        {
            StopService("wuauserv"); // 定时关闭更新服务
            StopService("UsoSvc");
        }

        private void WriteLog(string message)
        {
            string path = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
            using (StreamWriter sw = new StreamWriter(path + "Log.txt", true))
            {
                sw.WriteLine(DateTime.Now.ToString("G") + "=====" + message);
            }
        }

        private void StopService(string serviceName)
        {
            using (ServiceController controller =new ServiceController(serviceName))
            {
                if(controller.Status == ServiceControllerStatus.Running)
                {
                    controller.Stop();
                    WriteLog(serviceName+" stop");
                }
            }
        }
    }
}
```

## 3、添加安装程序

编辑 `serviceProcessInstaller1` 属性 `Accout` 为 `LocalService`(本地系统)

编辑 `serviceInstaller1`

## 4、安装服务

```bash
# 安装服务
%SystemRoot%\Microsoft.NET\Framework65\v4.0.30319\InstallUtil.exe D:\TestService.exe

# 卸载
%SystemRoot%\Microsoft.NET\Framework65\v4.0.30319\InstallUtil.exe /u D:\TestService.exe
```