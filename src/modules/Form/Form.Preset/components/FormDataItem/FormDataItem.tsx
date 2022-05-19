import { CaretDownOutlined, CaretRightOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import { FormModuleContext } from '../../FormModuleContext';
import LineItem from '../LineItem/LineItem';
import SubItem from '../SubItem';
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

const FormDataItem: React.FC<Props> = ({ onMinus, value, order }) => {
  const { onChangeRunningData, runningData, dataPath } = useContext(FormModuleContext)
  const onChange = useCallback(
    (data: {[keys: string]: any}) => {
      if (!runningData) return;
      const operateData = cloneDeep(runningData)
      const itemPath = `${dataPath}[${order - 1}]`;
      const itemData = get(operateData, itemPath);
      const newItemData = {
        ...itemData,
        ...data
      }
      set(operateData, itemPath, newItemData);
      onChangeRunningData?.(operateData)
    },
    [dataPath, onChangeRunningData, order, runningData],
  )
  
  const [showOptions, setShowOptions] = useState(false);
  const disabled = false;
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
        <Input
          disabled={disabled}
          className={s.inp}
          onChange={(e) => onChange({title: e.target.value})}
          value={value.title}
          placeholder="名称"
        />
        <Input name="rowMap"
          disabled={disabled}
          className={classNames(s.inp, s.nbl, s.nbrad)}
          onChange={(e) => onChange({dataIndex: e.target.value})}
          value={value?.dataIndex}
          placeholder="字段"
          />
        <Button
          disabled={disabled}
          className={classNames(s.btn, s.nbl, s.nbr)}
          icon={showOptions ? <CaretDownOutlined /> : <CaretRightOutlined />}
          onClick={() => setShowOptions(!showOptions)}
        />
        <Button
          disabled={disabled}
          className={s.btn}
          icon={<MinusOutlined />}
          onClick={() => onMinus?.()}
        />
      </LineItem>
      <div style={{ display: showOptions ? 'block' : 'none' }}>
        <LineItem label="">
          <SubItem value={value} onChange={onChange} />
        </LineItem>
      </div>
    </div>
  );
};

export default SortableElement(FormDataItem);
