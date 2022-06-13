import { Drawer, Input } from 'antd';
import React, { useContext } from 'react';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';
import s from './ElementSetter.module.scss';

interface Props {
  onClose: () => void;
  visible: boolean;
  title: string;
}

const ElementSetter: React.FC<Props> = ({ title, visible, onClose }) => {
  const { content, setContentAndStyle } = useContext(ContentAndStyleContext);

  return (
    <Drawer title={title} placement="right" mask={false} maskClosable onClose={onClose} visible={visible}>
      <Input.TextArea value={content} onChange={(e) => setContentAndStyle?.('content', e.target.value)} />
    </Drawer>
  )
}

export default ElementSetter;