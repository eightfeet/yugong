import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DataElement from './DataElement';
import SortableItem from './SortableItem';

interface Props {
  data: any[];
}

const SortableList: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <SortableItem key={index} index={index}>
          <DataElement index={index} item={item} />
        </SortableItem>
      ))}
    </div>
  );
};

export default SortableContainer(SortableList);
