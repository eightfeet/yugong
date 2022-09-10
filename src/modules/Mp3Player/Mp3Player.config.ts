import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "setPlayer",
      description: '设置播放器',
      arguments: [{
        type: "mixed",
        name: "设置",
        fieldName: "configs",
        describe: "设置播放器",
        data: {
          src: ['./09.mp3', './kml.mp3'], // 链接
          volume: 1, // 音量 0-1
          html5: true, // 强制h5播放器
          loop: true, // 循环播放
          preload: true, // 预加载
          autoplay: false, // 自动播放
          mute: false, // 静音加载
          // sprite: {
          //   'track01': [1200, 2000]
          // }, // 片段播放
          rate: 1 // 播放速度 0.5-4.0
        },
      }]
    },
    {
      name: "setPlayList",
      description: '设置播放列表',
      arguments: [{
        type: "mixed",
        name: "设置",
        fieldName: "playList",
        describe: "设置播放列表",
        data: [
          {
            title: '卡梅拉',
            file: './kml.mp3'
          },
          {
            title: '故事',
            file: './09.mp3'
          }
        ],
      }]
    },
    {
      name: "play",
      description: '设置播放列表',
      arguments: [{
        type: "number",
        name: "设置",
        fieldName: "No",
        describe: "设置播放列表",
        data: '',
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
        "backgroundGroup": {}
      },
      wrap: {},
      toolbar: {},
      prev: {},
      play: {},
      pause: {},
      next: {},
      info: {},
      progress: {},
      title: {},
      time: {}
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
      },
      {
        title: "播放器",
        value: "wrap",
        children: [
          {
            title: "工具条",
            value: "toolbar",
            children: [
              {
                title: "上一曲",
                value: "prev"
              },
              {
                title: "播放",
                value: "play"
              },{
                title: "暂停",
                value: "pause"
              },
              {
                title: "下一曲",
                value: "next"
              }
            ]
          },
          {
            title: "播放信息",
            value: "info",
            children: [
              {
                title: "进度条",
                value: "progress"
              },
              {
                title: "标题",
                value: "title"
              },
              {
                title: "时间",
                value: "time"
              }
            ]
          }
        ]
      },
    ]
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'click';

export default config;
