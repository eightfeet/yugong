import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Tooltip, Button } from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import SortableContener from '../SortableContener';
import s from './PlayList.module.less';
interface Props {
  
}

const path = '[0].arguments[0].data';

const PlayList:React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const playList = get(runningData, path);

  const onPlus = useCallback(
    () => {
      const copyData = cloneDeep(runningData);
      playList.push({
        // 专属
        type: 'bar',
        // 公共
        label: '标签名',
        backgroundColor: '#06BCFF',
        // 数据
        data: []
      });
      set(copyData, path, playList);
      onChange(copyData);
    },
    [onChange, playList, runningData],
  )

  return (
    <>
      <Row gutter={10} className={s.row}>
        <Col span={1} className={s.label} />
        <Col span={23}>
          <Row gutter={4}>
            <Col span={4}>
              <Button icon={<PlusOutlined />} onClick={onPlus}>
                添加曲目
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <SortableContener items={playList} />
    </>
  )
}

export default PlayList;