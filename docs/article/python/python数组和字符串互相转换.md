# python数组和字符串互相转换

字符串转数组：

```py
str = '1,2,3'
arr = str.split(',')
```

数组转字符串：

```py
arr = ['a','b']
str = ','.join(arr)

arr = [1,2,3]
str = ','.join(str(i) for i in b)
```