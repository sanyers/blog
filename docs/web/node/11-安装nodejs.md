# 安装nodejs

## 1、ubuntu 20.04 安装

```sh
# 添加资源包
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -

# 安装nodejs
sudo apt-get install -y nodejs

# 安装pm2
npm i -g pm2

# 如果安装pm2失败，则更新npm
sudo npm i -g npm

# 再次执行
sudo npm i -g pm2
```