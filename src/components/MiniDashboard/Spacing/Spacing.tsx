import { LinkOutlined } from "@ant-design/icons";
import { Row, Col, Divider } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Unitinput from "../UnitInput/UnitInput";
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
    (index: number) => (value: [number | string, string]) => {
      if (spaceType === "padding") {
        const values: any[] = [...inValues];
        values[index] = value;
        if (locked === true) {
          values[1] = values[2] = values[3] = values[0] = value;
        }
        setInValues(values);
        onChange(spaceType, values);
      }
      if (spaceType === "margin") {
        const values = [...outValues];
        values[index] = value;
        if (locked === true) {
          values[1] = values[2] = values[3] = values[0] = value;
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
      const unEqu = values.filter((item) => values[0] !== item);
      if (!!unEqu.length) {
        setLocked(false);
      } else {
        setLocked(true);
      }
    },
    [getValue, setLocked]
  );

  const onToggleLocker = useCallback(() => {
    setLocked(!locked);
  }, [locked]);

  const setLabel = useCallback((index: number) => {
    switch (index) {
      case 0:
        return "上";
      case 1:
        return "右";
      case 2:
        return "下";
      case 3:
        return "左";
      default:
        return "";
    }
  }, []);

  return (
    <>
      <Divider orientation="left"><span className={s.divide}>边距</span></Divider>
      <Row gutter={4}>
        <Col span={9}>
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
        <Col span={13}>
          {getValue().map((item, index) => {
            return <Unitinput
              span={{ label: 3, wrapper: 21 }}
              key={`${spaceType}${index}`}
              className={s.unititem}
              label={setLabel(index)}
              defaultValue={item}
              onChange={onChangeValue(index)}
            />;
          })}
        </Col>
      </Row>
    </>
  );
};

export default Spacing;