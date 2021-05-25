/**
 * 用于模块生命周期处理
 */

import EventEmitter from "~/core/EventEmitter";
import useLifeCycle from "~/hooks/useLifeCycle";
import { AppDataElementsTypes } from "~/types/appData";
import {
  ComExposeEvents,
  ExposeApi,
  ExposeDefaultProps,
  ExposeFunctions,
} from "~/types/modules";

// Config
interface Configs {
  exposeEvents: ComExposeEvents;
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}

const myObj = {
  x: 1,
  y: '2',
  z: true
}

type TP = keyof typeof myObj;

// Props
export interface WithLifeCycleProps<K = string> extends AppDataElementsTypes {
  eventEmitter: EventEmitter;
  eventDispatch: {[keys in TP] : Function};
}

export default function withLifeCycle<P extends WithLifeCycleProps>(
  WrappedComponent: React.ComponentType<P>,
  config: Configs
) {

  
  type ValueAtKey = (typeof config.exposeEvents)[number]["name"];

  const ComponentWithLifeCycle = (props: WithLifeCycleProps<ValueAtKey>) => {
    const { moduleId, eventEmitter } = props;
    const eventDispatch = useLifeCycle(eventEmitter, moduleId, {});

    const wrappedProps = { ...props, eventDispatch };
    return <WrappedComponent {...(wrappedProps as P)} />;
  };

  return ComponentWithLifeCycle;
}

interface Props extends WithLifeCycleProps {
  y: string;
}

const Button = withLifeCycle<Props>(
  (props) => {
    const { eventDispatch } = props;
    
    return <div>按钮</div>;
  },
  {
    exposeEvents: [
      {
        name: "mount",
        description: "初始化",
      },
      {
        name: "unmount",
        description: "卸载",
      },
      {
        name: "click",
        description: "点击",
      },
      {
        name: "doubleClick",
        description: "双击",
      },
      {
        name: "longPress",
        description: "长按",
      },
    ],
  }
);
