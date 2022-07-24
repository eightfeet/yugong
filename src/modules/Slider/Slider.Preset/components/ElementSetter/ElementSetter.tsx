import { ArrowLeftOutlined, CodeOutlined } from '@ant-design/icons';
import { Col, Drawer, Input, Row, PageHeader } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import NumberInput from '~/components/MiniDashboard/NumberInput';
import { AnyObjectType } from '~/types/appData';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';
import { ParallaxConfig } from '../../ParallaxConfig';
import JsonDataEditor from '~/components/MiniDashboard/JsonDataEditor';
import ElementStyleSheetPanel from '../ElementStyleSheetPanel';
import s from './ElementSetter.module.scss';

interface Props {
  onClose: () => void;
  visible: boolean;
  title: string;
}

const ElementSetter: React.FC<Props> = ({ title, visible, onClose }) => {
  const [hideCode, setHideCode] = useState(false);
  const { content, style, link, setContentAndStyle } = useContext(ContentAndStyleContext);
  const { parallax, setParallax } = useContext(ParallaxConfig);

  const [currentCode, setCurrentCode] = useState<{
    name: string;
    data: { [keys: string]: any };
  }>();

  const handleShowCode = useCallback(
    (name, data = {}) => {
      setCurrentCode({
        name,
        data
      });
      setHideCode(true);
    },
    [],
  )

  const onChange = useCallback(
    (data: AnyObjectType) => {
      if (currentCode?.name === 'style') {
        setContentAndStyle?.('style', data)
      }
      if (currentCode?.name === 'parallax') {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (element) {
              setParallax?.(key as any, element)
            }
          }
        }
      }
      setHideCode(false);
    },
    [currentCode?.name, setContentAndStyle, setParallax],
  )

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
          <PageHeader className={s.header} title="视差初始值" extra={<CodeOutlined onClick={() => handleShowCode('parallax', parallax)} />} />
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
            min={0.001}
            max={1}
            defaultValue={parallax?.opacity}
            onChange={(e: any) => setParallax?.('opacity', e || '0.001')}
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
        <PageHeader className={s.header} title="链接" />
        <Input
          placeholder='输入链接地址'
          value={link}
          onChange={(e) => setContentAndStyle?.('click', e.target.value)}
        />
      </Row>
      <Row className={s.row}>
        <Col span={24}><PageHeader className={s.header} title="元素样式" extra={<CodeOutlined onClick={() => handleShowCode('style', style)} />} /></Col>
      </Row>
      <ElementStyleSheetPanel />
      <JsonDataEditor
        data={currentCode?.data}
        okText="确定" 
        cancelText="取消" 
        visible={hideCode} 
        onConfirm={onChange} 
        onCancel={() => setHideCode(false)} 
        title="数据编辑" />
    </Drawer>
  );
};

export default ElementSetter;
