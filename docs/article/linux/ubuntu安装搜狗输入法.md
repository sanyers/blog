# ubuntu安装搜狗输入法

下载sogou安装包 [http://pinyin.sogou.com/linux/](http://pinyin.sogou.com/linux/)

```bash
sudo dpkg -i sogoupinyin_x.x.x.xxxx_amd64.deb

# 安装过程中如果出现错误输入
sudo apt-get install -f # 对错误进行修复
```

（1）打开 `系统设置`——`区域和语言`——`管理已安装的语言`—— 在“语言”tab下——点击“添加或删除语言”

（2）弹出“`已安装语言`”窗口，勾选 `中文（简体）`，点击应用

（3）回到“`语言支持`”窗口，在键盘输入法系统中，选择“`fcitx`”

（4）点击“`应用到整个系统`”，关闭窗口，重启电脑

（5）重启后，搜狗拼音打不出中文

确保已经安装了`fcitx`和`libqt5*`系列库

```bash
sudo apt-get install fcitx
sudo apt-get install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt-get install libgsettings-qt1
```