import { LinkOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Spacing.module.less";

type SpaceType = "padding" | "margin";

interface Props {
  unit?: string;
  onChange: (type: SpaceType, values: { [keys: string]: any }) => void;
  margin?: any[];
  padding?: any[];
}

const defaultVal = [undefined, undefined, undefined, undefined];

const Spacing: React.FC<Props> = ({ unit, onChange, margin, padding }) => {
  const [spaceType, setSpaceType] = useState<"margin" | "padding">("padding");

  const [inValues, setInValues] = useState<any[]>(defaultVal);

  const [outValues, setOutValues] = useState<any[]>(defaultVal);

  const [locked, setLocked] = useState<boolean>();

  useEffect(() => {
    setInValues(padding || defaultVal);
  }, [padding]);
  useEffect(() => {
    setOutValues(margin || defaultVal);
  }, [margin]);

  const onChangeValue = useCallback(
    (index) => (e: any) => {
      if (spaceType === "padding") {
        const values: any[] = [...inValues];
        values[index] = e.target.value;
        if (locked === true) {
          values[1] = values[2] = values[3] = values[0] = e.target.value;
        }
        setInValues(values);
        onChange(spaceType, values);
      }
      if (spaceType === "margin") {
        const values = [...outValues];
        values[index] = e.target.value;
        if (locked === true) {
          values[1] = values[2] = values[3] = values[0]= e.target.value;
        }
        setOutValues(values);
        onChange(spaceType, values);
      }
    },
    [spaceType, inValues, locked, onChange, outValues]
  );

  const getValue = useCallback(
    (type = spaceType) => {
      let values: any[] = [];
      if (type === "padding") {
        values = inValues;
      }
      if (type === "margin") {
        values = outValues;
      }
      return values;
    },
    [inValues, outValues, spaceType]
  );

  const onChangeType = useCallback(
    (type: SpaceType) => (e: any) => {
      e.stopPropagation();
      setSpaceType(type);
      const values = getValue(type);
      const unEqu = values.filter(item => values[0] !== item);
      if (!!unEqu.length) {
        setLocked(false)
      } else {
        setLocked(true)
      }
    },
    [getValue, setLocked]
  );

  const onToggleLocker = useCallback(() => {
    setLocked(!locked);
  }, [locked]);

  return (
    <div className={s.wrap}>
      <Row gutter={4}>
        <Col span={3} className={s.right}>
          边距
        </Col>
        <Col span={10}>
          <div
            className={s.boxA}
            onClick={onChangeType("margin")}
            style={
              spaceType === "margin"
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#eee" }
            }
          >
            <div
              className={s.boxB}
              onClick={onChangeType("padding")}
              style={
                spaceType === "padding"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#eee" }
              }
            />
          </div>
        </Col>
        <Col span={2} className={s.middle}>
          <LinkOutlined
            onClick={onToggleLocker}
            className={locked ? s.locked : undefined}
          />
        </Col>
        <Col span={9}>
          {getValue().map((item, index) => (
            <Row gutter={4} className={s.row} key={`${spaceType}${index}`}>
              <Col span={6} className={s.label}>
                {index === 0 ? "上" : null}
                {index === 1 ? "右" : null}
                {index === 2 ? "下" : null}
                {index === 3 ? "左" : null}
              </Col>
              <Col span={14}>
                <Input
                  type="text"
                  disabled={!spaceType}
                  value={item}
                  onChange={onChangeValue(index)}
                />
              </Col>
              <Col span={4} className={s.unit}>
                {isNaN(parseInt(item, 10)) ? "" : unit}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Spacing;
