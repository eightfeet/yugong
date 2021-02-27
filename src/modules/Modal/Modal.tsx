import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import Core from "@eightfeet/modal";
import styleCompiler from "~/compiler";
import EventEmitter from "~/core/EventEmitter";

interface paraments extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 事件描述
 */
interface EventEmitterExpose {
  name: string;
  description: string;
}



/**
 * Extends FC with custom static methods
 * 静态属性仅用于 dashboard 配置使用
 */
interface Props<TProps> extends React.FC<TProps> {
  /**
   * 事件名称与描述
   */
  exposeEvents: EventEmitterExpose[];
  /**
   * 方法名称与描述
   */
  exposeFunctions: EventEmitterExpose[];
}

const Modal: Props<paraments> = (props) => {
  const { style, eventEmitter } = props;

  const show = useCallback(() => {
    if (!ref.current) return;
    ref.current.create({
      header: "弹窗标题",
      article: "弹窗文案",
      footer: "底部",
    });
  }, []);

  const hide = useCallback(() => {
    if (!ref.current) return;
    ref.current.remove();
  }, []);

  const ref = useRef<Core>();
  const { overlay, header, footer, content, article, close } = style;
  useEffect(() => {
    // 创建弹窗
    ref.current = new Core({
      style: {
        overlay: styleCompiler(overlay).style as any,
        content: styleCompiler(content).style as any,
        footer: styleCompiler(footer).style as any,
        header: styleCompiler(header).style as any,
        article: styleCompiler(article).style as any,
        close: styleCompiler(close).style as any,
      },
      shouldCloseOnOverlayClick: true,
    });

    // 事件订阅
    return () => {
      if (ref.current) {
        if (!document.querySelector(`#${ref.current.state.id}`)) return;
        ref.current.remove();
      }
    };
  }, [article, close, content, footer, header, overlay]);

  //事件发布
  useMemo(() => {
    eventEmitter.addEventListener("show", show);
    eventEmitter.addEventListener("hide", hide);
  }, [eventEmitter, hide, show]);

  return null;
};

Modal.exposeFunctions = [];
Modal.exposeEvents = [
  {
    name: "onClose",
    description: "关闭弹窗时",
  },
];

export default Modal;
