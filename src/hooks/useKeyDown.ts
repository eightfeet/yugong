import { useEffect } from "react";

const useKeyDown = (callback: (key:KeyboardEvent) => void, keyCode: number | number[]) => {
  // 确认复制模块
  useEffect(() => {
    // 上下window都监听delete按键，对当前元素进行删除处理
    const win = (document.getElementById("wrapiframe") as HTMLIFrameElement)
      .contentWindow;

    // 根据类型设置计较参数
    let keyCodeData = keyCode;
    if (Array.isArray(keyCode)) {
      keyCodeData = [];
    }

    // 处理方法
    const fn = (key: KeyboardEvent) => {
      if (Array.isArray(keyCode)) {
        if ((keyCodeData as number[]).length < keyCode.length) {
          (keyCodeData as number[]).push(key.keyCode);
        }

        if (
          (keyCodeData as number[]).length === keyCode.length &&
          keyCode.join("") === (keyCodeData as number[]).join("")
        ) {
          if (callback instanceof Function) {
            callback(key);
            keyCodeData = []
          }
        }
      } else {
        if (callback instanceof Function && key.keyCode === keyCodeData) {
          callback(key);
        }
      }
    };

    if (win) {
      win.addEventListener("keydown", fn, true);
    }
    window.addEventListener("keydown", fn, true);
    return () => {
      window.removeEventListener("keydown", fn, true);
      if (win) {
        win.removeEventListener("keydown", fn, true);
      }
    };
  }, [callback, keyCode]);
};

export default useKeyDown;
