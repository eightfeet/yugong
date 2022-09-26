import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import s from './DataElement.module.scss';

const FormItem = Form.Item;

interface Props {
  index: number;
  item: {
    name:string;
    start: number;
    duration: number
  };
}

const DataElement:React.FC<Props> = ({ item, index }) => {
  const [ form ] = useForm();
  const { runningData, onChange } = useContext(CustomPresettingContext);
  
  const onChangeFields = useCallback(
    () => {
      const path = `[0].arguments[1].data[${index}]`;
      const { name, start, duration } = form.getFieldsValue();
      const res = set(runningData, path, { name, start: Number(start), duration: Number(duration) });
      onChange(res);
    },
    [form, index, onChange, runningData],
  )

  return (
    <Form form={form} className={s.form} onFieldsChange={onChangeFields} initialValues={item} labelCol={{span:4}}>
      <FormItem label="名称" name="name" className={s.formitem} >
        <Input  />
      </FormItem>
      <FormItem label="开始时间" name="start" className={s.formitem} >
        <Input type="number" min={0} suffix="ms" />
      </FormItem>
      <FormItem label="持续时长" name="duration" className={s.formitem}>
        <Input type="number" min={0} suffix="ms" />
      </FormItem>
    </Form>
  )
}

export default DataElement;