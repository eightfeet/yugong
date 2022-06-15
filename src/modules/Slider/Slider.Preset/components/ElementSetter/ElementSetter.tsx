import { Col, Drawer, Input, Row, PageHeader } from 'antd';
import React, { useContext } from 'react';
import NumberInput from '~/components/MiniDashboard/NumberInput';
import UnitInput from '~/components/MiniDashboard/UnitInput';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';
import { ParallaxConfig } from '../../ParallaxConfig';
import ElementStyleSheetPanel from '../ElementStyleSheetPanel';
import s from './ElementSetter.module.scss';

interface Props {
  onClose: () => void;
  visible: boolean;
  title: string;
}

const ElementSetter: React.FC<Props> = ({ title, visible, onClose }) => {
  const { content, setContentAndStyle } = useContext(ContentAndStyleContext);
  const { parallax, setParallax } = useContext(ParallaxConfig);

  return (
    <Drawer
      title={title}
      placement="right"
      bodyStyle={{
        padding: 0,
        backgroundColor: '#fafafa'
      }}
      width={580}
      mask={false}
      maskClosable
      onClose={onClose}
      visible={visible}
    >
      <Row className={s.row}>
        <PageHeader className={s.header} title="文本内容" />
        <Input.TextArea
          value={content}
          onChange={(e) => setContentAndStyle?.('content', e.target.value)}
        />
      </Row>
      <Row className={s.row}>
        <Col span={24}>
          <PageHeader className={s.header} title="视觉差" />
        </Col>
        <Col span={12}>
          <UnitInput min={0} label="X方向" defaultValue={parallax?.x} onChange={e => setParallax?.('x', e)} />
        </Col>
        <Col span={12}>
          <UnitInput min={0} label="Y方向" defaultValue={parallax?.y} onChange={e => setParallax?.('y', e)} />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="缩放"
            placeholder="缩放倍数"
            unit="倍"
            min={-12}
            max={12}
            defaultValue={parallax?.scale}
            onChange={(e: any) => setParallax?.('scale', e)}
          />
        </Col>
        <Col span={12}>
          <Row gutter={4}>
            <Col className={s.label} span={7}>透明度</Col>
            <Col span={17}><Input value={parallax?.opacity} type={'number'} min={0} max={1} onChange={e => setParallax?.('opacity', e.target.value)} /></Col>
          </Row>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="延时"
            placeholder="延时时长(ms)"
            unit="毫秒"
            min={0}
            defaultValue={parallax?.duration}
            onChange={(e: any) => setParallax?.('duration', e)}
          />
        </Col>
        <Col span={12} />
      </Row>

      <Row className={s.row}>
        <PageHeader className={s.header} title="元素样式" />
      </Row>
      <ElementStyleSheetPanel />

    </Drawer>
  );
};

export default ElementSetter;
