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
import s from './DataGroups.module.scss';
import SortableContener from './SortableContener';

interface Props {
  path: string;
}

const DataGroups: React.FC<Props> = ({ path }) => {
  const  {runningData, onChange} = useContext(CustomPresettingContext);
  const groups = get(runningData, path)
  
  const onPlus = useCallback(
    () => {
      const copyData = cloneDeep(runningData);
      groups.data.push({});
      set(copyData, path, groups);
      onChange(copyData);
    },
    [groups, onChange, path, runningData],
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
