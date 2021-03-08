import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ArgumentsItem } from "~/types/appData";
import s from "./ArgumentsSetting.module.less";
import ArrayArguments from "./ArrayArguments";
import ObjectArguments from "./ObjectArguments";

interface Props {
  /**
   * 显示参数面板
   */
  visible: boolean;
  /**
   * 确认时回调
   */
  onOk: (data: ArgumentsItem[]) => void;
  /**
   * 参数数据
   */
  argumentsData: ArgumentsItem[];
  /**
   * 初始化参数数据
   */
  initArgumentData: ArgumentsItem[];
  /**
   * 取消时回调
   */
  onCancel: () => void;
  /**
   * 可自定义
   */
  flexible?: boolean;
  /**
   * title
   */
  title: string;
}

const ArgumentsSetting: React.FC<Props> = ({
  visible,
  argumentsData,
  initArgumentData,
  onOk,
  onCancel,
  title,
  flexible,
}) => {
  const [argumentState, setArgumentState] = useState<ArgumentsItem[]>([]);
  // 将argument数据接管
  useEffect(() => {
    let data: ArgumentsItem[] = [...argumentsData];
    // 不可自定义参数且数据为空时，使用组件初始数据
    if (data.length === 0 && !flexible) {
      data = [...initArgumentData];
    }
    setArgumentState(data);
  }, [argumentsData, flexible, initArgumentData]);

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
          result[index].data = false;
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
            {flexible ? (
              <Button size="small" onClick={onAddField}>
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
      {argumentState.map((item, index) => (
        <Card
          className={s.card}
          key={`${item.name}${index}`}
          title={
            <div className={s.cardtitle}>
              <div className={s.cardtitleinfo}>
                <span>字段名称：</span>
                <Input
                  className={s.title}
                  value={item.name}
                  placeholder="新增字段描名称"
                  disabled={!flexible}
                  suffix={
                    <Tooltip
                      title={
                        <Input
                          className={s.desc}
                          placeholder="新增字段描述"
                          disabled={!flexible}
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
                <span className={s.divide} />
                <span>类型：</span>
                <Select
                  className={s.type}
                  value={item.type}
                  disabled={!flexible}
                  onChange={onChangeArgType(index)}
                >
                  <Select.Option value="string">string</Select.Option>
                  <Select.Option value="number">number</Select.Option>
                  <Select.Option value="boolean">boolean</Select.Option>
                  <Select.Option value="object">object</Select.Option>
                  <Select.Option value="array">array</Select.Option>
                </Select>
              </div>
              <div>
                {flexible ? (
                  <Button size="small" onClick={onRemove(index)}>
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
                placeholder="新增字段名"
                value={item.data}
                type="text"
              />
            ) : null}
            {item.type === "object" ? (
              <ObjectArguments
                onChange={onChangeObjType(index)}
                objArguments={item}
                flexible={!!flexible}
              />
            ) : null}
            {item.type === "array" ? (
              <ArrayArguments
                onChange={onChangeObjType(index)}
                objArguments={item}
                flexible={!!flexible}
              />
            ) : null}
          </div>
        </Card>
      ))}
    </Modal>
  );
};

export default ArgumentsSetting;
