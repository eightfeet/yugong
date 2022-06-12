import { get } from 'lodash';
import React, { useCallback, useRef } from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import SortablePages from './components/SortablePages';
import { PagesContext } from './PagesContext';
import { ParallaxConfig, ParallaxTypeKey } from './ParallaxConfig';
import { SliderContext } from './SliderContext';

const path = {
  pagePath: '[0].arguments[0].data',
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  const pageAndElement = useRef<{page?: number, element?: number}>({});

  /** 开启设置面板 */
  const setPageAndElement = useCallback(
    (pageIndex: number, elementIndex?: number) => {
      // 当前编辑页面和元素
      pageAndElement.current = {page: pageIndex, element: elementIndex}
      // 显示编辑器
      console.log('pageIndex', pageIndex, 'elementIndex', elementIndex);
    },
    [],
  )

  /** 设置当前视觉差 */
  const setParallax = useCallback(
    (type: ParallaxTypeKey, value:number) => {
      const { page, element } = pageAndElement.current;
      if (page === undefined || element === undefined) return; 
      // 编辑路径
      const targetPath = `${path.pagePath}[${page}].childrens[${element}]`;
    },
    [],
  )
  
  
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
          path: path.pagePath,
          setPageAndElement
        }}>
          <ParallaxConfig.Provider value={{
            setParallax,
          }}>
            <SortablePages />
          </ParallaxConfig.Provider>
        </PagesContext.Provider>
      </SliderContext.Provider>
    </div>
  )
}

export default Preset;