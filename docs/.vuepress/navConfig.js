module.exports = [
  { text: "首页", link: "/" },
  {
    text: "前端笔记",
    type: "group",
    name: "web",
    items: [
      { text: "javascript", link: "/web/javascript/", firstName: "目录" },
      { text: "html", link: "/web/html/", firstName: "目录" },
      { text: "css", link: "/web/css/", firstName: "目录" },
      { text: "vue", link: "/web/vue/", firstName: "目录" },
      { text: "vue3", link: "/web/vue3/", firstName: "目录" },
      { text: "webpack", link: "/web/webpack/", firstName: "webpack基础知识" },
      { text: "vite", link: "/web/vite/", firstName: "vite基础知识" },
      { text: "babel", link: "/web/babel/", firstName: "babel基础知识" },
      { text: "weex", link: "/web/weex/", firstName: "weex基础知识" },
      { text: "typescript", link: "/web/typescript/", firstName: "typescript基础知识", },
      { text: "node", link: "/web/node/", firstName: "node基础知识" },
      { text: "electron", link: "/web/electron/", firstName: "electron基础知识" },
      { text: "WebRTC", link: "/web/webrtc/", firstName: "WebRTC基础", },
      { text: "WebSocket", link: "/web/websocket/", firstName: "WebSocket基础", },
      { text: "网络知识", link: "/web/network/", firstName: "网络知识" },
      { text: "设计模式", link: "/web/design/", firstName: "设计模式" },
      { text: "数据结构/算法", link: "/web/algorithm/", firstName: "数据结构" },
      { text: "安全", link: "/web/security/", firstName: "安全" },
      { text: "面试题", link: "/web/interview/", firstName: "面试题" },
      { text: "书单", link: "/web/booklist/", firstName: "书单" },
    ],
  },
  {
    text: "其他",
    type: "group",
    name: "article",
    items: [
      { text: "站点分享", link: "/article/website/", firstName: "站点分享" },
      { text: "git", link: "/article/git/", firstName: "命令大全" },
      { text: "配置说明", link: "/article/configure/", firstName: "ESLint" },
      { text: "Android", link: "/article/android/", firstName: "Android开发" },
      { text: "nginx", link: "/article/nginx/", firstName: "Nginx配置" },
      { text: "pm2", link: "/article/pm2/", firstName: "pm2配置" },
      { text: "npm", link: "/article/npm/", firstName: "npm" },
      { text: "windows", link: "/article/windows/", firstName: "开始" },
      { text: "ffmpeg", link: "/article/ffmpeg/", firstName: "开始" },
      { text: "linux", link: "/article/linux/", firstName: "开始" },
      { text: "python", link: "/article/python/", firstName: "开始" },
      { text: "php", link: "/article/php/", firstName: "开始" },
      { text: "golang", link: "/article/golang/", firstName: "开始" },
      { text: "c++", link: "/article/c++/", firstName: "开始" },
      { text: "wasm", link: "/article/wasm/", firstName: "开始" },
      { text: "study", link: "/article/study/", firstName: "开始" },
      { text: "nextcloud", link: "/article/nextcloud/", firstName: "开始" },
      { text: "数据库", link: "/article/database/", firstName: "开始" },
      // { text: '历史', link: '/article/history/', firstName: '开始' },
    ],
  },
  {
    text: "书籍系列",
    type: "group",
    name: "original",
    items: [
      { text: "《从零开始网页设计》", link: "/original/webdesign/", firstName: "目录" },
      { text: "《JavaScript权威指南 第七版》 笔记", link: "/original/js-definitive/", firstName: "目录" },
    ],
  },
  // {
  //     text: '时间线',
  //     type: 'group',
  //     items: [
  //         {
  //             text: '2021',
  //             items: [
  //                 { text: '5月', link: '/2021/5/' },
  //                 { text: '6月', link: '/2021/6/' }
  //             ]
  //         }
  //     ]
  // },

  // {
  //     text: '其他',
  //     type: 'groupx',
  //     items: [
  //         {
  //             text: 'book',
  //             items: [
  //                 { text: 'JavaScript高级程序设计第四版', link: '/book/001/', firstName: '前言' }
  //             ]
  //         }
  //     ]
  // },
  { text: "个人简历", link: "https://sanyers.github.io/resume/" },
  {
    text: "导航",
    items: [
      { text: "gitee", link: "https://gitee.com/sanyers/blog.git" },
      { text: "github", link: "https://github.com/sanyers/blog.git" },
      { text: "简书", link: "https://www.jianshu.com/u/126bb2363acb" },
      { text: "面试题", link: "https://sanyers.github.io/qa-system/" },
    ],
  },
];
