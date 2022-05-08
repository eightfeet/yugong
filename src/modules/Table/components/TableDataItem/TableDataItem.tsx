import { CaretDownOutlined, CaretRightOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Tag } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import HtmlSuffix from '~/components/MiniDashboard/ArgumentsSetting/HtmlSuffix';
import { TableModuleContext } from '../../TableModuleContext';
import { dataType, dataTypeFormat } from '../../type';
import LineItem from '../LineItem/LineItem';
import s from './TableDataItem.module.scss';

export interface TableDataItemValue {
  headName?: string, rowMap?: string, dataType?: string, format?: string, columWidth?: string
}

interface Props {
  onChange?: (value: TableDataItemValue) => void;
  onMinus?: () => void;
  value?: TableDataItemValue;
  label?: string;
  disabled?: boolean;
}

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const TableDataItem: React.FC<Props> = ({ label, onMinus, value, onChange }) => {
  useEffect(() => {
    console.log('重新渲染');
  }, [])

  const [currentdataType, setCurrentDataType] = useState<string>(value?.dataType || '');
  const [showOptions, setShowOptions] = useState(false);
  const { disabled, dataSource } = useContext(TableModuleContext);

  const onChangeValue = useCallback((data: { [keys in keyof TableDataItemValue]?: string }) => {
    onChange?.({ ...value, ...data })
  }, [onChange, value]);

  const onChangeType = useCallback(
    (e) => {
      setCurrentDataType(e)
      onChangeValue({ dataType: e, format: undefined })
    },
    [onChangeValue],
  )

  const onChangeFormat = useCallback(
    (e) => {
      onChangeValue({ format: e })
    },
    [onChangeValue],
  )


  const renderNumber = useCallback(
    () => <Select
      placeholder="请选择数据格式"
      onChange={onChangeFormat}
      className={classNames(s.format)}
      value={value?.format}
    >
      {Object.keys(dataTypeFormat.number).map(
        key =>
          <Select.Option key={key} value={key}>
            {dataTypeFormat.number[key]}
          </Select.Option>
      )}
    </Select>,
    [onChangeFormat, value?.format],
  )

  const renderDate = useCallback(
    () => <Select
      placeholder="请选择数据格式"
      className={classNames(s.format)}
      onChange={onChangeFormat}
      value={value?.format}
    >
      {Object.keys(dataTypeFormat.date).map(
        key =>
          <Select.Option key={key} value={key}>
            {dataTypeFormat.date[key]}
          </Select.Option>
      )}
    </Select>,
    [onChangeFormat, value?.format],
  )

  return (
    <div className={s.root}>
      <LineItem label={<div className={s.dragwrap}><span className={s.drag}><DragHandle /></span>{label || '列'}</div>}>
        <Input
          disabled={disabled}
          className={s.inp}
          onChange={(e) => onChangeValue({ headName: e.target.value })}
          value={value?.headName}
          placeholder="名称"
          suffix={<HtmlSuffix />}
        />
        <Input name="rowMap"
          disabled={disabled}
          className={classNames(s.inp, s.nbl, s.nbrad)}
          onChange={(e) => onChangeValue({ rowMap: e.target.value })}
          value={value?.rowMap}
          placeholder="字段"
          suffix={
            <HtmlSuffix info={
              <>
                <div>可用字段：</div>
                <Space wrap>
                  {
                    Object.keys(dataSource?.[0] || {})?.map(key =>
                      <Tag className={s.tag} key={key} onClick={() => onChangeValue({ rowMap: `{{${key}}}` })}>
                        {`{{${key}}}`}
                      </Tag>
                    )
                  }
                </Space>
              </>
            } />
          } />
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
        <LineItem label="数据类别">
          <div className={s.datatype}>
            <Select
              className={classNames(s.nbrad)}
              style={{ flex: 'auto' }}
              disabled={disabled}
              value={value?.dataType}
              placeholder="默认为字符"
              onChange={onChangeType}>
              {
                Object.keys(dataType).map(key => <Select.Option key={key} value={key}>{dataType[key]}</Select.Option>)
              }
            </Select>
            {currentdataType === 'number' ? renderNumber() : null}
            {currentdataType === 'date' ? renderDate() : null}
          </div>
        </LineItem>
        <LineItem label="列宽">
          <Input disabled={disabled} placeholder="ex:50%或50px, 默认自动"
            value={value?.columWidth}
            onChange={(e) => onChangeValue({ columWidth: e.target.value })}
          />
        </LineItem>
      </div>
    </div>
  )
}

export default SortableElement(TableDataItem);