import {
  PlusOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  Row,
  Col,
  Tooltip,
  Button,
} from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { runningDataPath } from '../..';
import s from './DataGroups.module.scss';
import SortableContener from './SortableContener';

interface Props {
}

const DataGroups: React.FC<Props> = () => {
  const  {runningData, onChange} = useContext(CustomPresettingContext);
  const groups = get(runningData, runningDataPath.dataGroups)
  
  const onPlus = useCallback(
    () => {
      const copyData = cloneDeep(runningData);
      groups.data.push({
        label: '数据名',
        data: [],
        showLine: true,
        fill: true
      });
      set(copyData, runningDataPath.dataGroups, groups);
      onChange(copyData);
    },
    [groups, onChange, runningData],
  )
  
  return (
    <>
      <PageHeader title="设置数据" />
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip placement="topRight" title={'点击添加数据组'}>
            数据组
          </Tooltip>
        </Col>
        <Col span={19}>
          <Row className={s.toolbar} gutter={4}>
            <Col span={4}>
              <Button icon={<PlusOutlined />} onClick={onPlus}>
                增加数据组
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <SortableContener items={groups.data} />
    </>
  );
};

export default DataGroups;
