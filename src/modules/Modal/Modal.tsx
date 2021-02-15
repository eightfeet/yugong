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
    basic,
    trigger,
    overlay,
    content,
    header,
    article,
    close,
  } = props.style;
  const ref = useRef<Core>();

  useEffect(() => {
    ref.current = new Core({
      style: {
        overlay: styleCompiler(overlay).style as any,
      },
      shouldCloseOnOverlayClick: true,
    });
    return () => {
      if (ref.current) {
        ref.current.remove();
      }
    };
  }, [overlay]);

  const onClick = useCallback(() => {
    if (!ref.current) return;
    ref.current.create({
      header: "弹窗标题",
      article: "弹窗文案",
      footer: "底部",
    });
  }, []);

  const { style } = props;
  return (
    <Conterner {...props}>
      <div style={styleCompiler(style.trigger).style} onClick={onClick}>
        按钮
      </div>
    </Conterner>
  );
};

export default Modal;
