import { ModulesStatic } from '~/types/modules';

const config: ModulesStatic = {
    /**
     * publish functions
     */
    exposeFunctions: [
        {
            name: 'setMessages',
            description: '设置',
            arguments: [
                {
                    type: 'runningTime',
                    fieldName: 'messages',
                    name: '数据',
                    describe: '播报数据',
                    data: '',
                },
                {
                    type: 'number',
                    fieldName: 'counter',
                    name: '显示条数',
                    describe: '循环显示条数',
                    data: '3',
                },
                {
                  type: 'number',
                  fieldName: 'interval',
                  name: '时间间隔',
                  describe: '时间间隔',
                  data: '2500',
                },
            ],
        },
    ],

    /**
     * register events
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
    ],

    /**
     * publish Api
     */
    exposeApi: [],

    /**
     * publish defaultporps styles
     */
    exposeDefaultProps: {
        layout: {
            w: 5, // width
            h: 3, // height
        },
        style: {
            basic: {},
            wrap: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '包裹器',
                        value: 'wrap',
                        children: [],
                    },
                ],
            },
        ],
    },
};

export default config;
