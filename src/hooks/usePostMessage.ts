import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

interface Result {
    tag: 'id' | 'updatePage' | 'updateAppData' | 'setIsEditing' | 'updateActivationItem' | 'updateRunningTimes' | 'removeActivationItem' | 'playEventEmit' | 'setCurrentEditorStylePath' | 'record';
    value: any;
}

/**
 * 处理消息推送，暂定同域下处理
 * @param data 推送标签与值{tag, value}
 * @param wind 目标窗口
 * @param origin 域名默认当前
 */
export const sendMessage = ({tag, value}: Result, wind?: Window | null, origin = window.location.origin) => {
  if (wind) {
    wind.postMessage({tag, value}, origin);
  }
}

/**
 * 处理消息推送
 * @param fn Function
 */
const usePostMessage = (fn: (result: Result) => void) => {
    const { appData, pageData, controller, } = useSelector((state:RootState) => state);
    useEffect(() => {
        const handler = (event: { data: any; }) => {
          if (fn instanceof Function) {
            const {tag, value} =  event.data;
            let update = true;
            switch (tag) {
              case 'updatePage':
                if (JSON.stringify(value) === JSON.stringify(pageData)) update = false;
                break;
              case 'updateAppData':
                if (JSON.stringify(value) === JSON.stringify(appData)) update = false;
                break;
              default:
                break;
            }

            if (update) {
              fn(event.data)
            }
          }
        }
        
        window.addEventListener("message", handler)
        // clean up
        return () => window.removeEventListener("message", handler)
      }, [appData, fn, pageData]) // empty array => run only once

    return sendMessage
}


export default usePostMessage;