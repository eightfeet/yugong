import React, { useCallback, useEffect, useRef } from "react";
import Conterner from "./../Conterner";
import { AppDataElementsTypes } from "~/types/appData";
import Core from "@eightfeet/modal";
import styleCompiler from "~/compiler";

interface paraments extends AppDataElementsTypes {
  id: string;
}

const Modal: React.FC<paraments> = (props) => {
  const {
    trigger,
    overlay,
    header,
    footer,
    content,
    article,
    close,
  } = props.style;
  const ref = useRef<Core>();

  useEffect(() => {
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
    return () => {
      if (ref.current) {
        if (!document.querySelector(`#${ref.current.state.id}`)) return
        ref.current.remove();
      }
    };
  }, [article, close, content, footer, header, overlay]);

  const onClick = useCallback(() => {
    if (!ref.current) return;
    ref.current.create({
      header: "弹窗标题",
      article: "弹窗文案",
      footer: "底部",
    });
  }, []);

  return (
    <Conterner {...props}>
      <div style={styleCompiler(trigger).style} onClick={onClick}>
        按钮
      </div>
    </Conterner>
  );
};

export default Modal;
