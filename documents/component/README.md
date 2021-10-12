
## Modaule 模块介绍
yugong组件,模块是组装页面的基本元素存放于`src/modules`目录下,项目运行时会根据项目配置文件在此目录下按需加载被引用的模块

- ### module结构
  首先需要注意，一个独立module包含四大属性，其分别是
  + Api：(接口) 负责数据准备与共享

  + style：(样式) 用于处理module的UI视觉。

  + functions：(方法) 用于处理module内部工作流。

  + events：事件 用于执行方法(functions)的事件，每个module至少必须包括mount(挂载)与unmount(卸载)两个生命周期必要事件，用于初始或卸载module。   
    ```typescript
        Button.exposeEvents = [
            {
                name: 'mount',
                description: "初始化",
            },
            {
                name: 'unmount',
                description: '卸载',
            }
        ];
    ```

- ### 在页面中引入组建
  
    ![图片](./module.png)

    在编辑器左上角的菜单上点击 ` +组件 `弹出组件模块面板,在面板中将组件拖入到页面中即可引入组件,

    ![图片](./display.png)
    

---
## 组件的开发
组件包含配置信息、帮助文档为了统一规范组件的开发,建议按照下面结构来组织组件
```
    Compontent
    |--index.ts
    |--Compontent.tsx
    |--Compontent.module.less
    |--Compontent.useStyle.ts
    |--Compontent.config.ts
    |--README.md
```
看起来是一个比较复杂的结构,所以建议通过命令` npm run createModule [CompontentName] `来初始化一个yugong组件

- 组件的静态属性
  
    一个组件除了包含组件的功能部分外还需要静态导出一份配置文件,供编辑器读取;
    ```typescript
    {
        exposeFunctions: [...], // 组件的方法
        exposeEvents: {...}, // 组件的事件
        exposeDefaultProps: {...}, // 组件的默认参数(栅格布局参数与样式参数)
        exposeApi: [...] // Api参数
    }
    ```
- 组件的帮助文档

## 设计一个按钮组件

根据上述module结构我们来创建一个按钮组件;

按钮是基于`<button></button>`定义的一个基础组件,我们来分析一个按钮应该包含哪些必要的内容:

1. 当我们触发一个按钮组件时,首先需期望这个组件能提供一些回调事件供应用调用,比如`click`点击 `doubleClick`双击 `longPress`长按事件等;

2. 有了事件我们期望事件回调之前可以有数据请求,这里我们定义了Api:点击前`beforeClick`(点击前) `beforeDoubleClick`(双击前) `beforeLongPress`(长按前); 对应事件我们都提供了api与后台交互,当用户配置了对应Api后,按钮在触发相应操作时都回调用Api实现与后台交互;

3. 按钮同时通过eventEmitter向外界提供一些方法来操作自身,比如`setButton`(设置按钮文字、禁用按钮、隐藏按钮) `setButtonDisplay`(设置按钮的状态,`normal`: '正常', `disabled`: '禁用', `focus`: '获取焦点', `active`: '激活', `hover`: '经过');

4. 最后我们应该提供编辑按钮样式的能力,我们需要对按钮的`normal`(常态样式) `active`(激活样式) `disabled`(禁用样式) `focus`(获取焦点样式) `hover`(经过样式) 定义

    ![图片](./design.drawio.svg)

 ### 发布事件

 **发布事件是为了通过当前module事件来执行任何module发布的方法或获取自身定义的Api数据**
 
首先从事件上说按钮包含点击、双击、长按等其他事件(这里我们可以关注最常用的这三个事件,下面`mount` `unmount`是每个模块必须包含的生命周期)。

```typescript
        Button.exposeEvents = [
            {
                name: 'mount',
                description: "初始化",
            },
            {
                name: 'click',
                description: '点击',
            },
            {
                name: 'doubleClick',
                description: '双击',
            },
            {
                name: 'longPress',
                description: '长按',
            },
            {
                name: 'unmount',
                description: '卸载',
            }
        ];
```
  
### 定义方法，明确方法执行时机。
    
上面我们定义了事件包含`mount`(挂载)、`click`(点击)、`doubleClick`(双击)、`longPress`(长按)、`unmount`(卸载)。那么我们根据module的生命周期来定义将要发布的方法。      

**设置按钮**
我们需要定义一个方法来初始化按钮比如修改按钮的文本(buttonText)、定义按钮的当前状态(enable、disable) 是否隐藏按钮。   

```typescript
        Button.exposeFunctions = [
            {
                name: "setButton",
                description: "设置按钮",
                arguments: [
                    {
                        type: "string",
                        name: "按钮文字",
                        describe: "按钮显示文字",
                        data: "按钮",
                    },
                    {
                        type: "boolean",
                        name: "禁用按钮",
                        describe: "禁用按钮，true禁用，false启用",
                        data: {
                            comparableAverageA: undefined,
                            comparableAverageB: undefined,
                            method: "==="
                        },
                    },
                    {
                        type: "boolean",
                        name: "隐藏按钮",
                        describe: "隐藏按钮，true隐藏，false不隐藏",
                        data: {
                            comparableAverageA: undefined,
                            comparableAverageB: undefined,
                            method: "==="
                        },
                    },
                ],
            },
        ];
```

这个方法将随时被调用，用来调整按钮的状态。

通常说来 **module发布方法的目的是为了通过事件调用module暴露的方法来修改module内部数据和状态**。

关于module的事件与方法，都会通过顶层EventEmitter（事件流的处理器）来处理，工作流程如下图

![事件流处理器](./eventEmitter.png)

对于按钮来说setButton方法就够用了。接下来我们定义Api。

### Api设置

**Api是数据源，他将向服务器获取数据也可通过successPublic、errorPublic向全局全局运行时发布数据。**

发布Api是非常灵活的，需要根据module需要来发布，执行时机，也根据需要安排。
按钮的每一个事件其实都可以定义一个对应Api，当然的根据实际情况来定，不要过多定义，这样会使得module配置变得复杂。

这里我们给按钮定义3个Api，如果有配置的话分别将在对应事件执行前执行。
```typescript
    Button.exposeApi = [
        {
            apiId: "beforeClick",
            name: "点击",
        },
        {
            apiId: "beforeDoubleClick",
            name: "双击",
        },
        {
            apiId: "beforeLongPress",
            name: "长按",
        },
    ];
```
### style样式定义


