import { Input } from 'antd';
import React, { useCallback } from 'react';
// import s from './BorderDash.module.scss';

interface Props {
  defaultValue?: number[];
  value?: number[];
  onChange?: (value: number[]) => {}
}

const BorderDash: React.FC<Props> = ({ defaultValue, value, onChange }) => {
  const handleChange = useCallback(
    (index, value) => {
      const val = [...value || []];
      val[index] = value;
      onChange?.(val)
    },
    [onChange],
  )
  
  return (
    <div>
      <Input size="small"
        placeholder="宽度"
        type={'number'}
        style={{ width: '50%' }}
        min={0}
        value={value?.[0]}
        defaultValue={defaultValue?.[0]}
        onChange={e => handleChange(0, e.target.value)}
      />
      <Input size="small"
        placeholder="间隔"
        type={'number'}
        style={{ width: '50%', borderLeft: 'none' }}
        min={0}
        value={value?.[1]}
        defaultValue={defaultValue?.[1]} 
        onChange={e => handleChange(1, e.target.value)}
      />
    </div>
  )
}

export default BorderDash;