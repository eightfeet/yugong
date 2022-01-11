import { DashOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import s from './Undo.module.scss';

interface Props {

}

const Undo: React.FC<Props> = ({ }) => {
  return (
    <>
      <Button className={s.nbdr}><UndoOutlined /></Button>
      <Button className={s.nbr}><DashOutlined /></Button>
      <Button className={s.nbdl}><RedoOutlined /></Button>
    </>
  )
}

export default Undo;