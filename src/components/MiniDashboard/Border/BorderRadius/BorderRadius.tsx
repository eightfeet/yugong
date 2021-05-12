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
import { UnitType } from "~/types/appData";

interface Props {
  defaultData?: (UnitType | undefined)[];
  onChange?: (data: (UnitType | undefined)[]) => void;
  unit?: string;
}

const BorderRadius: React.FC<Props> = ({
  unit,
  onChange,
  defaultData,
  ...other
}) => {
  const [locked, setLocked] = useState(false);

  const [topLeft, setTopLeft] = useState<UnitType>();
  const [topRight, setTopRight] = useState<UnitType>();
  const [bottomRight, setBottomRight] = useState<UnitType>();
  const [bottomLeft, setBottomLeft] = useState<UnitType>();

  useEffect(() => {
    if (Array.isArray(defaultData)) {
      setTopLeft(defaultData[0]);
      setTopRight(defaultData[1]);
      setBottomRight(defaultData[2]);
      setBottomLeft(defaultData[3]);
    }
  }, [defaultData]);

  const toggleLocked = useCallback(() => {
    if (!locked) {
      setTopLeft(topLeft);
      setTopRight(topLeft);
      setBottomRight(topLeft);
      setBottomLeft(topLeft);
    }
    setLocked(!locked);
    if (onChange instanceof Function) {
      onChange([topLeft, topLeft, topLeft, topLeft]);
    }
  }, [locked, onChange, topLeft]);

  const onChangeAll = useCallback((value: UnitType) => {
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
  }, []);

  const onChangeData = useCallback(
    (index: number) => (value: UnitType) => {
      if (locked) {
        onChangeAll(value);
        return;
      }
      switch (index) {
        case 0:
          setTopLeft(value);
          break;
        case 1:
          setTopRight(value);
          break;
        case 2:
          setBottomRight(value);
          break;
        case 3:
          setBottomLeft(value);
          break;
        default:
          break;
      }
    },
    [locked, onChangeAll]
  );

  useEffect(() => {
    if (onChange instanceof Function) {
      // onChange([topLeft, topRight, bottomRight, bottomLeft])
    }
  }, [topLeft, topRight, bottomRight, bottomLeft, onChange])

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
              span={{ wrapper: 24 }}
              defaultValue={topLeft}
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
              span={{ wrapper: 24 }}
              defaultValue={bottomLeft}
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
              span={{ wrapper: 24 }}
              defaultValue={topRight}
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
              span={{ wrapper: 24 }}
              defaultValue={bottomRight}
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
