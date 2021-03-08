import { Col, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ArgumentsItem } from "~/types/appData";
import s from "./BooleanArguments.module.less";
import methodOptions from "./method";

interface Props {
  typeArguments: ArgumentsItem;
  flexible: boolean;
  onChange: (data: ArgumentsItem) => void;
}

interface anyObj {
  [keys: string]: any;
}

const BooleanArguments: React.FC<Props> = ({
  typeArguments,
  flexible,
  onChange,
}) => {
  const [argumentsState, setArgumentsState] = useState<ArgumentsItem>();
  useEffect(() => {
    setArgumentsState(typeArguments);
  }, [typeArguments]);

  const onChangeValue = useCallback(
    (key: string) => (e: any) => {
      const result: anyObj = { ...argumentsState };
      result.data[key] = e.target.value;
      if (onChange instanceof Function) {
        onChange(result as ArgumentsItem);
      }
      setArgumentsState(result as ArgumentsItem);
    },
    [argumentsState, onChange]
  );

  const onChangeCondition = useCallback((e) => {
    const result: anyObj = { ...argumentsState };
    result.data.method = e
    if (onChange instanceof Function) {
      onChange(result as ArgumentsItem);
    }
    setArgumentsState(result as ArgumentsItem);
  }, [argumentsState, onChange]);

  const data: any = argumentsState?.data || {
    comparableAverageA: null,
    comparableAverageB: null,
    method: "===",
  };
  return (
    <>
      <Row className={s.row} gutter={4}>
        <Col span={8}>
          <Input
            onChange={onChangeValue("comparableAverageA")}
            placeholder="条件A"
            type="text"
            value={data.comparableAverageA}
          />
        </Col>
        <Col span={8}>
          <Select className={s.selected} value={data.method} onChange={onChangeCondition}>
            {methodOptions.map((item) => (
              <Select.Option value={item.value}>{item.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8} className={s.btn}>
          <Input
            onChange={onChangeValue("comparableAverageB")}
            placeholder="条件B"
            type="text"
            value={data.comparableAverageB}
          />
        </Col>
      </Row>
    </>
  );
};

export default BooleanArguments;
