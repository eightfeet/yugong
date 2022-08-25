import { PageHeader, Row, Col, Tooltip } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import ArrayArguments from '~/components/MiniDashboard/ArgumentsSetting/ArrayArguments';
import { ArgumentsArray } from '~/types/appData';
import s from './Labels.module.scss';
import { runningDataPath } from '../..';

interface Props {}
const Labels: React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext)
  const labels = get(runningData, runningDataPath.labels) as ArgumentsArray;
  const onChangeLabels = useCallback(
    (value) => {
      const newData = set(runningData, runningDataPath.labels, value);
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
            onChange={onChangeLabels}
          />
        </Col>
      </Row>
    </>
  )
}

export default Labels;