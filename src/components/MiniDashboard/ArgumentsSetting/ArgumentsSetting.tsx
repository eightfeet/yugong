import { ClusterOutlined, InfoCircleOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { Button, Card, Input, Select, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState, useMemo, lazy } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import {
  ArgumentsItem,
  ArgumentsNumber,
  ArgumentsString,
} from "~/types/appData";
import s from "./ArgumentsSetting.module.less";
import ArrayArguments from "./ArrayArguments";
import BooleanArguments from "./BooleanArguments";
import ObjectArguments from "./ObjectArguments";
import RunningTimesModal from "~/components/MiniDashboard/RunningTimesModal";
import HtmlSuffix from "./HtmlSuffix";
import classNames from "classnames";

interface Props {
  /**
   * 显示参数面板
   */
  visible: boolean;
  /**
   * 确认时回调
   */
  onOk?: (data: ArgumentsItem[]) => void;
  /**
   * 参数数据
   */
  argumentsData?: ArgumentsItem[];
  /**
   * 组件导出事件的初始化参数数据
   */
  initArgumentData?: ArgumentsItem[];
  /**
   * 取消时回调
   */
  onCancel?: () => void;
  /**
   * 头部可自定义
   */
  headerFlexible?: boolean;
  /**
   * 数据可自定义,默认false固定不变
   */
  dataFlexible?: boolean;
  /**
   * title
   */
  title?: string;
  /*
   * forceUpdate
   */
  forceUpdate?: boolean;
}

const ArgumentsSetting: React.FC<Props> = ({
  visible,
  argumentsData,
  initArgumentData,
  onOk,
  onCancel,
  title,
  dataFlexible = false,
  headerFlexible = false,
  forceUpdate,
}) => {
  const runningTimes = useSelector((state: RootState) => state.runningTimes);
  const [argumentState, setArgumentState] = useState<ArgumentsItem[]>([]);
  const [showRunningTimes, setShowRunningTimes] = useState(false);
  const forceUpdateByStateTag =
    useDispatch<Dispatch>().controller.forceUpdateByStateTag;
  // 将argument数据接管
  useEffect(() => {
    let data: ArgumentsItem[] = [...(argumentsData || [])];
    // 不可自定义参数且数据为空时，使用组件初始数据
    if (data.length === 0) {
      data = [...(initArgumentData || [])];
    }
    setArgumentState(data);
  }, [argumentsData, headerFlexible, initArgumentData]);

  // 弹窗确定收集编辑完毕的argument数据
  const onModalOk = useCallback(() => {
    if (onOk instanceof Function) {
      // todo 确定页面为何强制更新？？
      if (forceUpdate) {
        forceUpdateByStateTag();
      }
      onOk(argumentState);
    }
  }, [onOk, forceUpdateByStateTag, argumentState, forceUpdate]);

  // number
  const onChangeInput = useCallback(
    (index: number, isSelect?: boolean) => (e: any) => {
      const result = [...argumentState];
      result[index].data = isSelect ? e : e.target.value;
      setArgumentState(result);
    },
    [argumentState]
  );

  const onChangeRunningTime = useCallback(
    (index: number) => (e: any) => {
      const result = [...argumentState];
      result[index].data = e;
      setArgumentState(result);
    },
    [argumentState]
  );

  const onChangeObjType = useCallback(
    (index: number) => (data: ArgumentsItem) => {
      const result = [...argumentState];
      result[index] = data;
      setArgumentState(result);
    },
    [argumentState]
  );

  const onChangeFieldName = useCallback(
    (index: number) => (e: any) => {
      const result = [...argumentState];
      result[index].fieldName = e.target.value;
      result[index].name = e.target.value;
      setArgumentState(result);
    },
    [argumentState]
  );

  const onChangeDescribe = useCallback(
    (index: number) => (e: any) => {
      const result = [...argumentState];
      result[index].describe = e.target.value;
      setArgumentState(result);
    },
    [argumentState]
  );

  // 移除字段
  const onRemove = useCallback(
    (index: number) => () => {
      let result = [...argumentState];
      result = result.filter((_, i) => i !== index);
      setArgumentState(result);
    },
    [argumentState]
  );

  // 新增字段
  const onAddField = useCallback(() => {
    const result = [...argumentState];
    result.push({
      describe: undefined,
      name: "未命名",
      fieldName: "",
      type: "string",
      data: "",
    });
    setArgumentState(result);
  }, [argumentState]);

  // 修改字段类型
  const onChangeArgType = useCallback(
    (index: number) => (e: any) => {
      const result = [...argumentState];
      result[index].type = e;
      switch (e) {
        case "runningTime":
        case "string":
        case "number":
          result[index].data = "";
          break;
        case "array":
          result[index].data = [];
          break;
        case "object":
          result[index].data = {};
          break;
        case "boolean":
          result[index].data = {
            comparableAverageA: null,
            comparableAverageB: null,
            method: "===",
          };
          break;

        default:
          break;
      }
      setArgumentState(result);
    },
    [argumentState]
  );

  const onClickShowGloabVar = useCallback(() => {
    console.log(runningTimes);
  }, [runningTimes]);

  const renderNumberString = (
    item: ArgumentsString | ArgumentsNumber,
    index: number
  ) => {
    // 下拉选择形式
    if (item?.select) {
      const { select } = item;
      const keys = Object.keys(select);
      console.log("select", select);
      console.log("keys", keys);
      return (
        <Select
          onChange={onChangeInput(index, true)}
          value={item.data}
          className={s.select}
          placeholder={`请输入值,${item.describe || ""}`}
        >
          {keys.map((value) => (
            <Select.Option key={value} value={value}>
              {select[value]}
            </Select.Option>
          ))}
        </Select>
      );
    }
    // 输入框形式
    return (
      <Input
        onChange={onChangeInput(index)}
        placeholder={`请输入值,${item.describe || ""}`}
        value={item.data}
        type="text"
        suffix={!!item.html ? <HtmlSuffix /> : null}
      />
    );
  };

  const MixedArguments = useMemo(
    () => lazy(() => import(`./MixedArguments`)),
    []
  );

  return (
    <>
      <Modal
        title={
          <div className={s.title}>
            <h4>
              {title}{" "}
              <Button
                type="text"
                onClick={onClickShowGloabVar}
                icon={
                  <Tooltip title="查看全局发布变量">
                    <ClusterOutlined
                      onClick={() => setShowRunningTimes(true)}
                    />
                  </Tooltip>
                }
              />
            </h4>
            <div className={s.right}>
              {headerFlexible ? (
                <Button onClick={onAddField}>新增</Button>
              ) : null}
            </div>
          </div>
        }
        visible={visible}
        onOk={onModalOk}
        onCancel={onCancel}
        bodyStyle={{ padding: "10px" }}
        okText="确定"
        cancelText="取消"
      >
        {argumentState.map((item, index) => {
          const initItem = initArgumentData?.length
            ? initArgumentData[index]
            : undefined;
          return (
            <Card
              className={classNames(s.card, {
                [s.mixedcard]: item.type === "mixed",
              })}
              key={`${index}`}
              title={
                <div className={s.cardtitle}>
                  <div className={s.cardtitleinfo}>
                    {!headerFlexible ? (
                      <>
                        <span className={s.label}>名称：</span>
                        {item.name || initItem?.name || ""} &nbsp;
                        <Tooltip
                          title={parse(
                            item.describe || initItem?.describe || ""
                          )}
                        >
                          <InfoCircleOutlined
                            style={{
                              color: "rgba(0,0,0,.45)",
                            }}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <span className={s.label}>字段：</span>
                        <Input
                          className={s.title}
                          value={item.fieldName || initItem?.fieldName || ""}
                          placeholder="限数字或字母"
                          onChange={onChangeFieldName(index)}
                          suffix={
                            <Tooltip
                              title={
                                <Input
                                  className={s.desc}
                                  placeholder="新增字段描述"
                                  value={item.describe}
                                  style={{
                                    width: "200px",
                                  }}
                                  onChange={onChangeDescribe(index)}
                                />
                              }
                            >
                              <InfoCircleOutlined
                                style={{
                                  color: "rgba(0,0,0,.45)",
                                }}
                              />
                            </Tooltip>
                          }
                        />
                      </>
                    )}
                    <span className={s.divide} />
                    <span className={s.label}>类型：</span>
                    {headerFlexible ? (
                      <Select
                        className={s.type}
                        value={item.type}
                        onChange={onChangeArgType(index)}
                      >
                        <Select.Option value="string">string</Select.Option>
                        <Select.Option value="number">number</Select.Option>
                        <Select.Option value="boolean">boolean</Select.Option>
                        <Select.Option value="object">object</Select.Option>
                        <Select.Option value="array">array</Select.Option>
                        <Select.Option value="mixed">mixed</Select.Option>
                        <Select.Option value="runningTime">
                          runningTime
                        </Select.Option>
                      </Select>
                    ) : (
                      item.type
                    )}
                  </div>
                  <div>
                    {headerFlexible ? (
                      <Button onClick={onRemove(index)}>移除</Button>
                    ) : null}
                  </div>
                </div>
              }
            >
              <div>
                {item.type === "number" || item.type === "string"
                  ? renderNumberString(item, index)
                  : null}
                {item.type === "runningTime" ? (
                  <Select
                    className={s.select}
                    placeholder="请选择"
                    showSearch
                    value={item.data}
                    optionFilterProp="children"
                    filterOption={
                      (input, option) => {
                        const str = option?.children.join("").toLowerCase();
                        if (str.indexOf(input) !== -1) {
                          return true;
                        }
                        return false;
                      }
                      // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={onChangeRunningTime(index)}
                  >
                    {Object.keys(runningTimes)?.map(
                      (optionsIitem, optionsIitemIndex) => (
                        <Select.Option
                          key={optionsIitemIndex}
                          value={optionsIitem}
                        >
                          {optionsIitem}
                        </Select.Option>
                      )
                    )}
                  </Select>
                ) : null}
                {item.type === "object" ? (
                  <ObjectArguments
                    describe={item.describe}
                    htmlInput={!!item.html}
                    onChange={onChangeObjType(index)}
                    typeArguments={item}
                    flexible={!!dataFlexible}
                  />
                ) : null}
                {item.type === "array" ? (
                  <ArrayArguments
                    htmlInput={!!item.html}
                    describe={item.describe}
                    onChange={onChangeObjType(index)}
                    typeArguments={item}
                    flexible={!!dataFlexible}
                  />
                ) : null}
                {item.type === "boolean" ? (
                  <BooleanArguments
                    onChange={onChangeObjType(index)}
                    typeArguments={item}
                    flexible={!!dataFlexible}
                  />
                ) : null}
                {item.type === "mixed" ? (
                  <MixedArguments
                    onChange={onChangeObjType(index)}
                    typeArguments={item}
                    flexible={!!dataFlexible}
                  />
                ) : null}
              </div>
            </Card>
          );
        })}
      </Modal>
      <RunningTimesModal
        visible={showRunningTimes}
        data={runningTimes}
        onCancel={() => setShowRunningTimes(false)}
      />
    </>
  );
};

export default ArgumentsSetting;
