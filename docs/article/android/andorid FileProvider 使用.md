# Android FileProvider 的使用

## 1、前言

从 Android N（7.0） 开始，将严格执行 StrictMode 模式。而从 Android N 开始，将不允许在 App 间，使用 `file://` 的方式，传递一个 File ，否者会抛出 FileUriExposedException 的异常引发 Crash。解决方案就是通过 FileProvider 用 `content://` 代替 `file://`，需要开发者主动升级 targetSdkVersion 到 24 才会执行此策略。

## 2、读取目录

### 2.1 内部存储

每安装一个 App 系统都会在内部存储空间的 `data/data` 目录下以应用包名为名字自动创建与之对应的文件夹，这个文件夹用于持久化 App 中的 WebView 缓存页面信息、SharedPreferences、SQLiteDatabase 等应用相关数据。当用户卸载 App 时，系统自动删除 `data/data` 目录下对应包名的文件夹及其内容。

获取并操作**内部存储**空间中的**应用私有目录**的方法如下：

- `context.getFilesDir()`
- `context.getCacheDir()`
- `context.deleteFile()`
- `context.fileList()`
- `Environment.getDataDirectory()`

### 2.2 外部存储

考虑到普通用户无法访问应用的内部存储空间，比如用户想从应用里面保存一张图片，那么这张图片应该存储在外部存储空间，用户才能访问的到

外部存储空间路径为：`/storage/emulated/0/Android/data/<包名>`

外部存储分为**应用私有目录**和**公共目录**

（1）应用私有目录

默认情况下，系统并不会自动创建外部存储空间的应用私有目录。只有在应用需要的时候，开发人员通过 SDK 提供的 API 创建该目录文件夹和操作文件夹内容。

当用户卸载 App 时，系统也会自动删除外部存储空间下的对应 App 私有目录文件夹及其内容。

获取并操作**外部存储**空间中的**应用私有目录**的方法如下：

- `context.getExternalFilesDir()`
- `context.getExternalCacheDir()`
- `Environment.getExternalStorageDirectory()`

（2）公共目录

外部存储空间中的公共目录用来存放当应用被卸载时，仍然可以保存在设备中的信息，如：拍照类应用的图片文件，用户是使用浏览器手动下载的文件等。、

外部存储空间已经为用户默认分类出一些公共目录。开发人员可以通过 Environment 类提供的方法直接获取相应目录的绝对路径，传递不同的 type 参数类型即可：

- `Environment.getExternalStoragePublicDirectory(String type);`

Envinonment 类提供诸多 type 参数的常量，比如：

- DIRECTORY_MUSIC：/storage/emulated/0/Music
- DIRECTORY_MOVIES：/storage/emulated/0/Movies
- DIRECTORY_PICTURES：/storage/emulated/0/Pictures
- DIRECTORY_DOWNLOADS：/storage/emulated/0/Download

## 3、FileProvider

### 3.1 什么是 FileProvider

FileProvider 是 ContentProvider的子类 目前 support v4 包 和 androidx的core包里面都有提供。FileProvider 本质上就是一个 ContentProvider ，它其实也继承了 ContentProvider 的特性。其实ContentProvider 就是在可控的范围内，向外部其他的 App 分享数据。而 FileProvider 将这样的数据变成了一个 File 文件而已。

### 3.2 使用 FileProvider 的场景

在 App 内，通过一个 Intent 传递了一个 `file://` 的 Uri 的场景都需要使用 FileProvider ，如：

- 调用相机拍照
- 剪裁图片
- 调用系统安装器去安装 Apk

### 3.3 如何使用 FileProvider

（1）在 AndroidManifest.xml 中声明

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileProvider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths"/>
</provider>
```

可以看到，provider 标签下，配置了几个属性：

- `name`：配置当前 FileProvider 的实现类。
- `authorities`：配置一个 FileProvider 的名字，它在当前系统内需要是唯一值。
- `exported`：表示该 FileProvider 是否需要公开出去，传 false 表示不公开。
- `granUriPermissions`：是否允许授权文件的临时访问权限。传 true 表示需要 。

（2）指定可分享的文件路径

没有 xml 目录可自行创建

> src/main/res/xml/file_paths.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <!--支持本地路径-->
    <!--表示Environment.getExternalStorageDirectory() 指向的目录-->
    <external-path name="external_storage_root" path="." />

    <!--表示 content.getFileDir() 获取到的目录-->
    <files-path name="files-path" path="." />

    <!--表示 content.getCacheDir() 获取到的目录-->
    <cache-path name="cache-path" path="." />

    <!--表示 ContextCompat.getExternalFilesDirs() 获取到的目录-->
    <external-files-path name="external_file_path" path="." />

    <!--表示 ContextCompat.getExternalCacheDirs() 获取到的目录-->
    <external-cache-path name="external_cache_path" path="." />

    <!--支持根路径-->
    <root-path name="root_path" path="" />
</paths>
```

| TAG | Value | Path |
| :----: | :----: | :----: |
| TAG_ROOT_PATH | root-path | / |
| TAG_FILES_PATH | files-path | /data/data/<包名>/files |
| TAG_CACHE_PATH | cache-path | /data/data/<包名>/cache |
| TAG_EXTERNAL | external-path | /storage/emulate/0 |
| TAG_EXTERNAL_FILES | external-files-path | /storage/emulate/0/Android/data/<包名>/files |
| TAG_EXTERNAL_CACHE | external-cache-path | /storage/emulate/0/Android/data/<包名>/cache |

（3）将 file:// 转为 content://

使用 FileProvider.getUriForFile() 方法将 `file://` 转为 `content://`

```java
// File 转 Uri
private Uri getUriForFile(File file) {
    String packageName = getPackage(this).packageName;
    Uri contentUri = FileProvider.getUriForFile(this, packageName+".fileProvider", file);
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

## 4、参考

https://www.jianshu.com/p/c87ff5eda539