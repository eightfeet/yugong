import { Col, PageHeader, Row, Tooltip } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import ChartTooltip from '../Tooltip';
import ChartOptionItem from '../ChartOptionItem';
import Legend from '../Legend';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import s from './ChartOptions.module.scss';
import { cloneDeep, get, set } from 'lodash';
import { runningDataPath } from '../..';
import JsonDataEditor from '~/components/MiniDashboard/JsonDataEditor';
import { CodeOutlined } from '@ant-design/icons';

interface Props {}

const ChartOptions: React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const [showCode, setShowCode] = useState(false);
  const optionsData = get(runningData, runningDataPath.chartOptions);

  const handleChange = useCallback(
    (value) => {
      const result = set(runningData, runningDataPath.chartOptions, value);
      onChange(result);
    },
    [onChange, runningData],
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

  const onConfirmCode = useCallback(
    (data) => {
      const copyData = cloneDeep(runningData);
      set(copyData, `${runningDataPath.chartOptions}.data`, data);
      onChange(copyData);
      setShowCode(false)
    },
    [onChange, runningData],
  )
  
  return (
    <>
      <PageHeader title="设置坐标属性" extra={<CodeOutlined onClick={() => setShowCode(true)} />} />
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
      <JsonDataEditor
        data={optionsData.data}
        okText="确定" 
        cancelText="取消" 
        visible={showCode} 
        onConfirm={onConfirmCode} 
        onCancel={() => setShowCode(false)} 
        title="数据编辑" />
    </>
  )
}

export default ChartOptions;