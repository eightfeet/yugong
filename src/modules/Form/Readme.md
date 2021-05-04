## 表单

- ### setFormData 设置表单数据
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

  - ### 方法
    - 
