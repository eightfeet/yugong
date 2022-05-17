import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback } from 'react';
import { ExposeFunctions } from '~/types/modules';
import FormData from '../FormData';

interface Props {
  exposeFunctions: ExposeFunctions[];
  onChange: (copyRunningData: ExposeFunctions[]) => void;
}
const dataPath = '[0].arguments[0].data';

const SortableFormData: React.FC<Props> = ({ exposeFunctions, onChange }) => {
  const list = get(exposeFunctions, dataPath);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      const sortList = cloneDeep(list);
      const res = arrayMove(sortList, oldIndex, newIndex);
      const newData = set(exposeFunctions, dataPath, res)
      onChange(newData)
    },
    [exposeFunctions, list, onChange],
  )

  const onMinus = useCallback(
    (index) => {
      const sortList = cloneDeep(list);
      const res = sortList.filter((item: any, elIndex: number) => (index !== elIndex))
      const newData = set(exposeFunctions, dataPath, res)
      onChange(newData)
    },
    [exposeFunctions, list, onChange],
  )

  const onPlus = useCallback(
    () => {
      const sortList = cloneDeep(list);
      sortList.push({
        "title": "名称"
      });
      const newData = set(exposeFunctions, dataPath, sortList)
      onChange(newData)
    },
    [exposeFunctions, list, onChange],
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
