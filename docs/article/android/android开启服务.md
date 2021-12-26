# android 开启服务

开启服务有两种方式：`startService` 和 `bindService`。

首先在 `AndroidManifest.xml` 文件中声明

```xml
<service android:name=".MyService"/>
```

## `startService` 方式

```java
public class MyService extends Service {
    private static String TAG = "MyService";
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.i(TAG, "onBind");
        return null;
    }
 
    @Override
    public void onCreate() {
        Log.i(TAG, "onCreate");
        super.onCreate();
    }
 
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i(TAG, "onStartCommand");
        return super.onStartCommand(intent, flags, startId);
    }
 
    @Override
    public void onDestroy() {
        Log.i(TAG, "onDestroy");
        super.onDestroy();
    }
}
```

启动服务：

```java
//开启服务
Intent service = new Intent(this, MyService.class);
startService(service);

//结束服务
stopService(service);
```

开启服务时，调用一次 `startService()`，生命周期执行的方法依次是：`onCreate() ==> onStartCommand();`

调用多次 `startService()`，`onCreate()` 只有第一次会被执行，而 `onStartCommand()` 会执行多次。

## `bindService` 方式

该方式需要一个 `ServiceConnection` 接口的实现类对象

`MyServiceConnection.java`:

```java
public class MyServiceConnection implements ServiceConnection {
    private static String TAG = "MyServiceConnection";
    private MyService.MyBinder myBinder = null;

    // 连接初始化
    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        myBinder = (MyService.MyBinder) service;
        myBinder.setMethod1('xxx');
    }

    // 方法1-自定义方法
    public void setMethod1(String str) {
        myBinder.setMethod1(str);
    }

    // 方法2
    public void setMethod2() {
        myBinder.setMethod2();
    }

    // 连接错误
    @Override
    public void onServiceDisconnected(ComponentName name) {
        Log.e(TAG,"onServiceDisconnected");
    }
}
```

`MyService.java`:

```java
public class MyService extends Service {
    private static String TAG = "MyService";
    private MyBinder myBinder = new MyBinder();

    @Override
    public IBinder onBind(Intent intent) {
        return myBinder;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    MainActivity _m = null;
    Boolean screening = false;
    public class MyBinder extends Binder {
        public void setMethod1(String str) {
            // 方法1执行代码
        }

        public void setMethod2() {
            // 方法2执行代码
        }
    }

    @Override
    public void onDestroy() {
        Log.i(TAG,"destroy");
        super.onDestroy();
    }
}
```

启动服务：

```java
// 开启服务
Intent intent = new Intent(this, MyService.class);
MyServiceConnection conn = new MyServiceConnection();
bindService(intent, conn, BIND_AUTO_CREATE);

// 关闭服务
unbindService(conn);
conn = null;
```

`bindService` 开启服务，生命周期执行的方法依次是：

`onCreate() ==> onBind() ==> onServiceConnected();`

调用多次 `bindService()`，`onCreate()` 和 `onBind()` 都只在第一次会被执行，`onServiceConnected()` 会执行多次。