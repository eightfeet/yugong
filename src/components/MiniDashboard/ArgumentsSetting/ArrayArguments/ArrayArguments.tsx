import { Button, Col, Input, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ArgumentsItem } from "~/types/appData";
import s from "./ArrayArguments.module.less";
import HtmlSuffix from "../HtmlSuffix";

interface Props {
  typeArguments: ArgumentsItem;
  htmlInput?: boolean;
  flexible: boolean;
  describe?: string;
  onChange: (data: ArgumentsItem) => void;
}

interface anyObj {
  [keys: string]: any;
}

const ArrayArguments: React.FC<Props> = ({
  typeArguments,
  flexible,
  onChange,
  htmlInput,
  describe
}) => {
  const [argumentsState, setArgumentsState] = useState<ArgumentsItem>();
  useEffect(() => {
    setArgumentsState(typeArguments);
  }, [typeArguments]);

  const onChangeValue = useCallback(
    (index: number) => (e: any) => {
      const result: anyObj = { ...argumentsState };
      result.data[index] = e.target.value;
      if (onChange instanceof Function) {
        onChange(result as ArgumentsItem);
      }
      setArgumentsState(result as ArgumentsItem);
    },
    [argumentsState, onChange]
  );

  const onAddKey = useCallback(() => {
    const result: anyObj = { ...argumentsState };
    if (!Array.isArray(result.data)) {
      result.data = []
    }

    result.data.push(undefined)
    
    if (onChange instanceof Function) {
      onChange(result as ArgumentsItem);
    }
    setArgumentsState(result as ArgumentsItem);
  }, [argumentsState, onChange]);

  const onMinus = useCallback((index: number) => () => {
    const result: anyObj = { ...argumentsState };
    result.data = result.data.filter((_: any,ind:number) => (ind !== index))
    if (onChange instanceof Function) {
      onChange(result as ArgumentsItem);
    }
    setArgumentsState(result as ArgumentsItem);
  }, [argumentsState, onChange]);

  const data: any = argumentsState?.data || [];
  return (
    <>
      {true ? (
        <Row className={s.toolbar} gutter={4}>
          <Col span={4}>
            <Button onClick={onAddKey} icon={<PlusOutlined  />}>增加</Button>
          </Col>
        </Row>
      ) : null}
      {data.map((item: any, index: number) => (
        <Row className={s.row} gutter={4} key={index}>
          <Col span={22}>
            <Input
              onChange={onChangeValue(index)}
              prefix={<div className={s.prefix}>{index}</div>}
              suffix={htmlInput ? <HtmlSuffix /> : null}
              placeholder={`请输入值${describe || ''}`}
              type="text"
              value={item}
            />
          </Col>
          <Col span={2} className={s.btn}>
            {true ? (
              <Button size="small" onClick={onMinus(index)} icon={<MinusOutlined />} />
            ) : null}
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ArrayArguments;
