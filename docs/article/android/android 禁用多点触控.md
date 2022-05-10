# android 禁用多点触控

## 1、禁用全局多点触控

在 application 引用的 Theme 中添加以下代码：

```xml
<item name="android:windowEnableSplitTouch">false</item>
<item name="android:splitMotionEvents">false</item>
```

## 2、单独对某个界面禁用

需要在相应的 xml 中添加

```
android:splitMotionEvents="false"
```

或者：

```java
if (currentApiVersion >= android.os.Build.VERSION_CODES.HONEYCOMB) {
  rootLayout.setMotionEventSplittingEnabled(false);
  recyclerView.setMotionEventSplittingEnabled(false);
}
```

## 3、在 Activity 和 WebView 中禁用

重新 onTouchEvent 方法

```java
@Override
public boolean onTouchEvent(MotionEvent ev) {
    if(ev.getPointerCount() > 1) {
        return true;
    } else {
        return super.onTouchEvent(ev);
    }
}
```