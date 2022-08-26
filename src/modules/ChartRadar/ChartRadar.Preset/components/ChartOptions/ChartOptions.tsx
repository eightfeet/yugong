import { Col, PageHeader, Row, Select, Tooltip } from 'antd';
import React, { useCallback, useContext } from 'react';
import ChartTooltip from '../Tooltip';
import ChartOptionItem from '../ChartOptionItem';
import Legend from '../Legend';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import s from './ChartOptions.module.scss';
import { get, set } from 'lodash';
import { runningDataPath } from '../..';

interface Props {}

const ChartOptions: React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext)
  const optionsData = get(runningData, runningDataPath.chartOptions);

  const handleChange = useCallback(
    (value) => {
      const result = set(runningData, runningDataPath.chartOptions, value);
      onChange(result);
    },
    [onChange, runningData],
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
    (data, dire) => {
      optionsData.data.scales[dire] = data;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )
  
  return (
    <>
      <PageHeader title="设置坐标属性" />
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
           悬浮提示
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
            title={'设置网格'}
          >
            网格
          </Tooltip>
        </Col>
        <Col span={19}>
          <ChartOptionItem onChange={data=>onChangeScales(data, 'r')} defaultValue={optionsData.data.scales.r} />
        </Col>
      </Row>
    </>
  )
}

export default ChartOptions;