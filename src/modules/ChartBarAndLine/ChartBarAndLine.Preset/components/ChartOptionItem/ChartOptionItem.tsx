import { Form, Input } from 'antd';
import React from 'react';
import s from './ChartOptionItem.module.scss';

interface Props {

}

const ChartOptionItem: React.FC<Props> = ({ }) => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className={s.form}>
      <Form.Item className={s.wrap} label={<b>图例</b>} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="图例颜色" labelCol={{ span: 10 }} className={s.item}>
          sadasd
        </Form.Item>
        <Form.Item label="提示框" className={s.item}>
          <Input />
        </Form.Item>
        <Form.Item label="图列" className={s.item}>
          <Input />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default ChartOptionItem;