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
      arguments: [{
        type: "mixed",
        name: "表单字段",
        fieldName: "formColumns",
        describe: "编辑表单字段",
        data: undefined,
      }]
    }
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
      w: 6, // width
      h: 5, // height
    },
    style: {
      basic: {
        "backgroundGroup": {
          "backgroundColor": "rgba(255, 255, 34, 1)"
        }
      },
      style1: {
        "backgroundGroup": {
          "backgroundColor": "rgba(116, 92, 255, 1)"
        }
      },
      style2: {
        "backgroundGroup": {
          "backgroundColor": "rgba(255, 87, 34, 1)"
        }
      },
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "style1Name",
            value: "style1",
          },
          {
            title: "style2Name",
            value: "style2",
          },
        ]
      }
    ],
    preset: true
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'submit';

export default config;
