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
        data: [],
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
            // 专属
            type: 'bar',
            borderRadius: 8,
            // 公共
            label: '生产量',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(255, 255, 255)',
            borderWidth: 1,
            pointStyle: 'circle',
            data: [0, 20, 5, 8, 20, 30, 45, 30],
          },
          {
            type: 'line',
            showLine: true,
            fill: true,
            backgroundColor: 'rgba(0, 255, 255, 0.5)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255)',
            // 专属
            borderDash: [5, 5],
            
            // 公共
            label: '产值',
            pointStyle: 'circle',
            pointRadius: 30,
            pointHoverRadius: 15,
            data: [5, 10, 15, null, null, 10, 15],
          },
        ],
      }]
    },
    {
      name: "setOptions",
      description: '设置坐标',
      arguments: [{
        type: "mixed",
        name: "属性",
        fieldName: "options",
        describe: "设置坐标轴属性",
        data: {
          // 数据方向
          indexAxis: 'x',
          responsive: true,
          plugins: {
            tooltip: {
              // 提示框
              backgroundColor: 'red',
              bodyColor: 'yellow',
              usePointStyle: true,
            },
            legend: {
              display: true,
              // position top right bottom left
              position: 'left',
              // 图例
              labels: {
                usePointStyle: true,
                color: 'red'
              },
            }
          },
          scales: {
            x: {
              // 网格
              grid: {
                display: true,
                color: 'blue',
                borderColor: 'yellow',
                borderWidth: 10,
                lineWidth: 20,
                tickColor: 'red',
                drawTicks: true,
              },
              // 记号
              ticks: {
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                // callback: function (val, index) {
                //   // Hide every 2nd tick label
                //   return index % 3 === 0 ? this.getLabelForValue(val as any) : '';
                // },
                color: 'white',
              }
            },
            y: {
              grid: {
                display: true,
                color: 'white',
                borderColor: 'yellow',
                borderWidth: 1,
                lineWidth: 1,
                tickColor: 'red',
                drawTicks: false,
              },
              ticks: {
                color: 'white'
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
      basic: {
        backgroundGroup: {
          backgroundColor: "#000"
        }
      },
      style1: {
      }
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "style1Name",
            value: "style1",
          }
        ]
      }
    ],
    preset: true,
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount';

export default config;
