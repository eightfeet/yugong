/**
 * Output入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */

import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import OutputLayout from "~/OutputLayout";
import EventEmitter from "~/core/EventEmitter";
import requester from "~/core/fetch";
import isUrl from "~/core/helper/isUrl";
import useRem from "~/hooks/useRem";
import { RootState } from "~/redux/store";
import { EventsTypeItem, Modules } from "~/types/modules";
import { compilePlaceholderFromDataSource as getResult } from "~/core/getDataFromSource";
import "./Output.less";
import { GRID_DEFAULT_COLS, GRID_DEFAULT_ROWHEIGHT, GRID_DEFAULT_SPACE, ROOT_FONTSIZE } from "~/core/constants";

interface Props {}

const Output: Modules<Props> = () => {
  const pageData = useSelector((state: RootState) => state.pageData);
  // rootFontsize当成配合windowResize更新时组件做页面更新的key值，暂无实质用途
  const rootFontsize = useSelector((state: RootState) => state.controller.bestFont) || ROOT_FONTSIZE;

  // 设置基准rem单位
  useRem()

  // 设置页面标题
  useEffect(() => {
    document.title = pageData.pageTitle || "\u200E";
    
  }, [pageData.pageTitle]);

  // 创建全站事件处理器
  const eventEmitter = useMemo(() => {
    const env = new EventEmitter();
    // 暴露事件到window下
    (window.top as any).eventEmitter = (window as any).eventEmitter = env;
    return env;
  }, []);

  const onMount = useCallback(async () => {
    // 1、api处理
    // 检查是不是http-url
    const apiArguments = pageData.onLoadApi?.filter(item => (isUrl(item.url || '') && !!item.method));
    // 事先准备数据。
    if (apiArguments?.length) {
        apiArguments.forEach(async item => {
          await requester(item)
        })
    }
    // 2、事件处理，延迟一秒等待组件和eventEmitter准备
    const emitList: EventsTypeItem[] = pageData.mountEnvents || [];
      eventEmitter.emit(emitList); 
  }, [eventEmitter, pageData.mountEnvents, pageData.onLoadApi]);

  const onUnmount = useCallback(() => {
    // 1、事件处理
    const emitList: EventsTypeItem[] = pageData.unmountEnvents || [];
    eventEmitter.emit(emitList);
  }, [eventEmitter, pageData.unmountEnvents]);

  useMemo(() => {
    eventEmitter.addEventListener("mount", onMount);
    eventEmitter.addEventListener("unmount", onUnmount);
  }, [eventEmitter, onMount, onUnmount]);

  useEffect(() => {
    if (eventEmitter) {
      onMount();
    }
    return () => {
      if (eventEmitter) {
        onUnmount();
      }
    };
  }, [eventEmitter, onMount, onUnmount]);
  if (!eventEmitter) return null;
  const rowHeight = parseInt(getResult(`${pageData.rowHeight}`));
  const cols = parseInt(getResult(`${pageData.cols}`));
  const space = parseInt(getResult(`${pageData.space}`));
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
    name: "fun1",
    description: "方法1",
    arguments: [
      {
        type: "object",
        name: "fun1",
        fieldName: "fun1",
        describe: "fun1 描述",
        data: {
          data: "fun1",
        },
      },
    ],
  },
  {
    name: "fun2",
    description: "方法2",
  },
];

export default Output;
