import { Form, Input } from 'antd';
import React from 'react';
import s from './DataElement.module.scss';

const FormItem = Form.Item;

interface Props {
  index: number;
  item: {
    title:string;
    file: string;
  };
}

const DataElement:React.FC<Props> = ({ item }) => {
  return (
    <Form className={s.form}>
      <FormItem label="名称" className={s.formitem}>
        <Input value={item.title} />
      </FormItem>
      <FormItem label="路径" className={s.formitem}>
        <Input value={item.file} />
      </FormItem>
    </Form>
  )
}

export default DataElement;