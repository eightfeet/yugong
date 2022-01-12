import Icon, { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import RedoIcon from './RedoIcon';

import s from './Undo.module.scss';
import UndoIcon from './UndoIcon';

interface Props {

}

const Undo: React.FC<Props> = ({ }) => {
  return (
    <>
    <Button className={s.nbdr} icon={<Icon component={UndoIcon} />} />
      <Dropdown className={s.nbr} overlay={
        <Menu>
          <Menu.Item>
            1st menu item
          </Menu.Item>
        </Menu>
      } ><Button ><EllipsisOutlined /></Button></Dropdown>
      <Button className={s.nbdl} icon={<Icon component={RedoIcon} />} />
    </>
  )
}

export default Undo;
