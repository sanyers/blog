# android webview 支持 http

android 9.0 之后 Google 默认不支持 http 请求，用 webview 加载 http 页面时会显示 net:ERR_CLEARTEXT_NOT_PERMITTED

解决方法1：只加载https的页面

解决方法2：targetSdkVersion 改成 27 或者以下。

解决方法3：在 Manifest.xml 的 application 中加`android:usesCleartextTraffic="true"`