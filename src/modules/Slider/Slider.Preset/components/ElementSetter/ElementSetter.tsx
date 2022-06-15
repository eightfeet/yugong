import { ArrowLeftOutlined, BackwardFilled, BackwardOutlined, StepBackwardOutlined } from '@ant-design/icons';
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
      maskStyle={{ backgroundColor: 'transparent' }}
      width={580}
      maskClosable
      onClose={onClose}
      visible={visible}
      closeIcon={<><ArrowLeftOutlined />返回</>}
    >
      <Row className={s.row}>
        <PageHeader className={s.header} title="内容" />
        <Input.TextArea
          placeholder='输入文本或HTML'
          value={content}
          onChange={(e) => setContentAndStyle?.('content', e.target.value)}
        />
      </Row>
      <Row className={s.row}>
        <Col span={24}>
          <PageHeader className={s.header} title="视差初始值" />
        </Col>
        <Col span={12}>
          <NumberInput
            label="X方向"
            placeholder="X方向"
            unit="-"
            defaultValue={parallax?.x}
            onChange={(e: any) => setParallax?.('x', e)}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="Y方向"
            placeholder="Y方向"
            unit="-"
            defaultValue={parallax?.y}
            onChange={(e: any) => setParallax?.('y', e)}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="缩放"
            placeholder="缩放倍数"
            unit="倍"
            defaultValue={parallax?.scale}
            onChange={(e: any) => setParallax?.('scale', e)}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="透明度"
            placeholder="透明度"
            unit="0-1"
            min={0}
            max={1}
            defaultValue={parallax?.opacity}
            onChange={(e: any) => setParallax?.('opacity', e)}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="持续时长"
            placeholder="持续时长(ms)"
            unit="毫秒"
            min={0}
            defaultValue={parallax?.duration}
            onChange={(e: any) => setParallax?.('duration', e)}
          />
        </Col>
        <Col span={12} >
          <NumberInput
              label="延时"
              placeholder="延时时长(ms)"
              unit="毫秒"
              min={0}
              defaultValue={parallax?.delay}
              onChange={(e: any) => setParallax?.('delay', e)}
            />
        </Col>
      </Row>

      <Row className={s.row}>
        <PageHeader className={s.header} title="元素样式" />
      </Row>
      <ElementStyleSheetPanel />

    </Drawer>
  );
};

export default ElementSetter;
