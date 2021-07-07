import Modal from "antd/lib/modal";
import React, { useCallback } from "react";
import { Template } from "~/types/pageData";

interface Props {
    visible?: boolean;
    onOk?: (template: Template) => void;
}

const TemplateInfoModal: React.FC<Props> = ({visible}) => {
    const handleOk = useCallback(
        () => {
            console.log('oooook!');
        },
        [],
    )
    const handleCancel = useCallback(
        () => {
            console.log('cccccancel!');
        },
        [],
    )
  return (
    <Modal
      title="模版信息"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      
    </Modal>
  );
};

export default TemplateInfoModal;
