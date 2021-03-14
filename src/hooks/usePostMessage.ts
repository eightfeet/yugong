import { useEffect } from "react";

interface Result {
    tag: 'id' | 'updateAppData' | 'setIsEditing' | 'updateActivationItem' | 'updateRunningTimes';
    value: any;
}

/**
 * 处理消息推送，暂定同域下处理
 * @param data 推送标签与值{tag, value}
 * @param wind 目标窗口
 * @param origin 域名默认当前
 */
export const sendMessage = ({tag, value}: Result, wind: Window | null, origin = window.location.origin) => {
  if (wind) {
    wind.postMessage({tag, value}, origin);
  }
}

/**
 * 处理消息推送
 * @param fn Function
 */
const usePostMessage = (fn: (result: Result) => void) => {
    useEffect(() => {
        const handler = (event: { data: any; }) => {
          if (fn instanceof Function) {
            fn(event.data)
          }
        }
        
        window.addEventListener("message", handler)
        // clean up
        return () => window.removeEventListener("message", handler)
      }, [fn]) // empty array => run only once

    return sendMessage
}


export default usePostMessage;