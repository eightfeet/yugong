import React from "react";
import { Row, Col, Select, Button } from "antd";
import s from "./EventsSetting.module.less";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {}

const EventsSetting: React.FC<Props> = () => {
  return (
    <div className={s.root}>
      <div className={s.divide}>
        <div className={s.title}>事件设置</div>
        <div className={s.menu}>
          <Button size="small" icon={<PlusOutlined />} />
        </div>
      </div>
      <Row className={s.row} gutter={4}>
        <Col span={7}>
          <Select className={s.selecter} placeholder="请选择事件"></Select>
        </Col>
        <Col span={7}>
          <Select className={s.selecter} placeholder="请选择模块"></Select>
        </Col>
        <Col span={7}>
          <Select className={s.selecter} placeholder="请选择方法"></Select>
        </Col>
        <Col span={3}>
          <Button size="small" icon={<MinusOutlined />} />
        </Col>
      </Row>
    </div>
  );
};

export default EventsSetting;
