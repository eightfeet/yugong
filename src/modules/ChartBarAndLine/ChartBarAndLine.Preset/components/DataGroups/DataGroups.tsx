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
import React from 'react';
import { ExposeFunctions } from '~/types/modules';
import s from './DataGroups.module.scss';
import SortableContener from './SortableContener';

interface Props {
  runningData: ExposeFunctions[],
  onChange: (copyRunningData: ExposeFunctions[]) => void,
  path: string;
}

const DataGroups: React.FC<Props> = ({}) => {
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
              <Button icon={<PlusOutlined />}>
                增加数据组
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <SortableContener items={[1]} />
    </>
  );
};

export default DataGroups;
