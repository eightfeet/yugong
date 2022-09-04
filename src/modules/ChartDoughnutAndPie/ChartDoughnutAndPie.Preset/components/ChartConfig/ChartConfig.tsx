import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { fliterValues } from '../helper';
import s from './ChartConfig.module.scss';

interface Value {
  display?: boolean;
  borderWidth?: number;
  borderColor?: string;
  lineWidth?: number;
  color?: string;
  drawTicks?: boolean;
  tickColor?: boolean;
  type?: 'line' | 'bar'
}

interface Props {
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}

const ChartConfig: React.FC<Props> = ({ onChange, defaultValue }) => {
  const [form] = useForm();

  const handleChange = useCallback(
    () => {
      const values = fliterValues(form.getFieldsValue());
      onChange?.(values);
    },
    [form, onChange],
  )
  return (
    <div className={s.root}>
      <Form
        className={s.form}
        initialValues={defaultValue}
        onFieldsChange={handleChange}
        layout="inline"
        form={form}
      >
        <Form.Item label="边框色" name="borderColor" >
          <Color />
        </Form.Item>
        <Form.Item label="悬停边框色" name="hoverBorderColor" >
          <Color />
        </Form.Item>
        <Form.Item label="描边方式" name="borderAlign" >
          <Select placeholder="描边方式" size="small">
            <Select.Option value="inner">内描边</Select.Option>
            <Select.Option value="center">居中</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="圆角" name="borderRadius" >
          <Input size="small" min={0} placeholder="圆角" type={'number'} />
        </Form.Item>

        <Form.Item label="边宽" name="borderWidth" >
          <Input size="small" min={-1} placeholder="边宽宽度" type={'number'} />
        </Form.Item>
        <Form.Item label="间隔" name="spacing" >
          <Input size="small" min={0} placeholder="间隔" type={'number'} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChartConfig;
