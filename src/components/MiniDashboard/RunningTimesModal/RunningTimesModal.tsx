import React, { useCallback, useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Col, Input, Row } from "antd";
import { AnyObjectType } from "~/types/appData";
import s from "./RunningTimesModal.module.less";
import ReactJson from "react-json-view";
import { ExceptionOutlined } from "@ant-design/icons";
import core from './core.drawio.svg'

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
  const [showHelp, setShowHelp] = useState<boolean>(false);
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
    <>
    <Modal visible={visible} footer={null} onCancel={onCancel}>
      <div className={s.blank}>
        <Row>
          <Col>
            <Search onChange={onChange} placeholder="查找全局发布变量" />
          </Col>
          <Col>
            <div className={s.help} onClick={() => setShowHelp(true)}><ExceptionOutlined />&nbsp;运行时与EventEmitter</div>
          </Col>
        </Row>

        <ReactJson
          src={state}
          collapsed={1}
          style={{ padding: "20px" }}
          name="runningTimes"
        />
      </div>
    </Modal>
    <Modal
      width={1000}
      footer={null}
      visible={showHelp}
      onCancel={() => setShowHelp(false)}
    >
      <img src={core} alt="运行时与事件调度" />
    </Modal>
    </>
  );
};

export default RunningTimesModal;
