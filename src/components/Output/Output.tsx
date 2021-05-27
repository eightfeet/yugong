/**
 * Output入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutputLayout from "~/OutputLayout";
import requester from "~/core/fetch";
import isUrl from "~/core/helper/isUrl";
import useRem from "~/hooks/useRem";
import { Dispatch, RootState } from "~/redux/store";
import { EventsTypeItem, OutputModules } from "~/types/modules";
import { compilePlaceholderFromDataSource as getResult } from "~/core/getDataFromSource";
import "./Output.less";
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWHEIGHT,
  GRID_DEFAULT_SPACE,
  ROOT_FONTSIZE,
} from "~/core/constants";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { initTrack, trackEvent, trackPageView } from "~/core/tracking";
import usePostMessage from "~/hooks/usePostMessage";

interface Props {
  pageData: RootState["pageData"];
}


const Output: OutputModules<Props> = ({ eventEmitter, pageData }) => {
  
  // 创建百度页面统计, 只做一次创建
  useEffect(() => {
    const { statisticsId } = pageData;
    if (statisticsId) {
      initTrack(statisticsId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // rootFontsize当成配合windowResize更新时组件做页面更新的key值，暂无实质用途
  const rootFontsize =
    useSelector((state: RootState) => state.controller.bestFont) ||
    ROOT_FONTSIZE;
  const [isMount, setIsMount] = useState(false);
  // 设置基准rem单位
  useRem();

  // 设置页面标题
  useEffect(() => {
    document.title = pageData.pageTitle || "\u200E";
  }, [pageData.pageTitle]);

  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;

  const onMount = useCallback(async () => {
    // 1、api处理 检查是不是http-url
    const apiArguments = pageData.onLoadApi?.filter(
      // isUrl(item.url || "") && 
      (item) => !!item.method
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

  const injectGlobal = useCallback(
    (name, value) => {
      const argName = getArgumentsItem(name);
      const argValue = getArgumentsItem(value)
      if (argName && argValue) {
        setRunningTimes({[`${argName}`]: argValue});
      } else {
        console.error('注入自定义全局数据时缺少属性名或值！')
      }
      // 弹出json Editer
    },
    [setRunningTimes],
  )

  // 页面百度统计
  const trackPageViewBD = useCallback(
      (url) => {
        const argUrl = getArgumentsItem(url);
        trackPageView(argUrl)
      },
      [],
    )
  
    // 事件百度统计
  const trackEventBD = useCallback(
    (category, action, optLabel) => {
      const argCategory = getArgumentsItem(category);
      const argAction = getArgumentsItem(action);
      const argOptLabel = getArgumentsItem(optLabel);
      trackEvent(argCategory, argAction, argOptLabel);
    },
    [],
  )

  // 页面重定向
  const redirect = useCallback(
    (url, isReplace) => {
      const argUrl = getArgumentsItem(url);
      const argIsReplace = getArgumentsItem(isReplace);
      if (argUrl === '-1') {
        window.history.back()
      } else if (isUrl(argUrl as string)) {
        if (argIsReplace) {
          window.location.replace(argUrl as string)
        } else {
          window.location.href = argUrl as string;
        }
      }
    },
    [],
  )
  
  const sleepFor = useCallback(
    (sleepTime) => {
      const argSleepTime = getArgumentsItem(sleepTime) as number || 1000;
      return new Promise<void>((resolve) => setTimeout(() => {
        resolve()
      }, argSleepTime))
    },
    [],
  )

  // 全局未做uuid前缀处理，这里需要手动加上global标签
  useMemo(() => {
    eventEmitter.addEventListener("global/mount", onMount);
    eventEmitter.addEventListener("global/unmount", onUnmount);
    eventEmitter.addEventListener("global/injectGlobal", injectGlobal);
    eventEmitter.addEventListener("global/redirect", redirect);
    eventEmitter.addEventListener("global/trackPageViewBD", trackPageViewBD);
    eventEmitter.addEventListener("global/trackEventBD", trackEventBD);
    eventEmitter.addEventListener("global/sleepFor", sleepFor);
  }, [eventEmitter, onMount, onUnmount, injectGlobal, redirect, trackPageViewBD, trackEventBD, sleepFor]);

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

  usePostMessage(({tag, value}) => {
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
    <OutputLayout
      rootFontsize={rootFontsize}
      eventEmitter={eventEmitter}
      rowHeight={rowHeight >= 0 ? rowHeight : GRID_DEFAULT_ROWHEIGHT}
      cols={cols >= 0 ? cols : GRID_DEFAULT_COLS}
      space={space >= 0 ? space : GRID_DEFAULT_SPACE}
    />
  );
};

// 全局Api
Output.exposeApi = [];

// 全局事件
Output.exposeEvents = [
  {
    name: "mount",
    description: "初始化",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

// 全局方法
Output.exposeFunctions = [
  {
    name: "injectGlobal",
    description: "注入自定义全局数据",
    arguments: [
      {
        type: "string",
        name: "变量名",
        fieldName: "name",
        describe: "唯一(英文)全局变量名",
        data: '',
      },
      {
        type: "mixed",
        name: "变量值",
        fieldName: "value",
        describe: "请输入变量数据",
        data: undefined,
      },
    ],
  },
  {
    name: "sleepFor",
    description: "等待",
    arguments: [
      {
        type: "number",
        name: "休眠时间",
        fieldName: "sleepTime",
        describe: "休眠时间(ms)",
        data: '',
      }
    ],
  },
  {
    name: "redirect",
    description: "页面重定向",
    arguments: [
      {
        type: "string",
        name: "跳转(-1或跳转url)",
        fieldName: "url",
        describe: "等于-1时浏览器返回，等于url时页面跳转到url",
        data: '',
      },
      {
        type: "boolean",
        name: "跳转方法",
        fieldName: "isReplace",
        describe: "默认false，true时使用replace重定向，浏览器将无法回退到当前页面",
        data: {
          comparableAverageA: "0",
          method: "===",
          comparableAverageB: "1"
        },
      }
    ]
  },
  {
    name: "trackPageViewBD",
    description: "百度页面统计",
    arguments: [
      {
        type: "string",
        name: "路径",
        fieldName: "url",
        describe: '必填，以"/"开头，访问当前页面时百度统计将以此路径作为统计标识',
        data: '',
      }
    ]
  },
  {
    name: "trackEventBD",
    description: "百度事件统计",
    arguments: [
      {
        type: "string",
        name: "类型",
        fieldName: "category",
        describe: '要监控的目标的类型名称	不填、填"-"的事件会被抛弃',
        data: '',
      },
      {
        type: "string",
        name: "动作",
        fieldName: "action",
        describe: '用户跟网页进行交互的动作名称	不填、填"-"的事件会被抛弃',
        data: '',
      },
      {
        type: "string",
        name: "信息(可选)",
        fieldName: "optLabel",
        describe: '事件的一些额外信息	不填、填"-"代表此项为空',
        data: '',
      }
    ]
  },
];

export default Output;
