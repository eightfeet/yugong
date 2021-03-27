import { useCallback, useEffect, useMemo } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import styleCompiler from "~/compiler";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import getResult from "~/core/getDataFromRunningTime";
import Wrapper from "../Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

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

const Slider: Modules<Props> = (props) => {
  const { style, eventEmitter, events = {}, layout } = props;
  const pageData = useSelector((state: RootState) => state.pageData);
  const lw = (window.innerWidth - (pageData?.space || 0))/(pageData?.cols || 1);
  const width = (layout?.w || 1) * lw - (pageData?.space || 0);
  const height = (layout?.h || 1) * (pageData?.rowHeight || 1) + ((layout?.h - 1) || 1) * (pageData?.space || 1);
  console.log(333, height)
  
  // ===================================创建组件=================================== //
  useEffect(() => {
    // 创建弹窗
    // 移除实例
    return () => {};
  }, []);

  // ===================================定义组件方法=================================== //
  const fn = useCallback(() => {}, []);

  //向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("fn", fn);
  }, [eventEmitter, fn]);

  return (
    <Wrapper {...props}>
        <AwesomeSlider style={{width: `${width}px`, height: `${height}px`}}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </AwesomeSlider>
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Slider.exposeFunctions = [];

/**
 * 发布事件的静态描述
 */
Slider.exposeEvents = [
  {
    name: "mount",
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Slider.exposeDefaultProps = {
  layout: {
    w: 4, // 宽
    h: 4, // 高
  },
  style: {
    basic: {},
  },
};

export default Slider;
