import { title } from "process";
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
    // 弹窗包裹器_content_wrap
    dialog_content_wrap: {},
    // 弹窗外框_content
    dialog_content: {},
    // 弹窗_modules
    dialog_modules: {},
    // 容器外框_article
    dialog_article: {},
    // 容器_contentwrap
    dialog_contentwrap: {},
    // 关闭按钮_close
    dialog_close: {},
};

export const styleDescription: {
    [keys: string]: string;
} | StyleDescItem[] = [
    {
        title: '基础',
        value: 'basic',
        children: [
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
                                                value: 'dialog_article'
                                            },
                                            {
                                                title: '内容',
                                                value: 'dialog_contentwrap'
                                            }
                                        ]
                                    },
                                    {
                                        title: '关闭按钮/图标',
                                        value: 'dialog_close'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    },
];