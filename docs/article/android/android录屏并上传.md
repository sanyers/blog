# android录屏并上传

流程思路是：

（1）利用系统录屏API `MediaProjectionManager` 向用户询问是否录制

（2）返回一个 `Intent data` 对象，根据这个对象调用 `MediaProjectionManager.getMediaProjection()` 方法生成 `MediaProjection` 对象

（3）根据 `MediaProjection` 对象创建 `VirtualDisplay` 实例

（4）创建 `MediaRecorder` 对象并初始化

（5）调用 `MediaRecorder.start()` 开始录制

（6）调用 `MediaRecorder.stop()` 停止录制

（7）上传文件

调用 okhttp3 库

安装 `implementation "com.squareup.okhttp3:okhttp:4.9.3"`

MyMediaRecorder.java：

```java
public class MyMediaRecorder {
    private static String TAG = "MyMediaRecorder";
    public static final int RECORD_REQUEST_CODE = 0x34;
    private MediaProjectionManager mMediaProjectionManager;
    private MediaRecorder mediaRecorder;
    private Context _c;
    private MainActivity _m;
    private String videoName = "/sdcard/tempRecorder.mp4"; // 录制文件地址
    public Bundle saveIntent = null; // 保存用户确认信息

    public MyMediaRecorder(Context context, MainActivity mainActivity) {
        _c = context;
        _m = mainActivity;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            mMediaProjectionManager = (MediaProjectionManager) _c.getSystemService(_c.MEDIA_PROJECTION_SERVICE); // 创建录屏实例
        }
    }

        // 启动录制
    public void startRecorder() {
        if(saveIntent == null) {
            Intent captureIntent = mMediaProjectionManager.createScreenCaptureIntent(); // 创建录屏请求
            _m.startActivityForResult(captureIntent, RECORD_REQUEST_CODE);
        } else { // 如果保存了上一次确认的信息则可以直接录屏
            Intent data = new Intent();
            data.putExtras(saveIntent);
            getMediaProjection(data); // 开始录制
        }
    }

    // 停止录制
    public void endRecorder() {
        if(mediaRecorder != null){
            mediaRecorder.stop();
            mediaRecorder.reset();
        }
        if(virtualDisplay != null) {
            virtualDisplay.release();
        }
        try {
            String url = ""; // 接口地址
            String perams = ""; // 接口参数
            String auth = ""; // Authentication 校验
            uploadFile(url, videoName, perams, auth); // 文件上传
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    // 弹框回调（该方法是 MainActivity onActivityResult 的回调）
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(resultCode == Activity.RESULT_OK) {
            saveIntent = data.getExtras(); // 保存用户的确认信息
            getMediaProjection(data); // 开始录制
        }
    }

    // 开始录制
    private void getMediaProjection(Intent data) {
        MediaProjection mediaProjection = mMediaProjectionManager.getMediaProjection(Activity.RESULT_OK, data);
        if(mediaProjection == null) {
            Log.w(TAG,"程序发生错误");
            return;
        }
        DisplayMetrics metrics = new DisplayMetrics();
        _m.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        createVirtualDisplay(metrics, mediaProjection); // 创建 VirtualDisplay
        int orientation = _m.getResources().getConfiguration().orientation;
        initRecorder(metrics, orientation); // 初始化录屏
        mediaRecorder.start(); // 开始录制
    }

    VirtualDisplay virtualDisplay = null;
    private void createVirtualDisplay(DisplayMetrics displayMetrics, MediaProjection mediaProjection) {
        // 如果当前屏幕 尺寸 大于 XHIGH  则统一使用 720 * 1280 ，其他就使用本身屏幕的大小
        virtualDisplay = mediaProjection.createVirtualDisplay("MainScreen",
                displayMetrics.widthPixels, displayMetrics.heightPixels, displayMetrics.densityDpi,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR, mediaRecorder.getSurface(), null, null);
    }

    // 初始化录制
    private void initRecorder(DisplayMetrics displayMetrics, int orientation) {
        mediaRecorder = new MediaRecorder();
        int width = displayMetrics.widthPixels;
        int height = displayMetrics.heightPixels;
        int dpi = displayMetrics.densityDpi;
        // 视频最大的尺寸 720 * 1280 ,其他视频尺寸使用屏幕大小
        if (dpi > DisplayMetrics.DENSITY_XHIGH) {
            width = (orientation == Configuration.ORIENTATION_LANDSCAPE ? 1280 : 720);
            height = (orientation == Configuration.ORIENTATION_LANDSCAPE ? 720 : 1280);
        }
        //如果是横屏，视频输出时旋转90度
        mediaRecorder.setOrientationHint(orientation != Configuration.ORIENTATION_LANDSCAPE ? 0 : 90);
        //  音频源，这里需要 android.permission.RECORD_AUDIO 权限
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.DEFAULT);
        //  视频来源
        mediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
        //  视频输出格式
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
        // 录制输出文件
        mediaRecorder.setOutputFile(videoName);
        //视频编码格式
        mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
        //音频编码格式
        mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
        // 设置最大时长5分钟
        mediaRecorder.setMaxDuration(5 * 60 * 1000);
        //  设置视频文件的比特率,经过测试该属性对于视频大小影响最大
        mediaRecorder.setVideoEncodingBitRate(1 * 1024 * 1024);
        //设置视频分辨率
        mediaRecorder.setVideoSize(width, height);
        //设置视频帧频率
        mediaRecorder.setVideoFrameRate(30);

        // 录制发生错误的监听
        mediaRecorder.setOnErrorListener((mr, what, extra) -> {

        });
        //记录录制时出现的信息事件
        mediaRecorder.setOnInfoListener((mr, what, extra) -> {

        });
        try {
            //准备录制
            mediaRecorder.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 文件上传
    private void uploadFile(String url, String filePath, String perams, String auth) {
        MediaType types = MediaType.get("video/mp4");
        String fileName = "record-screen-" + System.currentTimeMillis() + ".mp4";
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("perams", perams)
                .addFormDataPart("file", fileName, RequestBody.create(new File(filePath),types))
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .header("Authentication", auth)
                .build();
        OkHttpClient client = new OkHttpClient();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                Log.i(TAG,response.body().string());
                Log.i(TAG,"上传失败");
                Log.i(TAG,"code:" + response.code());
            } else {
                Log.i(TAG,"上传成功");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

MainActivity.java：

```java
MyMediaRecorder myMediaRecorder;
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
    myMediaRecorder = new MyMediaRecorder(this, MainActivity.this);
    myMediaRecorder.startRecorder(); // 启动录制
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if(requestCode == MyMediaRecorder.RECORD_REQUEST_CODE) { // 处理录屏回调
        myMediaRecorder.onActivityResult(requestCode, resultCode, data);
    }
}
```