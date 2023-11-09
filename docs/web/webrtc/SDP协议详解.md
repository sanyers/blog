# SDP协议详解

- 会话描述
    - `v=` 协议版本(protocol version)，一般为0
    - `o=` 会话的创建者(owner/creator and session identifier)
    - `s=` 会话名(session name)
    - `t=` 会话时长(time the session is active)
- 媒体描述
    - 媒体信息
        - m= 媒体描述
        - a=ssrc
        - a=rtpmap
        - a=fmtp
    - 网络描述
        - c=
        - a=candidate
        - a=group:BUNDLE
        - a=rtcp-mux
        - a=sendrecv
        - a=ice-lite
        - a=ice-options
        - a=extmap
        - a=rtcp-resize
    - 安全描述
        - a=crypto
        - a=ice-ufrag
        - a=ice-pwd
        - a=fingerprint
        - a=setup
    - 服务质量
        - a=tcp-fb

通常SDP种包含两个媒体描述：

- 音频媒体描述
- 视频媒体描述

除了话描述是对整个SDP起约束作用外，各媒体描述之间的约束互不影响。

SDP的描述格式：

`<type> = <value>`

其中type描述描述的目标，它有单个字符组成；value是对type的解释或约束。

## 1、会话创建者

```
o=<username> <sess-id> <sess-version> <nettype> <addrtype> <unicast-address>
o=- 1954504395161900476 2 IN IP4 127.0.0.1
```

- o=字段给出了会话的发起者(用户名和用户的主机地址)加上会话标识符和版本数量
- username：用户登录是否在原始主机上，如果为-表示不支持用户id的概念，不能包含空格。
- sess-id：会话ID
- sess-version：会话的版本
- nettype：网络类型
- addrtype：地址类型，通常为IP4、IP6
- unicast-address：发起者的地址，webrtc中并不适用这个

## 参考

https://zhuanlan.zhihu.com/p/609950122