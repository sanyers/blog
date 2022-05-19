# android webview 选择本地文件

## 1、唤出系统文件管理器

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

    // 第二种方式（过滤文件格式）
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

## 2、唤出自定义文件管理器

### 2.1 使用第三方插件

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

### 2.2 手写文件管理页面

手写文件管理页面有两个个步骤：获取文件列表、展示文件列表

（1）获取文件列表

按一般文件管理器大致有几个目录：文档、音频、视频、图片、下载、所有文件目录

```java
public class FileManage {
    private Context _c;
    private static final String TAG = "FileManage：";
    public FileManage(Context context) {
        _c = context;
    }

    // 获取视频
    public JSONObject getVideos() { // 这里返回一个 JSONObject，返回格式可以自行定义
        Cursor c = null;
        JSONArray array = new JSONArray();
        try {
            Log.e(TAG,MediaStore.Video.Media.EXTERNAL_CONTENT_URI.toString());
            c = _c.getContentResolver().query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, null, null, null, MediaStore.Video.Media.DEFAULT_SORT_ORDER);
            while (c.moveToNext()) {
                String path = c.getString(c.getColumnIndexOrThrow(MediaStore.Video.Media.DATA));// 路径
                if (!new File(path).exists()) {
                    continue;
                }

                int id = c.getInt(c.getColumnIndexOrThrow(MediaStore.Video.Media._ID));// 视频的id
                String name = c.getString(c.getColumnIndexOrThrow(MediaStore.Video.Media.DISPLAY_NAME)); // 视频名称
                String resolution = c.getString(c.getColumnIndexOrThrow(MediaStore.Video.Media.RESOLUTION)); //分辨率
                long size = c.getLong(c.getColumnIndexOrThrow(MediaStore.Video.Media.SIZE));// 大小
                long duration = c.getLong(c.getColumnIndexOrThrow(MediaStore.Video.Media.DURATION));// 时长
                long date = c.getLong(c.getColumnIndexOrThrow(MediaStore.Video.Media.DATE_MODIFIED));//修改时间

                JSONObject obj = new JSONObject();
                obj.put("id",id);
                obj.put("name",name);
                obj.put("url",path);
                obj.put("resolution",resolution);
                obj.put("size",size);
                obj.put("duration",duration);
                obj.put("time",getDateToString(date*1000));
                obj.put("timestamp", date*1000);
                array.put(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (c != null) {
                c.close();
            }
        }
        File file = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
        JSONObject obj = new JSONObject();
        try {
            obj.put("name","视频");
            obj.put("svg","#icon-file_video");
            obj.put("url", file.getPath());
            if(array != null && array.length() != 0) {
                obj.put("child", array);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取音频
    public JSONObject getMusics() {
        Cursor c = null;
        JSONArray array = new JSONArray();
        try {
            c = _c.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null, null, null,
                    MediaStore.Audio.Media.DEFAULT_SORT_ORDER);
            while (c.moveToNext()) {
                String path = c.getString(c.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));// 路径
                if (!new File(path).exists()) {
                    continue;
                }

                int id = c.getInt(c.getColumnIndexOrThrow(MediaStore.Audio.Media._ID)); // 歌曲的id
                String name = c.getString(c.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)); // 歌曲名
                String album = c.getString(c.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM)); // 专辑
                String artist = c.getString(c.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST)); // 作者
                long size = c.getLong(c.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE));// 大小
                int duration = c.getInt(c.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));// 时长
                long date = c.getLong(c.getColumnIndexOrThrow(MediaStore.Audio.Media.DATE_MODIFIED));//修改时间
                int albumId = c.getInt(c.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM_ID));

                JSONObject obj = new JSONObject();
                obj.put("id",id);
                obj.put("name",name);
                obj.put("url",path);
                obj.put("album",album);
                obj.put("artist",artist);
                obj.put("size",size);
                obj.put("duration",duration);
                obj.put("time",getDateToString(date*1000));
                obj.put("timestamp", date*1000);
                obj.put("albumId",albumId);
                array.put(obj);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (c != null) {
                c.close();
            }
        }
        File file = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC);
        JSONObject obj = new JSONObject();
        try {
            obj.put("name","音频");
            obj.put("svg","#icon-file_music");
            obj.put("url", file.getPath());
            if(array != null && array.length() != 0) {
                obj.put("child", array);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取图片
    public JSONObject getImages() {
        // 扫描图片
        Cursor c = null;
        JSONArray array = new JSONArray();
        try {
            c = _c.getContentResolver().query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, null,
                    MediaStore.Images.Media.MIME_TYPE + "= ? or " + MediaStore.Images.Media.MIME_TYPE + "= ?",
                    new String[]{"image/jpeg", "image/png"}, MediaStore.Images.Media.DATE_MODIFIED);
            while (c.moveToNext()) {
                String path = c.getString(c.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));// 路径
//                @SuppressLint("Range") String path = c.getString(c.getColumnIndex(MediaStore.Images.Media.DATA));// 路径
                File parentFile = new File(path).getParentFile();
                if (parentFile == null)
                    continue;
                int id = c.getInt(c.getColumnIndexOrThrow(MediaStore.Images.Media._ID)); // 图片的id
                String name = c.getString(c.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)); // 图片名
                long size = c.getLong(c.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE));// 大小
                long date = c.getLong(c.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_MODIFIED));//修改时间

                JSONObject obj = new JSONObject();
                obj.put("id",id);
                obj.put("name",name);
                obj.put("url",path);
                obj.put("size",size);
                obj.put("time",getDateToString(date*1000));
                obj.put("timestamp", date*1000);
                array.put(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (c != null) {
                c.close();
            }
        }
        File file = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        JSONObject obj = new JSONObject();
        try {
            obj.put("name","图片");
            obj.put("svg","#icon-file_img");
            obj.put("url", file.getPath());
            if(array != null && array.length() != 0) {
                obj.put("child", array);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取文档
    public JSONObject getDocuments() {
        File file = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
        JSONObject obj = getFileList(file);
        try {
            obj.put("name","文档");
            obj.put("svg","#icon-file1");
            obj.put("isFilter",true);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取下载
    public JSONObject getDownloads() {
        File file = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        JSONObject obj = getFileList(file);
        try {
            obj.put("name","下载");
            obj.put("svg","#icon-file_download");
            obj.put("isFilter",true);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取根文件
    public JSONObject getRoots() {
        File file = Environment.getExternalStorageDirectory();
        return getFileList(file);
    }

    // 获取本地文件
    public JSONObject getLocalStore() {
        JSONObject obj = getRoots();
        try {
            obj.put("name","本地");
            JSONArray array = new JSONArray();

            array.put(getDocuments());
            array.put(getMusics());
            array.put(getVideos());
            array.put(getImages());
            array.put(getDownloads());

            obj.put("typeList", array);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj;
    }

    // 获取U盘文件
    public JSONObject getDiskFiles() {
        JSONObject obj = null;
        String path = "/mnt/usb/";
        File file = new File(path);
        File[] files = file.listFiles();
        if(files != null && files.length != 0) {
            obj = getFileList(file);
            try {
                obj.put("name","U盘");
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return obj;
    }

    // 获取目录文件下所有文件列表
    private JSONObject getFileList(File file) {
        JSONObject message = new JSONObject();
        try {
            if(file.exists()){
                message.put("name", file.getName());
                message.put("url", file.getPath());
                message.put("timestamp", file.lastModified());
                message.put("time", getDateToString(file.lastModified()));
                message.put("size", file.length());
                File[] list = file.listFiles();
                if(list != null && list.length != 0) {
                    List fileList = Arrays.asList(list);
                    Collections.sort(fileList, (Comparator<File>) (o1, o2) -> {
                        if (o1.isDirectory() && o2.isFile())
                            return -1;
                        if (o1.isFile() && o2.isDirectory())
                            return 1;
                        return o1.getName().compareTo(o2.getName());
                    });
                    JSONArray arr = new JSONArray();
                    for(File item : list) {
                        arr.put(getFileList(item));
                    }
                    message.put("child", arr);
                } else {
                    if(file.isDirectory()) {
                        message.put("child",new JSONArray());
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return message;
    }

    // File 转 Uri
    public Uri getUriForFile(File file) {
        String packageName = GetDevice.getPackage(_c).packageName;
        Uri contentUri = FileProvider.getUriForFile(_c,packageName+".fileProvider", file);
        return contentUri;
    }

    private String getDateToString(long milSecond) {
        String pattern = "yyyy-MM-dd HH:mm:ss";
        Date date = new Date(milSecond);
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }

    // 获取视频缩略图
    public Bitmap getVideoThumbnail(int id) {
        Bitmap bitmap = null;
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inDither = false;
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;
        bitmap = MediaStore.Video.Thumbnails.getThumbnail(_c.getContentResolver(), id, MediaStore.Images.Thumbnails.MICRO_KIND, options);
        return bitmap;
    }
}
```

