import { useCallback, useEffect, useRef, useState } from 'react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { getArguments } from '~/core/getArgumentsTypeDataFromDataSource';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Broadcast.config';
import createStyles, { ClassesKey } from './Broadcast.createStyles';
import useRefState from '~/hooks/useRefState';
import classNames from 'classnames';
import s from "./Broadcast.module.scss";

export type BroadcastProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const Broadcast: React.FC<BroadcastProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;
  // 列表
  const [list, setList, listRef] = useRefState<
    ({ message: string } | string)[]
  >([]);
  // 限制交叉条目
  const [intersection, setIntersection, intersectionRef] =
    useRefState<number>(3);
  // 间隔时长
  const [interval, setInterval] = useState<number>(2500);
  // listwrap
  const listWrapRef = useRef<any>();
  const [listWrapStyle, setListWrapStyle] = useState<React.CSSProperties>({
    height: 0,
  });
  const [listItemHeight, setListItemHeight, listItemHeightRef] =
    useRefState<number>(0);
  const currentItem = useRef(0);

  const [ready, setReady] = useState(false);

  const setMessages = useCallback(
    ( ...args) => {
      const { messages, counter, interval } = getArguments(args) as {
        messages: ({ message: string } | string) [];
        counter: number;
        interval: number;
      };
      setList(messages);
      // setInterval 间隔时长
      if (interval) setInterval(interval < 300 ? 300 : interval);
      // setIntersection 限制交叉条目
      if (counter)
        setIntersection(
          messages.length < counter ? messages.length : counter
        );
    },
    [setIntersection, setList]
  );

  // First setup registers
  useEffect(() => {
    registersFunction({
      setMessages
    })
  }, [setMessages, registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refTimerId = useRef<any>(undefined);

  const wrapStyle = useCallback(
    (s: number, reset?: boolean) => {
      const style: React.CSSProperties = {
        height: listRef.current.length * listItemHeightRef.current * 2,
        top: currentItem.current * listItemHeightRef.current * -1,
        transition: `all ease-in ${s}ms`,
      };
      if (reset) {
        delete style.transition;
        style.top = 0;
      }
      return style;
    },
    [listRef, listItemHeightRef]
  );

  
  const loop = useCallback(
    (interval) => {
      if (refTimerId.current) {
        clearTimeout(refTimerId.current);
      }
      const times = 300;
      const itemHeight = (listWrapRef.current?.children[0]?.offsetHeight ||
        0) as number;
      setListItemHeight(itemHeight);
      setListWrapStyle(wrapStyle(times));
      currentItem.current++;
      currentItem.current = list.length
        ? currentItem.current % (list.length + 1)
        : 0;
      let currentInterval = interval;
      if (currentItem.current === 0) {
        currentInterval = times + 10;
        setTimeout(() => {
          setListWrapStyle(wrapStyle(times, true));
        }, times);
      }
      refTimerId.current = setTimeout(loop, currentInterval, interval);
    },
    [list.length, setListItemHeight, wrapStyle]
  );

  // 运行
  useEffect(() => {
    loop(interval);
  }, [loop, interval, ready]);

  // 等待样式准备
  useEffect(() => {
    if (!ready) {
      setTimeout(() => setReady(true), interval)
    }
  }, [interval, ready])
  
  useEffect(() => {
    return () => {
      if (refTimerId.current) {
        clearTimeout(refTimerId.current);
      }
    };
  }, []);

  const getAlphStep = useCallback((counter: number) => {
    const step = 100 / counter;
    const steps = [];
    for (let ind = 1; ind <= counter; ind++) {
      steps.push(ind * step * 0.01);
    }
    return steps;
  }, []);

  const setItemAlph = useCallback(
    (currentIndex: number) => {
      const alphs = getAlphStep(intersectionRef.current);
      let alph = 0;
      alphs.some((item, index) => {
        const targetIndex = currentItem.current + index;
        if (currentIndex === targetIndex % listRef.current.length) {
          alph = item;
          return true;
        }
        return false;
      });

      return alph;
    },
    [getAlphStep, intersectionRef, listRef]
  );

  return (
    <Wrapper {...props} maxWidth itemAlign="bottom">
      <div
        className={classNames(s.display, !ready ? s.disappear : null)}
        style={{ height: listItemHeight * intersection }}
      >
        <div className={s.listwrap} style={listWrapStyle}>
          <ul ref={listWrapRef}>
            {Array.isArray(list) && list?.map((item, index) => (
              <li key={`top${index}`} style={{ opacity: setItemAlph(index) }}>
                <div>
                  <div
                    className={classNames(classes.item, s.item)}
                    style={{ maxWidth: listWrapRef.current?.offsetWidth }}
                  >
                    {typeof item === "string" ? item : item.message}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ul>
            {Array.isArray(list) && list?.map((item, index) => (
              <li
                key={`buttom${index}`}
                style={{ opacity: setItemAlph(index) }}
              >
                <div>
                  <div
                    className={classNames(classes.item, s.item)}
                    style={{ maxWidth: listWrapRef.current?.offsetWidth }}
                  >
                    {typeof item === "string" ? item : item.message}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

export default PresetModule<BroadcastProps>(Broadcast, config, createStyles);
