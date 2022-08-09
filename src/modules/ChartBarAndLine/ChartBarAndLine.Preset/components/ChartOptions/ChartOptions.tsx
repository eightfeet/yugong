import { Col, PageHeader, Row, Select, Tooltip } from 'antd';
import React from 'react';
import ArrayArguments from '~/components/MiniDashboard/ArgumentsSetting/ArrayArguments';
import ChartOptionItem from '../ChartOptionItem';
import s from './ChartOptions.module.scss';

interface Props {

}

const ChartOptions: React.FC<Props> = ({ }) => {
  return (
    <>
      <PageHeader title="设置坐标" />
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'设置数据方向'}
          >
            数据方向
          </Tooltip>
        </Col>
        <Col span={19}>
          <Select placeholder="请选择数据方向" style={{width: '100%'}}>
            <Select.Option value="x">X</Select.Option>
            <Select.Option value="y">Y</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'设置X坐标'}
          >
            X坐标
          </Tooltip>
        </Col>
        <Col span={19}>
          <ChartOptionItem />
        </Col>
      </Row>
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'设置Y坐标'}
          >
            Y坐标
          </Tooltip>
        </Col>
        <Col span={19}>
          <ChartOptionItem />
        </Col>
      </Row>
    </>
  )
}

export default ChartOptions;