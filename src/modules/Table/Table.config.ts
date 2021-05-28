const config: {
    
} = {
    /**
     * 注册方法的静态描述与默认参数定义
     */
    exposeFunctions: [
        {
            name: 'setTable',
            description: '设置table基本功能',
            arguments: [
                {
                    type: 'boolean',
                    name: '允许下拉事件',
                    describe: '表达式成立时允许下拉事件',
                    fieldName: 'isPullDown',
                    data: {
                        comparableAverageA: '0',
                        comparableAverageB: '1',
                        method: '===',
                    },
                },
                {
                    type: 'boolean',
                    name: '允许上拉事件',
                    describe: '表达式成立时允许上拉事件',
                    fieldName: 'isPullUp',
                    data: {
                        comparableAverageA: '0',
                        comparableAverageB: '1',
                        method: '===',
                    },
                },
            ],
        },
        {
            name: 'setTheadData',
            description: '设置表头',
            arguments: [
                {
                    type: 'array',
                    fieldName: 'setThead',
                    name: '设置表头项',
                    html: true,
                    describe: '设置表头标题，每项代表一列',
                    data: [],
                },
                {
                    type: 'array',
                    fieldName: 'setTheadWidth',
                    name: '设置表头项宽度',
                    describe: '设置表头每列宽度，每项代表一列',
                    data: [],
                },
            ],
        },
        {
            name: 'setTbodyData',
            description: '表格数据',
            arguments: [
                {
                    type: 'runningTime',
                    name: '数据源',
                    fieldName: 'dataSource',
                    describe: '数据源，设置运行时或Api返回数据源',
                    data: '',
                },
                {
                    type: 'boolean',
                    name: '合并历史数据',
                    describe: '设置每行内容，数据替换基于数据源！',
                    fieldName: 'isConcate',
                    data: {
                        comparableAverageA: '0',
                        comparableAverageB: '1',
                        method: '===',
                    },
                },
                {
                    type: 'array',
                    fieldName: 'rowMap',
                    name: '行值',
                    html: true,
                    describe: '设置每行内容，数据替换基于数据源！',
                    data: [],
                },
            ],
        },
        {
            name: 'overrideTbodyItem',
            description: '覆写表格，请在源数据准备完成后做覆写！',
            arguments: [
                {
                    type: 'number',
                    fieldName: 'rowItem',
                    name: '行',
                    describe: 'tbody第几行',
                    data: '',
                },
                {
                    type: 'number',
                    fieldName: 'colItem',
                    name: '列',
                    describe: 'tbody第几列',
                    data: '',
                },
                {
                    type: 'string',
                    fieldName: 'override',
                    name: '覆写',
                    html: true,
                    describe: '覆写表格项, 数据替换基于数据源！',
                    data: '',
                },
            ],
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
            name: 'pullDown',
            description: '下拉',
        },
        {
            name: 'pullUp',
            description: '上拉',
        },
    ],

    /**
     * 发布默认porps
     */
    exposeDefaultProps: {
        layout: {
            w: 20,
        },
        style: {
            basic: {},
            table: {},
            thead: {},
            tbody: {},
            th: {},
            td: {},
            tr: {},
            rowoddfirst: {},
            rowoddlast: {},
            rowodd: {},
            roweven: {},
            coloddfirst: {},
            colevenlast: {},
            colodd: {},
            coleven: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '表格',
                        value: 'table',
                        children: [
                            {
                                title: '表头',
                                value: 'thead',
                                children: [
                                    {
                                        title: '表头项',
                                        value: 'th',
                                    },
                                ],
                            },
                            {
                                title: '内容',
                                value: 'tbody',
                                children: [
                                    {
                                        title: '内容项',
                                        value: 'td',
                                        children: [
                                            {
                                                title: '行',
                                                value: 'tr',
                                                children: [
                                                    {
                                                        title: '首行',
                                                        value: 'rowoddfirst',
                                                    },
                                                    {
                                                        title: '末行',
                                                        value: 'rowoddlast',
                                                    },
                                                    {
                                                        title: '奇数行',
                                                        value: 'rowodd',
                                                    },
                                                    {
                                                        title: '偶数行',
                                                        value: 'roweven',
                                                    },
                                                ],
                                            },
                                            {
                                                title: '首列',
                                                value: 'coloddfirst',
                                            },
                                            {
                                                title: '未列',
                                                value: 'colevenlast',
                                            },
                                            {
                                                title: '奇数列',
                                                value: 'colodd',
                                            },
                                            {
                                                title: '偶数列',
                                                value: 'coleven',
                                            },
                                        ],
                                    },
                                ],
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
            apiId: 'mount',
            name: '初始化',
        },
        {
            apiId: 'pullUp',
            name: '上拉',
        },
        {
            apiId: 'pullDown',
            name: '下拉',
        },
    ],
};

export default config