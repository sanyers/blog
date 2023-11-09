# python使用opencv摄像头拍照

```py
import cv2

# CSI 相机
def gstreamer_pipeline(
    sensor_id=0,
    width=1280,
    height=720,
    framerate=30,
    flip_method=0,
    ):
    return (
        "nvarguscamerasrc sensor-id=%d !"
        "video/x-raw(memory:NVMM), width=(int)%d, height=(int)%d, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id,
            width,
            height,
            framerate,
            flip_method,
            width,
            height,
            )
        )
camera = cv2.VideoCapture(gstreamer_pipeline(sensor_id=0),cv2.CAP_GSTREAMER)
if camera.isOpened():
    image = camera.read()
    cv2.imwrite("./test.jpg", image)

# USB 相机
camera = cv2.VideoCapture(0) # 0-9
image = camera.read()
cv2.imwrite("./test.jpg", image)

# 释放相机资源
camera.release()
```