import {
  PlusOutlined,
  SettingOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Row, Col, Tooltip, Input, Button } from "antd";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Api, ArgumentsObject } from "~/types/appData";
import ArgumentsSetting from "../ArgumentsSetting";
import s from "./ApiConfig.module.less";

interface Props {
    dataMap: Api["dataMap"];
    onChange?: (data: Api["dataMap"]) => void;
}

const ApiDataMap: React.FC<Props> = ({dataMap, onChange}) => {
  const [maps, setMaps] = useState<Api["dataMap"]>();
  const [visableModal, setVisableModal] = useState<boolean>(false);
  const [mapsArg, setMapsArg] = useState<ArgumentsObject>();
  const [currentIndex, setCurrentIndex] = useState<number>();

  useEffect(() => {
    setMaps([]);
  }, []);

  const updateMaps = useCallback((data: Api["dataMap"]) => {
    setMaps(data);
    if (onChange instanceof Function) {
        onChange(data)
    }
  }, [onChange]);

  const onPluse = useCallback(() => {
    const operateApiDataMap = [...(maps || [])];
    operateApiDataMap.push({});
    updateMaps(operateApiDataMap);
  }, [maps, updateMaps]);

  const onMinus = useCallback(
    (index: number) => {
      let operateApiDataMap = [...(maps || [])];
      operateApiDataMap = operateApiDataMap.filter(
        (_, itemIndex) => itemIndex !== index
      );
      updateMaps(operateApiDataMap);
    },
    [maps, updateMaps]
  );

  const onArgOk = useCallback((data) => {
    let operateApiDataMap = [...(maps || [])];
    if (currentIndex !== undefined && data[0]) {
        operateApiDataMap[currentIndex].map = data[0];
        updateMaps(operateApiDataMap);
    }
    setVisableModal(false);
  }, [currentIndex, maps, updateMaps]);

  const showArg = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      const mapsArg = (maps || [])[index].map;
      setMapsArg(mapsArg || undefined);
      setVisableModal(true);
    },
    [maps]
  );

  const onChangeSource = useCallback(
    (index, e) => {
      let operateApiDataMap = [...(maps || [])];
      operateApiDataMap[index].source = e.target.value;
      updateMaps(operateApiDataMap);
    },
    [maps, updateMaps]
  );

  const onChangeTarget = useCallback(
    (index, e) => {
      let operateApiDataMap = [...(maps || [])];
      operateApiDataMap[index].target = e.target.value;
      updateMaps(operateApiDataMap);
    },
    [maps, updateMaps]
  );

  return (
    <>
      <Button
        onClick={onPluse}
        icon={<PlusOutlined />}
        type="text"
        size="small"
      >
        结果转换/映射
      </Button>
      {maps?.map((item, index) => (
        <Row key={index} gutter={4} className={classNames(s.row, s.map)}>
          <Col span={8}>
            <Tooltip title={<div>root[data]; root.data</div>}>
              <Input
                placeholder="输入源数据"
                onChange={(e) => onChangeSource(index, e)}
              />
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title={<div>root[target]; root.target</div>}>
              <Input
                placeholder="输入目标数据"
                onChange={(e) => onChangeTarget(index, e)}
              />
            </Tooltip>
          </Col>
          <Col span={7}>
            <Tooltip
              title={
                <div>
                  确定转换映射关系，
                  <br /> {`{foo:bar}`} <br />
                  foo=旧数据；bar=新数据
                </div>
              }
            >
              <Button
                className={s.w100}
                onClick={() => showArg(index)}
                icon={<SettingOutlined />}
              >
                映射关系
              </Button>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Tooltip title={<div>移除</div>}>
              <MinusOutlined onClick={() => onMinus(index)} />
            </Tooltip>
          </Col>
        </Row>
      ))}
      <ArgumentsSetting
        title="映射关系"
        dataFlexible
        visible={visableModal}
        initArgumentData={[
          mapsArg || {
            type: "object",
            describe: "",
            fieldName: "mapsArg",
            name: "映射关系",
            data: {},
          },
        ]}
        onCancel={() => setVisableModal(false)}
        onOk={onArgOk}
        forceUpdate
      />
    </>
  );
};

export default ApiDataMap;
