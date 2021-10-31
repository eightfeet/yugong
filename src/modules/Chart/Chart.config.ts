import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: 'getOption',
      description: '定义图表参数',
      arguments: [
        {
          type: 'runningTime',
          data: '',
          fieldName: 'runningName'
        }
      ]
    },
    {
      name: 'setDataIntervalNumber',
      description: '数据更新频率',
      arguments: [
        {
          type: 'number',
          data: '3000',
          fieldName: 'intervalNumber',
          name: '更新频率',
          select: {
            '100000000000000': '不更新',
            '500': '500毫秒',
            '1000': '1000毫秒',
            '1500': '1500毫秒',
            '2000': '2000毫秒',
            '2500': '2500毫秒',
            '3000': '3000毫秒',
            '4000': '4000毫秒',
            '5000': '5000毫秒',
            '7000': '7000毫秒',
            '10000': '10000毫秒',
            '20000': '20000毫秒',
            '50000': '50000毫秒',
          }
        }
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
  ],

  /**
   * publish Api
   */
  exposeApi: [
    {
        apiId: 'dataSet',
        name: '获取图表数据',
        url: `${process.env.REACT_APP_PUBLIC_PATH || ''}/template/chartmock/1.json`,
        method: 'GET'
    },
  ],

  /**
   * publish defaultporps styles
   */
  exposeDefaultProps: {
    layout: {
      w: 10, // width
      h: 15, // height
    },
    style: {
      basic: {},
      wrap: {},
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "包裹器",
            value: "wrap",
            children: [],
          },
        ],
      },
    ],
  },
};

export default config;
