# android webview 开发

开发工具：

- `Android Studio Arctic Fox | 2020.3.1 Patch 2`
- `vscode 1.60.0`
- `Chrome: 91.0.4472.164`
- `Node.js: 14.16.0`

## 1、创建项目

File => New => New Project => Empty Activity

（1）第一步选择 New Project

<div class="img-page">
<a data-fancybox title="New Project" href="/img/android/page_1.png"><img :src="$withBase('/img/android/page_1.png')" alt="New Project"></a>
</div>

（2）第二步选择 Empty Activity

<div class="img-page">
<a data-fancybox title="Empty Activity" href="/img/android/page_2.png"><img :src="$withBase('/img/android/page_2.png')" alt="Empty Activity"></a>
</div>

（3）第三步设置项目名称及地址

<div class="img-page">
<a data-fancybox title="项目名称" href="/img/android/page_3.png"><img :src="$withBase('/img/android/page_3.png')" alt="项目名称"></a>
</div>

## 2、目录结构

（1）设置目录结构

设置项目结构为 Project，该目录下文件路径非常清晰

<div class="img-page">
<a data-fancybox title="设置目录" href="/img/android/page_4.png"><img :src="$withBase('/img/android/page_4.png')" alt="设置目录"></a>
</div>

（2）目录结构说明

使用指引创建空项目，会自动生成标准的项目目录结构

<div class="img-page">
<a data-fancybox title="目录结构" href="/img/android/page_5.png"><img :src="$withBase('/img/android/page_5.png')" alt="目录结构"></a>
</div>

- `.gradle` Android Studio 构建系统
- `.idea` 编辑器 配置
- `app` 应用目录
  - `build` 打包后的目录文件
  - `libs` 第三方 jar 包
  - `src` 源文件
    - `main` 源文件主目录
      - `java` 代码目录
        - `com.xxx.myapplication2` 源代码文件目录
      - `res` resource 资源
        - `layout` 页面布局目录
      - `AndroidManifest.xml` 应用清单
  - `.gitignore` git 不需要提交的文件列表
  - `build.gradle` 配置整个 app 应用
  - `proguard-rules.pro` 编译混淆配置
- `gradle/wrapper` 简化 Gradle 本身的安装、部署
- `.gitignore` git 不需要提交的文件列表
- `build.gradle` 配置整个工程
- `gradle.properties` Gradle 文件的全局性的配置
- `gradlew` UN*X 的 Gradle 启动脚本
- `gradlew.bat` Windows 的 Gradle 启动脚本
- `local.properties` SDK的位置配置
- `settings.gradle` 配置 gradle

## 3、设置 Android SDK 版本

```java
android {
  compileSdk 31
  buildToolsVersion '31.0.0'
  compileSdkVersion 31
  defaultConfig {
        applicationId "com.example.myapplication2"
        minSdk 21 // 最小sdk
        targetSdk 31
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}
```

## 4、设置 WebView layout

layout 目录地址：

app => src => main => res => layout => activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:aandroid="http://schemas.android.com/apk/res/android"
    aandroid:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/wv_webview"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:scrollbars="horizontal"
        tools:ignore="MissingConstraints" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

配置 WebView 组件 id `android:id="@+id/wv_webview"`

## 5、配置程序权限

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.LOCAL_MAC_ADDRESS" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
<uses-permission android:name="android.permission.READ_LOGS" />
<uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE"/>
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.READ_FRAME_BUFFER" />
<uses-feature android:name="android.hardware.camera" android:required="true"/>
<uses-feature android:name="android.hardware.camera.autofocus"/>
```

## 6、在程序入口初始化 WebView

一般程序入口文件为：

app => src => main => java => com.xxx.myapplication2 => MainActivity.java

在 `onCreate()` 里面编写初始化程序：

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 开启 WebView 长截图，在 setContentView() 方法前面设置才有效
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        WebView.enableSlowWholeDocumentDraw();
    }

    setContentView(R.layout.activity_main);

    // 隐藏顶部标题栏
    getSupportActionBar().hide();

    // 去除状态栏
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);

    // 初始化 WebView
    initWebView();
}

// 销毁 webView
@Override
protected void onDestroy() {
    if (this.webView != null) {
        webView.destroy();
    }
    super.onDestroy();
}

@Override
protected void onResume() {
    /**
      * 设置为横屏
      */
    // if(getRequestedOrientation()!= ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE){
    //     setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    // }
    super.onResume();
}
```

