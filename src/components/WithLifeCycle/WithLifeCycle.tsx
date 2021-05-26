import React, { useCallback } from "react";

type Describer<TEvent, TConfig> = {
  name: string;
  exposeEvents: TEvent;
  exposeConfigs: TConfig;
};

type EventEmitter<TEvent> = {
  [K in keyof TEvent]: (...args: any[]) => any;
};

type Component<TEvent, TConfig> = (
  props: {},
  describer: {
    emitter: EventEmitter<TEvent>;
    configs: {
      [P in keyof TConfig]: any;
    };
  }
) => void;

function WithLifeCycle<TEvent, TConfig>(
  describer: Describer<TEvent, TConfig>
): (comp: Component<TEvent, TConfig>) => void {
  throw new Error();
}


export default WithLifeCycle;
