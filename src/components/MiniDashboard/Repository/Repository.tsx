import { Button, Card, Col, Input, Modal, Row, Tooltip } from "antd";
import Draggable from "react-draggable";
import React, { useCallback, useState } from "react";
import { MODULES } from "~/core/constants";
import { v4 as uuidv4 } from "uuid";
import { AppDataLayoutItemTypes, AppDataModuleTypes } from "~/types/appData";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import usePostMessage from "~/hooks/usePostMessage";
import s from "./Repository.module.less";
import useKeyDown from "~/hooks/useKeyDown";

interface ModalType {
  moduleName: AppDataModuleTypes;
  title: string;
  discribe: string;
}

interface ModalTypeIcon extends ModalType {
  icon: JSX.Element;
}

const Repository: React.FC = () => {
  const [pisition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [addedModal, setAddedModal] = useState<ModalType>();
  const [newModalName, setNewModalName] = useState<string>();
  const appData = useSelector((state: RootState) => state.appData);
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;

  const sendMessage = usePostMessage((data) => {});

  const onStopDrag = useCallback(
    (module: ModalType) => (e: any) => {
      if (window.innerWidth - e.screenX > 550) {
        setAddedModal(module);
      }
    },
    [setAddedModal]
  );

  const onDoubleClick = useCallback(
    (module: ModalType) => (e: any) => {
      setAddedModal(module);
    },
    [setAddedModal]
  );

  const onAddItem = useCallback(
    (data: AppDataLayoutItemTypes) => {
      // Add a new item. It must have a unique key!
      const optAppData = [...appData];
      updateAppData(optAppData.concat(data));
      const win = (document.getElementById("wrapiframe") as HTMLIFrameElement)
        .contentWindow;
      if (win) {
        sendMessage({ tag: "updateAppData", value: optAppData }, win);
      }
    },
    [appData, sendMessage, updateAppData]
  );

  const createModal = useCallback(
    (moduleType: AppDataModuleTypes, name?: string) => {
      let y = 0;
      if (appData.length) {
        const optAppData = [...appData].sort((a, b) => b.layout!.y - a.layout!.y);
        if (optAppData[0]) {
          y = optAppData[0].layout!.y + optAppData[0].layout!.h;
        }
      }
      // get module's static Options
      const module = require(`~/modules/${moduleType}`).default;
      const { exposeDefaultProps } = module;
      const { style } = exposeDefaultProps || {};
      const moduleId: string = uuidv4();
      // Add a new item. It must have a unique key!
      const layout = {
        i: moduleId,
        w: 4,
        h: 4,
        x: 0,
        y, // put it at the bottom
        moved: false,
        static: false,
        ...(exposeDefaultProps?.layout || {}), // merge default
      };

      const content = { text: 1 };
      const result: AppDataLayoutItemTypes = {
        moduleName: name || "未标题",
        moduleId,
        layout,
        style: style || { basic: {} }, // merge style
        content,
        type: moduleType,
      };
      onAddItem(result);
    },
    [appData, onAddItem]
  );

  const onCreate = useCallback(() => {
    setAddedModal(undefined);
    setNewModalName(undefined);
    if (addedModal?.moduleName) {
      createModal(addedModal?.moduleName, newModalName || "未命名");
    }
  }, [addedModal?.moduleName, createModal, newModalName]);

  useKeyDown(onCreate, 13)

  return (
    <>
      <Row gutter={[16, 16]}>
        {MODULES.map((item) => (
          <Col span={6} key={item.moduleName}>
            <Draggable
              position={pisition}
              onStop={onStopDrag(item as ModalTypeIcon)}
            >
              <Card
                onDoubleClick={onDoubleClick(item as ModalTypeIcon)}
                hoverable
                cover={null}
              >
                <Card.Meta
                  style={{ textAlign: "center" }}
                  title={
                    <>
                      <div className={s.iconwrap}>{item.icon}</div>
                      <div>
                        <Tooltip title={item.title}>{item.title}</Tooltip>
                      </div>
                    </>
                  }
                  description={item.discribe}
                />
              </Card>
            </Draggable>
          </Col>
        ))}
      </Row>
      <Modal
        title={`创建${addedModal?.title || ""}(${
          addedModal?.moduleName || ""
        })组件`}
        visible={!!addedModal}
        footer={null}
        onCancel={() => setAddedModal(undefined)}
      >
        <Row gutter={[16, 16]}>
          <Col span={3}></Col>
          <Col span={15}>
            <Input
              type="text"
              value={newModalName}
              onChange={(e) => setNewModalName(e.target.value || undefined)}
              placeholder={`请输入${addedModal?.title || ""}(${
                addedModal?.moduleName || ""
              })组件的别名`}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={onCreate}>
              确定
            </Button>
          </Col>
        </Row>
        <br />
      </Modal>
    </>
  );
};

export default Repository;
