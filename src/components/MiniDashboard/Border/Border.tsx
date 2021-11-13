import { Col, Row } from "antd";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Color from "../Color";
import Select from "./Select";
import s from "./Border.module.less";
import BorderCheckbox from "./BorderCheckbox";
import BorderRadius from "./BorderRadius";
import { BorderTypesOfStyleItems } from "types/appData";
import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
import { StyleContext } from "~/context/StyleContext";
import UnitInput from "../UnitInput";

interface Props {}

const Border: React.FC<Props> = () => {
  const context = useContext(StyleContext);
  const [border, setBorder] = useState<BorderTypesOfStyleItems>({});
  const moduleId = useSelector((state:RootState) => state.activationItem.moduleId);
  useEffect(() => {
    const data = context.getDefaultData?.("border") || {};
    data && setBorder(data);
  }, [context, moduleId]);

  const onChangeBorder = useCallback(
    (type: string) => (value: any) => {
      switch (type) {
        case "borderRaduis":
          const [
            radiusTopLeft,
            radiusTopRight,
            radiusBottomRight,
            radiusBottomLeft,
          ] = value;
          border.radiusTopLeft = radiusTopLeft;
          border.radiusTopRight = radiusTopRight;
          border.radiusBottomLeft = radiusBottomLeft;
          border.radiusBottomRight = radiusBottomRight;
          break;
        case "borderStyle":
        case "borderWidth":
        case "borderPosition":
          border[type] = value;
          break;
        case "borderColor":
          const rgba = value.value?.rgb;
          border.borderColor = rgba && `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
          break;
        default:
          break;
      }
      const data = { ...border };
      setBorder(data);
      if (context.onChange instanceof Function) {
        context.onChange(data, "border");
      }
    },
    [border, context]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={6}>
          <Color
            defaultColor={border.borderColor}
            label="描边颜色"
            onChange={onChangeBorder("borderColor")}
            span={{
              label: 14,
              value: 10
            }}
          />
        </Col>
        <Col span={6} />
        <Col span={12}>
          <BorderCheckbox
            onChange={onChangeBorder("borderPosition")}
            defaultData={border.borderPosition || {}}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            onChange={onChangeBorder("borderStyle")}
            value={border.borderStyle}
            optionsData={{
              solid: "solid",
              dotted: "dotted",
              dashed: "dashed",
              double: "double",
              groove: "groove",
              ridge: "ridge",
              inset: "inset",
              outset: "outset",
              hidden: "hidden",
              none: "none",
            }}
            label="描边样式"
          />
        </Col>

        <Col span={12}>
          <UnitInput 
            label="描边宽度"
            min={0}
            max={100000}
            defaultValue={border.borderWidth as any}
            onChange={onChangeBorder("borderWidth")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={2}></Col>
        <Col span={20}>
          <BorderRadius
            onChange={onChangeBorder("borderRaduis")}
            defaultData={[
              border.radiusTopLeft,
              border.radiusTopRight,
              border.radiusBottomRight,
              border.radiusBottomLeft,
            ]}
            unit={context.unit}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
};

export default Border;
