# 内网穿透 ZeroTier

## 1、ZeroTier 概念

ZeroTier 是一款利用 UDP 打洞来实现内网穿透的工具，其基本工作原理是组建一个虚拟局域网，各个设备（NAS、Linux、Windows、Mac、iOS、Android）安装了客户端、加入到这个虚拟局域网后，就会自动分配一个 IP，从而实现局域网内各个设备及服务的相互访问。

ZeroTier 专有名词：

- `PLANET` 行星服务器，ZeroTier 官方根服务器，在国外。免费版最大支持 25 个设备连接。
- `MOON` 卫星服务器，私有根服务器，可以利用带有公网 IP 的云服务器自己搭建，起到代理加速的作用
- `LEAF` 网络客户端，连接到根服务器的网络节点，如上述提到的 NAS、群晖、Linux、Windows 等

通过 ZeroTier 官方根服务器建立虚拟局域网，优点是在没有自带公网 IP 的云服务器的情况下也可以异地组网，部署简单快捷，全地球都可以访问；缺点是：① 免费版允许连接的设备有限，最大 25 台，不过个人或小团队使用的话也够用了；② 数据不安全，毕竟是外国的服务器，一般没什么重要数据的情况下可以使用；③ 受网络波动影响，用网高峰期可能连接不稳定；

## 2、自建 ZeroTier Planet 行星服务器

[参考 1](https://github.com/Jonnyan404/zerotier-planet)

[参考 2](https://www.mrdoc.fun/doc/443/)

[参考 3](https://github.com/xubiaolin/docker-zerotier-planet)

### 2.1 必要条件

- 具有公网 ip 的服务器
- 安装 docker
- 安装 docker-compose
- 防火墙开放 TCP 端口 4000/9993/3180 和 UDP 端口 9993

### 2.2 安装

```bash
# 如果从window拉取可能会出现行尾序列CRLF自动转换，需要将patch.sh文件换行转换为LF格式
git clone https://github.com/Jonnyan404/zerotier-planet
OR
git clone https://gitee.com/Jonnyan404/zerotier-planet

cd zerotier-planet
# 修改 docker-compose.yml 文件的 MYADDR 改为服务器公网ip
vim docker-compose.yml

## 生成并启动docker
docker-compose up -d
# 以下步骤为创建planet和moon
docker cp mkmoonworld-x86_64 ztncui:/tmp
docker cp patch.sh ztncui:/tmp
docker exec -it ztncui bash /tmp/patch.sh
docker restart ztncui
```

然后浏览器访问 `http://ip:4000` 打开 web 控制台界面。

- 用户名:`admin`
- 密码:`mrdoc.fun`

登录之后，点击 `Add network` 添加一个网络，会自动生成网络 id

浏览器访问 `http://ip:3180` 打开 `planet` 和 `moon` 文件下载页面（亦可在项目根目录的 `./ztncui/etc/myfs/` 里获取）。

## 3、客户端使用

### 3.1 Windows 客户端

（1）首先去 ZeroTier 官网下载一个 [ZeroTier Windows 客户端](https://www.zerotier.com/download/)并安装

（2）将 `planet` 文件覆盖粘贴到 `C:\ProgramData\ZeroTier\One` 中(这个目录是个隐藏目录，需要运允许查看隐藏目录才行)

（3）Win+S 搜索 服务，找到 ZeroTier One，并且重启服务

（3）使用管理员身份打开 PowerShell 执行如下命令，看到 join ok 字样就成功了

```sh
PS C:\Windows\system32> zerotier-cli.bat join 网络id(就是在网页里面创建的那个网络)
200 join OK
PS C:\Windows\system32>
```

（4）登录管理后台看到新的客户端，勾选 Authorized 和 Active bridge

点击 `Easy setup` 设置虚拟网段

- 10.0.12.0/24（网络地址，Network address in CIDR notation）
- 10.0.12.1（起始IP，Start of IP assignment pool）
- 10.0.12.254（结束IP，End of IP assignment pool）

（5）查看连接状态

```bash
zerotier-cli.bat peers

200 peers
<ztaddr>   <ver>  <role> <lat> <link> <lastTX> <lastRX> <path>
fcbaeb9b6c 1.8.7  PLANET    52 DIRECT 16       8994     1.1.1.1/9993
fe92971aad 1.8.7  LEAF      14 DIRECT -1       4150     2.2.2.2/9993
```

可以看到有一个 PLANTET 和 LEAF 角色，连接方式均为 DIRECT(直连)，到这里就加入网络成功了

### 3.2 Linux 客户端

```bash
# 安装客户端
curl -s https://install.zerotier.com | sudo bash

# 复制替换 planet 文件
sudo rm -rf /var/lib/zerotier-one/planet
sudo cp ./planet /var/lib/zerotier-one/planet
# 设置 planet 文件访问权限
sudo chown -R zerotier-one: /var/lib/zerotier-one/planet
# 重启服务
sudo systemctl restart zerotier-one
# 加入网络
sudo zerotier-cli join f789667a224b2d15
```

### 3.3 安卓客户端

[ZerotierFix](https://github.com/kaaass/ZerotierFix)
[Zerotier 非官方安卓客户端发布：支持自建 Moon 节点 - V2EX](https://www.v2ex.com/t/768628)

## 4、访问局域网内其他节点

假设有场景 `公司总部 192.168.1.0` `公司分部A 192.168.12.0` `公司分部B 192.168.13.0`

访问场景1：`公司分部A` 需要访问 `公司总部`

- `公司总部` Z001 服务器安装 zerotier client，虚拟IP为 10.0.12.1
- `公司分部A` A001 服务器安装 zerotier client，虚拟IP为 10.0.12.2

### 4.1 设置路由转发

进入 zerotier 行星服务器后台 web 管理页，进入 routes，添加一条 route

Add new route:

- 192.168.1.0/24 (Target)
- 10.0.12.1（Gateway，via）

### 4.2 开启内核转发

```bash
vim /etc/sysctl.conf
net.ipv4.ip_forward = 1

sysctl -p
```

### 4.3 防火墙设置

```bash
iptables -I FORWARD -i ztxxxxxx -j ACCEPT
iptables -I FORWARD -o ztxxxxxx -j ACCEPT
iptables -t nat -I POSTROUTING -o ztxxxxxx -j MASQUERADE

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i ztxxxxxx -o eth0 -j ACCEPT

# 其中的 ztxxxxxx 在不同的机器中不一样，你可以在路由器 ssh 环境中用 zerotier-cli listnetworks 或者 ifconfig 查询 zt 开头的网卡名
iptables-save # 保存配置到文件,否则重启规则会丢失

# 客户端设置
sudo zerotier-cli set 网络id allowGlobal=1
sudo zerotier-cli set 网络id allowDefault=1
```

[ZeroTierOne](https://github.com/zerotier/ZeroTierOne)