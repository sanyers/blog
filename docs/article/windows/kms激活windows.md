# kms激活windows

使用 kms 激活服务器激活 windows 和 office 是微软提供的激活方式之一。kms 激活服务器普遍由个人或企业负责搭建。

kms 激活工具是一款功能强大的 windows 和 office 激活工具，支持离线一键自动激活 win10、win8、win7 以及 office2010、2013、2016、2019 等版本。

## 1、使用第三方 kms 激活服务器

```
zh.us.to

kms.03k.org

kms.chinancce.com

kms.shuax.com

kms.dwhd.org

kms.luody.info

kms.digiboy.ir

kms.lotro.cc

www.zgbs.cc

cy2617.jios.org
```

## 2、自建 kms 激活服务器

使用开源软件 [py-kms](https://github.com/SystemRage/py-kms)

docker 安装：

`docker run -d --restart always -p 1688:1688 pykmsorg/py-kms`

其他[安装方式](https://py-kms.readthedocs.io/en/latest/Getting%20Started.html)

## 3、许可证密钥

在[GLVK Keys](https://py-kms.readthedocs.io/en/latest/Keys.html)查询自己需要的许可证密钥

Windows 10 & Windows 11

专业版： `W269N-WFGWX-YVC9B-4J6C9-T83GX`

家庭版：`7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH`

企业版：

```
NPPR9-FWDCX-D2C8J-H872K-2YT43
96YNV-9X4RP-2YYKB-RMQH4-6Q72D
TN6CM-KCVXP-VVP8X-YVCF7-R9BDH
3PMKQ-YNVGT-HFJGG-2F4FQ-9D6T7
```

## 4、命令激活

```sh
# 1、打开 CMD 命令行，以管理员身份运行

# 2、卸载产品密钥
slmgr.vbs /upk # 稍等片刻会提示：“已成功卸载了产品密钥”

# 3、安装产品密钥
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX # 稍等片刻会提示：“成功的安装了产品密钥”；

# 4、设置 kms 服务器地址
# 如果是自建的服务器，可输入自建服务器的ip地址或域名（注意，如果使用阿里云或腾讯云要开启1688端口）
slmgr /skms kms.03k.org # 稍等片刻会提示：“密钥管理服务计算机名成功的设置为kms.03k.org

# 5、开启自动激活
slmgr /ato # 稍等片刻会提示：“成功的激活了产品”
```

## 参考

https://www.cnblogs.com/szyx/p/16672768.html#/c/subject/p/16672768.html

https://github.com/SystemRage/py-kms

https://blog.futrime.com/zh-cn/p/%E8%87%AA%E5%BB%BAkms%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%BF%80%E6%B4%BBwindows/

https://py-kms.readthedocs.io/en/latest/Documentation.html
