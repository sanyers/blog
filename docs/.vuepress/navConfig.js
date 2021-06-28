module.exports = [
    { text: '首页', link: '/' },
    { text: '技术分享', link: '/technology/', isList: true },
    { text: '原创文章', link: '/article/', isList: true },
    {
        text: '时间线',
        items: [
            {
                text: '2021',
                items: [
                    { text: '5月', link: '/2021/5/' },
                    { text: '6月', link: '/2021/6/' }
                ]
            },
            { text: '2020', link: '/2020/1/' }
        ]
    },
    { text: '个人简历', link: '/resume/' },
    { text: 'github', link: 'https://github.com/sanyers/blog.git' }
]