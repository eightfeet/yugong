import { ComExposeEvents, ExposeApi, ExposeDefaultProps, ExposeFunctions } from "~/types/modules";

const config: {
   exposeFunctions: ExposeFunctions[];
   exposeEvents: ComExposeEvents;
   exposeDefaultProps: ExposeDefaultProps;
   exposeApi: ExposeApi[]
} = {
    "exposeFunctions": [
       {
          "name": "setText",
          "description": "设置文本",
          "arguments": [
             {
                "type": "array",
                "name": "文本内容",
                "describe": "可设置多行文本内容",
                "html": true,
                "data": [
                   "文本<b>Text</b>"
                ],
                "fieldName": "textArray"
             },
             {
                "type": "boolean",
                "name": "自动序号",
                "describe": "自动生成1开始的序号",
                "data": {
                   "comparableAverageA": "a",
                   "comparableAverageB": "b",
                   "method": "==="
                },
                "fieldName": "autoNumber"
             }
          ]
       }
    ],
    "exposeEvents": [
       {
          "name": "mount",
          "description": "初始化"
       },
       {
          "name": "unmount",
          "description": "卸载"
       }
    ],
    "exposeDefaultProps": {
       "style": {
          "basic": {
             "font": {
                "align": "left"
             }
          },
          "wrap": {},
          "paragraph": {},
          "prefix": {},
          "even": {},
          "odd": {},
          "first": {},
          "last": {}
       },
       "styleDescription": [
          {
             "title": "基础",
             "value": "basic",
             "children": [
                {
                   "title": "包裹器",
                   "value": "wrap",
                   "children": [
                      {
                         "title": "段落/项",
                         "value": "paragraph",
                         "children": [
                            {
                               "title": "段落编号(先在设置文本中开启自动编号)",
                               "value": "prefix"
                            }
                         ]
                      },
                      {
                         "title": "偶数段落/项",
                         "value": "even"
                      },
                      {
                         "title": "奇数段落/项",
                         "value": "odd"
                      },
                      {
                         "title": "首行段落/项",
                         "value": "first"
                      },
                      {
                         "title": "末行段落/项",
                         "value": "last"
                      }
                   ]
                }
             ]
          }
       ]
    },
    "exposeApi": []
 }

 export default config;