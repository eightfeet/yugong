import { Input } from 'antd';
import React, { useCallback } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import s from './SortableList.module.scss';

interface Props {
  data: any[]
}

const SortableList:React.FC<Props> = ({data}) => {
  return (
    <div>
       {data.map((item, index) => <SortableItem index={index} ><Input addonAfter={<span style={{color: '#ddd'}}>label</span>} value={item} /></SortableItem>)}
    </div>
  )
}

export default SortableContainer(SortableList);
