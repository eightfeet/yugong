import { ModulesStatic } from "~/types/modules";

const config: ModulesStatic = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
      name: "configModal",
      description: "设置弹窗",
      arguments: [],
    },
    {
      name: "show",
      description: "显示",
      arguments: [],
    },
    {
      name: "hide",
      description: "隐藏",
      arguments: [],
    },
  ],

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
    {
      name: "onShow",
      description: "显示时",
    },
    {
      name: "onHide",
      description: "隐藏时",
    },
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    layout: {
      w: 5,
      h: 5,
      x: 0,
      y: 0,
    },
    style: {
      basic: {},
      overlay: {},
      close: {
        font: {
          color: "#eee",
        },
        display: {
          width: [15, ""],
          height: [15, ""],
          position: "absolute",
          right: [0, ""],
          top: [-25, ""],
        },
      },
      container: {},
      content:{},
      header: {},
      article: {},
      button: {},
      okButton: {},
      cancelButton: {},
      modify: {},
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "遮罩层",
            value: "overlay",
          },
          {
            title: "关闭按钮",
            value: "close",
          },
          {
            title: "弹窗容器",
            value: "container",
            children: [
              {
                title: "弹窗",
                value: "content",
                children: [
                  {
                    title: "头部",
                    value: "header",
                  },
                  {
                    title: "内容",
                    value: "article",
                  },
                  {
                    title: "按钮",
                    value: "button",
                    children: [
                      {
                        title: "确定按钮",
                        value: "okButton",
                      },
                      {
                        title: "取消按钮",
                        value: "cancelButton",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "修饰层",
            value: "modify",
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
      apiId: "onOkApi",
      name: "确定",
      description: "确认弹窗时可以调用api",
    },
    {
      apiId: "onCancelApi",
      name: "取消",
      description: "确认弹窗时可以调用api",
    },
  ],
};

export default config;
