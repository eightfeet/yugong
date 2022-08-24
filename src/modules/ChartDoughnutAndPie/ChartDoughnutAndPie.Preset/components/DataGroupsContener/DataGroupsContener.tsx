import React, {  } from 'react';
import s from './DataGroupsContener.module.scss';
import SortableContener from './SortableContener';

interface Props {
  items: any[],
  index: number,
}

const DataGroupsContener: React.FC<Props> = ({items, index}) => {
  return (
    <div className={s.root}>
      <SortableContener items={items} index={index} />
    </div>
  );
};

export default DataGroupsContener;
