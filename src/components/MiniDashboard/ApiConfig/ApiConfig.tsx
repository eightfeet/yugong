import { message } from "antd";
import arrayMove from "array-move";
import cloneDeep from "lodash/cloneDeep";
import React, { useCallback, useEffect, useState } from "react";
import { AnyObjectType, Api, ArgumentsItem } from "~/types/appData";
import { ExposeApi } from "~/types/modules";
import ArgumentsSetting from "../ArgumentsSetting";
import s from "./ApiConfig.module.less";
import ApiList from "./ApiList";

interface Props {
  /**
   * api数据
   */
  apiData?: Api[];
  /**
   * 模块默认导出的api数据
   */
  defaultApiData?: ExposeApi[];
  /**
   * 修改
   */
  onChange?: (data: Api[]) => void;
  /**
   * 移除
   */
  onRemove?: (index: number, data: Api) => void;
  /**
   * 是否可排序
   */
  sortable?: boolean;
}

const Apiconfig: React.FC<Props> = ({
  apiData,
  defaultApiData,
  onChange,
  onRemove,
  sortable,
}) => {
  /**
   * 操作数据
   */
  const [operateApi, setOperateApi] = useState<ExposeApi[]>([]);

  /**
   * 设置当前操作数据
   * api数据合并至默认数据，
   * 组合为一分操作数据operateApi
   */
  useEffect(() => {
    // 是否有定义api
    const defaultApi = cloneDeep(defaultApiData);
    const api = cloneDeep(apiData);
    // 合并默认api定义与api数据,
    // 比对数据覆盖默认数据
    defaultApi?.forEach((defItem) => {
      const apiItem = api?.find((item) => item.apiId === defItem.apiId) || {};
      Object.keys(defItem).forEach((key) => {
        if (apiItem[key]) {
          defItem[key] = apiItem[key];
        }
      });
    });

    // 保存修改
    setOperateApi(defaultApi || []);
  }, [apiData, defaultApiData]);

  /**
   * api参数
   */
  const [argData, setArgData] =
    useState<
      | {
          index: number;
          results: ArgumentsItem[];
          type?: string;
        }
      | undefined
    >();

  const [headerFlexible, setHeaderFlexible] = useState(false);

  /**
   * 更新api数据
   */
  const updateApi = useCallback(
    (data: Api[]) => {
      const optApiData = [...data];
      // 更新到state
      setOperateApi(optApiData);
      // 将数据更新到appData
      if (onChange instanceof Function) {
        onChange(optApiData);
      }
    },
    [onChange]
  );

  /**
   * 修改索引Api请求url
   */
  const onChangeUrl = useCallback(
    (index) => (e: any) => {
      const result = [...operateApi];
      result[index].url = e.target.value;
      updateApi(result);
    },
    [operateApi, updateApi]
  );

  /**
   * 修改索引Api请求方法
   */
  const onChangeMethod = useCallback(
    (index) => (e: any) => {
      const result = [...operateApi];
      result[index].method = e;
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
        fieldName: "",
      };
      switch (e) {
        case "headers":
          value = {
            name: "headers",
            fieldName: "headers",
            describe: "包含请求相关的Headers对象。",
            type: "object",
            data: operateApi[index]?.headers || {},
          };
          break;
        case "mode":
          value = {
            name: "mode",
            fieldName: "mode",
            describe:
              "包含请求的模式 (例如： cors, no-cors, same-origin, navigate).",
            type: "string",
            data: operateApi[index]?.mode || "",
          };
          break;
        case "credentials":
          value = {
            name: "credentials",
            fieldName: "credentials",
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
    (index: number, type: "body" | "successPublic" | "errorPublic" ) => {
      // 获取api的数据；
      let data: Api["body" | "successPublic" | "errorPublic" ] = [];
      if (operateApi?.length) {
        data = operateApi[index][type];
      }

      // 转换为配置参数
      const useArgData: ArgumentsItem[] = [...(data || [])];
      // 无数据时初始化一份
      if (!useArgData.length) {
        useArgData.push({
          type: "string",
          data: "",
          fieldName: "",
        });
      }
      // 准备当前编辑参数到参数面板
      setArgData({ index, results: useArgData, type });
      // 开启自定义字段编辑
      setHeaderFlexible(true);
    },
    [operateApi]
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      let result: ExposeApi[] = cloneDeep(operateApi || []);
      result = arrayMove(result, oldIndex, newIndex);
      updateApi(result);
  },
  [operateApi, updateApi]
  )

  const onchangeDatamap = useCallback(
    (index: number, data: Api['dataMap']) => {
      const result = [...operateApi];
      result[index].dataMap = data;
      updateApi(result);
    },
    [operateApi, updateApi],
  )

  return (
    <div className={s.root}>
      <ApiList
        sortable={sortable}
        operateApi={operateApi}
        apiData={apiData}
        onRemove={onRemove}
        onChangeUrl={onChangeUrl}
        onChangeMethod={onChangeMethod}
        onChangeSetting={onChangeSetting}
        onHandleUserArg={onHandleUserArg}
        onchangeDatamap={onchangeDatamap}
        useDragHandle
        onSortEnd={onSortEnd}
      />
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
        forceUpdate
      />
    </div>
  );
};

export default Apiconfig;
