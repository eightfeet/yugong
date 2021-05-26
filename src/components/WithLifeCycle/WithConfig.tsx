import React from "react";
import { AppDataElementsTypes } from "~/types/appData";




type Describer<TEvent, TConfig> = {
    name: string;
    exposeEvents: TEvent;
    exposeConfigs: TConfig;
  };

type EventEmitter<TEvent> = {
    [K in keyof TEvent]: (...args: any[]) => any;
  };

type Config<TEvent> = {
    name: string;
    exposeEvents: TEvent;
};

export function withTheme<TEvent, P = {}>(
    config: Config<TEvent>,
    WrappedComponent: React.ComponentType<P & TEvent>
) {

    const ComponentWithTheme = (props: AppDataElementsTypes) => {
        return React.createElement(WrappedComponent, {...props as any});
    };
    return ComponentWithTheme as React.ComponentType<AppDataElementsTypes>;
}

// comp.config.ts
// {
//     name: 'asd', 
//     exposeEvents: {
//        name: 111
//     }
// }

