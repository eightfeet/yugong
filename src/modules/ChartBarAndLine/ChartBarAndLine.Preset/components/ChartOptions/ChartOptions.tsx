import { Col, PageHeader, Row, Select, Tooltip } from 'antd';
import React from 'react';
import ChartTooltip from '../Tooltip';
import ChartOptionItem from '../ChartOptionItem';
import Legend from '../Legend';
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
          <Select placeholder="请选择数据方向" style={{ width: '100%' }}>
            <Select.Option value="x">X</Select.Option>
            <Select.Option value="y">Y</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'设置图列'}
          >
            图列
          </Tooltip>
        </Col>
        <Col span={19}>
          <Legend 
            onChange={e => console.log(e)}
            defaultValue={{
              labels: {
                color: 'red'
              }
            }}
          />
        </Col>
      </Row>
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'设置工具'}
          >
            工具
          </Tooltip>
        </Col>
        <Col span={19}>
          <ChartTooltip
            onChange={e => console.log(e)}
            defaultValue={{ enabled: true, backgroundColor: '#0FF000', bodyColor: 'blue', usePointStyle: true}}
          />
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
          <ChartOptionItem onChange={e => console.log(e)} />
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
          <ChartOptionItem onChange={e => console.log(e)} />
        </Col>
      </Row>
    </>
  )
}

export default ChartOptions;