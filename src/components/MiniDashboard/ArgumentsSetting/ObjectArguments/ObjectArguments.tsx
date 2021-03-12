import { Button, Col, Input, Row, message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ArgumentsItem } from "~/types/appData";
import s from "./ObjectArguments.module.less";

interface Props {
  typeArguments: ArgumentsItem;
  flexible: boolean;
  onChange: (data: ArgumentsItem) => void;
  describe?: string
}

interface anyObj {
  [keys: string]: any;
}

const ObjectArguments: React.FC<Props> = ({
  typeArguments,
  flexible,
  describe,
  onChange,
}) => {
  const [argumentsState, setArgumentsState] = useState<ArgumentsItem>();
  useEffect(() => {
    setArgumentsState(typeArguments);
  }, [typeArguments]);

  const addOption = useRef<any>(null);

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

  const onAddKey = useCallback(() => {
    const result: anyObj = { ...argumentsState };
    if (addOption.current) {
      const key = addOption.current.input.value;
      addOption.current.setState({value: null});
      if (!key) {
        const msg = `请输入属性名！`;
        console.error(msg);
        message.error(msg);
        return;
      }
      if (result.data[key] !== undefined) {
        const msg = `属性名${key}增加失败！当前对象已包含此属性`;
        console.error(msg);
        message.error(msg);
        return;
      }
      result.data[key] = null;
    }
    if (onChange instanceof Function) {
      onChange(result as ArgumentsItem);
    }
    setArgumentsState(result as ArgumentsItem);
  }, [argumentsState, onChange]);

  const onMinus = useCallback((type: string) => () => {
    const result: anyObj = { ...argumentsState };
    delete result.data[type]
    if (onChange instanceof Function) {
      onChange(result as ArgumentsItem);
    }
    setArgumentsState(result as ArgumentsItem);
  }, [argumentsState, onChange]);

  const data: any = argumentsState?.data || {};
  return (
    <>
      {flexible ? (
        <Row className={s.toolbar} gutter={4}>
          <Col span={4}>
            <div className={s.label}>新增属性</div>
          </Col>
          <Col span={16}>
            <Input ref={addOption} placeholder={describe} />
          </Col>
          <Col span={4}>
            <Button onClick={onAddKey} icon={<PlusOutlined  />}>确定</Button>
          </Col>
        </Row>
      ) : null}
      {Object.keys(data).map((key) => (
        <Row className={s.row} gutter={4} key={key}>
          <Col span={5}>
            <div className={s.label}>{key}</div>
          </Col>
          <Col span={17}>
            <Input
              onChange={onChangeValue(key)}
              placeholder="value"
              type="text"
              value={data[key]}
            />
          </Col>
          <Col span={2} className={s.btn}>
            {flexible ? (
              <Button size="small" onClick={onMinus(key)} icon={<MinusOutlined />} />
            ) : null}
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ObjectArguments;
