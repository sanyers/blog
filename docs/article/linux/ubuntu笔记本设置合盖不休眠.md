# ubuntu笔记本设置合盖不休眠

1. 打开终端，编辑文档：

`sudo vim /etc/systemd/logind.conf`

2. 三种不同类型的笔记本电脑合盖默认设置：

- `HandleLidSwitch=suspend`：当笔记本电脑使用电池供电时，合盖挂起
- `HandleLidSwitchExternalPower=suspend`：当笔记本电脑插入电源插座时，合盖挂起
- `HandleLidSwitchDocked=ignore`：当笔记本电脑连接到扩展坞时，合盖忽略

3. 如果需要，你可以根据自己的喜好将这些参数的值更改为其中之一：

- `suspend`：合盖时挂起
- `lock`：合盖时锁定
- `ignore`：什么都不做
- `poweroff`：关机
- `hibernate`：合盖时休眠

4. 修改后重启服务

`sudo systemctl restart systemd-logind`