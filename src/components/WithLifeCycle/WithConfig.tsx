import React from "react";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { ExposeApi, ExposeDefaultProps } from "~/types/modules";
import config from './config.json'


type DispatchEvents<TEvent> = {
    dispatchEvents: {
        [K in keyof TEvent]: (...args: any[]) => any;
    }
  };

type Config<TEvent> = {
    exposeEvents?: TEvent;
    exposeFunctions?: any[];
    exposeApi?: ExposeApi[];
    exposeDefaultProps?: ExposeDefaultProps;
};

interface DefaultProps extends AppDataElementsTypes {
    eventEmitter: EventEmitter
}

export default function withConfig<TEvent, P = {}>(
    config: Config<TEvent>,
    WrappedComponent: React.ComponentType<P & DefaultProps & DispatchEvents<TEvent>>
) {
    const ComponentWithConfig = (props: AppDataElementsTypes) => {
        // todo 事件绑定与方法注册
        return React.createElement(WrappedComponent, {...props as any});
    };
    return ComponentWithConfig;
}

withConfig(config, (props) => {
    props.dispatchEvents.mount()
    // props.dis
    return <> asdasd</>
})

