(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{297:function(t,a,s){"use strict";s.r(a);var n=s(10),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"android-fileprovider-的使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#android-fileprovider-的使用"}},[t._v("#")]),t._v(" Android FileProvider 的使用")]),t._v(" "),a("h2",{attrs:{id:"_1、前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、前言"}},[t._v("#")]),t._v(" 1、前言")]),t._v(" "),a("p",[t._v("从 Android N（7.0） 开始，将严格执行 StrictMode 模式。而从 Android N 开始，将不允许在 App 间，使用 "),a("code",[t._v("file://")]),t._v(" 的方式，传递一个 File ，否者会抛出 FileUriExposedException 的异常引发 Crash。解决方案就是通过 FileProvider 用 "),a("code",[t._v("content://")]),t._v(" 代替 "),a("code",[t._v("file://")]),t._v("，需要开发者主动升级 targetSdkVersion 到 24 才会执行此策略。")]),t._v(" "),a("h2",{attrs:{id:"_2、读取目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、读取目录"}},[t._v("#")]),t._v(" 2、读取目录")]),t._v(" "),a("h3",{attrs:{id:"_2-1-内部存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-内部存储"}},[t._v("#")]),t._v(" 2.1 内部存储")]),t._v(" "),a("p",[t._v("每安装一个 App 系统都会在内部存储空间的 "),a("code",[t._v("data/data")]),t._v(" 目录下以应用包名为名字自动创建与之对应的文件夹，这个文件夹用于持久化 App 中的 WebView 缓存页面信息、SharedPreferences、SQLiteDatabase 等应用相关数据。当用户卸载 App 时，系统自动删除 "),a("code",[t._v("data/data")]),t._v(" 目录下对应包名的文件夹及其内容。")]),t._v(" "),a("p",[t._v("获取并操作"),a("strong",[t._v("内部存储")]),t._v("空间中的"),a("strong",[t._v("应用私有目录")]),t._v("的方法如下：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("context.getFilesDir()")])]),t._v(" "),a("li",[a("code",[t._v("context.getCacheDir()")])]),t._v(" "),a("li",[a("code",[t._v("context.deleteFile()")])]),t._v(" "),a("li",[a("code",[t._v("context.fileList()")])]),t._v(" "),a("li",[a("code",[t._v("Environment.getDataDirectory()")])])]),t._v(" "),a("h3",{attrs:{id:"_2-2-外部存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-外部存储"}},[t._v("#")]),t._v(" 2.2 外部存储")]),t._v(" "),a("p",[t._v("考虑到普通用户无法访问应用的内部存储空间，比如用户想从应用里面保存一张图片，那么这张图片应该存储在外部存储空间，用户才能访问的到")]),t._v(" "),a("p",[t._v("外部存储空间路径为："),a("code",[t._v("/storage/emulated/0/Android/data/<包名>")])]),t._v(" "),a("p",[t._v("外部存储分为"),a("strong",[t._v("应用私有目录")]),t._v("和"),a("strong",[t._v("公共目录")])]),t._v(" "),a("p",[t._v("（1）应用私有目录")]),t._v(" "),a("p",[t._v("默认情况下，系统并不会自动创建外部存储空间的应用私有目录。只有在应用需要的时候，开发人员通过 SDK 提供的 API 创建该目录文件夹和操作文件夹内容。")]),t._v(" "),a("p",[t._v("当用户卸载 App 时，系统也会自动删除外部存储空间下的对应 App 私有目录文件夹及其内容。")]),t._v(" "),a("p",[t._v("获取并操作"),a("strong",[t._v("外部存储")]),t._v("空间中的"),a("strong",[t._v("应用私有目录")]),t._v("的方法如下：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("context.getExternalFilesDir()")])]),t._v(" "),a("li",[a("code",[t._v("context.getExternalCacheDir()")])]),t._v(" "),a("li",[a("code",[t._v("Environment.getExternalStorageDirectory()")])])]),t._v(" "),a("p",[t._v("（2）公共目录")]),t._v(" "),a("p",[t._v("外部存储空间中的公共目录用来存放当应用被卸载时，仍然可以保存在设备中的信息，如：拍照类应用的图片文件，用户是使用浏览器手动下载的文件等。、")]),t._v(" "),a("p",[t._v("外部存储空间已经为用户默认分类出一些公共目录。开发人员可以通过 Environment 类提供的方法直接获取相应目录的绝对路径，传递不同的 type 参数类型即可：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Environment.getExternalStoragePublicDirectory(String type);")])])]),t._v(" "),a("p",[t._v("Envinonment 类提供诸多 type 参数的常量，比如：")]),t._v(" "),a("ul",[a("li",[t._v("DIRECTORY_MUSIC：/storage/emulated/0/Music")]),t._v(" "),a("li",[t._v("DIRECTORY_MOVIES：/storage/emulated/0/Movies")]),t._v(" "),a("li",[t._v("DIRECTORY_PICTURES：/storage/emulated/0/Pictures")]),t._v(" "),a("li",[t._v("DIRECTORY_DOWNLOADS：/storage/emulated/0/Download")])]),t._v(" "),a("h2",{attrs:{id:"_3、fileprovider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、fileprovider"}},[t._v("#")]),t._v(" 3、FileProvider")]),t._v(" "),a("h3",{attrs:{id:"_3-1-什么是-fileprovider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-什么是-fileprovider"}},[t._v("#")]),t._v(" 3.1 什么是 FileProvider")]),t._v(" "),a("p",[t._v("FileProvider 是 ContentProvider的子类 目前 support v4 包 和 androidx的core包里面都有提供。FileProvider 本质上就是一个 ContentProvider ，它其实也继承了 ContentProvider 的特性。其实ContentProvider 就是在可控的范围内，向外部其他的 App 分享数据。而 FileProvider 将这样的数据变成了一个 File 文件而已。")]),t._v(" "),a("h3",{attrs:{id:"_3-2-使用-fileprovider-的场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-使用-fileprovider-的场景"}},[t._v("#")]),t._v(" 3.2 使用 FileProvider 的场景")]),t._v(" "),a("p",[t._v("在 App 内，通过一个 Intent 传递了一个 "),a("code",[t._v("file://")]),t._v(" 的 Uri 的场景都需要使用 FileProvider ，如：")]),t._v(" "),a("ul",[a("li",[t._v("调用相机拍照")]),t._v(" "),a("li",[t._v("剪裁图片")]),t._v(" "),a("li",[t._v("调用系统安装器去安装 Apk")])]),t._v(" "),a("h3",{attrs:{id:"_3-3-如何使用-fileprovider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-如何使用-fileprovider"}},[t._v("#")]),t._v(" 3.3 如何使用 FileProvider")]),t._v(" "),a("p",[t._v("（1）在 AndroidManifest.xml 中声明")]),t._v(" "),a("div",{staticClass:"language-xml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("provider")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("androidx.core.content.FileProvider"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("authorities")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("${applicationId}.fileProvider"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("exported")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("grantUriPermissions")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("true"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta-data")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("android.support.FILE_PROVIDER_PATHS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("android:")]),t._v("resource")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("@xml/file_paths"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("provider")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("p",[t._v("可以看到，provider 标签下，配置了几个属性：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("name")]),t._v("：配置当前 FileProvider 的实现类。")]),t._v(" "),a("li",[a("code",[t._v("authorities")]),t._v("：配置一个 FileProvider 的名字，它在当前系统内需要是唯一值。")]),t._v(" "),a("li",[a("code",[t._v("exported")]),t._v("：表示该 FileProvider 是否需要公开出去，传 false 表示不公开。")]),t._v(" "),a("li",[a("code",[t._v("granUriPermissions")]),t._v("：是否允许授权文件的临时访问权限。传 true 表示需要 。")])]),t._v(" "),a("p",[t._v("（2）指定可分享的文件路径")]),t._v(" "),a("p",[t._v("没有 xml 目录可自行创建")]),t._v(" "),a("blockquote",[a("p",[t._v("src/main/res/xml/file_paths.xml")])]),t._v(" "),a("div",{staticClass:"language-xml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token prolog"}},[t._v('<?xml version="1.0" encoding="utf-8"?>')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--支持本地路径--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--表示Environment.getExternalStorageDirectory() 指向的目录--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("external-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("external_storage_root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--表示 content.getFileDir() 获取到的目录--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("files-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("files-path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--表示 content.getCacheDir() 获取到的目录--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("cache-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("cache-path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--表示 ContextCompat.getExternalFilesDirs() 获取到的目录--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("external-files-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("external_file_path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--表示 ContextCompat.getExternalCacheDirs() 获取到的目录--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("external-cache-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("external_cache_path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--支持根路径--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("root-path")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("root_path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br")])]),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("TAG")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Value")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Path")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_ROOT_PATH")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("root-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_FILES_PATH")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("files-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/data/data/<包名>/files")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_CACHE_PATH")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("cache-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/data/data/<包名>/cache")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_EXTERNAL")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("external-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/storage/emulate/0")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_EXTERNAL_FILES")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("external-files-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/storage/emulate/0/Android/data/<包名>/files")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("TAG_EXTERNAL_CACHE")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("external-cache-path")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("/storage/emulate/0/Android/data/<包名>/cache")])])])]),t._v(" "),a("p",[t._v("（3）将 file:// 转为 content://")]),t._v(" "),a("p",[t._v("使用 FileProvider.getUriForFile() 方法将 "),a("code",[t._v("file://")]),t._v(" 转为 "),a("code",[t._v("content://")])]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// File 转 Uri")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Uri")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUriForFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("File")]),t._v(" file"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" packageName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPackage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("packageName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Uri")]),t._v(" contentUri "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileProvider")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUriForFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" packageName"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('".fileProvider"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" file"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" contentUri"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取当前包名")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PackageInfo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPackage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Context")]),t._v(" context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PackageManager")]),t._v(" manager "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPackageManager")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PackageInfo")]),t._v(" info "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" manager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPackageInfo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPackageName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("  info"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PackageManager"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NameNotFoundException")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printStackTrace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br")])]),a("h2",{attrs:{id:"_4、参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、参考"}},[t._v("#")]),t._v(" 4、参考")]),t._v(" "),a("p",[t._v("https://www.jianshu.com/p/c87ff5eda539")])])}),[],!1,null,null,null);a.default=e.exports}}]);