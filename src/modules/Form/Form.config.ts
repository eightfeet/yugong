import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "setForm",
      description: '设置表单',
      arguments: [
          {
          type: "mixed",
          name: "表单字段",
          fieldName: "formColumns",
          describe: "编辑表单字段",
          data: []
        },
        {
          type: "string",
          name: "重置按钮",
          fieldName: "resetText",
          describe: "重置按钮",
          data: "重置"
        },
        {
          type: "string",
          name: "提交按钮",
          fieldName: "submitText",
          describe: "提交按钮",
          data: "提交"
        },
      ]
    },
  ],
  /**
   * register events
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
      name: "submit",
      description: "提交",
    },
  ],

  /**
   * publish Api
   */
   exposeApi: [
    {
      apiId: "submit",
      name: "提交表单(由提交表单事件自动收集表单数据)",
      hideBodyInput: true,
    },
  ],

  /**
   * publish defaultporps styles
   */
  exposeDefaultProps: {
    layout: {
      x: 1,
      w: 10, // width
      h: 20, // height
    },
    style: {
      basic: {
      },
      wrap: {

      },
      footer: {
      },
      submit: {
      },
      reset: {
      },
      label: {},
      checkbox: {},
      radiobox: {},
      radiobutton: {},
      radiobuttonchecked: {},
      textbox: {},
      switchchecked: {},
      switch: {}
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "表单",
            value: "form",
            children: [
              {
                title: "底部",
                value: "footer",
                children: [
                  {
                    title: "提交按钮",
                    value: "submit",
                  },
                  {
                    title: "重置按钮",
                    value: "reset",
                  }
                ]
              },
              {
                title: "标签",
                value: "label"
              },
              {
                title: "输入框",
                value: "textbox"
              },
              {
                title: "复选",
                value: "checkbox"
              },
              {
                title: "单选",
                value: "radiobox"
              },
              {
                title: "单选按钮",
                value: "radiobutton"
              },
              {
                title: "单选按钮被选状态",
                value: "radiobuttonchecked"
              },
              {
                title: "开关",
                value: "switch"
              },
              {
                title: "开关被打开状态",
                value: "switchchecked"
              },
              {
                title: "评分",
                value: "star"
              },
              {
                title: "评分被选状态",
                value: "starselected"
              },
            ]
          }
        ]
      }
    ],
    preset: true
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'submit';

export default config;
