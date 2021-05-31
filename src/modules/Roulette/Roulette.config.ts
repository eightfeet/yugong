import {
    ExposeFunctions,
    ComExposeEvents,
    ExposeDefaultProps,
    ExposeApi,
} from '~/types/modules';
import cancel from './cancel.svg';

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
            name: 'lottery',
            description: '抽奖',
            arguments: [],
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
    ],

    /**
     * 发布默认porps
     */
    exposeDefaultProps: {
        layout: { w: 10, h: 10 },
        style: {
            basic: {},
            wrap: {
                backgroundGroup: {},
                display: {
                    width: [260, ''],
                    height: [260, ''],
                },
            },
            light: {},
            wheel: {
                backgroundGroup: {
                    backgroundColor: 'rgba(209, 209, 209, 1)',
                },
                border: {
                    radiusTopLeft: [100, '%'],
                    radiusTopRight: [100, '%'],
                    radiusBottomLeft: [100, '%'],
                    radiusBottomRight: [100, '%'],
                },
            },
            divide: {
                backgroundGroup: {
                    backgroundColor: 'rgba(237, 237, 239, 1)',
                },
            },
            prizealias: {
                font: {
                    fontStyle: 'italic',
                },
            },
            lotterybutton: {
                font: {},
                backgroundGroup: {
                    backgroundColor: 'rgba(170, 170, 170, 1)',
                },
                border: {
                    radiusTopLeft: [100, '%'],
                    radiusTopRight: [100, '%'],
                    radiusBottomLeft: [100, '%'],
                    radiusBottomRight: [100, '%'],
                },
            },
            needle: {
                backgroundGroup: {
                    backgroundColor: 'rgba(231, 231, 231, 0.26)',
                },
                display: {
                    width: [40, '%'],
                    height: [40, '%'],
                    margin: [
                        [-20, '%'],
                        [null, ''],
                        [null, ''],
                        [-20, '%'],
                    ],
                    position: 'absolute',
                    left: [50, '%'],
                    top: [50, '%'],
                },
                border: {
                    radiusTopLeft: [100, '%'],
                    radiusTopRight: [100, '%'],
                    radiusBottomLeft: [100, '%'],
                    radiusBottomRight: [100, '%'],
                },
            },
            gameImg: {
                display: {
                    width: [20, '%'],
                    position: 'relative',
                },
            },

            successoverlay: {},
            successcontainer: {},
            successclose: {
                display: {
                    width: [40, ''],
                    height: [40, ''],
                },
                backgroundGroup: {
                    backgroundList: [
                        {
                            imageUrl: cancel,
                            sizeY: [70, '%'],
                            sizeX: [70, '%'],
                            positionX: [50, '%'],
                            positionY: [50, '%'],
                            repeat: 'no-repeat',
                        },
                    ],
                },
            },
            successcontent: {
                display: {
                    width: [280, ''],
                    padding: [
                        [null, ''],
                        [null, ''],
                        [20, ''],
                        [null, ''],
                    ],
                },
                border: {
                    radiusTopLeft: [10, ''],
                    radiusTopRight: [10, ''],
                    radiusBottomLeft: [10, ''],
                    radiusBottomRight: [10, ''],
                },
            },
            successheader: {
                border: {
                    radiusTopLeft: [10, ''],
                    radiusTopRight: [10, ''],
                },
                display: {
                    height: [40, ''],
                },
                font: {
                    fontWeight: 'bold',
                    lineHeight: [40, ''],
                    align: 'center',
                    color: 'rgba(255, 255, 255, 1)',
                },
                backgroundGroup: {
                    backgroundList: [
                        {
                            gradient: [
                                {
                                    color: 'rgba(255, 87, 34, 1)',
                                    transition: 1,
                                },
                                {
                                    color: 'rgba(244, 67, 54, 1)',
                                    transition: 81,
                                },
                            ],
                            gradientDirections: 'top',
                        },
                    ],
                },
            },
            successarticle: {},
            successmodalprizename: {
                font: {
                    fontSize: [26, ''],
                    align: 'center',
                    color: 'rgba(244, 67, 54, 1)',
                    fontWeight: 'bold',
                    lineHeight: [45, ''],
                },
                display: {
                    margin: [
                        [20, ''],
                        [null, ''],
                        [null, ''],
                        [null, ''],
                    ],
                },
            },
            successmodalawardmsg: {
                font: {
                    fontSize: [20, ''],
                    align: 'center',
                },
            },
            successmodalprizeimg: {
                display: {
                    width: [100, ''],
                    height: [100, ''],
                },
            },
            successmodalmemo: {
                display: {
                    margin: [
                        [null, ''],
                        [10, ''],
                        [10, ''],
                        [10, ''],
                    ],
                },
                font: {
                    fontSize: [13, ''],
                    align: 'center',
                },
            },
            successok: {
                display: {
                    padding: [
                        [10, ''],
                        [30, ''],
                        [10, ''],
                        [30, ''],
                    ],
                },
                border: {
                    borderColor: 'rgba(205, 205, 205, 1)',
                    borderPosition: {
                        border: true,
                    },
                    borderWidth: [1, ''],
                    borderStyle: 'solid',
                    radiusTopLeft: [6, ''],
                    radiusTopRight: [6, ''],
                    radiusBottomLeft: [6, ''],
                    radiusBottomRight: [6, ''],
                },
                backgroundCommon: {
                    backgroundColor: 'rgba(226, 226, 226, 1)',
                },
                boxShadow: [
                    {
                        shiftDown: [2, ''],
                        color: 'rgba(0, 0, 0, 0.15 )',
                        blur: [4, ''],
                    },
                ],
            },
            successokdisabled: {},
            successcancel: {},
            successcanceldisabled: {},
            successmodify: {},
            // 地址弹窗
            addressmodalcontainer: {},
            addressmodaloverlay: {},
            addressmodalcontent: {
                display: {
                    width: [280, ''],
                    padding: [
                        [0, ''],
                        [0, ''],
                        [0, ''],
                        [0, ''],
                    ],
                },
                border: {
                    radiusTopLeft: [10, ''],
                    radiusTopRight: [10, ''],
                    radiusBottomLeft: [10, ''],
                    radiusBottomRight: [10, ''],
                },
            },
            addressmodalformbox: {
                display: { width: [100, '%'] },
            },
            addressmodalheader: {
                border: {
                    radiusTopLeft: [10, ''],
                    radiusTopRight: [10, ''],
                    borderStyle: 'none',
                    borderWidth: [0, ''],
                    borderPosition: {
                        borderTop: false,
                        borderRight: false,
                        borderBottom: true,
                        borderLeft: false,
                        border: false,
                    },
                    borderColor: 'rgba(255, 255, 255, 1)',
                },
                display: {
                    height: [40, ''],
                    padding: [
                        ['0', '-'],
                        ['0', '-'],
                        ['0', '-'],
                        ['0', '-'],
                    ],
                    margin: [
                        ['0', '-'],
                        ['0', '-'],
                        ['0', '-'],
                        ['0', '-'],
                    ],
                },
                font: {
                    fontWeight: 'bold',
                    lineHeight: [40, ''],
                    align: 'center',
                    color: 'rgba(255, 255, 255, 1)',
                },
                backgroundGroup: {
                    backgroundList: [
                        {
                            gradient: [
                                {
                                    color: 'rgba(255, 87, 34, 1)',
                                    transition: 1,
                                },
                                {
                                    color: 'rgba(244, 67, 54, 1)',
                                    transition: 81,
                                },
                            ],
                            gradientDirections: 'top',
                        },
                    ],
                },
            },
            addressmodalarticle: {},
            addressmodalsubtitle: {},
            addressmodalrow: {
                display: {
                    margin: [
                        [null, ''],
                        [10, ''],
                        [10, ''],
                        [10, ''],
                    ],
                },
            },
            addressmodallabel: {},
            addressmodalinput: {
                font: {
                    fontSize: [13, ''],
                    lineHeight: [30, ''],
                },
            },
            addresscheckphone: {
                font: {
                    fontSize: [13, ''],
                    lineHeight: [30, ''],
                },
            },
            addresscheckphonedisable: {},
            addressmodalclose: {
                display: {
                    width: [40, ''],
                    height: [40, ''],
                },
                backgroundGroup: {
                    backgroundList: [
                        {
                            imageUrl: cancel,
                            sizeY: [70, '%'],
                            sizeX: [70, '%'],
                            positionX: [50, '%'],
                            positionY: [50, '%'],
                            repeat: 'no-repeat',
                        },
                    ],
                },
            },
            addressmodalok: {
                display: {
                    padding: [
                        [10, ''],
                        [30, ''],
                        [10, ''],
                        [30, ''],
                    ],
                    margin: [
                        ['0px', '-'],
                        ['auto', '-'],
                        ['0px', '-'],
                        ['auto', '-'],
                    ],
                    height: ['auto', '-'],
                },
                font: {
                    fontSize: [13, ''],
                },
                border: {
                    borderColor: 'rgba(205, 205, 205, 1)',
                    borderPosition: {
                        border: true,
                    },
                    borderWidth: [1, ''],
                    borderStyle: 'solid',
                    radiusTopLeft: [6, ''],
                    radiusTopRight: [6, ''],
                    radiusBottomLeft: [6, ''],
                    radiusBottomRight: [6, ''],
                },
                backgroundCommon: {
                    backgroundColor: 'rgba(226, 226, 226, 1)',
                },
                boxShadow: [
                    {
                        shiftDown: [2, ''],
                        color: 'rgba(0, 0, 0, 0.15 )',
                        blur: [4, ''],
                    },
                ],
            },
            addressmodify1: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
                children: [
                    {
                        title: '抽奖器',
                        value: 'wrap',
                        children: [
                            {
                                title: '盘(svg通过文字字体颜色设置背景色)',
                                value: 'light',
                            },
                            {
                                title: '转盘',
                                value: 'wheel',
                            },
                            {
                                title: '分割线',
                                value: 'divide',
                            },
                            {
                                title: '奖品名/别名',
                                value: 'prizealias',
                            },
                            {
                                title: '抽奖按钮',
                                value: 'lotterybutton',
                            },
                            {
                                title: '抽奖按钮指针',
                                value: 'needle',
                            },
                            {
                                title: '奖品/游戏图片',
                                value: 'gameImg',
                            },
                        ],
                    },
                    {
                        title: '中奖弹窗',
                        value: 'successcontainer',
                        children: [
                            {
                                title: '遮罩层',
                                value: 'successoverlay',
                            },
                            {
                                title: '弹窗',
                                value: 'successcontent',
                                children: [
                                    {
                                        title: '头部',
                                        value: 'successheader',
                                    },
                                    {
                                        title: '内容',
                                        value: 'successarticle',
                                    },
                                    {
                                        title: '奖品名称',
                                        value: 'successmodalprizename',
                                    },
                                    {
                                        title: '获奖消息',
                                        value: 'successmodalawardmsg',
                                    },
                                    {
                                        title: '奖品图片',
                                        value: 'successmodalprizeimg',
                                    },
                                    {
                                        title: '奖品备注',
                                        value: 'successmodalmemo',
                                    },
                                    {
                                        title: '关闭按钮',
                                        value: 'successclose',
                                    },
                                    {
                                        title: '确定按钮',
                                        value: 'successok',
                                    },
                                ],
                            },
                            {
                                title: '修饰层',
                                value: 'successmodify1',
                            },
                        ],
                    },
                    {
                        title: '地址弹窗',
                        value: 'addressmodalcontainer',
                        children: [
                            {
                                title: '遮罩层',
                                value: 'addressmodaloverlay',
                            },
                            {
                                title: '弹窗',
                                value: 'addressmodalcontent',
                                children: [
                                    {
                                        title: '表单外框',
                                        value: 'addressmodalformbox',
                                    },
                                    {
                                        title: '内容',
                                        value: 'addressmodalarticle',
                                    },
                                    {
                                        title: '头部',
                                        value: 'addressmodalheader',
                                    },
                                    {
                                        title: '二级标题',
                                        value: 'addressmodalsubtitle',
                                    },
                                    {
                                        title: '表单行',
                                        value: 'addressmodalrow',
                                    },
                                    {
                                        title: '表单标签',
                                        value: 'addressmodallabel',
                                    },
                                    {
                                        title: '获取验证码按钮',
                                        value: 'addresscheckphone',
                                    },
                                    {
                                        title: '获取验证码按钮(禁用状态)',
                                        value: 'addresscheckphonedisable',
                                    },
                                    {
                                        title: '输入框',
                                        value: 'addressmodalinput',
                                    },
                                    {
                                        title: '关闭按钮',
                                        value: 'addressmodalclose',
                                    },
                                    {
                                        title: '确定按钮',
                                        value: 'addressmodalok',
                                    },
                                ],
                            },
                            {
                                title: '修饰层',
                                value: 'addressmodify1',
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
    exposeApi: [],
};

export default config;
