import { Row, Col } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import NumberInput from "../NumberInput";
import s from "./Transfrom.module.scss";

interface DefautData {
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  skewX?: number;
  skewY?: number;
}

interface Props {
  unit?: string;
  onChange?: (result: DefautData) => void;
  defaultDate?: DefautData;
}

const Transfrom: React.FC<Props> = ({ unit, defaultDate, onChange }) => {
  const [transfrom, setTransfrom] = useState<DefautData>({});
  const moduleId = useSelector((state: RootState) => state.activationItem.moduleId)

  useEffect(() => {
    setTransfrom({...(defaultDate || {})})
  }, [defaultDate, moduleId])

  const onChangeTransFrom = useCallback(
    (
      type: "scale" | "rotate" | "translateX" | "translateY" | "skewX" | "skewY"
    ) => (value: any) => {
      transfrom[type] = value;
      setTransfrom({...transfrom});
      if (onChange instanceof Function) {
        onChange({...transfrom})
      }
    },
    [onChange, transfrom]
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="缩放"
            unit="倍"
            min={0}
            max={100}
            value={defaultDate?.scale}
            onChange={onChangeTransFrom('scale')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="旋转"
            unit="deg"
            min={-360}
            max={360}
            value={defaultDate?.rotate}
            onChange={onChangeTransFrom('rotate')}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="平移X"
            unit={unit}
            min={-1000}
            max={1000}
            value={defaultDate?.translateX}
            onChange={onChangeTransFrom('translateX')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="平移Y"
            unit={unit}
            min={-1000}
            max={1000}
            value={defaultDate?.translateY}
            onChange={onChangeTransFrom('translateY')}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="倾斜X"
            unit="deg"
            min={-360}
            max={360}
            value={defaultDate?.skewX}
            onChange={onChangeTransFrom('skewX')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="倾斜Y"
            unit="deg"
            min={-360}
            max={360}
            value={defaultDate?.skewY}
            onChange={onChangeTransFrom('skewY')}
          />
        </Col>
      </Row>
    </>
  );
};

export default Transfrom;
