import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  BackgroundGroupListTypesOfStyleItems,
  BackgroundGroupTypesOfStyleItems,
} from "~/types/appData";
import s from "./BackgroundGroup.module.less";
import Color from "../Color";
import BackgroundListHoc from "./BackgroundListHoc";
import arrayMove from "array-move";

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
    (index: number, item: BackgroundGroupListTypesOfStyleItems) => {
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

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(
    ({oldIndex, newIndex}) => {
      const items = [...(backgroundList || [])]
       const result = arrayMove(items, oldIndex, newIndex);
       console.log('result',result);
       
       onChange({
        backgroundList: result,
        backgroundColor: backgroundColor,
      });
    },
    [backgroundColor, backgroundList, onChange],
  )
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
      <BackgroundListHoc backgroundList={backgroundList} onChange={onChangeItem} onMinus={onMinus} onSortEnd={onSortEnd} useDragHandle  />
    </>
  );
};

export default Backgroundgroup;
