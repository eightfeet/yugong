import { MinusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useState } from 'react';
import { PointItem } from '~/types/pageData';
import s from './SetLine.module.scss';

interface Props {
  /**线程名称, 没有时表示新增的线程 */
  name?: string;
  points: PointItem[];
  visible: boolean;
  onCancel: () => void;
  onChange: (data: { [key: string]: PointItem[] }) => void;
  onRemove: () => void;
  /**全部线程名称 */
  tchs: string[];
}

interface PointItemTag extends PointItem {
  tag: string;
}

const SetLine: React.FC<Props> = ({
  visible,
  onCancel,
  onChange,
  name,
  onRemove,
  points,
  tchs,
}) => {
  const [form] = useForm();
  const [currentPoint, setCurrentPoint] = useState<PointItemTag[]>([]);
  const formToData = useCallback(() => {
    const { name, ...other } = form.getFieldsValue();
    const data = {
      [name]: Object.keys(other).map((key) => other[key] as PointItem),
    };
    return data;
  }, [form]);

  useEffect(() => {
    setCurrentPoint(() => {
      return points.map((item) => ({
        ...item,
        tag: nanoid(),
      }));
    });
  }, [points]);

  const validatorName = useCallback(
    (_: any, value: any) => {
      if (/[^a-zA-Z0-9]/.test(value)) {
        return Promise.reject(new Error('请输入字母或数字'));
      }

      if (!name && tchs.includes(form?.getFieldValue('name'))) {
        return Promise.reject(new Error(`线程名称${value}已存在`));
      }
      return Promise.resolve();
    },
    [form, name, tchs],
  );

  /**节点验证 */
  const validatorPoint = useCallback(
    (s: any, value: any, tag: string) => {
      if (/[^a-zA-Z0-9]/.test(value)) {
        return Promise.reject(new Error('请输入字母或数字'));
      }
      const formData = form.getFieldsValue() as {
        [tag: string]: {
          msg: string;
          point: string;
          status: 'locked' | 'unlocked';
        };
      };

      delete formData[tag];
      delete formData.name;
      
      let hasFormData: boolean = false;
      const formDataKeys = Object.keys(formData);
      for (let index = 0; index < formDataKeys.length; index++) {
        const key = formDataKeys[index];
        const element = formData[key];
        const point = element.point;
        if (point === value) {
          hasFormData = true;
          break;
        }
      }

      if (hasFormData) {
        return Promise.reject(new Error(`节点名称${value}已存在`));
      }
      return Promise.resolve();
    },
    [form],
  );

  const add = useCallback(() => {
    setCurrentPoint((currentPoint) => [
      ...currentPoint,
      {
        tag: nanoid(),
        point: '',
        status: 'locked',
        msg: '',
      },
    ]);
  }, []);

  const minus = useCallback((tag: string) => {
    setCurrentPoint((currentPoint) => {
      const res = currentPoint.filter((item, index) => {
        return item.tag !== tag;
      });
      return res;
    });
  }, []);

  const handleChange = useCallback(() => {
    onChange(formToData());
  }, [formToData, onChange]);

  useEffect(() => {
    form.resetFields();
  }, [form, visible, points]);

  return (
    <Modal
      visible={visible}
      title={`${name ? '修改' : '添加'}线程${name || ''}`}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleChange}>
        <Form.Item
          name={'name'}
          label="线程名"
          rules={[
            { required: true, message: '请输入线程名' },
            { validator: validatorName },
          ]}
          initialValue={name}
        >
          <Input disabled={!!name} />
        </Form.Item>
        <Button className={s.add} onClick={add}>
          添加初始化节点
        </Button>
        {currentPoint.map((item, index) => (
          <Form.Item key={item.tag}>
            <Input.Group compact>
              <Form.Item
                name={[item.tag, 'point']}
                initialValue={item.point}
                noStyle
                rules={[
                  { required: true, message: '请输入节点名' },
                  { validator: (s, v) => validatorPoint(s, v, item.tag) },
                ]}
              >
                <Input style={{ width: '25%' }} placeholder="节点名" />
              </Form.Item>
              <Form.Item
                name={[item.tag, 'status']}
                noStyle
                rules={[{ required: true, message: '请选择节点初始状态' }]}
                initialValue={item.status}
                prefixCls="初始化"
              >
                <Select style={{ width: '25%' }} placeholder="请选择初始状态">
                  <Select.Option value="locked">锁定</Select.Option>
                  <Select.Option value="unlocked">解锁</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={[item.tag, 'msg']}
                noStyle
                initialValue={item.msg}
                rules={[{ required: true, message: '请输入节点被锁定描述' }]}
              >
                <Input style={{ width: '42%' }} placeholder="节点被锁定描述" />
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  style={{ width: '8%' }}
                  onClick={() => minus(item.tag)}
                  icon={<MinusOutlined />}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        ))}
        <Form.Item style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
            {name ? (
              <Button type="default" onClick={onRemove}>
                删除
              </Button>
            ) : null}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetLine;
