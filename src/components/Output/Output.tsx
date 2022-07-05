/**
 * Output入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */

import { useCallback, useEffect, useState } from 'react';
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
import { getArguments, getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { initTrack, trackEvent, trackPageView } from '~/core/tracking';
import usePostMessage from '~/hooks/usePostMessage';
import useLifeCycle from '~/hooks/useLifeCycle';
import config from './Output.config.json';
import message from '~/components/Message';
import { ArgumentsItem } from '~/types/appData';
import { cloneDeep, get, set } from 'lodash';
import { TCHProcessItemType, TCHRunningTime, TCHStatusType } from '~/types/pageData';
import { TCH2Process } from './helper';

interface Props {
  pageData: RootState['pageData'];
}

const Output: OutputModules<Props> = ({ pageData }) => {
  const sendMessage = usePostMessage(() => { });
  // 创建百度页面统计, 只做一次创建
  useEffect(() => {
    const { statisticsId } = pageData;
    if (statisticsId) {
      initTrack(statisticsId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const runningTimes = useSelector((state: RootState) => state.runningTimes);

  const { TCH } = pageData;

  const initRunningTimeProcess = useCallback(
    () => {
      const newRunningTimes = cloneDeep(runningTimes);
      if (TCH) {
        const process = TCH2Process(TCH, newRunningTimes.process);
        newRunningTimes.process = process;
      }
      console.log('当前线程', newRunningTimes.process);
    },
    [TCH, runningTimes],
  )

  useEffect(() => {
    initRunningTimeProcess()
  }, [initRunningTimeProcess])

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


  const updateProcess = useCallback(
    (...args: ArgumentsItem[]) => {

      const {thread, point, status} = getArguments(args) as {
        thread: string;
        point: string;
        status: TCHStatusType;
      };

      // 线程节点路径
      const currentTCH = pageData.TCH?.[thread];
      if (!currentTCH) return;
      // 获取当前节点的message
      const { msg='' } = currentTCH?.filter(item => item.point === point)?.[0] || {};
      // copy当前运行时
      const newRunningTimes = cloneDeep(runningTimes) as {
        [keys: string]: any;
        process?: TCHRunningTime;
      };
      // 没有进程时定义一个空进程
      if (!newRunningTimes.process) {
        newRunningTimes.process = {}
      }
      // 设置运行时中进程的线程节点状态
      if (!newRunningTimes.process[thread]) {
        newRunningTimes.process[thread] = { controls: {} } as any;
      }
      set(newRunningTimes, `process.${thread}.controls.${point}`, { status, msg });
      
      /**
       * 计算当前线程最终节点的状态
       * 计算顺序与定义的pageData.TCH[thread]的先后顺序保持一致
       * 计算节点规则，按顺序执行遇到status为locked时中止当前线程
       * 如果所有节点都为unlocked时线程计算执行并停留到最后
       */
      let currentPoint: {
        thread: string;
        point: string;
        status: TCHStatusType;
        msg: string;
      } | undefined;


      for (let index = 0; index < currentTCH.length; index++) {
        const { point, status, msg} = currentTCH[index];
        // 有锁定节点时线程停留在锁定节点
        if (point && status === 'locked') {
          currentPoint = {
            thread,
            point,
            status,
            msg
          }
          break;
        }
        // 无锁定节点时，线程停留在末尾节点
        currentPoint = {
          thread,
          point,
          status,
          msg
        }
      }

      // 计算当前线程最终节点的状态完成
      set(newRunningTimes, `process.${thread}.currentPoint`, currentPoint);

      // 同步数据
      setRunningTimes(newRunningTimes);
      sendMessage(
        {
          tag: "updateRunningTimes",
          value: newRunningTimes,
        },
        window.top
      );

    },
    [pageData.TCH, runningTimes, sendMessage, setRunningTimes],
  )
  
  // 全局线程控制
  const onProcess = useCallback(
    (threadName: ArgumentsItem) => {
      // 当前线程名
      const name = getArgumentsItem(threadName) as string;
      // 线程队列
      const pointQuery = pageData.TCH?.[name]?.map(item => item.point);
      if (!pointQuery?.length) return;
      // 运行时线程状态
      const currentPoint = runningTimes.process?.[name]?.currentPoint;
      console.log('线程节点固定队列', pointQuery);
      console.log('运行时线程保持的节点状态', currentPoint);
      // 线程执行方法进程
      const threadAction = pageData.TCHProcess?.[name];

      Promise.resolve().then(() => {
        for (let index = 0; index < pointQuery.length; index++) {
          // 节点
          const point = pointQuery[index];
          
          console.log('节点', point);
          
  
          if (point === currentPoint?.point) {
            // 到线程终点break结束
            break;
          }
          
        }
      })
      
      // pointQuery?.forEach(point => {
      //   // 1、获取当前节点的方法
      //   const threadLocked: TCHProcessItemType[] = [];
      //   const threadUnlocked: TCHProcessItemType[] = [];

      //   threadAction?.forEach(item => {
      //     if (item.status === 'locked') {
      //       threadLocked.push(item);
      //     }
      //     if (item.status === 'unlocked') {
      //       threadUnlocked.push(item);
      //     }
      //   })
      //   console.log('节点', point);
      // })

      
      
      // setProcess({
      //   thread: 'xiancheng',
      //   point: 'login',
      //   msg: '请先登录',
      //   status: 'unlocked'
      // })
    },
    [pageData.TCH, pageData.TCHProcess, runningTimes],
  )

  // 全局未做uuid前缀处理，这里需要手动加上global标签
  const [, eventEmitter] = useLifeCycle(
    'global',
    { mount: '初始化', unmount: '卸载' },
    {
      injectGlobal,
      redirect,
      trackPageViewBD,
      trackEventBD,
      sleepFor,
      globalMessage,
      onProcess,
      updateProcess,
    },
  );

  const onMount = useCallback(async () => {
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

  const rowHeight = parseInt(getResult(`${pageData.rowHeight}`));
  const cols = parseInt(getResult(`${pageData.cols}`));
  const space = parseInt(getResult(`${pageData.space}`));
  // 前置数据完全准备就绪再放行App
  if (!isMount || !eventEmitter) {
    return null;
  }

  return (
    <div>
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
