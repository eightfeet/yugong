import { get } from 'lodash';
import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import SortablePages from './components/SortablePages';
import { PagesContext } from './PagesContext';
import { SliderContext } from './SliderContext';

interface Props {

}

const path = {
  pagePath: '[0].arguments[0].data',
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  console.log('5454544', runningData);
  
  return (
    <div>
      <SliderContext.Provider
        value={{
          runningData,
          setRunningData: onChange,
        }}
      >
        <PagesContext.Provider value={{
          pages: get(runningData, path.pagePath),
          path: path.pagePath
        }}>
          <SortablePages />
        </PagesContext.Provider>
      </SliderContext.Provider>
    </div>
  )
}

export default Preset;