import IframeResizer, { IFrameComponent } from "iframe-resizer-react";
import React, { useRef, useState } from "react";
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

  const onResized = (data: DataParames) =>
    setMessageData(data);

  const onMessage = (data: DataParames) => {
    setMessageData(data);
    if (iframeRef.current) {
      iframeRef.current!.sendMessage("Hello back from the parent page");
    }
  };

  return (
    <>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        log
        onMessage={onMessage}
        onResized={onResized}
        src="/?isEditing=true"
        style={{ width: "1px", minWidth: "100%", minHeight: "500px" }}
      />
      <MessageData data={messageData} />
    </>
  );
};

export default Responsive;
