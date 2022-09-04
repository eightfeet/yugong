import { MinusOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { runningDataPath } from '../..';
import { fliterValues } from '../helper';
import s from './SortableElement.module.scss';

interface Props {
  index: number;
  item: any;
}

const SortableElement: React.FC<Props> = ({ index, item }) => {
  const [form] = useForm();
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const onMinus = useCallback(() => {
    const path = `${runningDataPath.labels}.data`;
    const pieData = get(runningData, runningDataPath.dataGroups_data);
    const data = get(runningData, path);

    const fliterData = data.filter((item: any, ind: number) => {
      return ind !== index;
    });

    pieData.forEach((pieDataValues: any) => {
      const res: any[] = [];
      pieDataValues.data.forEach((element: any, pieDataValuesIndex: number) => {
        if (index !== pieDataValuesIndex) {
          res.push(element)
        }
      })
      pieDataValues.data = res;
    });
    
    let res = set(runningData, path, fliterData);
    res = set(res, runningDataPath.dataGroups_data, pieData);
    onChange(res);
  }, [index, onChange, runningData]);

  const handleChange = useCallback(
    (e) => {
      const values =  fliterValues(form.getFieldsValue());
      const res = set(
        runningData,
        `${runningDataPath.labels}.data[${index}]`,
        values,
      );
      onChange(res);
    },
    [form, index, onChange, runningData],
  )

  return (
    <Row className={s.root}>
      <Col span={1}></Col>
      <Col span={21}>
        <Form form={form} layout="inline" onFieldsChange={handleChange} initialValues={item}>
          <Form.Item label="标签" name="label">
            <Input style={{width: 180}} />
          </Form.Item>
          <Form.Item label="颜色" name="backgroundColor">
            <Color />
          </Form.Item>
          <Form.Item label="激活颜色" name="hoverBackgroundColor">
            <Color />
          </Form.Item>
        </Form>
      </Col>
      <Col span={2}>
        <Button size="small" type="text" onClick={onMinus}>
          <MinusOutlined />
        </Button>
      </Col>
    </Row>
  );
};

export default SortableElement;
