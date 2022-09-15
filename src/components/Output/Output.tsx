/**
 * Output入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutputLayout from '~/components/Output/OutputLayout';
import requester from '~/core/fetch';
import isUrl from '~/core/helper/isUrl';
import useRem from '~/hooks/useRem';
import { Dispatch, RootState } from '~/redux/store';
import {
  ComExposeEvents,
  EventsTypeItem,
  OutputModules,
} from '~/types/modules';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';
import './Output.less';
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWHEIGHT,
  GRID_DEFAULT_SPACE,
  ROOT_FONTSIZE,
} from '~/core/constants';
import {
  getArguments,
  getArgumentsItem,
} from '~/core/getArgumentsTypeDataFromDataSource';
import { initTrack, trackEvent, trackPageView } from '~/core/tracking';
import usePostMessage from '~/hooks/usePostMessage';
import useLifeCycle from '~/hooks/useLifeCycle';
import config from './Output.config.json';
import message from '~/components/Message';
import { ArgumentsItem } from '~/types/appData';
import { cloneDeep } from 'lodash';
import { TCHStatusType } from '~/types/pageData';
import { TCH2Process } from './helper';
import sleep from '~/core/helper/sleep';
import EventEmitter from '~/core/EventEmitter';

interface Props {
  pageData: RootState['pageData'];
}

const Output: OutputModules<Props> = ({ pageData }) => {
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const eventRef = useRef<EventEmitter>();
  const runningTimes = useSelector((state: RootState) => state.runningTimes);
  // 创建百度页面统计, 只做一次创建
  useEffect(() => {
    const { statisticsId, TCH } = pageData;
    if (statisticsId) {
      initTrack(statisticsId);
    }
    if (TCH) {
      const process = TCH2Process(TCH, runningTimes.process || {});
      setRunningTimes({ process });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);
  // rootFontsize当成配合windowResize更新时组件做页面更新的key值，暂无实质用途
  const rootFontsize =
    useSelector((state: RootState) => state.controller.bestFont) ||
    ROOT_FONTSIZE;
  const [isMount, setIsMount] = useState(false);
  // 设置基准rem单位
  useRem();

  // 设置页面标题
  useEffect(() => {
    document.title = getResult(pageData.pageTitle || '\u200E');
  }, [pageData.pageTitle]);

  const injectGlobal = useCallback(
    (name, value) => {
      const argName = getArgumentsItem(name);
      const argValue = getArgumentsItem(value);
      if (argName && argValue) {
        setRunningTimes({ [`${argName}`]: argValue });
      } else {
        console.error('注入自定义全局数据时缺少属性名或值!');
      }
      // 弹出json Editer
    },
    [setRunningTimes],
  );

  // 页面百度统计
  const trackPageViewBD = useCallback((url) => {
    const argUrl = getArgumentsItem(url);
    trackPageView(argUrl);
  }, []);

  // 事件百度统计
  const trackEventBD = useCallback((category, action, optLabel) => {
    const argCategory = getArgumentsItem(category);
    const argAction = getArgumentsItem(action);
    const argOptLabel = getArgumentsItem(optLabel);
    trackEvent(argCategory, argAction, argOptLabel);
  }, []);

  // 页面重定向
  const redirect = useCallback((url, isReplace) => {
    const argUrl = getArgumentsItem(url);
    const argIsReplace = getArgumentsItem(isReplace);
    if (argUrl === '-1') {
      window.history.back();
    } else if (isUrl(argUrl as string)) {
      if (argIsReplace === 'replace') {
        window.location.replace(argUrl as string);
      } else {
        window.location.href = argUrl as string;
      }
    }
  }, []);

  // message
  const globalMessage = useCallback(
    (
      condition: ArgumentsItem,
      messageType: ArgumentsItem,
      messageStr: ArgumentsItem,
    ) => {
      const argCondition = getArgumentsItem(condition) as boolean;
      const argMessageType = getArgumentsItem(messageType) as number;
      const argMessageStr = getArgumentsItem(messageStr) as string;
      if (!argMessageStr?.length || !argCondition) {
        return;
      }
      switch (argMessageType) {
        case 1:
          message.info(argMessageStr);
          break;
        case 2:
          message.success(argMessageStr);
          break;
        case 3:
          message.warning(argMessageStr);
          break;
        case 4:
          message.error(argMessageStr);
          break;
        default:
          break;
      }
    },
    [],
  );

  const sleepFor = useCallback((sleepTime) => {
    const argSleepTime = (getArgumentsItem(sleepTime) as number) || 1000;
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, argSleepTime),
    );
  }, []);

  const updateThreadPointStatus = useCallback(
    (...args: ArgumentsItem[]) => {
      const { thread, point, status } = getArguments(args) as {
        thread: string;
        point: string;
        status: TCHStatusType;
      };

      const newRunningTimes = cloneDeep(runningTimes);
      // 线程节点路径
      const TCH = pageData.TCH;
      const msg = TCH?.[thread]?.find((item) => item.point === point)?.msg;

      if (newRunningTimes?.process[thread]?.controls[point] && TCH) {
        // 先赋值
        newRunningTimes.process[thread].controls[point] = { status, msg };
        // 计算结果
        newRunningTimes.process = TCH2Process(TCH, newRunningTimes.process);
        // 同步数据
        setRunningTimes(newRunningTimes);
      }
    },
    [pageData.TCH, runningTimes, setRunningTimes],
  );

  /** 全局线程执行*/
  const onProcess = useCallback(
    (threadName: ArgumentsItem) => {
      // 当前线程名
      const name = getArgumentsItem(threadName) as string;
      // 线程队列
      const pointQuery = pageData.TCH?.[name]?.map((item) => item.point);
      if (!pointQuery?.length) return;
      const dispatchLib = pageData.TCHProcess?.[name];
      if (!dispatchLib?.length) return;
      // 运行时线程当前状态, 线程结束位
      const currentPoint = runningTimes.process?.[name]?.currentPoint;
      // 运行时线程全部状态
      const controls = runningTimes.process?.[name]?.controls;

      // 线程执行方法进程
      Promise.resolve().then(() => {
        for (let index = 0; index < pointQuery.length; index++) {
          // 节点
          const point = pointQuery[index];
          // 运行时此节点状态
          const currentPointStatus = controls?.[point]?.status;
          // step1:摘取仅需运行的dispatchs数据; step2:转换为EventEmitterEmitArgs
          const dispatchs = dispatchLib.filter(
            (item) =>
              item.point === point && item.status === currentPointStatus,
          )?.map((item) => (
            {name: `${item.module}/${item.dispatch}`, arguments: item.arguments}
          ));
          // 执行队列
          if (eventRef.current && dispatchs) {
            return eventRef.current.emit(dispatchs as any);
          }
          // 从eventEmitter执行dispatchs
          if (point === currentPoint?.point) {
            // 到线程终点break结束
            break;
          }
        }
      });
    },
    [pageData.TCH, pageData.TCHProcess, runningTimes.process],
  );

  /**全局Api运行 */
  const runApi = useCallback(
    async (apiName: ArgumentsItem) => {
      // 1、获取参数名
      const api = getArgumentsItem(apiName);
      // 2、找到要执行的Api
      const apiItem = pageData.globalApi?.find(
        // isUrl(item.url || "") &&
        (item) => item.name === api,
      );
      // 3、执行。
      if (apiItem && !!apiItem.method) {
        await requester(apiItem);
      } else {
        message.error(`Api${api || ''}不存在，或参数配置异常，请检查`)
      }
    },
    [pageData.globalApi],
  )

  // 全局未做uuid前缀处理，这里需要手动加上global标签
  const [, eventEmitter] = useLifeCycle(
    'global',
    { mount: '初始化', unmount: '卸载', usergesture: '首次交互' },
    {
      injectGlobal,
      redirect,
      trackPageViewBD,
      trackEventBD,
      sleepFor,
      globalMessage,
      onProcess,
      updateThreadPointStatus,
      runApi
    },
  );
  eventRef.current = eventEmitter;

  const onMount = useCallback(async () => {
    await sleep(200);
    // 1、api处理 检查是不是http-url
    const apiArguments = pageData.onLoadApi?.filter(
      // isUrl(item.url || "") &&
      (item) => !!item.method,
    );
    // 2、事先准备数据。
    if (apiArguments?.length) {
      for (let index = 0; index < apiArguments.length; index++) {
        const item = apiArguments[index];
        await requester(item);
      }
    }
    // 3、事件处理，等待组件和eventEmitter准备
    const emitList: EventsTypeItem[] = pageData.mountEnvents || [];
    await eventEmitter.emit(emitList);
    // 4、准备就绪
    setIsMount(true);
  }, [eventEmitter, pageData.mountEnvents, pageData.onLoadApi]);

  const onUnmount = useCallback(() => {
    // 事件处理
    const emitList: EventsTypeItem[] = pageData.unmountEnvents || [];
    eventEmitter.emit(emitList);
  }, [eventEmitter, pageData.unmountEnvents]);

  useEffect(() => {
    if (eventEmitter) {
      onMount();
    }
  }, [eventEmitter, onMount]);

  useEffect(() => {
    return () => {
      if (eventEmitter) {
        onUnmount();
      }
    };
  }, [eventEmitter, onUnmount]);

  usePostMessage(({ tag, value }) => {
    if (tag === 'playEventEmit') {
      if (eventEmitter) {
        eventEmitter.emit(value.args);
      }
    }
  });

  // 首次交互
  const [firstInteraction, setFirstInteraction] = useState(false);
  const onFirstInteraction = useCallback(
    () => {
      if (!firstInteraction && eventEmitter) {
        // 事件处理
        const emitList: EventsTypeItem[] = pageData.usergestureEnvents || [];
        setFirstInteraction(true);
        eventEmitter.emit(emitList);
      }
    },
    [eventEmitter, firstInteraction, pageData],
  )

  const rowHeight = parseInt(getResult(`${pageData.rowHeight}`));
  
  const cols = parseInt(getResult(`${pageData.cols}`));
  const space = parseInt(getResult(`${pageData.space}`));
  // 前置数据完全准备就绪再放行App
  if (!isMount || !eventEmitter) {
    return null;
  }

  return (
    <div onPointerDown={onFirstInteraction}>
      <OutputLayout
        rootFontsize={rootFontsize}
        rowHeight={rowHeight >= 0 ? rowHeight : GRID_DEFAULT_ROWHEIGHT}
        cols={cols >= 0 ? cols : GRID_DEFAULT_COLS}
        space={space >= 0 ? space : GRID_DEFAULT_SPACE}
      />
    </div>
  );
};

// 全局Api
Output.exposeApi = [];

// 全局事件
Output.exposeEvents = config.exposeEvents as ComExposeEvents;

// 全局方法
Output.exposeFunctions = config.exposeFunctions as any;

export default Output;
