import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import s from "./CodeEditor.module.less";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useLocalStorage from "~/hooks/useLocalStorage";
import { message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import Radio from "antd/lib/radio";
import Button from "antd/lib/button";
import { AppDataLayoutItemTypes } from "~/types/appData";
import produce from "~/core/helper/produce";

interface Props { }

const Codeeditor: React.FC<Props> = () => {
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );
  const appData = useSelector((state: RootState) => state.appData);
  const dispatch = useDispatch<Dispatch>();
  const [jsonData, setJsonData] = useState<AppDataLayoutItemTypes>();
  const [jsonMode, setJsonMode] = useState<"view" | "code">("view");

  useEffect(() => {
    setJsonData({ ...activationItem });
  }, [activationItem]);

  const [, setLocalStorage] = useLocalStorage("appData", null);
  const jsoneditor = useRef<JSONEditor>();
  const container = useRef<any>();

  const onsubmit = useCallback(() => {
    try {
      var json = jsoneditor.current?.get();
      if (
        json &&
        activationItem.moduleId === json.moduleId &&
        activationItem.moduleId === json.layout?.i
      ) {
        setJsonData(json);
        dispatch.activationItem.updateActivationItem(json);
        const operateData = produce([...appData].map((item) => {
          if (item.moduleId === json.moduleId) {
            return json;
          }
          return item;
        }), undefined, {
          name: `修改组件${activationItem.moduleName || activationItem.moduleId}`,
          desc: 'code'
        });
        dispatch.appData.updateAppData(operateData);
        setLocalStorage(operateData);
        dispatch.controller.forceUpdateByStateTag();
      }
    } catch (e) {
      return;
    }
  }, [activationItem.moduleId, activationItem.moduleName, appData, dispatch.activationItem, dispatch.appData, dispatch.controller, setLocalStorage]);

  useEffect(() => {
    if (container.current && jsonData) {
      jsoneditor.current = new JSONEditor(container.current, {
        mode: jsonMode,
        mainMenuBar: false,
      });
      jsoneditor.current.set(jsonData);
    }

    return () => {
      if (jsoneditor.current) {
        jsoneditor.current.destroy();
      }
    };
  }, [jsonData, jsonMode]);

  const onChangeJsonMode = useCallback((e) => {
    jsoneditor.current?.setMode(e.target.value);
    setJsonMode(e.target.value);
  }, []);
  return (
    <>
      <div className={s.toolbar}>
        <div className={s.modeid}>{activationItem.moduleId}</div>
        <div>
          &nbsp;
          <CopyToClipboard
            text={JSON.stringify(activationItem)}
            onCopy={() => message.info("已复制到剪切板")}
          >
            <Button size="small" icon={<CopyOutlined alt="复制到剪切板" />}>
              复制
            </Button>
          </CopyToClipboard>
          &nbsp;
          <Radio.Group
            value={jsonMode}
            size="small"
            onChange={onChangeJsonMode}
          >
            <Radio.Button value="view">预览</Radio.Button>
            <Radio.Button value="code">编辑</Radio.Button>
          </Radio.Group>
          &nbsp;
          {jsonMode === "code" ? (
            <Button
              size="small"
              type="primary"
              onClick={onsubmit}
              icon={<CopyOutlined alt="复制到剪切板" />}
            >
              保存
            </Button>
          ) : null}
          &nbsp;
        </div>
      </div>
      <div className={s.wrap} ref={container} />
    </>
  );
};

export default Codeeditor;
