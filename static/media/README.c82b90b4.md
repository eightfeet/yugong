## 表单

### 设置表单数据，
- 当表单初始化时需要给表单一份初始化数据，这份数据来源于运行时，可以通过global的注入方法活着api请求，将数据返回到运行时
  - 数据结构：
  ```json
      [
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
            "maxLength": "11",
            "disabled": true,
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
          ...
      ]
  ```
    - fieldName:string 字段名，api接收数据的唯一字段属性名
    - label:string 标签名，用于表单标签显示
    - maxLength: string|number 最大输入长度，用于输入表单，限制输入长度。
    - disabled: boolean 禁用表单项
    - type: select
  | time
  | text
  | date
  | datetime
  | checkboxgroup
  | radiogroup 表单类型
    - options: {
  label: string;
  value?: any;
} option 集合可返回包含 select | checkboxgroup | radiogroup 元素中所有 可选属性 
    - defaultValue: {[fieldName]: value} 默认值, 默认时间时使用 YYYY-MM-DD 格式
    - row: boolean checkboxgroup或radiogroup类型时每个选项的排列方式，当为true时横排。
    - rules: 表单验证方法
    ```json
        {
            ["YupValidateType"]: {
                [YupMethodNameType]: YupMethodArguments[]
            }
        }
    ```

    使用 yup Schema规则 https://github.com/jquense/yup#numberminlimit-number--ref-message-string--function-schema ；
    
    支持yup方法
    ```typescript    
    YupMethodNameType =
        | "required"
        | "typeError"
        | "oneOf"
        | "notOneOf"
        | "length"
        | "min"
        | "max"
        | "matches"
        | "email"
        | "url"
        | "uuid"
        | "ensure"
        | "trim"
        | "lowercase"
        | "uppercase"
        | "lessThan"
        | "moreThan"
        | "positive"
        | "negative"
        | "integer"
        | "noUnknown";
   ```

- ### 设置表单功能 setFormConfig 
    - **输入框**forminput 表单显示类型 standard,outlined或filled默认standard
    - **表单标题**formtitle 设置表单标题文字
    - **提交按钮**formsubmittext 设置表单提交按钮文字
    - **重置按钮**formresettext 设置表单重置按钮文字

- ### setFormItem 设置表单项
    - fieldName 字段名
    - fieldValue 字段值
