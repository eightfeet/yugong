import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Input, Tooltip } from "antd";
import Select from "./../Select";
import s from "./Display.module.scss";
import NumberInput from "../NumberInput";
import { DisplayTypesOfStyleItems } from "types/appData";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Spacing from "../Spacing";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
  onChange: (result: DisplayTypesOfStyleItems) => void;
  defaultData?: DisplayTypesOfStyleItems;
  unit?: string;
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
  | "overflow";

const Display: React.FC<Props> = ({ onChange, defaultData, unit }) => {
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
  } = displayData;

  useEffect(() => {
    setDisplayData({ ...defaultData });
  }, [defaultData, moduleId]);

  const onChangeDisplay = useCallback(
    (type: ChangeType) => (data: any) => {
      displayData[type] = data;
      if (type === "position" && data === "relative") {
        delete displayData.left;
        delete displayData.right;
        delete displayData.top;
        delete displayData.bottom;
      }
      setDisplayData({ ...displayData });
      if (onChange instanceof Function) {
        onChange(displayData);
      }
    },
    [displayData, onChange]
  );

  const onChangeWidthHeight = useCallback(
    (type: ChangeType) => (e: any) => {
      const oprateData = { ...displayData };
      const data = e.target.value;
      oprateData[type] = data;
      console.log(type, oprateData);
      setDisplayData(oprateData);
      if (onChange instanceof Function) {
        onChange(oprateData);
      }
    },
    [displayData, onChange]
  );

  const onChangeSpace = useCallback(
    (type, value) => {
      const data: DisplayTypesOfStyleItems = { ...displayData };
      data[type] = value;
      setDisplayData(data);
      if (onChange instanceof Function) {
        onChange(data);
      }
    },
    [displayData, onChange]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          {/* <NumberInput
            label="宽度"
            unit={unit}
            min={0}
            max={100000}
            value={width}
            onChange={onChangeDisplay("width")}
          /> */}
          <Row gutter={4} style={{ alignItems: "center" }}>
            <Col style={{ textAlign: "right" }} span={10}>
              宽度
            </Col>
            <Col span={10}>
              <Input
                type="text"
                value={width}
                placeholder={`${unit}`}
                onChange={onChangeWidthHeight("width")}
              />
            </Col>
            <Col span={2} className={s.unit}>
              <Tooltip placement="topRight" title={<div>宽度：允许输入数字(&gt;=0)或运行时变量</div>}>
                {isNaN(parseInt(`${width}`, 10)) ? (
                  <InfoCircleOutlined />
                ) : (
                  unit
                )}
              </Tooltip>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {/* <NumberInput
            label="高度"
            unit={unit}
            min={0}
            max={100000}
            value={height}
            onChange={onChangeDisplay("height")}
          /> */}
          <Row gutter={4} style={{ alignItems: "center" }}>
            <Col style={{ textAlign: "right" }} span={10}>
              高度
            </Col>
            <Col span={9}>
              <Input
                type="text"
                placeholder={`${unit}`}
                value={height}
                onChange={onChangeWidthHeight("height")}
              />
            </Col>
            <Col span={2} className={s.unit}>
              <Tooltip placement="topRight" title={<div>高度：允许输入数字(&gt;=0)或运行时变量</div>}>
                {isNaN(parseInt(`${height}`, 10)) ? (
                  <InfoCircleOutlined />
                ) : (
                  unit
                )}
              </Tooltip>
            </Col>
          </Row>
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
            label="定位"
            value={position}
            optionsData={{ absolute: "绝对", relative: "相对", "": "无" }}
            onChange={onChangeDisplay("position")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="层级"
            min={1}
            max={100000}
            value={zIndex}
            onChange={onChangeDisplay("zIndex")}
          />
        </Col>
      </Row>
      {position === "absolute" || position === "fixed" ? (
        <Row className={s.row}>
          <Col span={12}>
            <NumberInput
              label="左定位"
              unit={unit}
              min={-100000}
              max={100000}
              value={left}
              onChange={onChangeDisplay("left")}
            />
          </Col>
          <Col span={12}>
            <NumberInput
              label="右定位"
              unit={unit}
              min={-100000}
              max={100000}
              value={right}
              onChange={onChangeDisplay("right")}
            />
          </Col>
        </Row>
      ) : null}
      {position === "absolute" || position === "fixed" ? (
        <Row className={s.row}>
          <Col span={12}>
            <NumberInput
              label="上定位"
              unit={unit}
              min={-100000}
              max={100000}
              value={top}
              onChange={onChangeDisplay("top")}
            />
          </Col>
          <Col span={12}>
            <NumberInput
              label="下定位"
              unit={unit}
              min={-100000}
              max={100000}
              value={bottom}
              onChange={onChangeDisplay("bottom")}
            />
          </Col>
        </Row>
      ) : null}
      <Spacing
        unit={unit}
        onChange={onChangeSpace}
        margin={margin}
        padding={padding}
      />
    </>
  );
};

export default Display;
