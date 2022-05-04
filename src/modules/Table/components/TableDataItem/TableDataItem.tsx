import { CaretDownOutlined, CaretRightOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import HtmlSuffix from '~/components/MiniDashboard/ArgumentsSetting/HtmlSuffix';
import { dataType, dataTypeFormat } from '../../type';
import s from './TableDataItem.module.scss';

export interface TableDataItemValue {
  headName?: string, rowMap?: string, dataType?: string, format?: string, columWidth?: string
}

interface Props {
  onChange?: (value: TableDataItemValue) => void;
  onMinus?: () => void;
  value?: TableDataItemValue;
  defaultValue?: TableDataItemValue;
  label?: string;
  disabled?: boolean;
}

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const formLayout = {
  labelCol: { span: 4 }, wrapperCol: { span: 20 }
}

const subLayout = {
  labelCol: { span: 6 }, wrapperCol: { span: 18 }
}

const TableDataItem: React.FC<Props> = ({ defaultValue, label, onMinus, value, onChange }) => {
  const [form] = Form.useForm();
  const [currentdataType, setCurrentDataType] = useState<string>();
  const [showOptions, setShowOptions] = useState(false);
  const disabled = true;


  const onFormChange = useCallback(
    () => {
      if (disabled) return;
      const data = form.getFieldsValue();
      const { dataType } = data;
      if (dataType !== 'number' && dataType !== 'date') {
        form.setFieldsValue({ format: undefined })
      }
      setCurrentDataType(dataType);
      if (typeof onChange === 'function') {
        onChange(form.getFieldsValue())
      }
    },
    [disabled, form, onChange],
  )

  const renderNumber = useCallback(
    () => Object.keys(dataTypeFormat.number).map(
      key =>
        <Select.Option key={key} value={key}>
          {dataTypeFormat.number[key]}
        </Select.Option>
    ),
    [],
  )

  const renderDate = useCallback(
    () => Object.keys(dataTypeFormat.date).map(
      key =>
        <Select.Option key={key} value={key}>
          {dataTypeFormat.date[key]}
        </Select.Option>
    ),
    [],
  )

  useEffect(() => {
    setCurrentDataType(defaultValue?.dataType)
    form.setFieldsValue(defaultValue || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    form.resetFields(Object.keys(value || {}))
  }, [form, value])

  return (
    <Form className={s.wrap} form={form} {...formLayout} onFieldsChange={onFormChange}>
      <Form.Item label={<><span className={s.drag}><DragHandle /></span>{label || '列'}</>} className={s.item}>
        <Input.Group compact>
          <Form.Item
            name="headName"
            noStyle
          >
            <Input disabled={disabled} className={s.inp} placeholder="名称" suffix={<HtmlSuffix />} />
          </Form.Item>
          <Form.Item
            name="rowMap"
            noStyle
          >
            <Input disabled={disabled} className={s.inp} placeholder="字段" suffix={
              <HtmlSuffix info={
                <>
                  <div>可用字段：</div>
                  <Space wrap>
                    {
                      Object.keys({ name: 'xiaomi' })?.map(key =>
                        <Tag className={s.tag} key={key} onClick={() => { if(!disabled)form.setFieldsValue({ 'rowMap': `{{${key}}}` }); onFormChange() }}>
                          {`{{${key}}}`}
                        </Tag>
                      )
                    }
                  </Space>
                </>
              } />
            } />
          </Form.Item>
          <Form.Item noStyle>
            {/* <Button icon={<CaretRightOutlined />} /> */}
            <Button disabled={disabled} className={s.btn} icon={showOptions ? <CaretDownOutlined /> : <CaretRightOutlined />} onClick={() => setShowOptions(!showOptions)} />
          </Form.Item>
          <Form.Item noStyle>
            <Button disabled={disabled} className={s.btn} icon={<MinusOutlined />} onClick={() => onMinus?.()} />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <div style={{ display: showOptions ? 'block' : 'none' }}>
        <Form.Item {...subLayout} label="类别" name="dataType" className={s.item}>
          <Select disabled={disabled} placeholder="请选择数据类型，默认字符" onChange={() => { form.setFieldsValue({ 'format': undefined }); onFormChange() }}>
            {
              Object.keys(dataType).map(key => <Select.Option key={key} value={key}>{dataType[key]}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item {...subLayout} label="格式" name="format" className={s.item}>
          <Select placeholder="请选择数据格式" disabled={(currentdataType !== 'number' && currentdataType !== 'date') || disabled}>
            {currentdataType === 'number' ? renderNumber() : null}
            {currentdataType === 'date' ? renderDate() : null}
          </Select>
        </Form.Item>
        <Form.Item {...subLayout} label="列宽" name="columWidth" className={s.item}>
          <Input disabled={disabled} placeholder="ex:50%或50px, 默认自动" />
        </Form.Item>
      </div>
    </Form>
  )
}

export default SortableElement(TableDataItem);