import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TableModuleContext } from '../../TableModuleContext';
import TableData from '../TableData';
import { TableDataItemValue } from '../TableDataItem/TableDataItem';

interface Props {
  onChange?: (value: TableDataItemValue[]) => void;
  value?: TableDataItemValue[];
}

const SortableTableData: React.FC<Props> = ({ value = [], onChange }) => {
  const [list, setList] = useState<TableDataItemValue[]>([]);
  const { disabled } = useContext(TableModuleContext);

  useEffect(() => {
    setList(value)
  }, [value])

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      if (disabled) return;
      const res = arrayMove(list, oldIndex, newIndex);
      if (typeof onChange === 'function') {
        onChange(res)
      }
      setList(res)
    },
    [disabled, list, onChange],
  )

  const handleOnChange = useCallback(
    (value, index) => {
      setList(list => {
        list[index] = value;
        if (typeof onChange === 'function') {
          onChange(list)
        }
        return list;
      })
    },
    [onChange],
  )

  const onMinus = useCallback(
    (index) => {
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
        <Col><Button disabled={disabled} onClick={onPlus} icon={<PlusOutlined />}>增加列</Button></Col>
      </Row><br />
      <TableData list={list} onChange={handleOnChange} onSortEnd={onSortEnd} onMinus={onMinus} />
    </div>
  )
}

export default SortableTableData;
