import { CSSTransition, TransitionGroup } from "react-transition-group";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes, ArgumentsItem } from "~/types/appData";
import { Modules } from "~/types/modules";
import config from "./Broadcast.config";
import Wrapper from "../Wrapper";
import useLifeCycle from "~/hooks/useLifeCycle";
import useStyles from "./Broadcast.useStyles";
import s from "./Broadcast.module.scss";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import useRefState from "~/hooks/useRefState";

export interface BroadcastProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

interface Queue { message: string; counter: number }

let timerId: any;

const Broadcast: Modules<BroadcastProps> = (props) => {
  const { style, moduleId} = props;
  // 列表
  const [list, setList, listRef] = useRefState<string[]>([]);
  // 等待队列
  const [waitQueue, setWaitQueue, waitQueueRef] = useRefState<Queue[]>([]);
  // 队列
  const [queue, setQueue, queueRef] = useRefState<Queue[]>([]);
  // 限制交叉条目
  const [intersection, setIntersection] = useState<number>(3);
  // 间隔时长
  const [interval, setInterval] = useState<number>(2500);
  // 当前索引位
  const counter = useRef<number>(0);
  // listwrap
  const listWrapRef = useRef<any>();

  const setMessages =  useCallback(
    (messages: ArgumentsItem, counter: ArgumentsItem, interval: ArgumentsItem) => {
      const argMessages = getArgumentsItem(messages) as string[];
      const argCounter = getArgumentsItem(counter) as number;
      const argInterval = getArgumentsItem(interval) as number;
      setList(argMessages)
      // setInterval 间隔时长
      if (argInterval) setInterval(argInterval);
      // setIntersection 限制交叉条目
      if (intersection) setIntersection(intersection);
      const datas:Queue[] = argMessages.map((item, index) => ({message: item, counter: index}));
      const queueData = datas.slice(0, argCounter);
      const queueWaiteData = datas.slice(argCounter, datas.length);
      setQueue(queueData);
      setWaitQueue(queueWaiteData);
      
      console.log('datas', queueData, queueWaiteData);
    },
    [intersection, setList, setQueue, setWaitQueue],
  )

  // inject class from jss
  const userClass = useStyles(style);
  // Register events and publish functions
  useLifeCycle(
    moduleId,
    // register events
    {
      mount: "初始化",
      unmount: "卸载",
    },
    // publish functions
    { setMessages }
  );

  const refTimerId = useRef<any>(undefined);
  const updateQueue = useCallback(
    (setter, appendItem) => {
      setter((list: Queue[]) => {
        const nextState = list.slice(1);
        if (appendItem) {
            nextState.push(appendItem);
        }
        return nextState;
    });
    },
    [],
  )
  
  const loop = useCallback((interval) => {
    const Q = queueRef.current[0];
    const WQ = waitQueueRef.current[0];
    counter.current++;
    const lastIndex = counter.current + waitQueueRef.current.length-1;
    
    if (Q) {
      Q.counter = lastIndex;
    }
    
    updateQueue(setQueue, WQ)
    updateQueue(setWaitQueue, Q)

    if (refTimerId.current) {
      clearTimeout(refTimerId.current);
    }
    refTimerId.current = setTimeout(loop, interval, interval);
    
  }, [queueRef, setQueue, setWaitQueue, updateQueue, waitQueueRef]);

  // 运行
  useEffect(() => {
    loop(interval);
  }, [loop, interval]);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);
  
  const itemHeight = (listWrapRef.current?.children[0]?.offsetHeight || 0) as number;
  const opacity = 1 / queue.length;
  
  return (
    <Wrapper {...props}>
      <div className={s.display} style={{height:itemHeight*intersection}}>
        <div className={s.listwrap} style={{height: list.length*itemHeight*2}}>
          <ul ref={listWrapRef}>
            {list.map((item, index) => <li key={`top${index}`}>{item}</li>)}
          </ul>
          <ul>
            {list.map((item, index) => <li key={`buttom${index}`}>{item}</li>)}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Broadcast[key] = config[key];
  }
}

export default Broadcast;
