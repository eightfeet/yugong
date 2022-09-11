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
            "title": "一荤一素（毛不易）",
            "file": "https://m10.music.126.net/20220911131302/cb3722d88e28d00823817567b1f34973/yyaac/obj/wonDkMOGw6XDiTHCmMOi/14050841938/c5a2/dbcb/ca69/64ead60e4126a33be67acdbbd2ad4179.m4a"
          },
          {
            "title": "这世界那么多人(莫文蔚)",
            "file": "https://m701.music.126.net/20220911125800/af0c09680cf9473a30b8706bd06c9bfe/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096411085/505f/4035/1567/a8b87b1f40922f95a5f1381df1b0f1a3.m4a"
          }
        ],
      }]
    },
    {
      name: "play",
      description: '播放',
      arguments: [{
        type: "mixed",
        name: "设置",
        fieldName: "No",
        describe: "设置播放列表",
        data: {
          index: 0,
          start: 100,
          end: 3000
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
      "basic": {
        "backgroundGroup": {}
      },
      "wrap": {},
      "title": {
        "font": {
          "color": "rgba(156, 39, 176, 1)"
        }
      },
      "toolbar": {},
      "prev": {},
      "play": {},
      "pause": {},
      "next": {},
      "info": {},
      "progress": {},
      "time": {},
      "list": {
        "backgroundGroup": {
          "backgroundColor": "rgba(92, 7, 243, 1)"
        },
        "border": {
          "radiusTopLeft": [
            10, ''
          ],
          "radiusTopRight": [
            10, ''
          ],
          "radiusBottomLeft": [
            10, ''
          ],
          "radiusBottomRight": [
            10, ''
          ]
        },
        "display": {
          "padding": [
            [
              20,
              ''
            ],
            [
              20,
              ''
            ],
            [
              20,
              ''
            ],
            [
              20,
              ''
            ]
          ]
        },
        "font": {
          "color": "rgba(255, 255, 255, 1)"
        }
      },
      "item": {},
      "currentitem": {
        "backgroundGroup": {
          "backgroundList": [
            {
              "gradient": [
                {
                  "color": "rgb(206, 115, 110)",
                  "transition": 1
                },
                {
                  "color": "rgb(154, 63, 246)",
                  "transition": 100
                }
              ],
              "gradientDirections": "left"
            }
          ]
        },
        "border": {
          "radiusTopLeft": [
            10, ''
          ],
          "radiusTopRight": [
            10, ''
          ],
          "radiusBottomLeft": [
            10, ''
          ],
          "radiusBottomRight": [
            10, ''
          ]
        },
        "display": {
          "padding": [
            [
              14,
              ''
            ],
            [
              14,
              ''
            ],
            [
              14,
              ''
            ],
            [
              14,
              ''
            ]
          ],
        }
      }
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
            title: "标题",
            value: "title"
          },
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
              }, {
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
                title: "播放清单",
                value: "list",
                children: [
                  {
                    title: "清单项",
                    value: "item",
                  },
                  {
                    title: "正在播放项",
                    value: "currentitem",
                  }
                ]
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
