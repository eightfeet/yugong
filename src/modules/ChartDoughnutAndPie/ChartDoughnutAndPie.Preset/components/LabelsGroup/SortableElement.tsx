import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Switch, Input, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { get, set } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import Color from '~/components/MiniDashboard/Color';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { runningDataPath } from '../..';
import ChartConfig from '../ChartConfig';
import DataGroupsContener from '../DataGroupsContener';
import { fliterValues } from '../helper';
import s from './SortableElement.module.scss';

interface Props {
  index: number;
  item: any;
}

const SortableElement: React.FC<Props> = ({ index, item }) => {
  const [form] = useForm();
  const [openSetting, setOpenSetting] = useState(false);
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const onMinus = useCallback(() => {
    const path = `${runningDataPath.labels}.data`;
    const data = get(runningData, path);
    const fliterData = data.filter((item: any, ind: number) => ind !== index);
    const res = set(runningData, path, fliterData);
    onChange(res);
  }, [index, onChange, runningData]);

  const onChangeConfig = useCallback(
    (e) => {
      const data = get(
        runningData,
        `${runningDataPath.dataGroups_data}[${index}]`,
      );
      const itemRes = { ...data, ...e };
      const res = set(
        runningData,
        `${runningDataPath.dataGroups_data}[${index}]`,
        itemRes,
      );
      onChange(res);
    },
    [index, onChange, runningData],
  );

  const [editLabel, setEditLabel] = useState(false);

  const onChangeLabel = useCallback(
    (e) => {
      setEditLabel(false);
      const data = get(
        runningData,
        `${runningDataPath.dataGroups_data}[${index}]`,
      );
      const itemRes = { ...data, label: e.target.value };
      const res = set(
        runningData,
        `${runningDataPath.dataGroups_data}[${index}]`,
        itemRes,
      );
      onChange(res);
    },
    [index, onChange, runningData],
  );

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
