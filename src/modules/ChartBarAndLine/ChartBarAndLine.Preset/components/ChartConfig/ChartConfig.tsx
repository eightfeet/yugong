import { Form, Input, Radio, Select, Checkbox, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useState } from 'react';
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
  const [chartType, setChartType] = useState<string>()

  const handleChange = useCallback(
    () => {
      const values = fliterValues(form.getFieldsValue());
      setChartType(values.type)
      values.borderDash = [Number(values.borderDash.width) || undefined, Number(values.borderDash.space) || undefined];
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
        form={form}
      >
        <Form.Item label="类型" name="type">
          <Radio.Group size="small">
            <Radio.Button value="line">折线</Radio.Button>
            <Radio.Button value="bar">柱状</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {chartType === 'line' ? <Form.Item name="showLine" valuePropName="checked">
          <Checkbox>显示连线</Checkbox>
        </Form.Item> : null}
        <Form.Item label="背景">
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 10 }}
              label="填充"
              style={{ width: '25%' }}
              name="fill"
              valuePropName="checked"
            >
              <Switch size="small" disabled={chartType === 'bar'} />
            </Form.Item>
            <Form.Item
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 2 }}
              name="backgroundColor"
            >
              <Color onChange={() => { }} />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="描边">
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              label="描边"
              name="borderWidth"
            >
              <Input size="small" placeholder="粗细" min={0} type={'number'} />
            </Form.Item>
            <Form.Item
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 2 }}
              name="borderColor"
            >
              <Color />
            </Form.Item>
          </div>
          <Input.Group className={s.itemlayout}>
            <Form.Item
              label="虚线"
              name={["borderDash", "width"]}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
            >
              <Input size="small" width={100} placeholder="虚线" min={0} type={'number'} />
            </Form.Item>
            <Form.Item label="间隙"
              name={["borderDash", "space"]}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="间隙" min={0} type={'number'} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="节点" >
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              label="样式"
              name="pointStyle"
            >
              <Select placeholder="请选择节点样式" size="small">
                <Select.Option value="">无</Select.Option>
                <Select.Option value="circle">圆圈</Select.Option>
                <Select.Option value="cross">十字线</Select.Option>
                <Select.Option value="crossRot">交叉线</Select.Option>
                <Select.Option value="dash">虚线</Select.Option>
                <Select.Option value="line">直线</Select.Option>
                <Select.Option value="rect">长方形</Select.Option>
                <Select.Option value="rectRounded">圆角矩形</Select.Option>
                <Select.Option value="rectRot">菱形</Select.Option>
                <Select.Option value="star">星星</Select.Option>
                <Select.Option value="triangle">三角形</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className={s.itemlayout}>
            <Form.Item
              label="半径"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              name="pointRadius"
            >
              <Input size="small" placeholder="半径" min={0} type={'number'} />
            </Form.Item>
            <Form.Item
              label="鼠标经过半径"
              labelCol={{ span: 11 }}
              wrapperCol={{ span: 11 }}
              name="pointHoverRadius"
            >
              <Input size="small" placeholder="半径" min={0} type={'number'} />
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChartConfig;
