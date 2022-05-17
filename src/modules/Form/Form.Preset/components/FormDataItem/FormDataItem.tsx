import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import LineItem from '../LineItem/LineItem';
import s from './FormDataItem.module.scss';

interface Props {
  [keys: string]: any;
}

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const FormDataItem: React.FC<Props> = ({onMinus}) => {
  return (
    <div className={s.root}>
      <LineItem
        label={
          <div className={s.dragwrap}>
            <span className={s.drag}>
              <DragHandle />
            </span>
            第1项
          </div>
        }
      >
        内容
        <Button
          disabled={false}
          className={s.btn}
          icon={<MinusOutlined />}
          onClick={() => onMinus?.()}
        />
      </LineItem>
    </div>
  );
};

export default SortableElement(FormDataItem);
