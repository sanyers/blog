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

卸载：

```sh
sudo npm uninstall npm -g
sudo apt-get remove --purge npm
sudo apt autoremove
whereis npm

sudo apt-get remove nodejs
sudo apt remove npm
sudo apt autoremove
whereis node
```

## 2、ubuntu 20.04 安装（更新）

```sh
# 1. Download and import the Nodesource GPG key
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# 2. Create deb repository
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

NODE_MAJOR=16
NODE_MAJOR=18
NODE_MAJOR=20

# 3. Run Update and Install
sudo apt-get update
sudo apt-get install nodejs -y
```

卸载：

```sh
apt-get purge nodejs &&\
rm -r /etc/apt/sources.list.d/nodesource.list &&\
rm -r /etc/apt/keyrings/nodesource.gpg
```