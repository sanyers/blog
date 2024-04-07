# Jetson Xavier NX 刷机

## 1、准备工作

- 一台装有 Ubuntu18.04 或 20.04 的主机（虚拟机也行），剩余空间至少30G，因为后面需要下载 CUDA 等安装包到主机上，空间太小会报警告；
- 从 NVIDIA 官网下载 SDK Manager，下载地址：[SDK Manager | NVIDIA Developer](https://developer.nvidia.com/nvidia-sdk-manager)；
- 注册 NVIDIA Developer 并成为开发者账号，填写注册信息（年龄一栏需要大于18？否则在烧写那里登录不了）
- 一根 usb 数据线连接主机和 jetson；
- 一根杜邦线或短接线；
- jetson 上电开机，并连接一个显示屏；（没有显示屏也可以，需要确定是否进入烧写模式）

## 2、下载并安装SDK

（1）下载

<div class="img-page">
<a data-fancybox title="1" href="/blog/img/article/jetson/1.png"><img :src="$withBase('/img/article/jetson/1.png')" alt="1"></a>
</div>

（2）注册一个开发者账号(有账号直接登录)

<div class="img-page">
<a data-fancybox title="2" href="/blog/img/article/jetson/2.png"><img :src="$withBase('/img/article/jetson/2.png')" alt="2"></a>
</div>

（3）等待下载完成（可在windows下载好之后，将安装包拷贝到Ubuntu系统下进行安装）

<div class="img-page">
<a data-fancybox title="3" href="/blog/img/article/jetson/3.png"><img :src="$withBase('/img/article/jetson/3.png')" alt="3"></a>
</div>

（4）执行安装命令

```bash
sudo apt install ./SDK包的文件名
```

## 3、系统烧录

（1）进入recovery模式

将Jetson Xavier NX的FC REC引脚和GND引脚用杜邦线短接（第二个和第三个引脚）让Jetson Xavier NX进入recovery模式，连接USB到自己的电脑，如下图所示。给Jetson Xavier NX接通电源，开始系统的烧录。

<div class="img-page">
<a data-fancybox title="4" href="/blog/img/article/jetson/4.png"><img :src="$withBase('/img/article/jetson/4.png')" alt="4"></a>
</div>

<div class="img-page">
<a data-fancybox title="5" href="/blog/img/article/jetson/5.png"><img :src="$withBase('/img/article/jetson/5.png')" alt="5"></a>
</div>

（2）打开SDKmanager，选择LOGIN（一定要确保网络畅通）

`./sdkmanager`

（3）点击LOGIN之后会跳转到网页登录，检查网络状态，输入在下载SDK时用来注册会员的邮箱，点击Sign in。

<div class="img-page">
<a data-fancybox title="6" href="/blog/img/article/jetson/6.png"><img :src="$withBase('/img/article/jetson/6.png')" alt="6"></a>
</div>

输入密码，进行登录，新设备第一次登录时，会进行安全验证，注册邮箱会有验证邮件。

（4）登录之后选择自己的边缘设备型号（Jetson Xavier NX），选择Linux版本进行安装。

<div class="img-page">
<a data-fancybox title="7" href="/blog/img/article/jetson/7.png"><img :src="$withBase('/img/article/jetson/7.png')" alt="7"></a>
</div>

不选Host Machine（将Host Machine勾掉，不需要为主机下载NVIDIA资源）

如果不能识别硬件（如下）：

<div class="img-page">
<a data-fancybox title="8" href="/blog/img/article/jetson/8.png"><img :src="$withBase('/img/article/jetson/8.png')" alt="8"></a>
</div>


需点击虚拟机→可移动设备→找到硬件设备点击与主机连接

<div class="img-page">
<a data-fancybox title="9" href="/blog/img/article/jetson/9.png"><img :src="$withBase('/img/article/jetson/9.png')" alt="9"></a>
</div>

<div class="img-page">
<a data-fancybox title="10" href="/blog/img/article/jetson/10.png"><img :src="$withBase('/img/article/jetson/10.png')" alt="10"></a>
</div>

<div class="img-page">
<a data-fancybox title="11" href="/blog/img/article/jetson/11.png"><img :src="$withBase('/img/article/jetson/11.png')" alt="11"></a>
</div>

正确的界面是：

<div class="img-page">
<a data-fancybox title="12" href="/blog/img/article/jetson/12.png"><img :src="$withBase('/img/article/jetson/12.png')" alt="12"></a>
</div>

（5）选择好之后进入STEP 02，只安装裸系统，不安装其它包，选择Jetson OS，进行下载和安装。（建议安装所有包，将Jetson OS与Jetson SDK Components都选择，省的以后安装cuda等）

> 可选修改下载文件的存放地址

<div class="img-page">
<a data-fancybox title="13" href="/blog/img/article/jetson/13.png"><img :src="$withBase('/img/article/jetson/13.png')" alt="13"></a>
</div>

可能会弹出目录不存在，点击create即可

<div class="img-page">
<a data-fancybox title="14" href="/blog/img/article/jetson/14.png"><img :src="$withBase('/img/article/jetson/14.png')" alt="14"></a>
</div>

需要输入主机密码：

<div class="img-page">
<a data-fancybox title="15" href="/blog/img/article/jetson/15.png"><img :src="$withBase('/img/article/jetson/15.png')" alt="15"></a>
</div>

（6）在下载完系统镜像和组件后，进行刷机那一步，**storage Device一定选择NVMe**。选完后刷机会直接把系统刷到nvme固态盘上。

<div class="img-page">
<a data-fancybox title="16" href="/blog/img/article/jetson/16.png"><img :src="$withBase('/img/article/jetson/16.png')" alt="16"></a>
</div>

选择Automatic Setup-Jetson Xavirt NX会提示错误，所以将其改为Manual Setup-Jetson Xavirt NX：

<div class="img-page">
<a data-fancybox title="17" href="/blog/img/article/jetson/17.png"><img :src="$withBase('/img/article/jetson/17.png')" alt="17"></a>
</div>

填写用户名密码

<div class="img-page">
<a data-fancybox title="18" href="/blog/img/article/jetson/18.png"><img :src="$withBase('/img/article/jetson/18.png')" alt="18"></a>
</div>

（7）等待下载和安装结束。

<div class="img-page">
<a data-fancybox title="19" href="/blog/img/article/jetson/19.png"><img :src="$withBase('/img/article/jetson/19.png')" alt="19"></a>
</div>

（8）烧录完成，点击FINISH，然后关闭软件，给Jetson Xavier NX外接一个屏幕，拔开电源重启，然后进行新系统的设置（用户名，密码等等）。

我们拔掉杜邦线或者跳线帽，如果接上显示屏就会看到ubuntu登录界面，无外接显示屏看进度条和听风扇转速就知道了。（此过程中可能会提醒烧写超时无需紧张继续即可，如果报错可以关掉SDKmanager重新烧录，一般电脑和NX的USB连线全程保持不断开就没问题）开机后连上键鼠，启动ubuntu系统后连接wifi、添加中文输入法、设置快捷键等基本操作。

## 4、常见问题

- 您当前所在地区的年龄政策不允许您使用系统。（注册时需要填写正确的年龄）
- user is not authorized on nvidia（此账号不是Nvidia开发者账号，在Windows系统上注册为[开发者](https://developer.nvidia.com/after_signup/complete_profile)即可。）
- User is not authorized on NVIDIA developer server （网络原因，重新打开sdkmanager/切换wifi网络/4g网络等）
- Firefox is already running, but is not responding（终端输入“killall firefox”，然后手动启动Firefox浏览器，等待跳转至Nvidia官网进行登录操作。）
- Your current region has an age policy that does not allow you to use the ...（重新注册了一个Nvidia账号）
- Default ip is not avaliable. Please make sure the default ip is shown in ip addr, or use a customer ip instead...（拿根网线和主线直连，多试几次）
- Cannot connect to the device via SSH. Check the user name and password, and make sure that SSH service is running on the device...（重试几次）

## 5、参考

https://blog.csdn.net/qq_62004827/article/details/133342868

https://blog.csdn.net/edagehe/article/details/135830060

## 6、其他

### 6.1 安装 jtop

```bash
sudo apt-get update
sudo apt-get install python3-pip
sudo -H pip3 install jetson-stats -i https://pypi.tuna.tsinghua.edu.cn/simple/ --trusted-host pypi.tuna.tsinghua.edu.cn
sudo systemctl restart jetson_stats.service

sudo jtop
```
