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
                title: '半透明遮罩层',
                value: 'dialog_overlay',
                children: [
                    {
                        title: '弹窗外框',
                        value: 'dialog_content'
                    },
                    {
                        title: '弹窗',
                        value: 'dialog_modules'
                    },
                    {
                        title: '容器外框',
                        value: 'dialog_article'
                    },
                    {
                        title: '容器',
                        value: 'dialog_contentwrap'
                    },
                    {
                        title: '头部',
                        value: 'dialog_header'
                    },
                ]
            }
        ]
    },
];