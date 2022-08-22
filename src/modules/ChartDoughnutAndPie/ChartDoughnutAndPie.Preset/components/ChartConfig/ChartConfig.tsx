import { Form, Input, Radio, Select, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useState } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { fliterValues } from '../helper';
import BorderDash from './BorderDash';
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
  const [chartType, setChartType] = useState<string>();

  useEffect(() => {
    if (defaultValue?.type) {
      setChartType(defaultValue.type)
    }
  }, [defaultValue])

  const handleChange = useCallback(
    () => {
      const values = fliterValues(form.getFieldsValue());
      setChartType(values.type)
      // values.borderDash = [Number(values.borderDash.width) || undefined, Number(values.borderDash.space) || undefined];
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
        <Form.Item label="类型" name="type">
          <Radio.Group size="small">
            <Radio.Button value="line">折线</Radio.Button>
            <Radio.Button value="bar">柱状</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item />
        {chartType === 'bar' ? <>
          <Form.Item label="背景色" name="backgroundColor" >
            <Color />
          </Form.Item>
          <Form.Item label="悬停背景色" name="hoverBackgroundColor" >
            <Color />
          </Form.Item>
          <Form.Item label="边框色" name="borderColor" >
            <Color />
          </Form.Item>
          <Form.Item label="悬停边框色" name="hoverBorderColor" >
            <Color />
          </Form.Item>

          <Form.Item label="宽度" name="barThickness" >
            <Input size="small" placeholder="柱宽度" type={'number'} />
          </Form.Item>
          <Form.Item label="缩放" name="barPercentage" >
            <Input size="small" min={0.1} step={0.1} max={1} placeholder="宽度缩放比例" type={'number'} />
          </Form.Item>
          <Form.Item label="圆角" name="borderRadius" >
            <Input size="small" placeholder="柱圆角" type={'number'} />
          </Form.Item>
          <Form.Item label="悬停圆角" name="hoverBorderRadius" >
            <Input size="small" placeholder="悬停圆角" type={'number'} />
          </Form.Item>
          
          <Form.Item label="忽略边框" name="borderSkipped" >
            <Select placeholder="忽略边框" size="small">
              <Select.Option value="start">开始</Select.Option>
              <Select.Option value="end">结束</Select.Option>
              <Select.Option value="middle">中间</Select.Option>
              <Select.Option value="bottom">底部</Select.Option>
              <Select.Option value="left">左边</Select.Option>
              <Select.Option value="top">顶部</Select.Option>
              <Select.Option value="right">右边</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="占用比" name="categoryPercentage" >
            <Input
              size="small"
              min={0.1} step={0.1}
              max={1}
              placeholder="未设置宽度时有效"
              type={'number'}
            />
          </Form.Item>
          {/* <Form.Item label="clip" name="clip" >
            <Input size="small" placeholder="clip" type={'number'} />
          </Form.Item> */}
          <Form.Item label="边框粗细" name="borderWidth" >
            <Input size="small" placeholder="边框粗细" type={'number'} />
          </Form.Item>
          <Form.Item label="悬停边框粗细" name="hoverBorderWidth" >
            <Input size="small" placeholder="hoverBorderWidth" type={'number'} />
          </Form.Item>
          <Form.Item label="最大宽度" name="maxBarThickness" >
            <Input size="small" placeholder="柱子最大宽度" type={'number'} />
          </Form.Item>
          <Form.Item label="基线" name="base" >
            <Input size="small" placeholder="起始基线" type={'number'} />
          </Form.Item>
        </> : null}
        {/**上面是分割线-------------- */}
        {
          chartType === 'line' ?
            <>
              <Form.Item label={<b>连线</b>} />
              <Form.Item />
              <Form.Item name="showLine" valuePropName="checked">
                <Checkbox>显示连线</Checkbox>
              </Form.Item>
              <Form.Item label="边框色" name="borderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="粗细" name="borderWidth" >
                <Input size="small" placeholder="边框宽度" type={'number'} />
              </Form.Item>
              <Form.Item label="悬停粗细" name="hoverBorderWidth" >
                <Input size="small" placeholder="悬停时边框宽度" type={'number'} />
              </Form.Item>
              <Form.Item label="折点样式" name="borderJoinStyle" >
                <Select placeholder="连线折点样式" size="small">
                  <Select.Option value="butt">斜切</Select.Option>
                  <Select.Option value="round">圆角</Select.Option>
                  <Select.Option value="square">方角</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="折点悬停样式" name="hoverBorderJoinStyle" >
                <Select placeholder="悬停样式" size="small">
                  <Select.Option value="butt">斜切</Select.Option>
                  <Select.Option value="round">圆角</Select.Option>
                  <Select.Option value="square">方角</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="虚线" name="borderDash" >
                <BorderDash />
              </Form.Item>
              <Form.Item label="虚线偏移" name="borderDashOffset" >
                <Input size="small" placeholder="虚线偏移" type={'number'} />
              </Form.Item>
              <Form.Item label="端点样式" name="borderCapStyle" >
                <Select placeholder="端点样式" size="small">
                  <Select.Option value="butt">斜切</Select.Option>
                  <Select.Option value="round">圆角</Select.Option>
                  <Select.Option value="square">方角</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="悬停端点样式" name="hoverBorderCapStyle" >
                <Select placeholder="悬停端点样式" size="small">
                  <Select.Option value="butt">斜切</Select.Option>
                  <Select.Option value="round">圆角</Select.Option>
                  <Select.Option value="square">方角</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="悬停虚线" name="hoverBorderDash" >
                <Input size="small" placeholder="悬停虚线" />
              </Form.Item>
              <Form.Item label="悬停虚线偏移" name="hoverBorderDashOffset" >
                <Input size="small" placeholder="悬停虚线偏移" type={'number'} />
              </Form.Item>
              <Form.Item label="张力" name="tension" >
                <Input size="small" placeholder="贝兹曲线" type={'number'} min={0} step={0.1} max={1} />
              </Form.Item>
              <Form.Item />
              <Form.Item label={<b>背景</b>} />
              <Form.Item />
              <Form.Item name="fill" valuePropName="checked">
                <Checkbox>填充</Checkbox>
              </Form.Item>
              <Form.Item label="背景色" name="backgroundColor" >
                <Color />
              </Form.Item>
              {/* <Form.Item label="clip" name="clip" >
                <Input size="small" placeholder="clip" type={'number'} />
              </Form.Item> */}
              {/* <Form.Item label="三维插值模式" name="cubicInterpolationMode" >
                <Select placeholder="三维插值模式" size="small">
                  <Select.Option value="default">default</Select.Option>
                  <Select.Option value="monotone">monotone</Select.Option>
                </Select>
              </Form.Item> */}
              {/* <Form.Item name="drawActiveElementsOnTop" valuePropName="checked">
                <Checkbox>drawActiveElementsOnTop</Checkbox>
              </Form.Item> */}
              <Form.Item label={<b>节点</b>} />
              <Form.Item />
              <Form.Item label="背景色" name="pointBackgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="悬停背景色" name="pointHoverBackgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="边框颜色" name="pointBorderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="悬停边框色" name="pointHoverBorderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="边宽" name="pointBorderWidth" >
                <Input size="small" placeholder="节点边宽" type={'number'} />
              </Form.Item>
              <Form.Item label="悬停边宽" name="pointHoverBorderWidth" >
                <Input size="small" placeholder="悬停时边宽大小" type={'number'} />
              </Form.Item>
              <Form.Item label="半径" name="pointRadius" >
                <Input size="small" placeholder="节点半径" type={'number'} />
              </Form.Item>
              <Form.Item label="悬停半径" name="pointHoverRadius" >
                <Input size="small" placeholder="悬停时节点半径" type={'number'} />
              </Form.Item>
              <Form.Item label="角度" name="pointRotation" >
                <Input size="small" placeholder="节点旋转角度" type={'number'} />
              </Form.Item>
              <Form.Item label="节点样式" name="pointStyle" >
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
              <Form.Item label="交互半径" name="pointHitRadius" >
                <Input size="small" placeholder="标事件的反应半径" type={'number'} />
              </Form.Item>
            </> : null
        }
      </Form>
    </div>
  );
};

export default ChartConfig;
