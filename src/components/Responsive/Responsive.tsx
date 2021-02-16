import IframeResizer, { IFrameComponent } from "iframe-resizer-react";
import React, { useRef, useState } from "react";
import MiniDashboard from "../MiniDashboard";
import MessageData from "./MessageData";

interface DataParames {
  iframe: IFrameComponent;
  height?: number;
  width?: number;
  type?: string;
  message?: any;
  [keys: string]: any;
}

interface Props {}

const Responsive: React.FC<Props> = () => {
  const iframeRef = useRef<any>(null);
  const [messageData, setMessageData] = useState<any>();
  const [designModal, setDesignModal] = useState(false)

  const onResized = (data: DataParames) => setMessageData(data);

  const onMessage = (data: DataParames) => {
    setMessageData(data);
    if (iframeRef.current) {
      iframeRef.current!.sendMessage("Hello back from the parent page");
    }
  };

  return (
    <>
      <span>
        视图模式：{designModal ? "设计模式" : "预览模式"}
        视图
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setDesignModal(!designModal)}>
        {designModal ? "预览模式" : "设计模式"}
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        
      >
        保存
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        重置
      </button>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        log
        onMessage={onMessage}
        onResized={onResized}
        src="/?isEditing=true"
        style={{ width: "1px", minWidth: "100%", minHeight: `${window.innerHeight}px` }}
      />
      <MiniDashboard />
    </>
  );
};

export default Responsive;
