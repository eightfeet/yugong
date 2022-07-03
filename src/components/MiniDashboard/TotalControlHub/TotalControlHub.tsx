import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Tabs } from 'antd';
import { cloneDeep, set } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '~/redux/store';
import { PointItem } from '~/types/pageData';
import SetLine from './SetLine';
import TCHLineItem from './TCHLineItem';
import s from './TotalControlHub.module.scss';

const { TabPane } = Tabs;

interface Props {
  updatePage: (pageData: any) => void;
}

const TotalControlHub: React.FC<Props> = ({ updatePage }) => {
  const pageData = useSelector((state: RootState) => state.pageData);
  const { TCH, TCHProcess } = pageData;
  const tchs = Object.keys(TCH || {});
  const [activeKey, setActiveKey] = useState(tchs[0]);
  const [tchview, setTchview] = useState(false);
  // 当勤操作线程
  const [handleLineName, setHandleLineName] = useState<string>();
  const { removeTCHItem } = useDispatch<Dispatch>().pageData;
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const removeLine = useCallback(
    (targetKey: string) => {
      Modal.confirm({
        content: `是否删除当前线程${targetKey}？`,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          removeTCHItem(targetKey);
          setTchview(false);
          if (tchs?.length) {
            setActiveKey(tchs[0]);
          }
        },
      });
    },
    [removeTCHItem, tchs],
  );

  const removeLinePointItem = useCallback(
    (index, pane) => {
      const newPageData = cloneDeep(pageData);
      if (!newPageData.TCHProcess) {
        newPageData.TCHProcess = {}
      }
      if (!newPageData.TCHProcess?.[pane]) {
        newPageData.TCHProcess[pane] = []
      }
      const data = newPageData.TCHProcess?.[pane];
      if (data) {
        newPageData.TCHProcess[pane] = newPageData.TCHProcess[pane].filter((el, ind) => ind !== index);
        updatePage(newPageData)
      }
    },
    [pageData, updatePage],
  )

  const addLinePointItem = useCallback(
    (pane: string) => {
      const newPageData = cloneDeep(pageData);
      if (!newPageData.TCHProcess) {
        newPageData.TCHProcess = {};
      }
      if (!newPageData.TCHProcess[pane]) {
        newPageData.TCHProcess[pane] = [];
      }
      newPageData.TCHProcess[pane].push({});
      updatePage(newPageData);
    },
    [pageData, updatePage],
  )
  
  const onAddLine = useCallback((targetKey: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      setHandleLineName(undefined);
      setTchview(true);
    }
  }, []);

  const onEditLine = useCallback((targetKey: any) => {
    setHandleLineName(targetKey);
    setTchview(true);
  }, []);

  const editLine = useCallback(
    (e: { [key: string]: PointItem[] }) => {
      const newPageData = cloneDeep(pageData);
      newPageData.TCH = { ...newPageData.TCH, ...e };
      updatePage(newPageData);
      setTchview(false);
      setActiveKey(Object.keys(e)[0]);
    },
    [pageData, updatePage],
  );

  const addLine = useCallback(
    (e: any) => {
      const newPageData = cloneDeep(pageData);
      newPageData.TCH = { ...newPageData.TCH, ...e };
      updatePage(newPageData);
      setTchview(false);
      setActiveKey(Object.keys(e)[0]);
    },
    [pageData, updatePage],
  );

  const onSetLine = useCallback(
    (e) => {
      if (handleLineName) {
        editLine(e);
      } else {
        addLine(e);
      }
    },
    [addLine, editLine, handleLineName],
  );

  const onChangeProcessItem = useCallback(
    (data, index, pane) => {
      const newPageData = cloneDeep(pageData);
      // 数据变更
      set(newPageData, `TCHProcess[${pane}][${index}]`, data);
      updatePage(newPageData);
    },
    [pageData, updatePage],
  )

  return (
    <>
      <Tabs
        tabBarStyle={{ marginBottom: 0 }}
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onAddLine}
      >
        {tchs.map((pane) => (
          <TabPane
            tab={pane}
            key={pane}
            closable={true}
            closeIcon={
              <Space>
                <SettingOutlined onClick={() => onEditLine(pane)} />
              </Space>
            }
          >
            <div className={s.main}>
              <Button size="small" icon={<PlusOutlined />} onClick={() => addLinePointItem(pane)} />
              {/** to do list */}
              {
                TCHProcess?.[pane]?.map((el, index) => <TCHLineItem
                  key={index}
                  points={TCH?.[pane] || []}
                  process={el}
                  line={pane}
                  onChange={(data) => onChangeProcessItem(data, index, pane)}
                  onRemove={() => removeLinePointItem(index, pane)}
                />)
              }
            </div>
          </TabPane>
        ))}
      </Tabs>
      <SetLine
        tchs={tchs}
        name={handleLineName}
        points={TCH?.[handleLineName || ''] || []}
        visible={tchview}
        onCancel={() => setTchview(false)}
        onChange={onSetLine}
        onRemove={() => (handleLineName ? removeLine(handleLineName) : null)}
      />
    </>
  );
};

export default TotalControlHub;
