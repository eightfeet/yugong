import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Divider, InputNumber, Row, Select, Tooltip } from "antd";
import React from "react";
import s from "./PageSetting.module.less";
const Option = Select.Option;

interface Props {}

const units = ["px", "rem", "vw", "vh"];

const Pagesetting: React.FC<Props> = () => {
  return (
    <>
      <Divider orientation="left">单位</Divider>
      <Row gutter={4} className={s.row}>
        <Col className={s.label} span={4}>
          页面单位：
        </Col>
        <Col span={7}>
          <Select placeholder="请选择" className={s.select}>
            {units.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
        <Col className={s.info} span={1}>
          <Tooltip title={<div>终端页面显示单位</div>}>
            <InfoCircleOutlined />
          </Tooltip>
        </Col>
        <Col className={s.label} span={4}>
          编辑单位：
        </Col>
        <Col span={7}>
          <Select placeholder="请选择" className={s.select}>
            {units.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
        <Col className={s.info} span={1}>
          <Tooltip title={<div>编辑面板使用单位</div>}>
            <InfoCircleOutlined />
          </Tooltip>
        </Col>
      </Row>

      <Row gutter={4} className={s.row}>
        <Col className={s.label} span={4}>
          UI宽度：
        </Col>
        <Col span={6}>
          <InputNumber placeholder="px" className={s.num} />
        </Col>
        <Col className={s.info} span={1}>
          px
        </Col>
        <Col className={s.info} span={1}>
          <Tooltip title={<div>终端页面显示单位</div>}>
            <InfoCircleOutlined />
          </Tooltip>
        </Col>
        <Col className={s.label} span={4}>
          基准字体：
        </Col>
        <Col span={6}>
          <InputNumber placeholder="px" className={s.num} />
        </Col>
        <Col className={s.info} span={1}>
          px
        </Col>
        <Col className={s.info} span={1}>
          <Tooltip title={<div>编辑面板使用单位</div>}>
            <InfoCircleOutlined />
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default Pagesetting;
