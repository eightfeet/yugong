import { CodeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row } from "antd";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { BackgroundGroupListTypesOfStyleItems } from "~/types/appData";
import s from "./BackgroundGroup.module.less";
import arrayMove from "array-move";
import Color from "~/components/MiniDashboard/Color";
import BackgroundListHoc from "~/components/MiniDashboard/BackgroundGroup/BackgroundListHoc";
import { PagesContext } from "../../../PagesContext";
import JsonDataEditor from "~/components/MiniDashboard/JsonDataEditor";

interface Props {
  updateKey?: string;
}

const Backgroundgroup: React.FC<Props> = () => {
  const context = useContext(PagesContext);
  const [backgroundList, setBackgroundList] = useState<
    BackgroundGroupListTypesOfStyleItems[] | undefined
  >();
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>();
  const [showCode, setShowCode] = useState(false);
  
  const onChange = useCallback(
    ({backgroundColor, backgroundList}) => {
      context.onChangeCurrentPageBackground?.({
        backgroundColor, backgroundList
      })
      setShowCode(false);
    },
    [context],
  )

  useEffect(() => {
    const defaultData = context?.currentPage?.backgroundGroup || {};
    setBackgroundList(defaultData.backgroundList);
    setBackgroundColor(defaultData.backgroundColor);
  }, [context]);

  const onPlus = useCallback(() => {
    const data = [...(backgroundList || []), {}];
    setBackgroundList(data);
    context.onChangeCurrentPageBackground?.(
      {
        backgroundList: data,
        backgroundColor: backgroundColor,
      }
    );
  }, [backgroundColor, backgroundList, context]);

  const onMinus = useCallback(
    (index: number) => {
      const data = backgroundList?.filter((_, i) => index !== i) || [];
      setBackgroundList(data);
      context.onChangeCurrentPageBackground?.(
        {
          backgroundList: data,
          backgroundColor: backgroundColor,
        }
      );
    },
    [backgroundColor, backgroundList, context]
  );

  const onChangeItem = useCallback(
    (index: number, item: BackgroundGroupListTypesOfStyleItems) => {
      const oprateBackgroundList = [...(backgroundList || [])];
      oprateBackgroundList[index] = item;
      setBackgroundList(oprateBackgroundList);
      context.onChangeCurrentPageBackground?.(
        {
          backgroundList: oprateBackgroundList,
          backgroundColor: backgroundColor,
        }
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

      context.onChangeCurrentPageBackground?.(
        {
          backgroundList: backgroundList,
          backgroundColor: color,
        }
      );
    },
    [backgroundList, context]
  );

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const items = [...(backgroundList || [])];
      const result = arrayMove(items, oldIndex, newIndex);

      context.onChangeCurrentPageBackground?.(
        {
          backgroundList: result,
          backgroundColor: backgroundColor,
        }
      );
    },
    [backgroundColor, backgroundList, context]
  );
  return (
    <>
      <PageHeader className={s.header} title="背景设置" extra={<CodeOutlined onClick={() => setShowCode(true)} />} />
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
      <JsonDataEditor data={context?.currentPage?.backgroundGroup || {}} okText="确定" cancelText="取消" visible={showCode} onConfirm={onChange} onCancel={() => setShowCode(false)} title="数据编辑" />

    </>
  );
};

export default Backgroundgroup;
