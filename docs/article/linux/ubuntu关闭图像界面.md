# ubuntu关闭图像界面

方法一：使用命令行关闭图形界面

1. 打开终端：按下 `Ctrl+Alt+T` 组合键即可打开终端。
2. 停止 display manager：输入命令 `sudo systemctl stop display-manager`，然后按下回车键。这将会停止 Ubuntu 的 display manager，通常为 GDM 或者 LightDM。
3. 切换到控制台：按下 `Ctrl+Alt+F1` 组合键，即可进入到第一个控制台。如果第一个控制台已经被占用，你可以尝试 `Ctrl+Alt+F2` 到 `Ctrl+Alt+F6` 中的任意一个。
4. 登录控制台：在控制台中，输入你的用户名和密码即可登录。

你现在已经关闭了图形界面，如果你需要重新启动图形界面，只需要在控制台中输入 `startx` 命令即可。如果你想要重新打开 display manager，可以使用 `sudo systemctl start display-manager` 命令。

方法二：使用 systemctl 命令关闭图形界面

1. 打开终端：按下 `Ctrl+Alt+T` 组合键即可打开终端。
2. 停止 display manager：输入命令 `sudo systemctl isolate multi-user.target`，然后按下回车键。这会让 Ubuntu 进入到多用户模式，关闭图形界面。
3. 如果需要重新启动图形界面，可以使用 `sudo systemctl start graphical.target` 命令。

这两种方法都可以关闭 Ubuntu 的图形界面。但是，需要注意的是，在关闭图形界面后，你将只能通过命令行来操作系统。