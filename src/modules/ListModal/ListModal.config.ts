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
          type: "string",
          describe: "设置标题",
          name: "标题",
          data: "",
          html: true,
          fieldName: "title",
        },
      ],
    },
    {
      name: "itemConfig",
      description: "单项数据规则配置(数据源来自于获取数据Api的单项)",
      arguments: [
        {
          type: "string",
          describe: "设置单项封面",
          name: "单项封面",
          data: "",
          fieldName: "itemCover",
        },
        {
          type: "string",
          describe: "设置单项标题",
          name: "单项标题",
          data: "",
          html: true,
          fieldName: "itemTitle",
        },
        {
          type: "string",
          describe: "设置单项子标题",
          name: "单项子标题",
          data: "",
          html: true,
          fieldName: "itemSubTitle",
        },
        {
          type: "string",
          describe: "设置单项内容",
          name: "单项内容",
          data: "",
          html: true,
          fieldName: "itemContent",
        },
      ],
    },
    {
      name: "buttonConfig",
      description: "按钮配置",
      arguments: [
        {
          type: "object",
          describe:
            "按钮A设置<br />name:按钮标题<br /> show: 是否显示，0隐藏1显示",
          name: "按钮A",
          data: {
            name: "按钮A",
            show: "0",
          },
          fieldName: "buttonA",
        },
        {
          type: "object",
          describe:
            "按钮B设置<br />name:按钮标题<br /> show: 是否显示，0隐藏1显示",
          name: "按钮B",
          data: {
            name: "按钮B",
            show: "0",
          },
          fieldName: "buttonB",
        },
        {
          type: "object",
          describe:
            "按钮C设置<br />name:按钮标题<br /> show: 是否显示，0隐藏1显示",
          name: "按钮C",
          data: {
            name: "按钮C",
            show: "0",
          },
          fieldName: "buttonC",
        },
      ],
    },
    {
      name: "getList",
      description: "获取数据",
    },
    {
      name: "publishActivatedToRuntime",
      description: "将激活选项发布到运行时",
      presettable: false,
      arguments: [
        {
          type: "string",
          describe:
            "点击列表某项时将被点击项发布到运行时",
          name: "字段名(英文字母)",
          data: '',
          fieldName: "runtimeTag",
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
      name: "cancel",
      description: "取消/关闭",
    },
    {
      name: "clickItem",
      description: "点击(文字部分)",
    },
    {
      name: "clickA",
      description: "点击(按钮A)",
    },
    {
      name: "clickB",
      description: "点击(按钮B)",
    },
    {
      name: "clickC",
      description: "点击(按钮C)",
    },
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
      content: {},
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
    {
      apiId: "getList",
      name: "获取数据",
    },
  ],
};

export default config;
