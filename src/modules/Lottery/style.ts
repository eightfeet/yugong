import { AppDataElementsStyleTypes } from '~/types/appData';
import { StyleDescItem } from '~/types/modules';

export const style: AppDataElementsStyleTypes = {
    basic: {},
    //#region 转盘
    roulette_wrap: {},
    roulette_lottery: {},
    roulette_wheel: {
        border: {
            radiusTopLeft: [20, 'rem'],
            radiusTopRight: [20, 'rem'],
            radiusBottomLeft: [20, 'rem'],
            radiusBottomRight: [20, 'rem'],
        },
        backgroundGroup: {
            backgroundColor: 'rgba(213, 205, 255, 1)',
        },
        boxShadow: [
            {
                inset: true,
                spread: [0.5, 'rem'],
                color: 'rgba(120, 98, 227, 1 )',
            },
        ],
    },
    roulette_award: {},
    roulette_prizealias: {},
    roulette_gameImg: {},
    roulette_divide: {
        backgroundGroup: {
            backgroundColor: 'rgba(103, 58, 183, 0.38)',
        },
    },
    roulette_needle: {
        backgroundGroup: {
            backgroundColor: 'rgba(103, 58, 183, 1)',
        },
        border: {
            radiusTopLeft: [10, 'rem'],
            radiusTopRight: [10, 'rem'],
            radiusBottomLeft: [10, 'rem'],
            radiusBottomRight: [10, 'rem'],
        },
    },
    roulette_lotterybutton: {
        backgroundGroup: {
            backgroundColor: 'rgba(63, 81, 181, 0.8)',
        },
        border: {
            radiusTopLeft: [10, 'rem'],
            radiusTopRight: [10, 'rem'],
            radiusBottomLeft: [10, 'rem'],
            radiusBottomRight: [10, 'rem'],
        },
    },
    //#endregion
    //#region 九宫格
    boxroulette_items_wrap: {},
    boxroulette_items_lottery: {},
    boxroulette_items_prizeItem: {
        backgroundGroup: {
            backgroundColor: 'rgba(214, 203, 255, 1)',
        },
        border: {
            radiusTopLeft: [0.8, 'rem'],
            radiusTopRight: [0.8, 'rem'],
            radiusBottomLeft: [0.8, 'rem'],
            radiusBottomRight: [0.8, 'rem'],
        },
    },
    boxroulette_items_selected_wrap: {
        backgroundGroup: {
            backgroundColor: 'rgba(255, 225, 135, 0)',
        },
        border: {
            borderPosition: {
                border: true,
                borderTop: false,
                borderRight: false,
                borderLeft: false,
                borderBottom: false,
            },
            radiusTopLeft: [0.9, 'rem'],
            radiusTopRight: [0.9, 'rem'],
            radiusBottomLeft: [0.9, 'rem'],
            radiusBottomRight: [0.9, 'rem'],
        },
        display: {
            display: 'block',
        },
        boxShadow: [
            {
                inset: true,
                color: 'rgba(103, 58, 183, 0.38 )',
                spread: [0.2, 'rem'],
                blur: [0.5, 'rem'],
            },
            {
                color: 'rgba(63, 81, 181, 1 )',
                spread: [0.15, 'rem'],
                inset: true,
            },
        ],
    },
    boxroulette_items_selected: {
        border: {
            borderStyle: 'none',
            borderPosition: {
                border: true,
                borderTop: false,
                borderRight: false,
                borderLeft: false,
                borderBottom: false,
            },
            borderColor: 'rgba(0, 0, 0, 0)',
            radiusTopLeft: [0.8, 'rem'],
            radiusTopRight: [0.8, 'rem'],
            radiusBottomLeft: [0.8, 'rem'],
            radiusBottomRight: [0.8, 'rem'],
        },
    },
    boxroulette_items_gameimg: {},
    boxroulette_items_prizealias: {},
    boxroulette_items_lotterybuttonwrap: {
        border: {
            radiusTopLeft: [0.8, 'rem'],
            radiusTopRight: [0.8, 'rem'],
            radiusBottomLeft: [0.8, 'rem'],
            radiusBottomRight: [0.8, 'rem'],
        },
        backgroundGroup: {
            backgroundColor: 'rgba(103, 58, 183, 1)',
        },
    },
    boxroulette_items_lotterybutton: {},
    boxroulette_items_prizeItem_wrap: {
        display: {
            padding: [
                [0.2, 'rem'],
                [0.2, 'rem'],
                [0.2, 'rem'],
                [0.2, 'rem'],
            ],
        },
    },
    //#endregion
    //#region 翻牌
    flipcard_item: {
        backgroundGroup: {},
        display: {
            padding: [
                [0.2, 'rem'],
                [0.2, 'rem'],
                [0.2, 'rem'],
                [0.2, 'rem'],
            ],
        },
    },
    flipcard_flipper: {
        backgroundGroup: {
            backgroundColor: 'rgba(255, 193, 7, 1)',
        },
    },
    flipcard_front: {
        backgroundGroup: {
            backgroundColor: 'rgba(193, 159, 255, 1)',
        },
    },
    flipcard_back: {
        backgroundGroup: {
            backgroundColor: 'rgba(156, 39, 176, 1)',
        },
    },
    flipcard_prizeAlias: {
        font: {
            color: 'rgba(255, 255, 255, 1)',
        },
    },
    flipcard_prizeImg: {
        border: {
            radiusTopLeft: [2, 'rem'],
            radiusTopRight: [2, 'rem'],
            radiusBottomLeft: [2, 'rem'],
            radiusBottomRight: [2, 'rem'],
        },
    },
    //#endregion
    //#region 红包
    redenvelope_wrap: {},
    redenvelope_redpack: {
        display: {
            height: [50, 'vh'],
            position: 'absolute',
            top: [-20, '%'],
        },
    },
    redenvelope_redpackopen: {},
    redenvelope_topcontent: {},
    redenvelope_info: {},
    redenvelope_subtitle: {},
    redenvelope_title: {},
    redenvelope_result: {},
    redenvelope_gameprizename: {},
    redenvelope_gameawardmsg: {},
    redenvelope_actionbox: {},
    redenvelope_startbutton: {},
    redenvelope_resultcontent: {},
    redenvelope_gameprize: {},
    redenvelope_memo: {},
    redenvelope_ensure: {},
    //#endregion
    //#region 骰子
    dice_side: {
        backgroundGroup: {
            backgroundColor: 'rgba(156, 39, 176, 1)',
        },
        boxShadow: [
            {
                inset: true,
                color: 'rgba(176, 38, 210, 0.66 )',
            },
        ],
    },
    dice_dot: {
        backgroundGroup: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        boxShadow: [
            {
                inset: true,
                spread: [0, 'rem'],
                color: 'rgba(0, 0, 0, 0.29 )',
                blur: [0.2, 'rem'],
            },
        ],
    },
    dice_dice: {
        backgroundGroup: {},
        display: {
            position: 'absolute',
            left: [4, 'rem'],
        },
    },
    dice_wrap: {},
    //#endregion
    //#region 老虎机
    slotmachine_wrap: {
        display: {
            height: [6, 'rem'],
        },
        backgroundGroup: {},
    },
    slotmachine_game: {
        boxShadow: [
            {
                inset: true,
                shiftDown: [3, 'rem'],
                color: 'rgba(255, 255, 255, 0.13 )',
                shiftRight: ['', ''],
                blur: [null, 'rem'],
            },
            {
                inset: true,
                color: 'rgba(95, 39, 176, 0.6 )',
                shiftRight: ['', ''],
                spread: [0, 'rem'],
                blur: [1.2, 'rem'],
            },
        ],
        border: {
            radiusTopLeft: [1, 'rem'],
            radiusTopRight: [1, 'rem'],
            radiusBottomLeft: [1, 'rem'],
            radiusBottomRight: [1, 'rem'],
        },
        backgroundGroup: {
            backgroundColor: 'rgba(216, 186, 222, 1)',
        },
    },
    slotmachine_gamewrap: {
        border: {
            radiusTopLeft: [1, 'rem'],
            radiusTopRight: [1, 'rem'],
            radiusBottomLeft: [1, 'rem'],
            radiusBottomRight: [1, 'rem'],
        },
    },
    slotmachine_gameitem_wrap: {},
    slotmachine_gameitem: {},
    slotmachine_gameimg: {
        display: {
            width: [5, 'rem'],
            position: 'absolute',
            left: ['unset', '-'],
            top: [5, '%'],
            right: [55, '%'],
        },
        backgroundGroup: {
            backgroundColor: 'rgba(199, 145, 213, 1)',
        },
        border: {
            radiusTopLeft: [4, 'rem'],
            radiusTopRight: [4, 'rem'],
            radiusBottomLeft: [4, 'rem'],
            radiusBottomRight: [4, 'rem'],
        },
    },
    slotmachine_prizealias: {
        font: {
            lineHeight: [2.5, 'rem'],
            fontSize: [1.5, 'rem'],
            align: 'left',
            color: 'rgba(126, 98, 175, 1)',
            fontWeight: 'bold',
        },
        backgroundGroup: {},
        display: {
            position: 'absolute',
            left: [50, '%'],
        },
        textShadow: [
            {
                color: 'rgba(255, 255, 255, 1 )',
                shiftDown: [1, ''],
            },
        ],
    },
    slotmachine_startbtn: {
        backgroundGroup: {
            backgroundColor: 'rgba(103, 58, 183, 1)',
        },
        display: {
            width: [4, 'rem'],
            height: [4, 'rem'],
            margin: [
                [1, 'rem'],
                ['auto', '-'],
                [1, 'rem'],
                ['auto', '-'],
            ],
        },
        font: {
            lineHeight: [4, 'rem'],
            color: 'rgba(255, 255, 255, 1)',
            fontSize: [0.9, 'rem'],
        },
        border: {
            radiusTopLeft: [50, ''],
            radiusTopRight: [50, ''],
            radiusBottomLeft: [50, ''],
            radiusBottomRight: [50, ''],
            borderStyle: 'solid',
            borderPosition: {
                border: true,
                borderTop: false,
                borderRight: false,
                borderLeft: false,
                borderBottom: false,
            },
            borderColor: 'rgba(127, 78, 218, 1)',
            borderWidth: [0.5, 'rem'],
        },
        boxShadow: [
            {
                inset: true,
                shiftDown: [-1.5, 'rem'],
                color: 'rgba(200, 36, 243, 0.16 )',
            },
            {
                color: 'rgba(68, 53, 143, 1 )',
                shiftDown: [-0.2, 'rem'],
            },
        ],
    },
    //#endregion
    //#region 通用弹窗
    dialog_overlay: {},
    dialog_content_wrap: {},
    dialog_content: {},
    dialog_modules: {
        backgroundGroup: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        border: {
            radiusTopLeft: [1, 'rem'],
            radiusTopRight: [1, 'rem'],
            radiusBottomLeft: [1, 'rem'],
            radiusBottomRight: [1, 'rem'],
        },
        display: {
            width: [80, 'vw'],
        },
    },
    dialog_article: {},
    dialog_contentwrap: {},
    dialog_close: {
        display: {
            width: [1.6, 'rem'],
            height: [1.6, 'rem'],
            position: 'absolute',
            bottom: [-3.5, 'rem'],
            left: [50, '%'],
            top: ['unset', '-'],
            margin: [null, null, null, [-0.8, 'rem']],
        },
        backgroundGroup: {
            backgroundList: [
                {
                    imageUrl:
                        'https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0924132958042.png',
                    repeat: 'no-repeat',
                    sizeY: [100, '%'],
                    sizeX: [100, '%'],
                },
            ],
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
    },
    dialog_submit: {
        backgroundGroup: {
            backgroundList: [
                {
                    gradient: [
                        {
                            color: 'rgba(156, 39, 176, 1)',
                            transition: 1,
                        },
                        {
                            color: 'rgba(103, 58, 183, 1)',
                            transition: 100,
                        },
                    ],
                    gradientDirections: 'top',
                },
            ],
        },
        border: {
            borderPosition: {
                borderTop: false,
                borderRight: false,
                borderBottom: false,
                borderLeft: false,
                border: true,
            },
            radiusTopLeft: [1, 'rem'],
            radiusTopRight: [1, 'rem'],
            radiusBottomLeft: [1, 'rem'],
            radiusBottomRight: [1, 'rem'],
            borderStyle: 'none',
            borderWidth: [0, 'px'],
        },
        font: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: [1, 'rem'],
        },
        display: {
            padding: [
                [0.5, 'rem'],
                [1, 'rem'],
                [0.5, 'rem'],
                [1, 'rem'],
            ],
        },
    },
    //#endregion
    //#region 中奖弹窗
    successmodal_contenttop: {},
    successmodal_article_content: {},
    successmodal_header: {},
    successmodal_modaltitle: {
        display: {
            padding: [[1, 'rem'], null, null, null],
        },
        font: {
            fontWeight: 'bold',
            fontSize: [1.2, 'rem'],
        },
    },
    successmodal_prizename: {
        display: {
            padding: [[1, 'rem'], null, null, null],
        },
    },
    successmodal_awardmsg: {},
    successmodal_prizeimg: {
        display: {
            width: [50, '%'],
        },
    },
    successmodal_memo: {},
    successmodal_footer: {
        display: {
            padding: [[1, 'rem'], null, [2, 'rem'], null],
        },
    },
    successmodal_contentbottom: {},
    //#endregion
    //#region 未中奖信息
    failedmodal_contenttop: {},
    failedmodal_article_content: {},
    failedmodal_header: {},
    failedmodal_modaltitle: {},
    failedmodal_prizename: {
        display: {
            padding: [[1, 'rem'], null, null, null],
        },
    },
    failedmodal_awardmsg: {},
    failedmodal_prizeimg: {
        display: {
            width: [50, '%'],
        },
    },
    failedmodal_memo: {},
    failedmodal_footer: {
        display: {
            padding: [[1, 'rem'], null, [2, 'rem'], null],
        },
    },
    failedmodal_contentbottom: {},
    //#endregion
    //#region 地址弹窗
    addressmodal_addressbox: {},
    addressmodal_formbox: {},
    addressmodal_header: {},
    addressmodal_main: {},
    addressmodal_player: {},
    addressmodal_subtitle: {},
    addressmodal_row: {},
    addressmodal_label: {},
    addressmodal_input: {},
    addressmodal_textarea: {},
    //#endregion
    //#region 规则弹窗
    rules_content: {},
    rules_header: {
        font: {
            fontSize: [1.2, 'rem'],
        },
        display: {
            padding: [[1, 'rem'], null, [0.5, 'rem'], null],
        },
    },
    rules_list: {},
    rules_list_item: {},
    rules_footer: {},
    //#endregion
    //#region 记录弹窗
    records_content: {},
    records_header: {
        font: {
            fontSize: [1.2, 'rem'],
        },
        display: {
            padding: [[1, 'rem'], null, [0.5, 'rem'], null],
        },
    },
    records_list: {},
    records_list_item: {},
    records_list_item_prizeimg_wrap: {},
    records_list_item_prizeimg: {},
    records_list_item_text: {},
    records_list_item_prizename: {},
    records_list_item_wintime: {},
    records_list_item_saveaddress: {},
    records_list_item_address: {},
    records_footer: {},
    //#endregion
};

