import React from 'react';
import s from './RulerBar.module.scss';

interface Props {
  data?: {name: string; value: number}[]
}

const defaultData = [
  {name: "Tablet - 768px", width: 768},
  {name: "Tablet - 768px", value: 768},
];


const RulerBar:React.FC<Props> = ({ data=defaultData }) => {
  return (
    <div className={s.root}>
      asd
    </div>
  )
}

export default RulerBar;