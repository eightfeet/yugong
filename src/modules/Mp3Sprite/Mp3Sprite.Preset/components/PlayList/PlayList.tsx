import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Tooltip, Button, Input, Form } from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import SortableContener from '../SortableContener';
import s from './PlayList.module.less';
interface Props {
  
}

const pathUrl = '[0].arguments[0].data';

const path = '[0].arguments[1].data';

const PlayList:React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const playList = get(runningData, path);
  const mp3url = get(runningData, pathUrl);

  const onPlus = useCallback(
    () => {
      const copyData = cloneDeep(runningData);
      playList.push({
        // 专属
        name: '',
        // 公共
        start: 0,
        duration: 0,
      });
      set(copyData, path, playList);
      onChange(copyData);
    },
    [onChange, playList, runningData],
  )

  const onChangeMp3 = useCallback(
    (e) => {
      console.log(e.target.value);
      
    },
    [],
  )

  return (
    <>
      <Form>
        <Form.Item label="音频地址" labelCol={{span:5}}>
          <Input placeholder='请输入音频地址' value={mp3url} onChange={onChangeMp3} />
        </Form.Item>
      </Form>
      <Row gutter={10} className={s.row}>
        <Col span={1} className={s.label} />
        <Col span={23}>
          <Row gutter={4}>
            <Col span={4}>
              <Button icon={<PlusOutlined />} onClick={onPlus}>
                分割片段
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