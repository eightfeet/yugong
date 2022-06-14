import React, { useCallback, useEffect, useState, useContext } from "react";
import { Row, Col } from "antd";
import s from "./Display.module.scss";
import { DisplayTypesOfStyleItems } from "types/appData";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import UnitInput from "~/components/MiniDashboard/UnitInput";
import Select from "~/components/MiniDashboard/Select";
import NumberInput from "~/components/MiniDashboard/NumberInput";
import Spacing from "~/components/MiniDashboard/Spacing";
import { ElementStyleContext } from "../../ElementStyleContext";

interface Props {
}

type ChangeType =
  | "width"
  | "height"
  | "zIndex"
  | "position"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "display"
  | "boxSizing"
  | "overflow"
  | "pointerEvents";

const Display: React.FC<Props> = () => {
  const context = useContext(ElementStyleContext);

  const [displayData, setDisplayData] = useState<DisplayTypesOfStyleItems>({});
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );
  const {
    width,
    height,
    zIndex,
    position,
    left,
    right,
    top,
    bottom,
    margin,
    padding,
    display,
    overflow,
    boxSizing,
    pointerEvents,
  } = displayData;

  useEffect(() => {
    setDisplayData(context.getDefaultData?.("display") || {});
  }, [context, moduleId]);

  const onChangeDisplay = useCallback(
    (type: ChangeType) => (data: any) => {
      displayData[type] = data;
      if (type === "position" && data === "relative") {
        delete displayData.left;
        delete displayData.right;
        delete displayData.top;
        delete displayData.bottom;
      }

      if (!displayData.width && !displayData.height) {
        delete displayData.boxSizing;
      }
      setDisplayData({ ...displayData });
      if (context.onChange instanceof Function) {
        context.onChange(displayData, 'display');
      }
    },
    [context, displayData]
  );

  const onChangeSpace = useCallback(
    (type, value) => {
      const data: DisplayTypesOfStyleItems = { ...displayData };
      data[type] = value;
      setDisplayData(data);
      if (context.onChange instanceof Function) {
        context.onChange(data, 'display');
      }
    },
    [context, displayData]
  );

  const onChangeOption = useCallback(
    (option: string) => (value: [string | number | null, string]) => {
      console.log(777, value);
      
      const oprateData: DisplayTypesOfStyleItems = { ...displayData };
      oprateData[option] = value;
      setDisplayData(oprateData);
      if (context.onChange instanceof Function) {
        context.onChange(oprateData, 'display');
      }
    },
    [context, displayData]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <UnitInput
            defaultValue={width}
            min={0}
            onChange={onChangeOption("width")}
            label="宽度"
          />
        </Col>
        <Col span={12}>
          <UnitInput
            defaultValue={height}
            min={0}
            onChange={onChangeOption("height")}
            label="高度"
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="显示类型"
            value={display}
            optionsData={{
              block: "块级元素",
              inline: "内联元素",
              "inline-block": "行内块元素",
              none: "隐藏",
              "": "无",
            }}
            onChange={onChangeDisplay("display")}
          />
        </Col>
        <Col span={12}>
          <Select
            label="内容溢出"
            value={overflow}
            optionsData={{
              visible: "显示",
              hidden: "修剪",
              scroll: "滚动",
              auto: "自动",
              "": "无",
            }}
            onChange={onChangeDisplay("overflow")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            placehold="请先设置宽高"
            label="尺寸限制"
            value={boxSizing}
            optionsData={{
              "content-box": "自动扩展",
              "border-box": "固定宽高",
              "": "无",
            }}
            onChange={onChangeDisplay("boxSizing")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="层级"
            min={1}
            max={100000}
            defaultValue={zIndex}
            onChange={onChangeDisplay("zIndex")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="定位"
            value={position}
            optionsData={{ absolute: "绝对", relative: "相对", "": "无" }}
            onChange={onChangeDisplay("position")}
          />
        </Col>
        <Col span={12}>
          <Select
            label="事件响应"
            value={pointerEvents}
            optionsData={{ auto: "自动", none: "不接受任何事件" }}
            onChange={onChangeDisplay("pointerEvents")}
          />
        </Col>
      </Row>
      {position === "absolute" || position === "fixed" ? (
        <Row className={s.row}>
          <Col span={12}>
            <UnitInput
              defaultValue={left}
              min={-100000}
              max={100000}
              onChange={onChangeOption("left")}
              label="左定位"
            />
          </Col>
          <Col span={12}>
            <UnitInput
              defaultValue={right}
              min={-100000}
              max={100000}
              onChange={onChangeOption("right")}
              label="右定位"
            />
          </Col>
        </Row>
      ) : null}
      {position === "absolute" || position === "fixed" ? (
        <Row className={s.row}>
          <Col span={12}>
            <UnitInput
              defaultValue={top}
              min={-100000}
              max={100000}
              onChange={onChangeOption("top")}
              label="上定位"
            />
          </Col>
          <Col span={12}>
            <UnitInput
              defaultValue={bottom}
              min={-100000}
              max={100000}
              onChange={onChangeOption("bottom")}
              label="下定位"
            />
          </Col>
        </Row>
      ) : null}
      <Spacing
        unit={context.unit}
        onChange={onChangeSpace}
        margin={margin}
        padding={padding}
      />
    </>
  );
};

export default Display;