export const styleDescription:
    | {
          [keys: string]: string;
      }
    | StyleDescItem[] = [
    {
        title: '基础',
        value: 'basic',
        children: [
            {
                title: '大转盘',
                value: 'roulette_wrap',
                children: [
                    {
                        title: '转盘',
                        value: 'roulette_wheel',
                        children: [
                            {
                                title: '奖品',
                                value: 'roulette_award',
                                children: [
                                    {
                                        title: '奖品图片',
                                        value: 'roulette_gameImg',
                                    },
                                    {
                                        title: '奖品别名/名称',
                                        value: 'roulette_prizealias',
                                    },
                                ],
                            },
                            {
                                title: '分割线',
                                value: 'roulette_divide',
                            },
                        ],
                    },
                    {
                        title: '指针',
                        value: 'roulette_needle',
                    },
                    {
                        title: '抽奖按钮',
                        value: 'roulette_lotterybutton',
                    },
                ],
            },
            {
                title: '九宫格',
                value: 'boxroulette_items_wrap',
                children: [
                    {
                        title: '游戏外框',
                        value: 'boxroulette_items_lottery',
                        children: [
                            {
                                title: '奖品外框',
                                value: 'boxroulette_items_prizeItem_wrap',
                                children: [
                                    {
                                        title: '奖品',
                                        value: 'boxroulette_items_prizeItem',
                                        children: [
                                            {
                                                title: '奖品激活/选中外框',
                                                value: 'boxroulette_items_selected_wrap',
                                                children: [
                                                    {
                                                        title: '奖品激活/选中',
                                                        value: 'boxroulette_items_selected',
                                                    },
                                                ],
                                            },
                                            {
                                                title: '奖品图片',
                                                value: 'boxroulette_items_gameimg',
                                            },
                                            {
                                                title: '奖品名称',
                                                value: 'boxroulette_items_prizealias',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: '抽奖按钮外框',
                                value: 'boxroulette_items_lotterybuttonwrap',
                                children: [
                                    {
                                        title: '抽奖按钮',
                                        value: 'boxroulette_items_lotterybutton',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '翻牌',
                value: 'flipcard_wrap',
                children: [
                    {
                        title: '牌',
                        value: 'flipcard_item',
                        children: [
                            {
                                title: '牌面',
                                value: 'flipcard_front',
                            },
                            {
                                title: '牌底',
                                value: 'flipcard_back',
                                children: [
                                    {
                                        title: '奖品图片',
                                        value: 'flipcard_prizeImg',
                                    },
                                    {
                                        title: '奖品名称',
                                        value: 'flipcard_prizeAlias',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '红包',
                value: 'redenvelope_wrap',
                children: [
                    {
                        title: '红包外框',
                        value: 'redenvelope_redpack',
                        children: [
                            {
                                title: '红包底',
                                value: 'redenvelope_redpackopen',
                            },
                            {
                                title: '红包封面',
                                value: 'redenvelope_topcontent',
                                children: [
                                    {
                                        title: '提示文',
                                        value: 'redenvelope_info',
                                        children: [
                                            {
                                                title: '标题',
                                                value: 'redenvelope_title',
                                            },
                                            {
                                                title: '副标题',
                                                value: 'redenvelope_subtitle',
                                            },
                                        ],
                                    },
                                    {
                                        title: '打开提示文',
                                        value: 'redenvelope_result',
                                        children: [
                                            {
                                                title: '奖品名',
                                                value: 'redenvelope_gameprizename',
                                            },
                                            {
                                                title: '奖品信息',
                                                value: 'redenvelope_gameawardmsg',
                                            },
                                        ],
                                    },
                                    {
                                        title: '按钮外框',
                                        value: 'redenvelope_actionbox',
                                        children: [
                                            {
                                                title: '按钮',
                                                value: 'redenvelope_startbutton',
                                            },
                                        ],
                                    },
                                    {
                                        title: '中奖内容',
                                        value: 'redenvelope_resultcontent',
                                        children: [
                                            {
                                                title: '奖品图片',
                                                value: 'redenvelope_gameprize',
                                            },
                                            {
                                                title: '奖品备注',
                                                value: 'redenvelope_memo',
                                            },
                                            {
                                                title: '操作按钮',
                                                value: 'redenvelope_ensure',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '骰子',
                value: 'dice_wrap',
                children: [
                    {
                        title: '骰子外框',
                        value: 'dice_dice',
                        children: [
                            {
                                title: '面',
                                value: 'dice_side',
                            },
                            {
                                title: '点',
                                value: 'dice_dot',
                            },
                        ],
                    },
                ],
            },
            {
                title: '老虎机',
                value: 'slotmachine_wrap',
                children: [
                    {
                        title: '游戏',
                        value: 'slotmachine_game',
                        children: [
                            {
                                title: '奖品外框',
                                value: 'slotmachine_gamewrap',
                                children: [
                                    {
                                        title: '奖品',
                                        value: 'slotmachine_gameitem_wrap',
                                        children: [
                                            {
                                                title: '单项奖品',
                                                value: 'slotmachine_gameitem',
                                                children: [
                                                    {
                                                        title: '奖品图片',
                                                        value: 'slotmachine_gameimg',
                                                    },
                                                    {
                                                        title: '奖品别名',
                                                        value: 'slotmachine_prizealias',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: '游戏按钮',
                                value: 'slotmachine_startbtn',
                            },
                        ],
                    },
                ],
            },
            {
                title: '弹窗(遮罩层)',
                value: 'dialog_overlay',
                children: [
                    {
                        title: '包裹器',
                        value: 'dialog_content_wrap',
                        children: [
                            {
                                title: '外框',
                                value: 'dialog_content',
                                children: [
                                    {
                                        title: '弹窗',
                                        value: 'dialog_modules',
                                        children: [
                                            {
                                                title: '内容外框',
                                                value: 'dialog_article',
                                            },
                                            {
                                                title: '内容',
                                                value: 'dialog_contentwrap',
                                            },
                                            {
                                                title: '提交按钮',
                                                value: 'dialog_submit',
                                            },
                                        ],
                                    },
                                    {
                                        title: '关闭按钮/图标',
                                        value: 'dialog_close',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '中奖弹窗',
                value: 'successmodal_article_content',
                children: [
                    {
                        title: '顶部',
                        value: 'successmodal_contenttop',
                    },
                    {
                        title: '头部',
                        value: 'successmodal_header',
                        children: [
                            {
                                title: '标题',
                                value: 'successmodal_modaltitle',
                            },
                        ],
                    },
                    {
                        title: '奖品名',
                        value: 'successmodal_prizename',
                    },
                    {
                        title: '获奖信息',
                        value: 'successmodal_awardmsg',
                    },
                    {
                        title: '奖品图片',
                        value: 'successmodal_prizeimg',
                    },
                    {
                        title: '奖品备注',
                        value: 'successmodal_memo',
                    },
                    {
                        title: '底部',
                        value: 'successmodal_contentbottom',
                    },
                    {
                        title: '脚部',
                        value: 'successmodal_footer',
                    },
                ],
            },
            {
                title: '未中奖弹窗',
                value: 'failedmodal_article_content',
                children: [
                    {
                        title: '顶部',
                        value: 'failedmodal_contenttop',
                    },
                    {
                        title: '头部',
                        value: 'failedmodal_header',
                        children: [
                            {
                                title: '标题',
                                value: 'failedmodal_modaltitle',
                            },
                        ],
                    },
                    {
                        title: '奖品名',
                        value: 'failedmodal_prizename',
                    },
                    {
                        title: '获奖信息',
                        value: 'failedmodal_awardmsg',
                    },
                    {
                        title: '奖品图片',
                        value: 'failedmodal_prizeimg',
                    },
                    {
                        title: '奖品备注',
                        value: 'failedmodal_memo',
                    },
                    {
                        title: '底部',
                        value: 'failedmodal_contentbottom',
                    },
                    {
                        title: '脚部',
                        value: 'failedmodal_footer',
                    },
                ],
            },
            {
                title: '地址弹窗',
                value: 'addressmodal_addressbox',
                children: [
                    {
                        title: '外框',
                        value: 'addressmodal_formbox',
                        children: [
                            {
                                title: '头部/标题',
                                value: 'addressmodal_header',
                            },
                            {
                                title: '内容',
                                value: 'addressmodal_main',
                                children: [
                                    {
                                        title: '玩家信息',
                                        value: 'addressmodal_player',
                                    },
                                    {
                                        title: '子标题',
                                        value: 'addressmodal_subtitle',
                                    },
                                    {
                                        title: '表单项',
                                        value: 'addressmodal_row',
                                        children: [
                                            {
                                                title: '标签',
                                                value: 'addressmodal_label',
                                            },
                                            {
                                                title: '输入框',
                                                value: 'addressmodal_input',
                                            },
                                            {
                                                title: '文本框',
                                                value: 'addressmodal_textarea',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                              title: '脚部',
                              value: 'addressmodal_footer',
                          },
                        ],
                    },
                ],
            },
            {
                title: '规则弹窗',
                value: 'rules_content',
                children: [
                    {
                        title: '标题/头部',
                        value: 'rules_header',
                    },
                    {
                        title: '内容',
                        value: 'rules_list',
                        children: [
                            {
                                title: '规则项',
                                value: 'rules_list_item',
                            },
                        ],
                    },
                    {
                        title: '脚部',
                        value: 'rules_footer',
                    },
                ],
            },
            {
              title: "中奖记录",
              value: 'records_content',
              children: [
                {
                  title: '标题/头部',
                  value: 'records_header',
                },
                {
                  title: '记录列表',
                  value: 'records_list',
                  children: [
                      {
                          title: '记录项',
                          value: 'records_list_item',
                          children: [
                              {
                                  title: '奖品图片外框',
                                  value: 'records_list_item_prizeimg_wrap',
                                  children: [
                                      {
                                          title: '奖品图片',
                                          value: 'records_list_item_prizeimg',
                                      },
                                  ],
                              },
                              {
                                  title: '内容',
                                  value: 'records_list_item_text',
                                  children: [
                                      {
                                          title: '奖品名称',
                                          value: 'records_list_item_prizename',
                                      },
                                      {
                                          title: '时间',
                                          value: 'records_list_item_wintime',
                                      },
                                      {
                                          title: '填写地址',
                                          value: 'records_list_item_saveaddress',
                                      },
                                      {
                                          title: '地址信息',
                                          value: 'records_list_item_address',
                                      },
                                  ],
                              },
                          ],
                      },
                  ],
                },
                {
                  title: '脚部',
                  value: 'records_footer',
                },
              ]
            },
        ],
    },
];
