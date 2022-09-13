import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
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
            "title": "乌兰巴托的夜",
            "file": "./wlbt.m4a"
          },
          {
            "title": "当年情",
            "file": "./dnq.m4a"
          }
        ],
      }]
    },
    {
      name: "play",
      description: '播放',
      presettable: false,
      arguments: [{
        type: "number",
        name: "序号",
        fieldName: "No",
        describe: "按播放列表从0排序",
        data: '',
      }]
    },
    {
      name: "stop",
      description: '停止',
      presettable: false,
      arguments: [{
        type: "number",
        name: "序号",
        fieldName: "No",
        describe: "按播放列表从0排序",
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
    ],
    preset: true
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'click';

export default config;
