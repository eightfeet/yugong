import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import MoveIcon from '../MoveIcon';
import s from './SortableItem.module.scss';

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

interface Props {}

const SortableItem: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.root}>
      <DragHandle />
      {children}
      <Button className={s.btn} size="small" icon={<MinusOutlined />} />
    </div>
  );
};

export default SortableElement(SortableItem);
