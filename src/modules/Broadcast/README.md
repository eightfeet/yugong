## 消息滚动播报

- 创建模块静态属性
    ```typescript 
        import {
            ModulesStatic,
        } from "~/types/modules";

        const config: ModulesStatic = {
            /**
            * publish functions
            */
            exposeFunctions: [],

            /**
            * register events
            */
            exposeEvents: [
                {
                name: "mount",
                description: "初始化",
                },
                {
                name: "unmount",
                description: "卸载",
                },
            ],

            /**
            * publish Api
            */
            exposeApi: [],

            /**
            * publish defaultporps styles
            */
            exposeDefaultProps: {
                layout: {
                w: 5, // width
                h: 3, // height
                },
                style: {
                basic: {},
                wrap: {},
                },
                styleDescription: [
                {
                    title: "基础",
                    value: "basic",
                    children: [
                    {
                        title: "包裹器",
                        value: "wrap",
                        children: [],
                    },
                    ],
                },
                ],
            },
        };

        export default config;


    ```

- 创建模块
    ```typescript
        import EventEmitter from '~/core/EventEmitter';
        import { AppDataElementsTypes } from '~/types/appData';
        import { Modules } from '~/types/modules';
        import config from './Broadcast.config';
        import Wrapper from '../Wrapper';
        import useLifeCycle from '~/hooks/useLifeCycle';
        import useStyles from './Broadcast.useStyles';

        export interface BroadcastProps extends AppDataElementsTypes {
            id: string;
            eventEmitter: EventEmitter;
        }

        const Broadcast:Modules<BroadcastProps> = (props) => {
            const { style, moduleId } = props;
            // inject class from jss
            const userClass = useStyles(style);
            // Register events and publish functions
            const [eventsDispatch] = useLifeCycle(
                moduleId,
                // register events
                {
                    mount: '初始化',
                    unmount: '卸载'
                },
                // publish functions
                { }
            );

            return (
                <Wrapper {...props}>
                    <div className={userClass.wrap}>
                    Broadcast
                    </div>
                </Wrapper>
            )
        }

        // bind static
        for (const key in config) {
            if (Object.prototype.hasOwnProperty.call(config, key)) {
                Broadcast[key] = config[key];
            }
        }

        export default Broadcast;
    ```

- 创建模块样式编辑器
    ```typescript
        import { createUseStyles } from "react-jss";
        import styleCompiler from "~/compiler";

        const useStyles = createUseStyles<string, any>({
        wrap: (style) => styleCompiler(style.wrap).style || {}
        });

        export default useStyles;

    ```