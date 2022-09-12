import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  exposeFunctions: [
    {
      name: "initPlayer",
      description: '初始化播放器',
      arguments: [
        {
          type: "array",
          name: "播放地址",
          fieldName: "url",
          describe: "设置视频链接地址",
          data: ['./mov_bbb.mp4'],
        },
        {
          type: "string",
          name: "播放控件",
          fieldName: "controls",
          describe: "1显示，2隐藏",
          select: {
            1: "显示",
            2: "隐藏"
          },
          data: "1",
        },
        {
          type: "string",
          name: "封面图片",
          fieldName: "light",
          describe: "封面图片url地址",
          data: "",
        },
        {
          type: "string",
          name: "自动播放",
          fieldName: "playing",
          describe: "1自动播放，2不自动播放",
          select: {
            1: "开启",
            2: "关闭"
          },
          data: "1",
        },
        {
          type: "number",
          name: "音量",
          fieldName: "volume",
          describe: "播放音量 0 - 1",
          data: "1",
        },
        {
          type: "string",
          name: "静音播放",
          fieldName: "muted",
          describe: "1开启，2关闭",
          select: {
            1: "开启",
            2: "关闭"
          },
          data: "2",
        },
        {
          type: "string",
          name: "循环播放",
          fieldName: "loop",
          describe: "1开启，2关闭",
          select: {
            1: "开启",
            2: "关闭"
          },
          data: "2",
        },
        {
          type: "number",
          name: "播放速度",
          fieldName: "speed",
          describe: "1-10倍",
          select: {
            1: "正常", 2: "2x", 3: "3x", 4: "4x", 5: "5x", 6: "6x", 7: "7x", 8: "8x", 9: "9x", 10: "10x"
          },
          data: "1",
        },
      ]
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
      name: "onReady",
      description: "就绪",
    },
    {
      name: "onStart",
      description: "开始",
    },
    {
      name: "onPlay",
      description: "播放",
    },
    {
      name: "onPause",
      description: "暂停",
    },
    {
      name: "onEnded",
      description: "结束",
    },
    {
      name: "onError",
      description: "播放错误",
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
      basic: {},
      player: {}
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
      },
      {
        title: "播放器",
        value: "player",
      }
    ]
  },
};
// export type key of events list
export type ExposeEventsKeys =
  'mount' | 'unmount' | 'onReady' | 'onStart' | 'onPlay' | 'onPause' | 'onEnded' | 'onError';

export default config;
