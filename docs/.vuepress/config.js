const navConfig = require('./navConfig');
const { getSidebar } = require('./sidebarConfig');
module.exports = {
    title: "sanyer",
    description: "This is sanyer blog.",
    repo: 'https://github.com/sanyers/blog.git',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/blog/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    lastUpdated: 'Last Updated',
    themeConfig: {
        logo: '/img/logo.png',
        nav: navConfig,
        // 侧边栏配置
        sidebar: getSidebar(),
        sidebarDepth: 2, // 侧边栏显示2级
    }
}