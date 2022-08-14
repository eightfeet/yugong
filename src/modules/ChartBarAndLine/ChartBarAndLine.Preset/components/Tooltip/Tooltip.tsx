import { Form, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { fliterValues } from '../helper';
import s from './Tooltip.module.scss';

interface Value {
  enabled?: boolean;
  backgroundColor?: string;
  bodyColor?: string;
  usePointStyle?: boolean;
}

interface Props {
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}

const Tooltip: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [form] = useForm();
  const handleChange = useCallback(
    () => {
      const values = form.getFieldsValue();
      onChange?.(fliterValues(values));
    },
    [form, onChange],
  )

  return (
    <Form
      className={s.wrap}
      layout="inline"
      form={form}
      initialValues={defaultValue}
      onFieldsChange={handleChange}
    >
      {/* options.plugins.tooltip.enabled */}
      <Form.Item label="启用" name="enabled" valuePropName="checked">
        <Switch size="small" />
      </Form.Item>
      {/* options.plugins.tooltip.backgroundColor */}
      <Form.Item label="背景颜色" name="backgroundColor" >
        <Color />
      </Form.Item>
      {/* options.plugins.tooltip.bodyColor */}
      <Form.Item label="文字颜色" name="bodyColor">
        <Color />
      </Form.Item>
      {/* options.plugins.tooltip.usePointStyle */}
      <Form.Item label="数据节点样式" name="usePointStyle" valuePropName="checked">
        <Switch size="small" />
      </Form.Item>
    </Form>
  )
}

export default Tooltip;