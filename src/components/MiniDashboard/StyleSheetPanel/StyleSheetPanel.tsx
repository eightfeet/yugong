import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

import { Collapse } from "antd";
import Display from "../Display";
import Font from "../Font";

import useMergeAppData from "~/hooks/useMergeAppData";
import s from "./StyleSheetPanel.module.scss";
import Shadow from "../Shadow";
import Border from "../Border";
import Transform from "../Transfrom";
import BackgroundGroup from "../BackgroundGroup";

import { StyleContext, StyleType } from "~/context/StyleContext";

const { Panel } = Collapse;

interface Props {
  path: string;
}

const StyleSheetPanel: React.FC<Props> = ({ path }) => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.pageData.unit);
  const update = useMergeAppData();
  const rootStyle = `style.${path}`;

  const onChange = useCallback(
    (result: any, type: StyleType) => {
      update(result, `${rootStyle}.${type}`);
    },
    [rootStyle, update]
  );

  const getDefaultData = useCallback(
    (type: StyleType) => selected?.style?.[path]?.[type],
    [path, selected?.style]
  );

  return (
    <StyleContext.Provider
      value={{
        unit,
        onChange,
        getDefaultData,
      }}
    >
      <div className={s.root}>
        {path ? (
          <Collapse accordion bordered={false}>
            <Panel header="布局" key="display">
              <Display />
            </Panel>
            <Panel header="文字" key="font">
              <Font />
            </Panel>
            <Panel header="背景" key="backgroundGroup">
              <BackgroundGroup />
            </Panel>
            <Panel header="圆角与描边" key="border">
              <Border />
            </Panel>
            <Panel header="投影" key="textShadow_boxShadow">
              <Shadow />
            </Panel>
            <Panel header="变换" key="transform">
              <Transform />
            </Panel>
          </Collapse>
        ) : null}
      </div>
    </StyleContext.Provider>
  );
};

export default StyleSheetPanel;
