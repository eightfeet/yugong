<p align="center">
  <img src="https://www.eightfeet.cn/yugong/images/flow/logo.svg" style="width: 200px" />
</p>

## CodingFarmes
愚公码农😄

这是一个纯粹的前端的低代码解决方案，帮助解决页面可视化配置，涉及极少部分独立后台发布、保存模板等相关功能；

通过定义模板，灵活配置基础组件或[开发业务组件](./documents/component/README.md)，与中台或底层业务对接；


功能:

- 可视化编辑器高度可订制(页面、组件);
- EventEmitter 事件触发与事件监机制,用于统一管理业务组件与全局的事件;
- runningTimes 业务组件之间共享数据;
- Api配置 与数据建立连接;
- 模板化管理,按需加载;

演示:

  [编辑器地址](https://yugong.dawenxi.art/dashboard/#/project) 
  
  [本地预览地址](https://yugong.dawenxi.art)

模拟项目(请手机扫描访问): 


  ![Minion](https://www.eightfeet.cn/yugong/images/documents/template/baoming.png)
  ![Minion](https://www.eightfeet.cn/yugong/images/documents/template/choujiang.png)
  ![Minion](https://www.eightfeet.cn/yugong/images/documents/template/donghua.png)

## Documents

[概要](./documents/introduce/README.md)

+ [模版](./documents/template/README.md)

+ [页面](./documents/page/README.md)

+ [组件](./documents/component/README.md)

+ [组件编辑器](./documents/moduleBoard/README.md)

+ [运行脚本](./documents/script/README.md)

+ [组件开发](./documents/component/README.md)
  
  ![Minion](https://www.eightfeet.cn/yugong/images/documents/introduce/dashboard.png)

## 编辑器

编辑器与被编辑页sandbox隔离,通过postMessage建立内外通信, 被编辑页与最终项目页面保持一致, 以实现真正意义上的所见即所得;

## 事件处理(EventEmitter)与运行时(runningTimes)

1. 通过自定义或者Api收集服务端数据同步到runningTimes统一管理;
2. 每个模块组件在EventEmitter注册需要暴露出来的方法;
3. 组件通过事件向EventEmitter调度任何模块组件注册的方法,实现模块组件的相互作用;

![Minion](https://www.eightfeet.cn/yugong/images/flow/core.drawio.svg)

## Api配置化

yugong是一套更倾向于前端项目,允许通过api配置化去对接中台或者项目

## 模板化管理

低代码意味着要么就是把业务逻辑定义到业务组建中去,要么就是定义一系列复杂的配置;

为了复用一些列复杂性的配置,yugong主要功能在客户端，所以并不过多的关注服务端，服务端仅保存了最基本的用户信息、模板信息，以及用户对应的模板关系。每个用户都可以创建自己的项目/模板，当然每个用户可以把个人模板发布为公共模板，以共享烦杂的模板配置信息；

![Minion](https://www.eightfeet.cn/yugong/images/flow/template.drawio.svg)

## 技术交流

![Minion](https://www.eightfeet.cn/yugong/images/documents/introduce/jl.jpg)

## 支持我

一个人写代码不易，产品、设计、前端、后台一把梭😂，求赏杯咖啡☕解解困，或者 **加个 star 万分感激**；

![Minion](https://www.eightfeet.cn/yugong/images/documents/introduce/zf.jpg)
