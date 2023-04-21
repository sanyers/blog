const navConfig = require('./navConfig');
const { getSidebar } = require('./sidebarConfig');
module.exports = {
    title: "sanyer",
    description: "This is sanyer's blog.",
    repo: 'https://github.com/sanyers/blog.git',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['link', { rel: 'stylesheet', href: '/css/index.css' }],
        // ['script', { src: 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js' }],
        // ['script', { src: 'https://cdn.jsdelivr.net/npm/fancybox@3.0.1/dist/js/jquery.fancybox.cjs.min.js' }],
        // ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/fancybox@3.0.1/dist/css/jquery.fancybox.css' }],
        ['script', { src: '/js/index.js' }],
    ],
    base: '/blog/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        logo: '/img/logo.png',
        nav: navConfig,
        // 侧边栏配置
        sidebar: getSidebar(),
        sidebarDepth: 3, // 侧边栏显示3级
        // displayAllHeaders: true, // 是否自动展开子目录
        lastUpdated: '上次更新', //最后更新时间
    },
    plugins: [
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine',
                // options选项中的所有参数，会传给Valine的配置
                options: {
                    el: '#valine-vuepress-comment',
                    appId: 'CA6asQcFFU9syNPLsq11HNcl-9Nh9j0Va',
                    appKey: 'KKFEw48bpVkvzrnuGsijAa8w',
                    visitor: true, // 阅读量统计
                    placeholder: '在这里请输入你的评论哦',
                    path: '<%- frontmatter.to.path %>'
                }
            }
        ]
    ]
}