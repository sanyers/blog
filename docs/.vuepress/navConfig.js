module.exports = [
    { text: '首页', link: '/' },
    { text: '技术分享', link: '/technology/', isList: true },
    { text: '原创文章', link: '/article/', isList: true },
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
    {
        text: '其他',
        type: 'group',
        items: [
            {
                text: 'book',
                items: [
                    { text: 'JavaScript高级程序设计第四版', link: '/book/001/' }
                ]
            }
        ]
    },
    { text: '个人简历', link: '/resume/' },
    { text: 'github', link: 'https://github.com/sanyers/blog.git' }
]