import { Form, Input, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames';
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
  ticks?: {
    color?: string
  }
}

interface Props {
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}
const ChartOptionItem: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [form] = useForm();

  const handleChange = useCallback(
    () => {
      const {ticks, grid, min, max, ...other } = form.getFieldsValue();
      const res = {
        ticks: fliterValues(ticks),
        grid: fliterValues(grid),
        min: min ? Number(min) : null,
        max: max ? Number(max) : null,
        ...other
      }
      onChange?.(res);
    },
    [form, onChange],
  )
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className={s.form}
      initialValues={defaultValue}
      onFieldsChange={handleChange}
      form={form}
    >
      {/* options.scales[scaleId].grid */}
      <Form.Item label="空心半径" className={s.item} name="cutout">
          <Input type="number" min={0} max={100} addonAfter="%" />
        </Form.Item>
        <Form.Item label="半径" className={s.item} name="radius">
          <Input type="number" min={0} max={100} addonAfter="%" />
        </Form.Item>
        <Form.Item label="完整角度" className={s.item} name="circumference">
          <Input type="number" min={0} max={360} addonAfter="deg" />
        </Form.Item>
        <Form.Item label="旋转角度" className={s.item} name="rotation">
          <Input type="number" addonAfter="deg" />
        </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;


// cutout: 60,
// radius: '100%',
// circumference: 360,