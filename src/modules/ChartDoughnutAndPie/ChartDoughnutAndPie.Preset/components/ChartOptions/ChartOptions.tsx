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

  const onChangeOptions= useCallback(
    (data) => {
      optionsData.data = data;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )
  
  return (
    <>
      <PageHeader title="全局设置" />
      <ChartOptionItem onChange={onChangeOptions} defaultValue={optionsData.data} />
    </>
  )
}

export default ChartOptions;