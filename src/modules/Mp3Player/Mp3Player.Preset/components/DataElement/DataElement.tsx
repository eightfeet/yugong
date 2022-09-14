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
    title:string;
    file: string;
  };
}

const DataElement:React.FC<Props> = ({ item, index }) => {
  const [ form ] = useForm();
  const { runningData, onChange } = useContext(CustomPresettingContext);
  
  const onChangeFields = useCallback(
    () => {
      const path = `[0].arguments[0].data[${index}]`;
      const values = form.getFieldsValue();
      const res = set(runningData, path, values);
      onChange(res);
    },
    [form, index, onChange, runningData],
  )

  return (
    <Form form={form} className={s.form} onFieldsChange={onChangeFields} initialValues={item}>
      <FormItem label="名称" name="title" className={s.formitem}>
        <Input  />
      </FormItem>
      <FormItem label="路径" name="file" className={s.formitem}>
        <Input value={item.file} />
      </FormItem>
    </Form>
  )
}

export default DataElement;