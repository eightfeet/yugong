import { Col, Drawer, Input, Row, Divider } from 'antd';
import React, { useContext } from 'react';
import UnitInput from '~/components/MiniDashboard/UnitInput';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';
import LineItem from '../LineItem';
import s from './ElementSetter.module.scss';

interface Props {
  onClose: () => void;
  visible: boolean;
  title: string;
}

const ElementSetter: React.FC<Props> = ({ title, visible, onClose }) => {
  const { content, setContentAndStyle } = useContext(ContentAndStyleContext);

  return (
    <Drawer
      title={title}
      placement="right"
      width={580}
      mask={false}
      maskClosable
      onClose={onClose}
      visible={visible}
    >
      <Divider orientation="left">文本内容</Divider>
      <Input.TextArea
        value={content}
        onChange={(e) => setContentAndStyle?.('content', e.target.value)}
      />
      <Divider orientation="left">视觉差</Divider>
      <Row className={s.row}>
        <Col span={12}>
          <UnitInput min={0} label="X方向" />
        </Col>
        <Col span={12}>
          <UnitInput min={0} label="Y方向" />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Row gutter={4}>
            <Col className={s.label} span={7}>缩放</Col>
            <Col span={17}><Input type={'number'} /></Col>
          </Row>
        </Col>
        <Col span={12}>
          <UnitInput min={0} label="透明度" />
        </Col>
      </Row>
    </Drawer>
  );
};

export default ElementSetter;
