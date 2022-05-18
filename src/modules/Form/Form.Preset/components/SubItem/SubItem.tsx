import React from 'react';
import LineItem from '../LineItem/LineItem';
import s from './SubItem.module.scss';

interface Props {
  onChange: (data: { [keys: string]: any; }) => void;
}

const SubItem:React.FC<Props> = ({onChange}) => {
  return (
    <div>
      <LineItem label="数据类别">1</LineItem>
      <LineItem label="数据类别">2</LineItem>
      <LineItem label="数据类别">3</LineItem>
      <LineItem label="数据类别">4</LineItem>
      <LineItem label="数据类别">5</LineItem>
      <LineItem label="数据类别">6</LineItem>
    </div>
  )
}

export default SubItem;