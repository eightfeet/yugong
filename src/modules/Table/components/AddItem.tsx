import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row, Space, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import HtmlSuffix from '~/components/MiniDashboard/ArgumentsSetting/HtmlSuffix';
import s from './AddItem.module.less';

interface Props {
  dataSource: Object[],
  onChange?: (data: any, form: FormInstance<any>) => void,
  value?: { TheadName: any[], rowMap: any[], columWidth: any[] },
  defaultValue?: { TheadName: any[], rowMap: any[], columWidth: any[] }
}

export interface FormRowItem {
  TheadName: string;
  rowMap: string;
  columWidth: string;
}

interface FormRow {
  [key: number]: FormRowItem
}

const AddItem: React.FC<Props> = ({ dataSource, onChange, value, defaultValue }) => {
  const [formRow, setFormRow] = useState<FormRow>({});
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields([]);
  }, [dataSource, form])

  useEffect(() => {
    const data: any = {}
    if (value) {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key] as string[] | undefined;
          if (element) {
            element.forEach((item, index) => {
              if (!data[index]) data[index] = {};
              data[index][key] = item
            })
          }
        }
      }
      
      form.setFieldsValue(data)
      setFormRow(data)
    }
  }, [form, value])


  const changeForm = useCallback(
    () => {
      const data: FormRow = form.getFieldsValue();
      const TheadName: (string | undefined)[] = [];
      const rowMap: (string | undefined)[] = [];
      const columWidth: (string | undefined)[] = [];
      Object.keys(data).forEach(key => {
        const element: FormRowItem = data[key];
        TheadName.push(element.TheadName);
        rowMap.push(element.rowMap);
        columWidth.push(element.columWidth);
      })
      onChange?.({ TheadName, rowMap, columWidth }, form)
    },
    [form, onChange],
  )

  const onAddKey = useCallback(
    () => {
      setFormRow(data => {
        const def = { ...data };
        const nextKey = Object.keys(def).length;
        def[nextKey] = { TheadName: '', rowMap: '', columWidth: '' };
        return def
      });
      setTimeout(() => {
        changeForm()
      }, 100);
    },
    [changeForm],
  )

  const onMinus = useCallback(
    (index) => () => {
      setFormRow(data => {
        const def = { ...data };
        delete def[index];
        return def
      });
      setTimeout(() => {
        changeForm()
      }, 100);
    },
    [changeForm],
  )

  const setFormFromTag = useCallback(
    (key: any, value: any) => () => {
      form.setFields([{ name: key, value }]);
      changeForm()
    },
    [changeForm, form],
  )

  const disabled = !dataSource?.length;

  return (
    <Row>
      <Col>
        <Row className={s.toolbar} gutter={4}>
          <Col span={24}>
            <Button disabled={disabled} className={s.btn} onClick={onAddKey} icon={<PlusOutlined />}>
              增加
            </Button> &nbsp;&nbsp;
            {!dataSource?.length ?
              <span className={s.info}>请先选择表格数据</span>
              : null}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Form form={form} onFieldsChange={changeForm}>
          {Object.keys(formRow).map((formRowKey) => <Form.Item key={formRowKey} className={s.item} >
            <Input.Group compact >
              <Form.Item
                noStyle
                name={[formRowKey, 'TheadName']}
                className={s.item}
              >
                <Input disabled={disabled} style={{ width: '33%' }} placeholder="列名" />
              </Form.Item>
              <Form.Item
                noStyle
                name={[formRowKey, 'rowMap']}
                className={s.item}
              >
                <Input disabled={disabled} style={{ width: '33%' }} placeholder="字段名{{key}}" suffix={
                  <HtmlSuffix info={
                    <>
                      <div>可用字段：</div>
                      <Space wrap>
                        {
                          Object.keys(dataSource?.[0] || {})?.length &&
                          Object.keys(dataSource?.[0] || {})?.map(key =>
                            <Tag className={s.tag} key={key} onClick={setFormFromTag([formRowKey, 'rowMap'], `{{${key}}}`)}>
                              {`{{${key}}}`}
                            </Tag>
                          )
                        }
                      </Space>
                    </>
                  } />
                } />
              </Form.Item>
              <Form.Item
                noStyle
                name={[formRowKey, 'columWidth']}
                className={s.item}
              >
                <Input disabled={disabled} style={{ width: '27%' }} placeholder="宽度 ex: 20px" />
              </Form.Item>
              <Form.Item
                noStyle
                className={s.item}
              >
                <Button disabled={disabled} onClick={onMinus(formRowKey)} icon={<MinusOutlined />} />
              </Form.Item>
            </Input.Group>
          </Form.Item>)}
        </Form>
      </Col>
    </Row>
  )
}

export default AddItem;