import { DatePicker, Form, Input, PageHeader, Switch } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import React, { useCallback } from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import s from './CountdownTimer.Preset.module.scss';
import { cloneDeep, get, set } from 'lodash';
import moment from 'moment';
import { useForm } from 'antd/es/form/Form';

const Preset:React.FC<CustomPersetProps> = ({ runningData, onChange}) => {
  console.log(runningData);
  const path = '[0].arguments[0].data';
  const data = get(runningData, path);
  data.endTime = moment(data.endTime)
  const [ form ] = useForm();

  const onChangeForm = useCallback(
    () => {
      const {
        endTime,
        ...other
      } = form.getFieldsValue();
      
      const data = {
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
        ...other
      }
      const res = set(cloneDeep(runningData), path, data);
      onChange(res)
    },
    [form, onChange, runningData],
  )
  
  
  return (
    <div>
      <PageHeader title="设置倒计时" />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={data}
        form={form}
        onFieldsChange={onChangeForm}
      >
        <Form.Item label="结束时间" name="endTime">
          <DatePicker showTime locale={locale} />
        </Form.Item>
        <Form.Item label="前缀" name="prefix">
          <Input />
        </Form.Item>
        <Form.Item label="后缀" name="suffix">
          <Input />
        </Form.Item>
        <Form.Item label="中文显示" valuePropName='checked' name="isZh">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Preset;