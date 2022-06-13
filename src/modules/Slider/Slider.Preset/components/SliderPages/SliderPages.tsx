import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import PageItem from '../PageItem';

interface Props {
  pages: any[];
}

const SliderPages:React.FC<Props> = ({pages}) => {  
  return (
    <div>
      {
        pages.map((item, index) => <PageItem key={index} index={index} pageIndex={index} />)
      }
    </div>
  )
}

export default SortableContainer(SliderPages);