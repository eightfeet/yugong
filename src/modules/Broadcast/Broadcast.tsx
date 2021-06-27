import { CSSTransition, TransitionGroup } from "react-transition-group";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import config from "./Broadcast.config";
import Wrapper from "../Wrapper";
import useLifeCycle from "~/hooks/useLifeCycle";
import useStyles from "./Broadcast.useStyles";
import s from "./Broadcast.module.scss";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

export interface BroadcastProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
  interval: number;
  list: string[];
}

let timerId: any;

const Broadcast: Modules<BroadcastProps> = (props) => {
  const { style, moduleId, interval = 2500, list } = props;
  const [messages, setMessages] = useState<
    { message: string; counter: number }[]
  >([
    { counter: 1, message: "a" },
    { counter: 2, message: "b" },
    { counter: 3, message: "c" },
    { counter: 4, message: "d" },
    { counter: 5, message: "e" },
  ]);
  const [waitQueue, setWaitQueue] = useState<
    { message: string; counter: number }[]
  >([]);
  const [latest, setLatest] = useState<number>(0);
  const counter = useRef<number>(1);
  const lastCounter = useRef<number>();

  // inject class from jss
  const userClass = useStyles(style);
  // Register events and publish functions
  const [eventsDispatch] = useLifeCycle(
    moduleId,
    // register events
    {
      mount: "初始化",
      unmount: "卸载",
    },
    // publish functions
    {}
  );

  useEffect(() => {
    if (Array.isArray(list)) {
      const data = list.map((item, index) => ({
        counter: index,
        message: item,
      }));
      setMessages(data);
    }
  }, [list]);

  const loop = useCallback(() => {
    console.log("repeat");

    const messageList = messages.slice();
    // 1. remove last message
    if (messageList.length >= 3 || !waitQueue.length) {
      messageList.shift();
    }
    counter.current++;
    lastCounter.current = waitQueue.length + counter.current;

    // 2. take from queue
    const nextMessage: any = waitQueue.shift() || {};
    nextMessage.conter = counter.current;
    const operationWaitQueue = waitQueue.slice() || [];
    operationWaitQueue.push({ ...nextMessage });

    if (nextMessage) {
      messageList.push({ ...nextMessage, counter: lastCounter.current });
    }

    setMessages(messageList);
    setWaitQueue(operationWaitQueue);
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(loop, interval);
  }, [interval, messages, waitQueue]);

  const didmount = useRef(false);
  useEffect(() => {
    const mount = didmount.current;
    if (!mount) {
      didmount.current = true;
      loop();
    }
  }, [loop]);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <Wrapper {...props}>
      <div className={userClass.wrap}>
        <TransitionGroup component="ul" className={classNames(s.broadcast)}>
          {messages?.map((item, index) => (
            <CSSTransition
              key={item.counter}
              classNames="broadcast"
              timeout={400}
            >
              <li>
                <p
                  className={classNames(s.message, {
                    [s.fade]: index !== messages.length - 1,
                  })}
                >
                  {item.message}
                </p>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
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
