import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ArgumentsItem } from "~/types/appData";

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


const ArgumentsSetting: React.FC<Props> = ({visible, argumentsData, initArgumentData, onOk, onCancel}) => {
    const [result, setResult] = useState<ArgumentsItem[]>([]);
    // 将argument数据接管
    useEffect(
        () => {
            setResult(argumentsData)
        },
        [argumentsData],
    )
    
    // 弹窗确定收集编辑完毕的argument数据
    const onModalOk = useCallback(
        () => {
            console.log('处理结果', result)
            if (onOk instanceof Function) {
                onOk(result)
            }
        },
        [onOk, result],
    )

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={onModalOk}
      onCancel={onCancel}
    >
        <p>初始化参数</p>
        {JSON.stringify(initArgumentData, null, 2)}
        <p>默认参数</p>
      {JSON.stringify(argumentsData, null, 2)}
    </Modal>
  );
};

export default ArgumentsSetting;
