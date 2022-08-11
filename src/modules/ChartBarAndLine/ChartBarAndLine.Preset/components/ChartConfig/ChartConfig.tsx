import { Form, Input, Radio, Select, Checkbox, Switch } from 'antd';
import React from 'react';
import Color from '~/components/MiniDashboard/Color';
import s from './ChartConfig.module.scss';

interface Props {}

const ChartConfig: React.FC<Props> = () => {
  return (
    <div className={s.root}>
      <Form>
        <Form.Item label="类型" name="layout">
          <Radio.Group size="small">
            <Radio.Button value="horizontal">折线</Radio.Button>
            <Radio.Button value="vertical">柱状</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="layout">
          <Checkbox checked>显示连线</Checkbox>
        </Form.Item>
        <Form.Item label="背景" name="layout">
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 10 }}
              label="填充"
              style={{ width: '25%' }}
            >
              <Switch size="small" checked disabled />
            </Form.Item>
            <Form.Item
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 2 }}
            >
              <Color onChange={() => {}} />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="描边">
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              label="描边"
            >
              <Input size="small" placeholder="粗细" />
            </Form.Item>
            <Form.Item
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 2 }}
            >
              <Color onChange={() => {}} />
            </Form.Item>
          </div>
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              label="虚线"
            >
              <Input size="small" placeholder="虚线" min={0} type={'number'} />
            </Form.Item>
            <Form.Item label="间隙" 
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="间隙" min={0} type={'number'} />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="节点" name="layout">
          <div className={s.itemlayout}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              label="样式"
            >
              <Select placeholder="请选择节点样式" size="small">
                <Select.Option>asd</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="半径"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
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
