import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

import { Collapse } from "antd";
import Display from "../Display";
import Font from "../Font";
import Background from "../Background";

import useMergeAppData from "~/hooks/useMergeAppData";
import s from "./StyleController.module.scss";
import Shadow from "../Shadow";
import Border from "../Border";
import Transform from "../Transfrom";

const { Panel } = Collapse;

interface Props {
  path: string;
}

const StyleController: React.FC<Props> = ({ path }) => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.controller.unit);
  const update = useMergeAppData();
  const rootStyle = `style.${path}`;

  const onChangeFont = useCallback(
    (result: any) => {
      update(result, `${rootStyle}.font`);
    },
    [rootStyle, update]
  );

  const onChangeDisplay = useCallback(
    (result: any) => {
      update(result, `${rootStyle}.display`);
    },
    [rootStyle, update]
  );

  const onChangeBackgroundCommon = useCallback(
    (result: any) => {
      if (result.type === "backgroundCommon") {
        update(result.values, `${rootStyle}.backgroundCommon`);
      }
      if (result.type === "backgroundGradient") {
        update(result.values, `${rootStyle}.backgroundGradient`);
      }
    },
    [rootStyle, update]
  );

  const onChangeShadow = useCallback(
    (result: any) => {
      if (result.type === "boxShadow") {
        update(result.values, `${rootStyle}.boxShadow`);
      }
      if (result.type === "textShadow") {
        update(result.values, `${rootStyle}.textShadow`);
      }
    },
    [rootStyle, update]
  );

  const onChangeBorder = useCallback(
    (result: any) => {
      update(result, `${rootStyle}.border`);
    },
    [rootStyle, update]
  );

  const onChangeTransfrom = useCallback(
    (result: any) => {
      console.log(result);
      update(result, `${rootStyle}.transform`);
    },
    [rootStyle, update]
  );

  return (
    <div className={s.root}>
      {path ? (
        <Collapse bordered={false}>
          <Panel header="布局" key="1">
            <Display
              unit={unit}
              onChange={onChangeDisplay}
              defaultData={selected?.style?.[path]?.display || {}}
            />
          </Panel>
          <Panel header="文字" key="2">
            <Font
              unit={unit}
              onChange={onChangeFont}
              defaultData={selected?.style?.[path]?.font || {}}
            />
          </Panel>
          <Panel header="圆角与描边" key="3">
            <Border
              unit={unit}
              onChange={onChangeBorder}
              defaultDate={selected?.style?.[path]?.border || {}}
            />
          </Panel>
          <Panel header="投影" key="4">
            <Shadow
              unit={unit}
              onChange={onChangeShadow}
              defaultValue={{
                textShadowList: selected?.style?.[path]?.textShadow,
                boxShadowList: selected?.style?.[path]?.boxShadow,
              }}
            />
          </Panel>
          <Panel header="背景" key="5">
            <Background
              unit={unit}
              onChange={onChangeBackgroundCommon}
              defaultBGCommonData={
                selected?.style?.[path]?.backgroundCommon || {}
              }
              defaultBGGradient={
                selected?.style?.[path]?.backgroundGradient || {}
              }
            />
          </Panel>
          <Panel header="变换" key="6">
            <Transform
              unit={unit}
              onChange={onChangeTransfrom}
              defaultDate={selected?.style?.[path]?.transform || {}}
            />
          </Panel>
        </Collapse>
      ) : null}
    </div>
  );
};

export default StyleController;
