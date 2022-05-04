import { Checkbox, Form, FormInstance, Input } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import s from './Pull.module.less';

export interface PullValues {
  isPullDown: boolean, 
  pullDownText: string, 
  isPullUp: boolean, 
  pullUpText: string
}

interface Props {
  onChange?: (value: PullValues, form: FormInstance<any>) => void;
  disabled?: boolean;
  defaultValue?: PullValues;
  value?: PullValues;
}

const Pull: React.FC<Props> = ({ onChange, disabled, value }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
    }
  }, [form, value])
  
  const onChangeForm = useCallback(
    () => {
      const value = form.getFieldsValue();
      if (typeof onChange === 'function') {
        onChange(value, form)
      }
    },
    [form, onChange],
  )

  return (
    <Form form={form} layout="inline" onFieldsChange={onChangeForm}>
      <Form.Item
        name="isPullDown"
        className={s.item}
        valuePropName="checked"
      >
        <Checkbox disabled={disabled}>允许下拉事件</Checkbox>
      </Form.Item>
      <Form.Item
        label="加载文案"
        name="pullDownText"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className={classNames(s.item, s.itemtext)}
      >
        <Input disabled={disabled} placeholder="下拉刷新" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="isPullUp"
        valuePropName="checked"
        className={s.item}
      >
        <Checkbox disabled={disabled}>允许上拉事件</Checkbox>
      </Form.Item>
      <Form.Item
        label="加载文案"
        name="pullUpText"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className={classNames(s.item, s.itemtext)}
      >
        <Input disabled={disabled} placeholder="上拉刷新" style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  )
}

export default Pull;