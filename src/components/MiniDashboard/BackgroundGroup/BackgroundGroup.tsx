import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  BackgroundGroupListTypesOfStyleItems,
  BackgroundGroupTypesOfStyleItems,
} from "~/types/appData";
import BackgroundItem from "./BackgroundItem";
import s from "./BackgroundGroup.module.less";
import Color from "../Color";

interface Props {
  updateKey: string;
  onChange: (data: BackgroundGroupTypesOfStyleItems) => void;
  defaultData: BackgroundGroupTypesOfStyleItems;
}

const Backgroundgroup: React.FC<Props> = ({ defaultData, onChange }) => {
  const [backgroundList, setBackgroundList] = useState<
    BackgroundGroupListTypesOfStyleItems[] | undefined
  >(defaultData.backgroundList);
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    defaultData.backgroundColor
  );

  useEffect(() => {
    setBackgroundList(defaultData.backgroundList);
    setBackgroundColor(defaultData.backgroundColor);
  }, [defaultData])

  const onPlus = useCallback(() => {
    const data = [...(backgroundList || []), {}];
    setBackgroundList(data);
    onChange({
      backgroundList: data,
      backgroundColor: backgroundColor,
    });
  }, [backgroundColor, backgroundList, onChange]);

  const onMinus = useCallback(
    (index: number) =>  {
      const data = backgroundList?.filter((_, i) => index !== i) || [];
      setBackgroundList(data);
      onChange({
        backgroundList: data,
        backgroundColor: backgroundColor,
      });
    },
    [backgroundColor, backgroundList, onChange]
  );

  const onChangeItem = useCallback(
    (index: number) => (item: BackgroundGroupListTypesOfStyleItems) => {
      const oprateBackgroundList = [...(backgroundList || [])];
      oprateBackgroundList[index] = item;
      setBackgroundList(oprateBackgroundList);
      onChange({
        backgroundList: oprateBackgroundList,
        backgroundColor: backgroundColor,
      });
    },
    [backgroundColor, backgroundList, onChange]
  );

  const onChangeBackgroundColor = useCallback((result) => {
    const color = result.value ? `rgba(${result.value.rgb.r}, ${result.value.rgb.g}, ${result.value.rgb.b}, ${result.value.rgb.a})` : undefined;
    setBackgroundColor(color);
    
    onChange({
        backgroundList: backgroundList,
        backgroundColor: color,
      });
  }, [backgroundList, onChange]);

  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="背景颜色"
            onChange={onChangeBackgroundColor}
            defaultColor={backgroundColor}
          />
        </Col>
        <Col span={12} className={s.add}>
          <Button size="small" icon={<PlusOutlined />} onClick={onPlus}>
            添加其他背景属性
          </Button>
        </Col>
      </Row>
      {backgroundList?.map((data, index) => (
        <div key={index} className={s.backgroundwrap}>
          <div className={s.divide}>
            <div className={s.title}>背景{index + 1}</div>
            <div className={s.menu}>
              <Button
                size="small"
                onClick={() => onMinus(index)}
                icon={<MinusOutlined  />}
              >
                删除
              </Button>
            </div>
          </div>
          <div className={s.backgrounditem}>
            <BackgroundItem defaultData={data} onChange={onChangeItem(index)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Backgroundgroup;
