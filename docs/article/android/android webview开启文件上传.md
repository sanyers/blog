# android webview 开启文件上传

开启文件上传，可使用HTML5标签 `<input type="file">` 唤出系统文件管理器或自定义文件管理器，然后选择文件。

MainActivity.java:

```java
private WebView webView;
private WVChromeClient wv = null;
@Override
protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.activity_main);
    webView = (WebView) findViewById(R.id.wv_webview);
    WebSettings settings = webView.getSettings();
    settings.setUseWideViewPort(true);
    settings.setJavaScriptEnabled(true);
    wv = new WVChromeClient(this,MainActivity.this);
    webView.setWebChromeClient(wv);
}

 @Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == WVChromeClient.CHOOSER_REQUEST) { // 处理返回的文件
        wv.onActivityResultFileChooser(requestCode, resultCode, data); // 调用 WVChromeClient 类中的 回调方法
    }
}
```

WVChromeClient.java：

```java
public class WVChromeClient extends WebChromeClient {
    private static final String TAG = "WebChromeClient：";
    public final static int CHOOSER_REQUEST = 0x33;
    private ValueCallback<Uri[]> uploadFiles = null;
    Context context;
    MainActivity _m;
    public WVChromeClient(Context _context, MainActivity mainActivity)
    {
        context = _context;
        _m = mainActivity;
    }

    // 第一种方式
    @Override
    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                     FileChooserParams fileChooserParams) {
        uploadFiles = filePathCallback;
        Intent i = fileChooserParams.createIntent();
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true); // 设置多选
        _m.startActivityForResult(Intent.createChooser(i, "Image Chooser"), CHOOSER_REQUEST);
        return true;
    }

    // 第二种方式
    @Override
    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                     FileChooserParams fileChooserParams) {
        uploadFiles = filePathCallback;
        Intent i = new Intent(Intent.ACTION_GET_CONTENT);
        i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        i.setType("*/*"); // 设置文件类型
        String[] mimeTypes = { "image/*,audio/*,video/*,*/*" };
        i.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes); // 设置多种类型
        i.addCategory(Intent.CATEGORY_OPENABLE);
        _m.startActivityForResult(Intent.createChooser(i, "Image Chooser"), CHOOSER_REQUEST);
        return true;
    }

    // 文件选择回调（在 MainActivity.java 的 onActivityResult中调用此方法）
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public void onActivityResultFileChooser(int requestCode, int resultCode, Intent intent) {
        if (requestCode != CHOOSER_REQUEST || uploadFiles == null)
            return;
        Uri[] results = null;
        if (resultCode == Activity.RESULT_OK) {
            if (intent != null) {
                String dataString = intent.getDataString();
                ClipData clipData = intent.getClipData();
                if (clipData != null) {
                    results = new Uri[clipData.getItemCount()];
                    for (int i = 0; i < clipData.getItemCount(); i++) {
                        ClipData.Item item = clipData.getItemAt(i);
                        results[i] = item.getUri();
                    }
                }
                if (dataString != null)
                    results = new Uri[]{Uri.parse(dataString)};
            }
        }
        uploadFiles.onReceiveValue(results);
        uploadFiles = null;
    }
}
```

唤出自定义文件管理器：

这里使用 AndroidFilePicker 插件可自定义文件管理器，见[详细使用](https://github.com/DroidNinja/Android-FilePicker)

（1）添加依赖

在项目 `build.gradle` 配置文件添加仓库：

```
allprojects {
    repositories {
	    ...
    	maven { url 'https://jitpack.io' }
    }
}
```

在子模块（`app`）的配置文件添加依赖：

```
dependencies {
    implementation 'me.rosuh:AndroidFilePicker:0.8.2'
}
```

此库需要一个权限：

`android.permission.READ_EXTERNAL_STORAGE`

如果您没有提前授予，这个库会自动申请该权限的。

修改上文 `WVChromeClient` 类中的 `onShowFileChooser()` 方法：

```java
private ValueCallback<Uri[]> uploadFiles = null;
// 重写选择文件
@Override
public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                    FileChooserParams fileChooserParams) {
    uploadFiles = filePathCallback;
    String uDiskUrl = getUDisk(); // 检测U盘
    if(uDiskUrl != null) {
        showSingleAlertDialog(uDiskUrl); // 弹出选择框
    } else {
        showFilePickerManager(""); // 直接打开本地路径，若无需支持U盘则可以直接调用此方法唤出自定义文件管理器
    }
    return true;
}

// 判断是否存在U盘
private String getUDisk() {
    String path = "/mnt/usb/"; // u盘路径
    File storage = new File(path);
    File[] files = storage.listFiles();
    if(files != null && files.length != 0) {
        return path + files[0].getName() + "/";
    }
    return null;
}

// 打开文件管理器
private void showFilePickerManager(String path) {
    FilePickerManager
            .from((Activity) context) // context 为上文实例化 WVChromeClient 类时传入
            .setCustomRootPath(path)
            .forResult(CHOOSER_REQUEST);
}

private int checkedItem = 0;
private boolean isNotOK = true;
// 选择框
private void showSingleAlertDialog(String path) {
    String[] items = {"本地存储", "U盘"};
    AlertDialog.Builder alertBuilder = new AlertDialog.Builder(context);
    alertBuilder.setTitle("请选择");
    alertBuilder.setSingleChoiceItems(items, 0, (dialogInterface, i) -> {
        checkedItem = i;
    });

    alertBuilder.setPositiveButton("确定", (dialogInterface, i) -> {
        isNotOK = false;
        dialogInterface.dismiss();
        String paths = "";
        if(checkedItem == 1) {
            paths = path; // 当前选择U盘，默认为本地存储
        }
        showFilePickerManager(paths);
    });

    alertBuilder.setNegativeButton("取消", (dialogInterface, i) -> dialogInterface.dismiss());

    alertBuilder.setOnDismissListener(dialog -> {
        if(isNotOK) { // 若没有选择确定按钮则取消文件上传
            uploadFiles.onReceiveValue(null);
            uploadFiles = null;
        }
    });
    alertBuilder.show();
}

// 文件选择回调
@TargetApi(Build.VERSION_CODES.LOLLIPOP)
public void onActivityResultFileChooser(int requestCode, int resultCode, Intent intent) {
    if (requestCode != Config.CHOOSER_REQUEST_CODE || uploadFiles == null)
        return;
    Uri[] results = null;
    if (resultCode == Activity.RESULT_OK) {
        List<String> list = FilePickerManager.obtainData(); // 取到选择的文件列表
        results = new Uri[list.size()];
        for (int i = 0; i < list.size(); i++) {
            String item = list.get(i);
            Uri uri = getUriForFile(new File(item));
            results[i] = uri;
        }
    }
    uploadFiles.onReceiveValue(results);
    uploadFiles = null;
    isNotOK = true;
}

// File 转 Uri
private Uri getUriForFile(File file) {
    String packageName = getPackage(context).packageName;
    Uri contentUri = FileProvider.getUriForFile(context,packageName+".fileProvider", file); // 需要 FileProvider，详细使用见下文
    return contentUri;
}

// 获取当前包名
public static PackageInfo getPackage(Context context) {
    PackageManager manager = context.getPackageManager();
    try {
        PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
        return  info;
    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
        return null;
    }
}
```

FileProvider 使用[详见](andorid%20FileProvider%20使用.md)