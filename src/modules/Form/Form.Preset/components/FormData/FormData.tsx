import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import FormDataItem from '../FormDataItem';
// import { FormDataItemValue } from '../FormDataItem/FormDataItem';

interface Props {
  list: any[];
  onChange?: (value: any, index: number) => void;
  onMinus?: (index: number) => void;
  disabled?: boolean;
}

const FormData: React.FC<Props> = ({ list
  , onChange, onMinus }) => {
  return (
    <div>
      {
        list?.map((item, index) => <FormDataItem
          label={`第${index + 1}列`}
          onChange={(value: any) => {
            onChange?.(value, index)
          }}
          value={item}
          key={index} 
          onMinus={() => {
            onMinus?.(index)
          }}
          order={index + 1}
          index={index} 
        />)
      }
    </div>
  )
}

export default SortableContainer(FormData);

