![Minion](./public/images/flow/logo.svg)

## CodingFarmes
愚公码农😄

这是一个纯前端的低代码解决方案

功能:

- 可视化编辑器高度可订制(页面、组件);
- EventEmitter 事件触发与事件监机制,用于统一管理业务组件与全局的事件;
- runningTimes 业务组件之间共享数据;
- Api配置 与数据建立连接;
- 模板化管理,按需加载;

演示:

  [编辑器地址](https://www.eightfeet.cn/yugong/dashboard/#/project) 
  
  [本地预览地址](https://www.eightfeet.cn/yugong/)

模拟项目(请手机扫描访问):

  ![avatar][报名]
  ![avatar][抽奖]

## Documents

[概要](./documents/introduce/README.md)

+ [模版](./documents/template/README.md)

+ [页面](./documents/page/README.md)

+ [组件](./documents/component/README.md)

+ [组件编辑器](./documents/moduleBoard/README.md)

+ [运行脚本](./documents/script/README.md)

+ [组件开发](./documents/component/README.md)
  
  ![Minion](./documents/introduce/dashboard.png)

## 编辑器

编辑器与被编辑页sandbox隔离,通过postMessage建立内外通信, 被编辑页与最终项目页面保持一致, 以实现真正意义上的所见即所得;

## 事件处理(EventEmitter)与运行时(runningTimes)

1. 通过自定义或者Api收集服务端数据同步到runningTimes统一管理;
2. 每个模块组件在EventEmitter注册需要暴露出来的方法;
3. 组件通过事件向EventEmitter调度任何模块组件注册的方法,实现模块组件的相互作用;

![Minion](./public/images/flow/core.drawio.svg)

## Api配置化

yugong是一套赠倾向于前端项目,但允许通过api配置化去对接中台或者项目

## 模板化管理

低代码意味着要么就是把业务逻辑定义到业务组建中去,要么就是定义一系列复杂的配置;

为了复用一些列复杂性的配置,yugong主要功能在客户端，所以并不过多的关注服务端，服务端仅保存了最基本的用户信息、模板信息，以及用户对应的模板关系。每个用户都可以创建自己的项目/模板，当然每个用户可以把个人模板发布为公共模板，以共享烦杂的模板配置信息；

![Minion](./public/images/flow/template.drawio.svg)

[抽奖]: data:image/png;base64,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

[报名]: data:image/png;base64,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

