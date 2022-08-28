import { Form, Input, Select, Switch } from 'antd';
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
      const { ticks, grid, min, max, legend, ...other } = form.getFieldsValue();
      const { labels, ...otherLeg } = legend;
      const res = {
        ticks: fliterValues(ticks),
        grid: fliterValues(grid),
        legend: {
          labels: fliterValues(labels),
          ...fliterValues(otherLeg)
        },
        min: min ? Number(min) : null,
        max: max ? Number(max) : null,
        ...other
      }
      console.log(7777, res);

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
      <Form.Item label={<b>图例</b>} className={s.wrap}>
        <Form.Item label="显示" name={["legend", "display"]} valuePropName="checked">
          <Switch size="small" />
        </Form.Item>
        {/* options.plugins.legend.position */}
        <Form.Item label="位置" name={["legend", "position"]}>
          <Select size="small" style={{ width: "100px" }}>
            <Select.Option value="top">上</Select.Option>
            <Select.Option value="bottom">下</Select.Option>
            <Select.Option value="left">左</Select.Option>
            <Select.Option value="right">右</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="文字颜色" name={["legend", "labels", "color"]}>
          <Color />
        </Form.Item>
        <Form.Item
          label="数据节点样式"
          name={["legend", "labels", "usePointStyle"]}
          valuePropName="checked"
        >
          <Switch size="small" />
        </Form.Item>
      </Form.Item>
      <Form.Item label={<b>图形</b>} className={s.wrap}>
        <Form.Item label="半径" name="radius">
          <Input type="number" min={0} max={100} addonAfter="%" />
        </Form.Item>
        <Form.Item label="空心半径" name="cutout">
          <Input type="number" min={0} max={100} addonAfter="%" />
        </Form.Item>

        <Form.Item label="完整角度" name="circumference">
          <Input type="number" min={0} max={360} addonAfter="deg" />
        </Form.Item>
        <Form.Item label="旋转角度" name="rotation">
          <Input type="number" addonAfter="deg" />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;


// cutout: 60,
// radius: '100%',
// circumference: 360,