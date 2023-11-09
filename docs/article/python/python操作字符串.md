# python操作字符串

## 1、split

通过指定分隔符对字符串进行切片

`str.split(str="", num=string.count(str))`

参数：

- `str` 分隔符，默认为所有的空字符，包括空格、换行(\n)、制表符(\t)等。
- `num` 分割次数。默认为 -1, 即分隔所有。

## 2、join

用于将序列中的元素以指定的字符连接生成一个新的字符串

`str.join(sequence)`

```py
#!/usr/bin/python
 
symbol = "-"
seq = ("a", "b", "c"); # 字符串序列
print symbol.join( seq )
```

## 3、strip

移除字符串头尾指定的字符（默认为空格或换行符）或字符序列

注意：该方法只能删除开头或是结尾的字符，不能删除中间部分的字符。

`str.strip([chars])`

```py
str1 = "00000003210test01230000000"
print str1.strip( '0' ) # 去除首尾字符 0
# 3210test0123

str2 = "   tests      " # 去除首尾空格
print str2.strip()
# tests

str3 = "123abcdef321"
print str3.strip()
# 3abcdef3
```

## 4、replace

把字符串中的 old（旧字符串） 替换成 new(新字符串)，如果指定第三个参数max，则替换不超过 max 次

`str.replace(old, new[, max])`

参数：

- old 将被替换的子字符串。
- new 新字符串，用于替换old子字符串。
- max 可选字符串, 替换不超过 max 次

```py
str = "this is string example....wow!!! this is really string"
print str.replace("is", "was")
print str.replace("is", "was", 3)

# thwas was string example....wow!!! thwas was really string
# thwas was string example....wow!!! thwas is really string
```

## 5、count

用于统计字符串里某个字符或子字符串出现的次数。可选参数为在字符串搜索的开始与结束位置

`str.count(sub, start= 0,end=len(string))`

参数：

- sub 搜索的子字符串
- start 字符串开始搜索的位置。默认为第一个字符,第一个字符索引值为0。
- end 字符串中结束搜索的位置。字符中第一个字符的索引为 0。默认为字符串的最后一个位置。

该方法返回子字符串在字符串中出现的次数。

```py
str = "this is string example....wow!!!"
 
sub = "i"
print "str.count(sub, 4, 40) : ", str.count(sub, 4, 40) # 2
sub = "wow"
print "str.count(sub) : ", str.count(sub) # 1
```

## 6、encode

以 encoding 指定的编码格式编码字符串。errors参数可以指定不同的错误处理方案。

`str.encode(encoding='UTF-8',errors='strict')`

参数：

- encoding -- 要使用的编码，如"UTF-8"。
- errors -- 设置不同错误的处理方案。默认为 'strict',意为编码错误引起一个UnicodeError。 其他可能得值有 'ignore', 'replace', 'xmlcharrefreplace', 'backslashreplace' 以及通过 codecs.register_error() 注册的任何值。

```py
str = "this is string example....wow!!!"

print "Encoded String: " + str.encode('base64','strict')
# Encoded String: dGhpcyBpcyBzdHJpbmcgZXhhbXBsZS4uLi53b3chISE=
```

## 7、decode

以 encoding 指定的编码格式编码字符串。errors参数可以指定不同的错误处理方案。

`str.encode(encoding='UTF-8',errors='strict')`

参数：

- encoding -- 要使用的编码，如"UTF-8"。
- errors -- 设置不同错误的处理方案。默认为 'strict',意为编码错误引起一个UnicodeError。 其他可能得值有 'ignore', 'replace', 'xmlcharrefreplace', 'backslashreplace' 以及通过 codecs.register_error() 注册的任何值。

该方法返回编码后的字符串。

```py
str.decode('utf-8'，'ignore')
```

## 常见问题

### UnicodeDecodeError: ‘utf-8’ codec can’t decode...

出现异常报错是由于 decode() 方法的第二个参数 errors 的默认值为严格（strict）形式造成的，将其更改为（ignore）

找到报错的那一行代码，`r = r.decode('utf-8')`，然后将这行代码改成 `r = r.decode('utf-8'，'ignore')`，保存代码重新运行即可。