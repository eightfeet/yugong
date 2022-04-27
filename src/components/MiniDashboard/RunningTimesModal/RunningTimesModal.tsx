import React, { useCallback, useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Input, message, Row } from "antd";
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

const svgIcon = () => <svg
  viewBox="0 0 40 40"
  fill="currentColor"
  style={{
    verticalAlign: "top",
    color: "#268bd2",
    fontSize: 15,
    marginRight: 3,
    height: "1em",
    width: "1em",
  }}
>
  <path d="M30 35H5V12.5h25V20h2.5V7.5C32.5 6.1 31.4 5 30 5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5H5C3.6 5 2.5 6.1 2.5 7.5V35c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5H30v5zM10 7.5h2.5S15 6.4 15 5s1.1-2.5 2.5-2.5S20 3.6 20 5s1.3 2.5 2.5 2.5H25s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5zm-2.5 20h5V25h-5v2.5zm17.5-5v-5L15 25l10 7.5v-5h12.5v-5H25zm-17.5 10H15V30H7.5v2.5zM20 15H7.5v2.5H20V15zm-7.5 5h-5v2.5h5V20z" />
</svg>

const RunningTimesModal: React.FC<Props> = ({
  visible = false,
  data,
  onCancel,
}) => {
  const [state, setstate] = useState<AnyObjectType>({});
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [runningPath, setRunningPath] = useState<string>()
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
  const handleClipboard = useCallback(
    (data) => {
      console.log(data);

      const arr = data.namespace;
      const path = arr.slice(1, arr.length);
      const runningPath = path.join('.');
      setRunningPath(runningPath);
      return true
    },
    [],
  )

  const onClip = useCallback(
    () => {

      const jspath = `js{{runningTimes.${runningPath}}}`;
      const path = `{{${runningPath}}}`;
      console.log(jspath, path);
    },
    [runningPath],
  )


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
            enableClipboard={handleClipboard}
          />
          {runningPath ? <Row gutter={10}>
            <Col>规则路径:</Col>
            <Col>{`{{${runningPath}}}`}</Col>
            <Col className={s.icon}>
              <CopyToClipboard
                text={`{{${runningPath}}}`}
                onCopy={() => message.info({ content: '已拷贝规则路径' })}
              >
                <span onClick={onClip}>{svgIcon()}</span>
              </CopyToClipboard>
            </Col></Row> : null}
          {runningPath ? <Row gutter={10}>
            <Col>脚本路径:</Col>
            <Col>{`js{{runningTimes.${runningPath}}}`}</Col>
            <Col className={s.icon}>
              <CopyToClipboard
                text={`js{{runningTimes.${runningPath}}}`}
                onCopy={() => message.info({ content: '已拷贝脚本路径' })}
              >
                <span onClick={onClip}>{svgIcon()}</span>
              </CopyToClipboard>
            </Col>
          </Row> : null}
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
