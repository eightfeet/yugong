import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { FormModuleContext } from '../../FormModuleContext';
import FormData from '../FormData';

interface Props {
}
const SortableFormData: React.FC<Props> = () => {
  const { onChangeRunningData, runningData, dataPath } = useContext(FormModuleContext)
  const list = get(runningData, dataPath);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      if (!runningData) return;
      const sortList = cloneDeep(list);
      const res = arrayMove(sortList, oldIndex, newIndex);
      const newData = set(runningData, dataPath, res)
      onChangeRunningData?.(newData)
    },
    [dataPath, list, onChangeRunningData, runningData],
  )

  const onMinus = useCallback(
    (index) => {
      if (!runningData) return;
      const sortList = cloneDeep(list);
      const res = sortList.filter((item: any, elIndex: number) => (index !== elIndex))
      const newData = set(runningData, dataPath, res)
      onChangeRunningData?.(newData)
    },
    [dataPath, list, onChangeRunningData, runningData],
  )

  const onPlus = useCallback(
    () => {
      if (!runningData) return;
      const sortList = cloneDeep(list);
      sortList.push({
        "title": "名称",
        "width": "100%"
      });
      const newData = set(runningData, dataPath, sortList)
      onChangeRunningData?.(newData)
    },
    [dataPath, list, onChangeRunningData, runningData],
  )

  return (
    <div>
      <Row>
        <Col><Button onClick={onPlus} icon={<PlusOutlined />}>增加项</Button></Col>
      </Row><br />
      <FormData onSortEnd={onSortEnd} onMinus={onMinus} list={list} />
    </div>
  )
}

export default SortableFormData;
