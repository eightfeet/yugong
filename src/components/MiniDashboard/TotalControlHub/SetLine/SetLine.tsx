import { MinusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, message, Modal, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useState } from 'react';
import { PointItem } from '~/types/pageData';
import s from './SetLine.module.scss';

interface Props {
  /**线程名称, 没有时表示新增的线程 */
  name?: string,
  points: PointItem[],
  visible: boolean,
  onCancel: () => void,
  onChange: (data: {[key: string]: PointItem[]}) => void,
  onRemove: () => void,
  /**全部线程名称 */
  tchs: string[]
}

const SetLine: React.FC<Props> = ({ visible, onCancel, onChange, name, onRemove, points, tchs }) => {
  const [form] = useForm();
  const [currentPoint, setCurrentPoint] = useState<PointItem[]>([]);
  const formToData = useCallback(
    () => {
      const { name, ...other } = form.getFieldsValue();
      const data = {
        [name]: Object.keys(other).map(key => (other[key] as PointItem))
      }
      return data;
    },
    [form],
  );

  useEffect(() => {
    setCurrentPoint(points)
  }, [points]);

  const validatorName = useCallback(
    (_: any, value: any) => {
      if (/[^a-zA-Z0-9]/.test(value)) {
        return Promise.reject(new Error('请输入字母或数字'))
      }
      
      if (!name && tchs.includes(form?.getFieldValue('name'))) {
        return Promise.reject(new Error(`线程名称${value}已存在`))
      }
      return Promise.resolve();
    },
    [form, name, tchs],
  )

  /**节点验证 */
  const validatorPoint = useCallback(
    (s: any, value: any) => {
      const ind = parseInt(s.field);
      if (/[^a-zA-Z0-9]/.test(value)) {
        return Promise.reject(new Error('请输入字母或数字'))
      }      
      const formData = form.getFieldsValue() as {[keys: string]: {
        msg: string;
        point: string;
        status: "locked" | "unlocked"
      }};
      console.log(formData, value);

      const hasFormData = Object.keys(formData)?.some((key, index) => {
        const point = formData[key]?.point as string | undefined;
        return (index !== ind && point === value)
      });

      if (hasFormData) {
        return Promise.reject(new Error(`节点名称${value}已存在`))
      }
      return Promise.resolve();
    },
    [form],
  )

  const add = useCallback(
    () => {
      setCurrentPoint(currentPoint => [...currentPoint, { point: '', status: 'locked', msg: '' }])
    },
    [],
  )

  const minus = useCallback(
    (ind: number) => {
      Modal.confirm({
        content: '当前线程节点将被删除！',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          setCurrentPoint(currentPoint => {
            return currentPoint.filter((item, index) => {
              if (index === ind) {
                message.warn(`请手动移除线程面板关联的${item.point}节点。`)
              }
              return index !== ind
            });
          })
        },
      });
      
    },
    [],
  )

  const handleChange = useCallback(
    () => {
      onChange(formToData());
    },
    [formToData, onChange],
  )
  

  useEffect(() => {
    form.resetFields()
  }, [form, visible, points]);
  
  return (
    <Modal visible={visible} title={`${name ? '修改' : '添加'}线程${name || ''}`} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={handleChange}>
        <Form.Item
          name={'name'}
          label="线程名"
          rules={[{ required: true, message: '请输入线程名' }, { validator: validatorName }]}
          initialValue={name}
        >
          <Input disabled={!!name} />
        </Form.Item>
        <Button className={s.add} onClick={add}>增加节点</Button>
        {currentPoint.map((item, index) => <Form.Item key={index}>
          <Input.Group compact >
            <Form.Item
              name={[index, 'point']}
              initialValue={item.point}
              noStyle
              rules={[{ required: true, message: '请输入节点名' }, { validator: validatorPoint }]}
            >
              <Input style={{ width: '30%' }} placeholder="节点名" />
            </Form.Item>
            <Form.Item
              name={[index, 'status']}
              noStyle
              rules={[{ required: true, message: '请选择节点初始状态' }]}
              initialValue={item.status}
            >
              <Select disabled style={{ width: '20%' }} placeholder="初始状态">
                <Select.Option value="locked">锁定时</Select.Option>
                <Select.Option value="unlocked">解锁时</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={[index, 'msg']}
              noStyle
              initialValue={item.msg}
              rules={[{ required: true, message: '请输入节点描述' }]}
            >
              <Input style={{ width: '42%' }} placeholder="节点描述" />
            </Form.Item>
            <Form.Item
              noStyle
            >
              <Button style={{ width: '8%' }} onClick={() => minus(index)} icon={<MinusOutlined />} />
            </Form.Item>
          </Input.Group>
        </Form.Item>)}
        <Form.Item style={{ textAlign: "center" }}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
            {
              name ? <Button type="default" onClick={onRemove}>
                删除
              </Button> : null
            }
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SetLine;