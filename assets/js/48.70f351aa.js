(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{331:function(s,n,a){"use strict";a.r(n);var e=a(10),t=Object(e.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"linux内存管理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#linux内存管理"}},[s._v("#")]),s._v(" linux内存管理")]),s._v(" "),n("h2",{attrs:{id:"_1、free-查看内存占用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、free-查看内存占用"}},[s._v("#")]),s._v(" 1、free 查看内存占用")]),s._v(" "),n("p",[n("code",[s._v("free -h")])]),s._v(" "),n("h2",{attrs:{id:"_2、-proc-meminfo-详解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、-proc-meminfo-详解"}},[s._v("#")]),s._v(" 2、/proc/meminfo 详解")]),s._v(" "),n("p",[s._v("负责输出/proc/meminfo的源代码是："),n("code",[s._v("fs/proc/meminfo.c : meminfo_proc_show()")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("MemTotal:        3809036 kB 总内存大小\nMemFree:          282012 kB 空闲内存大小\nMemAvailable:     865620 kB 可用内存大小\nBuffers:               0 kB 文件缓存大小\nCached:           854972 kB 磁盘高速缓冲大小\nSwapCached:       130900 kB 交换空间高速缓冲大小\nActive:          1308168 kB 活跃使用中高速缓冲大小\nInactive:        1758160 kB 不活跃高速缓冲大小\nActive(anon):    1010416 kB \nInactive(anon):  1370480 kB\nActive(file):     297752 kB\nInactive(file):   387680 kB\nUnevictable:           0 kB\nMlocked:               0 kB\nSwapTotal:       4063228 kB 交换空间总大小\nSwapFree:        3357108 kB 空闲交换空间\nDirty:                 0 kB 等待被写回到磁盘的大小\nWriteback:             0 kB 正在被写回的大小\nAnonPages:       2104412 kB 未映射的大小\nMapped:            40988 kB 设备和文件映射的大小\nShmem:            169540 kB\nSlab:             225420 kB 内核数据结构缓存的大小\nSReclaimable:     134220 kB 可回收Slab的大小\nSUnreclaim:        91200 kB 不可回收的Slab的大小\nKernelStack:        5936 kB\nPageTables:        35628 kB 管理内存分页的索引表的大小\nNFS_Unstable:          0 kB\nBounce:                0 kB\nWritebackTmp:          0 kB\nCommitLimit:     5967744 kB\nCommitted_AS:    5626436 kB\nVmallocTotal:   34359738367 kB\nVmallocUsed:      351900 kB\nVmallocChunk:   34359363652 kB\nHardwareCorrupted:     0 kB\nAnonHugePages:    139264 kB\nHugePages_Total:       0\nHugePages_Free:        0\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nDirectMap4k:      204484 kB\nDirectMap2M:     3915776 kB\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br")])]),n("p",[s._v("计算内存占用：")]),s._v(" "),n("p",[n("code",[s._v("memUsed = MemTotal - MemAvailable")])]),s._v(" "),n("p",[s._v("计算swap内存占用：")]),s._v(" "),n("p",[n("code",[s._v("swapUsed = SwapTotal - SwapFree")])])])}),[],!1,null,null,null);n.default=t.exports}}]);