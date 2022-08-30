import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "setTimmer",
      description: '设置计时器',
      arguments: [{
        type: "mixed",
        name: "配置",
        fieldName: "timerConfig",
        describe: "设置计数器",
        data: {
          isZh: true,
          prefix: '距离开始时间',
          suffix: '请耐心等待',
          endTime: '2022-08-30 07:30'
        },
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
      name: "waited",
      description: "等待",
    },
    {
      name: "finished",
      description: "完成",
    }
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
        "backgroundGroup": {}
      },
      text: {
        "backgroundGroup": {}
      },
      time: {

      }
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "文字",
            value: "text",
            children: [
              {
                title: '时间',
                value: 'time'
              }
            ]
          }
        ]
      }
    ],
    preset: true
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'finished' | 'waited';

export default config;
