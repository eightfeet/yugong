import { Drawer, Input } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { AnyObjectType, UnitType } from '~/types/appData';
import { ChildrenItem } from '../type';
import ElementSetter from './components/ElementSetter';
import SortablePages from './components/SortablePages';
import { ContentAndStyleContext, ContentAndStyleKeys } from './ContentAndStyleContext';
import { PagesContext } from './PagesContext';
import { ParallaxConfig, ParallaxTypeKey } from './ParallaxConfig';
import { SliderContext } from './SliderContext';

const path = {
  pagePath: '[0].arguments[0].data',
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  const pageAndElement = useRef<{ page?: number, element?: number }>({});
  const [showConfig, setShowConfig] = useState(false);
  const [currentElementData, setCurrentElementData] = useState<ChildrenItem>();
  const updateCurrentElementData = useCallback(
    () => {
      const {page, element} = pageAndElement.current;
      const targetPath = `${path.pagePath}[${page}].childrens[${element}]`;
      const eleData = get(runningData, targetPath);
      setCurrentElementData(eleData)
    },
    [runningData],
  )

  /** 开启设置面板 */
  const setPageAndElement = useCallback(
    (pageIndex: number, elementIndex?: number) => {
      // 当前编辑页面和元素
      pageAndElement.current = { page: pageIndex, element: elementIndex }
      updateCurrentElementData();
      // 显示编辑器
      setShowConfig(true);
    },
    [updateCurrentElementData],
  )

  /** 设置当前视觉差 */
  const setParallax = useCallback(
    (type: ParallaxTypeKey, value: UnitType | string) => {
      const { page, element } = pageAndElement.current;
      if (page === undefined || element === undefined) return;
      updateCurrentElementData();
      // 编辑路径
      const targetPath = `${path.pagePath}[${page}].childrens[${element}][parallax][${type}]`;
      const newData = set(runningData, targetPath, value);
      onChange(newData);
    },
    [onChange, runningData, updateCurrentElementData],
  )

  /** 设置内容与样式 */
  const setContentAndStyle = useCallback(
    (type: ContentAndStyleKeys, value: string | number | AnyObjectType) => {
      const { page, element } = pageAndElement.current;
      if (page === undefined || element === undefined) return;
      // 编辑路径
      const targetPath = `${path.pagePath}[${page}].childrens[${element}][${type}]`;
      const newData = set(runningData, targetPath, value);
      onChange(newData);
      updateCurrentElementData();
    },
    [onChange, runningData, updateCurrentElementData],
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
            parallax: currentElementData?.parallax
          }}>
            <ContentAndStyleContext.Provider value={{
              setContentAndStyle,
              content: currentElementData?.content,
              style: currentElementData?.style,
              link: currentElementData?.link
            }}>
              <SortablePages />
              <ElementSetter 
                title={`第${pageAndElement.current.page! + 1}页-${currentElementData?.name}`}  
                onClose={() => setShowConfig(false)} visible={showConfig}
              />
            </ContentAndStyleContext.Provider>
          </ParallaxConfig.Provider>
        </PagesContext.Provider>
      </SliderContext.Provider>
    </div>
  )
}

export default Preset;