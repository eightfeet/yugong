import { Form, Input, Select, Switch } from 'antd';
import React from 'react';
import Color from '~/components/MiniDashboard/Color';
import s from './ChartOptionItem.module.scss';

interface Props {}

const ChartOptionItem: React.FC<Props> = ({}) => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className={s.form}>
      <Form.Item
        className={s.wrap}
        label={<b>图例</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        {/* options.plugins.legend.display */}
        <Form.Item label="显示" style={{width: '100%'}} className={s.item}>
          <Switch size="small" />
        </Form.Item>
        {/* options.plugins.legend.position */}
        <Form.Item label="位置" className={s.item}>
          <Select size="small" style={{ width: '80px' }}>
            <Select.Option>上</Select.Option>
            <Select.Option>下</Select.Option>
            <Select.Option>左</Select.Option>
            <Select.Option>右</Select.Option>
          </Select>
        </Form.Item>
        {/* options.plugins.legend.labels.color */}
        <Form.Item label="文字颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
        {/* options.plugins.legend.labels.usePointStyle */}
        <Form.Item
          label="数据节点样式"
          className={s.item}
        >
          <Switch size="small" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        className={s.wrap}
        label={<b>工具</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        {/* options.plugins.tooltip.enabled */}
        <Form.Item label="启用" style={{width: '100%'}} className={s.item}>
          <Switch size="small" />
        </Form.Item>
        {/* options.plugins.tooltip.backgroundColor */}
        <Form.Item label="背景颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
        {/* options.plugins.tooltip.bodyColor */}
        <Form.Item label="文字颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
        {/* options.plugins.tooltip.usePointStyle */}
        <Form.Item label="数据节点样式" className={s.item}>
          <Switch size="small" />
        </Form.Item>
      </Form.Item>
      {/* options.scales[scaleId].grid */}
      <Form.Item
        className={s.wrap}
        label={<b>网格</b>}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        {/* options.scales[scaleId].grid.display */}
        <Form.Item label="显示" style={{width: '100%'}} className={s.item}>
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderWidth */}
        <Form.Item label="坐标粗细" wrapperCol={{span: 11}} className={s.item}>
          <Input size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.borderColor */}
        <Form.Item label="坐标颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
        {/* options.scales[scaleId].grid.lineWidth */}
        <Form.Item label="网格粗细" wrapperCol={{span: 11}} className={s.item}>
          <Input size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.color */}
        <Form.Item label="网格颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
        {/* options.scales[scaleId].grid.drawTicks */}
        <Form.Item label="显示刻度" className={s.item}>
          <Switch size="small" />
        </Form.Item>
        {/* options.scales[scaleId].grid.tickColor */}
        <Form.Item label="刻度颜色" className={s.item}>
          <Color onChange={() => {}} />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default ChartOptionItem;
