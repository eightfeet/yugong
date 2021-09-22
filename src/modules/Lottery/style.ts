import { AppDataElementsStyleTypes } from "~/types/appData";
import { StyleDescItem } from "~/types/modules";

export const style: AppDataElementsStyleTypes = {
    basic: {},
    /** -----------九宫格----------- */ 
    // 游戏外框
    boxroulette_wrap:{},
    // 奖品
    boxroulette_prize:{},
    // 游戏图片
    boxroulette_gameImg: {},
    // 奖品别名
    boxroulette_prizeAlias:{},
    // 抽奖按钮
    boxroulette_lotteryButton:{},
    // 抽奖激活框
    boxroulette_activated:{},
    /** -----------弹窗-------------- */
    // 半透明遮罩层_overlay
    dialog_overlay: {},
    // 弹窗外框_content
    dialog_content: {},
    // 弹窗_modules
    dialog_modules: {},
    // 容器外框_article
    dialog_article: {},
    // 容器_contentwrap
    dialog_contentwrap: {},
    // 头部_header
    dialog_header: {},
    // 标题_modaltitle
    dialog_modaltitle: {},
    // 内容_article_content
    dialog_article_content: {},
    // 关闭按钮_close
    dialog_close: {},
};

//
/* 
// 地址
`${MID}_addressmodal_wrap`
`${MID}_addressmodal_overlay`
`${MID}_addressmodal_content_wrap`
`${MID}_addressmodal_content`
`${MID}_addressmodal_modules`
`${MID}_addressmodal_article`
`${MID}_addressmodal_close`

// 中奖
`${MID}_successmodal_wrap`
`${MID}_successmodal_overlay`
`${MID}_successmodal_content_wrap`
`${MID}_successmodal_content`
`${MID}_successmodal_modules`
`${MID}_successmodal_article`
`${MID}_successmodal_close`

// 未中奖
`${MID}_failedmodal_wrap`
`${MID}_failedmodal_overlay`
`${MID}_failedmodal_content_wrap`
`${MID}_failedmodal_content`
`${MID}_failedmodal_modules`
`${MID}_failedmodal_article`
`${MID}_failedmodal_close`

// 中奖规则
`${MID}_rules_wrap`
`${MID}_rules_overlay`
`${MID}_rules_content_wrap`
`${MID}_rules_content`
`${MID}_rules_modules`
`${MID}_rules_article`
`${MID}_rules_close`

// 中奖记录
`${MID}_records_wrap`
`${MID}_records_overlay`
`${MID}_records_content_wrap`
`${MID}_records_content`
`${MID}_records_modules`
`${MID}_records_article`
`${MID}_records_close`

*/

// 半透明遮罩层_overlay
    //     弹窗外框_content
    //         弹窗_modules
    //             容器外框_article
    //                 容器_contentwrap
    //                     头部_header
    //                         标题_modaltitle
    //                     内容_article_content
    //                         奖品名称_prizename
    //                         获奖信息_awardmsg
    //                         奖品图片_prizeimg
    //                         备注_memo
    //                     脚部_footer
    //                         确定按钮_submit
    //         关闭按钮_close

export const styleDescription: {
    [keys: string]: string;
} | StyleDescItem[] = [
    {
        title: '基础',
        value: 'basic',
        children: [
            {
                title: '抽奖器',
                value: 'wrap',
                children: [
                ]
            }
        ]
    },
];