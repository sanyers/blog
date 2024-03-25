# docker部署discuz

```bash
sudo docker search discuz
sudo docker pull tencentci/discuz

sudo docker run --name discuz -d -p 8080:80 --restart always tencentci/discuz
# 挂载目录
sudo docker run --name discuz -d -p 8080:80 --restart always -v /home/sanyer/docker/discuz:/var/www/html tencentci/discuz
```

Discuz!X3.5全新安装如果出现：MySQL version must be 5.5.3 or greater，您的数据库可能innodb性能不佳，请调高php超时时间

修改代码 `/install/include/install_mysqli.php`

```php
		$this->link = new mysqli();
		if(!$this->link->real_connect($dbhost, $dbuser, $dbpw, $dbname, null, null, MYSQLI_CLIENT_COMPRESS)) {
			$this->halt('Can not connect to MySQL server');
		}

        # 注释下面三行
		#if ($this->version() < '5.5.3') {
		#	$this->halt('MySQL version must be 5.5.3 or greater');
		#}

		if($dbcharset) {
			$this->link->set_charset($dbcharset);
		}

		$this->link->query("SET sql_mode=''");

```