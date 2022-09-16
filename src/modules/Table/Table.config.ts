import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * 注册方法的静态描述与默认参数定义
   */
  exposeFunctions: [
    {
      name: 'setDataSource',
      description: '表格数据',
      arguments: [
        {
          type: 'runningTime',
          name: '数据源',
          fieldName: 'dataSource',
          describe: '数据源，设置运行时或Api返回数据源',
          data: '',
        }
      ]
    },
    {
      name: 'setTableData',
      description: '设置表格列',
      arguments: [
        {
          type: 'array',
          fieldName: 'headName',
          name: '名称',
          html: true,
          describe: '设置表格列名！将显示于表格的列名',
          data: [],
        },
        {
          type: 'array',
          fieldName: 'rowMap',
          name: '字段key值',
          html: true,
          describe: '设置每行内容，数据替换基于数据源！',
          data: [],
        },
        {
          type: 'array',
          fieldName: 'dataType',
          name: '数据类型',
          html: true,
          describe: '设置数据类型string | number | date | image | script',
          data: [],
        },
        {
          type: 'array',
          fieldName: 'format',
          name: '数据格式',
          html: true,
          describe: '设置数据类型对应的数据格式',
          data: [],
        },
        {
          type: 'array',
          fieldName: 'columWidth',
          name: '列宽',
          html: true,
          describe: '设置每列宽度(ex: 20px/50%)',
          data: [],
        },
      ],
    },
    {
      name: 'setTablePull',
      description: '移动端操作',
      arguments: [
        {
          type: 'boolean',
          name: '允许下拉事件',
          describe: '表达式成立时允许下拉事件',
          fieldName: 'isPullDown',
          data: {
            comparableAverageA: '0',
            comparableAverageB: '1',
            method: '===',
          },
        },
        {
          type: 'string',
          name: '下拉文字',
          describe: '下拉加载文案',
          fieldName: 'pullDownText',
          data: '',
        },
        {
          type: 'boolean',
          name: '允许上拉事件',
          describe: '表达式成立时允许上拉事件',
          fieldName: 'isPullUp',
          data: {
            comparableAverageA: '0',
            comparableAverageB: '1',
            method: '===',
          },
        },
        {
          type: 'string',
          name: '上拉文案',
          describe: '上拉加载文案',
          fieldName: 'pullUpText',
          data: '',
        },
      ],
    },
    {
      name: 'overrideTbodyItem',
      presettable: false,
      description: '覆写表格',
      arguments: [
        {
          type: 'number',
          fieldName: 'rowItem',
          name: '行',
          describe: 'tbody第几行',
          data: '',
        },
        {
          type: 'number',
          fieldName: 'colItem',
          name: '列',
          describe: 'tbody第几列',
          data: '',
        },
        {
          type: 'string',
          fieldName: 'override',
          name: '覆写',
          html: true,
          describe: '覆写表格项, 数据替换基于数据源！',
          data: '',
        },
      ],
    },
    {
      name: 'updateTable',
      presettable: false,
      description: '更新表格',
    },
  ],

  /**
   * 发布事件的静态描述
   */
  exposeEvents: [
    {
      name: 'mount',
      description: '初始化',
    },
    {
      name: 'unmount',
      description: '卸载',
    },
    {
      "name": "inView",
      "description": "进入视窗"
    },
    {
      "name": "outView",
      "description": "离开视窗"
    },
    {
      name: 'pullDown',
      description: '移动端下拉',
    },
    {
      name: 'pullUp',
      description: '移动端上拉',
    },
  ],

  /**
   * 发布默认porps
   */
  exposeDefaultProps: {
    layout: {
      w: 20,
    },
    style: {
      basic: {},
      table: {},
      thead: {},
      tbody: {},
      th: {},
      td: {},
      tr: {},
      rowoddfirst: {},
      rowoddlast: {},
      rowodd: {},
      roweven: {},
      coloddfirst: {},
      colevenlast: {},
      colodd: {},
      coleven: {},
    },
    styleDescription: [
      {
        title: '基础',
        value: 'basic',
        children: [
          {
            title: '表格',
            value: 'table',
            children: [
              {
                title: '表头',
                value: 'thead',
                children: [
                  {
                    title: '表头项',
                    value: 'th',
                  },
                ],
              },
              {
                title: '内容',
                value: 'tbody',
                children: [
                  {
                    title: '内容项',
                    value: 'td',
                    children: [
                      {
                        title: '行',
                        value: 'tr',
                        children: [
                          {
                            title: '首行',
                            value: 'rowoddfirst',
                          },
                          {
                            title: '末行',
                            value: 'rowoddlast',
                          },
                          {
                            title: '奇数行',
                            value: 'rowodd',
                          },
                          {
                            title: '偶数行',
                            value: 'roweven',
                          },
                        ],
                      },
                      {
                        title: '首列',
                        value: 'coloddfirst',
                      },
                      {
                        title: '未列',
                        value: 'colevenlast',
                      },
                      {
                        title: '奇数列',
                        value: 'colodd',
                      },
                      {
                        title: '偶数列',
                        value: 'coleven',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    preset: true
  },

  /**
   * 发布默认Api
   */
  exposeApi: [
    {
      apiId: 'mount',
      name: '初始化',
    },
    {
      apiId: 'pullUp',
      name: '移动端上拉',
    },
    {
      apiId: 'pullDown',
      name: '移动端下拉',
    },
  ],
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'pullDown' | 'pullUp';

export default config;
