import React, { useCallback, useState, useMemo, lazy, useEffect } from 'react';
import ConfigurationController from '~/components/MiniDashboard/ConfigurationController';
import s from './Dashboard.module.less';
import { Menu, Select, Tooltip, Modal, Row, Col, Input, Button } from 'antd';
import {
  ClusterOutlined,
  CodeOutlined,
  CopyOutlined,
  DeleteOutlined,
  FormatPainterOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import reject from 'lodash/reject';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '~/redux/store';
import StyleController from '../StyleController';
import usePostMessage from '~/hooks/usePostMessage';

import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import useKeyDown from '~/hooks/useKeyDown';
import RunningTimesModal from '../RunningTimesModal';

const { confirm } = Modal;
interface Props {}

const Dashboard: React.FC<Props> = () => {
  // 复制模块
  const [showCopyedModal, setShowCopyedModal] = useState(false);
  // 复制模块名称
  const [newModalName, setNewModalName] = useState<string>();

  const [showRunningTimes, setShowRunningTimes] = useState(false);
  const runningTimes = useSelector((state: RootState) => state.runningTimes);

  // appdata
  const appData = useSelector((state: RootState) => state.appData);

  // 模板ID
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId,
  );

  const activationItem = useSelector(
    (state: RootState) => state.activationItem,
  );

  const updateActivationItem =
    useDispatch<Dispatch>().activationItem.updateActivationItem;
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  const removeActivationItem =
    useDispatch<Dispatch>().activationItem.removeActivationItem;

  // 样式与设置菜单面板
  const [mainTag, setMainTag] = useState('config');
  const onSelectMainTag = useCallback((e) => {
    setMainTag(e.key);
  }, []);

  const sendMessage = usePostMessage(() => {});
  // 收发处理，子窗口onload时向子窗口发送信息, 通知当前正处于编辑模式下，

  // 重置当前被选择项
  const onChangeSelect = useCallback(
    (e) => {
      if (activationItem.moduleId === e) return;
      for (let index = 0; index < appData.length; index++) {
        const element = appData[index];
        if (element.moduleId === e) {
          const value = { ...element };
          updateActivationItem(value);
          const win = (
            document.getElementById('wrapiframe') as HTMLIFrameElement
          ).contentWindow;
          if (win) {
            sendMessage({ tag: 'id', value: element.moduleId }, win);
          }
          break;
        }
      }
    },
    [activationItem.moduleId, appData, sendMessage, updateActivationItem],
  );

  // =====================================模块删除=======================================//
  const [isDeleteComp, setIsDeleteComp] = useState(false);

  const delModule = useCallback(() => {
    const optAppData = reject([...appData], { moduleId });
    const win = (document.getElementById('wrapiframe') as HTMLIFrameElement)
      .contentWindow;
    updateAppData(optAppData);
    removeActivationItem();
    sendMessage(
      {
        tag: 'updateAppData',
        value: optAppData,
      },
      win,
    );
    console.log(4);
    sendMessage(
      {
        tag: 'removeActivationItem',
        value: undefined,
      },
      win,
    );
    setIsDeleteComp(false);
  }, [appData, moduleId, removeActivationItem, sendMessage, updateAppData]);

  const confirmModal = useCallback(() => {
    if (isDeleteComp) return;
    setIsDeleteComp(true);
    confirm({
      content: (
        <div>
          <h3>确定删除</h3>
          <br />
          模块名称：{activationItem.moduleName}
          <br />
          Id: {activationItem.moduleId}
          <br />
          <span className={s.warn}>
            当前模块将被移除，请手动清除其他模块事件中引用的当前模块方法。
          </span>
        </div>
      ),
      okText: '确定',
      cancelText: '取消',
      onCancel: () => setIsDeleteComp(false),
      onOk: delModule,
    });
  }, [
    isDeleteComp,
    activationItem.moduleName,
    activationItem.moduleId,
    delModule,
  ]);

  // 模块删除快捷键
  // key deletd
  useKeyDown((event) => {
    const activeNode = document.activeElement?.tagName.toLowerCase();
    if (!isDeleteComp && activeNode !== 'input' && activeNode !== 'textarea') {
      event.preventDefault();
      confirmModal();
    }
  }, 'Delete');

  // =====================================模块复制=======================================//
  // copyData
  const beforCopyModule = useCallback(() => {
    setNewModalName(`${activationItem.moduleName} 拷贝`);
    setShowCopyedModal(true);
  }, [activationItem.moduleName]);

  // 初始化或，取消复制弹窗
  const initCopyModule = useCallback(() => {
    setShowCopyedModal(false);
    setNewModalName(undefined);
  }, []);

  // 方法，复制当前选中的组件
  const copyModule = useCallback(() => {
    // 准备创建
    const oprateActivationItem = cloneDeep(activationItem);
    const copyAppData = cloneDeep(appData);
    const moduleId = uuidv4();
    oprateActivationItem.moduleId = moduleId;
    oprateActivationItem.layout!.i = moduleId;
    oprateActivationItem.moduleName =
      newModalName || `${activationItem.moduleName} 拷贝`;
    // 模块位置
    if (copyAppData.length > 1) {
      copyAppData.sort((a, b) => (b.layout?.y || 0) - (a.layout?.y || 0));
    }
    const layoutY = copyAppData[0].layout?.y || 0;
    const layoutH = copyAppData[0].layout?.h || 0;
    oprateActivationItem.layout!.y = layoutY + layoutH;
    // 复制模块,更新当前模块到全局并设为当前被选择模块
    updateAppData([...appData, oprateActivationItem]);
    updateActivationItem(oprateActivationItem);
    // 初始化复制窗口
    initCopyModule();
  }, [
    activationItem,
    appData,
    newModalName,
    updateAppData,
    updateActivationItem,
    initCopyModule,
  ]);

  // 处理键盘事件
  // 模拟模块复制
  useKeyDown(
    () => {
      const activeNode = document.activeElement?.tagName.toLowerCase();
      if (activeNode === 'iframe') {
        beforCopyModule();
      }
    },
    'c',
    'ctrlKey',
  );

  // // 确认复制模块
  useKeyDown((event) => {
    if (showCopyedModal) {
      event.preventDefault();
      copyModule();
    }
  }, 'Enter');

  const CodeEditor = useMemo(
    () => lazy(() => import(`../CodeEditor/index`)),
    [],
  );

  return (
    <>
      <div className={s.headtab}>
        <div className={s.moduleselect}>
          <Select
            onChange={onChangeSelect}
            className={s.select}
            value={moduleId}
            showSearch
            placeholder="请选择编辑模块"
            optionFilterProp="children"
            filterOption={
              (input, option) => {
                const str = option?.children?.join('').toLowerCase();
                if (str?.indexOf(input) !== -1) {
                  return true;
                }
                return false;
              }
              // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {appData.map((item) => (
              <Select.Option value={item.moduleId} key={item.moduleId}>
                {item.moduleName || '(未标题)'}-{item.type}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Menu
          onClick={() => setMainTag('config')}
          onSelect={onSelectMainTag}
          selectedKeys={[mainTag]}
          mode="horizontal"
          className={s.contentmenu}
        >
          <Menu.Item key="config" icon={<ToolOutlined />}>
            设置
          </Menu.Item>
          <Menu.Item key="style" icon={<FormatPainterOutlined />}>
            样式
          </Menu.Item>
          <Menu.Item key="code" icon={<CodeOutlined />}>
            code
          </Menu.Item>
        </Menu>
        <div className={s.info}>
          <Tooltip placement="bottomRight" title="查看全局发布变量">
            <ClusterOutlined
              className={s.delete}
              onClick={() => setShowRunningTimes(true)}
            />
          </Tooltip>
        </div>
        <div className={s.info}>
          <Tooltip
            placement="bottomRight"
            title={
              <div className={s.tips}>
                <h3>复制为新模块</h3>
                当前模块信息
                <br />
                模块:{activationItem.moduleName}
                <br />
                类型:{activationItem.type}
                <br />
                Id:{activationItem.moduleId}
              </div>
            }
          >
            <CopyOutlined alt="复制模块" onClick={beforCopyModule} />
          </Tooltip>
        </div>
        <div>
          <Tooltip
            placement="bottomRight"
            title={`删除 ${
              activationItem.moduleName || activationItem.moduleId
            }`}
          >
            <DeleteOutlined className={s.delete} onClick={confirmModal} />
          </Tooltip>
        </div>
      </div>
      <div
        className={s.root}
        style={{ height: `${window.innerHeight - 80}px` }}
      >
        <div
          className={s.controllerwrap}
          style={{ display: mainTag === 'style' ? 'block' : 'none' }}
        >
          <StyleController />
        </div>
        <div
          className={s.controllerwrap}
          style={{ display: mainTag === 'config' ? 'block' : 'none' }}
        >
          <ConfigurationController />
        </div>
        <div
          className={s.controllerwrap}
          style={{ display: mainTag === 'code' ? 'block' : 'none' }}
        >
          <CodeEditor />
        </div>
      </div>
      <Modal
        title={`复制${activationItem?.moduleName || ''}(${
          activationItem?.type || ''
        })模块`}
        visible={!!showCopyedModal}
        footer={null}
        onCancel={initCopyModule}
      >
        <Row gutter={[16, 16]}>
          <Col span={3}></Col>
          <Col span={15}>
            <Input
              type="text"
              value={newModalName as any}
              onChange={(e) => setNewModalName(e.target.value || undefined)}
              placeholder={`请输入${activationItem?.type || ''}模块的别名`}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={copyModule}>
              确定
            </Button>
          </Col>
        </Row>
        <br />
      </Modal>
      <RunningTimesModal
        visible={showRunningTimes}
        data={runningTimes}
        onCancel={() => setShowRunningTimes(false)}
      />
    </>
  );
};

export default Dashboard;
