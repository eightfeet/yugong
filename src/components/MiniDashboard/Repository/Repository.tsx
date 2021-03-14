import { Card, Col, Row } from "antd";
import Draggable from "react-draggable";
import React from "react";

const Repository: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Draggable>
          <Card hoverable cover={null}>
            <Card.Meta
              style={{ textAlign: "center" }}
              title={<div>容器</div>}
              description=""
            />
          </Card>
        </Draggable>
      </Col>
      <Col span={6}>
        <Card hoverable cover={null}>
          <Card.Meta
            style={{ textAlign: "center" }}
            title="弹窗"
            description=""
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Repository;
