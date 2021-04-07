import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Radio, Checkbox } from "antd";

import {
  AlignLeftOutlined,
  AlignRightOutlined,
  AlignCenterOutlined,
  BoldOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import s from "./Font.module.scss";
import Color from "../Color";
import NumberInput from "../NumberInput";
import { FontTypesOfStyleItems } from "types/appData";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

interface Props {
  onChange: (result: FontTypesOfStyleItems) => void;
  defaultData?: FontTypesOfStyleItems;
  unit?: string;
}

type ChangeType =
  | "color"
  | "fontSize"
  | "lineHeight"
  | "letterSP"
  | "wordSp"
  | "decoration"
  | "fontWeight"
  | "fontStyle"
  | "align";

const Font: React.FC<Props> = ({ onChange, defaultData, unit }) => {
  const [fontData, setFontData] = useState<FontTypesOfStyleItems>({});
  const {
    fontSize,
    align,
    lineHeight,
    letterSP,
    fontWeight,
    fontStyle,
    color,
    decoration,
  } = fontData;
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  useEffect(() => {
    const data: FontTypesOfStyleItems = { ...(defaultData || {}) };
    setFontData(data);
  }, [defaultData, moduleId]);

  const onChangeFont = useCallback(
    (type: ChangeType) => (data: any) => {
      let value = data;
      if (type === "align" || type === "decoration" || type === "fontWeight") {
        value = data.target.value;
      }
      if (type === "fontWeight") {
        if (data.target.checked) {
          value = "bold";
        } else {
          value = "normal";
        }
      }
      if (type === "fontStyle") {
        if (data.target.checked) {
          value = "italic";
        } else {
          value = "normal";
        }
      }
      if (type === "color") {
        value = `rgba(${data.value.rgb.r}, ${data.value.rgb.g}, ${data.value.rgb.b}, ${data.value.rgb.a})`;
      }
      fontData[type] = value;
      setFontData({ ...fontData });
      if (onChange instanceof Function) {
        onChange(fontData);
      }
    },
    [fontData, onChange]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={8}>
          <Radio.Group value={align} onChange={onChangeFont("align")}>
            <Radio.Button value="left">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="center">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="right">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Radio.Group value={decoration} onChange={onChangeFont("decoration")}>
            <Radio.Button value="none">N</Radio.Button>
            <Radio.Button value="underline">
              <UnderlineOutlined />
            </Radio.Button>
            <Radio.Button value="line-through">
              <StrikethroughOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Checkbox
            className={s.Checkbox}
            checked={fontWeight === "bold"}
            onChange={onChangeFont("fontWeight")}
          >
            <BoldOutlined />
          </Checkbox>
          <Checkbox
            className={s.Checkbox}
            checked={fontStyle === "italic"}
            onChange={onChangeFont("fontStyle")}
          >
            <ItalicOutlined />
          </Checkbox>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="字体颜色"
            onChange={onChangeFont("color")}
            defaultColor={color}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字体大小"
            unit={unit}
            min={0}
            max={100000}
            value={fontSize}
            onChange={onChangeFont("fontSize")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="行间距"
            unit={unit}
            min={0}
            max={100000}
            value={lineHeight}
            onChange={onChangeFont("lineHeight")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字间距"
            unit={unit}
            min={0}
            max={100000}
            value={letterSP}
            onChange={onChangeFont("letterSP")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Font;
