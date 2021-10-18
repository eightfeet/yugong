## 样式

yugong 对style的处理流程如下

![图片](./style.drawio.svg)

1. 先由组件编辑器编辑组件样式;
2. 然后将组件样式转换为驼峰样式数据;
3. 再由[jss](https://cssinjs.org)转换为文档样式,并将样式注入到页面中;

