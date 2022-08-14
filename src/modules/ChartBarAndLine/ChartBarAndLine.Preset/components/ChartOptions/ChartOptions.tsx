import { Col, PageHeader, Row, Select, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import ChartTooltip from '../Tooltip';
import ChartOptionItem from '../ChartOptionItem';
import Legend from '../Legend';
import s from './ChartOptions.module.scss';
import { ExposeFunctions } from '~/types/modules';
import { get, set } from 'lodash';

interface Props {
  runningData: ExposeFunctions[],
  onChange: (copyRunningData: ExposeFunctions[]) => void,
  path: string;
}

const ChartOptions: React.FC<Props> = ({ runningData, onChange, path }) => {
  const optionsData = get(runningData, path);

  const handleChange = useCallback(
    (value) => {
      const result = set(runningData, path, value);
      onChange(result);
    },
    [onChange, path, runningData],
  )
  

  const onChangeDirection = useCallback(
    (e) => {
      optionsData.data.indexAxis = e;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )

  const onChangeLegend = useCallback(
    (legend) => {
      optionsData.data.plugins.legend = legend;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )

  const onChangeTooltip = useCallback(
    (tooltip) => {
      optionsData.data.plugins.tooltip = tooltip;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )

  const onChangeScales= useCallback(
    (grid, dire) => {
      optionsData.data.scales[dire].grid= grid;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )
  
  return (
    <>
      <PageHeader title="设置坐标轴属性" />
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
          <Select placeholder="请选择数据方向" value={optionsData.data.indexAxis} onChange={onChangeDirection} style={{ width: '100%' }}>
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
            onChange={onChangeLegend}
            defaultValue={optionsData.data.plugins.legend}
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
            onChange={onChangeTooltip}
            defaultValue={optionsData.data.plugins.tooltip}
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
          <ChartOptionItem onChange={grid=>onChangeScales(grid, 'x')} defaultValue={optionsData.data.scales.x.grid} />
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
          <ChartOptionItem onChange={grid=>onChangeScales(grid, 'y')} defaultValue={optionsData.data.scales.y.grid} />
        </Col>
      </Row>
    </>
  )
}

export default ChartOptions;