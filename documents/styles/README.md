## 样式

yugong 对style的处理流程如下

![图片](./style.drawio.svg)

1. 先由组件编辑器编辑组件样式;
2. 然后将组件样式转换为驼峰样式数据;
3. 再由[jss](https://cssinjs.org)转换为文档样式,并将样式注入到页面中;

yugong将样式抽象为`布局`,`文字`,`背景`,`圆角与秒变`,`投影`,`变换`六大块,基本归纳了大部分常见的css属性;

**yugong将样式中数值与单位分开独立存贮,做到数据可以随时进行进制转换,单位可以根据需求完全自定义**

比如下面这个布局样式`width: [ 100, null]`数组的定一个值代表数值,第二个值代表单位,当单位值为null时使用的是全局单位,是单位

```javascript
    "display": {
        "width": [ 100, null ],
        "height": [ 50, null ],
        "padding": [
          [ 24, null ],
          [ 24, null ],
          [ 24, null ],
          [ 24, null ]
        ],
        "margin": [
          [ 30, null ],
          [ 30, null ],
          [ 30, null ],
          [ 30, null ]
        ]
      }
```

