import { Form, Input, Select, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { fliterValues } from '../helper';
import s from './Legend.module.scss';

interface Value {
  display?: boolean;
  position?: string;
  labels?: {
    color?: string;
    usePointStyle?: boolean;
  }
}

interface Props {
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}

const Legend: React.FC<Props> = ({ onChange, defaultValue }) => {
  const [form] = useForm();
  const handleChange = useCallback(
    () => {
      const { labels, display,  position} = form.getFieldsValue();
      const labelsRes = fliterValues(labels);
      onChange?.({
        ...fliterValues({display,  position}),
        labels: labelsRes
      });
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
      {/* options.plugins.legend.display */}
      <Form.Item label="显示" name="display" valuePropName="checked">
        <Switch size="small" />
      </Form.Item>
      {/* options.plugins.legend.position */}
      <Form.Item label="位置" name="position">
        <Select size="small" style={{width: "100px"}}>
          <Select.Option value="top">上</Select.Option>
          <Select.Option value="bottom">下</Select.Option>
          <Select.Option value="left">左</Select.Option>
          <Select.Option value="right">右</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item >
      {/* options.plugins.legend.labels.color */}
      <Input.Group compact>
        <Form.Item label="文字颜色" name={["labels", "color"]} style={{width: '130px'}} >
          <Color />
        </Form.Item>
        {/* options.plugins.legend.labels.usePointStyle */}
        <Form.Item
          label="数据节点样式"
          name={["labels", "usePointStyle"]}
          valuePropName="checked"
        >
          <Switch size="small" />
        </Form.Item>
      </Input.Group>
      </Form.Item>
    </Form>
  )
}

export default Legend;
