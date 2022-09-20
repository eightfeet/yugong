import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: 'configData',
      description: '设置数据',
      arguments: [
        {
          type: 'number',
          name: '数值',
          describe: '总数值',
          data: '0',
          fieldName: 'end',
        },
        {
          type: 'number',
          name: '动画开始数值',
          describe: '动画开始数值',
          data: '0',
          fieldName: 'start',
        },
        {
          type: 'number',
          name: '持续时间(秒)',
          describe: '动画持续时间(秒)',
          data: '',
          fieldName: 'duration',
        },
        {
          type: 'number',
          name: '保留小数点',
          describe: '保留小数点',
          data: '',
          fieldName: 'decimalPlaces',
        },
        {
          type: 'string',
          name: '千位分隔符',
          describe: '千位分隔符',
          data: '',
          fieldName: 'thousandsSeparator',
        },
        {
          type: 'string',
          name: '动画',
          describe: '动画',
          select: {
            easeOutCubic: "easeOutCubic",
            easeInCubic: "easeInCubic",
            linear: "linear"
          },
          data: 'easeOutCubic',
          fieldName: 'easing',
        },
        {
          type: 'string',
          name: '前缀',
          describe: '前缀',
          data: '',
          fieldName: 'prefix',
          html: true,
        },
        {
          type: 'string',
          name: '后缀',
          describe: '后缀',
          data: '',
          fieldName: 'suffix',
          html: true,
        },
      ],
    },
    {
      name: 'resetCount',
      description: '重置'
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
      "name": "inView",
      "description": "进入视窗"
    },
    {
      "name": "outView",
      "description": "离开视窗"
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
      },
      numbers: {

      },
      prefix: {

      },
      suffix: {

      }
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "数据",
            value: "numbers"
          },
          {
            title: "前缀",
            value: "prefix"
          },
          {
            title: "后缀",
            value: "suffix"
          }
        ]
      }
    ]
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount';

export default config;
