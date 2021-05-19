import React from "react";
import { Row, Col, Select as SelectItem } from "antd";
import s from './Select.module.scss';

interface Props {
    label: string;
    unit?: string;
    optionsData: {
      [keys: string]: any
    };
    [keys: string]: any;
    onChange: (value: any) => void;
}

const Select: React.FC<Props> = ({unit, label, optionsData, onChange, ...other}) => {
  return (
    <Row className={s.row} gutter={4}>
      <Col className={s.label} span={7}>{label || ''}{other.defaultValue}</Col>
      <Col span={17}>
        <SelectItem {...other} onChange={onChange}>
          {
            Object.keys(optionsData).map((key) => <SelectItem.Option key={key} value={key}>{optionsData[key]}</SelectItem.Option>)
          }
        </SelectItem>
      </Col>
    </Row>
  );
};

export default Select;
