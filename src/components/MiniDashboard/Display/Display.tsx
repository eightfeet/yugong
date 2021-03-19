import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import Select from './../Select'
import s from "./Display.module.scss";
import NumberInput from "../NumberInput";
import { DisplayTypesOfStyleItems } from "types/appData";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Spacing from "../Spacing";

interface Props {
  onChange: (result: DisplayTypesOfStyleItems) => void;
  defaultData?: DisplayTypesOfStyleItems;
  unit?: string;
}

type ChangeType =
  | "width"
  | "height"
  | "zIndex"
  | "position"
  | "left"
  | "right"
  | "top"
  | "bottom";

const Display: React.FC<Props> = ({onChange, defaultData, unit }) => {

  const [displayData, setDisplayData] = useState<DisplayTypesOfStyleItems>({});
  const moduleId = useSelector((state:RootState) => state.activationItem.moduleId)

  const { width, height, zIndex, position, left, right, top, bottom } = displayData;

  useEffect(() => {
    setDisplayData({...(defaultData)})
  }, [defaultData, moduleId])

  const onChangeDisplay = useCallback(
    (type: ChangeType) => (data: any) => {
      displayData[type] = data;
      if (type === 'position' && data === 'relative') {
        delete displayData.left;
        delete displayData.right;
        delete displayData.top;
        delete displayData.bottom;
      }
      setDisplayData({...displayData});
      if (onChange instanceof Function) {
        onChange(displayData);
      }
    },
    [displayData, onChange]
  );

  return (<>
    <Row className={s.row}>
      <Col span={12}>
        <NumberInput label="宽度" unit={unit} min={1} max={100000} value={width} onChange={onChangeDisplay("width")} />
      </Col>
      <Col span={12}>
        <NumberInput label="高度" unit={unit} min={1} max={100000} value={height} onChange={onChangeDisplay("height")} />
      </Col>
    </Row>
    <Row className={s.row}>
      <Col span={12}>
            <Select label="定位" value={position} optionsData={{absolute: '绝对', relative: '相对'}} onChange={onChangeDisplay("position")} />
      </Col>
      <Col span={12}>
            <NumberInput label="层级" min={1} max={100000} value={zIndex} onChange={onChangeDisplay("zIndex")}/>
      </Col>
    </Row>
    {position === 'absolute' ? <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="左定位" unit={unit} min={-100000} max={100000} value={left} onChange={onChangeDisplay("left")}/>
      </Col>
      <Col span={12}>
            <NumberInput label="右定位" unit={unit} min={-100000} max={100000} value={right} onChange={onChangeDisplay("right")}/>
      </Col>
    </Row> : null}
    {position === 'absolute' ? <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="上定位" unit={unit} min={-100000} max={100000} value={top} onChange={onChangeDisplay("top")}/>
      </Col>
      <Col span={12}>
            <NumberInput label="下定位" unit={unit} min={-100000} max={100000} value={bottom} onChange={onChangeDisplay("bottom")}/>
      </Col>
    </Row> : null}
    <Spacing unit={unit} onChange={(type, value) => console.log(type, value)} />
    </>
  );
};

export default Display;
