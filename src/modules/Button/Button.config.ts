import {
  ComExposeEvents,
  ExposeApi,
  ExposeDefaultProps,
  ExposeFunctions,
} from '~/types/modules';

const config: {
  exposeFunctions: ExposeFunctions[];
  exposeEvents: ComExposeEvents;
  exposeDefaultProps: ExposeDefaultProps;
  exposeApi: ExposeApi[];
} = {
  
/**
* 注册方法的静态描述与默认参数定义
*/
exposeFunctions: [
  {
    name: "setButton",
    description: "设置按钮",
    arguments: [
      {
        type: "string",
        name: "按钮文字",
        fieldName: "buttonText",
        html: true,
        describe: "按钮显示文字",
        data: "按钮",
      },
      {
        type: "boolean",
        name: "禁用按钮",
        fieldName: "disabled",
        describe: "禁用按钮，true禁用，false启用",
        data: {
          comparableAverageA: "a",
          comparableAverageB: undefined,
          method: "===",
        },
      },
      {
        type: "boolean",
        name: "隐藏按钮",
        fieldName: "hidden",
        describe: "隐藏按钮，true隐藏，false不隐藏",
        data: {
          comparableAverageA: "a",
          comparableAverageB: undefined,
          method: "===",
        },
      },
    ],
  },
  {
    name: "setButtonDisplay",
    description: '设置按钮初始样式',
    arguments: [{
      type: "string",
        name: "初始显示状态",
        fieldName: "setButtonDisplay",
        select: {normal: '正常', disabled: '禁用', focus: '获取焦点', active: '激活', hover: '经过'},
        describe: "",
        data: "normal",
    }]
  }
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
    name: "click",
    description: "点击",
  },
  {
    name: "doubleClick",
    description: "双击",
  },
  {
    name: "longPress",
    description: "长按",
  },
],

/**
 * 发布默认Api
 */
exposeApi: [
  {
    apiId: "beforeClick",
    name: "点击",
  },
  {
    apiId: "beforeDoubleClick",
    name: "双击",
  },
  {
    apiId: "beforeLongPress",
    name: "长按",
  },
],

/**
 * 发布默认porps
 */
exposeDefaultProps: {
  layout: {
    w: 5, // 宽
    h: 3, // 高
  },
  style: {
    basic: {},
    normal: {
      display: {
        padding: [[10, ''], [10, ''], [10, ''], [10, '']],
      },
      border: {
        borderColor: "rgba(205, 205, 205, 1)",
        borderPosition: {
          border: true,
        },
        borderWidth: [1, ''],
        borderStyle: "solid",
        radiusTopLeft: [6, ''],
        radiusTopRight: [6, ''],
        radiusBottomLeft: [6, ''],
        radiusBottomRight: [6, ''],
      },
      backgroundCommon: {
        backgroundColor: "rgba(226, 226, 226, 1)",
      },
      boxShadow: [
        {
          shiftDown: [2, ''],
          color: "rgba(0, 0, 0, 0.15 )",
          blur: [4, ''],
        },
      ],
    },
    before: {},
    after: {},
    active: {},
    activebefore: {},
    activeafter: {},
    disabled: {
      font: {
        color: "rgba(144, 144, 144, 1)",
      },
    },
    focus: {},
    hover: {}
  },
  styleDescription: [
    {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "常态",
            value: "normal",
            children: [
              {
                title: "常态前缀",
                value: "before",
              },
              {
                title: "常态后缀",
                value: "after",
              }
            ]
          },
          {
            title: "激活",
            value: "active",
            children: [
              {
                title: "激活前缀",
                value: "activebefore",
              },
              {
                title: "激活后缀",
                value: "activeafter",
              }
            ]
          },
          {
            title: "禁用",
            value: "disabled"
          },
          {
            title: "获取焦点",
            value: "focus"
          },
          {
            title: "经过",
            value: "hover"
          }
        ]
    }
  ]
}
};

// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'click' | 'doubleClick' | 'longPress';

export default config;