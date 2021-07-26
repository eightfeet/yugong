import { ModulesStatic } from "~/types/modules";

const config: ModulesStatic = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
        name: "config",
        description: "配置弹窗",
        arguments: [
            {
                type: 'string',
                describe: '设置标题',
                name: '标题',
                data: '',
                html: true,
                fieldName: 'title'
            },
        ],
      },
    {
      name: "show",
      description: "显示",
      presettable: false,
      arguments: [],
    },
    {
      name: "hide",
      description: "隐藏",
      presettable: false,
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
      name: "ok",
      description: "点击确认按钮时",
    }
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    layout: {
      w: 0,
      h: 0,
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
  ],
};

export default config;
