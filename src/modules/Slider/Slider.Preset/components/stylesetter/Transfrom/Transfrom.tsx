import { Row, Col } from "antd";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { UnitType } from "~/types/appData";
import s from "./Transfrom.module.scss";
import NumberInput from "~/components/MiniDashboard/NumberInput";
import UnitInput from "~/components/MiniDashboard/UnitInput";
import { ElementStyleContext } from "../../../ElementStyleContext";

interface DefautData {
  scale?: number;
  rotate?: number;
  translateX?: UnitType;
  translateY?: UnitType;
  skewX?: number;
  skewY?: number;
}

interface Props {}

const Transfrom: React.FC<Props> = () => {
  const context = useContext(ElementStyleContext);
  const [transform, setTransform] = useState<DefautData>({});

  useEffect(() => {
    setTransform({ ...(context.style?.transform || {}) });
  }, [context.style?.transform]);

  const onChangeTransFrom = useCallback(
    (
        type:
          | "scale"
          | "rotate"
          | "translateX"
          | "translateY"
          | "skewX"
          | "skewY"
      ) =>
      (value: any) => {
        transform[type] = value;
        setTransform({ ...transform });
        if (context.onChange instanceof Function) {
          context.onChange({ ...transform }, "transform");
        }
      },
    [context, transform]
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="缩放"
            placeholder="倍"
            unit="倍"
            min={0}
            max={100}
            defaultValue={transform?.scale}
            onChange={onChangeTransFrom("scale")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="旋转"
            placeholder="度"
            unit="deg"
            min={-360}
            max={360}
            defaultValue={transform?.rotate}
            onChange={onChangeTransFrom("rotate")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <UnitInput
            label="平移X"
            min={-1000}
            max={1000}
            defaultValue={transform?.translateX}
            onChange={onChangeTransFrom("translateX")}
          />
        </Col>
        <Col span={12}>
          <UnitInput
            label="平移Y"
            min={-1000}
            max={1000}
            defaultValue={transform?.translateY}
            onChange={onChangeTransFrom("translateY")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="倾斜X"
            placeholder="度"
            unit="deg"
            min={-360}
            max={360}
            defaultValue={transform?.skewX}
            onChange={onChangeTransFrom("skewX")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="倾斜Y"
            placeholder="度"
            unit="deg"
            min={-360}
            max={360}
            defaultValue={transform?.skewY}
            onChange={onChangeTransFrom("skewY")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Transfrom;
