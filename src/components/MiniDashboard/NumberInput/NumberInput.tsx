import React, { useEffect, useRef } from "react";
import { Row, Col, InputNumber } from "antd";
import s from './NumberInput.module.scss';
import { InputNumberProps } from "antd/lib/input-number";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

interface Props extends InputNumberProps {
    label: string;
    unit?: string;
}

const QuadrangularSelect: React.FC<Props> = ({unit, label, ...other}) => {
  const ref = useRef(null);
  const moduleId = useSelector((state: RootState) => state.activationItem.moduleId);
  useEffect(() => {
    if (ref.current) {
      (ref.current as any).blur();
    }
  }, [moduleId, ref.current])
  return (
    <Row className={s.row} gutter={4}>
      <Col className={s.label} span={10}>{label || ''}</Col>
      <Col span={10}>
        <InputNumber {...other} ref={ref} />
      </Col>
      <Col span={4}>{unit || ''}</Col>
    </Row>
  );
};

export default QuadrangularSelect;
