# c#获取当前目录

```c#
// 获取当前进程的完整路径，包含文件名(进程名)。
string str = this.GetType().Assembly.Location;

// 获取新的 Process 组件并将其与当前活动的进程关联的主模块的完整路径，包含文件名(进程名)。
string str = System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName;

// 获取启动了应用程序的可执行文件的路径，包括可执行文件的名称。
string str = System.Windows.Forms.Application.ExecutablePath;

// 获取和设置当前目录（即该进程从中启动的目录）的完全限定路径。
string str = System.Environment.CurrentDirectory;

// 获取当前 Thread 的当前应用程序域的基目录，它由程序集冲突解决程序用来探测程序集。
string str = System.AppDomain.CurrentDomain.BaseDirectory;

// 获取和设置包含该应用程序的目录的名称。
string str = System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase;

// 获取启动了应用程序的可执行文件的路径，不包括可执行文件的名称。
string str = System.Windows.Forms.Application.StartupPath;

// 获取应用程序的当前工作目录(不可靠)。
string str = System.IO.Directory.GetCurrentDirectory();
```
