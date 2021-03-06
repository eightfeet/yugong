import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import s from "./QuadrangularSelect.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { PictureOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { UnitType } from "~/types/appData";

interface Props {
  label: string;
  unit?: string;
  defaultData: (UnitType | undefined)[];
  onChange: (data:UnitType[]) => void;
}

const simpPosition: {name: string; value: UnitType[]}[] = [
  {
    name: "左上",
    value: [[0, '%'], [0, '%']],
  },
  {
    name: "中上",
    value: [[50, '%'], [0, '%']],
  },
  {
    name: "右上",
    value: [[100, '%'], [0, '%']],
  },
  {
    name: "左中",
    value: [[0, '%'], [50, '%']],
  },
  {
    name: "中间",
    value: [[50, '%'], [50, '%']],
  },
  {
    name: "右中",
    value: [[100, '%'], [50, '%']],
  },
  {
    name: "左下",
    value: [[0, '%'], [100, '%']],
  },
  {
    name: "中下",
    value: [[50, '%'], [100, '%']],
  },
  {
    name: "右下",
    value: [[100, '%'], [100, '%']],
  },
];

const QuadrangularSelect: React.FC<Props> = ({ label, defaultData, onChange }) => {
  const [, setselected] = useState<(UnitType | undefined)[]>([]);
  const [index, setIndex] = useState<number>()

  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  // 选中
  const checkSelect = useCallback(
    (selected) => {
      for (let index = 0; index < simpPosition.length; index++) {
        const element = simpPosition[index];
        if (selected.join('') === element.value.join('')) {
          setIndex(index);
          break;
        }
        setIndex(undefined)
      }
    },
    [],
  )

  const onClickPict = useCallback((index: number) => {
    // setselected(simpPosition[index].value);
    checkSelect(simpPosition[index].value);
    if (onChange instanceof Function) {
      onChange(simpPosition[index].value)
    }
  }, [checkSelect, onChange]);

  // 初始化
  useEffect(() => {
    setselected(defaultData);
    checkSelect(defaultData);
  }, [moduleId, defaultData, checkSelect])

  return (
    <Row className={s.row} gutter={4}>
      <Col className={s.label} span={7}>
        {label || ""}
      </Col>
      <Col span={14}>
        <div className={s.quad}>{
          simpPosition.map((item, i) => <PictureOutlined className={classNames({
            [s.selected]: i === index
          })} onClick={() => onClickPict(i)} key={item.name} />)
        }</div>
      </Col>
    </Row>
  );
};

export default QuadrangularSelect;
