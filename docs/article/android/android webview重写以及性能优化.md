# android webview 重写以及性能优化

在 webview 中加载 vue 项目，加载时间将近5~6秒，严重影响用户体验，为此，本文将探索 webview 性能优化相关技术细节，将用户体验优化到极致，做到原生app效果一般。

## 1、webview 优化

### 1.1 创建 BaseWebView.java

```java
import android.content.Context;
import android.os.Build;
import android.util.Log;
import android.view.MotionEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.annotation.NonNull;

public class BaseWebView extends WebView {
    private static final String TAG = "BaseWebView：";
    public WChromeClient wChromeClient;
    public BaseWebView(@NonNull Context context, String url) {
        super(context);
        wChromeClient = new WChromeClient(context);
        initWebView(context, url);
    }

    // 初始化
    private void initWebView(Context context, String url) {
        this.setBackgroundColor(0); // 设置背景
        this.setDrawingCacheEnabled(true); // 启用或禁用图形缓存
        this.setWebViewClient(new WViewClient(context)); // 处理各种通知、请求事件
        this.setWebChromeClient(wChromeClient); // 处理解析，渲染网页
        this.addJavascriptInterface(new JSInterface(context, this),"jsWebView"); // 设置 js 调用接口
        WebSettings settings = this.getSettings(); // webView 配置项
        settings.setUseWideViewPort(true); // 是否启用对视口元标记的支持
        settings.setJavaScriptEnabled(true); // 是否启用 JavaScript

        settings.setDomStorageEnabled(true); // 是否启用本地存储（允许使用 localStorage 等）
        settings.setAllowFileAccess(true); // 是否启用文件访问

        settings.setAppCacheEnabled(true); // 是否应启用应用程序缓存
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAppCacheMaxSize(1024*1024*8); // 设置应用程序缓存内容的最大大小
        String appCachePath = context.getApplicationContext().getCacheDir().getAbsolutePath(); // 缓存地址
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

        settings.setAllowFileAccessFromFileURLs(true); // 是否应允许在文件方案 URL 上下文中运行的 JavaScript 访问来自其他文件方案 URL 的内容
        settings.setAllowUniversalAccessFromFileURLs(true); // 是否应允许在文件方案URL上下文中运行的 JavaScript 访问任何来源的内容
        this.loadUrl(url); // 设置访问地址
    }

    // 注入 js 脚本
    public void injection(String js) {
        this.post(() -> this.loadUrl("javascript:" + js + ";",null));
    }

    // 执行 js 脚本
    public void executeMethod(String method, String data) {
        this.post(() -> this.loadUrl("javascript:" + method + "('" + data + "');",null));
    }
}
```

### 1.2 创建 WChromeClient.java

```java
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import android.webkit.ConsoleMessage;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class WChromeClient extends WebChromeClient {
    private static final String TAG = "WChromeClient：";
    private Context _c;
    public WChromeClient(Context context) {
        super();
        _c = context;
    }

    @Override
    public void onProgressChanged(WebView view, int newProgress) {
        super.onProgressChanged(view, newProgress);
        Log.d(TAG,"当前加载进度：" + newProgress);
    }

    @Override
    public void onReceivedTitle(WebView view, String title) {
        super.onReceivedTitle(view, title);
        Log.d(TAG,"网站标题："+ title);
    }

    // 响应 js 的 alert() 函数
    @Override
    public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
        AlertDialog.Builder b = new AlertDialog.Builder(_c);
        b.setTitle("");
        b.setMessage(message);
        b.setPositiveButton(android.R.string.ok, (dialog, which) -> result.confirm());
        b.setCancelable(false);
        b.create().show();
        return true;
    }

    // 响应 js 的 confirm() 函数
    @Override
    public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
        AlertDialog.Builder b = new AlertDialog.Builder(_c);
        b.setTitle("");
        b.setMessage(message);
        b.setPositiveButton(android.R.string.ok, (dialog, which) -> result.confirm());
        b.setNegativeButton(android.R.string.cancel, (dialog, which) -> result.cancel());
        b.create().show();
        return true;
    }

    // 响应 js 的 prompt() 函数
    @Override
    public boolean onJsPrompt(WebView view, String url, String message, String defaultValue,
                              final JsPromptResult result) {
        result.confirm();
        return super.onJsPrompt(view, url, message, message, result);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void onPermissionRequest(PermissionRequest request) {
        request.grant(request.getResources());
    }

    // 获取 js 的 console 消息
    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        Log.w(TAG,consoleMessage.message());
        return true;
    }
}
```

### 1.3 创建 WViewClient.java

