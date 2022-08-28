import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "onSetCounter",
      description: '设置计数器',
      arguments: [{
        type: "mixed",
        name: "配置",
        fieldName: "counterConfig",
        describe: "设置计数器",
        data: {
          updateInterval:0,
          rotation:'counterclockwise',
          trailStrokeWidth:8,
          strokeWidth:8,
          initialRemainingTime:10,
          duration:100,
          colors:"#004777",
          trailColor:"#eee",
          strokeLinecap: "round",
          size: 200
        },
      }]
    },
    {
      name: "onPlay",
      description: '启动计数器',
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
      }
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "时间文字",
            value: "text"
          }
        ]
      }
    ]
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'click';

export default config;
