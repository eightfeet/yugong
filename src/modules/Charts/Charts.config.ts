import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "handleClick",
      description: '点击设置文字',
      arguments: [{
        type: "string",
        name: "文字",
        fieldName: "testText",
        describe: "测试点击设置文字",
        data: "我被改变了",
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
      name: "click",
      description: "点击",
    },
  ],

  /**
   * publish Api
   */
  exposeApi: [],

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
            title: "style2Name",
            value: "style2",
          },
        ]
      }
    ]
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'click';

export default config;
