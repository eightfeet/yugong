import React from "react";
import { Row, Col, Select as SelectItem } from "antd";
import s from "./Select.module.less";

interface Props {
  label: string;
  unit?: string;
  optionsData: {
    [keys: string]: any;
  };
  [keys: string]: any;
}

const Select: React.FC<Props> = ({ unit, label, optionsData, ...other }) => {
  return (
    <Row className={s.row} gutter={4}>
      <Col className={s.label} span={10}>
        {label || ""}
        {other.defaultValue}
      </Col>
      <Col span={14}>
        <SelectItem {...other} >
          {Object.keys(optionsData).map((key) => (
            <SelectItem.Option key={key} value={key}>
              {(key !== "none" && key !== "hidden") ? (
                <div className={s.example}>
                  <div style={{ borderTop: `4px ${key} #666` }} />
                </div>
              ) : null}
              {key === "none" ? '无' : null}
              {key === "hidden" ? '隐藏' : null}
            </SelectItem.Option>
          ))}
        </SelectItem>
      </Col>
    </Row>
  );
};

export default Select;
