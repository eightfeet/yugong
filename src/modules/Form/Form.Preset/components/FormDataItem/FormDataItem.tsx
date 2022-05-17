import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import LineItem from '../LineItem/LineItem';
import s from './FormDataItem.module.scss';

interface Props {
  value: {
    dataIndex?: string
    dependencies?: string
    title?: string
    tooltip?: string
    valueEnum?: { [keys: string]: any; }
    valueType?: string,
    width?: string,
  }
  order: number,
  [keys: string]: any;
}



const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const FormDataItem: React.FC<Props> = ({ onMinus, value, index, order }) => {
  return (
    <div className={s.root}>
      <LineItem
        label={
          <div className={s.dragwrap}>
            <span className={s.drag}>
              <DragHandle />
            </span>
            第{order}项
          </div>
        }
      >
        {value.title}
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
