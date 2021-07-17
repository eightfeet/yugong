import { Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import useMarked from "~/hooks/useMarked";
import s from './MarkdownModalDoc.module.less'

interface Props {
    visible: boolean;
    moduleName?: string;
    onCancel: () => void;
}

const MarkdownModalDoc: React.FC<Props> = ({ visible, moduleName, onCancel }) => {
    const [helper, setHelper ] = useMarked();

  const getMd = useCallback(async (name?: string) => {
      if (!moduleName) {
            setHelper('');
          return;
      }
    let text: string = `<h3>找不到${name}文档</h3>请联系模块作者补充`;
    try {
      const file = await import(`~/modules/${name}/README.md`);
      const response = await fetch(file.default);
      text = await response.text();
    } catch (error) {
      console.warn(error);
    }
    setHelper(text);
  }, [moduleName, setHelper]);

  useEffect(() => {
      if (visible) {
        getMd(moduleName)
      }
  }, [getMd, moduleName, visible])

  return (
    <>
      <Modal
        visible={visible}
        width={700}
        footer={null}
        onCancel={onCancel}
        bodyStyle={{ padding: "20px 10px 30px 10px" }}
      >
        <div className={s.mdwrap}>
          <div>{helper}</div>
        </div>
      </Modal>
    </>
  );
};

export default MarkdownModalDoc;
