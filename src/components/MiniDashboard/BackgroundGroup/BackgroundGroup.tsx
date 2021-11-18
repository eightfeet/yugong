import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { BackgroundGroupListTypesOfStyleItems } from "~/types/appData";
import s from "./BackgroundGroup.module.less";
import Color from "../Color";
import BackgroundListHoc from "./BackgroundListHoc";
import arrayMove from "array-move";
import { StyleContext } from "~/context/StyleContext";

interface Props {
  updateKey?: string;
}

const Backgroundgroup: React.FC<Props> = () => {
  const context = useContext(StyleContext);

  const [backgroundList, setBackgroundList] = useState<
    BackgroundGroupListTypesOfStyleItems[] | undefined
  >();
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>();

  useEffect(() => {
    const defaultData = context.getDefaultData?.("backgroundGroup") || {};
    setBackgroundList(defaultData.backgroundList);
    setBackgroundColor(defaultData.backgroundColor);
  }, [context]);

  const onPlus = useCallback(() => {
    const data = [...(backgroundList || []), {}];
    setBackgroundList(data);
    context.onChange?.(
      {
        backgroundList: data,
        backgroundColor: backgroundColor,
      },
      "backgroundGroup"
    );
  }, [backgroundColor, backgroundList, context]);

  const onMinus = useCallback(
    (index: number) => {
      const data = backgroundList?.filter((_, i) => index !== i) || [];
      setBackgroundList(data);
      context.onChange?.(
        {
          backgroundList: data,
          backgroundColor: backgroundColor,
        },
        "backgroundGroup"
      );
    },
    [backgroundColor, backgroundList, context]
  );

  const onChangeItem = useCallback(
    (index: number, item: BackgroundGroupListTypesOfStyleItems) => {
      const oprateBackgroundList = [...(backgroundList || [])];
      oprateBackgroundList[index] = item;
      setBackgroundList(oprateBackgroundList);
      context.onChange?.(
        {
          backgroundList: oprateBackgroundList,
          backgroundColor: backgroundColor,
        },
        "backgroundGroup"
      );
    },
    [backgroundColor, backgroundList, context]
  );

  const onChangeBackgroundColor = useCallback(
    (result) => {
      const color = result.value
        ? `rgba(${result.value.rgb.r}, ${result.value.rgb.g}, ${result.value.rgb.b}, ${result.value.rgb.a})`
        : undefined;
      setBackgroundColor(color);

      context.onChange?.(
        {
          backgroundList: backgroundList,
          backgroundColor: color,
        },
        "backgroundGroup"
      );
    },
    [backgroundList, context]
  );

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const items = [...(backgroundList || [])];
      const result = arrayMove(items, oldIndex, newIndex);

      context.onChange?.(
        {
          backgroundList: result,
          backgroundColor: backgroundColor,
        },
        "backgroundGroup"
      );
    },
    [backgroundColor, backgroundList, context]
  );
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
      <BackgroundListHoc
        backgroundList={backgroundList}
        onChange={onChangeItem}
        onMinus={onMinus}
        onSortEnd={onSortEnd}
        useDragHandle
      />
    </>
  );
};

export default Backgroundgroup;
