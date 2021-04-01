import { useCallback, useEffect, useMemo, useState } from "react";
import requester from "~/core/fetch";
import { useLongPress } from "react-use";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import s from "./Button.module.less";

export interface ButtonProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Button: Modules<ButtonProps> = (props) => {
  const { eventEmitter, events = {}, api } = props;
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const defaultOptions = {
    isPreventDefault: false,
    delay: 2000
  };

  // 设置按钮
  const setButton = useCallback((buttonText, disabled, hidden) => {
    setText(buttonText);
    setDisabled(disabled);
    setHidden(hidden);
  }, []);

  //向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setButton", setButton);
  }, [eventEmitter, setButton]);

  // 点击事件
  const onClick = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "beforeClick");
    if (apiArguments) {
        await requester(apiArguments || {});
    }
    eventEmitter.emit(events.click);
  }, [api, eventEmitter, events.click]);

  // 双击事件
  const onDoubleClick = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "beforeDoubleClick");
    if (apiArguments) {
        await requester(apiArguments || {});
    }
    eventEmitter.emit(events.doubleClick);
  }, [api, eventEmitter, events.doubleClick]);

  // 长按事件
  const onLongPress = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "beforeLongPress");
    if (apiArguments) {
        await requester(apiArguments || {});
    }
    eventEmitter.emit(events.longPress);
  }, [api, eventEmitter, events.longPress]);

  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  // 基本事件
  useEffect(() => {
    // 执行挂载事件
    eventEmitter.emit(events.mount);
    return () => {
      // 执行卸载事件
      eventEmitter.emit(events.unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper {...props}>
      {!hidden ? (
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          {...longPressEvent}
          className={s.btn}
          disabled={disabled}
        >
          {text}
        </button>
      ) : null}
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Button.exposeFunctions = [
  {
    name: "setButton",
    description: "设置按钮",
    arguments: [
      {
        type: "string",
        name: "按钮文字",
        describe: "按钮显示文字",
        data: "按钮",
      },
      {
        type: "boolean",
        name: "禁用按钮",
        describe: "禁用按钮，true禁用，false启用",
        data: {
          comparableAverageA: "a",
          comparableAverageB: undefined,
          method: "===",
        },
      },
      {
        type: "boolean",
        name: "隐藏按钮",
        describe: "隐藏按钮，true隐藏，false不隐藏",
        data: {
          comparableAverageA: "a",
          comparableAverageB: undefined,
          method: "===",
        },
      },
    ],
  },
];

/**
 * 发布事件的静态描述
 */
Button.exposeEvents = [
  {
    name: "mount",
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  },
  {
    name: "click",
    description: "点击",
  },
  {
    name: "doubleClick",
    description: "双击",
  },
  {
    name: "longPress",
    description: "长按",
  },
];

/**
 * 发布默认porps
 */
Button.exposeDefaultProps = {};

/**
 * 发布默认Api
 */
Button.exposeApi = [
  {
    apiId: "beforeClick",
    name: "点击",
  },
  {
    apiId: "beforeDoubleClick",
    name: "双击",
  },
  {
    apiId: "beforeLongPress",
    name: "长按",
  },
];

export default Button;
