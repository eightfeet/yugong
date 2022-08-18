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
        <Form.Item label="显示" style={{ width: '100%' }} className={s.item} valuePropName="checked" name={["grid", "display"]}>
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderWidth */}
        <Form.Item label="坐标粗细" wrapperCol={{ span: 11 }} className={s.item} name={["grid", "borderWidth"]}>
          <Input size="small" type="number" min={0} />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderColor */}
        <Form.Item label="坐标颜色" className={s.item} name={["grid", "borderColor"]}>
          <Color />
        </Form.Item>
        {/* options.scales[scaleId].grid.lineWidth */}
        <Form.Item label="网格粗细" wrapperCol={{ span: 11 }} className={s.item} name={["grid", "lineWidth"]}>
          <Input size="small" type="number" min={0} />
        </Form.Item>
        {/* options.scales[scaleId].grid.color */}
        <Form.Item label="网格颜色" className={s.item} name={["grid", "color"]}>
          <Color />
        </Form.Item>
        {/* options.scales[scaleId].grid.drawTicks */}
        <Form.Item label="显示刻度" className={s.item} name={["grid", "drawTicks"]} valuePropName="checked">
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.tickColor */}
        <Form.Item label="刻度颜色" className={s.item} name={["grid", "tickColor"]}>
          <Color />
        </Form.Item>
      </Form.Item>
      {/* options.scales[scaleId].ticks */}
      <Form.Item
        className={classNames(s.wrap, s.mgt)}
        label={<b>标注</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        {/* options.scales[scaleId].ticks.color */}
        <Form.Item label="颜色" className={s.item} name={['ticks', 'color']}>
          <Color />
        </Form.Item>
        <Form.Item />
        <Form.Item label="描边粗细" wrapperCol={{ span: 11 }} className={s.item} name={['ticks', 'textStrokeWidth']}>
          <Input size="small" type="number" min={0} />
        </Form.Item>
        <Form.Item label="描边颜色" className={s.item} name={['ticks', 'textStrokeColor']}>
          <Color />
        </Form.Item>
      </Form.Item>
      <Form.Item
        className={classNames(s.wrap, s.mgt)}
        label={<b>范围</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        {/* options.scales[scaleId].ticks.color */}
        <Form.Item label="最小值" className={s.item} name={"min"} wrapperCol={{ span: 11 }} >
          <Input size="small" type="number" />
        </Form.Item>
        <Form.Item label="最大值" className={s.item} name={"max"} wrapperCol={{ span: 11 }} >
          <Input size="small" type="number" />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;


