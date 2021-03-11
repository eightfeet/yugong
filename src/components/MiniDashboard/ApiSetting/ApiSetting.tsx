import { Button, Col, Divider, Input, Row, Select, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { ArgumentsItem } from "~/types/appData";
import ArgumentsSetting from "../ArgumentsSetting";
import s from "./ApiSetting.module.less";

const selectSetting = (onChange: any, value: any) => (
  <Select value={value} onChange={onChange}>
    <Select.Option value="mode">mode</Select.Option>
    <Select.Option value="headers">headers</Select.Option>
    <Select.Option value="credentials">credentials</Select.Option>
  </Select>
);

const methodArray = ["GET", "POST", "PUT", "DELETE"];
const selectMethod = (onChange: any, value: any) => (
  <Select value={value} onChange={onChange}>
    {methodArray.map((item) => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ))}
  </Select>
);

const ApiSetting: React.FC = () => {
  const api = useSelector((state: RootState) => state.activationItem.api);
  const [argData, setArgData] = useState<ArgumentsItem[] | undefined>()


  const onChangeInput = useCallback((e) => {
    console.log(e);
  }, []);

  const onChangeMethod = useCallback((e) => {
    console.log(e);
  }, []);

  const onChangeSetting = useCallback((e) => {
    console.log(e)
    if ( e === 'headers') {
      setArgData([{
        name: 'header',
        describe: 'api请求header信息',
        type: 'object',
        data: {
          a: 11
        }
      }])
    }
  }, [setArgData]);

  const hideArg = useCallback(
    () => {
      setArgData(undefined)
    },
    [],
  )

  return (
    <div className={s.root}>
      {api?.map((item, index) => (
        <div key={item.apiId}>
          <div className={s.divide}>
            <div className={s.title}>{item.name || "接口名称"}</div>
          </div>
          <Row className={s.row} gutter={4}>
            <Col span={24}>
              <Input
                onChange={onChangeInput}
                addonBefore={selectMethod(onChangeMethod, item.method)}
                addonAfter={selectSetting(onChangeSetting, "高级设置")}
                value={item.url}
              />
            </Col>
          </Row>
          <Row className={s.row} gutter={4}>
            <Col span={24}>
              <Button style={{ width: "100%" }}>入参设置</Button>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            请求结果发布
          </Divider>
          <Row gutter={4}>
            <Col span={12}>
              <Tooltip title={<div>将Api请求成功结果发布到全局</div>}>
                <Button style={{ width: "100%" }}>success</Button>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title={<div>将Api请求失败结果发布到全局</div>}>
                <Button style={{ width: "100%" }}>error</Button>
              </Tooltip>
            </Col>
          </Row>
        </div>
      ))}
      <ArgumentsSetting dataFlexible visible={!!argData?.length} initArgumentData={argData} onCancel={hideArg} />
    </div>
  );
};

export default ApiSetting;