优化重点：通过拦截常用资源从本地直接返回，减少网络请求下载的时间。

该方式需要 vue 项目使用第三方 js 库分离打包来实现

```java
import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.util.Log;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;

public class WViewClient extends WebViewClient {
    private static final String TAG = "WViewClient：";
    private Context _c;
    public WViewClient(Context context) {
        super();
        _c = context;
    }

    // ssl 证书错误
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        if (handler != null) {
            handler.proceed(); // 忽略证书的错误继续加载页面内容，不会变成空白页面
        }
    }

    @Override
    public void onReceivedError(WebView view, int errorCode,
                                String description, String failingUrl) {
        Log.i(TAG, description);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        // 开始
        Log.e(TAG,"开始");
        super.onPageFinished(view, url);
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        // 结束
        Log.e(TAG,"结束");
        super.onPageStarted(view, url, favicon);
    }

    // 请求拦截
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        // 判断拦截资源的条件
        InterceptRes ir = interceptResources(url);
        if (ir != null) {
            try {
                // 获得需要替换的资源（存放在assets文件夹中，如何创建 assets 文件夹请看下文）
                InputStream inputStream = _c.getApplicationContext().getAssets().open(ir.assetsUrl);
                // 替换资源
                return new WebResourceResponse(ir.mimeType, "utf-8", inputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return super.shouldInterceptRequest(view, url);
    }

    private InterceptRes interceptResources(String url) {
        InterceptRes interceptRes = null;
        switch (url){
            case "https://unpkg.com/element-ui/lib/theme-chalk/index.css":
                interceptRes = new InterceptRes("css/element-ui-index.css","text/css");
                break;
            case "https://unpkg.com/vue@2":
                interceptRes = new InterceptRes("js/vue.min.js","application/x-javascript");
                break;
            case "https://unpkg.com/vue-router@3":
                interceptRes = new InterceptRes("js/vue-router.js","application/x-javascript");
                break;
            case "https://unpkg.com/vuex@3":
                interceptRes = new InterceptRes("js/vuex.js","application/x-javascript");
                break;
            case "https://unpkg.com/element-ui/lib/index.js":
                interceptRes = new InterceptRes("js/element-ui-index.js","application/x-javascript");
                break;
            case "https://unpkg.com/axios/dist/axios.min.js":
                interceptRes = new InterceptRes("js/axios.min.js","application/x-javascript");
                break;
            default:
                break;
        }
        return interceptRes;
    }

    private class InterceptRes {
        String assetsUrl;
        String mimeType;
        InterceptRes(String assetsUrl,String mimeType) {
            this.assetsUrl = assetsUrl;
            this.mimeType = mimeType;
        }
    }
}
```

### 1.4 创建 assets

assets 用于存放本地资源，访问路径为 `file:///android_asset/index.html`

在 main 目录下右键 new -> Directory -> 选择 assets

在 assets 目录下 创建 css 和 js 目录，然后将资源文件复制到此目录即可。

### 1.5 创建 JSInterface.java

该类用于向 js 网页提供调用 Android 方法

```java
import android.content.Context;
import android.webkit.JavascriptInterface;

public class JSInterface {
    private Context _c;
    private MainActivity _m;
    private BaseWebView _w;
    public JSInterface(Context context, BaseWebView view) {
        _c = context;
        _m = (MainActivity) context;
        _w = view;
    }

    // 注入js
    @JavascriptInterface
    public void testInject() {
        String js = "alert();";
        _w.injection(js);
    }

    // 执行操作
    @JavascriptInterface
    public void testExecute() {
        // TODO：在这里可以执行Android程序方法和操作
        _w.executeMethod("cbExecute", "test"); // 回调执行 js 方法
    }
}
```

### 1.5 实例化 BaseWebView

```java
package com.hlzh.meeting;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private BaseWebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new BaseWebView(this);
        setContentView(webView);

        // 去除状态栏
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

    // 程序退出销毁
    @Override
    protected void onDestroy() {
        if (this.webView != null) {
            webView.removeAllViews();
            webView.destroy();
        }
        super.onDestroy();
    }

    long exitTime = 0;
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();//返回上一页面
            return;
        } else {
            if (System.currentTimeMillis() - exitTime > 2000) {
                Toast.makeText(getApplicationContext(), "再按一次退出程序", Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();
            } else {
                moveTaskToBack(true); // 返回主页面，也可以完全退出程序
                // finish();
                // System.exit(0);
                // android.os.Process.killProcess(android.os.Process.myPid());
            }
        }
    }
}
```

## 2、前端优化

[参考](../../web/vue/8.1-vue首屏页面性能优化.md)