import { useCallback, useEffect, useMemo, useRef } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import Core from "@eightfeet/modal";
import styleCompiler from "~/compiler";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import getResult from "~/core/getDataFromRunningTime";
import Wrapper from "../Wrapper";

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 弹窗组件
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Modal: Modules<Props> = (props) => {
  const { style, eventEmitter, events = {} } = props;
  // ===================================创建组件=================================== //
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
      onCancel: () => {
        eventEmitter.emit(events.onClose);
      },
    });
    // 移除实例
    return () => {
      if (ref.current) {
        if (document.querySelector(`#${ref.current.state.id}`)) {
          ref.current.remove();
        }
      }
    };
  }, [
    article,
    close,
    content,
    eventEmitter,
    events.onClose,
    footer,
    header,
    overlay,
  ]);

  // ===================================定义组件方法=================================== //
  const show = useCallback((parames) => {
    const { header, article, footer } = parames || {};
    if (!ref.current) return;
    ref.current.create({
      header: getResult(header),
      article: getResult(article),
      footer: getResult(footer),
    });
  }, []);

  const hide = useCallback(() => {
    if (!ref.current) return;
    ref.current.remove();
  }, []);

  //向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("show", show);
    eventEmitter.addEventListener("hide", hide);
  }, [eventEmitter, hide, show]);

  return <Wrapper {...props} />;
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Modal.exposeFunctions = [
  {
    name: "show",
    description: "显示弹窗",
    arguments: [
      {
        type: "object",
        name: "弹窗内容",
        describe: "header：头部，article：内容，footer：底部",
        data: {
          header: '<h3 style="margin:0; pardding:0">header</h3>',
          article: '<p style="padding: 10px">article</p>',
          footer: '<p style="margin:0; pardding:0">footer</p>',
        },
      },
    ],
  },
  {
    name: "hide",
    description: "隐藏弹窗",
  },
];

/**
 * 发布事件的静态描述
 */
Modal.exposeEvents = [
  {
    name: 'didMount',
    description: "挂载",
  },
  {
    name: "unMount",
    description: "卸载",
  },
  {
    name: "onClose",
    description: "关闭时",
  }
];

/**
 * 发布默认porps
 */
Modal.exposeDefaultProps = {
  layout: {
    w: 1, // 宽
    h: 1, // 高
  },
  style: {
    basic: {},
    overlay: {
      backgroundCommon: {
        backgroundColor: "rgba(0, 0, 0, 0.54)",
      },
    },
    content: {
      display: {
        width: 300,
      },
      border: {
        radiusTopLeft: 8,
        radiusTopRight: 8,
        radiusBottomLeft: 8,
        radiusBottomRight: 8,
      },
    },
    footer: {
      display: {
        height: 50,
      },
      font: {
        lineHeight: 50,
        align: "center",
      },
      border: {
        borderPosition: {
          borderTop: true,
          borderRight: false,
          borderBottom: false,
          borderLeft: false,
          border: false,
        },
        borderColor: "rgba(219, 219, 219, 1)",
        borderStyle: "solid",
        borderWidth: 1,
      },
    },
    header: {
      display: {
        height: 50,
      },
      font: {
        lineHeight: 50,
        fontSize: 15,
      },
      border: {
        borderPosition: {
          borderTop: false,
          borderRight: false,
          borderBottom: true,
          borderLeft: false,
          border: false,
        },
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(216, 216, 216, 1)",
      },
    },
    article: {},
    close: {
      display: {
        width: 10,
        height: 10,
        position: 'absolute',
        right: 15,
        top: 15
      },
      border: {
        radiusBottomLeft: 10,
        radiusTopLeft: 10,
        radiusBottomRight: 10,
        radiusTopRight: 10
      },
      backgroundCommon: {
        backgroundColor: 'red'
      }
    },
  },
};

export default Modal;
