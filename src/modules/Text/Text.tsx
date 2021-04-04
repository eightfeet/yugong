import { useCallback, useEffect, useMemo, useState } from "react";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import s from "./Text.module.less";
import useStyles from "./Text.useStyle";

export interface TextProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Text: Modules<TextProps> = (props) => {
  const { eventEmitter, events = {}, api, style } = props;
  const [textArea, setTextArea] = useState<string[]>([
    '通过事件调用模块的设置文本(setText)方法来，设置文本内容'
  ]);
  const userClass = useStyles(style);

  // 设置按钮
  const setText = useCallback((text: string[]) => {
    setTextArea(text);
  }, []);

  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener('setText', setText);
}, [eventEmitter, setText]);

  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);
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
    <Wrapper {...props} maxWidth maxHeight itemAlign="top">
      <ul className={s.text}>
        {textArea.map((item, index: number) => (
          <li key={index} className={userClass.paragraph}>
            {item}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Text.exposeFunctions = [
  {
    name: "setText",
    description: "设置文本",
    arguments: [
      {
        type: "array",
        name: "textArray",
        describe: "文本内容",
        data: [
          "文本可以是一个段落，也可以是一个列表！",
          "通过调用Text的setText方法可以修改文本内容！",
          "每个段落都有一个序号前缀，可以单独定义样式去隐藏或美化前缀",
          "每段文本可以追加html标签，以满足更灵活的样式编辑"
        ],
        fieldName: "imageUrls",
      },
    ],
  },
];

/**
 * 发布事件的静态描述
 */
Text.exposeEvents = [
  {
    name: "mount",
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Text.exposeDefaultProps = {
  style: {
    basic: {
      font: {
        align: "left",
      },
    },
    paragraph: {},
    prefix: {},
  },
  styleDescription: {
    paragraph: "段落",
    prefix: "段落前缀",
  },
};

/**
 * 发布默认Api
 */
Text.exposeApi = [];

export default Text;
