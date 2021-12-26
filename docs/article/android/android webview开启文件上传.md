# android webview 开启文件上传

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
        wv.onActivityResultFileChooser(requestCode, resultCode, data);
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

    // 文件选择回调
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