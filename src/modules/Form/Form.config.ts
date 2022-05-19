import {
  ModulesStatic,
} from "~/types/modules";

const config: ModulesStatic = {
  /**
   * publish functions
   */
  exposeFunctions: [
    {
      name: "setForm",
      description: '设置表单',
      arguments: [{
        type: "mixed",
        name: "表单字段",
        fieldName: "formColumns",
        describe: "编辑表单字段",
        data: [
          {
            "title": "来源",
            "dataIndex": "title",
            "initialValue": "titlecontent",
            "fieldProps": { "placeholder": '123' },
            "formItemProps": {
              "rules": [{
                "required":true
              }]
            },
            "width": "100%"
          },
          {
            "title": "状态",
            "dataIndex": "state",
            "valueType": "cascader",
            "placeholder": '输入',
            "formItemProps": {
              "placeholder": '输入',
            },
            "valueEnum": {
              "all": {
                "text": "全部",
                "status": "Default"
              },
              "open": {
                "text": "未解决",
                "status": "Error"
              },
              "closed": {
                "text": "已解决",
                "status": "Success",
                "disabled": true
              },
              "processing": {
                "text": "解决中",
                "status": "Processing"
              }
            },
            "width": "100%",
            "tooltip": "当title为disabled时状态无法选择",
            "dependencies": [
              "title"
            ]
          },
          {
            "title": "标签",
            "dataIndex": "labels",
            "width": "100%",
            "tooltip": "当title为必填时此项将为必填",
            "initialValue": "labelscontent",
            "dependencies": [
              "title"
            ]
          },
          {
            "title": "创建时间",
            "key": "showTime",
            "dataIndex": "createName",
            "valueType": "date"
          }]
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
      name: "submit",
      description: "提交",
    },
  ],

  /**
   * publish Api
   */
   exposeApi: [
    {
      apiId: "submit",
      name: "提交表单(由提交表单事件自动收集表单数据)",
      hideBodyInput: true,
    },
  ],

  /**
   * publish defaultporps styles
   */
  exposeDefaultProps: {
    layout: {
      x: 1,
      w: 10, // width
      h: 20, // height
    },
    style: {
      basic: {
      },
      style1: {
      },
      style2: {
      },
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "style1Name",
            value: "style1",
          },
          {
            title: "style2Name",
            value: "style2",
          },
        ]
      }
    ],
    preset: true
  },
};
// export type key of events list
export type ExposeEventsKeys = 'mount' | 'unmount' | 'submit';

export default config;
