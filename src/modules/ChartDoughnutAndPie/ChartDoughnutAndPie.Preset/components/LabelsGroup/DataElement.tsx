import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Switch, Input } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { runningDataPath } from '../..';
import ChartConfig from '../ChartConfig';
import DataGroupsContener from '../DataGroupsContener';
import s from './DataElement.module.scss';

interface Props {
  index: number;
  item: any;
}

const DataElement: React.FC<Props> = ({ index, item }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const onMinus = useCallback(
    () => {
      const data = get(runningData, runningDataPath.dataGroups_data);
      const fliterData = data.filter((item: any, ind: number) => ind !== index);
      const res = set(runningData, runningDataPath.dataGroups_data, fliterData);
      onChange(res)
    },
    [index, onChange, runningData],
  )

  const onChangeConfig = useCallback(
    (e) => {
      const data = get(runningData, `${runningDataPath.dataGroups_data}[${index}]`);
      const itemRes = { ...data, ...e };
      const res = set(runningData, `${runningDataPath.dataGroups_data}[${index}]`, itemRes);
      onChange(res)
    },
    [index, onChange, runningData],
  )

  const [editLabel, setEditLabel] = useState(false);

  const onChangeLabel = useCallback(
    (e) => {
      setEditLabel(false);
      const data = get(runningData, `${runningDataPath.dataGroups_data}[${index}]`);
      const itemRes = { ...data, label: e.target.value };
      const res = set(runningData, `${runningDataPath.dataGroups_data}[${index}]`, itemRes);
      onChange(res)
    },
    [index, onChange, runningData],
  )

  return (
    <Row className={s.root}>
      <Col span={1}></Col>
      <Col span={23}>
        test
      </Col>
    </Row>
  )
}

export default DataElement;