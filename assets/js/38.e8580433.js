(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{319:function(s,n,t){"use strict";t.r(n);var a=t(10),r=Object(a.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"c-获取当前目录"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#c-获取当前目录"}},[s._v("#")]),s._v(" c#获取当前目录")]),s._v(" "),n("div",{staticClass:"language-c# line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 获取当前进程的完整路径，包含文件名(进程名)。\nstring str = this.GetType().Assembly.Location;\n\n// 获取新的 Process 组件并将其与当前活动的进程关联的主模块的完整路径，包含文件名(进程名)。\nstring str = System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName;\n\n// 获取启动了应用程序的可执行文件的路径，包括可执行文件的名称。\nstring str = System.Windows.Forms.Application.ExecutablePath;\n\n// 获取和设置当前目录（即该进程从中启动的目录）的完全限定路径。\nstring str = System.Environment.CurrentDirectory;\n\n// 获取当前 Thread 的当前应用程序域的基目录，它由程序集冲突解决程序用来探测程序集。\nstring str = System.AppDomain.CurrentDomain.BaseDirectory;\n\n// 获取和设置包含该应用程序的目录的名称。\nstring str = System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase;\n\n// 获取启动了应用程序的可执行文件的路径，不包括可执行文件的名称。\nstring str = System.Windows.Forms.Application.StartupPath;\n\n// 获取应用程序的当前工作目录(不可靠)。\nstring str = System.IO.Directory.GetCurrentDirectory();\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br")])])])}),[],!1,null,null,null);n.default=r.exports}}]);