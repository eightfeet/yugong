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
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMergeAppData from "~/hooks/useMergeAppData";
import { RootState } from "~/redux/store";
import { AnyObjectType, Api, ArgumentsItem } from "~/types/appData";
import { ExposeApi } from "~/types/modules";
import ArgumentsSetting from "../ArgumentsSetting";
import s from "./ApiSetting.module.less";
import cloneDeep from "lodash/cloneDeep";

const selectSetting = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: "100px" }}
    placeholder="请选择"
  >
    <Select.Option value="mode">mode</Select.Option>
    <Select.Option value="headers">headers</Select.Option>
    <Select.Option value="credentials">credentials</Select.Option>
  </Select>
);

const methodArray = ["GET", "POST", "PUT", "DELETE"];
const selectMethod = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: "90px" }}
    placeholder="请选择"
  >
    {methodArray.map((item) => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ))}
  </Select>
);

const ApiSetting: React.FC = () => {
  // 获取数据api
  const api = useSelector((state: RootState) => state.activationItem.api);
  const [operateApi, setOperateApi] = useState<ExposeApi[]>([]);
  const moduleType = useSelector(
    (state: RootState) => state.activationItem.type
  );
  const getExposeApiData = useCallback((): ExposeApi[] => {
    let data = moduleType
      ? require(`~/modules/${moduleType}`).default?.exposeApi
      : [];
    data = cloneDeep(data);
    return data;
  }, [moduleType]);

  useEffect(() => {
    // 是否有定义api
    const defaultApi = [...getExposeApiData()||[]];
    // 合并默认api定义与默认api
    defaultApi.forEach((elementDef) => {
      api?.forEach((element) => {
        if (elementDef.apiId === element.apiId) {
          Object.keys(element).forEach(key => {
            elementDef[key] = element[key];
          })
        }
      });
    });
    // 保存修改
    setOperateApi(defaultApi);
  }, [api, getExposeApiData]);

  const updateAppdata = useMergeAppData();
  const [argData, setArgData] = useState<
    { index: number; results: ArgumentsItem[]; type?: string } | undefined
  >();

  const [headerFlexible, setHeaderFlexible] = useState(false);

  const updateApi = useCallback(
    (data: Api[]) => {
      console.log(JSON.stringify(operateApi, null, 2));
      /**
       * 清洗默认数据
       */
      const apiData = [...data];
      const defaultApiData = [...getExposeApiData()];
      defaultApiData.forEach((defaultItem) => {
        apiData.forEach((item) => {
          Object.keys(item).forEach((key: string) => {
            if (item[key] === defaultItem[key] && key !== 'apiId') {
              console.log(item[key], defaultItem[key])
              // 从结果中删除
              delete item[key];
            }
          });
        });
      });
      // 将数据更新到appData
      updateAppdata(apiData, "api");
    },
    [getExposeApiData, operateApi, updateAppdata]
  );

  const onChangeInput = useCallback(
    (index) => (e: any) => {
      const result = [...operateApi];
      result[index].url = e.target.value;
      setOperateApi(result);
      updateApi(result);
    },
    [operateApi, updateApi]
  );

  const onChangeMethod = useCallback(
    (index) => (e: any) => {
      const result = [...operateApi];
      result[index].method = e;
      setOperateApi(result);
      updateApi(result);
    },
    [operateApi, updateApi]
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
            data: operateApi[index]?.headers || {},
          };
          break;
        case "mode":
          value = {
            name: "mode",
            describe:
              "包含请求的模式 (例如： cors, no-cors, same-origin, navigate).",
            type: "string",
            data: operateApi[index]?.mode || "",
          };
          break;
        case "credentials":
          value = {
            name: "credentials",
            describe: "包含请求的证书(例如： omit, same-origin).",
            type: "string",
            data: operateApi[index]?.credentials || "",
          };
          break;
        default:
          break;
      }
      setArgData({ index, results: [value] });
    },
    [operateApi]
  );

  const hideArg = useCallback(() => {
    setArgData(undefined);
    setHeaderFlexible(false);
  }, []);

  // 处理参数面板值
  const onArgOk = useCallback(
    (data: ArgumentsItem[]) => {
      const result = [...operateApi];
      const argIndex = argData?.index;
      // 当前编辑的原始数据
      const resultItem = argIndex !== undefined ? result[argIndex] : {};
      // 指定类 body success error 才有 type
      const argType = argData?.type;
      const optValue: AnyObjectType = {};
      // 修改非指定类
      if (!argType) {
        const key = data[0].name;
        const value = data[0].data;
        if (!key || !value) {
          message.error("失败！请填写字段名称与值");
          return;
        }
        resultItem[key] = value;
        optValue[key] = value;
        if (argIndex !== undefined) {
          result[argIndex] = resultItem;
        }
      }

      // 修改指定类
      if (argType) {
        const checkData = data.some((item) => {
          return !item.name || !item.data;
        });
        if (checkData) {
          message.error("失败！请填写字段名称与值");
          return;
        }
        resultItem[argType] = data;
        optValue[argType] = data;
        if (argIndex !== undefined) {
          result[argIndex] = resultItem;
        }
      }
      hideArg();
      // 更新本地状态
      setOperateApi(result);
      // 更新api
      if (argIndex !== undefined) {
        updateApi(result);
      }
    },
    [argData?.index, argData?.type, hideArg, operateApi, updateApi]
  );

  const onHandleUserArg = useCallback(
    (index: number, type: "body" | "successPublic" | "errorPublic") => () => {
      // 获取api的数据；
      let data:Api["body" | "successPublic" | "errorPublic"] = {};
      if (api?.length) {
        data = api[index][type];
      }

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
      {operateApi?.map((element, index) => {
        const item = { ...(api?.length ? api[index] : {}), ...element };
        return (
          <div key={item.apiId}>
            <div className={s.divide}>
              <div className={s.title}>
                {item.name || item.apiId || "接口名称"}
              </div>
            </div>
            <Row className={s.row} gutter={4}>
              <Col span={24}>
                <Input
                  onChange={onChangeInput(index)}
                  addonBefore={selectMethod(onChangeMethod(index), item.method)}
                  addonAfter={selectSetting(onChangeSetting(index), "高级设置")}
                  value={item.url}
                  placeholder="请输入Url 接口地址"
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
        );
      })}
      <ArgumentsSetting
        title={
          !argData?.type
            ? `${argData?.results[argData?.index]?.name || ""}设置`
            : `${argData?.type || ""}参数设置`
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