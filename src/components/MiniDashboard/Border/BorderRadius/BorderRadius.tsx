import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, InputNumber } from "antd";
import s from "./BorderRadius.module.less";
import {
  LinkOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import UnitInput from "../../UnitInput";

interface Props {
  defaultData?: (number | undefined)[];
  onChange?: (data: (number | undefined)[]) => void;
  unit?: string;
}

const BorderRadius: React.FC<Props> = ({ unit, onChange, defaultData, ...other }) => {
  const [locked, setLocked] = useState(false);
  const [borderRadius, setBorderRadius] = useState<(number | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => {
    if (Array.isArray(defaultData)) {
      setBorderRadius([...defaultData]);
    }
  }, [defaultData]);

  const toggleLocked = useCallback(() => {
    let data = [...borderRadius];
    if (!locked) {
      data = [
        data[0],
        data[0],
        data[0],
        data[0],
      ]
      setBorderRadius(data);
    }
    setLocked(!locked);
    if (onChange instanceof Function) {
      onChange(data)
    }
  }, [borderRadius, locked, onChange]);

  const onChangeData = useCallback(
    (index: number) => (e: any) => {
      if (locked) {
        borderRadius[0] = borderRadius[1] = borderRadius[2] = borderRadius[3] = e;
      } else {
        borderRadius[index] = e;
      }
      const data = [...borderRadius];
      setBorderRadius(data);
      if (onChange instanceof Function) {
        onChange(data)
      }
    },
    [borderRadius, locked, onChange]
  );

  return (
    <Row className={s.row}>
      <Col span={11}>
        <Row>
          <Col span={4} className={classNames(s.icon, s.alignright)}>
            <RadiusUpleftOutlined />
            &nbsp;
          </Col>
          <Col span={20}>
            <UnitInput 
              span={{wrapper:24}}
              defaultValue={borderRadius[0] as any}
              onChange={onChangeData(0)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={classNames(s.icon, s.alignright)}>
            <RadiusBottomleftOutlined />
            &nbsp;
          </Col>
          <Col span={20}>
            <UnitInput 
              span={{wrapper:24}}
              defaultValue={borderRadius[3] as any}
              onChange={onChangeData(3)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={2} className={s.middle}>
        <LinkOutlined
          onClick={toggleLocked}
          className={locked ? s.locked : undefined}
        />
      </Col>
      <Col span={11}>
        <Row className={s.row}>
          <Col span={20}>
            <UnitInput 
              span={{wrapper:24}}
              defaultValue={borderRadius[1] as any}
              onChange={onChangeData(1)}
            />
          </Col>
          <Col span={4} className={s.icon}>
            &nbsp;
            <RadiusUprightOutlined />
          </Col>
        </Row>
        <Row className={s.row}>
          <Col span={20}>
            <UnitInput 
              span={{wrapper:24}}
              defaultValue={borderRadius[2] as any}
              onChange={onChangeData(2)}
            />
          </Col>
          <Col span={4} className={s.icon}>
            &nbsp;
            <RadiusBottomrightOutlined />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BorderRadius;
