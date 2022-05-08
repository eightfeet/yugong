import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import { cloneDeep } from 'lodash';
import React, { useCallback, useContext } from 'react';
import groupArgumentsPars, { getGroupArgumentsValues } from '~/core/helper/groupArgumentsPars';
import { TableModuleContext } from '../../TableModuleContext';
import TableData from '../TableData';

interface Props {
}

const SortableTableData: React.FC<Props> = () => {
  const { disabled, onChangeRunningData, getDataFromRunningData } = useContext(TableModuleContext);
  const getData = useCallback(
    () => {
      const data = getDataFromRunningData?.(['headName', 'columWidth', 'dataType', 'format', 'rowMap']) || {};
      return getGroupArgumentsValues(data);
    },
    [getDataFromRunningData],
  )

  const onChange = useCallback(
    (data) => {
      /**获取数据 */
      let param = groupArgumentsPars(data);
      /**考虑数据为空的情况 */
      if (!Object.keys(param).length) {
        param = {
          columWidth: [],
          dataType: [],
          format: [],
          headName: [],
          rowMap: [],
        }
      }
      /**更新到runningData */
      onChangeRunningData?.(param)
    },
    [onChangeRunningData],
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      if (disabled) return;
      const list = getData();
      const res = arrayMove(list, oldIndex, newIndex);
      onChange(res)
    },
    [disabled, getData, onChange],
  )

  const handleOnChange = useCallback(
    (value, index) => {
      const optData = cloneDeep(getData());
      optData[index] = value;
      onChange(optData)
    },
    [getData, onChange],
  )

  const onMinus = useCallback(
    (index) => {
      const optData = cloneDeep(getData()).filter((_, listIndex) => index !== listIndex);
      onChange(optData)
    },
    [getData, onChange],
  )

  const onPlus = useCallback(
    () => {
      const optData = cloneDeep(getData());
      optData.push({ 'headName': undefined, 'columWidth': undefined, 'dataType': undefined, 'format': undefined, 'rowMap': undefined })
      onChange(optData)
    },
    [getData, onChange],
  )

  return (
    <div>
      <Row>
        <Col><Button disabled={disabled} onClick={onPlus} icon={<PlusOutlined />}>增加列</Button></Col>
      </Row><br />
      <TableData list={getData()} onChange={handleOnChange} onSortEnd={onSortEnd} onMinus={onMinus} />
    </div>
  )
}

export default SortableTableData;
