# ffmpeg 推拉流示例

## 1、所需工具

- 视频资源(本地.mp4文件)
- [RTSP Server](https://github.com/aler9/mediamtx/releases)
- [VLC](https://www.videolan.org/vlc/)
- [ffmpeg](https://ffmpeg.org/download.html)

## 2、启动 RTSP Server

配置相关端口打开 .yml 文件

windows 直接双击运行 mediamtx.exe，如果闪退可以在 exe 所在的目录打开 cmd，然后将 exe 拖入cmd，回车即可看到错误输出

建议使用 cmd 方式打开 exe，以便查看日志输出

## 3、FFmpeg 推流 mp4 文件

`ffmpeg -re -stream_loop -1 -i about.mp4  -c copy -f rtsp rtsp://127.0.0.1:8554/test`

## 4、FFmpeg 推流摄像头和麦克风

### 4.1 查看本机音视频设备名称

`ffmpeg -list_devices true -f dshow -i dummy`

```
[dshow @ 00000279bbd793c0] "BisonCam,NB Pro" (video)
[dshow @ 00000279bbd793c0]   Alternative name "@device_pnp_\\?\usb#vid_5986&pid_9102&mi_00#6&30373497&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global"
[dshow @ 00000279bbd793c0] "Microphone (High Definition Audio Device)" (audio)
[dshow @ 00000279bbd793c0]   Alternative name "@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{8C0DACC9-3621-403C-9557-56E11E68EEA3}"
dummy: Immediate exit requested
```


### 4.2 使用 ffmpeg 推流

`fmpeg -f dshow -i video="BisonCam,NB Pro":audio="Microphone (High Definition Audio Device)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -rtsp_transport tcp -f rtsp rtsp://127.0.0.1:8554/test`

注意：`video="摄像头名称":audio="麦克风名称`

## 5、拉流

参考 [node 实现 RTSP 在 web 中播放](../../web/node/10-node%E5%AE%9E%E7%8E%B0rtsp%E5%9C%A8web%E4%B8%AD%E6%92%AD%E6%94%BE.md)

## 6、参考

https://xie.infoq.cn/article/6e53403fa1c72bdfc247acc4f

https://www.jianshu.com/p/d541b317f71c

https://www.cnblogs.com/g2thend/p/13385438.html

https://www.cnblogs.com/badaoliumangqizhi/p/17211019.html

https://www.cnblogs.com/savorboard/p/webrtc-rtsp.html