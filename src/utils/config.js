const Config = {};

Config.baseConfig = {
    navbarTitleBig: '用户系统管理', //上方导航条不隐藏时显示的名字
    navbarTitleSmall: '用户', //上方导航条隐藏时显示的名字
    listpageTitle: '用户管理',//列表页面标题
};
Config.sideBar = {
    sideBarArr: [
        {name: '用户列表', routerUrl: '/homePage/listPage', key: 'sub2', show: true, icon: 'download'},
        {name: '测试菜单', routerUrl: '/homePage/listPag', key: 'sub3', show: true, icon: 'area-chart'},
        {
            name: '一级菜单', key: 'sub5', show: true, icon: 'file', child: [
                {name: '二级菜单A', key: 'sub51', show: true, icon: 'edit'},
                {
                    name: '二级菜单B', key: 'sub53', show: true, icon: 'bar-chart', child: [
                        {name: '三级菜单A', key: 'sub531', show: true, icon: 'book'},
                        {name: '三级菜单B', key: 'sub532', show: false, icon: 'bars'},
                    ]
                },
            ]
        },
    ],
};


export default Config