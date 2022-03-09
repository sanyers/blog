# android跳转系统页面

1、系统的辅助功能界面：

```java
Intent intent =  new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);  
startActivity(intent);
```

2、显示添加帐户创建一个新的帐户屏幕：

```java
Intent intent =  new Intent(Settings.ACTION_ADD_ACCOUNT);  
startActivity(intent);
```

3、飞行模式：

```java
Intent intent =  new Intent(Settings.ACTION_AIRPLANE_MODE_SETTINGS);  
startActivity(intent);
```

4、无线网和网络设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_WIRELESS_SETTINGS);  
startActivity(intent);
```

5、APN设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_APN_SETTINGS);  
startActivity(intent);
```

6、根据包名跳转到系统自带的应用程序信息界面：

```java
Uri packageURI = Uri.parse("package:" + "com.xxx.xxx");
Intent intent =  new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageURI);  
startActivity(intent);
```

7、跳转开发人员选项界面：

```java
Intent intent =  new Intent(Settings.ACTION_APPLICATION_DEVELOPMENT_SETTINGS);  
startActivity(intent);
```

8、跳转应用程序列表界面：

```java
Intent intent =  new Intent(Settings.ACTION_APPLICATION_SETTINGS);  
startActivity(intent);

// 所有的
Intent intent =  new Intent(Settings.ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS);  
startActivity(intent);

// 已安装
Intent intent =  new Intent(Settings.ACTION_MANAGE_APPLICATIONS_SETTINGS);  
startActivity(intent);
```

9、跳转蓝牙设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);  
startActivity(intent);
```

10、跳转到移动网络设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_DATA_ROAMING_SETTINGS);  
startActivity(intent);
```

11、跳转日期时间设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_DATE_SETTINGS);  
startActivity(intent);
```

12、跳转手机状态界面：

```java
Intent intent =  new Intent(Settings.ACTION_DEVICE_INFO_SETTINGS);  
startActivity(intent);
```

13、跳转语言和输入设备：

```java
Intent intent =  new Intent(Settings.ACTION_INPUT_METHOD_SETTINGS);  
startActivity(intent);
```

14、跳转存储设置界面：

```java
// 内部存储
Intent intent =  new Intent(Settings.ACTION_INTERNAL_STORAGE_SETTINGS);  
startActivity(intent);

// 记忆卡存储
Intent intent =  new Intent(Settings.ACTION_MEMORY_CARD_SETTINGS);  
startActivity(intent);
```

15、设置选择网络运营商：

```java
Intent intent =  new Intent(Settings.ACTION_NETWORK_OPERATOR_SETTINGS);  
startActivity(intent);
```

16、显示NFC共享设置：

```java
Intent intent =  new Intent(Settings.ACTION_NFCSHARING_SETTINGS);  
startActivity(intent);
```

17、跳转到设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_SETTINGS);  
startActivity(intent);
```

18、跳转到声音设置界面：

```java
Intent intent =  new Intent(Settings.ACTION_SOUND_SETTINGS);  
startActivity(intent);
```

19、跳转到Wifi列表设置：

```java
Intent intent =  new Intent(Settings.ACTION_WIFI_SETTINGS);  
startActivity(intent);
```

20、跳转到IP设定界面：

```java
Intent intent =  new Intent(Settings.ACTION_WIFI_IP_SETTINGS);  
startActivity(intent);
```