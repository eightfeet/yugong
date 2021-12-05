import { Button, Card, Col, Input, Modal, Row, Tooltip, Collapse } from 'antd';
import Draggable from 'react-draggable';
import React, { useCallback, useEffect, useState } from 'react';
import { MODULES, GRID_DEFAULT_ROWHEIGHT } from '~/core/constants';
import { v4 as uuidv4 } from 'uuid';
import { AppDataLayoutItemTypes, AppDataModuleTypes } from '~/types/appData';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '~/redux/store';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';

import s from './Repository.module.less';
import useKeyDown from '~/hooks/useKeyDown';
import useLocalStorage from '~/hooks/useLocalStorage';
import useMarked from '~/hooks/useMarked';

const { Panel } = Collapse;

interface ModalType {
  moduleName: AppDataModuleTypes;
  title: string;
  discribe: string;
  tips?: string;
}

interface ModalTypeIcon extends ModalType {
  icon: JSX.Element;
}

const Repository: React.FC = () => {
  const [pisition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [addedModal, setAddedModal] = useState<ModalType | undefined>();
  const [newModalName, setNewModalName] = useState<string>();
  const appData = useSelector((state: RootState) => state.appData);
  const pageData = useSelector((state: RootState) => state.pageData);
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  // 缓存
  const [, setAppdataLocalStorage] = useLocalStorage('appData', null);

  const [helper, setHelper] = useMarked();

  const getMd = useCallback(
    async (name: string) => {
      let text: string = '';
      try {
        const file = await import(`~/modules/${name}/README.md`);
        const response = await fetch(file.default);
        text = await response.text();
      } catch (error) {
        console.warn(error);
      }
      setHelper(text);
    },
    [setHelper],
  );

  // 获取说明文档
  useEffect(() => {
    if (addedModal) {
      getMd(addedModal.moduleName);
    }
  }, [addedModal, getMd]);

  const onStopDrag = useCallback(
    (module: ModalType) => (e: any) => {
      if (window.innerWidth - e.screenX > 550) {
        setAddedModal(module);
      }
    },
    [setAddedModal],
  );

  const onDoubleClick = useCallback(
    (module: ModalType) => (e: any) => {
      setAddedModal(module);
    },
    [setAddedModal],
  );

  const onAddItem = useCallback(
    (data: AppDataLayoutItemTypes) => {
      // Add a new item. It must have a unique key!
      const optAppData = [...appData].concat(data);
      updateAppData(optAppData);
      // 做一层本地数据存储更新
      setAppdataLocalStorage(optAppData);
    },
    [appData, setAppdataLocalStorage, updateAppData],
  );

  const createModal = useCallback(
    (moduleType: AppDataModuleTypes, name?: string) => {
      let y = 0;
      // 行高
      let rowHeight = pageData.rowHeight || GRID_DEFAULT_ROWHEIGHT;
      if (typeof rowHeight === 'string') rowHeight = getResult(rowHeight);
      // 滚动条高度
      const iframeNode = document.getElementById(
        'wrapiframe',
      ) as HTMLIFrameElement | null;
      const scrollTop =
        iframeNode?.contentDocument?.documentElement.scrollTop || 0;
      // 通过滚动条定位计算新增元素应该在当前视窗内
      y = (scrollTop + 100) / (rowHeight as number);

      // rowHeight : GRID_DEFAULT_ROWHEIGHT
      // console.log('iframeNode?.scrollTop', iframeNode?.contentDocument?.documentElement.scrollTop)
      // if (appData.length) {
      //   const optAppData = [...appData].sort(
      //     (a, b) => b.layout!.y - a.layout!.y
      //   );
      //   if (optAppData[0]) {
      //     y = optAppData[0].layout!.y + optAppData[0].layout!.h;
      //   }
      // }
      // get module's static Options
      const module = require(`~/modules/${moduleType}`).default;
      const { exposeDefaultProps } = module;
      const { style } = exposeDefaultProps || {};
      const moduleId: string = uuidv4();
      // Add a new item. It must have a unique key!
      const layout = {
        i: moduleId,
        w: 4,
        h: 4,
        x: 0,
        y, // put it at the bottom
        moved: false,
        static: false,
        ...(exposeDefaultProps?.layout || {}), // merge default
      };

      const result: AppDataLayoutItemTypes = {
        moduleName: name || '未标题',
        moduleId,
        layout,
        style: style || { basic: {} }, // merge style
        type: moduleType,
      };
      onAddItem(result);
      setAddedModal(undefined);
      setNewModalName(undefined);
    },
    [appData, onAddItem],
  );

  const onCreate = useCallback(
    (event) => {
      if (addedModal?.moduleName) {
        event.preventDefault();
        createModal(addedModal?.moduleName, newModalName || '未命名');
      }
    },
    [addedModal?.moduleName, createModal, newModalName],
  );

  useKeyDown(onCreate, 'Enter');

  return (
    <>
      <Collapse bordered={false} defaultActiveKey={'base'}>
        {MODULES.map((moduleGroup, mdindex) => (
          <Panel header={moduleGroup.describe} key={moduleGroup.name}>
            <Row key={mdindex} gutter={[16, 16]}>
              {moduleGroup.modules.map((item) => (
                <Col span={6} key={item.moduleName}>
                  <Draggable
                    position={pisition}
                    onStop={onStopDrag(item as ModalTypeIcon)}
                  >
                    <Card
                      onDoubleClick={onDoubleClick(item as ModalTypeIcon)}
                      hoverable
                      cover={null}
                    >
                      <Card.Meta
                        style={{ textAlign: 'center' }}
                        title={
                          <>
                            <div className={s.iconwrap}>{item.icon}</div>
                            <div>
                              <Tooltip title={item.title}>{item.title}</Tooltip>
                            </div>
                          </>
                        }
                        description={item.discribe}
                      />
                    </Card>
                  </Draggable>
                </Col>
              ))}
            </Row>
          </Panel>
        ))}
      </Collapse>
      <Modal
        title={`创建${addedModal?.title || ''}(${
          addedModal?.moduleName || ''
        })组件`}
        visible={!!addedModal}
        width={900}
        footer={null}
        onCancel={() => setAddedModal(undefined)}
        bodyStyle={{ padding: '20px 10px 30px 10px' }}
      >
        {addedModal?.tips ? (
          <p className={s.infomation}>{addedModal?.tips}</p>
        ) : null}
        <Row gutter={[16, 16]}>
          <Col span={3}></Col>
          <Col span={15}>
            <Input
              type="text"
              value={newModalName}
              onChange={(e) => setNewModalName(e.target.value || undefined)}
              placeholder={`请输入${addedModal?.title || ''}(${
                addedModal?.moduleName || ''
              })组件的别名`}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={onCreate}>
              确定
            </Button>
          </Col>
        </Row>
        <div className={s.mdwrap}>
          <div>{helper}</div>
        </div>
      </Modal>
    </>
  );
};

export default Repository;
