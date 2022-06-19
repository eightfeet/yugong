import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Tabs } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { PointItem } from '~/types/pageData';
import SetLine from './SetLine';
import TCHLineGroup from './TCHLineGroup';
import s from './TotalControlHub.module.scss'

const { TabPane } = Tabs;

interface Props {
  updatePage: (pageData: any) => void
}

const TotalControlHub: React.FC<Props> = ({
  updatePage
}) => {
  const pageData = useSelector((state: RootState) => state.pageData);
  const { TCH } = pageData;
  const tchs = Object.keys(TCH || {});
  const [activeKey, setActiveKey] = useState(tchs[0]);
  const [tchview, setTchview] = useState(false);
  // 当勤操作线程
  const [handleLineName, setHandleLineName] = useState<string>();

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
          const newPageData = cloneDeep(pageData);
          delete newPageData.TCH?.[targetKey];
          updatePage(newPageData)
          setTchview(false)
          if (tchs?.length) {
            setActiveKey(tchs[0])
          }
        }
      })
    },
    [pageData, tchs, updatePage],
  )

  const onAddLine = useCallback(
    (targetKey: any, action: 'add' | 'remove') => {
      if (action === 'add') {
        setHandleLineName(undefined);
        setTchview(true);
      }
    },
    [],
  )

  const onEditLine = useCallback(
    (targetKey: any) => {
      setHandleLineName(targetKey);
      setTchview(true);
    },
    [],
  )

  const editLine = useCallback(
    (e: {[key: string]: PointItem[]}) => {
      const newPageData = cloneDeep(pageData);
      newPageData.TCH = {...newPageData.TCH, ...e};
      updatePage(newPageData);
      setTchview(false);
      setActiveKey(Object.keys(e)[0]);
    },
    [pageData, updatePage],
  )
  

  const addLine = useCallback((e: any) => {
    const newPageData = cloneDeep(pageData);
    newPageData.TCH = {...newPageData.TCH, ...e};
    updatePage(newPageData)
    setTchview(false)
    setActiveKey(Object.keys(e)[0]);
  }, [pageData, updatePage]);

  const onSetLine = useCallback(
    (e) => {
      if (handleLineName) {
        editLine(e)
      } else {
        addLine(e)
      }
    },
    [addLine, editLine, handleLineName],
  )
  
  return (
    <>
      <Tabs tabBarStyle={{ marginBottom: 0 }} type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onAddLine}>
        {tchs.map(pane => (
          <TabPane tab={pane} key={pane} closable={true} closeIcon={
            <Space>
              <SettingOutlined onClick={() => onEditLine(pane)} />
            </Space>
          }>
            <div className={s.main}>
              <Button size="small" icon={<PlusOutlined />} />
              {/** to do list */}
              <TCHLineGroup points={TCH?.[pane] || []} line={pane} />
            </div>
          </TabPane>
        ))}
      </Tabs>
      <SetLine tchs={tchs} name={handleLineName} points={TCH?.[handleLineName || ''] || []} visible={tchview} onCancel={() => setTchview(false)} onChange={onSetLine} onRemove={() => handleLineName ? removeLine(handleLineName) : null} />
    </>
  );
};

export default TotalControlHub;