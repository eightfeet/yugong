## 模板

### 模板是项目，项目即模板
yugong主要功能在客户端，所以并不过多的关注服务端，服务端仅保存了最基本的用户信息、模板信息，以及用户对应的模板关系。每个用户都可以创建自己的项目/模板，当然每个用户可以把个人模板发布为公共模板，以共享烦杂的模板配置信息；

![Minion](./template.drawio.svg)

模板数据包含两个部分, `pageData`页面信息[详情](./../page/README.md)；`appData`组件数据[详情](./../component/README.md)；yugong通过解析这两份数据来渲染项目
```json
project = {
  "pageData": {
      页面数据...
  },
  "appData": [
    {
      组件数据...
    }
    ...
  ]
}
```



