import { Button, Card, Col, Input, Modal, Row } from "antd";
import Draggable from "react-draggable";
import React, { useCallback, useState } from "react";
import { MODULES } from "~/core/constants";

interface ModalType {
  moduleName: string;
  title: string;
  discribe: string;
}

const Repository: React.FC = () => {
  const [pisition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [addedModal, setAddedModal] = useState<ModalType>();
  const [newModalName, setNewModalName] = useState<string>();

  const createModal = useCallback((moduleName: string, name?: string) => {
    const module = require(`~/modules/${moduleName}`).default;
    console.log("新增组件", moduleName, name, module);
  }, []);

  const onStopDrag = useCallback(
    (moduleName: ModalType) => (e: any) => {
      if (window.innerWidth - e.screenX > 550) {
        setAddedModal(moduleName);
      }
    },
    [setAddedModal]
  );

  const onDoubleClick = useCallback(
    (moduleName: ModalType) => (e: any) => {
      setAddedModal(moduleName);
    },
    [setAddedModal]
  );

  const onCreate = useCallback(() => {
    setAddedModal(undefined);
    setNewModalName(undefined);
    if (addedModal?.moduleName) {
      createModal(addedModal?.moduleName, newModalName || "未命名");
    }
  }, [addedModal?.moduleName, createModal, newModalName]);

  return (
    <>
      <Row gutter={[16, 16]}>
        {MODULES.map((item) => (
          <Col span={6} key={item.moduleName}>
            <Draggable position={pisition} onStop={onStopDrag(item)}>
              <Card onDoubleClick={onDoubleClick(item)} hoverable cover={null}>
                <Card.Meta
                  style={{ textAlign: "center" }}
                  title={<><div style={{fontSize:'40px', color: '#AAA'}}>{item.icon}</div><div>{item.title}</div></>}
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
