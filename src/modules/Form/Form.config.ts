import {
    ComExposeEvents,
    ExposeApi,
    ExposeDefaultProps,
    ExposeFunctions,
} from '~/types/modules';

const config: {
    exposeFunctions: ExposeFunctions[];
    exposeEvents: ComExposeEvents;
    exposeDefaultProps: ExposeDefaultProps;
    exposeApi: ExposeApi[];
} = {
    /**
     * 注册方法的静态描述与默认参数定义
     */
    exposeFunctions: [
        {
            name: 'setFormData',
            description: '设置表单数据',
            arguments: [
                {
                    type: 'runningTime',
                    name: '表单数据',
                    describe: '设置表单数据',
                    data: '',
                    fieldName: 'formdata',
                },
            ],
        },
        {
            name: 'setFormConfig',
            description: '设置表单功能',
            arguments: [
                {
                    type: 'string',
                    name: '输入框',
                    describe: 'standard,outlined或filled默认standard',
                    data: '',
                    fieldName: 'forminput',
                },
                {
                    type: 'string',
                    name: '表单标题',
                    describe: '设置表单标题文字',
                    data: '',
                    fieldName: 'formtitle',
                },
                {
                    type: 'string',
                    name: '提交按钮',
                    describe: '设置提交按钮文字',
                    data: '提交',
                    fieldName: 'formsubmittext',
                },
                {
                    type: 'string',
                    name: '重置按钮',
                    describe: '设置重置按钮文字',
                    data: '重置',
                    fieldName: 'formresettext',
                },
            ],
        },
        {
            name: 'setFormItem',
            description: '表单项对应的值',
            presettable: false,
            arguments: [
                {
                    type: 'string',
                    name: '字段名',
                    describe: '设置字段名',
                    data: '',
                    fieldName: 'fieldName',
                },
                {
                    type: 'string',
                    name: '字段值',
                    describe: '设置字段值',
                    data: '',
                    fieldName: 'fieldValue',
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
            name: 'submit',
            description: '提交表单（Api请求后）',
        },
    ],

    /**
     * 发布默认porps
     */
    exposeDefaultProps: {
        style: {
            basic: {},
            wrap: {},
            header: {},
            container: {},
            formitem: {},
            label: {},
            icon: {},
            activity: {},
            validateError: {},

            baseline: {},
            baselineact: {},
            errorbaseline: {},

            footer: {},
            button: {},
            oknormal: {},
            okdisabled: {},
            resetnormal: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '包裹器',
                        value: 'wrap',
                        children: [
                            {
                                title: '标题部分',
                                value: 'header',
                            },
                            {
                                title: '内容部分',
                                value: 'container',
                                children: [
                                    {
                                        title: '表单项',
                                        value: 'formitem',
                                        children: [
                                            {
                                                title: '表单项标签',
                                                value: 'label',
                                            },
                                            {
                                                title: '表单图标（单选多选下拉等）',
                                                value: 'icon',
                                            },
                                            {
                                                title: '激活状态',
                                                value: 'activity',
                                            },
                                            {
                                                title: '错误提示',
                                                value: 'validateError',
                                            },
                                            {
                                                title: '输入框',
                                                value: 'baseline',
                                            },
                                            {
                                                title: '输入框激活',
                                                value: 'baselineact',
                                            },
                                            {
                                                title: '输入框（验证失败）',
                                                value: 'errorbaseline',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: '脚部',
                                value: 'footer',
                                children: [
                                    {
                                        title: '按钮',
                                        value: 'button',
                                        children: [
                                            {
                                                title: '提交按钮',
                                                value: 'oknormal',
                                            },
                                            {
                                                title: '提交按钮（禁用）',
                                                value: 'okdisabled',
                                            },
                                            {
                                                title: '重置按钮',
                                                value: 'resetnormal',
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
            apiId: 'afterClick',
            name: '提交表单(由提交表单事件自动收集表单数据)',
            hideBodyInput: true,
        },
    ],
};

export default config;
