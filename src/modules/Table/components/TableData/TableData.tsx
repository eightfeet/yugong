import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import TableDataItem from '../TableDataItem';
import { TableDataItemValue } from '../TableDataItem/TableDataItem';

interface Props {
  list: TableDataItemValue[];
  onChange?: (value: TableDataItemValue, index: number) => void;
  onMinus?: (index: number) => void;
  disabled?: boolean;
}

const TableData: React.FC<Props> = ({ list, onChange, onMinus }) => {
  return (
    <div>
      {
        list.map((item, index) => <TableDataItem
          label={`第${index + 1}列`}
          onChange={(value) => {
            onChange?.(value, index)
          }}
          key={`${item.rowMap}${item.headName}${index}`} onMinus={() => {
            onMinus?.(index)
          }} index={index} defaultValue={item}
        />)
      }
    </div>
  )
}

export default SortableContainer(TableData);

