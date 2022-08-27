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
      const { ticks, grid, angleLines, pointLabels, min, max, ...other } = form.getFieldsValue();
      const res = {
        ticks: fliterValues(ticks),
        grid: fliterValues(grid),
        angleLines: fliterValues(angleLines),
        pointLabels: fliterValues(pointLabels),
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
      <Form.Item
        className={s.wrap}
        label={<b>标签</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="显示" className={s.item} valuePropName="checked" name={["pointLabels", "display"]}>
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="颜色" className={s.item} name={["pointLabels", "color"]}>
          <Color />
        </Form.Item>
        <Form.Item label="背景颜色" className={s.item} name={["pointLabels", "backdropColor"]}>
          <Color />
        </Form.Item>
        <Form.Item label="圆角" className={s.item} name={["pointLabels", "borderRadius"]}>
          <Input size="small" type="number" min={0} />
        </Form.Item>
        <Form.Item label="加粗" className={s.item} name={["pointLabels", "font", "weight"]}>
          <Select size="small" style={{ width: "100px" }}>
            <Select.Option value="normal">正常</Select.Option>
            <Select.Option value="bold">加粗</Select.Option>
            <Select.Option value="bolder">更粗</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="边距" className={s.item} name={["pointLabels", "backdropPadding"]}>
          <Input size="small" type="number" min={0} />
        </Form.Item>
      </Form.Item>
      <Form.Item
        className={classNames(s.wrap, s.mgt)}
        label={<b>网格</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="显示" style={{ width: '100%' }} className={s.item} valuePropName="checked" name={["grid", "display"]}>
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="坐标粗细" wrapperCol={{ span: 11 }} className={s.item} name={["angleLines", "lineWidth"]}>
          <Input size="small" type="number" min={1} />
        </Form.Item>
        <Form.Item label="坐标颜色" className={s.item} name={["angleLines", "color"]}>
          <Color />
        </Form.Item>
        <Form.Item label="网格粗细" wrapperCol={{ span: 11 }} className={s.item} name={["grid", "lineWidth"]}>
          <Input size="small" type="number" min={1} />
        </Form.Item>
        <Form.Item label="网格颜色" className={s.item} name={["grid", "color"]}>
          <Color />
        </Form.Item>
        <Form.Item label="标注颜色" className={s.item} name={['ticks', 'color']}>
          <Color />
        </Form.Item>
        <Form.Item label="标注背景色" className={s.item} name={['ticks', 'backdropColor']}>
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
        <Form.Item label="旋转" className={s.item} name={"startAngle"} wrapperCol={{ span: 11 }} >
          <Input size="small" type="number" />
        </Form.Item>
        <Form.Item label="步值" className={s.item} name={["ticks", "stepSize"]} wrapperCol={{ span: 11 }} >
          <Input size="small" type="number" min={1} />
        </Form.Item>
        <Form.Item label="步数" className={s.item} name={["ticks", "count"]} wrapperCol={{ span: 11 }} >
          <Input size="small" type="number" min={1} />
        </Form.Item>

      </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;




