# vue cli 启动错误

## 1、events.js:291 错误

改错误可能是端口号占用或者websocket连接错误导致的

```
events.js:291
      throw er; // Unhandled 'error' event
      ^

Error: read ECONNRESET
    at TCP.onStreamRead (internal/stream_base_commons.js:209:20)
Emitted 'error' event on Socket instance at:
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: 'ECONNRESET',
  code: 'ECONNRESET',
  syscall: 'read'
}
```

解决方法：

1、关闭端口占用的进程并重启
2、检查接口访问是否正常
3、检查websocket连接是否正常