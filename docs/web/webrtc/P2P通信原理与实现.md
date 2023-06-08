# P2P通信原理与实现

## 1、NAT网络

### 1.1 防火墙（Firewall）

防火墙主要限制内网和公网的通讯，通常丢弃未经许可的数据包。防火墙会检测(但是不修改)试图进入内网数据包的IP地址和TCP/UDP端口信息。

### 1.2 NAT工作原理

将IP数据报文中的IP地址转换为另一个IP地址的过程。当内部IP想要访问外网时，NAT主要实现内部网络和外部网络之间IP的转换，这种通过使用少量的公网IP地址代表较多的私网IP地址的方式，将有助于减缓可用IP地址空间的枯竭。

### 1.3 NAT分类

1. 基本NAT(Basic NAT)

基本NAT会将内网主机的IP地址映射为一个公网IP，不改变其TCP/UDP端口号。基本NAT通常只有在当NAT有公网IP池的时候才有用。

2. 网络地址-端口转换器(NAPT)

到目前为止最常见的即为NAPT，其检测并修改出入数据包的IP地址和端口号，从而允许多个内网主机同时共享一个公网IP地址。

- **Full Cone NAT(完全锥型)**
    在一个新会话建立了公网/内网端口绑定之后,完全圆锥形NAT接下来会接受对应公网端口的所有数据,无论是来自哪个（公网）终端. 完全圆锥形NAT有时候也被称为“混杂”NAT（promiscuous NAT）。
- **Address Restricted Cone NAT(地址限制锥型 )**
    地址限制圆锥形NAT只会转发符合某个条件的输入数据包. 条件为：外部（源）IP地址匹配内网主机之前发送一个或多个数据包的结点的IP地址，NAT通过限制输入数据包为一组“已知的”外部IP地址,有效地精简了防火墙的规则。
- **Port Restricted Cone NAT(端口限制锥型)**
    只当外部数据包的IP地址和端口号都匹配内网主机发送过的地址和端口号时才进行转发。端口限制圆锥型NAT为内部结点提供了和对称NAT相同等级的保护，以隔离未关联的数据。
- **Symmetric NAT(对称型)**
    不在所有公网-内网对的会话中维持一个固定的端口绑定，其为每个新的会话开辟一个新的端口。

<div class="img-page">
<a data-fancybox title="NAT分类" href="/blog/img/web/webrtc/2/1.png"><img :src="$withBase('/img/web/webrtc/2/1.png')" alt="NAT分类"></a>
</div>

部署在路由器上的NAT：

<div class="img-page">
<a data-fancybox title="NAT网络" href="/blog/img/web/webrtc/2/2.png"><img :src="$withBase('/img/web/webrtc/2/2.png')" alt="NAT网络"></a>
</div>

**NAT对比：**

<div class="img-page">
<a data-fancybox title="NAT对比" href="/blog/img/web/webrtc/2/3.png"><img :src="$withBase('/img/web/webrtc/2/3.png')" alt="NAT对比"></a>
</div>

**不同NAT之间打洞对比：**

<div class="img-page">
<a data-fancybox title="打洞对比" href="/blog/img/web/webrtc/2/4.png"><img :src="$withBase('/img/web/webrtc/2/4.png')" alt="打洞对比"></a>
</div>

## 2、P2P通讯技术

**对等式网络**（英语：peer-to-peer， 简称**P2P**），又称**点对点技术**，是去中心化、依靠用户群（peers）交换信息的互联网体系，它的作用在于，减低以往网路传输中的节点，以降低资料遗失的风险。与有中心服务器的中央网络系统不同，对等网络的每个用户端既是一个节点，也有服务器的功能，任何一个节点无法直接找到其他节点，必须依靠其户群进行信息交流。

<div class="img-page">
<a data-fancybox title="对等网络" href="/blog/img/web/webrtc/2/5.png"><img :src="$withBase('/img/web/webrtc/2/5.png')" alt="对等网络"></a>
</div>

### 2.1 P2P直接通讯

<div class="img-page">
<a data-fancybox title="局域网&公网" href="/blog/img/web/webrtc/2/6.png"><img :src="$withBase('/img/web/webrtc/2/6.png')" alt="局域网&公网"></a>
</div>

<div class="img-page">
<a data-fancybox title="端口映射" href="/blog/img/web/webrtc/2/7.png"><img :src="$withBase('/img/web/webrtc/2/7.png')" alt="端口映射"></a>
</div>

### 2.2 P2P穿透

- **STUN/TURN方式**
    IETF定义的一种UDP穿透规范，最为普遍。
- **ICE**
    包括ALG,STUN,TURN等各种穿透方式的组合。

<div class="img-page">
<a data-fancybox title="P2P" href="/blog/img/web/webrtc/2/8.png"><img :src="$withBase('/img/web/webrtc/2/8.png')" alt="P2P"></a>
</div>

### 2.3 第三方P2P穿透

花生壳内网穿透：优先打洞 -> 服务器转发(流量限制)

## 3、参考

https://evilpan.com/2015/10/31/p2p-over-middle-box/

https://juejin.cn/post/6844904098572009485

https://developer.aliyun.com/article/243478

https://blog.csdn.net/Vikanill/article/details/95023859

https://blog.csdn.net/D3_3109/article/details/119875626

https://blog.csdn.net/wgl307293845/article/details/120450626

https://zhuanlan.zhihu.com/p/299524798

https://zhuanlan.zhihu.com/p/108635427

https://blog.csdn.net/lisemi/article/details/97672734

https://zhuanlan.zhihu.com/p/510428478

https://www.cdnbye.com/cn/views/

https://blog.csdn.net/shaosunrise/article/details/83627828

https://zhuanlan.zhihu.com/p/468792680

https://zhuanlan.zhihu.com/p/71025431