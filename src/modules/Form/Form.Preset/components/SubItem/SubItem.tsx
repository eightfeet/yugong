import { Button, Input, Select, Switch } from 'antd';
import React, { useCallback, useState } from 'react';
import { AnyObjectType } from '~/types/appData';
import valueTypes from '../../valueTypes';
import LineItem from '../LineItem/LineItem';
import ValueEnumModal from '../ValueEnumModal';
import s from './SubItem.module.scss';

export interface SubItemValue {
  initialValue?: string;
  fieldProps?: AnyObjectType;
  formItemProps?: AnyObjectType;
  required?: boolean;
  [keys: string]: any;
}

interface Props {
  onChange: (data: SubItemValue) => void;
  value: SubItemValue
}

const valueEnumList = ['select', 'checkbox', 'radio', 'radioButton'];

const SubItem:React.FC<Props> = ({onChange, value}) => {
  const { initialValue, fieldProps={}, formItemProps={}, valueType } = value;
  const [showModal, setShowModal] = useState(false);
  
  const changeFormItemProps = useCallback(
    (key: string, value: any) => {
      if (key === 'placeholder') {
        const data = {...fieldProps, placeholder: value};
        onChange({'fieldProps': data})
      } else if(key === 'required' || key === 'message') {
        const data = {...formItemProps, rules: value ? [{
          ...formItemProps?.rules?.[0],
          [key]: value
        }] : null};
        onChange({'formItemProps': data})
      } else {
        onChange({[key]: value})
      }
    },
    [fieldProps, formItemProps, onChange],
  )
  
  return (
    <div>
      <LineItem label="字段类型">
        <Select 
          placeholder="字段类型,默认文本框" 
          value={valueType} 
          style={{width: '100%'}}
          onChange={e => changeFormItemProps('valueType', e)}
        >
          {
            Object.keys(valueTypes).map(key => (
              <Select.Option value={key} key={key}>
                {valueTypes[key]}
              </Select.Option>
            ))
          }
        </Select>
      </LineItem>
      {valueEnumList.includes(valueType) ? <LineItem label="枚举属性">
        <Button onClick={() => setShowModal(true)}>编辑属性</Button>
      </LineItem> : null}
      <LineItem label="占位描述">
        <Input value={fieldProps?.placeholder} onChange={e => changeFormItemProps('placeholder', e.target.value)} />
      </LineItem>
      <LineItem label="初始值">
        <Input value={initialValue} onChange={(e) => changeFormItemProps('initialValue', e.target.value)} />
      </LineItem>
      <LineItem label="验证必填">
        <div className={s.validate}>
          <Switch 
            className={s.switch}
            checkedChildren="开" 
            unCheckedChildren="关" 
            defaultChecked={formItemProps?.rules?.[0]?.required}
            onChange={(e) => changeFormItemProps('required', e)}
          />
          <Input 
            disabled={!formItemProps?.rules?.[0]?.required} 
            onChange={(e) => changeFormItemProps('message', e.target.value)} 
          />
        </div>
      </LineItem>
      <ValueEnumModal 
        title={`${value.title || ''}[${value.dataIndex || ''}]-选择属性`} 
        okText="确定"
        cancelText="取消"
        visible={showModal} 
        onCancel={() => setShowModal(false)}
      />
    </div>
  )
}

export default SubItem;