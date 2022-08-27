import React, {  } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import MoveIcon from '~/components/Icon/MoveIcon';
import s from './SortableItem.module.scss';

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

interface Props {
}

const SortableItem: React.FC<Props> = ({ children }) => {

  return (
    <div className={s.root}>
      <DragHandle />
      {children}
    </div>
  );
};

export default SortableElement(SortableItem);
