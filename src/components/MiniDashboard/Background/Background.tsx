import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Radio } from "antd";
import { ColorResult } from "react-color";

import Upload from "../Upload";

import s from "./Background.module.less";
import Color from "../Color";
import {
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
  UnitType,
} from "types/appData";
import Select from "../Select";
import QuadrangularSelect from "../QuadrangularSelect";
import GradientSlider from "../GradientSlider";
import UnitInput from "../UnitInput";

interface Props {
  onChange: (result: ResultType) => void;
  defaultBGCommonData?: BackgroundCommonTypesOfStyleItems;
  defaultBGGradient?: BackgroundGradientTypesOfStyleItems;
  updateKey: string;
  unit?: string;
}

type ChangeType =
  | "imageUrl"
  | "backgroundColor"
  | "position"
  | "positionX"
  | "positionY"
  | "sizeX"
  | "sizeY"
  | "repeat";

interface ResultType {
  type: "backgroundCommon" | "backgroundGradient";
  values:
    | BackgroundCommonTypesOfStyleItems
    | BackgroundGradientTypesOfStyleItems;
}

const BackgroundCommon: React.FC<Props> = ({
  onChange,
  defaultBGCommonData,
  defaultBGGradient,
  updateKey,
  unit,
}) => {
  // commonBackground
  const [commonData, setCommonData] =
    useState<BackgroundCommonTypesOfStyleItems>({});
  const {
    imageUrl,
    backgroundColor,
    positionX,
    positionY,
    sizeX,
    sizeY,
    repeat,
  } = commonData;
  useEffect(() => {
    const data = { ...(defaultBGCommonData || {}) };
    setCommonData(data);
  }, [defaultBGCommonData, updateKey]);

  const onChangeBackgroundCommon = useCallback(
    (type: ChangeType) =>
      (
        result:
          | string
          | UnitType
          | {
              name: "color";
              value: ColorResult | undefined;
            }
      ) => {
        const data: BackgroundCommonTypesOfStyleItems = { ...commonData };
        data[type] = result as string & UnitType;

        if (type === "backgroundColor") {
          const setResult = result as {
            name: "color";
            value: ColorResult | undefined;
          };
          data[type] =
            setResult.value && `rgba(${setResult.value.rgb.r}, ${setResult.value.rgb.g}, ${setResult.value.rgb.b}, ${setResult.value.rgb.a})`;
        }

        setCommonData(data);
        if (onChange instanceof Function) {
          onChange({
            type: "backgroundCommon",
            values: data,
          });
        }
      },
    [commonData, onChange]
  );

  const onChangeBg = useCallback(
    (result) => {
      const data: BackgroundCommonTypesOfStyleItems = { ...commonData };
      data.positionX = result[0];
      data.positionY = result[1];
      setCommonData(data);
      if (onChange instanceof Function) {
        onChange({
          type: "backgroundCommon",
          values: data,
        });
      }
    },
    [commonData, onChange]
  );

  // gradientBackground
  const [gradientData, setGradientData] =
    useState<BackgroundGradientTypesOfStyleItems>({});
  useEffect(() => {
    const data = { ...(defaultBGGradient || {}) };
    setGradientData(data);
  }, [defaultBGGradient, updateKey]);
  const { gradient, gradientDirections } = gradientData || {};

  const [tabState, setTabState] = useState("common");

  const onChangeTab = useCallback((e) => {
    setTabState(e.target.value);
  }, []);

  const onChangeGradient = useCallback(
    (gradient) => {
      onChange({
        type: "backgroundGradient",
        values: gradient,
      });
    },
    [onChange]
  );

  const onChangeUnit = useCallback(
    (type: "sizeX" | "sizeY" | "positionX" | "positionY") =>
      (value: UnitType) => {
        const data: BackgroundCommonTypesOfStyleItems = { ...commonData };
        data[type] = value;
        setCommonData(data);
        if (onChange instanceof Function) {
          onChange({
            type: "backgroundCommon",
            values: data,
          });
        }
      },
    [commonData, onChange]
  );

  const renderCommon = () => (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Upload
            label="背景图片"
            onChange={onChangeBackgroundCommon("imageUrl")}
            defaultImg={imageUrl}
          />
        </Col>
        <Col span={12}>
          <UnitInput
              label="背景宽度"
              min={0}
              max={100000}
              onChange={onChangeUnit("sizeX")}
              defaultValue={sizeX}
            />
        </Col>
      </Row>
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
            onChange={onChangeBackgroundCommon("repeat") as any}
          />
        </Col>
        <Col span={12}>
          <UnitInput
            label="背景高度"
            min={0}
            max={100000}
            onChange={onChangeUnit("sizeY")}
            defaultValue={sizeY}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <QuadrangularSelect
            label="背景位置"
            unit={unit}
            defaultData={[positionX, positionY]}
            onChange={onChangeBg}
          />
        </Col>
        <Col span={12}>
          <Row className={s.row}>
            <Col span={24}>
            <UnitInput
                  label="横向位置"
                  min={0}
                  max={100000}
                  onChange={onChangeUnit("positionX")}
                  defaultValue={positionX}
                />
            </Col>
          </Row>
          <Row className={s.row} key={2}>
            <Col span={24}>
              <UnitInput
                label="纵向位置"
                min={0}
                max={100000}
                onChange={onChangeUnit("positionY")}
                defaultValue={positionY}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  const renderGradient = () => (
    <>
      <Row className={s.row}>
        <Col span={24}>
          <GradientSlider
            onChange={onChangeGradient}
            defaultData={{ gradient, gradientDirections }}
          />
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="背景颜色"
            onChange={onChangeBackgroundCommon("backgroundColor")}
            defaultValue={backgroundColor}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={24}>
          <Radio.Group
            defaultValue={tabState}
            className={s.tab}
            onChange={onChangeTab}
          >
            <Radio.Button value="common">图片背景</Radio.Button>
            <Radio.Button value="gradient">渐变背景</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {tabState === "common" ? renderCommon() : null}
      {tabState === "gradient" ? renderGradient() : null}
    </>
  );
};

export default BackgroundCommon;
