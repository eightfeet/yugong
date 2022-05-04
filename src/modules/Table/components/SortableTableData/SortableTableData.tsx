import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import React, { useCallback, useEffect, useState } from 'react';
import TableData from '../TableData';
import { TableDataItemValue } from '../TableDataItem/TableDataItem';

interface Props {
  onChange?: (value: TableDataItemValue[]) => void;
  value: TableDataItemValue[];
  disabled?: boolean;
}

const SortableTableData: React.FC<Props> = ({ value, onChange }) => {
  const [list, setList] = useState<TableDataItemValue[]>([])
  useEffect(() => {
    setList(value)
  }, [value])

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      const res = arrayMove(list, oldIndex, newIndex);
      if (typeof onChange === 'function') {
        onChange(res)
      }
      setList(res)
    },
    [list, onChange],
  )

  const handleOnChange = useCallback(
    (value, index) => {
      setList(list => {
        list[index] = value;
        if (typeof onChange === 'function') {
          onChange(value)
        }
        return list;
      })
    },
    [onChange],
  )

  const onMinus = useCallback(
    (index) => {
      console.log(index);
      setList(list => {
        const data = list.filter((_, listIndex) => index !== listIndex);
        if (typeof onChange === 'function') {
          onChange(data)
        }
        return data;
      })
    },
    [onChange],
  )

  const onPlus = useCallback(
    () => {
      setList(data => {
        data?.push({});
        return [...data];
      })
    },
    [],
  )
  
  return (
    <div>
      <Row>
        <Col span={1}></Col>
        <Col><Button onClick={onPlus} icon={<PlusOutlined />}>增加列</Button></Col>
      </Row><br />
      <TableData list={list} onChange={handleOnChange} onSortEnd={onSortEnd} onMinus={onMinus} />
    </div>
  )
}

export default SortableTableData;
