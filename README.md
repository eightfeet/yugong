![Minion](./public/images/flow/logo.svg)

## CodingFarmes
愚公码农😄

这是一个纯前端的低代码解决方案,包含功能:

- 可视化编辑器
- 组件高度可定制
- EventEmitter 事件触发与事件监听器功能的封装
- 模板化管理




## hygen

## 代码片段
```json
{
    ...
    "Typescript YuGong Function": {
        "prefix": "ygrm",
        "body": [
            "import { useEffect } from 'react';",
            "import requester from '~/core/fetch';",
            "import EventEmitter from '~/core/EventEmitter';",
            "import { AppDataElementsTypes } from '~/types/appData';",
            "import { Modules } from '~/types/modules';",
            "import Wrapper from '../Wrapper';",
            "",
            "export interface ${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}Props extends AppDataElementsTypes {",
                "\tid: string;",
                "\teventEmitter: EventEmitter;",
            "}",
            "",
            "const ${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}:Modules<${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}Props> = (props) => {",
                "\tconst { eventEmitter, events = {}, api} = props;",
                "\t// API请求 注意依赖关系",
                "\tuseEffect(() => {",
                    "\t\tconst apiArguments = api?.find(item => item.apiId === '');",
                    "\t\trequester(apiArguments || {});",
                "\t}, [api])",
                "\t// 基本事件",
                "\tuseEffect(() => {",
                    "\t\t// 执行挂载事件",
                    "\t\teventEmitter.emit(events.mount);",
                    "\t\treturn () => {",
                        "\t\t\t// 执行卸载事件",
                        "\t\t\teventEmitter.emit(events.unmount);",
                    "\t\t}",
                "\t// eslint-disable-next-line react-hooks/exhaustive-deps",
                "\t}, [])",
                "\treturn (",
                    "\t\t<Wrapper {...props}>",
                       "\t\t\t ",
                    "\t\t</Wrapper>",
                "\t)",
            "}",
            "",
            "/**",
            "* 注册方法的静态描述与默认参数定义",
            "*/",
            "${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}.exposeFunctions = [];",
            "",
            "/**",
            "* 发布事件的静态描述",
            "*/",
            "${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}.exposeEvents = [",
                "\t{",
                    "\t\tname: 'mount',",
                    "\t\tdescription: "初始化",",
                "\t},",
                "\t{",
                    "\t\tname: 'unmount',",
                    "\t\tdescription: '卸载',",
                "\t}",
            "];",
            "",
            "/**",
            "* 发布默认porps",
            "*/",
            "${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}.exposeDefaultProps = {};",
            "",
            "/**",
            "* 发布默认Api",
            "*/",
            "${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}}.exposeApi = [];",
            "",
            "export default ${1:${TM_FILENAME_BASE/(.*)$/${1:/pascalcase}/}};",
        ],
        "description": "创建愚公项目模块代码片段"
    }
    ...
}

```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
