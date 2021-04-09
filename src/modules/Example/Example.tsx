import { useCallback, useEffect, useMemo } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 组件
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Example: Modules<Props> = (props) => {
  const { eventEmitter } = props;
  // ===================================创建组件=================================== //
  useEffect(() => {
    // 创建弹窗
    // 移除实例
    return () => {
    };
  }, []);

  // ===================================定义组件方法=================================== //
  const fn = useCallback(() => {
    
  }, []);

  //向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("fn", fn);
  }, [eventEmitter, fn]);

  return <Wrapper {...props} />;
};

/**
 * 注册方法的静态描述与默认参数定义
 */
 Example.exposeFunctions = [
];

/**
 * 发布事件的静态描述
 */
 Example.exposeEvents = [
  {
    name: 'mount',
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  }
];

/**
 * 发布默认porps
 */
 Example.exposeDefaultProps = {
  layout: {
    w: 1, // 宽
    h: 1, // 高
  },
  style: {
    basic: {},
  },
};

export default Example;
