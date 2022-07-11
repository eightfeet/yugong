import { Col, Input, PageHeader, Row, Select, Tooltip } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import parse from 'html-react-parser';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { AnyObjectType, ArgumentsNumber, ArgumentsString, UnitType } from '~/types/appData';
import { ExposeFunctions } from '~/types/modules';
import { ChildrenItem, SliderDataItem } from '../type';
import ElementSetter from './components/ElementSetter';
import PageSetter from './components/PageSetter';
import SortablePages from './components/SortablePages';
import {
  ContentAndStyleContext,
  ContentAndStyleKeys,
} from './ContentAndStyleContext';
import { PagesContext } from './PagesContext';
import { ParallaxConfig, ParallaxTypeKey } from './ParallaxConfig';
import { SliderContext } from './SliderContext';
import s from './Slider.Preset.module.scss';
import HtmlSuffix from '~/components/MiniDashboard/ArgumentsSetting/HtmlSuffix';

const path = {
  pagePath: '[0].arguments[0].data',
  configPath: '[1].arguments',
};

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  const pages = get(runningData, path.pagePath);
  const configs = get(runningData, path.configPath) as ExposeFunctions['arguments'];

  const pageAndElement = useRef<{ page?: number; element?: number }>({});
  const [showElementConfig, setShowElementConfig] = useState(false);
  const [showPageConfig, setShowPageConfig] = useState(false);
  const [currentElementData, setCurrentElementData] = useState<ChildrenItem>();
  const [currentPageData, setCurrentPageData] = useState<SliderDataItem>();

  const updateCurrentElementData = useCallback(() => {
    const { page, element } = pageAndElement.current;
    const targetPath = `${path.pagePath}[${page}].childrens[${element}]`;
    const eleData = get(runningData, targetPath);
    setCurrentElementData(eleData);
  }, [runningData]);

  /** 开启设置面板 */
  const setSliderElement = useCallback(
    (pageIndex: number, elementIndex?: number) => {
      setShowPageConfig(false);
      // 当前编辑页面和元素
      pageAndElement.current = { page: pageIndex, element: elementIndex };
      updateCurrentElementData();
      // 显示编辑器
      setShowElementConfig(true);
    },
    [updateCurrentElementData],
  );

  const setSliderPage = useCallback((pageIndex: number) => {
    setShowElementConfig(false);
    pageAndElement.current = { page: pageIndex };
    setCurrentPageData(pages[pageIndex]);
    setShowPageConfig(true);
  }, [pages]);

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
  );

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
  );

  const onChangePageBG = useCallback(
    (data) => {
      const { page } = pageAndElement.current;
      // 编辑路径
      const targetPath = `${path.pagePath}[${page}].backgroundGroup`;
      const newData = set(runningData, targetPath, data);
      setCurrentPageData(page => {
        return {
          ...page,
          backgroundGroup: data
        }
      });
      onChange(newData);
    },
    [onChange, runningData],
  )

  const closePage = useCallback(
    () => setShowPageConfig(false),
    [],
  )

  const closeElement = useCallback(
    () => setShowElementConfig(false),
    [],
  )

  const onChangeSlide = useCallback(
    (argIndex: number, value?: number | string) => {
      console.log('runningData', runningData);
      const targetPath = `${path.configPath}[${argIndex}].data`;
      const newData = set(runningData, targetPath, value);
      onChange(newData);
    },
    [onChange, runningData],
  )
  
  const renderNumberString = (
    argItem: ArgumentsString | ArgumentsNumber,
    argIndex: number,
  ) => {
    // 下拉选择形式
    if (argItem?.select) {
      const { select } = argItem;
      const keys = Object.keys(select);
      return <Select
        onChange={
          (e) => onChangeSlide(argIndex, e)
        }
        value={argItem.data}
        className={s.select}
        placeholder={`请输入值,${argItem.describe || ''}`}
      >
        {
          keys.map((value) => <Select.Option key={value} value={value}>{
            select[value]
          }</Select.Option>)
        }
      </Select>
    }
    // 输入框形式
    return <Input
      onChange={
        (e) => onChangeSlide(argIndex, e.target.value)
      }
      value={argItem.data}
      type="text"
      suffix={
        !!argItem.html ? (
          <HtmlSuffix />
        ) : null
      }
    />
  };

  return (
    <div>
      <SliderContext.Provider
        value={{
          runningData,
          setRunningData: onChange,
        }}
      >
        <PagesContext.Provider
          value={{
            pages,
            path: path.pagePath,
            setSliderElement,
            setSliderPage,
            currentPage: currentPageData,
            onChangeCurrentPageBackground: onChangePageBG
          }}
        >
          <ParallaxConfig.Provider
            value={{
              setParallax,
              parallax: currentElementData?.parallax,
            }}
          >
            <ContentAndStyleContext.Provider
              value={{
                setContentAndStyle,
                content: currentElementData?.content,
                style: currentElementData?.style,
                link: currentElementData?.link,
              }}
            >
              <PageHeader className={s.header} title="内容" />
              <SortablePages />
              <ElementSetter
                title={`第${pageAndElement.current.page! + 1}页-${currentElementData?.name
                  }`}
                onClose={closeElement}
                visible={showElementConfig}
              />
              <PageSetter
                title={`第${pageAndElement.current.page! + 1}页`}
                onClose={closePage}
                visible={showPageConfig}
                data={currentPageData}
              />
              <PageHeader className={s.header} title="Slider设置" />
              {
                configs?.map((argItem, argIndex) => <Row className={s.row} key={argIndex} gutter={10}>
                  <Col span={5} className={s.label}>
                    <Tooltip
                      placement="topRight"
                      title={parse(argItem.describe || '')}
                    >
                      {argItem.name}
                    </Tooltip>
                  </Col>

                  <Col span={19}>
                    {argItem.type === 'number' ||
                      argItem.type === 'string' ? renderNumberString(argItem, argIndex) : null}
                  </Col>
                </Row>
                )
              }
            </ContentAndStyleContext.Provider>
          </ParallaxConfig.Provider>
        </PagesContext.Provider>
      </SliderContext.Provider>
    </div>
  );
};

export default Preset;
