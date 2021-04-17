import { useCallback, useEffect, useMemo, useState } from "react";
import requester from "~/core/fetch";
import { useLongPress } from "react-use";
import EventEmitter from "~/core/EventEmitter";
import {
  AppDataElementsTypes,
  ArgumentsBoolean,
  ArgumentsString,
} from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import s from "./Button.module.less";
import useStyles from "./Button.useStyles";
import classNames from "classnames";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";

export interface ButtonProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Button: Modules<ButtonProps> = (props) => {
  const { eventEmitter, events = {}, api, style } = props;
  const [text, setText] = useState();
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [displayState, setDisplayState] = useState<string>();

  const userClass = useStyles(style);
  const defaultOptions = {
    isPreventDefault: false,
    delay: 2000,
  };

  // 设置按钮
  const setButton = useCallback(
    (
      buttonText: ArgumentsString,
      disabled: ArgumentsBoolean,
      hidden: ArgumentsBoolean
    ) => {
      const getText = getArgumentsItem(buttonText);
      const isDisable = getArgumentsItem(disabled);
      const isHidden = getArgumentsItem(hidden);
      setText(getText as any);
      setDisabled(isDisable as boolean);
      setHidden(isHidden as boolean);
    },
    []
  );

  // 设置按钮显示样式
  const setButtonDisplay = useCallback(
    (
      state: ArgumentsString,
    ) => {
      const getState = getArgumentsItem(state);
      setDisplayState(getState as string);
    },
    []
  );

  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setButton", setButton);
    eventEmitter.addEventListener("setButtonDisplay", setButtonDisplay);
  }, [eventEmitter, setButton, setButtonDisplay]);

  // 点击事件
  const onClick = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "beforeClick");
    // api 参数交由requester自行处理
    await requester(apiArguments || {});
    eventEmitter.emit(events.click);
  }, [api, eventEmitter, events.click]);

  // 双击事件
  const onDoubleClick = useCallback(async () => {
    const apiArguments = api?.find(
      (item) => item.apiId === "beforeDoubleClick"
    );
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
    <Wrapper {...props} maxWidth>
      {!hidden ? (
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          {...longPressEvent}
          className={classNames(s.btn, userClass.button, {
            [userClass.disabled]: displayState === 'disabled', 
            [userClass.focus]: displayState === 'focus', 
            [userClass.active]: displayState === 'active', 
            [userClass.hover]: displayState === 'hover'
          })}
          disabled={disabled}
        >
          {text || "按钮"}
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
        fieldName: "buttonText",
        html: true,
        describe: "按钮显示文字",
        data: "按钮",
      },
      {
        type: "boolean",
        name: "禁用按钮",
        fieldName: "disabled",
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
        fieldName: "hidden",
        describe: "隐藏按钮，true隐藏，false不隐藏",
        data: {
          comparableAverageA: "a",
          comparableAverageB: undefined,
          method: "===",
        },
      },
    ],
  },
  {
    name: "setButtonDisplay",
    description: '设置按钮样式',
    arguments: [{
      type: "string",
        name: "显示状态",
        fieldName: "setButtonDisplay",
        describe: "按钮显状态，disabled(禁用), focus: (获取焦点), active: (激活), hover: (经过)",
        data: "",
    }]
  }
];

/**
 * 发布事件的静态描述
 */
Button.exposeEvents = [
  {
    name: "mount",
    description: "初始化",
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

/**
 * 发布默认porps
 */
Button.exposeDefaultProps = {
  layout: {
    w: 5, // 宽
    h: 3, // 高
  },
  style: {
    basic: {},
    normal: {
      display: {
        padding: [10, 10, 10, 10],
      },
      border: {
        borderColor: "rgba(205, 205, 205, 1)",
        borderPosition: {
          border: true,
        },
        borderWidth: 1,
        borderStyle: "solid",
        radiusTopLeft: 6,
        radiusTopRight: 6,
        radiusBottomLeft: 6,
        radiusBottomRight: 6,
      },
      backgroundCommon: {
        backgroundColor: "rgba(226, 226, 226, 1)",
      },
      boxShadow: [
        {
          shiftDown: 2,
          color: "rgba(0, 0, 0, 0.15 )",
          blur: 4,
        },
      ],
    },
    disabled: {
      font: {
        color: "rgba(144, 144, 144, 1)",
      },
    },
    focus: {},
    active: {},
    hover: {},
    before: {},
    after: {},
    actbefore: {},
    actafter: {}
  },
  styleDescription: {
    normal: "常态",
    disabled: "禁用",
    focus: "获取焦点",
    active: "激活",
    hover: "经过",
    before: "常态前缀",
    after: "常态后缀",
    actbefore: "激活状态前缀",
    actafter: "激活状态后缀"
  },
};

export default Button;
