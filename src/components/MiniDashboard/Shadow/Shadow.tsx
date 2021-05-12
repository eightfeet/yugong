import {
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Row, Col, Radio, Button, Switch } from "antd";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Color from "../Color";
import NumberInput from "../NumberInput";
import UnitInput from "../UnitInput";
import s from "./Shadow.module.scss";

interface TextShadow {
  hiddenItem?: boolean;
  shiftRight?: number;
  shiftDown?: number;
  blur?: number;
  color?: string;
}

interface BoxShadow extends TextShadow {
  hiddenItem?: any;
  spread?: number;
  inset?: boolean;
}

interface Props {
  unit?: string;
  onChange?: (data: {
    type: "boxShadow" | "textShadow";
    values: BoxShadow[];
  }) => void;
  defaultValue?: {
    boxShadowList?: BoxShadow[];
    textShadowList?: TextShadow[];
  };
}

const Shadow: React.FC<Props> = ({ unit, onChange, defaultValue }) => {
  const [shadowType, setShadowType] = useState<"text" | "box">("box");
  const [textShadowList, setTextShadowList] = useState<TextShadow[]>([]);
  const [boxShadowList, setBoxShadowList] = useState<BoxShadow[]>([]);
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  // init DefaultData
  useEffect(() => {
    let textShadowList = [...(defaultValue?.textShadowList || [])];
    let boxShadowList = [...(defaultValue?.boxShadowList || [])];

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
  }, [defaultValue?.boxShadowList, defaultValue?.textShadowList, moduleId]);

  useEffect(() => {
    setShadowType("box");
  }, [moduleId]);

  const onChangeShadowTab = useCallback((e) => {
    setShadowType(e.target.value);
  }, []);

  const onChangeShadow = useCallback(
    (type: "box" | "text", values) => {
      if (onChange instanceof Function) {
        if (type === "text") {
          onChange({ type: "textShadow", values });
        }
        if (type === "box") {
          onChange({ type: "boxShadow", values });
        }
      }
    },
    [onChange]
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
    (type, i) => () => {
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
    (type, i) => (res: any) => {
      if (type === "box") {
        boxShadowList[i].color =
          res.value === "inherit"
            ? "rgba(0,0,0,1)"
            : `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
      if (type === "text") {
        textShadowList[i].color =
          res.value === "inherit"
            ? "rgba(0,0,0,1)"
            : `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
        setBoxShadowList(textShadowList);
        onChangeShadow(type, textShadowList);
      }
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeInset = useCallback(
    (type, i) => (value: boolean) => {
      if (type === "box") {
        boxShadowList[i].inset = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
    },
    [boxShadowList, onChangeShadow]
  );

  const onChangeshiftRight = useCallback(
    (type, i) => (value: any) => {
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
    (type, i) => (value: any) => {
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
    (type, i) => (value: any) => {
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
    (type, i) => (value: any) => {
      if (type === "box") {
        boxShadowList[i].spread = value;
        setBoxShadowList(boxShadowList);
        onChangeShadow(type, boxShadowList);
      }
    },
    [boxShadowList, onChangeShadow]
  );

  const onToggleShow = useCallback(
    (index: number, type: "text" | "box") => () => {
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

  const renderShadow = (type: "text" | "box") => {
    let data: BoxShadow[] = type === "text" ? textShadowList : boxShadowList;
    return (
      <>
        {data.map((item, i) => (
          <div key={i}>
            <div className={s.divide}>
              <div className={s.title}>投影{i + 1}</div>
              <div className={s.menu}>
                <Button
                  size="small"
                  icon={<MinusOutlined onClick={onMinus(shadowType, i)} />}
                />
                &nbsp;&nbsp;
                <Button
                  size="small"
                  icon={
                    item.hiddenItem !== true ? (
                      <DownOutlined onClick={onToggleShow(i, type)} />
                    ) : (
                      <RightOutlined onClick={onToggleShow(i, type)} />
                    )
                  }
                />
              </div>
            </div>
            <div className={classNames({ [s.hidden]: item.hiddenItem })}>
              <Row className={s.row}>
                <Col span={12}>
                  <Color
                    label="投影颜色"
                    onChange={onChangeColor(type, i)}
                    defaultColor={item.color}
                  />
                </Col>
                <Col span={12}>
                  {type !== "text" ? (
                    <Row>
                      <Col span={12}></Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <Switch
                          checkedChildren="内阴影"
                          unCheckedChildren="内阴影"
                          defaultChecked={item.inset}
                          onChange={onChangeInset(type, i)}
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Col>
              </Row>
              <Row className={s.row}>
                <Col span={12}>
                  <UnitInput
                    label="横向偏移"
                    min={-1000}
                    max={1000}
                    defaultValue={item.shiftRight as any}
                    onChange={onChangeshiftRight(type, i)}
                  />
                </Col>
                <Col span={12}>
                  <UnitInput
                    label="纵向偏移"
                    min={-1000}
                    max={1000}
                    defaultValue={item.shiftDown as any}
                    onChange={onChangeshiftRight(type, i)}
                  />
                </Col>
              </Row>
              <Row className={s.row}>
                <Col span={12}>
                  <UnitInput
                    label="模糊"
                    min={-1000}
                    max={1000}
                    defaultValue={item.blur as any}
                    onChange={onChangeBlur(type, i)}
                  />
                </Col>
                <Col span={12}>
                  {type !== "text" ? (
                    <UnitInput
                      label="扩展"
                      min={-1000}
                      max={1000}
                      defaultValue={item.spread as any}
                      onChange={onChangeSpread(type, i)}
                    />
                  ) : null}
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </>
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
