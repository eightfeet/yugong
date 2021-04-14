import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import s from "./CodeEditor.module.less";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import usePostMessage from "~/hooks/usePostMessage";
import useLocalStorage from "~/hooks/useLocalStorage";
import { message } from "antd";

interface Props {}

const Codeeditor: React.FC<Props> = () => {
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );
  const appData = useSelector((state: RootState) => state.appData);
  const dispatch = useDispatch<Dispatch>();
  const [, setLocalStorage] = useLocalStorage("appData", null);
  const jsoneditor = useRef<JSONEditor>();
  const container = useRef<any>();
  const onChangeJSON = useCallback(() => {
    try {
      var json = jsoneditor.current?.get();
      if (
        json &&
        activationItem.moduleId === json.moduleId &&
        activationItem.moduleId === json.layout?.i
      ) {
        dispatch.activationItem.updateActivationItem(json);
        const operateData = [...appData].map((item) => {
          if (item.moduleId === json.moduleId) {
            return json;
          }
          return item;
        });
        dispatch.appData.updateAppData(operateData);
        setLocalStorage(operateData);

        dispatch.controller.forceUpdateByStateTag();
      }
    } catch (e) {
      return;
    }
  }, [activationItem.moduleId, appData, dispatch.activationItem, dispatch.appData, dispatch.controller, setLocalStorage]);

  useEffect(() => {
    if (container.current) {
      jsoneditor.current = new JSONEditor(container.current, {
        mode: "code",
        mainMenuBar: false,
        onChange: onChangeJSON,
      });
      jsoneditor.current.set(activationItem);
    }

    return () => {
      if (jsoneditor.current) {
        jsoneditor.current.destroy();
      }
    };
  }, [activationItem, onChangeJSON]);
  return (
    <>
      <CopyToClipboard
        text={JSON.stringify(activationItem)}
        onCopy={() => message.error("已复制到剪切板")}
      >
        <span>Copy to clipboard with span</span>
      </CopyToClipboard>
      <div className={s.wrap} ref={container} />
    </>
  );
};

export default Codeeditor;
