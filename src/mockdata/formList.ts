// import { FormArguments } from "~/modules/Form/compoments/formTypes";

const list: any[] = [
  {
      "fieldName": "name",
      "label": "姓名",
      "type": "text",
      "rules": {
          "string": {
              "required": [
                  "请输入字符"
              ],
              "min": [
                  2,
                  "请输入长度大于2的字符"
              ]
          }
      }
  },
  {
      "fieldName": "phone",
      "label": "手机号码",
      "type": "text",
      "rules": {
          "string": {
              "required": [
                  "请输入手机号码"
              ],
              "matches": [
                  "^1\\d{10}$",
                  "请输入以1开头的11位手机号码！"
              ]
          }
      }
  },
  {
      "fieldName": "sex",
      "label": "性别",
      "type": "radiogroup",
      "options": [
          {
              "label": "男",
              "value": "1"
          },
          {
              "label": "女",
              "value": "0"
          }
      ],
      "rules": {
          "mixed": {
              "required": [
                  "请选择性别"
              ]
          }
      }
  },
  {
      "fieldName": "classes",
      "label": "班级",
      "type": "select",
      "options": [
          {
              "label": "一班",
              "value": "1"
          },
          {
              "label": "二班",
              "value": "2"
          },
          {
              "label": "三班",
              "value": "3"
          },
          {
              "label": "四班",
              "value": "4"
          }
      ],
      "rules": {
          "mixed": {
              "required": [
                  "请选择性别"
              ]
          }
      }
  },
  {
      "fieldName": "birthday",
      "label": "生日",
      "type": "date",
      "rules": {
          "date": {
              "max": [
                  "2020/06/15",
                  "出生日期不能大于2020/06/15"
              ]
          }
      }
  },
  {
      "fieldName": "hobby",
      "label": "爱好",
      "type": "checkboxgroup",
      "options": [
          {
              "label": "足球",
              "value": 0
          },
          {
              "label": "篮球",
              "value": 1
          },
          {
              "label": "羽毛球",
              "value": 2
          }
      ],
      "rules": {
          "array": {
              "required": [
                  "请选择兴趣爱好"
              ],
              "min": [
                  1,
                  "请至少选择一项"
              ]
          }
      }
  }
];

export default list;
