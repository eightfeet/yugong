<p align="center">
  <img src="https://www.eightfeet.cn/yugong/images/flow/logo.svg" style="width: 200px" />
</p>

## CodingFarmes
愚公码农😄

1. 用于构建活动推广等消费型页面的低代码开源项目；
2. 专注于前端视觉设计，可以应用基础组件，也可以封装[业务组件](./documents/component/README.md)，然后对其组合以构成复杂的推广落地页；
3. Api对接方式灵活，无论你现在使用什么技术栈后台，无需动到任何后台代码即可便捷的对接到编辑器；
4. 栅格化布局，让页面设计变得有规律，减少因设计布局而造成的决策成本；
5. 模版化项目管理，可高度复用项目的业务逻辑，又可快速便捷的更改皮肤界面得到不一样的视觉与交互效果；

功能:

- 可视化编辑器高度可订制(页面、组件);
- EventEmitter 事件触发与事件监机制,用于统一管理业务组件与全局的事件;
- runningTimes 业务组件之间共享数据;
- Api配置 与数据建立连接;
- 模板化管理,按需加载;

演示:

  [编辑器地址](https://yugong.dawenxi.art/dashboard/#/project) 

  用户名：test，密码：123456 
  
  
  [本地预览地址](https://yugong.dawenxi.art)


  <div>模拟项目(请手机扫描访问): </div>

<div style="display: flex">
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/form.gif" width="200" />
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/baoming.png" width="149" height="122" />
</div>
<br/>
<div style="display: flex">
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/game.gif" width="200" />
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/choujiang.png" width="149" height="122" />
</div>
<br/>
<div style="display: flex">
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/animate.gif" width="200" />
  <img src="https://www.eightfeet.cn/yugong/images/documents/template/donghua.png" width="149" height="122" />
</div>


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

求赏杯咖啡☕解解困，或者 **加个 star 万分感激**；

![Minion](https://www.eightfeet.cn/yugong/images/documents/introduce/zf.jpg)
