const config = {
    /**
     * 注册方法的静态描述与默认参数定义
     */
    exposeFunctions: [
        {
            name: 'setTitle',
            description: '标题',
            arguments: [
                {
                    type: 'string',
                    name: '弹窗标题',
                    describe: '设置标题',
                    data: '',
                    fieldName: 'modalTitle',
                }
            ],
        },
        {
            name: 'setAnimation',
            description: '设置动画',
            arguments: [
                {
                    type: 'string',
                    name: '动画类型',
                    describe:
                        '动画类型包含 "fadeInLeft" | "fadeInRight" | "fadeInDown" | "fadeInUp" | "zoomInLeft" | "zoomInRight" | "zoomInDown" | "zoomInUp" | "zoomIn" | "flipInX" | "flipInY"',
                    data: '',
                    fieldName: 'animationType',
                },
                {
                    type: 'string',
                    name: '动画时间',
                    describe: '转场动画时长(默认0.2s)',
                    data: '',
                    fieldName: 'animationDuration',
                },
            ],
        },
        {
            name: 'createModal',
            description: '显示弹窗',
            presettable: false,
            arguments: [
                {
                    type: 'object',
                    name: '数据',
                    describe: '对话框数据',
                    html: 'innerhtml',
                    data: {
                        header: '<h3>header</h3>',
                        article: '<p>中奖记录</p>',
                    },
                    fieldName: 'modaldata',
                },
            ],
        },
        {
            name: 'hideModal',
            presettable: false,
            description: '隐藏弹窗',
        },
    ],

    /**
     * 发布事件的静态描述
     */
    exposeEvents: [
        {
            name: 'mount',
            description: '初始化',
        },
        {
            name: 'unmount',
            description: '卸载',
        },
        {
            name: 'onCancel',
            description: '取消/关闭',
        },
    ],

    /**
     * 发布默认porps
     */
    exposeDefaultProps: {
        layout: {
            w: 0,
            h: 0,
            x: 0,
            y: 0,
        },
        style: {
            basic: {},
            overlay: {},
            container: {},
            content: {},
            header: {},
            article: {},
            close: {
                display: {
                    width: [10, ''],
                    height: [10, ''],
                },
            },
            ok: {},
            okdisabled: {},
            cancel: {},
            canceldisabled: {},
            modify1: {},
            modify2: {},
            modify3: {},
            modify4: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '弹窗容器',
                        value: 'container',
                        children: [
                            {
                                title: '遮罩层',
                                value: 'overlay',
                            },
                            {
                                title: '弹窗',
                                value: 'content',
                                children: [
                                    {
                                        title: '头部',
                                        value: 'header',
                                    },
                                    {
                                        title: '内容',
                                        value: 'article',
                                    },
                                    {
                                        title: '关闭按钮',
                                        value: 'close',
                                    },
                                    {
                                        title: '确定按钮',
                                        value: 'ok',
                                    },
                                    {
                                        title: '确定按钮禁用',
                                        value: 'okdisabled',
                                    },
                                    {
                                        title: '取消按钮',
                                        value: 'cancel',
                                    },
                                    {
                                        title: '取消按钮禁用',
                                        value: 'canceldisabled',
                                    },
                                ],
                            },
                            {
                                title: '修饰层1',
                                value: 'modify1',
                            },
                            {
                                title: '修饰层2',
                                value: 'modify2',
                            },
                            {
                                title: '修饰层3',
                                value: 'modify3',
                            },
                            {
                                title: '修饰层4',
                                value: 'modify4',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    /**
     * 发布默认Api
     */
    exposeApi: [
        {
            apiId: 'onCancelApi',
            name: '取消',
            description: '确认弹窗时可以调用api',
        },
    ],
};

export default config;
