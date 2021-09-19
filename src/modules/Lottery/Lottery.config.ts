import {
    ExposeFunctions,
    ComExposeEvents,
    ExposeDefaultProps,
    ExposeApi,
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
            name: 'setGameType',
            description: '设置游戏类型',
            arguments: [
                {
                    type: 'string',
                    describe:
                        'boxroulette,roulette,flipcard,slotmachine,treasurebox,dice,case,redenvelope',
                    data: '',
                    fieldName: 'gametype',
                    name: '游戏类型',
                },
            ],
        },
        {
            name: 'setRunningPrizes',
            description: '设置奖品数据',
            arguments: [
                {
                    type: 'runningTime',
                    describe: `从全局数据中设置奖品数据
                              <br/>
                              数据要求：<br />
                              {<br /> 
                                  prizeId: [number]奖品id
                                  <br />
                                  prizeType: [number]奖品类型 0 未中奖, 1 实物, 2 虚拟
                                  <br />
                                  receiveType?: [number]领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
                                  <br />
                                  prizeAlias?: [string]奖品别名
                                  <br />
                                  prizeName: [string]奖品名称
                                  <br />
                                  awardMsg?: [string]中奖提示信息
                                  <br />
                                  gameImg?: [string]游戏图片地址
                                  <br />
                                  prizeImg: [string]奖品图片地址
                                  <br />
                                  memo?: [string]奖品备注说明
                                  <br />
                              }[]`,
                    name: '奖品数据',
                    fieldName: 'prizes',
                    data: '',
                },
            ],
        },
        {
            name: 'setRunningRecords',
            description: '设置中奖记录',
            arguments: [
                {
                    type: 'runningTime',
                    describe: `从全局数据中设置中奖记录数据,中奖记录的固定字段saveAddress="1" 时开启填写地址
                            <br/>
                            数据要求：<br />`,
                    name: '中奖记录数据',
                    fieldName: 'records',
                    data: '',
                },
                {
                    type: 'string',
                    describe:
                        '0禁止,1开启;下拉时请求中奖记录Api,并将更新中奖数据,常用于刷新数据.',
                    name: '下拉刷新',
                    fieldName: 'disablePullDown',
                    data: '',
                },
                {
                    type: 'string',
                    describe:
                        '0禁止,1开启;上拉时请求中奖记录Api,并将更新中奖数据,常用于查看更多数据.',
                    name: '上拉更新',
                    fieldName: 'disablePullUp',
                    data: '',
                },
            ],
        },
        {
            name: 'setRules',
            description: '设置活动规则',
            arguments: [
                {
                    type: 'array',
                    name: '文本内容',
                    describe: '可设置多行文本内容',
                    html: true,
                    data: ['文本<b>Text</b>'],
                    fieldName: 'rulesArray',
                }
            ],
        },
        {
            name: 'lottery',
            description: '抽奖',
            presettable: false,
            arguments: [],
        },
        {
            name: 'useConfig',
            description: '设置抽奖用户',
            arguments: [
                {
                    type: 'string',
                    name: '手机',
                    fieldName: 'phone',
                    describe: '选填用户手机号码',
                    data: '',
                },
                {
                    type: 'number',
                    name: '填写身份证',
                    fieldName: 'cardIdRequest',
                    describe:
                        ' 1 隐藏，2 验证，3 为空时不验证有填写时验证，4 不验证',
                    data: '1',
                },
            ],
        },
        {
            name: 'setDefaultReceiveInfo',
            description: '设置收货人信息',
            arguments: [
                {
                    type: 'string',
                    name: '电话',
                    fieldName: 'receiverPhone',
                    describe: '收货人电话号码',
                    data: '',
                },
                {
                    type: 'string',
                    name: '省市区名称',
                    fieldName: 'regionName',
                    describe: '输入省市区名用,隔开: xx省,xx市,xx区/县',
                    data: '',
                },
                {
                    type: 'string',
                    name: '省市区id',
                    fieldName: 'region',
                    describe: '输入省市区id用,隔开: 15,1513,151315',
                    data: '',
                },
                {
                    type: 'string',
                    name: '详细地址',
                    fieldName: 'address',
                    describe: '请输入详细地址',
                    data: '',
                },
                {
                    type: 'string',
                    name: '身份证号',
                    fieldName: 'idCard',
                    describe: '获奖用户身份证号码',
                    data: '',
                },
            ],
        },
        {
            name: 'setSuccessModal',
            description: '设置中奖弹窗',
            arguments: [
                {
                    type: 'string',
                    name: '标题',
                    fieldName: 'title',
                    describe: '中奖弹窗标题',
                    data: '',
                },
                {
                    type: 'string',
                    name: '动画',
                    fieldName: 'animation',
                    describe: `中奖弹窗动画
                  flipInY | flipInX | fadeInUp | fadeInDown | fadeInLeft 
                  | fadeInRight | zoomIn | zoomInUp | zoomInDown | zoomInLeft | zoomInRight`,
                    data: 'flipInY',
                },
            ],
        },
        {
            name: 'checkedLottery',
            description: '抽奖前置检查',
            presettable: false,
            arguments: [
                {
                    type: 'boolean',
                    name: '禁用',
                    fieldName: 'enabled',
                    describe: '条件不成立时禁止抽奖',
                    data: {
                        comparableAverageA: 'a',
                        comparableAverageB: 'a',
                        method: '===',
                    },
                },
                {
                    type: 'string',
                    name: '信息',
                    fieldName: 'message',
                    describe: '提示信息',
                    data: '',
                },
            ],
        },
        {
            name: 'showRecord',
            description: '显示中奖记录',
            presettable: false,
        },
        {
            name: 'showRules',
            description: '显示游戏规则',
            presettable: false,
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
            name: 'onStart',
            description: '抽奖',
        },
        {
            name: 'onEnd',
            description: '抽奖结束',
        },
        {
            name: 'onCancel',
            description: '放弃中奖结果/关闭弹窗',
        },
        {
            name: 'onEnsure',
            description: '确认中奖结果',
        },
        {
            name: 'onShowSuccess',
            description: '显示中奖',
        },
        {
            name: 'onShowFailed',
            description: '显示未中奖',
        },
        {
            name: 'onShowAddress',
            description: '显示收货地址',
        },
    ],
    /**
     * 发布默认porps
     */
    exposeDefaultProps: {
        layout: { w: 10, h: 10 },
        style: {
            basic: {},
        },
        styleDescription: [
            {
                title: '基础',
                value: 'basic',
            },
        ],
    },

    /**
     * 发布默认Api
     */
    exposeApi: [
        {
            apiId: 'init',
            name: '获取初始数据(将在初始化事件前调用)',
        },
        {
            apiId: 'beforeStart',
            name: '抽奖前置验证(将在每次抽奖前调用)',
            description: '',
        },
        {
            apiId: 'lottery',
            name: '抽奖',
            description: `通过数据映射/转换数据
          <br/>
          数据要求：<br />
          {
          &nbsp;data: ...<br />
          &nbsp;prize: {<br /> 
              &nbsp;&nbsp;prizeId: [number]奖品id
              <br />
              &nbsp;&nbsp;prizeType: [number]奖品类型 0 未中奖, 1 实物, 2 虚拟
              <br />
              &nbsp;&nbsp;receiveType?: [number]领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
              <br />
              &nbsp;&nbsp;prizeAlias?: [string]奖品别名
              <br />
              &nbsp;&nbsp;prizeName: [string]奖品名称
              <br />
              &nbsp;&nbsp;awardMsg?: [string]中奖提示信息
              <br />
              &nbsp;&nbsp;gameImg?: [string]游戏图片地址
              <br />
              &nbsp;&nbsp;prizeImg: [string]奖品图片地址
              <br />
              &nbsp;&nbsp;memo?: [string]奖品备注说明
              <br />
              &nbsp;}<br />}`,
        },
        {
            apiId: 'saveAddress',
            name: '保存收货地址',
            enterDescription: `原数据<br />{<br/>
              address?: string 详细地址<br/>
              idcode?: string 生份证号<br/>
              phone?: string 电话号码<br/>
              receiver?: string 收货人姓名<br/>
              regions?: string 省市区id<br/>
              regionsName?: string 省市区<br/>
              verificationvode?: string 验证码<br/>
          }`,
            hideBodyInput: true,
        },
        {
            apiId: 'getVerificationCode',
            name: '获取验证码',
            enterDescription: `获取验证码`,
        },
        {
            apiId: 'getRecord',
            name: '中奖记录',
            enterDescription: `获取中奖记录`,
        },
    ],
};

export default config;
