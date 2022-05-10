# android日期格式与时间戳

在 Android 开发过程中，经常会遇到日期的各种格式转换，主要使用 `SimpleDateFormat` 这个类来实现，掌握了这个类，可以转换任何你想要的各种格式。

常见的日期格式：

- `String dateString = "2017-06-20 10:30:30"` 对应的格式：`String pattern = "yyyy-MM-dd HH:mm:ss";`
- `String dateString = "2017-06-20"` 对应的格式：`String pattern = "yyyy-MM-dd";`
- `String dateString = "2017年06月20日 10时30分30秒"` 对应的格式：`String pattern = "yyyy年MM月dd日 HH时mm分ss秒";`
- `String dateString = "2017年06月20日"` 对应的格式：`String pattern = "yyyy年MM月dd日";`

下面是几种情况(其中 pattern 根据上面的选择，如果需要其他的格式，自己去网上查吧)

## 1、获取系统时间戳

```java
public long getCurTimeLong() {
  long time = System.currentTimeMillis();
  return time;
}
```

## 2、获取当前时间

```java
public String getCurDate(String pattern) {
  SimpleDateFormat sDateFormat = new SimpleDateFormat(pattern);
  return sDateFormat.format(new java.util.Date());
}
```

## 3、时间戳转换成字符串

```java
public String getDateToString(long milSecond, String pattern) {
  Date date = new Date(milSecond);
  SimpleDateFormat format = new SimpleDateFormat(pattern);
  return format.format(date);
}
```

## 4、将字符串转为时间戳

```java
public long getStringToDate(String dateString, String pattern) {
  SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
  Date date = new Date();
  try {
    date = dateFormat.parse(dateString);
  } catch(ParseException e) {
    e.printStackTrace();
  }
  return date.getTime();
}
```

## 5、参考

https://blog.csdn.net/weixin_35291771/article/details/117312537