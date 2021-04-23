import React, { useEffect, useRef, useState } from "react";
import s from "./Mixedarguments.module.less";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";
import { CopyOutlined, FormOutlined, SaveOutlined } from "@ant-design/icons";
import Radio from "antd/lib/radio";
import Button from "antd/lib/button";
import { AppDataLayoutItemTypes, ArgumentsItem } from "~/types/appData";
import cloneDeep from "lodash/cloneDeep";

interface Props {
    onChange: (data: ArgumentsItem) => void;
    typeArguments: ArgumentsItem;
    flexible: boolean;
}

const Mixedarguments: React.FC<Props> = ({typeArguments, onChange}) => {

  const [jsonData, setJsonData] = useState<AppDataLayoutItemTypes>();
  const [jsonMode, setJsonMode] = useState<"view" | "code">("view");

  useEffect(() => {
    const result = cloneDeep(typeArguments);
    setJsonData(result.data || {});
  }, [typeArguments]);

  const jsoneditor = useRef<JSONEditor>();
  const container = useRef<any>();

  const onsubmit = useCallback(() => {
    try {
      var json = jsoneditor.current?.get();
      if (json && onChange instanceof Function) {
        const result = cloneDeep(typeArguments);
        result.data = json;
        jsoneditor.current?.setMode("view");
        setJsonMode("view");
        onChange(result)
        message.success(`${typeArguments.name}已更新！`)
      }
    } catch (e) {
      message.error('保存失败！JSON数据格式不正确')
      return;
    }
  }, [onChange, typeArguments]);

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
    try {
        var json = jsoneditor.current?.get();
        if (json) {
          jsoneditor.current?.setMode('code');
          setJsonMode('code');
        }
    } catch (error) {
      console.error(error)
    }
    
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
          {jsonMode === "view" ? (
            <Button
              size="small"
              type="primary"
              onClick={onChangeJsonMode}
              icon={<FormOutlined alt="编辑JSON"/>}
            >
              编辑
            </Button>
          ) : null}
          {jsonMode === "code" ? (
            <Button
              size="small"
              type="primary"
              onClick={onsubmit}
              icon={<SaveOutlined alt="保存JSON" />}
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
