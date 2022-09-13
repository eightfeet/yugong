import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Tooltip, Button } from 'antd';
import { get } from 'lodash';
import React, { useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import SortableContener from '../SortableContener';
import s from './PlayList.module.less';
interface Props {
  
}

const PlayList:React.FC<Props> = ({}) => {
  const { runningData } = useContext(CustomPresettingContext);
  const playList = get(runningData, '[0].arguments[0].data');
  return (
    <>
      <Row gutter={10} className={s.row}>
        <Col span={5} className={s.label}>
          <Tooltip placement="topRight" title={'点击添加数据组'}>
            曲目
          </Tooltip>
        </Col>
        <Col span={19}>
          <Row gutter={4}>
            <Col span={4}>
              <Button icon={<PlusOutlined />} onClick={() => {}}>
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