import React, { useCallback, useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { AnyObjectType } from "~/types/appData";
import s from "./RunningTimesModal.module.less";
import ReactJson from "react-json-view";

const { Search } = Input;

interface Props {
  visible?: boolean;
  onCancel: () => void;
  data: AnyObjectType;
}

const RunningTimesModal: React.FC<Props> = ({
  visible = false,
  data,
  onCancel,
}) => {
  const [state, setstate] = useState<AnyObjectType>({});
  useEffect(() => {
    setstate(data);
  }, [data]);
  const onChange = useCallback(
    (e) => {
      const filterdata = {};
      Object.keys(state).forEach((key) => {
        if (key.indexOf(e.target.value) !== -1) {
          filterdata[key] = state[key];
        }
      });
      if (!e.target.value) {
        setstate(data);
      } else {
        setstate(filterdata);
      }
    },
    [data, state]
  );
  return (
    <Modal visible={visible} footer={null} onCancel={onCancel}>
      <div className={s.blank}>
        <Search onChange={onChange} placeholder="查找全局发布变量" />
      </div>
      <ReactJson src={state} collapsed={1} style={{padding: '20px'}} />
    </Modal>
  );
};

export default RunningTimesModal;
