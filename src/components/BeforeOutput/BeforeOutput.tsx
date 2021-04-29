import React, { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Output from "~/components/Output";
import EventEmitter from "~/core/EventEmitter";
import useLocalStorage from "~/hooks/useLocalStorage";
import usePostMessage from "~/hooks/usePostMessage";
import { Dispatch, RootState } from "~/redux/store";

interface Props {}

const Beforeoutput: React.FC<Props> = () => {
  const { getAppData } = useDispatch<Dispatch>().appData;
  const { getPageData } = useDispatch<Dispatch>().pageData;

  const pageData = useSelector((state: RootState) => state.pageData);
  
  // 缓存
  const [appDataLocalStoreData] = useLocalStorage("appData", null);
  const [pageDataLocalStoreData] = useLocalStorage("pageData", null);
  const [isAppdataReady, setIsAppdataReady] = useState(false);
  const [isPagedataReady, setIsPagedataReady] = useState(false);
  const [isEventEmitterReady, setIsEventEmitterReady] = useState(false);

  // 创建全站事件处理器
  const eventEmitter = useMemo(() => {
    const env = new EventEmitter();
    // 暴露事件到window下
    (window.top as any).eventEmitter = (window as any).eventEmitter = env;
    setIsEventEmitterReady(true)
    return env;
  }, []);

  const sendMessage = usePostMessage(() => {});

  // 数据初始化，获取页面数据
  useMemo(() => {
    getAppData(appDataLocalStoreData).then((res) => {
      setIsAppdataReady(true);
      // 获取数据后 发送一份到父级窗口作为编辑数据
      sendMessage(
        {
          tag: "updateAppData",
          value: res,
        },
        window.top
      );
    });
  }, [getAppData, appDataLocalStoreData, sendMessage]);

  // 获取页面数据
  useMemo(() => {
    getPageData(pageDataLocalStoreData).then((res) => {
      setIsPagedataReady(true);
      sendMessage(
        {
          tag: "updatePage",
          value: res,
        },
        window.top
      );
    });
  }, [getPageData, pageDataLocalStoreData, sendMessage]);

  // 底层数据将完全准备就绪，再放行App！
  if (!isAppdataReady || !isPagedataReady || !isEventEmitterReady || !pageData) {
    return null;
  }
  return <Output eventEmitter={eventEmitter} pageData={pageData} />;
};

export default Beforeoutput;
