# webpack基础知识

## 1、devServer 开启服务的地方

## 2、plugins

### 2.1 插件的调用

### 2.2 打包时间，清除上次打包等插件

## 3、module

### 3.1 配置加载规则

### 3.2 rule

### 3.3 noParse

## 4、resolve

### 4.1 extension 配置后可不必增加引用的扩展名，按照这个优先匹配
```
extensions
```

### 4.2 alias 配置别名

### 4.3 modules 指定默认配置项目

### 4.4 mainFields main字段的文件名来查找文件

### 4.5 mainFiles 当前目录没有package.json的时候。默认目录下的index.js

## 5、mode 当前调用模式

### 5.1 development

### 5.2 production

## 6、devtool

### 6.1 source-map

## 7、entry 项目入口

## 8、output 项目出口

## 9、enternal 去除不想打包的内容

## 10、resolveLoader 解析loader的路径

## 11、optimization 颗粒化配置

## 12、babel

### 12.1 polyfill

### 12.2 @babel/preset-env

### 12.3 babel-runtime

## 13、编译时间优化

### 13.1 缩小查找范围

### 13.2 忽略要解析的文件

### 13.3 配置忽略不必要的打包内容

### 13.4 利用缓存

### 13.5 多线程开启

## 14、编译体积优化

### 14.1 压缩css/js/html/图片

### 14.2 tree-shaking

### 14.3 作用域提升scope Hoisting

### 14.4 slideEffets

## 15、运行速度优化

### 15.1 代码分割

### 15.2 加载

### 15.3 提取公共代码

### 15.4 cdn

### 16、vite