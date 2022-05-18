import { Input } from 'antd';
import React from 'react';
import LineItem from '../LineItem/LineItem';
import s from './SubItem.module.scss';

interface Props {
  onChange: (data: { [keys: string]: any; }) => void;
  value: {
    initialValue?: string;
    [keys: string]: any;
  }
}

const SubItem:React.FC<Props> = ({onChange, value}) => {
  const { initialValue } = value;
  return (
    <div>
      <LineItem label="初始值"><Input value={value.value} onChange={e => onChange({value: e.target.value})} /></LineItem>
      <LineItem label="数据类别">2</LineItem>
      <LineItem label="数据类别">3</LineItem>
      <LineItem label="数据类别">4</LineItem>
      <LineItem label="数据类别">5</LineItem>
      <LineItem label="数据类别">6</LineItem>
    </div>
  )
}

export default SubItem;