import React, { useEffect, useRef, useState } from "react";
import s from "./Mixedarguments.module.less";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import Radio from "antd/lib/radio";
import Button from "antd/lib/button";
import { AppDataLayoutItemTypes } from "~/types/appData";

interface Props {
    onChange: any;
    typeArguments: any;
    flexible: any;
}

const Mixedarguments: React.FC<Props> = ({typeArguments}) => {

  const [jsonData, setJsonData] = useState<AppDataLayoutItemTypes>();
  const [jsonMode, setJsonMode] = useState<"view" | "code">("view");

  useEffect(() => {
    setJsonData({ ...typeArguments });
  }, [typeArguments]);

  const jsoneditor = useRef<JSONEditor>();
  const container = useRef<any>();

  const onsubmit = useCallback(() => {
    try {
      var json = jsoneditor.current?.get();
      if (json) {
        console.log(json)
      }
    } catch (e) {
      return;
    }
  }, []);

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
        <div>
          &nbsp;
          <CopyToClipboard
            text={JSON.stringify(jsonData)}
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

export default Mixedarguments;
