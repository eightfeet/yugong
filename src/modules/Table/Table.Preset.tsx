import { PageHeader } from 'antd';
import React from 'react';
import SortableTableData from './components/SortableTableData';
import TableData from './components/TableData';

interface Props {

}

const data = [
  { headName: 'string1', rowMap: '{{string1}}', dataType: 'date', format: undefined, columWidth: '21px' },
  { headName: 'string2', rowMap: 'string2', dataType: 'date', format: undefined, columWidth: '22px' },
  { headName: 'string3', rowMap: 'string3', dataType: 'date', format: undefined, columWidth: '23px' },
]

const TablePreset: React.FC<Props> = ({ }) => {
  return (
    <>
      <PageHeader title="表格设置" />
      <SortableTableData value={data} />
    </>
  )
}

export default TablePreset;