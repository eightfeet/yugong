import { AppDataElementsStyleTypes } from "~/types/appData";
import { StyleDescItem } from "~/types/modules";

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

};

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