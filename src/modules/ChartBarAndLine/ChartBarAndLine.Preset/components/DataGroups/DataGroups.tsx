import {
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  Row,
  Col,
  Tooltip,
  Button,
  Divider,
  List,
  Form,
  Switch,
} from 'antd';
import Card from 'antd/lib/card/Card';
import React from 'react';
import MoveIcon from '~/components/Icon/MoveIcon';
import ArrayArguments from '~/components/MiniDashboard/ArgumentsSetting/ArrayArguments';
import ChartConfig from '../ChartConfig';
import DataGroupsContener from '../DataGroupsContener';
import s from './DataGroups.module.scss';

interface Props {}

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
      <Row>
        <Col span={1}></Col>
        <Col span={23}>
          <Card
            size="small"
            bodyStyle={{ padding: 0 }}
            title={
              <div className={s.title}>
                <MoveIcon />
                数据组
                <Button size="small" type="text" icon={<EditOutlined />} />
              </div>
            }
            extra={
              <>
                <Switch
                  checkedChildren={'设置'}
                  unCheckedChildren={'设置'}
                  defaultChecked
                  size="small"
                />
                &nbsp;
                <Button size="small" type="text">
                  <MinusOutlined />
                </Button>
              </>
            }
          >
            <ChartConfig />
            <DataGroupsContener />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DataGroups;
