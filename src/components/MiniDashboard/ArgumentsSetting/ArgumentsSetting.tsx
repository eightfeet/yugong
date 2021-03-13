import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ArgumentsItem } from "~/types/appData";
import s from "./ArgumentsSetting.module.less";
import ArrayArguments from "./ArrayArguments";
import BooleanArguments from "./BooleanArguments";
import ObjectArguments from "./ObjectArguments";

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
   * 初始化参数数据
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
}) => {
  const [argumentState, setArgumentState] = useState<ArgumentsItem[]>([]);
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
      onOk(argumentState);
    }
  }, [onOk, argumentState]);

  // number
  const onChangeInput = useCallback(
    (index: number) => (e: any) => {
      const result = [...argumentState];
      result[index].data = e.target.value;
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
      result[index].name = e.target.value;
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

  return (
    <Modal
      title={
        <div className={s.title}>
          <h4>{title}</h4>
          <div className={s.right}>
            {headerFlexible ? (
              <Button onClick={onAddField}>
                新增
              </Button>
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
        const initItem = initArgumentData?.length ? (initArgumentData[index]) : undefined;
        return (
        <Card
          className={s.card}
          key={`${index}`}
          title={
            <div className={s.cardtitle}>
              <div className={s.cardtitleinfo}>
                <span className={s.label}>字段名称：</span>
                {!headerFlexible ? (
                  <>
                    {item.name || initItem?.name || ''} &nbsp;
                    <Tooltip title={item.describe || initItem?.describe || ''}>
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <Input
                    className={s.title}
                    value={item.name || initItem?.name || ''}
                    placeholder="新增字段名称"
                    onChange={onChangeFieldName(index)}
                    suffix={
                      <Tooltip
                        title={
                          <Input
                            className={s.desc}
                            placeholder="新增字段描述"
                            value={item.describe}
                          />
                        }
                      >
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                )}
                <span className={s.divide} />
                <span className={s.label}>类型：</span>
                {headerFlexible ? <Select
                  className={s.type}
                  value={item.type}
                  onChange={onChangeArgType(index)}
                >
                  <Select.Option value="string">string</Select.Option>
                  <Select.Option value="number">number</Select.Option>
                  <Select.Option value="boolean">boolean</Select.Option>
                  <Select.Option value="object">object</Select.Option>
                  <Select.Option value="array">array</Select.Option>
                </Select> : item.type}
              </div>
              <div>
                {headerFlexible ? (
                  <Button onClick={onRemove(index)}>
                    移除
                  </Button>
                ) : null}
              </div>
            </div>
          }
        >
          <div>
            {item.type === "number" || item.type === "string" ? (
              <Input
                onChange={onChangeInput(index)}
                placeholder={`请输入值,${item.describe || ''}`}
                value={item.data}
                type="text"
              />
            ) : null}
            {item.type === "object" ? (
              <ObjectArguments
                describe={item.describe}
                onChange={onChangeObjType(index)}
                typeArguments={item}
                flexible={!!dataFlexible}
              />
            ) : null}
            {item.type === "array" ? (
              <ArrayArguments
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
          </div>
        </Card>
      )})}
    </Modal>
  );
};

export default ArgumentsSetting;
