# android权限管理

从 Android 6.0 开始，按照是否需要动态申请分为**普通权限**和**特殊权限**

**特殊权限**需要程序运行时申请并通过之后才能使用，或者程序安装为系统应用或系统签名。

注意：

1、动态申请也需要在清单文件中配置（AndroidMenifest.xml）

2、权限是分组的，同一组的权限申请其中一个，同组的权限就全部都申请了

## 特殊权限

特殊权限共有 9 组：

- `CALENDAR` 日历
- `CAMERA` 相机
- `CONTACTS` 联系人
- `LOCATION` 定位
- `MICROPHONE` 麦克风相关
- `PHONE` 手机状态
- `SENSORS` 传感器
- `SMS` 短信
- `STORAGE` 存储权限

9 组具体权限列表：

```txt
// CALENDAR 日历
android.permission.READ_CALENDAR
android.permission.WRITE_CALENDAR

// CAMERA 相机
android.permission.CAMERA

// CONTACTS 联系人
android.permission.WRITE_CONTACTS
android.permission.GET_ACCOUNTS
android.permission.READ_CONTACTS

// LOCATION 定位
android.permission.ACCESS_FINE_LOCATION
android.permission.ACCESS_COARSE_LOCATION

// MICROPHONE 麦克风相关
android.permission.RECORD_AUDIO

// PHONE 手机状态
android.permission.READ_CALL_LOG
android.permission.READ_PHONE_STATE
android.permission.CALL_PHONE
android.permission.WRITE_CALL_LOG
android.permission.USE_SIP
android.permission.PROCESS_OUTGOING_CALLS

// SENSORS 传感器
android.permission.BODY_SENSORS

// SMS 短信
android.permission.READ_SMS
android.permission.RECEIVE_WAP_PUSH
android.permission.RECEIVE_MMS
android.permission.RECEIVE_SMS
android.permission.SEND_SMS
android.permission.READ_CELL_BROADCASTS

// STORAGE 存储权限
android.permission.READ_EXTERNAL_STORAGE
android.permission.WRITE_EXTERNAL_STORAGE
```

## 普通权限

普通权限在清单文件配置（AndroidMenifest.xml）即可使用

```txt
ACCESS_LOCATION_EXTRA_COMMANDS 定位权限
ACCESS_NETWORK_STATE 网络状态权限
ACCESS_NOTIFICATION_POLICY 通知 APP通知显示在状态栏
ACCESS_WIFI_STATE WiFi状态权限
BLUETOOTH 使用蓝牙权限
BLUETOOTH_ADMIN 控制蓝牙开关
BROADCAST_STICKY 粘性广播
CHANGE_NETWORK_STATE 改变网络状态
CHANGE_WIFI_MULTICAST_STATE 改变WiFi多播状态，应该是控制手机热点（猜测）
CHANGE_WIFI_STATE 控制WiFi开关，改变WiFi状态
DISABLE_KEYGUARD 改变键盘为不可用
EXPAND_STATUS_BAR 扩展bar的状态
GET_PACKAGE_SIZE 获取应用安装包大小
INTERNET 网络权限
KILL_BACKGROUND_PROCESSES 杀死后台进程
MODIFY_AUDIO_SETTINGS 改变音频输出设置
NFC 支付
READ_SYNC_SETTINGS 获取手机设置信息
READ_SYNC_STATS 数据统计
RECEIVE_BOOT_COMPLETED 监听启动广播
REORDER_TASKS 创建新栈
REQUEST_INSTALL_PACKAGES 安装应用程序
SET_TIME_ZONE 允许应用程序设置系统时间区域
SET_WALLPAPER 设置壁纸
SET_WALLPAPER_HINTS 设置壁纸上的提示信息，个性化语言
TRANSMIT_IR 红外发射
USE_FINGERPRINT 指纹识别
VIBRATE 震动
WAKE_LOCK 锁屏
WRITE_SYNC_SETTINGS 改变设置
SET_ALARM 设置警告提示
INSTALL_SHORTCUT 创建快捷方式
UNINSTALL_SHORTCUT 删除快捷方式
```

## 动态申请

（1）在 AndroidMenifest.xml 清单文件中申请

```xml
<manifest>
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
</manifest>
```

（2）单个申请

```java
private void getPermission(String permission) {
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) { // 6.0之后
        if (ContextCompat.checkSelfPermission(_m, Manifest.permission.CAMERA)!= PackageManager.PERMISSION_GRANTED) { // 检查是否有权限
            ActivityCompat.requestPermissions(_m, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST_CODE); // 没有权限则申请
        }
    } else {
        // 6.0之前可以直接使用，无需申请
    }
}

getPermission(Manifest.permission.CAMERA); // 调用
```

（2）批量申请

```java
public static final int PERMISSION_REQUEST_CODE = 0x11; // 回调返回code
// 需要申请的权限列表
String[] permissionList = {
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.CAMERA,
        Manifest.permission.RECORD_AUDIO
};

public void getPermissions() {
    List<String> mPermissionList = new ArrayList<>();
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        for(int i = 0; i < permissionList.length; i++) {
            if (ContextCompat.checkSelfPermission(MainActivity.this, permissionList[i])!= PackageManager.PERMISSION_GRANTED) {
                // 没有权限则申请权限
                mPermissionList.add(permissionList[i]);
            }
        }
        if(mPermissionList.size() > 0) {
            ActivityCompat.requestPermissions(MainActivity.this, mPermissionList.toArray(new String[]{}), PERMISSION_REQUEST_CODE);
        }
    }
}
```

（3）回调处理

```java
@Override
public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    switch (requestCode){
        case PERMISSION_REQUEST_CODE:
            onRequestPermissionsCallback(grantResults);
            break;
    }
}

// 回调
public void onRequestPermissionsCallback() {
  boolean hasPermissionDismiss = false; // 有权限没有通过
  for (int i = 0; i < grantResults.length; i++) {
      if (grantResults[i] == -1) {
          hasPermissionDismiss = true;
      }
  }
  // 如果有权限没有被允许
  if (hasPermissionDismiss) {
      showPermissionDialog(); // 跳转到系统设置权限页面，或者直接关闭页面，不让他继续访问
  } else {
      // 全部权限通过，可以进行下一步操作。。。
  }
}

AlertDialog mPermissionDialog;
private void showPermissionDialog() {
    if (mPermissionDialog == null) {
        mPermissionDialog = new AlertDialog.Builder(MainActivity.this)
                .setMessage("已禁用权限，请手动授予")
                .setPositiveButton("设置", (dialog, which) -> {
                    cancelPermissionDialog();
                    Intent intent =  new Intent(Settings.ACTION_SETTINGS);
                    startActivity(intent);
                })
                .setNegativeButton("取消", (dialog, which) -> {
                    //关闭页面或者做其他操作
                    cancelPermissionDialog();
                })
                .create();
    }
    mPermissionDialog.show();
}

//关闭对话框
private void cancelPermissionDialog() {
    mPermissionDialog.cancel();
}
```