（2）展示文件列表

通过上面的 FileManage 里面的方法就可以获取到 Android 系统里面大部分文件列表了

展示可以使用 Android 的 Activity 布局展示，这里使用的是 H5 写的[文件管理](https://github.com/sanyers/web-file-manage)，实现逻辑一致（取到文件列表->展示->选择文件->得到文件URI）。

在 WChromeClient.java 中编写

```java
private ValueCallback<Uri[]> uploadFiles = null;
// 重写选择文件
@Override
public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                    FileChooserParams fileChooserParams) {
    uploadFiles = filePathCallback; // 取到 filePathCallback 回调之后不做处理
    return true;
}

// 文件选择回调（这个方法提供给js调用）
public void resultFileChoose(String json) { // 参数是前端js选择了一项或多项的列表
    Uri[] results = null;
    try {
        JSONArray jsonArray = new JSONArray(json);
        results = new Uri[jsonArray.length()];
        for(int i=0; i<jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            String url = obj.getString("url");
            File file = new File(url);
            results[i] = getUriForFile(file);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    receiveFile(results);
}

public void receiveFile(Uri[] results) {
    uploadFiles.onReceiveValue(results);
    uploadFiles = null;
}
```

提供给js的方法：

```java
FileManage fileManage = new FileManage(context); // context 就是 MainActivity 的 this
// 获取本地文件列表
@JavascriptInterface
public String getLocalStore() {
    String str = fileManage.getLocalStore().toString();
    return str;
}

// 获取U盘文件列表
@JavascriptInterface
public String getDiskFiles() {
    JSONObject obj = fileManage.getDiskFiles();
    if(obj!=null) {
        String str = fileManage.getDiskFiles().toString();
        return str;
    }else{
        return "null";
    }
}

// 选择文件
@JavascriptInterface
public void getFileList(String json) {
    wChromeClient.resultFileChoose(json); // resultFileChoose 就是前面 WChromeClient.java 里面的
}

// 取消选择（注意取消选择文件必须置空回调）
@JavascriptInterface
public void cancelFile() { wChromeClient.receiveFile(null); }
```

js如何调用：

```js
// 获取设备根目录
toAndroid({ methods: 'getLocalStore' }, val => {
    const json = JSON.parse(val);
    this.fileList.push(json); // 文件列表
});

// 获取设备U盘目录
toAndroid({ methods: 'getDiskFiles' }, val => {
    if (val !== 'null') {
    const json = JSON.parse(val);
    this.fileList.push(json);
    }
});

// 调用安卓方法
export default function toAndroid(infor, success, error) {
  try {
    const { methods, params } = infor;
    let data = null;
    params
      ? (data = window.jsWebView[methods](params))
      : (data = window.jsWebView[methods]());
    success && success(data);
  } catch (e) {
    error && error();
  }
}
```