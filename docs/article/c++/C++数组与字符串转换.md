# C++数组与字符串转换

```c++
# include <iostream>
# include <fstream>
# include <string>
# include <time.h>
# include <stdio.h>
# include <stdlib.h>
using namespace std;

//字符串转16进制字符串,适用于所有字符（包括中文）
std::string encodeHexString(const std::string& str) {
	// 根据默认编码获取字节数组
	const std::string hexString = "0123456789abcdef";
	string sb;
	// 将字节数组中每个字节拆解成2位16进制整数
	for (int i = 0; i < str.length(); i++) {
		sb += hexString.at((str[i] & 0xf0) >> 4);
		sb += hexString.at((str[i] & 0x0f) >> 0);
	}
	return sb;
}

//16进制字符串转字符串
std::string hexStringToString(const std::string& hexStr)
{
	std::string ret;
	const std::string hexString = "0123456789abcdef";
	// 将每2位16进制整数组装成一个字节
	for (int i = 0; i < hexStr.length(); i += 2)
		ret += BYTE(hexString.find(hexStr.at(i)) << 4 | hexString.find(hexStr.at(i + 1)));
	return ret;
}

//字节数组转16进制字符串
std::string bytesToHexString(const BYTE* bytes, const int length)
{
	if (bytes == NULL) {
		return "";
	}
	std::string buff;
	const int len = length;
	for (int j = 0; j < len; j++) {
		int high = bytes[j] / 16, low = bytes[j] % 16;
		buff += (high < 10) ? ('0' + high) : ('a' + high - 10);
		buff += (low < 10) ? ('0' + low) : ('a' + low - 10);
	}
	return buff;
}

//16进制字符串 转 字节数组
void hexStringToBytes(const std::string& hex, BYTE* bytes)
{
	int bytelen = hex.length() / 2;
	std::string strByte;
	unsigned int n;
	for (int i = 0; i < bytelen; i++)
	{
		strByte = hex.substr(i * 2, 2);
		sscanf_s(strByte.c_str(), "%x", &n);
		bytes[i] = n;
	}
}
```

使用示例：

```c++
  unsigned char out[300] = { 0 };
  hexStringToBytes("1122003344", out);
  std::cout << bytesToHexString(out, 5) << std::endl;
  std::cout << hexStringToString("323334") << std::endl;
  std::cout << encodeHexString("323334") << std::endl;
```

