import { PageHeader, Row, Col, Tooltip } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback } from 'react';
import ArrayArguments from '~/components/MiniDashboard/ArgumentsSetting/ArrayArguments';
import { ArgumentsArray } from '~/types/appData';
import { ExposeFunctions } from '~/types/modules';
import s from './Labels.module.scss';

interface Props {
  runningData: ExposeFunctions[],
  onChange: (copyRunningData: ExposeFunctions[]) => void
}
const labelsPath = '[0].arguments[0]';
const Labels: React.FC<Props> = ({ runningData, onChange }) => {
  const labels = get(runningData, labelsPath) as ArgumentsArray;
  const onChangeLabels = useCallback(
    (value) => {
      const newData = set(runningData, labelsPath, value);
      onChange(newData);
    },
    [onChange, runningData],
  )
  return (
    <>
      <PageHeader title="设置标签" />
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip
            placement="topRight"
            title={'点击添加标签名'}
          >
            标签
          </Tooltip>
        </Col>
        <Col span={19}>
          <ArrayArguments
            typeArguments={labels}
            flexible
            htmlInput
            onChange={onChangeLabels}
          />
        </Col>
      </Row>
    </>
  )
}

export default Labels;