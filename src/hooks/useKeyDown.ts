import { useEffect } from "react";

// 兼容数据
const defaultKeys = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222,
};

/**
 *
 *
 * @param {(key: KeyboardEvent) => void} callback 回调
 * @param {string} [key] 按键
 * @param {("altKey" | "ctrlKey" | "shiftKey" | "metaKey")} [firstKey] 前置按键
 */
const useKeyDown = (
  callback: (key: KeyboardEvent) => void,
  key?: string,
  firstKey?: "altKey" | "ctrlKey" | "shiftKey" | "metaKey",
) => {
  // 确认复制模块
  useEffect(() => {
    // 上下window都监听delete按键，对当前元素进行删除处理
    const win = (document.getElementById("wrapiframe") as HTMLIFrameElement)
      ?.contentWindow;

    // 根据类型设置计较参数
    // let keyCodeData = keyCode;

    // 处理方法
    const fn = (event: KeyboardEvent) => {
      if (!(callback instanceof Function)) { // 没有回调方法直接返回
        return;
      }

      if (firstKey && !event[firstKey]) { // 需要首选参数但无触发首选参数时直接return
        return
      };

      if (event.key !== undefined) { // 确认key值
        // Handle the event with KeyboardEvent.key and set handled true.
        if (event.key === key) { // 确认key值
          callback(event);
        }
      } else if (event.keyCode !== undefined) {
        // Handle the event with KeyboardEvent.keyCode and set handled true.
        if (key && event.keyCode === defaultKeys[`${key}`.toLowerCase()]) { // 确认key值
          callback(event);
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
  }, [callback, firstKey, key]);
};

export default useKeyDown;
