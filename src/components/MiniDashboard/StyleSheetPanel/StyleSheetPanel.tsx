import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

import { Collapse } from 'antd';
import Display from '../Display';
import Font from '../Font';

import useMergeAppData from '~/hooks/useMergeAppData';
import s from './StyleSheetPanel.module.scss';
import Shadow from '../Shadow';
import Border from '../Border';
import Transform from '../Transfrom';
import BackgroundGroup from '../BackgroundGroup';

import { StyleContext, StyleType } from '~/context/StyleContext';
import Animation from '../Animation';
import { CodeOutlined } from '@ant-design/icons';
import JsonDataEditor from '../JsonDataEditor';
import { AnyObjectType } from '~/types/appData';

const { Panel } = Collapse;

interface Props {
  path: string;
}

const StyleSheetPanel: React.FC<Props> = ({ path }) => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.pageData.unit);
  const update = useMergeAppData();
  const rootStyle = `style.${path}`;

  const [hideCode, setHideCode] = useState(false);
  const [currentData, setCurrentData] = useState<{
    type: StyleType | 'textShadow_boxShadow';
    data: AnyObjectType
  }>();

  const onChange = useCallback(
    (result: any, type: StyleType) => {
      update(result, `${rootStyle}.${type}`);
    },
    [rootStyle, update],
  );

  const getDefaultData = useCallback(
    (type: StyleType) => selected?.style?.[path]?.[type],
    [path, selected?.style],
  );

  const handleCodeClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, type: StyleType | 'textShadow_boxShadow') => {
      e.stopPropagation();
      let newData: AnyObjectType | undefined = undefined;
      if (type === 'textShadow_boxShadow') {
        newData = {
          textShadow: getDefaultData('textShadow'),
          boxShadow: getDefaultData('boxShadow'),
        }
      } else {
        newData = getDefaultData(type);
      }
      setCurrentData({
        type,
        data: newData || {}
      });
      setHideCode(true);
    },
    [getDefaultData],
  )

  const onConfirm = useCallback(
    (data: AnyObjectType) => {
      const {type} = currentData || {};
      if (type === 'textShadow_boxShadow') {
        onChange(data?.textShadow, 'textShadow');
        onChange(data?.boxShadow, 'boxShadow');
      } else {
        onChange(data, type!);
      }
      setHideCode(false);
    },
    [currentData, onChange],
  )

  return (
    <>
      <StyleContext.Provider
        value={{
          unit,
          onChange,
          getDefaultData,
          path,
        }}
      >
        <div className={s.root}>
          {path ? (
            <Collapse accordion bordered={false}>
              <Panel header="布局" key="display" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'display')} />}>
                <Display />
              </Panel>
              <Panel header="文字" key="font" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'font')} />}>
                <Font />
              </Panel>
              <Panel header="背景" key="backgroundGroup" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'backgroundGroup')} />}>
                <BackgroundGroup />
              </Panel>
              <Panel header="圆角与描边" key="border" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'border')} />}>
                <Border />
              </Panel>
              <Panel header="投影" key="textShadow_boxShadow" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'textShadow_boxShadow')} />}>
                <Shadow />
              </Panel>
              <Panel header="变换" key="transform" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'transform')} />}>
                <Transform />
              </Panel>
              <Panel header="动画" key="animate" extra={<CodeOutlined className={s.code} onClick={(e) => handleCodeClick(e, 'animation')} />}>
                <Animation />
              </Panel>
            </Collapse>
          ) : null}
        </div>
      </StyleContext.Provider>
      <JsonDataEditor
        data={currentData?.data || {}}
        okText="确定" 
        cancelText="取消" 
        visible={hideCode} 
        onConfirm={onConfirm} 
        onCancel={() => setHideCode(false)} 
        title="数据编辑" />
    </>
  );
};

export default StyleSheetPanel;
