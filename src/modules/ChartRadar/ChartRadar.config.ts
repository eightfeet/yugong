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
            "label": "女士",
            "data": [
              "80",
              "70",
              "90",
              "75",
              "70",
              "50",
              "80"
            ],
            "showLine": true,
            "fill": true,
            "borderColor": "rgba(233,30,99,1)",
            "backgroundColor": "rgba(233,30,99,0.19)",
            "pointBackgroundColor": "rgba(233,30,99,1)",
            "pointBorderColor": "rgba(255,255,255,1)",
            "pointBorderWidth": 4,
            "pointStyle": "circle",
            "pointRadius": 5
          },
          {
            "label": "男士",
            "data": [
              "30",
              "40",
              "50",
              "28",
              "70",
              "15",
              "80"
            ],
            "fill": true,
            "backgroundColor": "rgba(54, 162, 235, 0.2)",
            "borderColor": "rgb(54, 162, 235)",
            "pointBackgroundColor": "rgb(54, 162, 235)",
            "pointBorderColor": "#fff",
            "pointHoverBackgroundColor": "#fff",
            "pointHoverBorderColor": "rgb(54, 162, 235)",
            "borderCapStyle": "butt",
            "borderDash": [
              ""
            ],
            "borderJoinStyle": "bevel",
            "borderWidth": 2,
            "hoverBackgroundColor": "",
            "hoverBorderCapStyle": "butt",
            "hoverBorderColor": "#eee",
            "hoverBorderDash": [
              5,
              5
            ],
            "hoverBorderDashOffset": 10,
            "hoverBorderJoinStyle": "bevel",
            "hoverBorderWidth": 5,
            "clip": 3,
            "order": 4,
            "tension": 0,
            "pointBorderWidth": 5,
            "pointHitRadius": 6,
            "pointHoverBorderWidth": 6,
            "pointHoverRadius": 5,
            "pointRadius": 6,
            "pointRotation": 10,
            "spanGaps": true
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
          "plugins": {},
          "scales": {
            "r": {
              "axis": "r",
              "type": "radialLinear",
              "display": true,
              "animate": true,
              "position": "chartArea",
              "angleLines": {
                "display": true,
                "lineWidth": 1,
                "borderDash": [],
                "borderDashOffset": 0,
                "color": "rgba(0,0,0,0.1)"
              },
              "grid": {
                "circular": false,
                "display": true,
                "lineWidth": 1,
                "drawBorder": true,
                "drawOnChartArea": true,
                "drawTicks": true,
                "tickLength": 8,
                "offset": false,
                "borderDash": [],
                "borderDashOffset": 0,
                "borderWidth": 1,
                "color": "rgba(0,0,0,0.1)",
                "borderColor": "rgba(0,0,0,0.1)"
              },
              "startAngle": 0,
              "ticks": {
                "showLabelBackdrop": true,
                "color": "#666",
                "minRotation": 0,
                "maxRotation": 50,
                "mirror": false,
                "textStrokeWidth": 0,
                "textStrokeColor": "",
                "padding": 3,
                "display": true,
                "autoSkip": true,
                "autoSkipPadding": 3,
                "labelOffset": 0,
                "minor": {},
                "major": {},
                "align": "center",
                "crossAlign": "near",
                "backdropColor": "rgba(255, 255, 255, 0.75)",
                "backdropPadding": 2
              },
              "pointLabels": {
                "backdropPadding": 2,
                "display": true,
                "font": {
                  "size": 10
                },
                "padding": 5,
                "centerPointLabels": false,
                "color": "#666"
              },
              "offset": false,
              "reverse": false,
              "beginAtZero": false,
              "bounds": "ticks",
              "grace": 0,
              "title": {
                "display": false,
                "text": "",
                "padding": {
                  "top": 4,
                  "bottom": 4
                },
                "color": "#666"
              }
            }
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
