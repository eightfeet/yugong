import { Form, Input, Radio, Select } from 'antd';
import React from 'react';
import s from './ChartConfig.module.scss';

interface Props {

}

const ChartConfig: React.FC<Props> = ({ }) => {
  return (
    <div className={s.root}>
      <Form>
        <Form.Item label="类型" name="layout">
          <Radio.Group size="small">
            <Radio.Button value="horizontal">折线</Radio.Button>
            <Radio.Button value="vertical">柱状</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="背景" name="layout">
          <Input.Group className={s.groups}>
            <Form.Item
              name={['address', 'province']}
              label="填充"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="颜色" />
            </Form.Item>
            <Form.Item
              name={['address', 'province']}
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="颜色" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="描边">
          <Input.Group className={s.groups}>
            <Form.Item
              name={['address', 'province']}
              label="粗细"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="粗细" />
            </Form.Item>
            <Form.Item
              name={['address', 'province']}
              label="颜色"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="粗细" />
            </Form.Item>
            <Form.Item
              name={['address', 'province']}
              label="虚线"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="虚线" />
            </Form.Item>
            <Form.Item
              name={['address', 'province']}
              label="间隙"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="虚线" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="节点" name="layout">
          <Input.Group className={s.groups}>
            <Form.Item
              name={['address', 'province']}
              label="样式"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="样式" />
            </Form.Item>
            <Form.Item
              name={['address', 'province']}
              label="大小"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Input size="small" placeholder="样式" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChartConfig;