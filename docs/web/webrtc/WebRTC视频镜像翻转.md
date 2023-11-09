# WebRTC 视频镜像翻转

## 1、视频镜像说明

相机拍摄出的真实相片和镜像相片是不同的

iphone 的系统相机的自拍结果通常会让人觉得别扭 因为拍摄出的真实相片

而几乎所有的自拍相机的自拍结果都是镜像的 通常用户觉得镜像的自拍图像更好看

iOS 和 Android 平台的视频翻转：

由于采集视频时并没有镜像图像 所以无论是 local stream 还是 remote stream

视频图像看上去都是反向的(此时是真实镜像)

为了视觉上看上去自然 需要对视频进行水平翻转

## 2、iOS 视频镜像翻转

WebRTC iOS 提供 RTCEAGLVideoView 作为视频的渲染接口 RTCEAGLVideoView 继承了 UIView

镜像翻转的方法很简单 UIView 即提供了镜像属性

```
self.LocalView.transform = CGAffineTransformMakeScale(-1.0, 1.0);
```

## 3、Android 视频镜像翻转

WebRTC Android 提供了 VideoRenderGui 作为视频渲染接口

```java
// VideoRenderGui的update接口提供了镜像参数 设置为true则渲染时镜像翻转
public static void update(Callbacks renderer, int x, int y, int width, int height, VideoRendererGui.ScalingType scalingType, boolean mirror)
```

## 4、web 视频镜像翻转

使用 css 属性即可

```css
#video {
  transform: rotateY(180deg);
}
```


参考：

https://www.jianshu.com/p/9b054c4f12f2