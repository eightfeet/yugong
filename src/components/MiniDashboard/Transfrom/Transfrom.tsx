import { Row, Col } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import NumberInput from "../NumberInput";
import UnitInput from "../UnitInput";
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
      console.log(type, value)
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
            placeholder="倍"
            unit="倍"
            min={0}
            max={100}
            defaultValue={defaultDate?.scale}
            onChange={onChangeTransFrom('scale')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="旋转"
            placeholder="度"
            unit="deg"
            min={-360}
            max={360}
            defaultValue={defaultDate?.rotate}
            onChange={onChangeTransFrom('rotate')}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <UnitInput 
            label="平移X"
            min={-1000}
            max={1000}
            // defaultValue={(defaultDate?.translateX || undefined)as any}
            onChange={onChangeTransFrom('translateX')}
          />
        </Col>
        <Col span={12}>
          <UnitInput 
            label="平移Y"
            min={-1000}
            max={1000}
            // defaultValue={(defaultDate?.translateY || undefined) as any}
            onChange={onChangeTransFrom('translateY')}
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
            value={defaultDate?.skewX}
            onChange={onChangeTransFrom('skewX')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="倾斜Y"
            placeholder="度"
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
