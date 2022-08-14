import { Form, Input, Select, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { fliterValues } from '../helper';
import s from './ChartOptionItem.module.scss';

interface Value {
  backgroundColor?: string,
  borderColor?: string,
  borderDash?: number[],
  borderWidth?: number,
  pointHoverRadius?: number,
  pointRadius?: number,
  pointStyle?: string,
}

interface Props {
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}
const ChartOptionItem: React.FC<Props> = ({ defaultValue, onChange }) => {
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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className={s.form}
      initialValues={defaultValue}
      onFieldsChange={handleChange}
      form={form}
    >
      {/* options.scales[scaleId].grid */}
      <Form.Item
        className={s.wrap}
        label={<b>网格</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >

        {/* options.scales[scaleId].grid.display */}
        <Form.Item label="显示" style={{ width: '100%' }} className={s.item} valuePropName="checked" name="display">
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderWidth */}
        <Form.Item label="坐标粗细" wrapperCol={{ span: 11 }} className={s.item} name="borderWidth">
          <Input size="small" type="number" min={0} />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderColor */}
        <Form.Item label="坐标颜色" className={s.item} name="borderColor">
          <Color />
        </Form.Item>
        {/* options.scales[scaleId].grid.lineWidth */}
        <Form.Item label="网格粗细" wrapperCol={{ span: 11 }} className={s.item} valuePropName="checked" name="lineWidth">
          <Input size="small" type="number" min={0} />
        </Form.Item>
        {/* options.scales[scaleId].grid.color */}
        <Form.Item label="网格颜色" className={s.item} name="color">
          <Color />
        </Form.Item>
        {/* options.scales[scaleId].grid.drawTicks */}
        <Form.Item label="显示刻度" className={s.item} name="drawTicks">
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.tickColor */}
        <Form.Item label="刻度颜色" className={s.item} name="tickColor">
          <Color />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;
