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
          <Form.Item label="backgroundColor" name="backgroundColor" >
            <Color />
          </Form.Item>
          <Form.Item label="base" name="base" >
            <Input size="small" placeholder="base" type={'number'} />
          </Form.Item>
          <Form.Item label="barPercentage" name="barPercentage" >
            <Input size="small" placeholder="barPercentage" type={'number'} />
          </Form.Item>
          <Form.Item label="barThickness" name="barThickness" >
            <Input size="small" placeholder="barThickness" type={'number'} />
          </Form.Item>
          <Form.Item label="borderColor" name="borderColor" >
            <Color />
          </Form.Item>
          <Form.Item label="borderSkipped" name="borderSkipped" >
            <Input size="small" placeholder="borderSkipped" />
          </Form.Item>
          <Form.Item label="borderWidth" name="borderWidth" >
            <Input size="small" placeholder="borderWidth" type={'number'} />
          </Form.Item>
          <Form.Item label="borderRadius" name="borderRadius" >
            <Input size="small" placeholder="borderRadius" type={'number'} />
          </Form.Item>
          <Form.Item label="categoryPercentage" name="categoryPercentage" >
            <Input size="small" placeholder="categoryPercentage" type={'number'} />
          </Form.Item>
          <Form.Item label="clip" name="clip" >
            <Input size="small" placeholder="clip" type={'number'} />
          </Form.Item>
          <Form.Item label="hoverBackgroundColor" name="hoverBackgroundColor" >
            <Color />
          </Form.Item>
          <Form.Item label="hoverBorderColor" name="hoverBorderColor" >
            <Color />
          </Form.Item>
          <Form.Item label="hoverBorderWidth" name="hoverBorderWidth" >
            <Input size="small" placeholder="hoverBorderWidth" type={'number'} />
          </Form.Item>
          <Form.Item label="hoverBorderRadius" name="hoverBorderRadius" >
            <Input size="small" placeholder="hoverBorderRadius" type={'number'} />
          </Form.Item>
          <Form.Item label="backgroundColor" name="backgroundColor" >
            <Color />
          </Form.Item>
          <Form.Item label="maxBarThickness" name="maxBarThickness" >
            <Input size="small" placeholder="maxBarThickness" type={'number'} />
          </Form.Item>
        </> : null}

        {/**上面是分割线-------------- */}
        {
          chartType === 'line' ?
            <>
              <Form.Item label="backgroundColor" name="backgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="borderCapStyle" name="borderCapStyle" >
                <Select placeholder="borderCapStyle" size="small">
                  <Select.Option value="butt">butt</Select.Option>
                  <Select.Option value="round">round</Select.Option>
                  <Select.Option value="square">square</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="borderColor" name="borderColor" >
                <Color />
              </Form.Item>

              <Form.Item label="borderDash" name="borderDash" >
                <Input size="small" placeholder="borderDash" />
              </Form.Item>
              <Form.Item label="borderDashOffset" name="borderDashOffset" >
                <Input size="small" placeholder="borderDashOffset" type={'number'} />
              </Form.Item>
              <Form.Item label="borderJoinStyle" name="borderJoinStyle" >
                <Select placeholder="borderJoinStyle" size="small">
                  <Select.Option value="round">round</Select.Option>
                  <Select.Option value="bevel">bevel</Select.Option>
                  <Select.Option value="miter">miter</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="borderWidth" name="borderWidth" >
                <Input size="small" placeholder="borderWidth" type={'number'} />
              </Form.Item>
              <Form.Item label="clip" name="clip" >
                <Input size="small" placeholder="clip" type={'number'} />
              </Form.Item>
              <Form.Item label="cubicInterpolationMode" name="cubicInterpolationMode" >
                <Select placeholder="cubicInterpolationMode" size="small">
                  <Select.Option value="default">default</Select.Option>
                  <Select.Option value="monotone">monotone</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="drawActiveElementsOnTop" valuePropName="checked">
                <Checkbox>drawActiveElementsOnTop</Checkbox>
              </Form.Item>
              <Form.Item name="fill" valuePropName="checked">
                <Checkbox>fill</Checkbox>
              </Form.Item>

              <Form.Item label="hoverBackgroundColor" name="hoverBackgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="hoverBorderCapStyle" name="hoverBorderCapStyle" >
                <Select placeholder="hoverBorderCapStyle" size="small">
                  <Select.Option value="butt">butt</Select.Option>
                  <Select.Option value="round">round</Select.Option>
                  <Select.Option value="square">square</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="hoverBorderColor" name="hoverBorderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="hoverBorderDash" name="hoverBorderDash" >
                <Input size="small" placeholder="hoverBorderDash" />
              </Form.Item>
              <Form.Item label="hoverBorderDashOffset" name="hoverBorderDashOffset" >
                <Input size="small" placeholder="hoverBorderDashOffset" type={'number'} />
              </Form.Item>
              <Form.Item label="hoverBorderJoinStyle" name="hoverBorderJoinStyle" >
                <Select placeholder="hoverBorderJoinStyle" size="small">
                  <Select.Option value="round">round</Select.Option>
                  <Select.Option value="bevel">bevel</Select.Option>
                  <Select.Option value="miter">miter</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="hoverBorderWidth" name="hoverBorderWidth" >
                <Input size="small" placeholder="hoverBorderWidth" type={'number'} />
              </Form.Item>
              <Form.Item label="pointBackgroundColor" name="pointBackgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="pointBorderColor" name="pointBorderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="pointBorderWidth" name="pointBorderWidth" >
                <Input size="small" placeholder="pointBorderWidth" type={'number'} />
              </Form.Item>
              <Form.Item label="pointHitRadius" name="pointHitRadius" >
                <Input size="small" placeholder="pointHitRadius" type={'number'} />
              </Form.Item>
              <Form.Item label="pointHitRadius" name="pointHitRadius" >
                <Input size="small" placeholder="pointHitRadius" type={'number'} />
              </Form.Item>
              <Form.Item label="pointHoverBackgroundColor" name="pointHoverBackgroundColor" >
                <Color />
              </Form.Item>
              <Form.Item label="pointHoverBorderColor" name="pointHoverBorderColor" >
                <Color />
              </Form.Item>
              <Form.Item label="pointHoverBorderWidth" name="pointHoverBorderWidth" >
                <Input size="small" placeholder="pointHoverBorderWidth" type={'number'} />
              </Form.Item>




            </> : null
        }
        <Form.Item
          labelCol={{ span: 10 }}
          label="填充"
          style={{ width: '25%' }}
          name="fill"
          valuePropName="checked"
        >
          <Switch size="small" disabled={chartType === 'bar'} />
        </Form.Item>

        <Form.Item name="showLine" valuePropName="checked">
          <Checkbox>显示连线</Checkbox>
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
