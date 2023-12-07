# node 对接 onvif 协议

`npm i node-onvif`

## 1、基本使用

参考：[node-onvif](https://github.com/GuilhermeC18/node-onvif)

```js
const onvif = require('node-onvif');

console.log('Start the discovery process.');
// Find the ONVIF network cameras.
// It will take about 3 seconds.
onvif
  .startProbe()
  .then(device_info_list => {
    console.log(device_info_list.length + ' devices were found.');
    // Show the device name and the URL of the end point.
    device_info_list.forEach(info => {
      console.log(info);
      console.log('- ' + info.urn);
      console.log('  - ' + info.name);
      console.log('  - ' + info.xaddrs[0]);
      const odevice = new onvif.OnvifDevice({
        xaddr: info.xaddrs[0],
      });
      console.log('  - ' + odevice.address);
    });
  })
  .catch(error => {
    console.error(error);
  });
```

## 2、多网卡局域网搜索

修改源码里面 `./node_modules/node-onvif/lib/node-onvif.js` 文件

```js
Onvif.prototype.startProbe = function(ip) { // 修改参数 ip
    ...
    this._udp.bind(() => {
        ip&&this._udp.setMulticastInterface(ip) // 添加这一行
    })

    return promise; // 最后直接返回
}

// 新增方法
const getNetWork = () => {
	const data = []
	const netlist = os.networkInterfaces()
	for (const key in netlist) {
		const item = netlist[key]
		if (item && item.length > 1) {
		item.forEach(element => {
			if (element.family === 'IPv4' && !element.internal) {
				data.push(element.address)
			}
		})
		}
	}
	return data
}

// 新增方法
Onvif.prototype.startProbes = async function() {
	const net = getNetWork()
	const all = []
	let errs = ''
	for(let item of net) {
		try{
			const list = await this.startProbe(item)
			all.push(...list)
		}catch(e){
			errs+=e.toString()
		}
	}
	return all.length?all:(errs?Promise.reject(errs):[])
}
```

使用时调用 `onvif.startProbe()` 方法即可

## 3、Onvif登录海康、大华摄像机（IPC）提示权鉴失败的问题解决

登录海康摄像机 web 后台，选择 `网络` => `高级配置` => `集成协议` => `启动 onvif（启用开放型网络视频接口）` => 添加一个管理员用户

