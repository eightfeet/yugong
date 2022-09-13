import React from 'react';
import s from './DataElement.module.scss';

interface Props {
  index: number;
  item: {
    title:string;
    file: string;
  };
}

const DataElement:React.FC<Props> = ({ item }) => {
  return (
    <div>
      {item.title}
      {item.file}
    </div>
  )
}

export default DataElement;