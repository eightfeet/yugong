import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "setLabel",
      description: '设置标签',
      arguments: [{
        type: "mixed",
        name: "标签",
        fieldName: "label",
        describe: "设置标签",
        data: [
          {
            label: '红',
            backgroundColor: '#FB3640',
            hoverBackgroundColor: '#fb020e'
          },
          {
            label: '黄',
            backgroundColor: '#EFCA08',
            hoverBackgroundColor: '#efee08'
          },
          {
            label: '绿',
            backgroundColor: '#43AA8B',
            hoverBackgroundColor: '#0eb583'
          },
          {
            label: '黑',
            backgroundColor: '#253D5B',
            hoverBackgroundColor: '#034ca9'
          },
        ],
      }]
    },
    {
      name: "setDataGroup",
      description: '设置数据组',
      arguments: [{
        type: "mixed",
        name: "数据组",
        fieldName: "dataGroup",
        describe: "设置标签",
        data: [
          {
            data: [
              200,
              403,
              150,
              380
            ],
            borderAlign: "inner",
            borderColor: "#fff",
            borderJoinStyle: "round",
            borderRadius: 5,
            borderWidth: 2,
            circumference: 360,
            clip: 0,
            hoverBorderColor: "red",
            hoverBorderWidth: 0,
            hoverOffset: 4,
            offset: 0,
            rotation: -90,
            spacing: 0,
            weight: 200
          },
          {
            data: [
              100,
              3,
              5,
              10
            ],
            borderAlign: "inner",
            borderColor: "#fff",
            borderJoinStyle: "round",
            borderRadius: 5,
            borderWidth: 2,
            circumference: 360,
            clip: 0,
            hoverBorderColor: "red",
            hoverBorderWidth: 0,
            hoverOffset: 4,
            offset: 0,
            rotation: -90,
            spacing: 0,
            weight: 200
          }
        ],
      }]
    },
    {
      name: "setOptions",
      description: '设置Options',
      arguments: [{
        type: "mixed",
        name: "属性",
        fieldName: "options",
        describe: "设置坐标轴属性",
        data: {
          cutout: 60,
          radius: '100%',
          circumference: 360,
        },
      }]
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
      basic: {}
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: []
      }
    ],
    preset: true,
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount';

export default config;
