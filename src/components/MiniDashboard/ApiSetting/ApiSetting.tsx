import {
  Button,
  Col,
  Divider,
  Input,
  message,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useMergeAppData from "~/hooks/useMergeAppData";
import { RootState } from "~/redux/store";
import { AnyObjectType, ArgumentsItem } from "~/types/appData";
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
  const updateAppdata = useMergeAppData();
  const [argData, setArgData] = useState<
    { index: number; results: ArgumentsItem[]; type?: string } | undefined
  >();

  const [headerFlexible, setHeaderFlexible] = useState(false);

  const updateApi = useCallback(
    (index: number, data: AnyObjectType) => {
      // 复制当前Api数据
      const newApi = [...(api || [])];
      // 收集结果
      const modify = { ...newApi[index], ...data };
      // 修改api数据
      newApi[index] = modify;
      // 保存数据
      updateAppdata(newApi, "api");
    },
    [api, updateAppdata]
  );

  const onChangeInput = useCallback(
    (index) => (e: any) => {
      updateApi(index, { url: e.target.value });
    },
    [updateApi]
  );

  const onChangeMethod = useCallback(
    (index) => (e: any) => {
      updateApi(index, { method: e });
    },
    [updateApi]
  );

  // 设置参数
  const onChangeSetting = useCallback(
    (index) => (e: any) => {
      let value: ArgumentsItem = {
        type: "string",
        data: "",
      };
      switch (e) {
        case "headers":
          value = {
            name: "headers",
            describe: "包含请求相关的Headers对象。",
            type: "object",
            data: {
              a: 11,
            },
          };
          break;
        case "mode":
          value = {
            name: "mode",
            describe:
              "包含请求的模式 (例如： cors, no-cors, same-origin, navigate).",
            type: "string",
            data: "",
          };
          break;
        case "credentials":
          value = {
            name: "credentials",
            describe: "包含请求的证书(例如： omit, same-origin).",
            type: "string",
            data: "",
          };
          break;
        default:
          break;
      }
      setArgData({ index, results: [value] });
    },
    [setArgData]
  );

  const hideArg = useCallback(() => {
    setArgData(undefined);
    setHeaderFlexible(false);
  }, []);

  const onArgOk = (data: ArgumentsItem[]) => {
    // 保存静态字段
    if (!argData?.type) {
      const key = data[0].name;
      const value = data[0].data;
      if (!key || !value) {
        message.error("失败！请填写字段名称与值");
        return;
      }
      hideArg();
      updateApi(argData!.index, { [key]: value });
    }
    // 保存动态字段值
    if (argData?.type) {
      const checkData = data.some((item) => {
        return !item.name || !item.data;
      });
      if (checkData) {
        message.error("失败！请填写字段名称与值");
        return;
      }
      hideArg();
      updateApi(argData!.index, { [argData.type]: data });
    }
  };

  const onHandleUserArg = useCallback(
    (index: number, type: "body" | "successPublic" | "errorPublic") => () => {
      // 获取api的数据；
      const data = (api || [])[index][type] || {};
      // 转换为配置参数
      const useArgData: ArgumentsItem[] = [];
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          useArgData.push(element);
        }
      }
      // 无数据时初始化一份
      if (!useArgData.length) {
        useArgData.push({
          type: "string",
          data: "",
        });
      }
      // 准备当前编辑参数到参数面板
      setArgData({ index, results: useArgData, type });
      // 开启自定义字段编辑
      setHeaderFlexible(true);
    },
    [api]
  );

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
                onChange={onChangeInput(index)}
                addonBefore={selectMethod(onChangeMethod(index), item.method)}
                addonAfter={selectSetting(onChangeSetting(index), "高级设置")}
                value={item.url}
              />
            </Col>
          </Row>
          <Row className={s.row} gutter={4}>
            <Col span={24}>
              <Button
                onClick={onHandleUserArg(index, "body")}
                style={{ width: "100%" }}
              >
                入参设置
              </Button>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            请求结果发布
          </Divider>
          <Row gutter={4}>
            <Col span={12}>
              <Tooltip title={<div>将Api请求成功结果发布到全局</div>}>
                <Button
                  onClick={onHandleUserArg(index, "successPublic")}
                  style={{ width: "100%" }}
                >
                  success
                </Button>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title={<div>将Api请求失败结果发布到全局</div>}>
                <Button
                  onClick={onHandleUserArg(index, "errorPublic")}
                  style={{ width: "100%" }}
                >
                  error
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </div>
      ))}
      <ArgumentsSetting
        title={
          !argData?.type
            ? `${argData?.results[argData?.index]?.name || ""}设置`
            : `${argData?.type || ''}参数设置`
        }
        headerFlexible={headerFlexible}
        dataFlexible
        visible={!!argData?.results?.length}
        initArgumentData={argData?.results}
        onCancel={hideArg}
        onOk={onArgOk}
      />
    </div>
  );
};

export default ApiSetting;
