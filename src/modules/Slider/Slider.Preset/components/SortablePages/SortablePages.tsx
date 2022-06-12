import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { mockData } from '~/modules/Slider/mock';
import { SliderDataItem } from '~/modules/Slider/type';
import { PagesContext } from '../../PagesContext';
import { SliderContext } from '../../SliderContext';
import SliderPages from '../SliderPages';

interface Props {
}
const SortablePages: React.FC<Props> = () => {

  const { pages, path } = useContext(PagesContext)
  const { setRunningData, runningData } = useContext(SliderContext)

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      if (!runningData || !path || !pages?.length) return;
      const res = arrayMove(pages || [], oldIndex, newIndex);
      const newData = set(runningData, path, res);
      setRunningData?.(newData)
    },
    [pages, path, runningData, setRunningData],
  )

  const onPlus = useCallback(
    () => {
      if (!runningData || !path || !pages) return;
      const sortList = cloneDeep(pages);
      const data: SliderDataItem = {
        background: '#fff',
        childrens: [
        ]
      }
      sortList.push(data);
      const newData = set(runningData, path, sortList)
      setRunningData?.(newData);
    },
    [pages, path, runningData, setRunningData],
  )

  return (
    <div>
      <Row>
        <Col><Button onClick={onPlus} icon={<PlusOutlined />}>增加页面</Button></Col>
      </Row><br />
      <SliderPages onSortEnd={onSortEnd} pages={pages || []} useDragHandle />
    </div>
  )
}
export default SortablePages;
