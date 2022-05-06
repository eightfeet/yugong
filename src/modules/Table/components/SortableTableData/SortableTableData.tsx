import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { obj2arr } from '../../helper';
import { TableModuleContext } from '../../TableModuleContext';
import TableData from '../TableData';
import { TableDataItemValue } from '../TableDataItem/TableDataItem';

interface Props {
}

const SortableTableData: React.FC<Props> = () => {
  const [list, setList] = useState<TableDataItemValue[]>([]);
  const { disabled, onChangeRunningData, dataSource } = useContext(TableModuleContext);

  const onChange = useCallback(
    (data) => {
      console.log(data);
    },
    [],
  )
  

  useEffect(() => {
const data = [{headName: 'string2333', rowMap: undefined, dataType: undefined, format: undefined, columWidth: undefined},{headName: 'string2333', rowMap: undefined, dataType: undefined, format: undefined, columWidth: undefined}]
    console.log(333, obj2arr(data));
    
    setList([])
  }, [dataSource])
  

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
