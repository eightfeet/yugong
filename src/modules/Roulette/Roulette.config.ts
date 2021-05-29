import {
  ExposeFunctions,
  ComExposeEvents,
  ExposeDefaultProps,
  ExposeApi,
} from "~/types/modules";

const config: {
  exposeFunctions: ExposeFunctions[];
  exposeEvents: ComExposeEvents;
  exposeDefaultProps: ExposeDefaultProps;
  exposeApi: ExposeApi[];
} = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [],

  /**
   * 发布事件的静态描述
   */
  exposeEvents: [
    {
      name: "mount",
      description: "初始化",
    },
    {
      name: "unmount",
      description: "卸载",
    },
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    style: {
      basic: {},
      wrap: {},
      light: {},
      wheel: {},
      divide: {},
      prizealias: {},
      lotterybutton: {},
      needle: {},
      gameImg: {},
      successclose: {},
      successoverlay: {},
      successcontainer: {},
      successcontent: {},
      successheader: {},
      successarticle: {},
      successok: {},
      successokdisabled: {},
      successcancel: {},
      successcanceldisabled: {},
      successmodify: {},
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "抽奖器",
            value: "wrap",
            children: [
              {
                title: "盘(svg通过文字字体颜色设置背景色)",
                value: "light",
              },
              {
                title: "转盘",
                value: "wheel",
              },
              {
                title: "分割线",
                value: "divide",
              },
              {
                title: "奖品名/别名",
                value: "prizealias",
              },
              {
                title: "抽奖按钮",
                value: "lotterybutton",
              },
              {
                title: "抽奖按钮指针",
                value: "needle",
              },
              {
                title: "奖品/游戏图片",
                value: "gameImg",
              },
            ],
          },
          {
            title: "中奖弹窗",
            value: "successcontainer",
            children: [
              {
                title: "遮罩层",
                value: "successoverlay",
              },
              {
                title: "弹窗",
                value: "successcontent",
                children: [
                  {
                    title: "头部",
                    value: "successheader",
                  },
                  {
                    title: "内容",
                    value: "successarticle",
                  },
                  {
                    title: "关闭按钮",
                    value: "successclose",
                  },
                  {
                    title: "确定按钮",
                    value: "successok",
                  },
                  {
                    title: "确定按钮禁用",
                    value: "successokdisabled",
                  },
                  {
                    title: "取消按钮",
                    value: "successcancel",
                  },
                  {
                    title: "取消按钮禁用",
                    value: "successcanceldisabled",
                  },
                ],
              },
              {
                title: "修饰层",
                value: "successmodify1",
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
