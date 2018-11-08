const routers = [
    {
        path: '/query',
        meta: {
            title: '单用户查询'
        },
        component: (resolve) => require(['./views/user-query/user-query.vue'], resolve)
    },
    {
        path: '/lable',
        meta: {
            title: '标签口径查询'
        },
        component: (resolve) => require(['./views/label-query/label-query.vue'], resolve)
    }
];
export default routers;