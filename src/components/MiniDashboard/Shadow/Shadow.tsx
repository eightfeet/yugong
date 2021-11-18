import {
  PlusOutlined,
} from "@ant-design/icons";
import { Row, Col, Radio, Button } from "antd";
import arrayMove from "array-move";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { StyleContext, StyleType } from "~/context/StyleContext";
import { RootState } from "~/redux/store";
import { UnitType } from "~/types/appData";
import s from "./Shadow.module.scss";
import ShadowListHoc from "./ShadowListHoc";

interface TextShadow {
  hiddenItem?: boolean;
  shiftRight?: UnitType;
  shiftDown?: UnitType;
  blur?: UnitType;
  color?: string;
}

export interface BoxShadow extends TextShadow {
  hiddenItem?: any;
  spread?: UnitType;
  inset?: boolean;
}

interface Props {}

const Shadow: React.FC<Props> = () => {
  const context = useContext(StyleContext);
  const [shadowType, setShadowType] = useState<"text" | "box">("box");
  const [textShadowList, setTextShadowList] = useState<TextShadow[]>([]);
  const [boxShadowList, setBoxShadowList] = useState<BoxShadow[]>([]);
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  // init DefaultData
  useEffect(() => {
    let textShadowList: TextShadow[] = context.getDefaultData?.("textShadow") || [];
    let boxShadowList: BoxShadow[] = context.getDefaultData?.("boxShadow") || [];

    textShadowList = textShadowList.map((item) => {
      item.hiddenItem = false;
      return item;
    });

    boxShadowList = boxShadowList.map((item) => {
      item.hiddenItem = false;
      return item;
    });

    setTextShadowList(textShadowList);
    setBoxShadowList(boxShadowList);
  }, [context, moduleId]);

  useEffect(() => {
    setShadowType("box");
  }, [moduleId]);

  const onChangeShadowTab = useCallback((e) => {
    setShadowType(e.target.value);
  }, []);

  const onChangeShadow = useCallback(
    (type: "box" | "text", values) => {
      if (context.onChange instanceof Function) {
        context.onChange?.(values, `${type}Shadow` as StyleType)
      }
    },
    [context]
  );

  const onPlus = useCallback(
    (type) => () => {
      if (type === "text") {
        const data = [...textShadowList, { hiddenItem: false }];
        setTextShadowList(data);
        onChangeShadow(type, data);
      }
      if (type === "box") {
        const data = [...boxShadowList, { hiddenItem: false }];
        setBoxShadowList(data);
        onChangeShadow(type, data);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onMinus = useCallback(
    (type, i) => {
      if (type === "text") {
        const data = textShadowList.filter((item, index) => index !== i);
        setTextShadowList(data);
        onChangeShadow(type, data);
      }
      if (type === "box") {
        const data = boxShadowList.filter((item, index) => index !== i);
        setBoxShadowList(data);
        onChangeShadow(type, data);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeColor = useCallback(
    (type, i, res: any) => {
      if (type === "box") {
        boxShadowList[i].color =
          res.value &&
          `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
      if (type === "text") {
        textShadowList[i].color =
          res.value &&
          `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
        setBoxShadowList(textShadowList);
        onChangeShadow(type, textShadowList);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeInset = useCallback(
    (type, i, value: boolean) => {
      if (type === "box") {
        boxShadowList[i].inset = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
    },
    [boxShadowList, onChangeShadow]
  );

  const onChangeshiftRight = useCallback(
    (type, i, value: any) => {
      if (type === "box") {
        boxShadowList[i].shiftRight = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
      if (type === "text") {
        textShadowList[i].shiftRight = value;
        setTextShadowList(textShadowList);
        onChangeShadow(type, textShadowList);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeshiftDown = useCallback(
    (type, i, value: any) => {
      if (type === "box") {
        boxShadowList[i].shiftDown = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
      if (type === "text") {
        textShadowList[i].shiftDown = value;
        setTextShadowList(textShadowList);
        onChangeShadow(type, textShadowList);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeBlur = useCallback(
    (type, i, value: any) => {
      if (type === "box") {
        boxShadowList[i].blur = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
      if (type === "text") {
        textShadowList[i].blur = value;
        setTextShadowList(textShadowList);
        onChangeShadow(type, textShadowList);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeSpread = useCallback(
    (type, i, value: any) => {
      if (type === "box") {
        boxShadowList[i].spread = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
    },
    [boxShadowList, onChangeShadow]
  );

  const onToggleShow = useCallback(
    (index: number, type: "text" | "box") => {
      if (type === "text") {
        textShadowList[index].hiddenItem = !!!textShadowList[index].hiddenItem;
        setTextShadowList([...textShadowList]);
      }
      if (type === "box") {
        boxShadowList[index].hiddenItem = !!!boxShadowList[index].hiddenItem;
        setBoxShadowList([...boxShadowList]);
      }
    },
    [boxShadowList, textShadowList]
  );

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(
    ({oldIndex, newIndex}, type) => {
      let data: BoxShadow[] = [];
      if (type === "text") {
        data = [...textShadowList];
        data = arrayMove(data, oldIndex, newIndex);
        setTextShadowList(data);
      }
      if (type === "box") {
        data = [...boxShadowList];
        data = arrayMove(data, oldIndex, newIndex);
        setBoxShadowList(data);
      }
      onChangeShadow(type, data);
    },
    [boxShadowList, onChangeShadow, textShadowList],
  )

  const renderShadow = (type: "text" | "box") => {
    let data: BoxShadow[] = type === "text" ? textShadowList : boxShadowList;
    return (
        <ShadowListHoc
            useDragHandle
            data={data}
            type={type}
            onSortEnd={({oldIndex, newIndex}) => onSortEnd({oldIndex, newIndex}, type)}
            onMinus={onMinus}
            onToggleShow={onToggleShow}
            onChangeColor={onChangeColor}
            onChangeInset={onChangeInset}
            onChangeshiftRight={onChangeshiftRight}
            onChangeshiftDown={onChangeshiftDown}
            onChangeBlur={onChangeBlur}
            onChangeSpread={onChangeSpread}
          />
    );
  };

  return (
    <>
      <Row className={s.row}>
        <Col span={24}>
          <Radio.Group
            value={shadowType}
            className={s.tab}
            onChange={onChangeShadowTab}
          >
            <Radio.Button value="box">投影</Radio.Button>
            <Radio.Button value="text">文字投影</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={onPlus(shadowType)}
          />
        </Col>
      </Row>
      {renderShadow(shadowType)}
    </>
  );
};

export default Shadow;
