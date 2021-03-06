import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ArgumentsItem } from "~/types/appData";
import s from "./ArgumentsSetting.module.less";

interface Props {
  /**
   * 显示参数面板
   */
  visible: boolean;
  /**
   * 确认时回调
   */
  onOk: (data: ArgumentsItem[]) => void;
  argumentsData: ArgumentsItem[];
  initArgumentData: ArgumentsItem[];
  onCancel: () => void;
}

const ArgumentsSetting: React.FC<Props> = ({
  visible,
  argumentsData,
  initArgumentData,
  onOk,
  onCancel,
}) => {
  const [argumentState, setArgumentState] = useState<ArgumentsItem[]>([]);
  // 将argument数据接管
  useEffect(() => {
    if ( argumentsData.length <= 0 ) {
      setArgumentState(initArgumentData || [])
    } else {
      setArgumentState(argumentsData)
    }
  }, [argumentsData, initArgumentData]);

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
      result[index].data = Number(e.target.value);
      setArgumentState(result);
    },
    [argumentState]
  );

  return (
    <Modal
      title={
        <div className={s.title}>
          <h4>参数设置</h4>
          <div className={s.right}>
            <Button size="small">新增</Button>
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
      {argumentsData.map((item, index) => (
        <Card
          title={
            <div className={s.cardtitle}>
              <div className={s.cardtitleinfo}>
                <span>字段名称：</span>
                <Input
                  className={s.title}
                  value={item.name}
                  readOnly
                  suffix={
                    <Tooltip title={item.describe}>
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
                <span className={s.divide} />
                <span>类型：</span>
                <Select className={s.type} value={item.type} disabled>
                  <Select.Option value="string">string</Select.Option>
                  <Select.Option value="number">number</Select.Option>
                  <Select.Option value="boolean">boolean</Select.Option>
                  <Select.Option value="object">object</Select.Option>
                  <Select.Option value="array">array</Select.Option>
                </Select>
              </div>
              <div>
                <Button size="small">移除</Button>
              </div>
            </div>
          }
        >
          <div>
            {item.type === "number" ? (
              <Input
                onChange={onChangeInput(index)}
                value={item.data}
                type="number"
                min={0}
                max={1000000}
              />
            ) : null}
          </div>
        </Card>
      ))}
    </Modal>
  );
};

export default ArgumentsSetting;
