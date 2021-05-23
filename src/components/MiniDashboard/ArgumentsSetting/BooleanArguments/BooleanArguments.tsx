import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import getBooleanData from "~/core/getBooleanData";
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
      <Row gutter={4}>
        <Col span={8}>
          <Input
            onChange={onChangeValue("comparableAverageA")}
            placeholder="条件A"
            type="text"
            value={data.comparableAverageA}
          />
        </Col>
        <Col span={6}>
          <Select className={s.selected} value={data.method} onChange={onChangeCondition}>
            {methodOptions.map((item) => (
              <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>
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
        <Col span={2} style={{lineHeight: '30px'}}>
        <Tooltip
            placement="topRight"
            title={<span>{`${argumentsState && getBooleanData(argumentsState?.data) ? '当前状态：开启' : '当前状态：关闭'}`}<br />(等式成立时开启)</span>}
        >
            <InfoCircleOutlined />
        </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default BooleanArguments;
