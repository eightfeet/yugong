import { AppDataElementsStyleTypes } from "~/types/appData";
import { StyleDescItem } from "~/types/modules";

export const style: AppDataElementsStyleTypes = {
  basic: {},
  roulette_wrap: {},
  roulette_lottery: {},
  roulette_wheel: {
    border: {
      radiusTopLeft: [20, "rem"],
      radiusTopRight: [20, "rem"],
      radiusBottomLeft: [20, "rem"],
      radiusBottomRight: [20, "rem"],
    },
    backgroundGroup: {
      backgroundColor: "rgba(213, 205, 255, 1)",
    },
    boxShadow: [
      {
        inset: true,
        spread: [0.5, "rem"],
        color: "rgba(120, 98, 227, 1 )",
      },
    ],
  },
  roulette_award: {},
  roulette_prizealias: {},
  roulette_gameImg: {},
  roulette_divide: {
    backgroundGroup: {
      backgroundColor: "rgba(103, 58, 183, 0.38)",
    },
  },
  roulette_needle: {
    backgroundGroup: {
      backgroundColor: "rgba(103, 58, 183, 1)",
    },
    border: {
      radiusTopLeft: [10, "rem"],
      radiusTopRight: [10, "rem"],
      radiusBottomLeft: [10, "rem"],
      radiusBottomRight: [10, "rem"],
    },
  },
  roulette_lotterybutton: {
    backgroundGroup: {
      backgroundColor: "rgba(63, 81, 181, 0.8)",
    },
    border: {
      radiusTopLeft: [10, "rem"],
      radiusTopRight: [10, "rem"],
      radiusBottomLeft: [10, "rem"],
      radiusBottomRight: [10, "rem"],
    },
  },
  boxroulette_items_wrap: {},
  boxroulette_items_lottery: {},
  boxroulette_items_prizeItem: {
    backgroundGroup: {
      backgroundColor: "rgba(214, 203, 255, 1)",
    },
    border: {
      radiusTopLeft: [0.8, "rem"],
      radiusTopRight: [0.8, "rem"],
      radiusBottomLeft: [0.8, "rem"],
      radiusBottomRight: [0.8, "rem"],
    },
  },
  boxroulette_items_selected_wrap: {
    backgroundGroup: {
      backgroundColor: "rgba(255, 225, 135, 0)",
    },
    border: {
      borderPosition: {
        border: true,
        borderTop: false,
        borderRight: false,
        borderLeft: false,
        borderBottom: false,
      },
      radiusTopLeft: [0.9, "rem"],
      radiusTopRight: [0.9, "rem"],
      radiusBottomLeft: [0.9, "rem"],
      radiusBottomRight: [0.9, "rem"],
    },
    display: {
      display: "block",
    },
    boxShadow: [
      {
        inset: true,
        color: "rgba(103, 58, 183, 0.38 )",
        spread: [0.2, "rem"],
        blur: [0.5, "rem"],
      },
      {
        color: "rgba(63, 81, 181, 1 )",
        spread: [0.15, "rem"],
        inset: true,
      },
    ],
  },
  boxroulette_items_selected: {
    border: {
      borderStyle: "none",
      borderPosition: {
        border: true,
        borderTop: false,
        borderRight: false,
        borderLeft: false,
        borderBottom: false,
      },
      borderColor: "rgba(0, 0, 0, 0)",
      radiusTopLeft: [0.8, "rem"],
      radiusTopRight: [0.8, "rem"],
      radiusBottomLeft: [0.8, "rem"],
      radiusBottomRight: [0.8, "rem"],
    },
  },
  boxroulette_items_gameimg: {},
  boxroulette_items_prizealias: {},
  boxroulette_items_lotterybuttonwrap: {
    border: {
      radiusTopLeft: [0.8, "rem"],
      radiusTopRight: [0.8, "rem"],
      radiusBottomLeft: [0.8, "rem"],
      radiusBottomRight: [0.8, "rem"],
    },
    backgroundGroup: {
      backgroundColor: "rgba(103, 58, 183, 1)",
    },
  },
  boxroulette_items_lotterybutton: {},

  flipcard_item: {
    backgroundGroup: {},
    display: {
      padding: [
        [0.2, "rem"],
        [0.2, "rem"],
        [0.2, "rem"],
        [0.2, "rem"],
      ],
    },
  },
  flipcard_flipper: {
    backgroundGroup: {
      backgroundColor: "rgba(255, 193, 7, 1)",
    },
  },
  flipcard_front: {
    backgroundGroup: {
      backgroundColor: "rgba(193, 159, 255, 1)",
    },
  },
  flipcard_back: {
    backgroundGroup: {
      backgroundColor: "rgba(156, 39, 176, 1)",
    },
  },
  flipcard_prizeAlias: {
    font: {
      color: "rgba(255, 255, 255, 1)",
    },
  },
  flipcard_prizeImg: {
    border: {
      radiusTopLeft: [2, "rem"],
      radiusTopRight: [2, "rem"],
      radiusBottomLeft: [2, "rem"],
      radiusBottomRight: [2, "rem"],
    },
  },

  dialog_overlay: {},
  dialog_content_wrap: {},
  dialog_content: {},
  dialog_modules: {
    backgroundGroup: {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    border: {
      radiusTopLeft: [1, "rem"],
      radiusTopRight: [1, "rem"],
      radiusBottomLeft: [1, "rem"],
      radiusBottomRight: [1, "rem"],
    },
    display: {
      width: [80, "vw"],
    },
  },
  dialog_article: {},
  dialog_contentwrap: {},
  dialog_close: {
    display: {
      width: [1.6, "rem"],
      height: [1.6, "rem"],
      position: "absolute",
      bottom: [-3.5, "rem"],
      left: [50, "%"],
      top: ["unset", "-"],
      margin: [null, null, null, [-0.8, "rem"]],
    },
    backgroundGroup: {
      backgroundList: [
        {
          imageUrl:
            "https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0924132958042.png",
          repeat: "no-repeat",
          sizeY: [100, "%"],
          sizeX: [100, "%"],
        },
      ],
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
  dialog_submit: {
    backgroundGroup: {
      backgroundList: [
        {
          gradient: [
            {
              color: "rgba(156, 39, 176, 1)",
              transition: 1,
            },
            {
              color: "rgba(103, 58, 183, 1)",
              transition: 100,
            },
          ],
          gradientDirections: "top",
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
      radiusTopLeft: [1, "rem"],
      radiusTopRight: [1, "rem"],
      radiusBottomLeft: [1, "rem"],
      radiusBottomRight: [1, "rem"],
      borderStyle: "none",
      borderWidth: [0, "px"],
    },
    font: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: [1, "rem"],
    },
    display: {
      padding: [
        [0.5, "rem"],
        [1, "rem"],
        [0.5, "rem"],
        [1, "rem"],
      ],
    },
  },
  successmodal_contenttop: {},
  successmodal_article_content: {},
  successmodal_header: {},
  successmodal_modaltitle: {},
  successmodal_prizename: {},
  successmodal_awardmsg: {},
  successmodal_prizeimg: {},
  successmodal_memo: {},
  successmodal_contentbottom: {},
  failedmodal_contenttop: {},
  failedmodal_article_content: {},
  failedmodal_header: {},
  failedmodal_modaltitle: {},
  failedmodal_prizename: {},
  failedmodal_awardmsg: {},
  failedmodal_prizeimg: {},
  failedmodal_memo: {},
  failedmodal_contentbottom: {},
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
  rules_list: {},
  rules_list_item: {},
  records_list: {},
  records_list_item: {},
  records_list_item_prizeimg_wrap: {},
  records_list_item_prizeimg: {},
  records_list_item_text: {},
  records_list_item_prizename: {},
  records_list_item_wintime: {},
  records_list_item_saveaddress: {},
  records_list_item_address: {},
  boxroulette_items_prizeItem_wrap: {
    display: {
      padding: [
        [0.2, "rem"],
        [0.2, "rem"],
        [0.2, "rem"],
        [0.2, "rem"],
      ],
    },
  },
};

export const styleDescription:
  | {
      [keys: string]: string;
    }
  | StyleDescItem[] = [
  {
    title: "基础",
    value: "basic",
    children: [
      {
        title: "大转盘",
        value: "roulette_wrap",
        children: [
          {
            title: "转盘",
            value: "roulette_wheel",
            children: [
              {
                title: "奖品",
                value: "roulette_award",
                children: [
                  {
                    title: "奖品图片",
                    value: "roulette_gameImg",
                  },
                  {
                    title: "奖品别名/名称",
                    value: "roulette_prizealias",
                  },
                ],
              },
              {
                title: "分割线",
                value: "roulette_divide",
              },
            ],
          },
          {
            title: "指针",
            value: "roulette_needle",
          },
          {
            title: "抽奖按钮",
            value: "roulette_lotterybutton",
          },
        ],
      },
      {
        title: "九宫格",
        value: "boxroulette_items_wrap",
        children: [
          {
            title: "游戏外框",
            value: "boxroulette_items_lottery",
            children: [
              {
                title: "奖品外框",
                value: "boxroulette_items_prizeItem_wrap",
                children: [
                  {
                    title: "奖品",
                    value: "boxroulette_items_prizeItem",
                    children: [
                      {
                        title: "奖品激活/选中外框",
                        value: "boxroulette_items_selected_wrap",
                        children: [
                          {
                            title: "奖品激活/选中",
                            value: "boxroulette_items_selected",
                          },
                        ],
                      },
                      {
                        title: "奖品图片",
                        value: "boxroulette_items_gameimg",
                      },
                      {
                        title: "奖品名称",
                        value: "boxroulette_items_prizealias",
                      },
                    ],
                  },
                ],
              },
              {
                title: "抽奖按钮外框",
                value: "boxroulette_items_lotterybuttonwrap",
                children: [
                  {
                    title: "抽奖按钮",
                    value: "boxroulette_items_lotterybutton",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "翻牌",
        value: "flipcard_wrap",
        children: [
          {
            title: "牌",
            value: "flipcard_item",
            children: [
              {
                title: "牌面",
                value: "flipcard_front",
              },
              {
                title: "牌底",
                value: "flipcard_back",
                children: [
                  {
                    title: "奖品图片",
                    value: "flipcard_prizeImg",
                  },
                  {
                    title: "奖品名称",
                    value: "flipcard_prizeAlias",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "弹窗(遮罩层)",
        value: "dialog_overlay",
        children: [
          {
            title: "包裹器",
            value: "dialog_content_wrap",
            children: [
              {
                title: "外框",
                value: "dialog_content",
                children: [
                  {
                    title: "弹窗",
                    value: "dialog_modules",
                    children: [
                      {
                        title: "内容外框",
                        value: "dialog_article",
                      },
                      {
                        title: "内容",
                        value: "dialog_contentwrap",
                      },
                      {
                        title: "提交按钮",
                        value: "dialog_submit",
                      },
                    ],
                  },
                  {
                    title: "关闭按钮/图标",
                    value: "dialog_close",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "中奖弹窗",
        value: "successmodal_article_content",
        children: [
          {
            title: "顶部",
            value: "successmodal_contenttop",
          },
          {
            title: "头部",
            value: "successmodal_header",
            children: [
              {
                title: "标题",
                value: "successmodal_modaltitle",
              },
            ],
          },
          {
            title: "奖品名",
            value: "successmodal_prizename",
          },
          {
            title: "获奖信息",
            value: "successmodal_awardmsg",
          },
          {
            title: "奖品图片",
            value: "successmodal_prizeimg",
          },
          {
            title: "奖品备注",
            value: "successmodal_memo",
          },
          {
            title: "底部",
            value: "successmodal_contentbottom",
          },
        ],
      },
      {
        title: "未中奖弹窗",
        value: "failedmodal_article_content",
        children: [
          {
            title: "顶部",
            value: "failedmodal_contenttop",
          },
          {
            title: "头部",
            value: "failedmodal_header",
            children: [
              {
                title: "标题",
                value: "failedmodal_modaltitle",
              },
            ],
          },
          {
            title: "奖品名",
            value: "failedmodal_prizename",
          },
          {
            title: "获奖信息",
            value: "failedmodal_awardmsg",
          },
          {
            title: "奖品图片",
            value: "failedmodal_prizeimg",
          },
          {
            title: "奖品备注",
            value: "failedmodal_memo",
          },
          {
            title: "底部",
            value: "failedmodal_contentbottom",
          },
        ],
      },
      {
        title: "地址弹窗",
        value: "addressmodal_addressbox",
        children: [
          {
            title: "外框",
            value: "addressmodal_formbox",
            children: [
              {
                title: "标题",
                value: "addressmodal_header",
              },
              {
                title: "内容",
                value: "addressmodal_main",
                children: [
                  {
                    title: "玩家信息",
                    value: "addressmodal_player",
                  },
                  {
                    title: "子标题",
                    value: "addressmodal_subtitle",
                  },
                  {
                    title: "表单项",
                    value: "addressmodal_row",
                    children: [
                      {
                        title: "标签",
                        value: "addressmodal_label",
                      },
                      {
                        title: "输入框",
                        value: "addressmodal_input",
                      },
                      {
                        title: "文本框",
                        value: "addressmodal_textarea",
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
        title: "规则弹窗",
        value: "rules_list",
        children: [
          {
            title: "规则项",
            value: "rules_list_item",
          },
        ],
      },
      {
        title: "中奖记录",
        value: "records_list",
        children: [
          {
            title: "记录项",
            value: "records_list_item",
            children: [
              {
                title: "奖品图片外框",
                value: "records_list_item_prizeimg_wrap",
                children: [
                  {
                    title: "奖品图片",
                    value: "records_list_item_prizeimg",
                  },
                ],
              },
              {
                title: "内容",
                value: "records_list_item_text",
                children: [
                  {
                    title: "奖品名称",
                    value: "records_list_item_prizename",
                  },
                  {
                    title: "时间",
                    value: "records_list_item_wintime",
                  },
                  {
                    title: "填写地址",
                    value: "records_list_item_saveaddress",
                  },
                  {
                    title: "地址信息",
                    value: "records_list_item_address",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
