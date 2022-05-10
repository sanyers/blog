# android 打包多个 apk

## 1、配置 gradle 文件

> ./app/build.gradle

```conf
android {
  defaultConfig {
    flavorDimensions "default"
  }
  // 多应用打包
  productFlavors {
      // 默认
      defaults {
          manifestPlaceholders = [app_name:"默认名称",app_icon:"@mipmap/ic_launcher"]
          applicationId "com.example.xxx.defaults"
          // 设置 resValue 环境变量
          resValue("string","product_value","defaults")
      }

      test1 {
          manifestPlaceholders = [app_name:"名称1",app_icon:"@mipmap/ic_launcher1"]
          applicationId "com.example.xxx.test1"
          resValue("string","product_value","test1");
      }

      test2 {
          manifestPlaceholders = [app_name:"名称2",app_icon:"@mipmap/ic_launcher2"]
          applicationId "com.example.xxx.test2"
          resValue("string","product_value","test2")
      }
  }

  // 打包不检查错误
  lintOptions {
      checkReleaseBuilds false
      abortOnError false
  }
}
```

## 2、配置 AndroidManifest.xml

`android:authorities` 设置为唯一

```xml
<application
  android:icon="${app_icon}"
  android:label="${app_name}">
  <provider
      android:name="androidx.core.content.FileProvider"
      android:authorities="${applicationId}.fileProvider"
      android:exported="false"
      android:grantUriPermissions="true">
      <meta-data
          android:name="android.support.FILE_PROVIDER_PATHS"
          android:resource="@xml/file_paths"/>
  </provider>
</application>
```

## 3、注释或删除 strings.xml

> ./app/src/main/res/values/strings.xml

```xml
<resources>
<!--    <string name="app_name">xxx</string>-->
</resources>
```

## 4、导入多个图标

可使用 [iconfont](https://www.iconfont.cn/home/index) 图标下载透明 png 图标，使用 Image Asset 导入图标

> 选中 res 目录右键 -> New -> Image Asset -> Foreground Layer(配置前景图标) -> Background Layer(配置背景颜色) -> Next

## 5、在代码中获取版本数据

```java
// 获取 resValue
String product_value = getResources().getString(R.string.product_value);

// 判断版本
if(BuildConfig.FLAVOR.equals("defaults")) {
  // ...
}
```

## 6、生成 apk

> Build -> Generate Signed Bundle or APK -> APK -> 选择多个 Debug - Finish