import { Row, Col, Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useState } from "react";
import {
  BackgroundGradientTypesOfStyleItems,
  BackgroundGroupListTypesOfStyleItems,
  BackgroundGroupTypesOfStyleItems,
  UnitType,
} from "~/types/appData";
import Color from "../../Color";
import GradientSlider from "../../GradientSlider";
import UnitInput from "../../UnitInput";
import Upload from "../../Upload";
import Select from "~/components/MiniDashboard/Select";
import s from "./BackgroundItem.module.less";
import QuadrangularSelect from "../../QuadrangularSelect";
import { ColorResult } from "react-color";

interface Props {
  onChange: (value: BackgroundGroupListTypesOfStyleItems) => void;
  defaultData: BackgroundGroupListTypesOfStyleItems;
}

const Backgrounditem: React.FC<Props> = ({ onChange, defaultData }) => {
  const [data, setData] = useState<BackgroundGroupListTypesOfStyleItems>({ ...defaultData });
  const {
    gradient,
    gradientDirections,
    imageUrl,
    positionX,
    positionY,
    sizeX,
    sizeY,
    repeat,
  } = data;
  // 确定当前类型
  const [imageType, setImageType] = useState(gradient ? "gradient" : "image");
  const onChangeTab = useCallback(
    (e: RadioChangeEvent) => {
      const operateData = { ...data };
      const type = e.target.value;
      if (type === "gradient") {
        delete operateData.imageUrl;
      }
      if (type === "image") {
        delete operateData.gradient;
        delete operateData.gradientDirections;
      }
      setImageType(e.target.value);
      setData(operateData);
      onChange(operateData);
    },
    [data, onChange]
  );

  const onChangeBackgroundImage = useCallback(
    (url) => {
      const operateData = { ...data };
      operateData.imageUrl = url;
      setData(operateData);
      onChange(operateData);
    },
    [data, onChange]
  );

  const onChangeGradient = useCallback(
    (result: BackgroundGradientTypesOfStyleItems) => {
      const operateData = { ...data };
      const { gradient, gradientDirections } = result || {};
      operateData.gradient = gradient;
      operateData.gradientDirections = gradientDirections;
      setData(operateData);
      onChange(operateData);
    },
    [data, onChange]
  );

  const onChangeRepeat = useCallback(
    (e) => {
      const operateData = { ...data };
      operateData.repeat = e;
      setData(operateData);
      onChange(operateData);
    },
    [data, onChange]
  );

  const onChangeUnitInput = useCallback(
    (key: "positionX" | "positionY" | "sizeX" | "sizeY") =>
      ([value, unit]: UnitType) => {
        const operateData = { ...data };
        operateData[key] = [value, (unit || '')];
        setData(operateData);
        onChange(operateData);
      },
    [data, onChange]
  );

  const onChangeQuickPosition = useCallback(
    ([positionX, positionY]) => {
      const operateData = { ...data };
      operateData.positionX = positionX;
      operateData.positionY = positionY;
      setData(operateData);
      onChange(operateData);
    },
    [data, onChange]
  );

  /**
   * 渐变渲染
   * @returns
   */
  const renderGradient = () => (
    <GradientSlider
      onChange={onChangeGradient}
      defaultData={{ gradient, gradientDirections }}
    />
  );

  /**
   * 图片渲染
   * @returns
   */
  const renderImage = () => (
    <Row className={s.row} style={{ marginBottom: "15px" }}>
      <Col span={12}>
        <Upload
          label="背景图片"
          onChange={onChangeBackgroundImage}
          defaultImg={imageUrl}
        />
      </Col>
    </Row>
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={24}>
          <Radio.Group
            defaultValue={imageType}
            className={s.tab}
            onChange={onChangeTab}
          >
            <Radio.Button value="image">图片背景</Radio.Button>
            <Radio.Button value="gradient">渐变背景</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {imageType === "image" ? renderImage() : null}
      {imageType === "gradient" ? renderGradient() : null}
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="平铺方式"
            value={repeat}
            optionsData={{
              "no-repeat": "不平铺",
              repeat: "平铺",
              "repeat-x": "横向平铺",
              "repeat-y": "纵向平铺",
            }}
            onChange={onChangeRepeat}
          />
        </Col>
        <Col span={12}>
          <UnitInput
            label="背景高度"
            min={0}
            max={100000}
            onChange={onChangeUnitInput("sizeY")}
            defaultValue={sizeY}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <QuadrangularSelect
            label="背景位置"
            defaultData={[positionX, positionY]}
            onChange={onChangeQuickPosition}
          />
        </Col>
        <Col span={12}>
          <Row className={s.row}>
            <Col span={24}>
              <UnitInput
                label="背景宽度"
                min={0}
                max={100000}
                onChange={onChangeUnitInput("sizeX")}
                defaultValue={sizeX}
              />
            </Col>
          </Row>
          <Row className={s.row}>
            <Col span={24}>
              <UnitInput
                label="横向位置"
                min={0}
                max={100000}
                onChange={onChangeUnitInput("positionX")}
                defaultValue={positionX}
              />
            </Col>
          </Row>
          <Row className={s.row}>
            <Col span={24}>
              <UnitInput
                label="纵向位置"
                min={0}
                max={100000}
                onChange={onChangeUnitInput("positionY")}
                defaultValue={positionY}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Backgrounditem;
