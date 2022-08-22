import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableElement from './SortableElement';
import SortableItem from './SortableItem';

interface Props {
  data: any[];
}

const SortableList: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <SortableItem key={index} index={index}>
          <SortableElement index={index} item={item} />
        </SortableItem>
      ))}
    </div>
  );
};

export default SortableContainer(SortableList);
