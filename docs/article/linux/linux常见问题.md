# linux常见问题


## 1、Linux:ln: 无法创建符号链接‘/usr/local/bin/node‘: 文件已存在

```sh
cd /usr/local/bin/
rm -rf node
# 重新建立连接
```