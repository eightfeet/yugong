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
        type: "array",
        name: "标签",
        fieldName: "label",
        describe: "设置标签",
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日"
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
            "type": "line",
            "label": "产值（万元）",
            "backgroundColor": "#06BCFF",
            "data": [
              "200",
              "403",
              "150",
              "380"
            ],
            "showLine": true,
            "borderColor": "rgba(129,103,255,1)",
            "tension": 0.3
          },
          {
            "type": "bar",
            "borderRadius": 8,
            "label": "生产量（万吨）",
            "backgroundColor": "rgba(255, 0, 0, 0.5)",
            "borderColor": "rgba(255, 255, 255)",
            "borderWidth": 1,
            "pointStyle": "circle",
            "data": [
              "280",
              "300",
              "500",
              "430"
            ]
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
          "indexAxis": "x",
          "responsive": true,
          "plugins": {
            "tooltip": {
              "backgroundColor": "rgba(1,66,86,1)",
              "bodyColor": "rgba(255,255,255,1)",
              "usePointStyle": true
            },
            "legend": {
              "display": true,
              "position": "top",
              "labels": {
                "color": "rgba(170,170,170,1)",
                "usePointStyle": false
              }
            }
          },
          "scales": {
            "r": {
              "grid": {
                "display": true,
                "borderWidth": 1,
                "borderColor": "rgba(170,170,170,1)",
                "lineWidth": 1,
                "color": "rgba(170,170,170,1)",
                "drawTicks": false,
                "tickColor": "rgba(170,170,170,1)"
              },
              angleLines: {
                display: true,
                lineWidth: 2,
                borderDash: [3, 5],
                borderDashOffset: 20,
                color: 'green',
              },
              suggestedMin: 0,
              suggestedMax: 100,
              startAngle: 20,
              ticks: {
                stepSize: 5,
                count: 6,
                display: true,
                backdropColor: '#fff',
                color: 'red',
                showLabelBackdrop: true,
                backdropPadding: 2,
              },
              "min": null,
              "max": 600
            },
          }
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