初始化代码：

```java
private WebView webView;
private void init()
{
    webView = (WebView) findViewById(R.id.wv_webview);
    WebSettings settings = webView.getSettings(); // webView 配置项
    settings.setUseWideViewPort(true); // 是否启用对视口元标记的支持
    settings.setJavaScriptEnabled(true); // 是否启用 JavaScript
    
    settings.setDomStorageEnabled(true); // 是否启用本地存储（允许使用 localStorage 等）
    settings.setAllowFileAccess(true); // 是否启用文件访问

    settings.setAppCacheEnabled(true); // 是否应启用应用程序缓存
    settings.setAppCacheMaxSize(1024*1024*8); // 设置应用程序缓存内容的最大大小
    String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath(); // 缓存地址
    settings.setAppCachePath(appCachePath); // 设置缓存地址

    settings.setAllowContentAccess(true); // 是否启用内容 URL 访问
    settings.setJavaScriptCanOpenWindowsAutomatically(true); // 是否允许 JS 弹窗
    settings.setMediaPlaybackRequiresUserGesture(false); // 是否需要用户手势来播放媒体

    settings.setLoadWithOverviewMode(true); // 是否以概览模式加载页面，即按宽度缩小内容以适应屏幕
    settings.setBuiltInZoomControls(true); // 是否应使用其内置的缩放机制

    if(Build.VERSION.SDK_INT > Build.VERSION_CODES.HONEYCOMB) {
        // Hide the zoom controls for HONEYCOMB+
        settings.setDisplayZoomControls(false); // 是否应显示屏幕缩放控件
    }

    // Enable remote debugging via chrome://inspect
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true); // 是否开启 WebView 调试功能，配合PC端 Chrome DevTools 功能使用
    }

    settings.setAllowFileAccessFromFileURLs(true); // 是否应允许在文件方案 URL 上下文中运行的 JavaScript 访问来自其他文件方案 URL 的内容
    settings.setAllowUniversalAccessFromFileURLs(true); // 是否应允许在文件方案URL上下文中运行的 JavaScript 访问任何来源的内容

    webView.loadUrl("https://www.baidu.com"); // 设置访问地址
    webView.addJavascriptInterface(new JsInterface(this, webView, MainActivity.this),"jsWebView"); // 设置 js 调用接口
    webView.setDrawingCacheEnabled(true); // 启用或禁用图形缓存
    webView.setWebViewClient(new WVViewClient()); // 帮助 WebView 处理各种通知、请求事件
    webView.setWebChromeClient(new WVChromeClient(this, MainActivity.this)); // 处理解析，渲染网页
}
```

`new JsInterface()` 代码：

```java
public class JsInterface {
  private Context _context;
  private final WebView _webview;
  private MainActivity _m;
  public  JsInterface(Context context, WebView webView, MainActivity mainActivity)
  {
      _context = context;
      _webview = webView;
      _m = mainActivity;
  }

  // 开放 test 方法给 js，在 web 页面使用 window.test('hello'); 调用。
  @JavascriptInterface
  public void test(String val){
      Log.i("test",val);
      _webview.post(new Runnable() {
          @Override
          public void run() {
              _webview.loadUrl("javascript:cbMessage('message');",null); // java 调用 js 的 cbMessage 方法
          }
      });
  }
}
```

`new WVViewClient()` 代码：

```java
public class WVViewClient extends WebViewClient {
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        if (handler != null) {
            handler.proceed();//忽略证书的错误继续加载页面内容，不会变成空白页面
        }
    }
}
```

`new WVChromeClient()` 代码：

```java
public class WVChromeClient extends WebChromeClient{
  private Context _context;
  private MainActivity _m;
  public WVChromeClient(Context context, MainActivity mainActivity)
  {
      _context = context;
      _m = mainActivity;
  }

   @Override
  public void onProgressChanged(WebView view, int newProgress) {
      super.onProgressChanged(view, newProgress);
      Log.d("MainActivity","newProgress："+ newProgress );
  }
}
```