import { Form, Input, Select, Switch } from 'antd';
import React from 'react';
import Color from '~/components/MiniDashboard/Color';
import s from './ChartOptionItem.module.scss';

interface Props {

}

const ChartOptionItem: React.FC<Props> = ({ }) => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className={s.form}>
      <Form.Item className={s.wrap}
        label={<b>图例</b>} 
        labelCol={{ span: 3 }} 
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="位置" labelCol={{ span: 10 }} className={s.item}>
          <Select size="small">
            <Select.Option>上</Select.Option>
            <Select.Option>下</Select.Option>
            <Select.Option>左</Select.Option>
            <Select.Option>右</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="文字颜色" labelCol={{ span: 10 }} className={s.item}>
          <Color onChange={() => { }} />
        </Form.Item>
        <Form.Item label="节点样式" labelCol={{ span: 10 }}  className={s.item}>
          <Switch size="small" />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default ChartOptionItem;