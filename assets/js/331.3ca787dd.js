(window.webpackJsonp=window.webpackJsonp||[]).push([[331],{615:function(s,a,t){"use strict";t.r(a);var e=t(10),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"webrtc-视频镜像翻转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webrtc-视频镜像翻转"}},[s._v("#")]),s._v(" WebRTC 视频镜像翻转")]),s._v(" "),a("h2",{attrs:{id:"_1、视频镜像说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、视频镜像说明"}},[s._v("#")]),s._v(" 1、视频镜像说明")]),s._v(" "),a("p",[s._v("相机拍摄出的真实相片和镜像相片是不同的")]),s._v(" "),a("p",[s._v("iphone 的系统相机的自拍结果通常会让人觉得别扭 因为拍摄出的真实相片")]),s._v(" "),a("p",[s._v("而几乎所有的自拍相机的自拍结果都是镜像的 通常用户觉得镜像的自拍图像更好看")]),s._v(" "),a("p",[s._v("iOS 和 Android 平台的视频翻转：")]),s._v(" "),a("p",[s._v("由于采集视频时并没有镜像图像 所以无论是 local stream 还是 remote stream")]),s._v(" "),a("p",[s._v("视频图像看上去都是反向的(此时是真实镜像)")]),s._v(" "),a("p",[s._v("为了视觉上看上去自然 需要对视频进行水平翻转")]),s._v(" "),a("h2",{attrs:{id:"_2、ios-视频镜像翻转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、ios-视频镜像翻转"}},[s._v("#")]),s._v(" 2、iOS 视频镜像翻转")]),s._v(" "),a("p",[s._v("WebRTC iOS 提供 RTCEAGLVideoView 作为视频的渲染接口 RTCEAGLVideoView 继承了 UIView")]),s._v(" "),a("p",[s._v("镜像翻转的方法很简单 UIView 即提供了镜像属性")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("self.LocalView.transform = CGAffineTransformMakeScale(-1.0, 1.0);\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_3、android-视频镜像翻转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、android-视频镜像翻转"}},[s._v("#")]),s._v(" 3、Android 视频镜像翻转")]),s._v(" "),a("p",[s._v("WebRTC Android 提供了 VideoRenderGui 作为视频渲染接口")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// VideoRenderGui的update接口提供了镜像参数 设置为true则渲染时镜像翻转")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("update")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Callbacks")]),s._v(" renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" width"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" height"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("VideoRendererGui"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ScalingType")]),s._v(" scalingType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("boolean")]),s._v(" mirror"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h2",{attrs:{id:"_4、web-视频镜像翻转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、web-视频镜像翻转"}},[s._v("#")]),s._v(" 4、web 视频镜像翻转")]),s._v(" "),a("p",[s._v("使用 css 属性即可")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("#video")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rotateY")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("180deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("参考：")]),s._v(" "),a("p",[s._v("https://www.jianshu.com/p/9b054c4f12f2")])])}),[],!1,null,null,null);a.default=n.exports}}]);